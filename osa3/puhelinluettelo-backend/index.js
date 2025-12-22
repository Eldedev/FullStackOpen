const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

morgan.token("content", (req) => {
    if (req.method === "POST") return JSON.stringify(req.body)
    else return " "
})

let persons = [
    {
        "name": "Arto Hellas",
        "number": "",
        "id": "1"
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
    }
]

const time = new Date();
const info = `<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => Number(person.id)))
        : 0
    return String(maxId+1)
}

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    response.send(info)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "name required"
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: "number required"
        })
    }
    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: String(Math.floor(100000000*Math.random())),
        id: generateId(),
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 80
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${PORT}`)
})

