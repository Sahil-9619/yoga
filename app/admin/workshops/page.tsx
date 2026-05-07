"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HiAcademicCap, 
  HiPlus, 
  HiCalendar, 
  HiLocationMarker, 
  HiCurrencyRupee,
  HiTrash,
  HiPencilAlt,
  HiSearch,
  HiCollection,
  HiCheck
} from 'react-icons/hi';
import { cn } from '@/app/lib/utils';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { FileUpload } from '@/app/components/ui/FileUpload';
import { Select } from '@/app/components/ui/Select';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([
    { id: 1, title: 'Morning Flow Intensive', date: 'May 15, 2024', location: 'Main Studio', price: '₹1200', students: 12 },
    { id: 2, title: 'Breathwork & Meditation', date: 'May 22, 2024', location: 'Wellness Hall', price: '₹800', students: 25 },
    { id: 3, title: 'Weekend Zen Retreat', date: 'June 01, 2024', location: 'Pranayama Center', price: '₹4500', students: 8 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    date: '',
    location: '',
    price: '',
    category: 'Workshops'
  });

  const categories = [
    { label: 'Workshops', value: 'Workshops' },
    { label: 'Retreats', value: 'Retreats' },
    { label: 'Teacher Training', value: 'Teacher Training' },
  ];

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setWorkshops(workshops.filter(w => w.id !== deletingId));
      setDeletingId(null);
    }
  };

  const handleAddWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const workshop = {
      id: Date.now(),
      title: newWorkshop.title,
      date: newWorkshop.date,
      location: newWorkshop.location,
      price: `₹${newWorkshop.price}`,
      students: 0
    };
    
    setWorkshops([workshop, ...workshops]);
    setIsSaving(false);
    setIsModalOpen(false);
    setNewWorkshop({ title: '', date: '', location: '', price: '', category: 'Workshops' });
    setPreviewUrl(null);
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Workshop Management</h2>
          <p className="text-base text-[#5C7562] mt-1">Schedule and manage your Pranayama academy's educational events.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-[#1A3320] text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/10 group"
        >
          <HiPlus size={16} className="group-hover:rotate-90 transition-transform" />
          Create Workshop
        </button>
      </header>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
          <input 
            type="text" 
            placeholder="Search workshops..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-100 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-[#1A3320]"
          />
        </div>

        <Link 
          href="/admin/categories"
          className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100/50"
        >
          <HiCollection size={14} />
          Manage Categories
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop, index) => (
          <motion.div
            key={workshop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-emerald-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                <HiPencilAlt size={16} />
              </button>
              <button 
                onClick={() => handleDeleteClick(workshop.id)}
                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <HiTrash size={16} />
              </button>
            </div>

            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 mb-4">
              <HiAcademicCap size={24} />
            </div>

            <h3 className="text-xl font-serif text-[#1A3320] mb-3 line-clamp-1">{workshop.title}</h3>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-[#5C7562]">
                <HiCalendar className="text-emerald-600/50" size={14} />
                {workshop.date}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5C7562]">
                <HiLocationMarker className="text-emerald-600/50" size={14} />
                {workshop.location}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <HiCurrencyRupee size={14} />
                {workshop.price}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-50 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#5C7562]">
                {workshop.students} Students Enrolled
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-emerald-100 text-[8px] flex items-center justify-center font-bold text-emerald-700">
                    S{i}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Workshop"
        description="Schedule a new educational event for your academy."
      >
        <form onSubmit={handleAddWorkshop} className="space-y-4">
          <Input 
            label="Workshop Title"
            required
            value={newWorkshop.title}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
            placeholder="e.g. Master Your Breath"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={newWorkshop.category}
              onChange={(val) => setNewWorkshop({ ...newWorkshop, category: val })}
              options={categories}
            />
            <Input 
              label="Price (₹)"
              type="number"
              required
              value={newWorkshop.price}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, price: e.target.value })}
              placeholder="e.g. 1500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Date"
              type="date"
              required
              value={newWorkshop.date}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
            />
            <Input 
              label="Location"
              required
              value={newWorkshop.location}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, location: e.target.value })}
              placeholder="e.g. Wellness Studio"
              icon={<HiLocationMarker size={16} />}
            />
          </div>

          <FileUpload 
            label="Workshop Cover Image"
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
          />

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 border border-emerald-100 text-[#5C7562] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-2 px-10 py-3 bg-[#1A3320] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <HiCheck size={18} />
                  Create Workshop
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Workshop"
        message="Are you sure you want to permanently delete this workshop? This will remove all scheduled sessions and enrollment data."
      />
    </main>
  );
}
