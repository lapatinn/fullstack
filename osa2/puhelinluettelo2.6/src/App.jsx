import { useState, useEffect } from 'react'
import personService from './services/persons'
import persons from './services/persons'

const FilterForm = ({ query, handler }) => {
  return(
    <div>
      Filter results with: <input value={query} onChange={handler} />
    </div>
  )
}

const PersonForm = ({ name, number, namehand, numhand, addEntry }) => {
  return(
    <div>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={name} onChange={namehand} />
        </div>
        <div>
          number <input value={number} onChange={numhand} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ persons, remover }) => {
  return(
    <div>
      {persons.map(person =>
        <div key={person.id}>
          <Person 
          name={person.name} 
          number={person.number} 
          remover={() => {remover(person.id)}}
          />
        </div>
      )}
    </div>
  )
}

const Person = ({ name, number, remover }) => {
  return(
    <div>
      {name} {number} <button onClick={remover}>Delete</button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newQuery, setNewQuery] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addEntry = (event) => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        console.log(personToUpdate.id)
        personService
        .update(personToUpdate.id, personObject)
        .then(personsAfterUpdate => {
          setPersons(personsAfterUpdate)
        })
      } else return
    } else {
      personService
      .create(personObject)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePerson = (id) => {
    if (window.confirm('Do you want to delete this entry?')) {
      personService
      .remove(id)
      .then(personsAfterDelete => {
        console.log(personsAfterDelete)
        setPersons(personsAfterDelete)
      })
    } else {return}
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleQueryChange = (event) => {
    setNewQuery(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newQuery.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <FilterForm query = {newQuery} handler = {handleQueryChange} />
      </div>
      <h2>Add new</h2>
      <PersonForm name = {newName} number = {newNumber}
      namehand = {handleNameChange} numhand = {handleNumberChange}
      addEntry = {addEntry}/>
      <h2>Numbers</h2>
      <div>
        <Persons persons={personsToShow} remover={removePerson}/>
      </div>
    </div>
  )

}

export default App