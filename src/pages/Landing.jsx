import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glass-panel p-12 text-center max-w-3xl w-full">
        <h1 className="text-5xl font-bold mb-6 text-gradient">StudentOS</h1>
        <p className="text-xl text-slate-300 mb-10">Personal Academic Analytics System</p>
        <div className="flex gap-4 justify-center">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="glass-panel px-6 py-3 font-medium hover:bg-slate-800 transition-colors">Register</Link>
        </div>
      </div>
    </div>
  );
}
