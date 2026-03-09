import React, { useState } from 'react';
import axios from 'axios';

export default function LeadForm(){
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [source,setSource]=useState('Website');
  const [msg,setMsg]=useState('');

  async function submit(e){
    e.preventDefault();
    try{
      await axios.post('http://localhost:5000/api/leads',{ name, phone, source });
      setMsg('Lead submitted'); setName(''); setPhone('');
    }catch(e){ setMsg('Error'); }
  }

  return (
    <div>
      <h2>Capture Lead</h2>
      <form onSubmit={submit}>
        <div><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><label>Phone</label><input value={phone} onChange={e=>setPhone(e.target.value)} required /></div>
        <div><label>Source</label>
          <select value={source} onChange={e=>setSource(e.target.value)}>
            <option>Website</option>
            <option>WhatsApp</option>
            <option>Social</option>
            <option>Phone</option>
            <option>Lead Form</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>{msg}</div>
    </div>
  );
}
