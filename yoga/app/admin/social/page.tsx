"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiSave, HiCheckCircle, HiExclamationCircle, HiRefresh } from 'react-icons/hi';
import { cn } from '@/app/lib/utils';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { SocialService, SocialLinks } from '@/app/services/social.service';

export default function AdminSocialLinks() {
  const [socials, setSocials] = useState<SocialLinks>({ facebook: '', instagram: '', youtube: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const data = await SocialService.getLinks();
      setSocials(data);
    } catch (_) { }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchLinks(); }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setStatus({ type: null, message: '' });
    try {
      const data = await SocialService.updateLinks(socials);
      setSocials(data);
      setStatus({ type: 'success', message: 'Social links updated successfully.' });
      setTimeout(() => setStatus({ type: null, message: '' }), 3000);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to update links.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex-1 pt-2 px-4 lg:pt-4 lg:px-10 max-w-7xl w-full mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-100/50 pb-6">
        <div>
          <h2 className="text-4xl font-serif text-[#1A3320]">Social Connectivity</h2>
          <p className="text-base text-[#5C7562] mt-1">Manage your primary social media links. Changes apply site-wide instantly.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchLinks} className="px-4 py-2.5 bg-white border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition-all">
            <HiRefresh size={14} /> Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="px-6 py-2.5 bg-[#1A3320] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-900 transition-all shadow-md shadow-emerald-900/5 disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <><HiSave size={16} /> Save Changes</>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-4xl space-y-4">
        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-3 rounded-xl text-xs font-medium flex items-center gap-2 border",
              status.type === 'success' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"
            )}
          >
            {status.type === 'success' ? <HiCheckCircle size={16} /> : <HiExclamationCircle size={16} />}
            {status.message}
          </motion.div>
        )}

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <SocialInput
              icon={FaFacebook}
              label="Facebook"
              description="Your organization's public page URL"
              value={socials.facebook}
              onChange={(v: string) => setSocials(p => ({ ...p, facebook: v }))}
              brandColor="#1877F2"
              bgColor="bg-blue-50/50"
            />
            <SocialInput
              icon={FaInstagram}
              label="Instagram"
              description="Your public handle or profile URL"
              value={socials.instagram}
              onChange={(v: string) => setSocials(p => ({ ...p, instagram: v }))}
              brandColor="#E4405F"
              bgColor="bg-pink-50/50"
            />
            <SocialInput
              icon={FaYoutube}
              label="YouTube"
              description="Your official channel or playlist URL"
              value={socials.youtube}
              onChange={(v: string) => setSocials(p => ({ ...p, youtube: v }))}
              brandColor="#FF0000"
              bgColor="bg-red-50/50"
            />
          </div>
        )}
      </div>
    </main>
  );
}

function SocialInput({ icon: Icon, label, description, value, onChange, brandColor, bgColor }: any) {
  return (
    <div className="bg-white border border-emerald-100/60 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-6 hover:border-emerald-200 transition-colors">
      <div className="flex items-center gap-4 md:w-64 shrink-0">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", bgColor)} style={{ color: brandColor }}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1A3320]">{label}</h3>
          <p className="text-[10px] text-[#5C7562] uppercase tracking-widest">{description}</p>
        </div>
      </div>
      <div className="flex-1">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`https://${label.toLowerCase()}.com/...`}
          className="w-full bg-[#FDFCF9] border border-emerald-100/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all text-[#1A3320]"
        />
      </div>
    </div>
  );
}
