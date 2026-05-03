import { motion } from 'framer-motion';

export default function DataCard({ title, value, unit, color = 'text-cyan-300' }) {
  return (
    <motion.div layout className="glass p-4">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className={`text-2xl font-semibold ${color}`}>{value} <span className="text-sm text-slate-400">{unit}</span></p>
    </motion.div>
  );
}
