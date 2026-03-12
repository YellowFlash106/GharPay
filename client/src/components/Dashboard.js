import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard(){
  const [stats,setStats]=useState(null);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/leads/stats/summary').then(r=>setStats(r.data)).catch(()=>{});
  },[]);

  if(!stats) return <div>Loading...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li><strong>Total leads:</strong> {stats.total}</li>
        <li><strong>Visits scheduled:</strong> {stats.visits}</li>
        <li><strong>Bookings:</strong> {stats.booked}</li>
      </ul>
      <h3>Pipeline</h3>
      <ul>
        {Object.keys(stats).filter(k=>k!=='total'&&k!=='visits'&&k!=='booked').map(k=> (
          <li key={k}><strong>{k}:</strong> {stats[k]}</li>
        ))}
      </ul>
    </div>
  );
}
