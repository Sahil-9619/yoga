"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiVideoCamera,
  HiPlus,
  HiPlay,
  HiClock,
  HiTag,
  HiTrash,
  HiPencilAlt,
  HiSearch,
  HiCloudUpload,
  HiCheck
} from 'react-icons/hi';
import { Select } from '@/app/components/ui/Select';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { FileUpload } from '@/app/components/ui/FileUpload';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';

export default function AdminVideos() {
  const [videos, setVideos] = useState([
    { id: 1, title: 'Pranayama Basics', duration: '12:45', category: 'Breathwork', views: '1.2k', url: 'https://vimeo.com/1' },
    { id: 2, title: 'Morning Sun Salutation', duration: '20:10', category: 'Yoga Flow', views: '2.5k', url: 'https://vimeo.com/2' },
    { id: 3, title: 'Deep Meditation Music', duration: '45:00', category: 'Meditation', views: '800', url: 'https://vimeo.com/3' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Breathwork',
    duration: '',
    url: ''
  });

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { label: 'Breathwork', value: 'Breathwork' },
    { label: 'Yoga Flow', value: 'Yoga Flow' },
    { label: 'Meditation', value: 'Meditation' },
    { label: 'Pranayama', value: 'Pranayama' },
  ];

  const handleEdit = (video: any) => {
    setEditingId(video.id);
    setFormData({
      title: video.title,
      category: video.category,
      duration: video.duration,
      url: video.url || ''
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ title: '', category: 'Breathwork', duration: '', url: '' });
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

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
      setVideos(videos.filter(v => v.id !== deletingId));
      setDeletingId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (editingId) {
      setVideos(videos.map(v => v.id === editingId ? {
        ...v,
        title: formData.title,
        category: formData.category,
        duration: formData.duration,
        url: formData.url
      } : v));
    } else {
      const video = {
        id: Date.now(),
        title: formData.title,
        duration: formData.duration || '00:00',
        category: formData.category,
        views: '0',
        url: formData.url
      };
      setVideos([video, ...videos]);
    }

    setIsSaving(false);
    setIsModalOpen(false);
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Video Library</h2>
          <p className="text-base text-[#5C7562] mt-1">Manage and upload digital content.</p>
        </div>

        <button
          onClick={handleCreate}
          className="px-8 py-3 bg-[#1A3320] text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/10 group"
        >
          <HiPlus size={16} className="group-hover:rotate-90 transition-transform" />
          Add Content
        </button>
      </header>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/50" size={18} />
          <input
            type="text"
            placeholder="Search video content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-100 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-[#1A3320]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
          >
            <div className="aspect-video bg-emerald-50 relative flex items-center justify-center overflow-hidden">
              <HiVideoCamera className="text-emerald-100" size={48} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 scale-0 group-hover:scale-100 transition-transform shadow-lg">
                  <HiPlay size={20} />
                </div>
              </div>
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-white">
                {video.duration}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1">
                  <HiTag size={10} />
                  {video.category}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(video)}
                    className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
                  >
                    <HiPencilAlt size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(video.id)}
                    className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                  >
                    <HiTrash size={14} />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-serif text-[#1A3320] mb-3 line-clamp-1">{video.title}</h3>

              <div className="flex items-center justify-between text-[10px] text-[#5C7562] font-medium uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <HiPlay size={12} className="text-emerald-600/50" />
                  {video.views} Views
                </div>
                <div className="flex items-center gap-1">
                  <HiClock size={12} className="text-emerald-600/50" />
                  2d ago
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <button
          onClick={handleCreate}
          className="aspect-video border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <HiPlus size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Add Content</span>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Content" : "Add New Content"}
        description={editingId ? "Update the details." : "Fill in the details."}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Video Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Deep Breathwork Session"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(val) => setFormData({ ...formData, category: val })}
              options={categories}
            />
            <Input
              label="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 15:30"
            />
          </div>

          <FileUpload
            label="Thumbnail Cover"
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
          />

          <Input
            label="Video URL"
            required
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://..."
            icon={<HiCloudUpload size={20} />}
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
                  {editingId ? "Save Changes" : "Publish Content"}
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
        title="Delete Content"
        message="Are you sure you want to permanently delete this video? This action cannot be undone."
      />
    </main>
  );
}
