"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiTrash, HiRefresh, HiSearch } from 'react-icons/hi';
import { BookingService } from '../../services/booking.service';
import { Pagination } from '@/app/components/ui/Pagination';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';

const ITEMS_PER_PAGE = 10;

export default function AdminBookingsPage() {
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const data = await BookingService.getAllBookings();
      setAllBookings(data || []);
    } catch (_) {
      setAllBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  // Reset page on search
  useEffect(() => { setCurrentPage(1); }, [searchQuery]);

  // Filter
  const filtered = allBookings.filter(b => {
    const q = searchQuery.toLowerCase();
    return (
      b.name?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q) ||
      b.phone?.includes(q) ||
      b.workshopTitle?.toLowerCase().includes(q)
    );
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await BookingService.deleteBooking(deletingId);
      setAllBookings(prev => prev.filter(b => b.id !== deletingId));
      setDeletingId(null);
    } catch (_) { }
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Bookings</h2>
          <p className="text-base text-[#5C7562] mt-2">All workshop bookings from users.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-emerald-100 rounded-xl text-base text-[#1A3320] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full md:w-64 transition-all"
            />
          </div>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <HiRefresh size={16} />
          </button>
        </div>
      </header>

      <div className="bg-white border border-emerald-100 rounded-l overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-sm text-emerald-600 font-medium animate-pulse">Loading bookings...</p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/50 border-b border-emerald-100">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">#</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Name</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Email</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Phone</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Workshop</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Amount</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Booked On</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {paginated.length > 0 ? paginated.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs text-[#5C7562]">{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs flex-shrink-0">
                          {b.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div className="text-sm font-bold text-[#1A3320]">{b.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#5C7562]">{b.email}</td>
                    <td className="px-6 py-4 text-sm text-emerald-600 font-medium">{b.phone}</td>
                    <td className="px-6 py-4 max-w-[180px]">
                      <div className="font-bold text-[#1A3320] text-sm truncate">{b.workshopTitle || b.Workshop?.title || '—'}</div>
                      <div className="text-[9px] uppercase tracking-widest text-[#5C7562] truncate">{b.categoryName || b.Workshop?.Category?.name || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      {b.priceType === 'free' ? (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600">Free</span>
                      ) : (
                        <span className="text-sm font-medium text-[#1A3320]">₹{b.amount}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600">{b.status || 'confirmed'}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#5C7562] whitespace-nowrap">
                      {new Date(b.createdAt).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteClick(b.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <HiTrash size={16} />
                      </button>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-20 text-center text-emerald-600/50 text-sm italic">
                      No bookings found{searchQuery ? ' matching your search' : ' yet'}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!isLoading && totalItems > 0 && (
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#5C7562] font-medium">
            Showing <span className="text-[#1A3320] font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
            <span className="text-[#1A3320] font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}</span> of{' '}
            <span className="text-[#1A3320] font-bold">{totalItems}</span> bookings
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </main>
  );
}
