import React from 'react'
//import axios from 'axios'
import personService from '../services/persons'

const Persons = ({persons, setPersons, filter, setMessage, setIsError}) => {
    
    
    const deletePerson = (id, name) => {
        console.log('delete', id)
        if (window.confirm(`Would you like to delete ${name}?`)) {
            /*axios
            .delete(`http://localhost:3001/persons/${id}`)
            .then(response => {
                console.log(response)
                setPersons(persons.filter(p => p.id !== id))
            })
            .catch(error => {
                console.log('error', error)
            })*/
            personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== id))
                setTimeout(() => {
                    setMessage(`${name} is been deleted from the phonebook`)
                  }, 2000)
            })
            .catch(error => {
                setIsError(true)
                setTimeout(() => {
                    setMessage(`Can't delete ${name} from the phonebook: ${error}`)
                }, 2000)
            })
        }
    }
    
    const personsToShow = filter !== '' ? 
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 
    : persons

    return (
        <ul>
            {personsToShow.map(person => 
            <li key={person.id}>{person.name} {person.number}
                <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
            </li>
            )}
        </ul>
    )
}

export default Persons