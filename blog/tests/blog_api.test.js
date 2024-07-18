const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_funcs')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
    beforeEach(async ()=> {
        await Blog.deleteMany()
        await Blog.insertMany(helper.initialBlogs)
        await User.deleteMany()
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ 
            username: 'adminitsrator', 
            name: 'Admin',
            password: passwordHash 
        })
        await user.save();

    })

    /*test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })*/

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a blog can be selected', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToSelect = blogsAtStart[0]
    
        const resultBlog = await api
        .get(`/api/blogs/${blogToSelect.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultBlog.body, blogToSelect)
    })

    describe('addition of a new blog', () => {
        test ('a blog can be added', async () => {
            const users = await helper.usersInDb()
            const user = users[0]
            console.log("USUARIO:", user)
            const res = await api
                .post('/api/login')
                .send({ username: user.username, password: user.password })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const token = res.body.token

            const blog = {
                title: "Test blog",
                author: "Test author",
                url: "Test url",
                likers: 0,
                user: user.id
            }

            await api
                .post('/api/blogs')
                .send(blog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
                .set('Authorization', `bearer ${token}`)
            
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
        })

        test ('a blog without likes will default to 0', async () => {
            const blog = {
                title: "Test blog without likes",
                author: "Test author",
                url: "Test url",
            }

            await api
                .post('/api/blogs')
                .send(blog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const addedBlog = blogsAtEnd.find(blog => blog.title === "Test blog without likes")
            assert.strictEqual(addedBlog.likes, 0)
        })

        test ('a blog without title or url will return 400', async () => {
            const blog = {
                url: "Test url without title",
                likes: 0
            }

            await api
                .post('/api/blogs')
                .send(blog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })
    })

    describe('updating a blog', () => {
        test('a blog can be updated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]
        
            const updatedBlog = {
                title: "Updated blog",
                author: blogToUpdate.author,
                url: blogToUpdate.url,
                likes: 7,
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()

            const titles = blogsAtEnd.map(blog => blog.title)
            assert(titles.includes("Updated blog"))
        })
    })

    describe('deletion of a blog', () => {
        test('a blog can be deleted', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
        
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
            
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

            const titles = blogsAtEnd.map(blog => blog.title)
            assert(!titles.includes(blogToDelete.title))
        })
    })

    describe('viewing a user', () => {
        beforeEach(async () => {
            await User.deleteMany();
            const passwordHash = await bcrypt.hash('secret', 10)
            const user = new User({ 
                username: 'adminitsrator', 
                name: 'Admin',
                password: passwordHash 
            })
            await user.save();
        })

        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()
            const newUser = {
                username: 'test',
                name: 'Test User',
                password: 'password@123',
            }
            
            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

            const usernames = usersAtEnd.map(user => user.username)
            assert(usernames.includes(newUser.username))
        })

        test('min length of username is 3', async () => {
            const usersAtStart = await helper.usersInDb()
            const newUser = {
                username: 'te',
                name: 'Test User',
                password: 'password@123',
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length)

            const usernames = usersAtEnd.map(user => user.username)
            assert(!usernames.includes(newUser.username))
        })

        test('min length of password is 3', async () => {
            const usersAtStart = await helper.usersInDb()
            const newUser = {
                username: 'test',
                name: 'Test User',
                password: 'pa',
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length)

            const usernames = usersAtEnd.map(user => user.username)
            assert(!usernames.includes(newUser.username))
        })

        test('username and password are required', async () => {
            const usersAtStart = await helper.usersInDb()
            const newUser = {
                name: 'Userwithoutusername',
            }
            await api
                .post('/api/users')
                .send(newUser)
            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })

        test('username must be unique', async () => {
            const usersAtStart = await helper.usersInDb()
            const newUser = {
                username: 'adminitsrator',
                name: 'Test User',
                password: 'password@123',
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })
    })
})

after(async() => {
    mongoose.connection.close()
})