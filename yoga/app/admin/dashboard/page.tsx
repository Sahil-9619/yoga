"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiAcademicCap,
  HiCollection,
  HiMail,
  HiVideoCamera,
  HiCalendar,
  HiChatAlt2,
} from 'react-icons/hi';
import { WorkshopService } from '../../services/workshop.service';
import { ContactService } from '../../services/contact.service';
import { BookingService } from '../../services/booking.service';
import { VideoService } from '../../services/video.service';

const quickActions = [
  { label: 'Workshops', href: '/admin/workshops', icon: HiAcademicCap, desc: 'Manage sessions' },
  { label: 'Bookings', href: '/admin/bookings', icon: HiCalendar, desc: 'View reservations' },
  { label: 'Contacts', href: '/admin/contacts', icon: HiMail, desc: 'View enquiries' },
  { label: 'Videos', href: '/admin/videos', icon: HiVideoCamera, desc: 'Media library' },
];

export default function AdminDashboard() {
  const [workshopCount, setWorkshopCount] = useState<number | null>(null);
  const [bookingCount, setBookingCount] = useState<number | null>(null);
  const [enquiryCount, setEnquiryCount] = useState<number | null>(null);
  const [videoCount, setVideoCount] = useState<number | null>(null);
  const [recentWorkshops, setRecentWorkshops] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [workshops, bookings, contacts, videos] = await Promise.allSettled([
          WorkshopService.getAllWorkshops(),
          BookingService.getAllBookings(),
          ContactService.getAllContacts(1, 1000),
          VideoService.getAllVideos(),
        ]);

        if (workshops.status === 'fulfilled') {
          const val = workshops.value;
          const arr = Array.isArray(val) ? val : val?.data ?? [];
          setWorkshopCount(arr.length);
          setRecentWorkshops([...arr].reverse().slice(0, 5));
        }

        if (bookings.status === 'fulfilled') {
          const arr = bookings.value ?? [];
          setBookingCount(arr.length);
          setRecentBookings(arr.slice(0, 5));
        }

        if (contacts.status === 'fulfilled') {
          const d = contacts.value;
          setEnquiryCount(d?.total ?? d?.data?.length ?? (Array.isArray(d) ? d.length : 0));
        }

        if (videos.status === 'fulfilled') {
          const arr = videos.value ?? [];
          setVideoCount(arr.length);
        }
      } catch (_) { }
      finally { setIsLoading(false); }
    };
    fetchAll();
  }, []);

  const stats = [
    { label: 'Total Workshops', value: isLoading ? '…' : (workshopCount ?? '—'), icon: HiAcademicCap, trend: 'Live', color: 'emerald', href: '/admin/workshops' },
    { label: 'Total Bookings', value: isLoading ? '…' : (bookingCount ?? '—'), icon: HiCalendar, trend: 'Live', color: 'blue', href: '/admin/bookings' },
    { label: 'Total Enquiries', value: isLoading ? '…' : (enquiryCount ?? '—'), icon: HiChatAlt2, trend: 'Live', color: 'amber', href: '/admin/contacts' },
    { label: 'Total Videos', value: isLoading ? '…' : (videoCount ?? '—'), icon: HiVideoCamera, trend: 'Live', color: 'rose', href: '/admin/videos' },
  ];

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-4">
        <h2 className="text-4xl font-serif text-[#1A3320]">System Overview</h2>
        <p className="text-base text-[#5C7562] mt-2">Live data from your Pranayama portal.</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Card = (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-xs font-medium text-[#5C7562] mb-0.5">{stat.label}</h3>
              <p className="text-2xl font-serif text-[#1A3320]">{stat.value}</p>
            </motion.div>
          );
          return (
            <Link key={stat.label} href={stat.href} className="block">{Card}</Link>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">

        {/* Left: Two stacked tables */}
        <div className="lg:col-span-2 space-y-6">

          {/* Recent Workshops */}
          <div className="bg-white rounded-lg border border-emerald-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-50">
              <h3 className="font-serif text-lg text-[#1A3320]">Recent Workshops</h3>
              <Link href="/admin/workshops" className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-all">View All →</Link>
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="py-10 flex justify-center"><div className="w-5 h-5 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" /></div>
              ) : recentWorkshops.length === 0 ? (
                <div className="py-10 text-center text-sm text-[#5C7562]">No workshops yet.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-emerald-50/50">
                      <th className="text-left px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Title</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Date</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Mode</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {recentWorkshops.map((w: any, i: number) => (
                      <motion.tr key={w.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="px-6 py-3 font-medium text-[#1A3320] max-w-[180px] truncate">{w.title}</td>
                        <td className="px-4 py-3 text-[#5C7562] whitespace-nowrap text-xs">
                          {new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${w.mode === 'online' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{w.mode}</span>
                        </td>
                        <td className="px-4 py-3 text-[#5C7562] text-xs">
                          {w.priceType === 'free' ? <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600">Free</span> : `₹${w.amount}`}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg border border-emerald-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-50">
              <h3 className="font-serif text-lg text-[#1A3320]">Recent Bookings</h3>
              <Link href="/admin/bookings" className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-all">View All →</Link>
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="py-10 flex justify-center"><div className="w-5 h-5 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" /></div>
              ) : recentBookings.length === 0 ? (
                <div className="py-10 text-center text-sm text-[#5C7562]">No bookings yet.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-emerald-50/50">
                      <th className="text-left px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Name</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Phone</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Workshop</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Amount</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {recentBookings.map((b: any, i: number) => (
                      <motion.tr key={b.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="px-6 py-3 font-medium text-[#1A3320]">{b.name}</td>
                        <td className="px-4 py-3 text-emerald-600 text-xs font-medium">{b.phone}</td>
                        <td className="px-4 py-3 text-[#5C7562] text-xs max-w-[160px] truncate">{b.workshopTitle || '—'}</td>
                        <td className="px-4 py-3 text-xs">
                          {b.priceType === 'free' ? <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-50 text-emerald-600">Free</span> : `₹${b.amount}`}
                        </td>
                        <td className="px-4 py-3 text-[#5C7562] text-xs whitespace-nowrap">
                          {new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1A3320] rounded-lg p-6 shadow-xl text-white relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <h3 className="font-serif text-xl mb-5 relative z-10">Quick Actions</h3>
          <div className="space-y-2 relative z-10">
            {quickActions.map((action, i) => (
              <motion.div key={action.href} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={action.href} className="w-full flex items-center gap-3 p-3.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-400/30 transition-all group/btn">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover/btn:bg-emerald-500/30 transition-all">
                    <action.icon className="text-emerald-400 group-hover/btn:scale-110 transition-transform" size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-none mb-0.5">{action.label}</div>
                    <div className="text-[10px] text-white/40 font-light">{action.desc}</div>
                  </div>
                  <div className="ml-auto text-white/20 group-hover/btn:text-emerald-400 transition-all text-lg">→</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
