"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Sparkles, MapPin, ArrowUpRight, Clock, Globe, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FacebookIcon } from '../components/ui/SocialIcons';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const phone = "918709162825";
        const text = `Hi Sargam! My name is ${formData.name} (${formData.phone}). ${formData.message}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
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

            {/* Two Things: 1. Facebook Page Ad/Connect 2. Form */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

                    {/* Thing 1: Facebook Page Ad & Connect */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[3rem] overflow-hidden bg-white border border-emerald-100 shadow-xl flex flex-col"
                    >
                        {/* "Ad" Style Header */}
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
                                            <div className="text-sm text-[#5C7562]">facebook.com/sargam.bhartiya</div>
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
                                </div>
                            </div>

                            <div className="mt-10">
                                <a
                                    href="https://www.facebook.com/sargam.bhartiya"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full"
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
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                                <Button variant="premium" size="lg" type="submit" className="w-full uppercase tracking-widest gap-3 shadow-md py-6 text-sm">
                                    Send Message <MessageSquare className="w-4 h-4" />
                                </Button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
