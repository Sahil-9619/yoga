"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContactService } from '../../services/contact.service';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await ContactService.sendMessage(formData);
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', phone: '', email: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => setStatus({ type: null, message: '' }), 5000);
    } catch (error: any) {
      const errorMessage = error.message === 'Failed to fetch'
        ? 'Something went wrong. Please try again later.'
        : (error.message || 'Something went wrong. Please try again later.');
      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320] mb-6 leading-tight">Let&apos;s Connect.</h2>
          <p className="text-[#4A6350] text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Whether you have a question about my coaching, want to collaborate, or just want to share your progress, I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 text-left relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm"
                  value={formData.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, phone: val });
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Email Address</label>
              <input
                required
                type="email"
                placeholder="your@email.com"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Message</label>
              <textarea
                required
                rows={4}
                placeholder="How can we help you?"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none text-sm"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            {status.type && (
              <div className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                {status.message}
              </div>
            )}

            <div className="flex justify-center pt-2">
              <Button
                variant="premium"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-12 uppercase tracking-widest gap-3 shadow-md py-6 text-sm disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
