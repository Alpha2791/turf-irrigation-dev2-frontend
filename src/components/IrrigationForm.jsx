import React, { useState } from 'react';
import axios from 'axios';

const IrrigationForm = () => {
  const [timestamp, setTimestamp] = useState('');
  const [irrigation, setIrrigation] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://turf-irrigation-dev4-backend.onrender.com/log-irrigation', {
        timestamp,
        irrigation_mm: parseFloat(irrigation),
      });
      setStatus('Irrigation logged successfully.');
      setTimestamp('');
      setIrrigation('');
    } catch (error) {
      setStatus('Error logging irrigation.');
    }
  };

  return (
    <div>
      <h2>Log Irrigation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Timestamp:
          <input
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Irrigation (mm):
          <input
            type="number"
            step="0.1"
            value={irrigation}
            onChange={(e) => setIrrigation(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default IrrigationForm;
