import { useState, useEffect } from 'react'
import countryService from './services/countries'

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
      console.log('cntry len: ', countries.length)
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
  console.log('query: ', newQuery)

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
  console.log('countries: ', countries)

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(newQuery.toLowerCase())
  )
  console.log('countriesToShow: ', countriesToShow)
  console.log('found countries: ', countriesToShow.map(ctry => ctry.name.common))

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