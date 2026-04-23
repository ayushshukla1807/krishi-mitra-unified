import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, PieChart as PieIcon, BarChart3 } from 'lucide-react';

const priceData = [
  { month: 'Jan', wheat: 2400, rice: 3200 },
  { month: 'Feb', wheat: 2100, rice: 3400 },
  { month: 'Mar', wheat: 2800, rice: 3100 },
  { month: 'Apr', wheat: 2600, rice: 3800 },
  { month: 'May', wheat: 3100, rice: 4000 },
];

const yieldData = [
  { name: 'Organic', value: 45 },
  { name: 'Conventional', value: 35 },
  { name: 'Hydroponic', value: 20 },
];

const COLORS = ['#a6df52', '#4f46e5', '#f97316'];

export default function MarketAnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Market Intelligence</h1>
        <p className="text-slate-400">Predictive yield analysis and price trend forecasting.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Trends */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-nature-400" />
              <span>Price Index (INR/Quintal)</span>
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a6df52" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a6df52" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#ffffff40" />
                <YAxis stroke="#ffffff40" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #ffffff20', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="wheat" stroke="#a6df52" fillOpacity={1} fill="url(#colorWheat)" />
                <Area type="monotone" dataKey="rice" stroke="#4f46e5" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Yield Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark p-6 rounded-2xl"
        >
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2 mb-6">
            <PieIcon className="w-5 h-5 text-indigo-400" />
            <span>Yield Contribution by Category</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={yieldData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {yieldData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {yieldData.map((entry, index) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs text-slate-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Forecast Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark p-6 rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Regional Forecast (Next 30 Days)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-4 text-slate-400 font-medium">Crop</th>
                <th className="pb-4 text-slate-400 font-medium">Estimated Demand</th>
                <th className="pb-4 text-slate-400 font-medium">Risk Factor</th>
                <th className="pb-4 text-slate-400 font-medium">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Wheat', demand: 'High', risk: 'Low', rec: 'Hold' },
                { name: 'Rice', demand: 'Stable', risk: 'Medium', rec: 'Sell' },
                { name: 'Cotton', demand: 'Increasing', risk: 'Low', rec: 'Hold' },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="py-4 text-white font-medium">{row.name}</td>
                  <td className="py-4 text-slate-300">{row.demand}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs ${row.risk === 'Low' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="py-4 text-nature-400">{row.rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
