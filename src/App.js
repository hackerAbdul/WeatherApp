import React, {useState} from 'react'
import axios from 'axios';
import './App.css';
import key from './assets/key'

function App() {

  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
  // const [country, setCountry] = useState('')

  
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=9c635a90c6d2d9352ee769c425d53ab6`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9c635a90c6d2d9352ee769c425d53ab6`
  
  function searchBar(event){
    if (event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
      // setCountry('')
    }
    
  } 

  
  function celsius(temp){
    let res = Math.floor(temp-273.15)
    

    return res
  }


  return (
    <div className="app">
      <div className='search'>
        <input 
          type="text" 
          value={location}
          onChange={event =>setLocation(event.target.value)}
          onKeyPress={searchBar}
          placeholder="Enter Location"
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
            </div>
          <div className='country'>
            <p>{data.sys.country}</p>
          </div>
          <div className='temp'>
            <h1>{celsius(data.main.temp)}°C</h1>
          </div>
          <div className='description'>
            <p>{data.weather[0].main}</p>
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            <p>Feels Like</p>
            <p>{celsius(data.main.feels_like)}</p>
          </div>
          <div className='humidity'>
            <p>Humidity</p>
            <p>{data.main.humidity}%</p>
          </div>
          <div className='wind'>
            <p>Wind Speed</p>
            <p>{data.wind.speed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
