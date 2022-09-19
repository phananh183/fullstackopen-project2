import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import NameList from './components/Namelist'
import phoneNumServices from './services/phoneNums'

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
      phoneNumServices.create(nameObj)
        .then(newEntry => {
          console.log(newEntry)
          setPersons(persons.concat(newEntry))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
          alert(error)
        })
    }
  }

  useEffect(() => {
      phoneNumServices
      .getAll()
      .then(phoneNums => {
        setPersons(phoneNums)
      })
  }, [])

  const deleteEntry = id => {
    phoneNumServices
      .deleteEntry(id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id !== id ))
      })
  }

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
      <h2>Numbers</h2>
      <NameList persons={entriesToShow} deleteNum={deleteEntry}/>
    </div>
  )
}

export default App