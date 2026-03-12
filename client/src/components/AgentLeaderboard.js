import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AgentLeaderboard.css';

export default function AgentLeaderboard(){
  const [boards,setBoards]=useState([]);
  useEffect(()=>{ axios.get('http://localhost:5000/api/agents/leaderboard').then(r=>setBoards(r.data)).catch(()=>{}); },[]);
  return (
    <div>
      <h2>Agent Leaderboard</h2>
      <ol>
        {boards.map(b=> (
          <li key={b.agentId}><strong>{b.name}</strong> — Booked: {b.booked} / Assigned: {b.total}</li>
        ))}
      </ol>
    </div>
  );
}
