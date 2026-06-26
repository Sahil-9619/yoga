"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiVideoCamera, HiPlus, HiPlay, HiClock, HiTrash,
  HiPencilAlt, HiSearch, HiCloudUpload, HiCheck, HiRefresh, HiExclamationCircle
} from 'react-icons/hi';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';
import { VideoService, Video } from '@/app/services/video.service';

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formError, setFormError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    videoLink: '',
    price: '',
  });

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const data = await VideoService.getAllVideos();
      setVideos(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreate = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', duration: '', videoLink: '', price: '' });
    setPreviewUrl(null);
    setThumbnailFile(null);
    setVideoFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (v: Video) => {
    setEditingId(v.id);
    setFormData({ title: v.title, description: v.description || '', duration: v.duration || '', videoLink: v.videoLink, price: v.price?.toString() || '' });
    setPreviewUrl(v.thumbnail ? VideoService.getThumbnailUrl(v.thumbnail) : null);
    setThumbnailFile(null);
    setVideoFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) return setFormError('Title is required.');
    if (!editingId && !videoFile && !formData.videoLink.trim()) return setFormError('Video file or link is required.');

    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('description', formData.description);
    fd.append('duration', formData.duration);
    if (formData.videoLink) fd.append('videoLink', formData.videoLink);
    fd.append('price', formData.price);
    if (thumbnailFile) fd.append('thumbnail', thumbnailFile);
    if (videoFile) fd.append('videoFile', videoFile);

    setIsSaving(true);
    try {
      if (editingId) {
        const updated = await VideoService.updateVideo(editingId, fd);
        setVideos(prev => prev.map(v => v.id === editingId ? updated : v));
      } else {
        const created = await VideoService.createVideo(fd);
        setVideos(prev => [created, ...prev]);
      }
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
      await VideoService.deleteVideo(deletingId);
      setVideos(prev => prev.filter(v => v.id !== deletingId));
      setDeletingId(null);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Video Library</h2>
          <p className="text-base text-[#5C7562] mt-1">Manage videos shown on the homepage.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchVideos} className="px-4 py-2.5 bg-white border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition-all">
            <HiRefresh size={14} />
          </button>
          <button onClick={openCreate} className="px-8 py-3 bg-[#1A3320] text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/10 group">
            <HiPlus size={16} className="group-hover:rotate-90 transition-transform" /> Add Video
          </button>
        </div>
      </header>

      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
          <input type="text" placeholder="Search videos..." value={searchQuery}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((video, index) => (
            <motion.div key={video.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.07 }}
              className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-emerald-50 relative flex items-center justify-center overflow-hidden">
                {video.thumbnail ? (
                  <img src={VideoService.getThumbnailUrl(video.thumbnail)!} alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <HiVideoCamera className="text-emerald-100" size={48} />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <a href={video.videoLink} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 scale-0 group-hover:scale-100 transition-transform shadow-lg">
                    <HiPlay size={20} />
                  </a>
                </div>
                {video.duration && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-white">
                    {video.duration}
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-[#5C7562]">
                    <HiClock size={12} className="text-emerald-600/50" />
                    <span className="text-[10px] font-medium">{video.duration || '—'}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(video)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"><HiPencilAlt size={14} /></button>
                    <button onClick={() => { setDeletingId(video.id); setIsConfirmOpen(true); }} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><HiTrash size={14} /></button>
                  </div>
                </div>
                <h3 className="text-base font-serif text-[#1A3320] mb-1 line-clamp-1">{video.title}</h3>
                {video.description && <p className="text-xs text-[#5C7562] line-clamp-2">{video.description}</p>}
              </div>
            </motion.div>
          ))}

          <button onClick={openCreate}
            className="aspect-video border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform"><HiPlus size={20} /></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Add Video</span>
          </button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Video' : 'Add New Video'}
        description="Fill all required fields. Errors will be shown here."
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
              <HiExclamationCircle size={16} className="flex-shrink-0 mt-0.5" />
              {formError}
            </div>
          )}

          <Input label="Video Title *" required value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Morning Pranayama Session" />

          <div>
            <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1 mb-1.5">Description</label>
            <textarea rows={3} value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short description of this video..."
              className="w-full bg-[#FDFCF9] border border-emerald-100/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all text-[#1A3320] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Duration" value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 12:45" icon={<HiClock size={16} />} />

            <Input label="Price ($ USD)" type="number" value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g. 5 (0 for free)" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1 mb-1.5">Video File Upload {editingId ? '(Optional to replace)' : '*'}</label>
            <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 mb-2"
            />
            <div className="text-xs text-slate-500 ml-2 mt-1">- OR enter an external URL below -</div>
          </div>
          
          <Input label="External Video Link (YouTube/Vimeo)" type="url" value={formData.videoLink}
            onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
            placeholder="https://youtube.com/..." icon={<HiCloudUpload size={16} />} />

          {/* Thumbnail upload */}
          <div>
            <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1 mb-1.5">Thumbnail Image</label>
            <div className="flex items-center gap-4">
              {previewUrl && (
                <img src={previewUrl} alt="preview" className="w-20 h-14 object-cover rounded-lg border border-emerald-100" />
              )}
              <label className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 uppercase tracking-wider cursor-pointer hover:bg-emerald-100 transition-all">
                <HiCloudUpload size={16} /> {previewUrl ? 'Change Image' : 'Upload Image'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setThumbnailFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }} />
              </label>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 border border-emerald-100 text-[#5C7562] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={isSaving}
              className="flex-2 px-10 py-3 bg-[#1A3320] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-50">
              {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : (
                <><HiCheck size={18} /> {editingId ? 'Save Changes' : 'Publish Video'}</>
              )}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete} title="Delete Video"
        message="Are you sure you want to permanently delete this video? This cannot be undone." />
    </main>
  );
}
