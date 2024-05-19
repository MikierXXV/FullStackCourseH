const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_funcs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
    beforeEach(async ()=> {
        await Blog.deleteMany()
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

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
            const blog = {
                title: "Test blog",
                author: "Test author",
                url: "Test url",
                likers: 0
            }

            await api
                .post('/api/blogs')
                .send(blog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
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
})

after(async() => {
    mongoose.connection.close()
})