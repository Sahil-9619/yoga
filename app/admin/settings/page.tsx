"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiLockClosed, HiKey, HiEye, HiEyeOff, HiSave, HiShieldCheck } from "react-icons/hi";
import { cn } from "@/app/lib/utils";
import { AuthService } from "@/app/services/auth.service";

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus({ type: null, message: '' });

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'New passwords do not match' });
      setIsSaving(false);
      return;
    }

    try {
      const response = await AuthService.updatePassword(
        formData.currentPassword,
        formData.newPassword
      );
      setStatus({
        type: 'success',
        message: response.message || 'Password updated successfully'
      });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to update password'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-4">
        <h2 className="text-4xl font-serif text-[#1A3320]">Account Security</h2>
        <p className="text-base text-[#5C7562] mt-1">Manage your administrative credentials.</p>
      </header>

      <div className="space-y-6 max-w-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-emerald-100/50">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
            <HiLockClosed size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1A3320] uppercase tracking-wider">Change Password</h3>
            <p className="text-[11px] text-[#5C7562]">Update your login credentials regularly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {status.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-3 rounded-xl text-xs font-medium flex items-center gap-2",
                status.type === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
              )}
            >
              <HiShieldCheck size={14} />
              {status.message}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#5C7562] uppercase tracking-widest mb-1.5 ml-1">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full bg-white border border-emerald-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-[#1A3320]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600/50 hover:text-emerald-600 transition-colors"
                >
                  {showPasswords.current ? <HiEyeOff size={14} /> : <HiEye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#5C7562] uppercase tracking-widest mb-1.5 ml-1">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full bg-white border border-emerald-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-[#1A3320]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600/50 hover:text-emerald-600 transition-colors"
                >
                  {showPasswords.new ? <HiEyeOff size={14} /> : <HiEye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#5C7562] uppercase tracking-widest mb-1.5 ml-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-white border border-emerald-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-[#1A3320]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600/50 hover:text-emerald-600 transition-colors"
                >
                  {showPasswords.confirm ? <HiEyeOff size={14} /> : <HiEye size={14} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#1A3320] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-md shadow-emerald-900/5 disabled:opacity-50 group"
            >
              {isSaving ? (
                <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <HiSave size={14} className="group-hover:scale-110 transition-transform" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
