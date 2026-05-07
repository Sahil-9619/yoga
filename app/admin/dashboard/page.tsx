"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthService } from '../../services/auth.service';
import { motion } from 'framer-motion';

import { 
  HiViewGrid, 
  HiUsers, 
  HiCog, 
  HiLightningBolt 
} from 'react-icons/hi';

export default function AdminDashboard() {
  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-4">
        <h2 className="text-4xl font-serif text-[#1A3320]">System Overview</h2>
        <p className="text-base text-[#5C7562] mt-2">Monitor your Pranayama portal's performance and activity.</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Users', value: '1,284', icon: HiUsers, trend: '+12%', color: 'emerald' },
          { label: 'Active Sessions', value: '42', icon: HiLightningBolt, trend: 'Normal', color: 'blue' },
          { label: 'Total Logs', value: '15.4k', icon: HiViewGrid, trend: '+5%', color: 'amber' },
          { label: 'System Health', value: 'Optimal', icon: HiCog, trend: '100%', color: 'purple' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-base font-medium text-[#5C7562] mb-1">{stat.label}</h3>
            <p className="text-3xl font-serif text-[#1A3320]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-emerald-100 p-8 shadow-sm h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl text-[#1A3320]">Activity Analytics</h3>
            <div className="flex gap-2">
              {['7D', '1M', '3M'].map(t => (
                <button key={t} className="px-3 py-1 text-xs font-bold rounded-lg border border-emerald-100 hover:bg-emerald-50 text-emerald-700 transition-all">
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-emerald-50 rounded-2xl bg-emerald-50/20">
            <p className="text-base text-emerald-600/50 font-medium italic">Analytics visualization loading...</p>
          </div>
        </div>

        <div className="bg-[#1A3320] rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all" />
          <h3 className="font-serif text-xl mb-6 relative z-10">Quick Actions</h3>
          <div className="space-y-4 relative z-10">
            {[
              { label: 'Generate Report', icon: HiViewGrid },
              { label: 'User Audit', icon: HiUsers },
              { label: 'System Check', icon: HiLightningBolt },
              { label: 'Security Logs', icon: HiCog },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-left group/btn"
              >
                <action.icon className="text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
