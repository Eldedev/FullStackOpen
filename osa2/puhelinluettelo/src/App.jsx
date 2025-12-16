import { useState, useEffect} from 'react'
import personService from "./services/persons"

const Persons = ({persons, filter, onClick}) => {
    const filteredList = persons.filter((person => person.name.toLowerCase().includes(filter.toLowerCase())))
    return (
        filteredList.map(person => <p key={person.name}>{person.name} {person.number} <DeleteButton onClick={onClick} id={person.id}/></p>)
    )
}

const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    else if (message.includes("server")) {
        return (
            <div className="error">{message}</div>
        )
    }
    else return (
        <div className="notification">{message}</div>
    )
}


const DeleteButton = ({onClick, id}) => {
    return(
        <button type="button" onClick={() => onClick(id)}>delete</button>
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
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [newFilter, setNewFilter] = useState("")
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then((response) => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'persons')


    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {name: newName, number: newNumber}
        if (!persons.some(person => person.name === newName)) {
            personService
                .create(personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName("")
                    setNewNumber("")
                    setNotification(`${newName} was added`)
                    setTimeout(()=> {
                        setNotification(null)
                        },3500)
                        })
        }
         else {
            const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (confirmation) {
                const currentPerson = persons.find(person => person.name === newName)
                personService
                    .update(currentPerson.id, personObject)
                    .then(response => {
                        setPersons(persons.map(person => person.id === currentPerson.id ? response.data : person))
                        setNewName("")
                        setNewNumber("")
                        setNotification(`${newName} was updated`)
                        setTimeout(()=> {
                            setNotification(null)
                        },3500)
                    })
                    .catch(error => {
                        setNotification(
                            `${currentPerson.name} was already deleted from server`
                        )
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
            }
        }
    }

        const removePerson = (id) => {
            const oldPerson = persons.find(person => person.id === id)
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    setNotification(`${oldPerson.name} was deleted`)
                    setTimeout(()=> {
                        setNotification(null)
                    },3500)
                })
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
                <Notification message={notification}/>
                <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
                <h3>Add a new</h3>
                <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange}
                            handlePersonChange={handlePersonChange} newNumber={newNumber} newName={newName}/>
                <h3>Numbers</h3>
                <Persons key={persons.name} persons={persons} filter={newFilter} onClick={removePerson}/>
            </div>
        )
}

export default App