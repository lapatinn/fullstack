import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'

const apikey = import.meta.env.VITE_WEATHER_API_KEY

const GetWeatherData = (country) => {
  const lat = country.latlng[0]
  const lon = country.latlng[1]
  const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
  return response.then(response => response.data)
}

const FilterForm = ({ query, handler }) => {
  return(
    <div>
      Filter countries: <input value={query} onChange={handler} />
    </div>
  )
}

const Countries = ({ countries, query, handleShow, selectedCountry }) => {
  if (selectedCountry) {
    return <CountryInfo country={selectedCountry} />
  }
  if (query != '') {
    if (countries.length >= 10) {
      return(
        <div>
          Too many matches, specify another filter.
        </div>
      )
    } else if (countries.length === 1) {

      return(
        <div>
          {countries.map(ctry =>
            <CountryInfo country={ctry}/>
          )}
        </div>
      )
    } else {
      return(
        <div>
          {countries.map(ctry =>
            <CountryName key={ctry.name.common} country={ctry} handleShow={handleShow}/>
          )}
        </div>
      )
    }
  } else {
    return(
      <div>
        Enter a query to filter countries.
      </div>
    )
  }
}

const ShowButton = ({ country, handleShow }) => {
  return(
      <button onClick={() => handleShow(country)}>
        Show
      </button>
  )
}

const CountryName = ({ country, handleShow }) => {
  return(
    <div>
      {country.name.common} <ShowButton country={country} handleShow={handleShow} />
    </div>
  )
}

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)

  useEffect(() => {
    GetWeatherData(country)
    .then(data => {
      setWeather(data)
    })
  }, [country])

  return(
    <div>
      <h2>{country.name.common}</h2>
      <div>
        Capital: {country.capital}
      </div>
      <div>
        Area: {country.area}
      </div>
      <h3>Languages</h3>
      <div>
        <ul>
          {Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <h3>Flag</h3>
      <div>
        <img src={`${country.flags.png}`} alt={`Flag of ${country.name.common}`} />
      </div>
      <h3>Weather in {country.capital}</h3>
        {weather === null ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} alt="" />
            <p>{weather.weather[0].main}</p>
            <p>Wind {weather.wind.speed} m/s</p>
          </div>
        )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newQuery, setNewQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleQueryChange = (event) => {
    setNewQuery(event.target.value)
    setSelectedCountry(null)
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  useEffect(() => {
    countryService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(newQuery.toLowerCase())
  )

  return(
    <div>
      <h1>Super advanced country info provider</h1>
      <div>
        <FilterForm 
          query={newQuery} 
          handler={handleQueryChange} 
        />
      </div>
      <div>
        <Countries 
          countries={countriesToShow} 
          query={newQuery}
          handleShow={handleShow}
          selectedCountry={selectedCountry}
        />
      </div>
    </div>
  )
}

export default App