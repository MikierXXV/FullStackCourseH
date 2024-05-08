const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length > 0 ? blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog) : 0
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    let authors = {}
    let max = { author: '', blogs: 0 }
    blogs.forEach(blog => {
        authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1
        if (authors[blog.author] > max.blogs) {
            max.author = blog.author
            max.blogs = authors[blog.author]
        }
    })
    return max
}

const mostlikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    let authors = {}
    let max = { author: '', likes: 0 }
    blogs.forEach(blog => {
        authors[blog.author] = authors[blog.author] ? authors[blog.author] + blog.likes : blog.likes
        if (authors[blog.author] > max.likes) {
            max.author = blog.author
            max.likes = authors[blog.author]
        }
    })
    return max
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostlikes
}