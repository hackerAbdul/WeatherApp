import React, {useState} from 'react'
import axios from 'axios';
import './App.css';

function App() {


  
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=Birmingham,uk&appid=9c635a90c6d2d9352ee769c425d53ab6`
  

  return (
    <div className="app">
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>Birmingham</p>
          </div>
          <div className='temp'>
            <h1>5°C</h1>
          </div>
          <div className='description'>
            <p>Clouds</p>
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            <p>0°c</p>
          </div>
          <div className='humidity'>
            <p>84%</p>
          </div>
          <div className='wind'>
            <p>10mph</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
