import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Users, BookOpen, GraduationCap, Phone } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userData?.isAdmin) {
      fetchUsers();
    } else if (userData && !userData.isAdmin) {
      setLoading(false); // Make sure to stop loading if unauthorized
    }
  }, [userData, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (userData && !userData.isAdmin) {
    return (
      <Layout>
        <div className="flex flex-col h-[60vh] items-center justify-center">
          <div className="glass-panel p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-200 mb-2">Unauthorized Access</h2>
            <p className="text-slate-400 mb-6">You must be an administrator to view this portal. Please contact the system owner if you believe this is an error.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Manage all registered students in the system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 flex items-center gap-4 border-l-4 border-neon-blue h-32">
          <div className="p-3 bg-neon-blue/20 rounded-lg text-neon-blue">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400">Total Students</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </div>
        
        {/* Dynamic Analytics Charts */}
        <div className="glass-panel p-6 md:col-span-2">
          <h2 className="text-xl font-bold mb-4 border-b border-dark-border pb-2">Analytics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-2 text-center">Students by Department</h3>
              <div className="h-48 flex justify-center">
                <Pie 
                  data={{
                    labels: Object.keys(users.reduce((acc, u) => ({...acc, [u.department || 'Unknown']: 1}), {})),
                    datasets: [{
                      data: Object.values(users.reduce((acc, u) => {
                        const dept = u.department || 'Unknown';
                        acc[dept] = (acc[dept] || 0) + 1;
                        return acc;
                      }, {})),
                      backgroundColor: ['rgba(59, 130, 246, 0.6)', 'rgba(139, 92, 246, 0.6)', 'rgba(16, 185, 129, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(239, 68, 68, 0.6)'],
                      borderColor: ['rgba(59, 130, 246, 1)', 'rgba(139, 92, 246, 1)', 'rgba(16, 185, 129, 1)', 'rgba(245, 158, 11, 1)', 'rgba(239, 68, 68, 1)'],
                      borderWidth: 1,
                    }]
                  }}
                  options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#cbd5e1' } } } }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-2 text-center">Students by College</h3>
              <div className="h-48">
                <Bar 
                  data={{
                    labels: Object.keys(users.reduce((acc, u) => ({...acc, [u.college || 'Unknown']: 1}), {})),
                    datasets: [{
                      label: 'Students',
                      data: Object.values(users.reduce((acc, u) => {
                        const col = u.college || 'Unknown';
                        acc[col] = (acc[col] || 0) + 1;
                        return acc;
                      }, {})),
                      backgroundColor: 'rgba(59, 130, 246, 0.6)',
                      borderColor: 'rgba(59, 130, 246, 1)',
                      borderWidth: 1,
                    }]
                  }}
                  options={{ 
                    maintainAspectRatio: false, 
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { ticks: { color: '#cbd5e1', stepSize: 1 }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                      x: { ticks: { color: '#cbd5e1' }, grid: { display: false } }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-6 border-b border-dark-border">
          <h2 className="text-xl font-bold">Registered Students</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-dark-border text-slate-300 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Mobile</th>
                <th className="p-4 font-medium">College</th>
                <th className="p-4 font-medium">Department</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-dark-border/50 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-neon-blue border border-neon-blue/50">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="font-medium text-slate-200">{user.name || 'N/A'}</span>
                      {user.isAdmin && <span className="text-[10px] bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded-full ml-2">Admin</span>}
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 text-sm">{user.email || 'N/A'}</td>
                  <td className="p-4 text-slate-300 text-sm flex items-center gap-2">
                    {user.mobile && <Phone size={14} className="text-slate-500"/>}
                    {user.mobile || 'N/A'}
                  </td>
                  <td className="p-4 text-slate-300 text-sm flex items-center gap-2">
                    {user.college && <BookOpen size={14} className="text-slate-500"/>}
                    {user.college || 'N/A'}
                  </td>
                  <td className="p-4 text-slate-300 text-sm flex items-center gap-2">
                    {user.department && <GraduationCap size={14} className="text-slate-500"/>}
                    {user.department || 'N/A'}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No students registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
