import React from 'react';
import MoistureChart from './components/MoistureChart';
import MoistureForm from './components/MoistureForm';
import IrrigationForm from './components/IrrigationForm';
import MoistureLog from './components/MoistureLog';
import IrrigationLog from './components/IrrigationLog';

function App() {
  return (
    <div className="App">
      <h1>Turf Tracker Soil Moisture Trial</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
      Welcome to the Turf Tracker Soil Moisture Trial.<br />
      Please log your irrigation applications and moisture readings. Your data will appear on the chart and feed into predictions.
      </p>

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