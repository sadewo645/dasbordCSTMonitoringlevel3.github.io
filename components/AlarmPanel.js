export default function AlarmPanel({ data }) {
  const alarms = [];
  if ((data.temp1 ?? 0) > 95 || (data.temp2 ?? 0) > 95) alarms.push('Temperature high (>95°C)');
  if ((data.total_level_cm ?? 0) > 90) alarms.push('Total level too high');
  if ((data.pressure_ref ?? 0) > 2.2 || (data.pressure_ref ?? 0) < 0.8) alarms.push('Abnormal pressure');

  return (
    <div className="glass p-4">
      <h3 className="text-lg mb-3">Process Alarms</h3>
      <div className="space-y-2">
        {alarms.length ? alarms.map((a)=> <div key={a} className="border border-orange-400/40 bg-orange-500/10 p-3 rounded-lg text-orange-200">{a}</div>) : <p className="text-emerald-300">No active alarms.</p>}
      </div>
    </div>
  );
}
