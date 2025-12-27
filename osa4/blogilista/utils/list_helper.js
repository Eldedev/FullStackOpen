
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return undefined

    let favorite = blogs[0]
    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > favorite.likes) favorite = blogs[i]
    }
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined

    const authorsSorted = blogs.map(blog => blog.author).sort((a, b) => a.author - b.author).reverse()
    const blogCount = authorsSorted.filter(author => author === authorsSorted[0]).length

    return { author: authorsSorted[0], blogs: blogCount }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}