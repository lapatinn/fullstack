import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newQuery, setNewQuery] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addEntry = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)

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

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleQueryChange = (event) => {
    console.log(event.target.value)
    setNewQuery(event.target.value)
  }

  // const entriesToShow = showAll
  //   ? persons
  //   : persons.filter(person => person.name.)


  console.log(persons)
  const names = persons.map(person => 
    <div key={person.name}>{person.name} {person.number}</div>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input value={newQuery} onChange={handleQueryChange}/> 
      </div>
    
      <h2>Add new</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {names}
      </div>
    </div>
  )

}

export default App