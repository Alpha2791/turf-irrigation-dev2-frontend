import React from 'react';
import MoistureChart from './components/MoistureChart';
import MoistureForm from './components/MoistureForm';
import IrrigationForm from './components/IrrigationForm';
import MoistureLog from './components/MoistureLog';
import IrrigationLog from './components/IrrigationLog';

function App() {
  return (
    <div className="App">
      <h1>Turf Tracker Soil Moisture Trail</h1>
      <MoistureForm />
      <hr />
      <IrrigationForm />
      <hr />
      <MoistureLog />
      <hr />
      <IrrigationLog />
      <hr />
      <MoistureChart />
    </div>
  );
}

export default App;