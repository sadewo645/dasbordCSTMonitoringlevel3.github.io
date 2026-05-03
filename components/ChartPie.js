'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartPie({ vol_cpo_l=0, vol_water_l=0, vol_sludge_l=0 }) {
  const data = [
    { name: 'CPO', value: vol_cpo_l, color: '#facc15' },
    { name: 'Water', value: vol_water_l, color: '#22d3ee' },
    { name: 'Sludge', value: vol_sludge_l, color: '#92400e' }
  ];
  return <div className="glass p-4 h-72"><h3 className="text-lg mb-3">Volume Distribution</h3><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" innerRadius={50} outerRadius={90}>{data.map((x)=><Cell key={x.name} fill={x.color} />)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div>;
}
