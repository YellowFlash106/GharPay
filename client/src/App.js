import React, { useEffect, useState } from 'react';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import LeadList from './components/LeadList';
import AgentLeaderboard from './components/AgentLeaderboard';
import './App.css';

function App(){
  const [view, setView] = useState('dashboard');

  return (
    <div className="app">
      <header>
        <h1>Gharpayy CRM (MVP)</h1>
        <nav>
          <button onClick={() => setView('dashboard')}>Dashboard</button>
          <button onClick={() => setView('leads')}>Leads</button>
          <button onClick={() => setView('capture')}>Capture Lead</button>
          <button onClick={() => setView('agents')}>Agents</button>
        </nav>
      </header>
      <main>
        {view === 'dashboard' && <Dashboard />}
        {view === 'capture' && <LeadForm />}
        {view === 'leads' && <LeadList />}
        {view === 'agents' && <AgentLeaderboard />}
      </main>
    </div>
  );
}

export default App;
