import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-gradient">Welcome Back</h2>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-lg mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Email</label>
            <input type="email" required className="glass-input w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Password</label>
            <input type="password" required className="glass-input w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button disabled={loading} type="submit" className="btn-primary mt-4 w-full">
            Log In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-400">
          Need an account? <Link to="/register" className="text-neon-blue hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
}
