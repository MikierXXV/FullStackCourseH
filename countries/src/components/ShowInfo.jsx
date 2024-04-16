import { useState } from 'react'
import CountryInfo from './CountryInfo'

const ShowInfo = ({countriesToShow}) => {
    const [displaycountry, setDisplayCountry] = useState(false);
    const [countryselected, setCountrySelected] = useState({});
  
    const showCountry = (country) =>  {
      setDisplayCountry(true)
      setCountrySelected(country)
    }
    const renderCountries = (countriesToShow, countryselected) => {
      if (displaycountry){
        return (
          <CountryInfo country={countryselected}/>
        );
      } 
      else {
        return (
          countriesToShow.map((country, i) => 
            <li key={i}>{country.name.common}
              <button onClick={() => showCountry(country)}>Show</button>
            </li>
          )
        );
      }
    }
  
    return (
      <ul>
        {
          countriesToShow.length >= 10 ? 
          <p>Too many matches, specify another filter</p> :
          renderCountries(countriesToShow, countryselected)
        }
      </ul>
    )
  }

  export default ShowInfo