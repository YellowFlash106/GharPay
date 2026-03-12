import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeadDetails from './LeadDetails';
import './LeadList.css';

export default function LeadList(){
  const [leads,setLeads]=useState([]);
  const [selected,setSelected]=useState(null);

  useEffect(()=>{ axios.get('http://localhost:5000/api/leads').then(r=>setLeads(r.data)).catch(()=>{}); },[]);

  return (
    <div>
      <h2>Leads</h2>
      <ul>
        {leads.map(l=> (
          <li key={l._id} style={{marginBottom:8}}>
            <strong>{l.name || '—'}</strong> {l.phone} — <em>{l.status}</em>
            <button style={{marginLeft:8}} onClick={()=>setSelected(l)}>Manage</button>
          </li>
        ))}
      </ul>
      {selected && <LeadDetails lead={selected} onClose={()=>{ setSelected(null); axios.get('http://localhost:5000/api/leads').then(r=>setLeads(r.data)).catch(()=>{}); }} />}
    </div>
  );
}
