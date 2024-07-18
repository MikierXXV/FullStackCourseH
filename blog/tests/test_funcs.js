const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username: "michaelchan",
        name: "Michael Chan",
        password: "password@123",
    },
]

const initialBlogs = [
    {
        title: "Testing is fun",
        author: "Michael Chan",
        url: "https://www.testingisfun.com",
        likes: 5,
    },
    {
        title: "Second attempt at testing",
        author: "Michael Chan",
        url: "https://www.testingisfun.com",
        likes: 5,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
    }
    return null
}

module.exports = { initialBlogs, blogsInDb, usersInDb, getTokenFrom, initialUsers }