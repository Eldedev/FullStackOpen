const { test, after, describe, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "Julian Juomat",
        "author": "Julia Saari",
        "url": "https://julia.com",
    },
    {
        "title": "Elden Eväät",
        "author": "Elias Ventovuori",
        "url": "https://elias-vento.com",
    },
    {
        "title": "Hannan Hanhet",
        "author": "Hanna Saari",
        "url": "https://hannan-hanhet.com",
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

})

describe("http get blogs", () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test("blogs are identified with field id", async () => {
        const response = await api.get("/api/blogs")

        assert.strictEqual(response.body.every(blog => blog.id !== undefined), true)
    })

    test("blogs dont have field _id", async () => {
        const response = await api.get("/api/blogs")

        assert.strictEqual(response.body.every(blog => blog._id === undefined), true)
    })

    test('a blog can be added and includes added title', async () => {
        const newBlog = {
            title: "Jonnen Juomat",
            author: "Jonatan Saari",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        assert.strictEqual(response.body.length, initialBlogs.length + 1)

        assert(titles.includes("Jonnen Juomat"))

    })

    test('added blog has specified amount of likes', async () => {
        const blogWithLikes = {
            title: "Jonnen Juomat2",
            author: "Jonatan Saari2",
            likes: 100
        }

        await api
            .post('/api/blogs')
            .send(blogWithLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const likes = response.body.map(r => r.likes)[initialBlogs.length]

        assert.strictEqual(likes, 100)

    })

    test('added blog has 0 likes when undefined', async () => {
        const blogWithNoLikes = {
            title: "Jonnen Juomat",
            author: "Jonatan Saari",
        }

        await api
            .post('/api/blogs')
            .send(blogWithNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const likes = response.body.map(r => r.likes)[initialBlogs.length]


        assert.strictEqual(likes, 0)

    })

    test('blog with no title cant be added', async () => {
        const blogWithNoTitle = {
            "author": "Jonatan Saari",
            "url": "https://jonatan.com/"
        }

        await api
            .post('/api/blogs')
            .send(blogWithNoTitle)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length)

    })

    test('blog with no url cant be added', async () => {
        const blogWithNoUrl = {
            "author": "Jonatan Saari",
            "title": "Jonnen Juomat"
        }

        await api
            .post('/api/blogs')
            .send(blogWithNoUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length)

    })

    test('blog with url and title can be added', async () => {
        const blogWithUrlAndTitle = {
            author: "Jonatan Saari",
            title: "Jonnen Juomat",
            url: "https://jonatan.com/"
        }

        await api
            .post('/api/blogs')
            .send(blogWithUrlAndTitle)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length + 1)

    })

    test.only("existing blog can be deleted", async () => {
        const blogWithUrlAndTitle = {
            author: "Jonatan Saari",
            title: "Jonnen Juomat",
            url: "https://jonatan.com/"
        }

        await api
            .post('/api/blogs')
            .send(blogWithUrlAndTitle)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get("/api/blogs")

        const idToDelete = response.body[initialBlogs.length].id

        await api
            .delete(`/api/blogs/${idToDelete}`)
            .expect(204)
    })

    test.only("blog with malformatted id cant be deleted", async () => {

        await api
            .delete(`/api/blogs/99999999999999999999`)
            .expect(400)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})