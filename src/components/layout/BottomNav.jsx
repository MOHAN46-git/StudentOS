import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { path: '/admin', label: 'Admin', icon: <Shield size={20} /> },
];

export default function BottomNav() {
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
    <nav className="md:hidden fixed bottom-0 left-0 w-full glass-panel rounded-none border-t border-dark-border z-50 pb-safe">
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? 'text-neon-blue' : 'text-slate-400'
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
        <button 
          onClick={handleLogout}
          className="flex flex-col items-center p-2 rounded-xl transition-all text-slate-400 hover:text-rose-400"
        >
          <LogOut size={20} />
          <span className="text-xs mt-1 font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
