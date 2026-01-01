console.log('loaded user_api.test.js')

const { test, after, describe, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)



beforeEach(async () => {
    await User.deleteMany({})
})

describe("http post user", () => {

    test.only("user with valid fields can be created", async () => {
        const testUser = {
            name: "Elias",
            username: "Elde",
            password: "salainen"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get("/api/users")

        assert.strictEqual(response.body.length, 1)
    })

    test.only("user containing no password/username cant be created", async() => {
        const testUser = {
            name: "Elias"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get("/api/users")

        assert.strictEqual(response.body.length, 0)
    })

    test.only("user containing invalid length passsword cant be created", async() => {
        const testUser = {
            name: "Elias",
            username: "Elde",
            password: "12"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get("/api/users")

        assert.strictEqual(response.body.length, 0)
    })

    test.only("user containing invalid length username cant be created", async() => {
        const testUser = {
            name: "Elias",
            username: "El",
            password: "12222"
        }

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get("/api/users")

        assert.strictEqual(response.body.length, 0)
    })



})

after(async () => {
    await mongoose.connection.close()
})

