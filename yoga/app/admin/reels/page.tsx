"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiPlus, HiTrash,
  HiPencilAlt, HiSearch, HiCheck, HiRefresh, HiExclamationCircle, HiPlay
} from 'react-icons/hi';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';
import { ReelService, Reel } from '@/app/services/reel.service';

export default function AdminReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    videoLink: '',
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const fetchReels = async () => {
    setIsLoading(true);
    try {
      const data = await ReelService.getAllReels();
      setReels(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchReels(); }, []);

  const filtered = reels.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openCreate = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', duration: '', videoLink: '' });
    setThumbnailFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (r: Reel) => {
    setEditingId(r.id);
    setFormData({ title: r.title, description: r.description || '', duration: r.duration || '', videoLink: r.videoLink });
    setThumbnailFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) return setFormError('Title is required.');
    if (!formData.videoLink.trim()) return setFormError('Social Video Link is required.');

    setIsSaving(true);
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('videoLink', formData.videoLink);
      if (formData.description) payload.append('description', formData.description);
      if (formData.duration) payload.append('duration', formData.duration);
      if (thumbnailFile) payload.append('thumbnail', thumbnailFile);

      if (editingId) {
        await ReelService.updateReel(editingId, payload);
      } else {
        await ReelService.createReel(payload);
      }
      await fetchReels();
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
      await ReelService.deleteReel(deletingId);
      setReels(prev => prev.filter(r => r.id !== deletingId));
      setDeletingId(null);
      setIsConfirmOpen(false);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Social Reels</h2>
          <p className="text-base text-[#5C7562] mt-1">Manage Instagram/Facebook reels for the Community section.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchReels} className="px-4 py-2.5 bg-white border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition-all">
            <HiRefresh size={14} />
          </button>
          <button onClick={openCreate} className="px-8 py-3 bg-[#1A3320] text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/10 group">
            <HiPlus size={16} className="group-hover:rotate-90 transition-transform" /> Add Reel
          </button>
        </div>
      </header>

      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
          <input type="text" placeholder="Search reels..." value={searchQuery}
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
          {filtered.map((reel, index) => (
            <motion.div key={reel.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.07 }}
              className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-serif text-lg">
                     <HiPlay size={20} />
                   </div>
                   <div>
                     <h3 className="text-sm font-bold text-[#1A3320] line-clamp-1" title={reel.title}>{reel.title}</h3>
                     {reel.duration && <div className="text-[10px] text-[#5C7562] uppercase tracking-wider mt-0.5">{reel.duration}</div>}
                   </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(reel)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"><HiPencilAlt size={14} /></button>
                  <button onClick={() => { setDeletingId(reel.id); setIsConfirmOpen(true); }} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><HiTrash size={14} /></button>
                </div>
              </div>

              <div className="relative flex-1 z-10 mt-2">
                {reel.thumbnail ? (
                  <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-slate-100 mb-4 border border-slate-200 flex items-center justify-center">
                    <img src={ReelService.getThumbnailUrl(reel.thumbnail) || ''} alt="thumbnail" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/5] rounded-lg bg-emerald-50 mb-4 flex items-center justify-center text-emerald-600/50">
                    <HiPlay size={32} />
                  </div>
                )}
                {reel.description && (
                  <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3">
                    "{reel.description}"
                  </p>
                )}
              </div>
            </motion.div>
          ))}

          <button onClick={openCreate}
            className="min-h-[300px] border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform"><HiPlus size={20} /></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Add Social Reel</span>
          </button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Social Reel' : 'Add New Social Reel'}
        description="Fill all required fields. Errors will be shown here."
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
              <HiExclamationCircle size={16} className="flex-shrink-0 mt-0.5" />
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title *" required value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Morning Flow" />
              
            <Input label="Duration" value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 1m 30s" />
          </div>

          <Input label="Social Media Link *" required value={formData.videoLink}
            onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
            placeholder="e.g. https://instagram.com/reel/..." />

          <div>
            <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1 mb-1.5">Cover Image (Thumbnail)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1 mb-1.5">Description</label>
            <textarea rows={3} value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Caption or description..."
              className="w-full bg-[#FDFCF9] border border-emerald-100/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all text-[#1A3320] resize-none"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 border border-emerald-100 text-[#5C7562] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={isSaving}
              className="flex-2 px-10 py-3 bg-[#1A3320] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-50">
              {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : (
                <><HiCheck size={18} /> {editingId ? 'Save Changes' : 'Publish Reel'}</>
              )}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete} title="Delete Reel"
        message="Are you sure you want to permanently delete this social reel? This cannot be undone." />
    </main>
  );
}
