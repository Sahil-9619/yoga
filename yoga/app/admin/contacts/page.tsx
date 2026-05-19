"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiMail,
  HiTrash,
  HiSearch,
  HiSortDescending,
  HiSortAscending,
  HiUser,
  HiPhone,
  HiChatAlt,
  HiEye,
  HiX,
  HiCalendar,
  HiClock,
  HiRefresh
} from 'react-icons/hi';
import { cn } from '../../lib/utils';
import { ContactService } from '../../services/contact.service';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { Pagination } from '@/app/components/ui/Pagination';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | string | null>(null);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const fetchContacts = async (page: number = 1, search: string = '') => {
    setIsLoadingData(true);
    try {
      const result = await ContactService.getAllContacts(page, itemsPerPage, search);
      setContacts(result.data || []);
      setTotalPages(result.totalPages || 1);
      setTotalItems(result.total || 0);
      setCurrentPage(result.currentPage || 1);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts(1, searchQuery);
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchContacts(currentPage, searchQuery);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (id: number | string) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      try {
        await ContactService.deleteContact(deletingId);
        // Refresh the current page after deletion
        fetchContacts(currentPage);
        setDeletingId(null);
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };




  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Contact Inquiries</h2>
          <p className="text-base text-[#5C7562] mt-2">Manage and respond to messages from your Pranayama portal's visitors.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-emerald-100 rounded-xl text-base text-[#1A3320] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full md:w-64 transition-all"
            />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
              "text-emerald-700 hover:bg-emerald-50"
            )}
            title={`Sort by: ${sortOrder === 'newest' ? 'Newest' : 'Oldest'}`}
          >
            {sortOrder === 'newest' ? <HiSortDescending size={18} /> : <HiSortAscending size={18} />}
            <span className="hidden sm:inline">{sortOrder}</span>
          </button>
          <button
            onClick={() => fetchContacts(currentPage, searchQuery)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-700 hover:bg-emerald-50 transition-all"
            title="Refresh"
          >
            <HiRefresh size={18} />
          </button>
        </div>
      </header>

      <div className="bg-white border border-emerald-100 rounded-l overflow-hidden shadow-sm">
        {isLoadingData ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-sm text-emerald-600 font-medium animate-pulse">Loading inquiries...</p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/50 border-b border-emerald-100">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Sender</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Phone</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Email</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Message</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {contacts.length > 0 ? contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                          {contact.name ? contact.name[0] : '?'}
                        </div>
                        <div>
                          <div className="text-base font-bold text-[#1A3320]">{contact.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-emerald-600 font-medium">{contact.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#5C7562]">{contact.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-[#5C7562] line-clamp-1">{contact.message}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 transition-opacity">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="p-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                          title="View Details"
                        >
                          <HiEye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(contact.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <HiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-emerald-600/50 text-sm italic">
                      No contact inquiries found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!isLoadingData && totalItems > 0 && (
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#5C7562] font-medium">
            Showing <span className="text-[#1A3320] font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-[#1A3320] font-bold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="text-[#1A3320] font-bold">{totalItems}</span> entries
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
        title="Delete Inquiry"
        message="Are you sure you want to delete this contact inquiry? This action cannot be undone."
      />

      <ViewContactModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </main>
  );
}

function ViewContactModal({ contact, onClose }: { contact: any; onClose: () => void }) {
  return (
    <Modal
      isOpen={!!contact}
      onClose={onClose}
      title="Inquiry Details"
      description="Viewing message from your visitor."
    >
      {contact && (
        <div className="space-y-4">
          <Input
            label="Sender Name"
            value={contact.name}
            readOnly
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              value={contact.phone}
              readOnly
              icon={<HiPhone size={16} />}
            />
            <Input
              label="Email Address"
              value={contact.email || 'N/A'}
              readOnly
              icon={<HiMail size={16} />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1">
              Message
            </label>
            <textarea
              readOnly
              rows={5}
              value={contact.message}
              className="w-full bg-[#FDFCF9] border border-emerald-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-[#1A3320] resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600/50 uppercase tracking-widest">
              <HiClock size={14} />
              Received: {new Date(contact.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#1A3320] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/10"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
