const Blog = require('../models/blog')

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


module.exports = { initialBlogs, blogsInDb }