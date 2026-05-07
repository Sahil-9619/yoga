"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthService } from '../../services/auth.service';
import { motion } from 'framer-motion';
import { 
  HiMail, 
  HiTrash, 
  HiExternalLink, 
  HiSearch,
  HiSortDescending,
  HiSortAscending,
  HiUser,
  HiPhone,
  HiChatAlt
} from 'react-icons/hi';
import { Sidebar } from '../../components/admin/Sidebar';
import { Topbar } from '../../components/admin/Topbar';
import { cn } from '../../lib/utils';
import { AdminLoader } from '@/app/components/admin/AdminLoader';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      setContacts([
        { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', message: 'I am interested in the weekend yoga retreat.', date: '2024-05-07', status: 'new' },
        { id: 2, name: 'Anjali Gupta', email: 'anjali@example.com', phone: '+91 87654 32109', message: 'Do you offer private meditation sessions?', date: '2024-05-06', status: 'read' },
        { id: 3, name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 76543 21098', message: 'Looking for workshop details for corporate employees.', date: '2024-05-05', status: 'replied' },
      ]);
      setIsLoadingData(false);
    }, 800);
  }, []);

  const filteredContacts = contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

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
        </div>
      </header>

      <div className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-sm">
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
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Message Snippet</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Date</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-emerald-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {filteredContacts.length > 0 ? filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-emerald-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                          {contact.name[0]}
                        </div>
                        <div>
                          <div className="text-base font-bold text-[#1A3320]">{contact.name}</div>
                          <div className="text-xs text-emerald-600/70">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-[#5C7562] line-clamp-1">{contact.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#5C7562]">{contact.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider",
                        contact.status === 'new' ? "bg-red-100 text-red-700" :
                        contact.status === 'read' ? "bg-blue-100 text-blue-700" :
                        "bg-emerald-100 text-emerald-700"
                      )}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors" title="View Details">
                          <HiChatAlt size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-red-100 text-red-600 rounded-lg transition-colors" title="Delete">
                          <HiTrash size={16} />
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
    </main>
  );
}
