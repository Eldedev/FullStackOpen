import axios from "axios"
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=`



const getWeather = (cityName, countryCode) => {
    return (
        axios.get(`${baseUrl}${cityName},${countryCode}&limit=1&appid=${api_key}&units=metric`)
    )
}

export default {getWeather}