import React from 'react';
import ForecastGraph from './features/forecastGraph/ForecastGraph';
import './App.css'
import Filter from './features/filter/filter';
function App() {
  return (

    <div className="App">
      <div className='App-Header'>
        <h1>Header</h1>

      </div>
      <div className="Graph">
        <Filter />
        <ForecastGraph />
      </div>

    </div>
  );
}

export default App;
