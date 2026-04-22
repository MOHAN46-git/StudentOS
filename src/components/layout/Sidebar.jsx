import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { path: '/admin', label: 'Admin Panel', icon: <Shield size={20} /> },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 h-screen fixed top-0 left-0 glass-panel border-r-0 rounded-none z-50">
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gradient">StudentOS Admin</h1>
        </div>
        <nav className="px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 mb-4">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 border border-transparent"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
