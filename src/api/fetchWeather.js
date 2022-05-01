import axios from "axios";

//variables for url and apikey
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

//creating a function to get data from another service
export const fetchWeather = async ( query ) => {
    const { data } = await axios.get(URL, {
        //query params  is a way to pass information to the url
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY
        }
    });

    //return data
    return data;
}