import axios from "axios"
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=`



const getWeather = (cityName) => {
    return (
        axios.get(`${baseUrl}${cityName}&limit=1&appid=${api_key}&units=metric`)
    )
}

export default {getWeather}