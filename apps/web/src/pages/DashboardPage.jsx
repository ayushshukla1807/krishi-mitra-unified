import React from 'react';
import { motion } from 'framer-motion';
import { useIoTTelemetry } from '../hooks/useIoTTelemetry';
import { Droplet, Thermometer, Wind, Beaker, ReplaceSweep } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function DashboardPage() {
  const { sensorData, isConnected } = useIoTTelemetry();
  // Mock history data for chart
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    setHistory((prev) => {
      const newHist = [...prev, { time: new Date().toLocaleTimeString(), moisture: sensorData.soilMoisture }];
      if (newHist.length > 20) newHist.shift();
      return newHist;
    });
  }, [sensorData.soilMoisture]);

  const stats = [
    { label: 'Soil Moisture', value: `${sensorData.soilMoisture.toFixed(1)}%`, icon: Droplet, color: 'text-blue-400' },
    { label: 'Temperature', value: `${sensorData.temperature.toFixed(1)}°C`, icon: Thermometer, color: 'text-orange-400' },
    { label: 'Humidity', value: `${sensorData.humidity.toFixed(1)}%`, icon: Wind, color: 'text-cyan-400' },
    { label: 'Nitrogen (N)', value: `${sensorData.nitrogen} mg/kg`, icon: Beaker, color: 'text-green-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Farm Overview</h1>
          <p className="text-slate-400">Real-time telemetry and predictive insights.</p>
        </div>
        <div className="flex items-center space-x-3 glass-dark px-4 py-2 rounded-full cursor-help group transition-all">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
          <span className="text-sm font-medium text-slate-300">
            {isConnected ? 'Sensors Online (WebSocket)' : 'Sensors Offline'}
          </span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-dark p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-colors"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-current opacity-5 blur-2xl ${stat.color}`} />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-slate-400 font-medium">{stat.label}</h3>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-4xl font-semibold text-white tracking-tight relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-dark p-6 rounded-2xl"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">Live Moisture Index</h3>
            <p className="text-sm text-slate-400">High-frequency readings from Sector A sensors</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff40" tick={{fontSize: 12}} />
                <YAxis domain={['auto', 'auto']} stroke="#ffffff40" tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#a6df52' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#a6df52" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 8, fill: '#a6df52', stroke: '#1E293B', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Insight Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass border-nature-500/30 p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-nature-500/10 to-transparent pointer-events-none" />
          <h3 className="text-lg font-bold text-white flex items-center space-x-2 mb-4">
             <span className="w-2 h-2 rounded-full bg-nature-400 animate-pulse" />
             <span>AI Analysis</span>
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm mb-6">
            Current soil nitrogen levels are optimal, but rapid moisture depletion suggests immediate irrigation is required in Sector B. 
            Weather forecast predicts no rain for the next 48 hours.
          </p>
          <button className="w-full py-3 px-4 bg-nature-500 hover:bg-nature-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-nature-500/25 flex items-center justify-center space-x-2">
            <Droplet className="w-4 h-4" />
            <span>Trigger Irrigation</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
