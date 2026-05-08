"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Sparkles, MapPin, ArrowUpRight, Clock, Globe, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FacebookIcon } from '../components/ui/SocialIcons';
import { HiMail } from 'react-icons/hi';
import { ContactService } from '../services/contact.service';
import { cn } from '../lib/utils';
import { useSocialLinks } from '../hooks/useSocialLinks';

export default function ContactPage() {
    const social = useSocialLinks();
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
        <main className="bg-[#F8FAF7] min-h-screen pt-32 pb-20 overflow-x-hidden">
            {/* Design same as About page - Section Header */}
            <section className="px-6 mb-16">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-emerald-600 font-bold text-xs tracking-[0.4em] uppercase mb-4 block">Get in Touch</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-[#1A3320] leading-tight mb-6">
                            Connect with <span className="text-emerald-700 italic">Sargam.</span>
                        </h1>
                        <p className="text-[#5C7562] text-lg font-light leading-relaxed max-w-2xl mx-auto">
                            Whether you seek spiritual guidance, physical mastery, or humanitarian collaboration, I am here to walk the path with you.
                        </p>
                    </motion.div>
                </div>
            </section>


            <section className="px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">


                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[3rem] overflow-hidden bg-white border border-emerald-100 shadow-xl flex flex-col"
                    >

                        <div className="relative h-64 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
                                alt="Facebook Cover"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A3320] via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-8 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-white shadow-lg">
                                    <img src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-white font-serif text-xl">Sargam Bhartiya</h3>
                                    <p className="text-white/70 text-xs tracking-widest uppercase">Official Facebook Page</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[#1A3320] font-serif text-lg mb-1">Certified Wellness Coach</h4>
                                    <p className="text-[#5C7562] text-sm font-light leading-relaxed">
                                        I help conscious entrepreneurs to reclaim their health and vitality
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 group cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <FacebookIcon size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-[#1A3320] uppercase tracking-widest">Connect Digitally</div>
                                            <div className="text-sm text-[#5C7562]">{social.facebook.replace('https://', '')}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-[#1A3320] uppercase tracking-widest">Community</div>
                                            <div className="text-sm text-[#5C7562]">1.1k+ Followers</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                            <HiMail size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-[#1A3320] uppercase tracking-widest">Email Support</div>
                                            <div className="text-sm text-[#5C7562]">hello@sargambhartiya.com</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <a
                                    href={social.facebook || '#'}
                                    onClick={(e) => { if (!social.facebook) e.preventDefault(); }}
                                    target={social.facebook ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className={`block w-full ${!social.facebook ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <Button variant="outline" className="w-full py-7 rounded-2xl text-blue-600 border-blue-100 hover:bg-blue-50 hover:border-blue-200 uppercase tracking-[0.2em] text-[10px] font-bold gap-3 group">
                                        <FacebookIcon size={16} /> Follow us on Facebook <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form (Flat) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        <div className="mb-10">
                            <h3 className="text-3xl font-serif text-[#1A3320] mb-3">Send a Message</h3>
                            <p className="text-[#5C7562] text-sm font-light leading-relaxed max-w-sm">
                                Have a specific question? I usually respond within 24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            {status.type && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className={cn(
                                        "p-4 rounded-xl text-sm font-medium flex items-center gap-3 border",
                                        status.type === 'success'
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                            : "bg-red-50 text-red-700 border-red-100"
                                    )}
                                >
                                    {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    {status.message}
                                </motion.div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm placeholder:text-emerald-900/40 text-slate-800"
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
                                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm placeholder:text-emerald-900/40 text-slate-800"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            setFormData({ ...formData, phone: val });
                                        }}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm placeholder:text-emerald-900/40 text-slate-800"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="How can we help you?"
                                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none text-sm placeholder:text-emerald-900/40 text-slate-800"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="flex justify-center pt-2">
                                <Button
                                    variant="premium"
                                    size="lg"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full uppercase tracking-widest gap-3 shadow-md py-6 text-sm disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>Sending Message... <Loader2 className="w-4 h-4 animate-spin" /></>
                                    ) : (
                                        <>Send Message <MessageSquare className="w-4 h-4" /></>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
