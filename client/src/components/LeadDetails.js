import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeadDetails.css';

const STAGES = ['New Lead','Contacted','Requirement Collected','Property Suggested','Visit Scheduled','Visit Completed','Booked','Lost'];

export default function LeadDetails({ lead, onClose }){
  const [current, setCurrent] = useState(lead);
  const [agents, setAgents] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [datetime, setDatetime] = useState('');

  useEffect(()=>{ axios.get('http://localhost:5000/api/agents').then(r=>setAgents(r.data)).catch(()=>{}); },[]);

  async function changeStatus(s){
    const res = await axios.patch(`http://localhost:5000/api/leads/${current._id}`, { status: s });
    setCurrent(res.data);
  }

  async function assign(agentId){
    const res = await axios.post(`http://localhost:5000/api/leads/${current._id}/assign`, { agentId });
    setCurrent(res.data);
  }

  async function addNote(){
    const notes = current.notes || [];
    const newNote = { text: noteText, date: new Date(), by: 'agent' };
    const res = await axios.patch(`http://localhost:5000/api/leads/${current._id}`, { notes: [...notes, newNote] });
    setCurrent(res.data); setNoteText('');
  }

  async function scheduleVisit(){
    const res = await axios.post(`http://localhost:5000/api/leads/${current._id}/visit`, { propertyId, datetime });
    setCurrent(res.data); setPropertyId(''); setDatetime('');
  }

  return (
    <div style={{border:'1px solid #ddd',padding:12,marginTop:12}}>
      <button onClick={onClose}>Close</button>
      <h3>{current.name || '—'} ({current.phone})</h3>
      <div>
        <label>Status: </label>
        <select value={current.status} onChange={e=>changeStatus(e.target.value)}>
          {STAGES.map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{marginTop:8}}>
        <label>Assign to agent: </label>
        <select onChange={e=>assign(e.target.value)} value={current.assignedAgent ? current.assignedAgent._id : ''}>
          <option value=''>--select--</option>
          {agents.map(a=> <option key={a._id} value={a._id}>{a.name} ({a.phone})</option>)}
        </select>
      </div>

      <div style={{marginTop:8}}>
        <h4>Schedule Visit</h4>
        <div><label>Property ID</label><input value={propertyId} onChange={e=>setPropertyId(e.target.value)} /></div>
        <div><label>Date/time</label><input type="datetime-local" value={datetime} onChange={e=>setDatetime(e.target.value)} /></div>
        <button onClick={scheduleVisit}>Schedule</button>
      </div>

      <div style={{marginTop:8}}>
        <h4>Notes</h4>
        <ul>
          {(current.notes||[]).map((n,i)=> <li key={i}>{n.text} <small>({new Date(n.date).toLocaleString()})</small></li>)}
        </ul>
        <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} />
        <div><button onClick={addNote}>Add Note</button></div>
      </div>
    </div>
  );
}
