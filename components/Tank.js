import { motion } from 'framer-motion';

export default function Tank({ cpo = 0, water = 0, sludge = 0, total = 1 }) {
  const cp = Math.max(0, (cpo / total) * 100);
  const wp = Math.max(0, (water / total) * 100);
  const sp = Math.max(0, (sludge / total) * 100);

  return (
    <div className="glass p-4">
      <h3 className="text-xl font-semibold mb-4">CST Level Gauge</h3>
      <div className="mx-auto h-96 w-52 rounded-[999px] border-4 border-slate-500/70 overflow-hidden bg-slate-900/80 relative">
        <motion.div animate={{ height: `${sp}%` }} className="absolute bottom-0 w-full bg-gradient-to-t from-amber-900 to-amber-700" />
        <motion.div animate={{ height: `${sp + wp}%` }} className="absolute bottom-0 w-full bg-gradient-to-t from-blue-700 to-cyan-400 opacity-90" />
        <motion.div animate={{ height: `${sp + wp + cp}%` }} className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-500 to-amber-300 opacity-90" />
      </div>
      <div className="grid grid-cols-3 text-sm mt-4 gap-2">
        <p className="text-yellow-300">CPO {cpo.toFixed(1)} cm ({cp.toFixed(1)}%)</p>
        <p className="text-cyan-300">Water {water.toFixed(1)} cm ({wp.toFixed(1)}%)</p>
        <p className="text-amber-500">Sludge {sludge.toFixed(1)} cm ({sp.toFixed(1)}%)</p>
      </div>
    </div>
  );
}
