'use client';
import { useEffect, useState } from 'react';
import { FaBell, FaCog } from 'react-icons/fa';

export default function Header({ connected }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleString());
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <header className="glass p-4 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">CST Monitoring System</h1>
        <p className="text-slate-400">Continuous Settling Tank</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-4 py-2 rounded-full border ${connected ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-red-500/20 border-red-400 text-red-300'}`}>
          MQTT {connected ? 'Connected' : 'Disconnected'}
        </span>
        <span className="text-slate-300">{time}</span>
        <FaBell/><FaCog/>
      </div>
    </header>
  );
}
