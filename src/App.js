import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import NameList from './components/Namelist'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([]) 
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

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