"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCurrencyRupee, HiSearch, HiRefresh, HiCalendar, HiVideoCamera, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
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

  // Pagination State for Purchases
  const [currentPurchasePage, setCurrentPurchasePage] = useState(1);
  const [totalPurchaseItems, setTotalPurchaseItems] = useState(0);
  const [totalPurchasePages, setTotalPurchasePages] = useState(0);
  const purchaseLimit = 10;

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

  const fetchPurchases = async (page = currentPurchasePage, search = searchQuery) => {
    setIsLoadingPurchases(true);
    try {
      const result = await PurchaseService.getAllPurchases(page, purchaseLimit, search);
      setPurchases(result.data);
      setTotalPurchaseItems(result.totalItems);
      setTotalPurchasePages(result.totalPages);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setIsLoadingPurchases(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch purchases when page or search query changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPurchases(currentPurchasePage, searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPurchasePage, searchQuery]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (activeTab === 'videos') {
      setCurrentPurchasePage(1); // Reset page to 1 on new search
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (b.name && b.name.toLowerCase().includes(q)) || 
      (b.email && b.email.toLowerCase().includes(q)) ||
      (b.workshopTitle && b.workshopTitle.toLowerCase().includes(q))
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
            else fetchPurchases(currentPurchasePage, searchQuery);
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
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-100 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-[#1A3320] shadow-sm"
          />
        </div>
      </div>

      <div className={cn("bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden", activeTab === 'videos' && totalPurchasePages > 1 ? "mb-6" : "mb-12")}>
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
                        {booking.priceType === 'free' ? 'FREE' : `$${booking.amount || 0} USD`}
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
                ) : purchases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#5C7562]">
                      No video purchases found.
                    </td>
                  </tr>
                ) : (
                  purchases.map((purchase) => (
                    <tr key={purchase.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#1A3320]">{purchase.user?.name || 'Unknown User'}</div>
                        <div className="text-xs text-[#5C7562]">{purchase.user?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#1A3320]">
                        {purchase.video?.title || 'Unknown Video'}
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-700">
                        ${purchase.amount} USD
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

      {/* Pagination Controls for Purchases */}
      {activeTab === 'videos' && !isLoadingPurchases && totalPurchasePages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white border border-emerald-100 rounded-2xl shadow-sm mb-12">
          <div className="text-xs font-medium text-[#5C7562]">
            Showing <span className="font-bold text-[#1A3320]">{Math.min((currentPurchasePage - 1) * purchaseLimit + 1, totalPurchaseItems)}</span> to{' '}
            <span className="font-bold text-[#1A3320]">{Math.min(currentPurchasePage * purchaseLimit, totalPurchaseItems)}</span> of{' '}
            <span className="font-bold text-[#1A3320]">{totalPurchaseItems}</span> entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPurchasePage(prev => Math.max(prev - 1, 1))}
              disabled={currentPurchasePage === 1}
              className="p-2 border border-emerald-100 rounded-xl text-[#5C7562] bg-white hover:bg-emerald-50 disabled:opacity-50 disabled:hover:bg-white transition-all shadow-xs"
            >
              <HiChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPurchasePages }, (_, i) => i + 1).map((page) => {
              if (
                totalPurchasePages > 6 &&
                page !== 1 &&
                page !== totalPurchasePages &&
                Math.abs(page - currentPurchasePage) > 1
              ) {
                if (page === 2 && currentPurchasePage > 3) {
                  return <span key="dots-purchase-1" className="px-2 text-xs text-[#5C7562]">...</span>;
                }
                if (page === totalPurchasePages - 1 && currentPurchasePage < totalPurchasePages - 2) {
                  return <span key="dots-purchase-2" className="px-2 text-xs text-[#5C7562]">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPurchasePage(page)}
                  className={cn(
                    "w-9 h-9 rounded-xl text-xs font-bold transition-all shadow-xs",
                    currentPurchasePage === page
                      ? "bg-[#1A3320] text-emerald-50"
                      : "bg-white border border-emerald-100 text-[#5C7562] hover:bg-emerald-50"
                  )}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPurchasePage(prev => Math.min(prev + 1, totalPurchasePages))}
              disabled={currentPurchasePage === totalPurchasePages}
              className="p-2 border border-emerald-100 rounded-xl text-[#5C7562] bg-white hover:bg-emerald-50 disabled:opacity-50 disabled:hover:bg-white transition-all shadow-xs"
            >
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
