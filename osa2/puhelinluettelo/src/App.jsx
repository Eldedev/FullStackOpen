import { useState } from 'react'

const Persons = ({persons, filter}) => {
    const filteredList = persons.filter((person => person.name.toLowerCase().includes(filter.toLowerCase())))
    return (
        filteredList.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    )

}

const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <div>filter shown with<input value={newFilter} onChange={handleFilterChange} /></div>
    )
}

const PersonForm = ({addPerson, newName, newNumber, handlePersonChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handlePersonChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}




const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [newFilter, setNewFilter] = useState("")

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {name: newName, number: newNumber }
        if (!persons.some(person => person.name === newName)) {
            setPersons(persons.concat(personObject))
            setNewName("")
        }
        else {
            alert(`${newName} is already added to phonebook`)
        }
        console.log(persons)
    }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} newNumber={newNumber} newName={newName} />
            <h3>Numbers</h3>
            <Persons key={persons.name} persons={persons} filter={newFilter}/>
        </div>
    )

}

export default App