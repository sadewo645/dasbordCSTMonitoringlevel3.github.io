'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ChartLine({ history }) {
  return (
    <div className="glass p-4 h-80">
      <h3 className="text-lg mb-3">Level Trends</h3>
      <ResponsiveContainer>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f"/>
          <XAxis dataKey="time" stroke="#94a3b8"/>
          <YAxis stroke="#94a3b8"/>
          <Tooltip/>
          <Line type="monotone" dataKey="cpo" stroke="#facc15" dot={false}/>
          <Line type="monotone" dataKey="water" stroke="#22d3ee" dot={false}/>
          <Line type="monotone" dataKey="sludge" stroke="#b45309" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
