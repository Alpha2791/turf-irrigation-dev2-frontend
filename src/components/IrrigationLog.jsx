import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IrrigationLog = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8001/irrigation-log')
      .then(response => setEntries(response.data))
      .catch(error => console.error('Error fetching irrigation log:', error));
  }, []);

  return (
    <div>
      <h2>Irrigation Log</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Irrigation (mm)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.timestamp}>
              <td>{entry.timestamp}</td>
              <td>{entry.irrigation_mm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IrrigationLog;
