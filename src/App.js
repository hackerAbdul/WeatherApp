import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';

function App() {


  //renders response for london upon starting/refreshing page
  const fetchData = () =>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${process.env.REACT_APP_API_KEY}`).then((response) =>{
      setData(response.data)
      console.log(response.data)
    })
  }

  const [data,setData] = useState({fetchData})
  const [location, setLocation] = useState('')

  //render default api call
  useEffect(() =>{
    fetchData();
  }, [])
  
  const defaultLocation = "London"

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`
  
  

  //function to return api call depending on the search
  function searchBar(event){
    if(event.key === 'Enter' && location.trim()=== ""){      
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${process.env.REACT_APP_API_KEY}`).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }else if (event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      }).catch((err)=>{
        if(err.response.status === 404){
          alert("Invalid City")
        }
      })
      setLocation('')
      // setCountry('')
    }
  } 

  //function to change temp from kelvin to celsius
  function celsius(temp){
    let res = Math.floor(temp-273.15)
    return res
  }

  function timezone(time){

    let newTime = 0

    if (parseFloat(time) >= 0){
      
      newTime = (new Date(data.dt*1000+(data.timezone*1000)))
    }else{
      newTime = (new Date(data.dt*1000+(data.timezone*1000)));
    }

    return newTime.getHours().toString().padStart(2, "0") +":"+ newTime.getMinutes().toString().padStart(2, "0");
    
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
            {data.sys ? <p>{data.sys.country}</p> : null}
          </div>
          <div className='temp'>
            {data.main ? <h1>{celsius(data.main.temp)}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>Last Checked {timezone(data.timezone)}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className='bottom'>
          <div className='feels'>
            <p>Feels Like</p>
            {data.main ? <p>{celsius(data.main.feels_like)}</p> : null}
          </div>
          <div className='humidity'>
            <p>Humidity</p>
            {data.main ? <p>{data.main.humidity}%</p> : null}
          </div>
          <div className='wind'>
            <p>Wind Speed</p>
            {data.wind ? <p>{Math.floor(data.wind.speed)}MPH</p> :null}
          </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default App;
