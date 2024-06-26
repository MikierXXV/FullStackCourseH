//import axios from 'axios'
import { set } from 'mongoose'
import personService from '../services/persons'
import mongoose from 'mongoose'

const PersonFrom = ({newName, newPhone, setNewName, setNewPhone, persons, setPersons, setMessage, setIsError}) => {
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
          name: newName,
          number: newPhone,
        }
        if (persons.some(person => person.name === newName)) {
          //window.alert(newName + 'is already added to phonebook')
          const notification = window.confirm(`${newName} aleady exists, would you like to update the phone number?`)
          if (!notification) return
          personService
          .update(persons.find(p => p.name === newName).id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewPhone('')
            setTimeout(() => {
              setIsError(false)
              setMessage(`${newName} is been updated to the phonebook`)
            }, 2000)
          })
          .catch(error => {
            setIsError(true)
            setTimeout(() => {
              setMessage(`Can't update ${newName} to the phonebook: ${error.response.data.error}`)
            }, 2000)
          })
          return
        }
        /*axios
          .post('http://localhost:3001/persons', personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewPhone('')
          })*/

          personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewPhone('')
            setTimeout(() => {
              setIsError(false)
              setMessage(`${newName} is been added to the phonebook`)
            }, 2000)
          })
          .catch(error => {
            setTimeout(() => {
              setIsError(true)
              setMessage(`Can't add ${newName} to the phonebook: ${error.response.data.error}`)
            }, 2000)
          })
      }
    
      const handlePersonChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
      }
    
      const handlePhoneChange = (event) => {
        console.log(event.target.value)
        setNewPhone(event.target.value)
      }

    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonFrom 