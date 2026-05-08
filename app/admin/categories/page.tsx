"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiCollection, 
  HiPlus, 
  HiTrash, 
  HiCheck, 
  HiX,
  HiFilter
} from 'react-icons/hi';
import { cn } from '../../lib/utils';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';
import { CategoryService } from '@/app/services/category.service';

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [deletingId, setDeletingId] = useState<number | string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    try {
      await CategoryService.createCategory(newCategoryName);
      setNewCategoryName('');
      setIsAdding(false);
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDeleteClick = (id: number | string) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      try {
        await CategoryService.deleteCategory(deletingId);
        fetchCategories();
        setDeletingId(null);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };


  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-100/50 pb-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Content Categories</h2>
          <p className="text-base text-[#5C7562] mt-1">Organize your Pranayama workshops and video content.</p>
        </div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="px-6 py-2.5 bg-[#1A3320] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-md shadow-emerald-900/5"
        >
          <HiPlus size={16} />
          Add Category
        </button>
      </header>

      <div className="max-w-4xl space-y-6">
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6"
          >
            <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row items-end gap-4">
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] mb-2 ml-1">New Category Name</label>
                <input
                  autoFocus
                  required
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Advanced Breathwork"
                  className="w-full bg-white border border-emerald-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 transition-all text-[#1A3320]"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 md:flex-none p-3 border border-emerald-100 text-[#5C7562] rounded-xl hover:bg-white transition-all"
                >
                  <HiX size={18} />
                </button>
                <button
                  type="submit"
                  className="flex-1 md:flex-none p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-900/10"
                >
                  <HiCheck size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
              <p className="text-sm text-emerald-600 font-medium">Loading categories...</p>
            </div>
          ) : categories.length > 0 ? (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-emerald-100/60 rounded-2xl p-4 flex items-center justify-between group hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600")}>
                    <HiFilter size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A3320]">{category.name}</h3>
                    <p className="text-[10px] text-[#5C7562] uppercase tracking-widest">{category.workshopCount || 0} Workshops Assigned</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => handleDeleteClick(category.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <HiTrash size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-emerald-50/20 rounded-3xl border border-dashed border-emerald-100">
              <p className="text-sm text-[#5C7562]">No categories found. Add your first one above.</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This will affect how your content is organized."
      />
    </main>
  );
}
