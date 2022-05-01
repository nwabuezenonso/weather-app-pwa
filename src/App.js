import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';


function App() {
  //setting state for query and weather
  const [ query, setQuery] = useState('');
  const [ weather, setWeather] = useState({});

  //function that will receive data from the featherweather api
  const search = async (e) =>{
    if( e.key === 'Enter'){
      const data =  await fetchWeather(query);

      //set weather to be the data
      setWeather(data);

      //setquery to be empty
      setQuery('')
    }
  }

  //returning a set of jsx and passing the state on the onclick function
  //call the function on the onkeypress function
  return (
    <div className="main-container">
      <input 
        type="text"
        className='search'
        placeholder='Search...'
        value={query}
        onChange={ (e) => setQuery(e.target.value) }
        onKeyPress= {search}
      />
      {/* if weather exist the it will return react component */}
      { weather.main && (
        <div className='city'>
          <h2 className='city-name'>
              <span>{weather.name}</span>
              {/* superscript are text that are above other texts */}
              <sup>{weather.name}</sup>
          </h2>
          <div className='city-temp'>
            {Math.round(weather.main.temp)}
            <sup>&deg;C </sup>
          </div>
        </div>
      )}
    </div>
  );
}

//exporting app
export default App;
