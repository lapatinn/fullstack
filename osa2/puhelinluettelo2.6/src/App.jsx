import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({ persons }) => {
  return(
    <div>
      {persons.map(person =>
        <div key={person.name}>
          <Person name={person.name} number={person.number}/>
        </div>
      )}
    </div>
  )
}

const Person = ({ name, number }) => {
  return(
    <div>
      {name} {number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newQuery, setNewQuery] = useState('')

  useEffect(() => {
    console.log('effect starts')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('rendered', persons.length, 'persons')

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
  
  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

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
        <Persons persons={personsToShow} />
      </div>
    </div>
  )

}

export default App