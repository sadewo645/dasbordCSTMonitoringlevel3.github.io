'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import mqtt from 'mqtt';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DataCard from '../components/DataCard';
import Tank from '../components/Tank';
import ChartLine from '../components/ChartLine';
import ChartPie from '../components/ChartPie';
import AlarmPanel from '../components/AlarmPanel';

const MQTT_URL = 'wss://greenbumble-c0e61843.a03.euc1.aws.hivemq.cloud:8884/mqtt';
const TOPIC = 'cst/data';
const initialData = { temp1: 0, temp2: 0, cpo: 0, water: 0, sludge: 0, total_level_cm: 0, vol_cpo_l: 0, vol_water_l: 0, vol_sludge_l: 0, mass_cpo: 0, mass_water: 0, mass_sludge: 0, weight_cpo: 0, weight_water: 0, weight_sludge: 0, humidity_avg: 0, pressure_ref: 0 };

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState(initialData);
  const [history, setHistory] = useState([]);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = mqtt.connect(MQTT_URL, {
      username: 'esp32user', password: 'Esp32user', reconnectPeriod: 2000, connectTimeout: 10_000, clean: true
    });
    clientRef.current = client;

    client.on('connect', () => {
      console.log('[MQTT] Connected');
      setConnected(true);
      client.subscribe(TOPIC, (err) => err && console.error('[MQTT] Subscribe error', err));
    });
    client.on('reconnect', () => console.log('[MQTT] Reconnecting...'));
    client.on('close', () => { console.log('[MQTT] Disconnected'); setConnected(false); });
    client.on('error', (e) => console.error('[MQTT] Error', e));
    client.on('message', (_, message) => {
      try {
        const payload = JSON.parse(message.toString());
        console.log('[MQTT] Incoming:', payload);
        setData((prev) => ({ ...prev, ...payload }));
        setHistory((prev) => [...prev.slice(-49), { time: new Date().toLocaleTimeString(), ...payload }]);
      } catch (e) { console.error('JSON parse error', e); }
    });

    return () => client.end(true);
  }, []);

  const avgTemp = useMemo(() => ((data.temp1 + data.temp2) / 2 || 0), [data.temp1, data.temp2]);
  const tempClass = (t) => (t >= 85 && t <= 95 ? 'text-cyan-300' : 'text-red-400');

  return (
    <main className="p-4 min-h-screen">
      <div className="grid lg:grid-cols-[260px_1fr] gap-4">
        <Sidebar />
        <section className="space-y-4">
          <Header connected={connected} />
          <div className="grid xl:grid-cols-3 gap-4">
            <div className="space-y-4 xl:col-span-2">
              <div className="grid md:grid-cols-3 gap-4">
                <DataCard title="temp1" value={(data.temp1 ?? 0).toFixed(1)} unit="°C" color={tempClass(data.temp1)} />
                <DataCard title="temp2" value={(data.temp2 ?? 0).toFixed(1)} unit="°C" color={tempClass(data.temp2)} />
                <DataCard title="avg_temp" value={avgTemp.toFixed(1)} unit="°C" color={tempClass(avgTemp)} />
              </div>
              <Tank cpo={data.cpo ?? 0} water={data.water ?? 0} sludge={data.sludge ?? 0} total={data.total_level_cm || 1} />
              <div className="grid md:grid-cols-3 gap-4">
                <DataCard title="vol_cpo_l" value={(data.vol_cpo_l ?? 0).toFixed(2)} unit="L" />
                <DataCard title="vol_water_l" value={(data.vol_water_l ?? 0).toFixed(2)} unit="L" />
                <DataCard title="vol_sludge_l" value={(data.vol_sludge_l ?? 0).toFixed(2)} unit="L" />
                <DataCard title="mass_cpo" value={(data.mass_cpo ?? 0).toFixed(2)} unit="kg" />
                <DataCard title="mass_water" value={(data.mass_water ?? 0).toFixed(2)} unit="kg" />
                <DataCard title="mass_sludge" value={(data.mass_sludge ?? 0).toFixed(2)} unit="kg" />
                <DataCard title="weight_cpo" value={(data.weight_cpo ?? 0).toFixed(2)} unit="N" />
                <DataCard title="weight_water" value={(data.weight_water ?? 0).toFixed(2)} unit="N" />
                <DataCard title="weight_sludge" value={(data.weight_sludge ?? 0).toFixed(2)} unit="N" />
              </div>
              <ChartLine history={history} />
            </div>
            <div className="space-y-4">
              <div className="glass p-4"><h3 className="text-lg">pressure_ref</h3><p className="text-3xl text-cyan-300">{(data.pressure_ref ?? 0).toFixed(2)} bar</p></div>
              <div className="glass p-4"><h3 className="text-lg">total_level_cm</h3><p className="text-3xl text-cyan-300">{(data.total_level_cm ?? 0).toFixed(1)} cm</p><div className="w-full h-3 bg-slate-700 rounded-full mt-3"><div className="h-full bg-cyan-400 rounded-full" style={{width: `${Math.min((data.total_level_cm/100)*100,100)}%`}}/></div></div>
              <ChartPie vol_cpo_l={data.vol_cpo_l} vol_water_l={data.vol_water_l} vol_sludge_l={data.vol_sludge_l} />
              <AlarmPanel data={data} />
            </div>
          </div>
          <div className="glass p-4 overflow-auto scrollbar-thin">
            <h3 className="text-lg mb-3">Latest Readings</h3>
            <table className="w-full text-sm">
              <thead><tr className="text-slate-400"><th>Timestamp</th><th>cpo</th><th>water</th><th>sludge</th><th>total_level_cm</th><th>temp1</th><th>temp2</th></tr></thead>
              <tbody>
                {history.slice().reverse().slice(0, 10).map((row, i) => <tr key={i} className="border-t border-slate-700/50"><td>{row.time}</td><td>{row.cpo ?? '--'}</td><td>{row.water ?? '--'}</td><td>{row.sludge ?? '--'}</td><td>{row.total_level_cm ?? '--'}</td><td>{row.temp1 ?? '--'}</td><td>{row.temp2 ?? '--'}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
