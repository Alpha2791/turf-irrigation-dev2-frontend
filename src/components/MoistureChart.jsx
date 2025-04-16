import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, Bar
} from 'recharts';

const MoistureChart = () => {
  const [data, setData] = useState([]);
  const [wiltPoint, setWiltPoint] = useState(() => {
    const saved = localStorage.getItem("wiltPoint");
    return saved ? parseFloat(saved) : 18;
  });

  const [upperLimit, setUpperLimit] = useState(() => {
    const saved = localStorage.getItem("upperLimit");
    return saved ? parseFloat(saved) : 22;
  });

  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://turf-irrigation-dev2-backend.onrender.com/predicted-moisture");
        const processed = res.data.map(d => ({
          ...d,
          timestamp: d.timestamp.slice(0, 13),
        }));
        setData(processed);
        console.log("Preview chart data:");
        console.table(processed.slice(0, 10));
      } catch (err) {
        console.error("Error fetching predicted moisture:", err);
      }
    };

    const fetchForecast = async () => {
      try {
        const res = await axios.get(`https://turf-irrigation-dev2-backend.onrender.com/wilt-forecast?wilt_point=${wiltPoint}`);
        setForecast(res.data);
        console.log("Wilt forecast:", res.data);
      } catch (err) {
        console.error("Error fetching wilt forecast:", err);
      }
    };

    fetchData();
    fetchForecast();
  }, [wiltPoint]);

  useEffect(() => {
    localStorage.setItem("wiltPoint", wiltPoint);
  }, [wiltPoint]);

  useEffect(() => {
    localStorage.setItem("upperLimit", upperLimit);
  }, [upperLimit]);

  const wiltTimestamp = forecast?.wilt_point_hit?.slice(0, 13);
  // const irrigationTip = forecast?.recommended_irrigation_mm; // Reserved for future use

  return (
    <div>
      <h2>Soil Moisture, ET, Rainfall & Irrigation</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="wiltPoint">Wilt Point: </label>
        <input
          id="wiltPoint"
          type="number"
          value={wiltPoint}
          onChange={(e) => setWiltPoint(parseFloat(e.target.value))}
          step="0.1"
          min="0"
        /> %
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label htmlFor="upperLimit">Upper Limit: </label>
        <input
          id="upperLimit"
          type="number"
          value={upperLimit}
          onChange={(e) => setUpperLimit(parseFloat(e.target.value))}
          step="0.1"
          min={wiltPoint + 0.1}
        /> %
      </div>

      {forecast && (
        <div style={{ marginBottom: '1rem', color: forecast?.message ? 'green' : 'black' }}>
          {forecast.message ? (
            <p><strong>Status:</strong> {forecast.message}</p>
          ) : (
            <>
              <p><strong>Wilt Point Hit:</strong> {forecast.wilt_point_hit}</p>
              <p><strong>Recommended Irrigation:</strong> {forecast.recommended_irrigation_mm} mm</p>
            </>
          )}
        </div>
      )}

      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" angle={-45} textAnchor="end" height={60} interval={Math.ceil(data.length / 12)} />
          <YAxis yAxisId="left" label={{ value: 'Moisture / Inputs (mm)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'ET (mm/hr)', angle: -90, position: 'insideRight' }} />
          <Tooltip />
          <Legend verticalAlign="top" />

          <ReferenceLine y={wiltPoint} yAxisId="left" stroke="red" strokeDasharray="4 4" label="Wilt Point" />

          {wiltTimestamp && (
            <ReferenceLine x={wiltTimestamp} stroke="orange" strokeDasharray="3 3" label="Wilt Forecast" />
          )}

          <Line yAxisId="left" type="monotone" dataKey="predicted_moisture_mm" name="Moisture" stroke="#007acc" strokeWidth={2} dot={false} />
          <Bar yAxisId="left" dataKey="irrigation_mm" name="Irrigation" fill="#99ccff" barSize={10} />
          <Bar yAxisId="left" dataKey="rainfall_mm" name="Rainfall" fill="#3399ff" barSize={10} />
          <Line yAxisId="right" type="monotone" dataKey="ET_mm_hour" name="ET" stroke="#00cc66" strokeDasharray="4 4" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoistureChart;
