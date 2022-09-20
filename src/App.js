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

    const existingName = persons.find(person => person.name === newName)
    if (existingName && window.confirm(`Update ${existingName.name}'s number?`)) {
      const updatedEntry = {...existingName, number : newNumber}
      phoneNumServices
        .update(existingName.id, updatedEntry)
        .then(res => {
          setPersons(persons.map(person => person.id !== existingName.id ? person : res.data ))
          setNewName('')
          setNewNumber('')
        })
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

  const deleteEntry = personToDel => {
    if (window.confirm(`Delete ${personToDel.name}?`))
    phoneNumServices
      .deleteNum(personToDel.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== personToDel.id ))
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