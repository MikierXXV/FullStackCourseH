import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter' 
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [iserror, setIsError] = useState(false)

  useEffect(() => {
    /*axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })*/
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} iserror={iserror}/>
      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newPhone={newPhone} 
        setNewName={setNewName} 
        setNewPhone={setNewPhone} 
        persons={persons} 
        setPersons={setPersons} 
        setMessage={setMessage}
        setIsError={setIsError}/>
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filter={filter}
        setPersons={setPersons} 
        setMessage={setMessage}
        setIsError={setIsError}/>
    </div>
  )
}

export default App
