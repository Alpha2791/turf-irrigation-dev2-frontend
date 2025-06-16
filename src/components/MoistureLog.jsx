import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoistureLog = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('https://turf-irrigation-dev4-backend.onrender.com/moisture-log')
      .then(response => setEntries(response.data))
      .catch(error => console.error('Error fetching moisture log:', error));
  }, []);

  return (
    <div>
      <h2>Soil Moisture Log</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Moisture (mm)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.timestamp}>
              <td>{entry.timestamp}</td>
              <td>{entry.moisture_mm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoistureLog;
