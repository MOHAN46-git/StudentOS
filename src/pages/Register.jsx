import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    college: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    if (!isValidEmail(formData.email)) {
      return setError('Please enter a valid email address');
    }
    if (formData.mobile.length < 10) {
      return setError('Please enter a valid mobile number');
    }

    try {
      setError('');
      setLoading(true);
      const { password, confirmPassword, ...userData } = formData;
      await register(formData.email, formData.password, userData);
      navigate('/admin');
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 my-8">
      <div className="glass-panel p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-gradient">Create Account</h2>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-lg mb-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Full Name</label>
            <input type="text" name="name" required className="glass-input w-full" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Date of Birth</label>
            <input type="date" name="dob" required className="glass-input w-full" value={formData.dob} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Email</label>
            <input type="email" name="email" required className="glass-input w-full" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Mobile Number</label>
            <input type="tel" name="mobile" required className="glass-input w-full" value={formData.mobile} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Password</label>
            <input type="password" name="password" required className="glass-input w-full" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Confirm Password</label>
            <input type="password" name="confirmPassword" required className="glass-input w-full" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mt-4 mb-2 border-b border-slate-700 pb-2">Academic Info</h3>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">College Name</label>
            <input type="text" name="college" required className="glass-input w-full" value={formData.college} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Department Name</label>
            <input type="text" name="department" required className="glass-input w-full" value={formData.department} onChange={handleChange} />
          </div>
          
          <div className="md:col-span-2 mt-4">
            <button disabled={loading} type="submit" className="btn-primary w-full">
              Register
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-neon-blue hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
