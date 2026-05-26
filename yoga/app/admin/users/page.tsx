"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiUsers, HiSearch, HiRefresh, HiChevronDown, HiChevronUp, HiVideoCamera, HiTrash, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { UserService, UserData } from '@/app/services/user.service';
import { cn } from '@/app/lib/utils';
import { DeleteConfirmModal } from '@/app/components/DeleteConfirmModal';

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: number; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const fetchUsers = async (page = currentPage, search = searchQuery) => {
    setIsLoading(true);
    try {
      const result = await UserService.getAllUsers(page, limit, search);
      setUsers(result.data);
      setTotalItems(result.totalItems);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users when page or search query changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(currentPage, searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1); // Reset page to 1 on new search
  };

  const toggleRow = (id: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openDeleteModal = (id: number, name: string) => {
    setUserToDelete({ id, name });
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await UserService.deleteUser(userToDelete.id);
      setIsDeleteOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Users</h2>
          <p className="text-base text-[#5C7562] mt-1">Manage registered users and their purchased videos.</p>
        </div>
        <button 
          onClick={() => fetchUsers(currentPage, searchQuery)}
          className="px-4 py-2.5 bg-white border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-sm"
        >
          <HiRefresh size={14} /> Refresh Data
        </button>
      </header>

      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-100 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-[#1A3320] shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1A3320] text-emerald-50 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4 rounded-tl-2xl">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Videos Bought</th>
                <th className="px-6 py-4">Registered Date</th>
                <th className="px-6 py-4 rounded-tr-2xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-emerald-600">
                    <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3" />
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#5C7562]">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr className="hover:bg-emerald-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-[#1A3320]">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#5C7562]">{user.email}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-xs">
                          {user.purchases?.length || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#5C7562]">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                        {(user.purchases?.length || 0) > 0 && (
                          <button 
                            onClick={() => toggleRow(user.id)}
                            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg inline-flex items-center gap-1 transition-colors"
                          >
                            {expandedRows[user.id] ? (
                              <>Hide Videos <HiChevronUp size={14} /></>
                            ) : (
                              <>View Videos <HiChevronDown size={14} /></>
                            )}
                          </button>
                        )}
                        <button 
                          onClick={() => openDeleteModal(user.id, user.name)}
                          className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1 transition-colors border border-red-100/50"
                          title="Delete User"
                        >
                          <HiTrash size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedRows[user.id] && user.purchases && user.purchases.length > 0 && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-emerald-50/30 overflow-hidden"
                        >
                          <td colSpan={5} className="px-6 py-4 border-b border-emerald-50">
                            <div className="pl-11 py-2">
                              <h4 className="text-[10px] uppercase font-bold text-[#5C7562] tracking-widest mb-3 flex items-center gap-2">
                                <HiVideoCamera size={14} /> Purchased Library
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.purchases.map((purchase: any) => (
                                  <div key={purchase.id} className="bg-white border border-emerald-100 p-3 rounded-xl shadow-sm flex flex-col">
                                    <span className="font-semibold text-sm text-[#1A3320] mb-1 line-clamp-1">
                                      {purchase.video?.title || 'Unknown Video'}
                                    </span>
                                    <div className="flex items-center justify-between mt-auto">
                                      <span className="text-xs text-emerald-600 font-medium">₹{purchase.amount}</span>
                                      <span className="text-[10px] text-[#5C7562]">
                                        {new Date(purchase.createdAt).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white border border-emerald-100 rounded-2xl shadow-sm mb-12">
          <div className="text-xs font-medium text-[#5C7562]">
            Showing <span className="font-bold text-[#1A3320]">{Math.min((currentPage - 1) * limit + 1, totalItems)}</span> to{' '}
            <span className="font-bold text-[#1A3320]">{Math.min(currentPage * limit, totalItems)}</span> of{' '}
            <span className="font-bold text-[#1A3320]">{totalItems}</span> entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-emerald-100 rounded-xl text-[#5C7562] bg-white hover:bg-emerald-50 disabled:opacity-50 disabled:hover:bg-white transition-all shadow-xs"
            >
              <HiChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                totalPages > 6 &&
                page !== 1 &&
                page !== totalPages &&
                Math.abs(page - currentPage) > 1
              ) {
                if (page === 2 && currentPage > 3) {
                  return <span key="dots-1" className="px-2 text-xs text-[#5C7562]">...</span>;
                }
                if (page === totalPages - 1 && currentPage < totalPages - 2) {
                  return <span key="dots-2" className="px-2 text-xs text-[#5C7562]">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-9 h-9 rounded-xl text-xs font-bold transition-all shadow-xs",
                    currentPage === page
                      ? "bg-[#1A3320] text-emerald-50"
                      : "bg-white border border-emerald-100 text-[#5C7562] hover:bg-emerald-50"
                  )}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-emerald-100 rounded-xl text-[#5C7562] bg-white hover:bg-emerald-50 disabled:opacity-50 disabled:hover:bg-white transition-all shadow-xs"
            >
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete User Account"
        message={`Are you sure you want to permanently delete ${userToDelete?.name || 'this user'}? This will immediately purge their profile and revoke all active video library access.`}
        isLoading={isDeleting}
      />
    </main>
  );
}
