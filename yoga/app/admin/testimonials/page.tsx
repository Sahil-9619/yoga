"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiStar, HiPlus, HiTrash,
  HiPencilAlt, HiSearch, HiCheck, HiRefresh, HiExclamationCircle, HiLocationMarker
} from 'react-icons/hi';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';
import { TestimonialService } from '@/app/services/testimonial.service';
import { BASE_URL } from '@/app/lib/api-config';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  location: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  createdAt?: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    text: '',
    name: '',
    location: '',
    type: 'text',
  });
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const data = await TestimonialService.getAllTestimonials();
      setTestimonials(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const filtered = testimonials.filter(t => {
    if (!searchQuery) return true;
    return (
      (t.name && t.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.text && t.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.location && t.location.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const openCreate = () => {
    setEditingId(null);
    setFormData({ text: '', name: '', location: '', type: 'text' });
    setMediaFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setFormData({ text: t.text || '', name: t.name, location: t.location, type: t.type || 'text' });
    setMediaFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (formData.type === 'text') {
      if (!formData.name.trim()) return setFormError('Name is required for text testimonials.');
      if (!formData.location.trim()) return setFormError('Location is required for text testimonials.');
      if (!formData.text.trim()) return setFormError('Testimonial text is required for text type.');
    }
    if (formData.type !== 'text' && !mediaFile && !editingId) return setFormError(`Please upload a ${formData.type} file.`);

    setIsSaving(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('location', formData.location);
      payload.append('type', formData.type);
      if (formData.text) payload.append('text', formData.text);
      if (mediaFile) payload.append('media', mediaFile);

      if (editingId) {
        await TestimonialService.updateTestimonial(editingId, payload);
      } else {
        await TestimonialService.createTestimonial(payload);
      }
      await fetchTestimonials();
      setIsModalOpen(false);
    } catch (e: any) {
      setFormError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await TestimonialService.deleteTestimonial(deletingId);
      setTestimonials(prev => prev.filter(t => t.id !== deletingId));
      setDeletingId(null);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Testimonials</h2>
          <p className="text-base text-[#5C7562] mt-1">Manage community stories shown on the homepage.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchTestimonials} className="px-4 py-2.5 bg-white border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition-all">
            <HiRefresh size={14} />
          </button>
          <button onClick={openCreate} className="px-8 py-3 bg-[#1A3320] text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/10 group">
            <HiPlus size={16} className="group-hover:rotate-90 transition-transform" /> Add Testimonial
          </button>
        </div>
      </header>

      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
          <input type="text" placeholder="Search testimonials..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-100 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-[#1A3320]"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 flex justify-center">
          <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((testimonial, index) => (
            <motion.div key={testimonial.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.07 }}
              className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col relative overflow-hidden"
            >
              {/* Decorative background curve */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-50 pointer-events-none" />

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  {testimonial.type === 'text' ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-serif text-lg">
                        {(testimonial.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#1A3320]">{testimonial.name || 'Anonymous'}</h3>
                        {testimonial.location && (
                          <div className="flex items-center gap-1 text-[10px] text-[#5C7562] uppercase tracking-wider mt-0.5">
                            <HiLocationMarker size={10} /> {testimonial.location}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">{testimonial.type} TESTIMONIAL</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(testimonial)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"><HiPencilAlt size={14} /></button>
                  <button onClick={() => { setDeletingId(testimonial.id); setIsConfirmOpen(true); }} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><HiTrash size={14} /></button>
                </div>
              </div>

              <div className="relative flex-1 z-10 mt-4">
                {testimonial.type === 'text' && (
                  <>
                    <HiStar className="text-amber-400 mb-2 w-4 h-4" />
                    <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-4">
                      "{testimonial.text}"
                    </p>
                  </>
                )}
                {testimonial.type === 'image' && testimonial.mediaUrl && (
                  <div className="w-full rounded-lg overflow-hidden bg-slate-100 mb-2 border border-slate-200 flex items-center justify-center">
                    <img src={testimonial.mediaUrl.startsWith('http') ? testimonial.mediaUrl : `${BASE_URL}${testimonial.mediaUrl}`} alt="testimonial" className="w-full h-auto max-h-60 object-contain" />
                  </div>
                )}
                {testimonial.type === 'video' && testimonial.mediaUrl && (
                  <div className="w-full rounded-lg overflow-hidden bg-black flex items-center justify-center mb-2 shadow-inner">
                    <video src={testimonial.mediaUrl.startsWith('http') ? testimonial.mediaUrl : `${BASE_URL}${testimonial.mediaUrl}`} controls preload="metadata" className="w-full h-auto max-h-60 object-contain" />
                  </div>
                )}
                {testimonial.text && testimonial.type !== 'text' && (
                  <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-2 mt-2">
                    "{testimonial.text}"
                  </p>
                )}
              </div>
            </motion.div>
          ))}

          <button onClick={openCreate}
            className="min-h-[200px] border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform"><HiPlus size={20} /></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Add Testimonial</span>
          </button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        description="Fill all required fields. Errors will be shown here."
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
              <HiExclamationCircle size={16} className="flex-shrink-0 mt-0.5" />
              {formError}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1 mb-1.5">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'text' | 'image' | 'video' })}
              className="w-full bg-[#FDFCF9] border border-emerald-100/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all text-[#1A3320]"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {formData.type === 'text' && (
            <div className="grid grid-cols-2 gap-4">
              <Input label="Name *" required value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Audrey" />

              <Input label="Location *" required value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. UK 🌸" />
            </div>
          )}

          {(formData.type === 'image' || formData.type === 'video') && (
            <div>
              <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1 mb-1.5">Upload Media {editingId ? '(Optional to replace)' : '*'}</label>
              <input
                type="file"
                accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>
          )}

          {formData.type === 'text' && (
            <div>
              <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1 mb-1.5">Testimonial Text *</label>
              <textarea rows={4} required value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Share their experience..."
                className="w-full bg-[#FDFCF9] border border-emerald-100/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all text-[#1A3320] resize-none"
              />
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 border border-emerald-100 text-[#5C7562] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={isSaving}
              className="flex-2 px-10 py-3 bg-[#1A3320] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-50">
              {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : (
                <><HiCheck size={18} /> {editingId ? 'Save Changes' : 'Publish Testimonial'}</>
              )}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete} title="Delete Testimonial"
        message="Are you sure you want to permanently delete this testimonial? This cannot be undone." />
    </main>
  );
}
