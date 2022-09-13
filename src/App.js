import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import NameList from './components/Namelist'

const App = () => {
  
  const sampleData = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

  const [persons, setPersons] = useState(sampleData) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const entriesToShow = filter.length === 0 
    ? persons 
    : persons.filter(person => person.name.includes(filter))

  const handleNameChange = (e) => setNewName(e.target.value)

  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const handleFilterChange = (e) => setFilter(e.target.value)

  const addNewEntry = (e) => {
    e.preventDefault()
    const nameObj = {
      name: newName,
      number: newNumber
    }
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObj))
      setNewName('')
      setNewNumber('')
    }
  }

  const deleteAllNames = () => setPersons([])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <Form 
        addNewEntry={addNewEntry} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      <button onClick={deleteAllNames}>delete all</button>
      <h2>Numbers</h2>
      <NameList persons={entriesToShow} />
    </div>
  )
}

export default App