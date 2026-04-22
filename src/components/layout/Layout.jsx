import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 pb-20 md:pb-0 p-4 md:p-8">
        <div className="max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
