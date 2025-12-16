import {useState, useEffect} from "react"
import countyService from "./services/countries"

const ShowButton = ({country, setNewCountry}) => {
    return(
        <button type="button" onClick={() => setNewCountry(country.name.common)}>Show</button>
    )
}


const SearchForm = ({handleCountryChange, newCountry}) => {
    return (
        <form>
            <div>Find countries: <input value={newCountry} onChange={handleCountryChange}/></div>
        </form>
    )
}

const findCountry = ({countries, newCountry}) => {
    return (
        countries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))
    )
}

const Countries = ({countries,newCountry, setNewCountry}) => {
    const filteredCountries= findCountry({
        countries: countries,
        newCountry: newCountry
    })
    console.log(`rendered ${filteredCountries.length} countries`)
    if (filteredCountries.length > 10) {
        return <p>too many matches, specify another filter</p>
    }
    else if (filteredCountries.length > 1) {
        return (
            filteredCountries.map(country =>
                <p key={country.name.common}>
                {country.name.common}: <ShowButton country={country} setNewCountry={setNewCountry}/>
            </p>)
        )
    }
    else if (filteredCountries.length > 0) {
        const country = filteredCountries[0]
        const languageList = Object.values(country.languages).map(language => <li key={language}>{language}</li>)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area} km<sup>2</sup></p>
                <h2>Languages</h2>
                <ul>
                    {languageList}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}/>
            </div>
        )
    }
    else {
        return <p>no countries matching your criteria found</p>
    }

}




const App = () => {
    const [countries, setCountries] = useState([])
    const [newCountry, setNewCountry] = useState("")

    useEffect(() => {
        console.log("effect")
        countyService
            .getAll()
            .then(response => {
                console.log("promise fulfilled")
                setCountries(response.data)
            })
    },[])



    const handleCountryChange = (event) => {
        setNewCountry(event.target.value)
        }


    return (
        <div>
            <SearchForm handleCountryChange={handleCountryChange} newCountry={newCountry} />
            <Countries countries={countries} newCountry={newCountry} setNewCountry={setNewCountry}/>
        </div>
    )
}

export default App
