
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log("connceting to", url)
mongoose.connect(url)
    .then(result => {
        console.log("connected to MongoDB")
    })
    .catch(error => {
        console.log("error connecting to MongoDB", error.message)
    })

const numberValidation = (number) => {
    if (number.split("-").length === 2) {
        const splitNumber = number.split("-")
        return (splitNumber[0].length === 2 || splitNumber[0].length === 3)
    } else return false }

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: numberValidation,
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model("Person", personSchema)

