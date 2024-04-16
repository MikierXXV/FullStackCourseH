import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CountryInfo from './components/CountryInfo'
import ShowInfo from './components/ShowInfo'

const App = () => {
  const [value, setValue] = useState('')
  const [countrieslist, setCountriesList] = useState([])
  //const [search, setSearch] = useState(null)

  useEffect(() => {
      /*if (search) {
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${search}`)
          .then(response => {
            setCountriesList(response.data)
          })
          .catch(
            window.alert(`${search} is not a valid country`)
          )
      }
      else {}*/
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountriesList(response.data)
        })
      }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setSearch(value)
  }

  const countriesToShow = value !== '' ? 
    countrieslist.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase())) 
    : countrieslist

  return (
    <>
      <form onSubmit={onSearch}>
        <input value={value} onChange={handleChange} />
        {/*<button type="submit">Search</button>*/}
      </form>
      {
        countriesToShow.length === 1 ?
          <CountryInfo country={countriesToShow[0]} />
        : <ShowInfo countriesToShow={countriesToShow} />
      }
      {/*<pre>
        {JSON.stringify(rates, null, 2)}
       </pre>*/
      }
    </>
  )
}

export default App
