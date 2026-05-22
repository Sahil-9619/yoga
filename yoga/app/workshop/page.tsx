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
    Star,
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
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const textAndImageTestimonials = testimonials.filter(t => t.type !== 'video');
    const videoTestimonials = testimonials.filter(t => t.type === 'video');
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [workshopData, categoryData, testimonialData] = await Promise.all([
                WorkshopService.getAllWorkshops(),
                CategoryService.getAllCategories(),
                import('../services/testimonial.service').then(m => m.TestimonialService.getAllTestimonials())
            ]);
            setWorkshops(workshopData);
            setCategories(["All", ...categoryData.map((c: any) => c.name)]);
            setTestimonials(testimonialData);
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

            {/* Testimonials & Videos */}
            <section className="py-24 px-6 relative overflow-hidden bg-[#FAFCF8]">
                {/* Professional Geometric Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    {/* Top Right Grid/Lines */}
                    <div className="absolute -top-24 -right-24 opacity-[0.03]">
                        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A3320" strokeWidth="1"/>
                                </pattern>
                            </defs>
                            <rect width="400" height="400" fill="url(#grid)" />
                        </svg>
                    </div>
                    
                    {/* Left side elegant curve */}
                    <div className="absolute top-[20%] -left-64 opacity-[0.07]">
                        <svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 0C100 200 500 200 500 400C500 600 100 600 100 800" stroke="#059669" strokeWidth="2"/>
                            <path d="M150 0C150 200 550 200 550 400C550 600 150 600 150 800" stroke="#059669" strokeWidth="2"/>
                            <path d="M200 0C200 200 600 200 600 400C600 600 200 600 200 800" stroke="#059669" strokeWidth="2"/>
                        </svg>
                    </div>

                    {/* Bottom Right decorative circle outlines */}
                    <div className="absolute -bottom-40 -right-40 opacity-[0.05]">
                        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="300" cy="300" r="250" stroke="#1A3320" strokeWidth="1" strokeDasharray="4 4"/>
                            <circle cx="300" cy="300" r="200" stroke="#059669" strokeWidth="1"/>
                            <circle cx="300" cy="300" r="150" stroke="#1A3320" strokeWidth="1" strokeDasharray="4 4"/>
                        </svg>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-emerald-600 font-bold text-[10px] tracking-[0.4em] uppercase mb-4 block">Community Stories</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-[#1A3320] mb-6 leading-tight">Kind <span className="text-emerald-700 italic">Words.</span></h2>
                        <p className="text-[#5C7562] text-lg font-light max-w-2xl mx-auto">Real stories of healing, transformation, and inner peace from our beautiful global community.</p>
                    </motion.div>

                    {textAndImageTestimonials.length > 0 && (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-24">
                            {textAndImageTestimonials.map((testimonial, index) => (
                                <motion.div 
                                    key={testimonial.id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="break-inside-avoid relative bg-white rounded-xl p-8 md:p-10 border border-slate-200 hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col overflow-hidden"
                                >
                                    {/* Curved Lines Background Pattern */}
                                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
                                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <pattern id="curves" width="200" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                                                    <path d="M0 40 Q 50 80 100 40 T 200 40" fill="none" stroke="#059669" strokeWidth="1.5" />
                                                    <path d="M0 60 Q 50 100 100 60 T 200 60" fill="none" stroke="#059669" strokeWidth="1.5" />
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#curves)" />
                                        </svg>
                                    </div>

                                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600 rounded-t-xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-20"></div>
                                    
                                    <div className="flex text-amber-400 mb-6 gap-1 relative z-10">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    
                                    {testimonial.type === 'image' && testimonial.mediaUrl && (
                                        <div className="w-full rounded-lg overflow-hidden mb-6 relative z-10 bg-slate-50 flex items-center justify-center border border-slate-100">
                                            <img src={testimonial.mediaUrl.startsWith('http') ? testimonial.mediaUrl : `${BASE_URL}${testimonial.mediaUrl}`} alt="testimonial" className="w-full h-auto max-h-64 object-contain" />
                                        </div>
                                    )}
                                    {testimonial.text && (
                                        <p className="text-sm md:text-base text-slate-600 font-light leading-relaxed mb-8 relative">
                                            <span className="text-4xl text-slate-200 absolute -top-3 -left-2 font-serif leading-none">&ldquo;</span>
                                            <span className="relative z-10">{testimonial.text}</span>
                                        </p>
                                    )}
                                    
                                    {testimonial.type === 'text' && (
                                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100 relative z-10">
                                            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 font-serif text-xl uppercase">
                                                {(testimonial.name || '?').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800 text-sm">{testimonial.name || 'Anonymous'}</div>
                                                {testimonial.location && <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{testimonial.location}</div>}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {videoTestimonials.length > 0 && (
                        <div className="mt-32">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h3 className="text-3xl md:text-4xl font-serif text-[#1A3320] mb-3">Video <span className="text-emerald-700 italic">Experiences.</span></h3>
                                <p className="text-[#5C7562] text-base font-light">Watch and listen to the transformative journeys.</p>
                            </motion.div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                {videoTestimonials.map((video, i) => (
                                    <motion.div 
                                        key={video.id}
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="relative aspect-[4/5] md:aspect-video rounded-xl overflow-hidden group shadow-lg shadow-emerald-900/10 border border-emerald-900/20 bg-[#0A1A12]"
                                    >
                                        <video 
                                            src={video.mediaUrl.startsWith('http') ? video.mediaUrl : `${BASE_URL}${video.mediaUrl}`}
                                            className="w-full h-full object-contain relative z-20"
                                            controls
                                            preload="metadata"
                                        />
                                        
                                        {video.text && (
                                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-30">
                                                <p className="text-white text-sm font-light">"{video.text}"</p>
                                                {/* No name or location rendered for videos per request */}
                                            </div>
                                        )}

                                        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15]">
                                            {/* Curved Lines Background Pattern */}
                                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <pattern id={`curves-video-${video.id}`} width="200" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)">
                                                        <path d="M0 40 Q 50 80 100 40 T 200 40" fill="none" stroke="#10b981" strokeWidth="1.5" />
                                                        <path d="M0 60 Q 50 100 100 60 T 200 60" fill="none" stroke="#10b981" strokeWidth="1.5" />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill={`url(#curves-video-${video.id})`} />
                                            </svg>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Custom Session Form */}
            <section className="py-24 px-6 relative bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#0A1A12] rounded-2xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
                        {/* Background Geometric Elements for Dark Theme */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[40px] border-emerald-900/20 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border-[2px] border-emerald-800/30 rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/4 w-[1px] h-[800px] bg-gradient-to-b from-transparent via-emerald-800/50 to-transparent -translate-y-1/2 rotate-45 pointer-events-none"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <span className="text-emerald-400 font-bold text-[10px] tracking-[0.4em] uppercase mb-6 block">Tailored Experiences</span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">Design Your <br /><span className="text-emerald-300 italic font-light">Custom Journey.</span></h2>
                                <p className="text-emerald-100/70 font-light leading-relaxed mb-10 text-lg">
                                    Whether it's for a corporate retreat, a private group, or a deep-dive individual journey, we curate sessions that perfectly align with your specific vibration and goals.
                                </p>
                                
                                <div className="flex items-center gap-5 p-5 rounded-xl bg-white/5 border border-white/10 w-fit backdrop-blur-md">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Direct Consultation</div>
                                        <div className="text-sm text-emerald-100/60 font-light">Instant response on WhatsApp</div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleWhatsAppRedirect} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Your Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="E.g. Arnav Sharma"
                                        className="w-full px-5 py-4 rounded-xl bg-[#0F241A] border border-emerald-900/50 focus:outline-none focus:border-emerald-500 transition-colors text-sm text-white placeholder:text-emerald-100/20"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Your Vision / Message</label>
                                    <textarea
                                        required
                                        placeholder="Tell us a bit about what you're looking for..."
                                        className="w-full px-5 py-4 rounded-xl bg-[#0F241A] border border-emerald-900/50 focus:outline-none focus:border-emerald-500 transition-colors text-sm min-h-[140px] resize-none text-white placeholder:text-emerald-100/20"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="w-full py-5 rounded-xl bg-emerald-600 text-white uppercase tracking-widest text-xs font-bold gap-3 flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/50 group">
                                    Send on WhatsApp <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
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