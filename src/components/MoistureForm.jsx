import React, { useState } from 'react';
import axios from 'axios';

const MoistureForm = () => {
  const [timestamp, setTimestamp] = useState('');
  const [form, setForm] = useState({
    moisture_mm: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://turf-irrigation-dev2-backend.onrender.com/log-moisture', {
      timestamp,
      moisture_mm: parseFloat(form.moisture_mm)
    });
    setForm({ moisture_mm: '' });
    setTimestamp('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="timestamp">Timestamp</label>
      <input
        type="datetime-local"
        id="timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        required
      />
      <br />
      <label htmlFor="moisture_mm">Soil Moisture (%)</label>
      <input
        type="number"
        id="moisture_mm"
        value={form.moisture_mm}
        onChange={(e) => setForm({ ...form, moisture_mm: e.target.value })}
        step="0.1"
        min="0"
        max="100"
        required
        placeholder="e.g. 22.5"
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MoistureForm;
