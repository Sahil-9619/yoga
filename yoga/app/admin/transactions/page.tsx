"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCurrencyRupee, HiSearch, HiRefresh, HiCalendar, HiVideoCamera } from 'react-icons/hi';
import { PurchaseService, PurchaseData } from '@/app/services/purchase.service';
import { BookingService } from '@/app/services/booking.service';
import { cn } from '@/app/lib/utils';

export default function AdminTransactions() {
  const [activeTab, setActiveTab] = useState<'workshops' | 'videos'>('workshops');
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<PurchaseData[]>([]);
  
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBookings = async () => {
    setIsLoadingBookings(true);
    try {
      const data = await BookingService.getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const fetchPurchases = async () => {
    setIsLoadingPurchases(true);
    try {
      const data = await PurchaseService.getAllPurchases();
      setPurchases(data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setIsLoadingPurchases(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchPurchases();
  }, []);

  const filteredBookings = bookings.filter(b => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (b.name && b.name.toLowerCase().includes(q)) || 
      (b.email && b.email.toLowerCase().includes(q)) ||
      (b.workshopTitle && b.workshopTitle.toLowerCase().includes(q))
    );
  });

  const filteredPurchases = purchases.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (p.user?.name && p.user.name.toLowerCase().includes(q)) || 
      (p.user?.email && p.user.email.toLowerCase().includes(q)) ||
      (p.video?.title && p.video.title.toLowerCase().includes(q))
    );
  });

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Transactions</h2>
          <p className="text-base text-[#5C7562] mt-1">Review workshop enrollments and video purchases.</p>
        </div>
        <button 
          onClick={() => {
            if (activeTab === 'workshops') fetchBookings();
            else fetchPurchases();
          }}
          className="px-4 py-2.5 bg-white border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-sm"
        >
          <HiRefresh size={14} /> Refresh
        </button>
      </header>

      {/* Tabs */}
      <div className="flex space-x-1 bg-emerald-50 p-1 rounded-xl mb-6 w-fit border border-emerald-100">
        <button
          onClick={() => setActiveTab('workshops')}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'workshops' ? "bg-white text-[#1A3320] shadow-sm" : "text-[#5C7562] hover:text-[#1A3320] hover:bg-white/50"
          )}
        >
          <HiCalendar size={16} /> Workshop Bookings
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'videos' ? "bg-white text-[#1A3320] shadow-sm" : "text-[#5C7562] hover:text-[#1A3320] hover:bg-white/50"
          )}
        >
          <HiVideoCamera size={16} /> Video Purchases
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
          <input 
            type="text" 
            placeholder={activeTab === 'workshops' ? "Search bookings by name, email, or workshop..." : "Search purchases by name, email, or video..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-100 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-[#1A3320] shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          {activeTab === 'workshops' ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1A3320] text-emerald-50 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4 rounded-tl-2xl">Customer</th>
                  <th className="px-6 py-4">Workshop</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-2xl text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {isLoadingBookings ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-emerald-600">
                      <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3" />
                      Loading bookings...
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#5C7562]">
                      No workshop bookings found.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#1A3320]">{booking.name}</div>
                        <div className="text-xs text-[#5C7562]">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#1A3320]">
                        {booking.workshopTitle || 'Custom Session'}
                        <div className="text-xs text-emerald-600 uppercase tracking-widest font-bold mt-0.5">{booking.categoryName || 'General'}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-700">
                        {booking.priceType === 'free' ? 'FREE' : `₹${booking.amount || 0}`}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-[10px] uppercase tracking-widest">
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-[#5C7562]">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1A3320] text-emerald-50 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4 rounded-tl-2xl">Customer</th>
                  <th className="px-6 py-4">Video Purchased</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-2xl text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {isLoadingPurchases ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-emerald-600">
                      <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3" />
                      Loading purchases...
                    </td>
                  </tr>
                ) : filteredPurchases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#5C7562]">
                      No video purchases found.
                    </td>
                  </tr>
                ) : (
                  filteredPurchases.map((purchase) => (
                    <tr key={purchase.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#1A3320]">{purchase.user?.name || 'Unknown User'}</div>
                        <div className="text-xs text-[#5C7562]">{purchase.user?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#1A3320]">
                        {purchase.video?.title || 'Unknown Video'}
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-700">
                        ₹{purchase.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-[10px] uppercase tracking-widest">
                          {purchase.status || 'Completed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-[#5C7562]">
                        {new Date(purchase.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
