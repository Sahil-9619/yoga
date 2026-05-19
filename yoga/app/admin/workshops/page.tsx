"use client";

import React, { useEffect, useState } from 'react';
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
import { cn } from '../../lib/utils';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { FileUpload } from '@/app/components/ui/FileUpload';
import { Select } from '@/app/components/ui/Select';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';
import { CategoryService } from '@/app/services/category.service';
import { WorkshopService, WorkshopData } from '@/app/services/workshop.service';
import { BASE_URL } from '@/app/lib/api-config';
import { HiEye, HiGlobeAlt, HiClock } from 'react-icons/hi';

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | string | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState<WorkshopData>({
    title: '',
    description: '',
    photo: '',
    date: '',
    time: '',
    mode: 'online',
    location: '',
    platform: '',
    priceType: 'free',
    amount: 0,
    categoryId: ''
  });

  const fetchWorkshops = async () => {
    setIsLoading(true);
    try {
      const data = await WorkshopService.getAllWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getAllCategories();
      setCategories(data.map((c: any) => ({ label: c.name, value: String(c.id) })));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchWorkshops();
    fetchCategories();
  }, []);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleCreateClick = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: '',
      description: '',
      photo: '',
      date: '',
      time: '',
      mode: 'online',
      location: '',
      platform: '',
      priceType: 'free',
      amount: 0,
      categoryId: categories.length > 0 ? categories[0].value : ''
    });
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (workshop: any) => {
    setIsEditing(true);
    setEditId(workshop.id);
    setFormData({
      title: workshop.title,
      description: workshop.description,
      photo: workshop.photo,
      date: workshop.date?.split('T')[0] || '',
      time: workshop.time,
      mode: workshop.mode,
      location: workshop.location || '',
      platform: workshop.platform || '',
      priceType: workshop.priceType,
      amount: workshop.amount,
      categoryId: workshop.categoryId
    });
    const photoUrl = workshop.photo ? (workshop.photo.startsWith('http') ? workshop.photo : `${BASE_URL}${workshop.photo}`) : null;
    setPreviewUrl(photoUrl);
    setIsModalOpen(true);
  };

  const handleViewClick = (workshop: any) => {
    const photoUrl = workshop.photo ? (workshop.photo.startsWith('http') ? workshop.photo : `${BASE_URL}${workshop.photo}`) : null;
    setSelectedWorkshop({ ...workshop, photo: photoUrl });
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (id: number | string) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      try {
        await WorkshopService.deleteWorkshop(deletingId);
        fetchWorkshops();
        setDeletingId(null);
      } catch (error) {
        console.error('Error deleting workshop:', error);
      }
    }
  };

  const handleSaveWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Client-side validation
    if (!formData.title.trim()) return setFormError('Workshop title is required.');
    if (!formData.description.trim()) return setFormError('Description is required.');
    if (!formData.date) return setFormError('Please select a date for the workshop.');
    if (!formData.time.trim()) return setFormError('Please enter the workshop time.');
    if (!formData.categoryId) return setFormError('Please select a category.');
    if (formData.mode === 'online' && !formData.platform?.trim()) return setFormError('Platform is required for online workshops (e.g. Zoom, Google Meet).');
    if (formData.mode === 'offline' && !formData.location?.trim()) return setFormError('Location is required for offline workshops.');
    if (formData.priceType === 'paid' && (!formData.amount || Number(formData.amount) <= 0)) return setFormError('Please enter a valid price amount.');
    if (!isEditing && !selectedFile) return setFormError('Please upload a cover image for the workshop.');

    setIsSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });
      if (selectedFile) {
        data.append('photo', selectedFile);
      }

      if (isEditing && editId) {
        await WorkshopService.updateWorkshop(editId, data);
      } else {
        await WorkshopService.createWorkshop(data);
      }

      fetchWorkshops();
      setIsModalOpen(false);
      setSelectedFile(null);
      setFormError(null);
    } catch (error: any) {
      setFormError(error?.message || 'Something went wrong. Please try again.');
      console.error('Error saving workshop:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Workshop Management</h2>
          <p className="text-base text-[#5C7562] mt-1">Schedule and manage your Pranayama academy's educational events.</p>
        </div>

        <button
          onClick={handleCreateClick}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {isLoading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-sm text-emerald-600 font-medium">Loading workshops...</p>
          </div>
        ) : workshops.length > 0 ? (
          workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-emerald-100 rounded-md p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                <button
                  onClick={() => handleViewClick(workshop)}
                  className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <HiEye size={16} />
                </button>
                <button
                  onClick={() => handleEditClick(workshop)}
                  className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <HiPencilAlt size={16} />
                </button>
                <button
                  onClick={() => handleDeleteClick(workshop.id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <HiTrash size={16} />
                </button>
              </div>

              <div className="h-32 -mx-6 -mt-6 mb-4 overflow-hidden relative">
                <img
                  src={workshop.photo ? (workshop.photo.startsWith('http') ? workshop.photo : `${BASE_URL}${workshop.photo}`) : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'}
                  alt={workshop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm",
                    workshop.mode === 'online' ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"
                  )}>
                    {workshop.mode}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-serif text-[#1A3320] mb-3 line-clamp-1">{workshop.title}</h3>

              <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-2 text-xs text-[#5C7562]">
                  <HiCalendar className="text-emerald-600/50" size={14} />
                  {new Date(workshop.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5C7562]">
                  <HiClock className="text-emerald-600/50" size={14} />
                  {workshop.time} IST
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5C7562]">
                  {workshop.mode === 'online' ? (
                    <HiGlobeAlt className="text-emerald-600/50" size={14} />
                  ) : (
                    <HiLocationMarker className="text-emerald-600/50" size={14} />
                  )}
                  {workshop.mode === 'online' ? workshop.platform : workshop.location}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <HiCurrencyRupee size={14} />
                  {workshop.priceType === 'free' ? 'Free' : `₹${workshop.amount}`}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-50 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5C7562]">
                  {workshop.Category?.name || 'Uncategorized'}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-emerald-50/20 rounded-3xl border border-dashed border-emerald-100">
            <p className="text-sm text-[#5C7562]">No workshops found. Create your first one above.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setFormError(null); }}
        title={isEditing ? "Edit Workshop" : "Create New Workshop"}
        description={isEditing ? "Modify the workshop details." : "Schedule a new educational event for your academy."}
      >
        <form onSubmit={handleSaveWorkshop} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 scrollbar-hide">
          {formError && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <p className="text-xs font-medium leading-snug">{formError}</p>
            </div>
          )}
          <Input
            label="Workshop Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Master Your Breath"
          />

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm text-black resize-none"
              placeholder="Provide a brief overview of the workshop..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={String(formData.categoryId)}
              onChange={(val) => setFormData({ ...formData, categoryId: val })}
              options={categories}
            />
            <Input
              label="Time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="e.g. 10:00 AM - 12:00 PM"
              icon={<HiClock size={16} />}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <Select
              label="Mode"
              value={formData.mode}
              onChange={(val: any) => setFormData({ ...formData, mode: val })}
              options={[
                { label: 'Online', value: 'online' },
                { label: 'Offline', value: 'offline' }
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {formData.mode === 'online' ? (
              <Input
                label="Platform"
                required
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                placeholder="e.g. Zoom, GMeet"
                icon={<HiGlobeAlt size={16} />}
              />
            ) : (
              <Input
                label="Location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Wellness Studio"
                icon={<HiLocationMarker size={16} />}
              />
            )}
            <Select
              label="Price Type"
              value={formData.priceType}
              onChange={(val: any) => setFormData({ ...formData, priceType: val })}
              options={[
                { label: 'Free', value: 'free' },
                { label: 'Paid', value: 'paid' }
              ]}
            />
          </div>

          {formData.priceType === 'paid' && (
            <Input
              label="Amount (₹)"
              type="number"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              placeholder="e.g. 1500"
              icon={<HiCurrencyRupee size={16} />}
            />
          )}

          <FileUpload
            label="Workshop Cover Image"
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
          />

          <div className="pt-2 flex gap-3 sticky bottom-0 bg-white py-2">
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
                  {isEditing ? 'Update Workshop' : 'Create Workshop'}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Workshop Details"
        description="Full details of the selected workshop."
      >
        {selectedWorkshop && (
          <div className="space-y-6">
            <div className="h-48 rounded-[2rem] overflow-hidden relative">
              <img
                src={selectedWorkshop.photo || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#1A3320] text-white rounded-full text-[8px] font-bold uppercase tracking-widest">
                  {selectedWorkshop.Category?.name}
                </span>
              </div>
            </div>

            <div className="space-y-4 px-2">
              <h3 className="text-2xl font-serif text-[#1A3320]">{selectedWorkshop.title}</h3>
              <p className="text-sm text-[#5C7562] leading-relaxed">
                {selectedWorkshop.description}
              </p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 pt-2 border-t border-emerald-50">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#1A3320]/40 tracking-widest">Date & Time</span>
                  <div className="text-sm text-[#1A3320] font-medium flex items-center gap-2">
                    <HiCalendar size={14} className="text-emerald-600" />
                    {new Date(selectedWorkshop.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })} at {selectedWorkshop.time} IST
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#1A3320]/40 tracking-widest">Pricing</span>
                  <div className="text-sm text-[#1A3320] font-medium flex items-center gap-2">
                    <HiCurrencyRupee size={14} className="text-emerald-600" />
                    {selectedWorkshop.priceType === 'free' ? 'Free Access' : `₹${selectedWorkshop.amount}`}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#1A3320]/40 tracking-widest">Mode</span>
                  <div className="text-sm text-[#1A3320] font-medium flex items-center gap-2">
                    <HiGlobeAlt size={14} className="text-emerald-600" />
                    {selectedWorkshop.mode === 'online' ? `Online (${selectedWorkshop.platform})` : `Offline (${selectedWorkshop.location})`}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-50 flex gap-3">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditClick(selectedWorkshop);
                }}
                className="flex-1 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
              >
                <HiPencilAlt size={14} />
                Edit Details
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-8 py-3 border border-emerald-100 text-[#5C7562] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
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
