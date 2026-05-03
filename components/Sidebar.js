import { FaChartLine, FaBell, FaHistory, FaFileAlt, FaCog, FaInfoCircle, FaTachometerAlt } from 'react-icons/fa';
import { MdDataUsage } from 'react-icons/md';

const menus = [
  ['Dashboard', FaTachometerAlt], ['Realtime Data', MdDataUsage], ['Trends', FaChartLine], ['Alarms', FaBell],
  ['History', FaHistory], ['Reports', FaFileAlt], ['Settings', FaCog], ['About', FaInfoCircle]
];

export default function Sidebar() {
  return (
    <aside className="glass p-4 h-full">
      <h2 className="text-xl font-bold mb-6">CST MONITORING</h2>
      <ul className="space-y-2">
        {menus.map(([name, Icon], i) => (
          <li key={name} className={`p-3 rounded-xl flex items-center gap-3 ${i===0 ? 'bg-cyan-500/20 border border-cyan-400/40' : 'hover:bg-slate-800/60'}`}>
            <Icon className="text-cyan-300"/> {name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
