import axios from 'axios'
import { useState, useEffect } from 'react'

const CountryInfo = ({country}) => {
    const [weatherinfo, setWeatherInfo] = useState({})
    const API_KEY = import.meta.env.VITE_API_KEY
  
    useEffect(() => {
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${API_KEY}`)
        .then(response => {
          setWeatherInfo(response.data)
        })
    }, [country])
  
    const languages = [];
    for (const language in country.languages) {
      languages.push(country.languages[language])
    }
  
    const description = () => {
      return (
        <>
          <p> Description: {weatherinfo.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherinfo.weather[0].icon}@2x.png`} alt="Weather icon" />
        </>
      )
    }
    
  
    return (
      <>
        <h1>{country.name.common}</h1>
        <div className='contenedor'>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <p>Coordenadas: {country.latlng[0]}, {country.latlng[1]}</p>
        </div>
        <div className='contenedor'>
        {
          languages.map((language, i) => 
            <li key={i}>{language}</li>
          )
        }
        </div>
        <br/>
        <img src={country.flags.png} alt={country.name.common} />
        <h2>Weather in {country.name.common}</h2>
        <div className='contenedor'>
          <p> Temperature: {weatherinfo.main?.temp}°C</p>
          <p> MIN Temperature: {weatherinfo.main?.temp_min}°C</p>
          <p> MAX Temperature: {weatherinfo.main?.temp_max}°C</p>
          <p> Feels like: {weatherinfo.main?.feels_like}°C</p>
          <p> Humidity: {weatherinfo.main?.humidity}%</p>
          <p> Pressure: {weatherinfo.main?.pressure} hPa</p>
          <p> Wind: {weatherinfo.wind?.speed} m/s</p>
        </div>
        {weatherinfo.weather !== undefined ? description(): null}
        </>
    )
  }

  export default CountryInfo