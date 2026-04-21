import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Sprout, Tractor, Stethoscope, MessageSquare, LogOut } from 'lucide-react';

export default function AppLayout({ children }) {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Overview' },
    { to: '/crops', icon: Sprout, label: 'Crops' },
    { to: '/rentals', icon: Tractor, label: 'Rentals' },
    { to: '/disease-detection', icon: Stethoscope, label: 'Diagnosis' },
    { to: '/ai-agronomist', icon: MessageSquare, label: 'AI Agronomist' },
  ];

  return (
    <div className="flex h-screen w-full bg-dark-bg text-slate-100 overflow-hidden font-sans">
      {/* Sidebar background graphics */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-nature-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-64 glass-dark border-r border-white/5 flex flex-col z-10"
      >
        <div className="p-6 flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nature-400 to-nature-600 flex items-center justify-center shadow-lg shadow-nature-500/30">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Krishi Mitra</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/10 text-nature-300 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 p-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="h-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
