"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    ArrowRight,
    Sparkles,
    RefreshCw,
    MessageCircle,
    Send,
    ArrowUpRight,
    Globe
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BookingModal } from '../components/BookingModal';
import { WorkshopDetailsModal } from '../components/WorkshopDetailsModal';
import { WorkshopService } from '../services/workshop.service';
import { CategoryService } from '../services/category.service';
import { BASE_URL } from '../lib/api-config';

export default function WorkshopPage() {
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [workshopData, categoryData] = await Promise.all([
                WorkshopService.getAllWorkshops(),
                CategoryService.getAllCategories()
            ]);
            setWorkshops(workshopData);
            setCategories(["All", ...categoryData.map((c: any) => c.name)]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openBooking = (workshop: any) => {
        setSelectedWorkshop(workshop);
        setIsModalOpen(true);
        setIsDetailsOpen(false);
    };

    const openDetails = (workshop: any) => {
        setSelectedWorkshop(workshop);
        setIsDetailsOpen(true);
    };

    const filteredWorkshops = activeCategory === "All"
        ? workshops
        : workshops.filter(w => w.Category?.name === activeCategory);

    const handleWhatsAppRedirect = (e: React.FormEvent) => {
        e.preventDefault();
        const phone = "911234567890";
        const text = `Hi Sargam! My name is ${formData.name}. ${formData.message}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <main className="bg-[#F8FAF7] min-h-screen pt-32 pb-20 overflow-x-hidden">
            {/* Header Section */}
            <section className="px-6 mb-12">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="text-center md:text-left">
                            <span className="text-emerald-600 font-bold text-[10px] tracking-[0.4em] uppercase mb-4 block">Curated Sessions</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A3320] leading-none text-slate-800">Explore <br /><span className="text-emerald-700 italic">Workshops.</span></h1>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                                        : "bg-white text-[#5C7562] hover:bg-emerald-50 border border-emerald-100"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Workshop Cards List */}
            <section className="px-4 md:px-6 py-6 min-h-[400px]">
                <div className="max-w-5xl mx-auto">
                    <div className="divide-y divide-emerald-50 border-t border-emerald-50">
                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-4">
                                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                                <p className="text-sm text-emerald-600 font-medium">Aligning energies...</p>
                            </div>
                        ) : filteredWorkshops.length > 0 ? (
                            <AnimatePresence mode="popLayout">
                                {filteredWorkshops.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 12 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="py-5 border-b border-emerald-50"
                                    >
                                        {/* ── Mobile card ── */}
                                        <div className="flex md:hidden flex-col gap-4">
                                            {/* Row 1: image + title/meta */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-none bg-emerald-50 shadow-sm">
                                                    <img
                                                        src={item.photo ? (item.photo.startsWith('http') ? item.photo : `${BASE_URL}${item.photo}`) : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'}
                                                        className="w-full h-full object-cover"
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5 text-emerald-600 mb-1 flex-wrap">
                                                        <span className="text-[9px] font-bold uppercase tracking-widest">{item.Category?.name}</span>
                                                        <span className="w-1 h-1 rounded-full bg-emerald-300" />
                                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.priceType === 'free' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                            {item.priceType === 'free' ? 'Free' : `₹${item.amount}`}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-base font-serif text-[#1A3320] leading-snug line-clamp-2">{item.title}</h3>
                                                </div>
                                            </div>

                                            {/* Row 2: date / time / location */}
                                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-[#5C7562]">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3 text-emerald-500" />
                                                    {new Date(item.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3 text-emerald-500" />
                                                    {item.time} IST
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    {item.mode === 'online' ? <Globe className="w-3 h-3 text-emerald-500" /> : <MapPin className="w-3 h-3 text-emerald-500" />}
                                                    {item.mode === 'online' ? item.platform : item.location}
                                                </span>
                                            </div>

                                            {/* Row 3: buttons */}
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    className="py-4 rounded-xl bg-[#1A3320] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-emerald-900 transition-all shadow-md shadow-emerald-900/20"
                                                    onClick={() => openBooking(item)}
                                                >
                                                    Book Now
                                                </button>
                                                <button
                                                    className="py-4 rounded-xl bg-emerald-600 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
                                                    onClick={() => openDetails(item)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>

                                        {/* ── Desktop row ── */}
                                        <div className="hidden md:flex items-center gap-6 px-2 group hover:bg-emerald-50/40 transition-all rounded-2xl cursor-pointer py-3" onClick={() => openDetails(item)}>
                                            {/* Thumbnail */}
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-none shadow-sm bg-emerald-50">
                                                <img
                                                    src={item.photo ? (item.photo.startsWith('http') ? item.photo : `${BASE_URL}${item.photo}`) : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    alt={item.title}
                                                />
                                            </div>

                                            {/* Main info */}
                                            <div className="flex-1 min-w-0 pr-8">
                                                <div className="flex items-center gap-2 text-emerald-600 mb-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
                                                        {new Date(item.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-emerald-200" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562]">{item.Category?.name}</span>
                                                </div>
                                                <h3 className="text-xl font-serif text-[#1A3320] group-hover:text-emerald-700 transition-colors mb-1">{item.title}</h3>
                                                <p className="text-[#5C7562] text-xs font-light line-clamp-1 max-w-xl">{item.description}</p>
                                            </div>

                                            {/* Time & location */}
                                            <div className="flex flex-col gap-2 min-w-[150px]">
                                                <div className="flex items-center gap-2 text-xs text-[#1A3320]">
                                                    <Clock className="w-4 h-4 text-emerald-600" />
                                                    <span className="font-medium">{item.time} IST</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-[#5C7562]">
                                                    {item.mode === 'online' ? <Globe className="w-4 h-4 opacity-40" /> : <MapPin className="w-4 h-4 opacity-40" />}
                                                    <span className="truncate max-w-[130px]">{item.mode === 'online' ? item.platform : item.location}</span>
                                                </div>
                                            </div>

                                            {/* Price + actions */}
                                            <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                                <div className="text-2xl font-serif text-[#1A3320]">
                                                    {item.priceType === 'free' ? 'Free' : `₹${item.amount}`}
                                                </div>
                                                <Button
                                                    variant="premium"
                                                    size="sm"
                                                    className="w-full rounded-xl px-6 py-3 text-[9px] uppercase tracking-widest font-bold"
                                                    onClick={(e) => { e.stopPropagation(); openBooking(item); }}
                                                >
                                                    Book Now <ArrowUpRight className="ml-1.5 w-3 h-3" />
                                                </Button>
                                                <button
                                                    className="w-full flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-emerald-600 text-white text-[9px] uppercase tracking-widest font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/30"
                                                    onClick={(e) => { e.stopPropagation(); openDetails(item); }}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="py-20 text-center bg-emerald-50/20 rounded-[3rem] border border-dashed border-emerald-200">
                                <p className="text-sm text-[#5C7562]">No workshops currently found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Past Vibrations Gallery */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320] mb-4 text-slate-800">Past <span className="text-emerald-700 italic">Vibrations.</span></h2>
                        <p className="text-[#5C7562] text-base md:text-lg font-light max-w-xl mx-auto">A glimpse into the energy shared in our previous gatherings.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
                        <div className="col-span-2 row-span-2 rounded-[2.5rem] overflow-hidden group relative">
                            <img src="/images/gallery/retreat.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Retreat" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Himalayan Rituals</span>
                            </div>
                        </div>
                        <div className="rounded-[2.5rem] overflow-hidden group relative">
                            <img src="/images/gallery/meditation.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Meditation" />
                        </div>
                        <div className="rounded-[2.5rem] overflow-hidden group relative">
                            <img src="/images/gallery/zen.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Zen" />
                        </div>
                        <div className="rounded-[2.5rem] overflow-hidden group relative">
                            <img src="/images/gallery/pranayama.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Pranayama" />
                        </div>
                        <div className="rounded-[2.5rem] overflow-hidden group relative">
                            <img src="/images/gallery/yoga.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Yoga" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Session Form */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#EAF0E5]/40 rounded-[4rem] p-10 md:p-20 border border-emerald-100/50 relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <span className="text-emerald-600 font-bold text-[10px] tracking-[0.4em] uppercase mb-4 block">Tailored Experiences</span>
                                r                               <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320] mb-6 leading-tight text-slate-800">Need a <br /><span className="text-emerald-700 italic">Custom Session?</span></h2>
                                <p className="text-[#5C7562] font-light leading-relaxed mb-8">
                                    Whether it&apos;s for a corporate retreat, a private group, or a deep-dive individual journey, we design sessions that meet your specific vibration and goals.
                                </p>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-emerald-100 w-fit shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Connect Directly</div>
                                        <div className="text-xs text-[#5C7562]">Instant response on WhatsApp</div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A3320] ml-2">Your Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="E.g. Arnav Sharma"
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-emerald-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm text-slate-800 placeholder:text-emerald-900/40"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A3320] ml-2">Your Message</label>
                                    <textarea
                                        required
                                        placeholder="Tell us a bit about what you're looking for..."
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-emerald-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm min-h-[120px] resize-none text-slate-800 placeholder:text-emerald-900/40"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <Button variant="premium" type="submit" className="w-full py-6 rounded-2xl uppercase tracking-widest text-xs font-bold gap-3 group">
                                    Send on WhatsApp <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                workshop={selectedWorkshop}
            />

            <WorkshopDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                workshop={selectedWorkshop}
                onBook={openBooking}
            />
        </main>
    );
}