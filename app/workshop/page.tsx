"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Star,
    Zap,
    ChevronRight,
    Filter,
    RefreshCw,
    MessageCircle,
    Send,
    ArrowUpRight,
    Globe
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BookingModal } from '../components/BookingModal';

const upcomingWorkshops = [
    {
        id: 1,
        title: "Celestial Breathwork Intensive",
        date: "May 15, 2026",
        time: "07:00 AM - 09:30 AM",
        location: "Rishikesh, India / Online",
        price: "$49",
        spots: "12 Left",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
        category: "Pranayama",
        desc: "A transformative journey into the mechanics of Prana. Learn ancient techniques of celestial breathing to clear blockages and attain clarity."
    },
    {
        id: 2,
        title: "Vinyasa Flow Mastery",
        date: "May 22, 2026",
        time: "10:00 AM - 12:00 PM",
        location: "Online (Zoom)",
        price: "$29",
        spots: "Full",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
        category: "Asana",
        desc: "Master the art of fluid transitions. This workshop focuses on synchronizing breath with movement to build strength, flexibility, and flow."
    },
    {
        id: 3,
        title: "The Silence Within: Meditation",
        date: "June 05, 2026",
        time: "06:00 PM - 08:00 PM",
        location: "Dharamsala, India",
        price: "$75",
        spots: "25 Left",
        image: "https://images.unsplash.com/photo-1593811167562-9cef47bffcf8?auto=format&fit=crop&q=80",
        category: "Meditation",
        desc: "Find peace in the chaos. A deep dive into silent meditation techniques used by Himalayan yogis for centuries to still the mind and connect."
    }
];

const regularWorkshops = [
    {
        id: 101,
        title: "Morning Sun Salutations",
        frequency: "Every Monday & Thursday",
        time: "06:00 AM",
        platform: "Live Stream",
        price: "$15",
        image: "https://images.unsplash.com/photo-1545208393-2160291ba89e?auto=format&fit=crop&q=80",
        desc: "Energizing start to your day."
    },
    {
        id: 102,
        title: "Mid-Week Mindful Breath",
        frequency: "Every Wednesday",
        time: "07:30 PM",
        platform: "Discord Community",
        price: "Free",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
        desc: "Mid-week reset for stress relief."
    },
    {
        id: 103,
        title: "Weekend Satsang",
        frequency: "First Sunday of Month",
        time: "05:00 PM",
        platform: "Physical & Online",
        price: "Donation",
        image: "https://images.unsplash.com/photo-1593811167562-9cef47bffcf8?auto=format&fit=crop&q=80",
        desc: "Collective wisdom and chanting."
    }
];

const categories = ["All", "Pranayama", "Asana", "Meditation", "Kriya"];

export default function WorkshopPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);

    const openBooking = (workshop: any) => {
        setSelectedWorkshop(workshop);
        setIsModalOpen(true);
    };

    const filteredUpcoming = activeCategory === "All"
        ? upcomingWorkshops
        : upcomingWorkshops.filter(w => w.category === activeCategory);

    const handleWhatsAppRedirect = (e: React.FormEvent) => {
        e.preventDefault();
        const phone = "918709162825";
        const text = `Hi Sargam! My name is ${formData.name}. ${formData.message}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <main className="bg-[#F8FAF7] min-h-screen pt-24 pb-20 overflow-x-hidden">
            {/* Header Section */}
            <section className="px-6 mb-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row justify-between items-end gap-8"
                    >
                        <div className="max-w-2xl text-center md:text-left">
                            <span className="text-emerald-600 font-bold text-[10px] tracking-[0.4em] uppercase mb-4 block">Curated Sessions</span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A3320] leading-none mb-6">Upcoming <br /><span className="text-emerald-700 italic">Workshops.</span></h1>
                            <p className="text-[#5C7562] text-base md:text-lg font-light leading-relaxed">
                                Explore our full calendar of immersive sessions. From physical mastery to spiritual depth, find the workshop that resonates with your journey.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-end gap-2">
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

            {/* Upcoming Workshop Catalog List */}
            <section className="px-6 mb-20">
                <div className="max-w-7xl mx-auto space-y-12">
                    <AnimatePresence mode="popLayout">
                        {filteredUpcoming.map((workshop, i) => (
                            <motion.div
                                key={workshop.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative bg-white rounded-[2rem] border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500"
                            >
                                <div className="flex flex-col lg:flex-row min-h-[280px]">
                                    {/* Image Part */}
                                    <div className="lg:w-[25%] relative overflow-hidden h-[180px] lg:h-auto">
                                        <img
                                            src={workshop.image}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                            alt={workshop.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent lg:hidden" />
                                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[8px] font-bold uppercase tracking-widest text-emerald-700 shadow-sm">
                                            {workshop.category}
                                        </div>
                                    </div>

                                    {/* Content Part */}
                                    <div className="lg:w-[75%] p-5 lg:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3 h-3 text-emerald-600" />
                                                    <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-widest">{workshop.date}</span>
                                                </div>
                                                <div className="text-xl font-serif text-[#1A3320]">{workshop.price}</div>
                                            </div>

                                            <h2 className="text-xl md:text-2xl font-serif text-[#1A3320] mb-2 leading-tight group-hover:text-emerald-700 transition-colors">
                                                {workshop.title}
                                            </h2>

                                            <p className="text-[#5C7562] text-xs md:text-sm font-light leading-relaxed mb-4 max-w-2xl h-[2.5rem] lg:h-[3rem] line-clamp-2">
                                                {workshop.desc}
                                            </p>

                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                                                        <Clock className="w-3 h-3 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[8px] uppercase tracking-widest text-[#5C7562] opacity-60">Time</div>
                                                        <div className="text-[10px] font-medium text-[#1A3320]">{workshop.time}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                                                        <MapPin className="w-3 h-3 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[8px] uppercase tracking-widest text-[#5C7562] opacity-60">Location</div>
                                                        <div className="text-[10px] font-medium text-[#1A3320]">{workshop.location}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-emerald-50">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-3 h-3 text-emerald-500" />
                                                <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest">{workshop.spots}</span>
                                            </div>
                                            <Button
                                                variant={workshop.spots === "Full" ? "outline" : "premium"}
                                                size="sm"
                                                className="w-full sm:w-auto px-8 rounded-lg py-4 text-[9px] uppercase tracking-widest font-bold"
                                                disabled={workshop.spots === "Full"}
                                                onClick={() => openBooking(workshop)}
                                            >
                                                {workshop.spots === "Full" ? "Notify Me" : "Book Now"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* All Workshops List Section (Replaced Regular Rituals) */}
            <section className="px-6 py-14 bg-white border-y border-emerald-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-xl">
                            <span className="text-emerald-600 font-bold text-[9px] tracking-[0.4em] uppercase mb-2 block">Consistent Path</span>
                            <h2 className="text-3xl md:text-5xl font-serif text-[#1A3320]">All <span className="text-emerald-700 italic">Workshops.</span></h2>
                            <p className="text-[#5C7562] text-base font-light mt-2">Recurring sessions designed to help you maintain a steady ritual of growth.</p>
                        </div>
                    </div>

                    <div className="divide-y divide-emerald-50 border-t border-emerald-50">
                        {regularWorkshops.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group py-6 md:py-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 hover:bg-emerald-50/20 transition-colors px-2 border-b border-transparent hover:border-emerald-100"
                            >
                                {/* Thumbnail */}
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-none shadow-sm">
                                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-600 mb-1">
                                        <RefreshCw className="w-2.5 h-2.5" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest">{item.frequency}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif text-[#1A3320] group-hover:text-emerald-700 transition-colors mb-1">{item.title}</h3>
                                    <p className="text-[#5C7562] text-xs font-light leading-relaxed max-w-md">{item.desc}</p>
                                </div>

                                {/* Time & Platform */}
                                <div className="flex flex-col items-center md:items-start gap-1 min-w-[130px]">
                                    <div className="flex items-center gap-2 text-xs text-[#1A3320]">
                                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                        <span className="font-medium">{item.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-[#5C7562]">
                                        <Globe className="w-3 h-3 opacity-50" />
                                        <span>{item.platform}</span>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="flex flex-col items-center md:items-end gap-3 min-w-[110px]">
                                    <div className="text-lg font-serif text-[#1A3320]">{item.price}</div>
                                    <Button
                                        variant="premium"
                                        size="sm"
                                        className="rounded-lg px-6 py-3.5 text-[8px] uppercase tracking-widest font-bold"
                                        onClick={() => openBooking(item)}
                                    >
                                        Book Now <ArrowUpRight className="ml-1 w-2.5 h-2.5" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Gallery */}
            <section className="py-14 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#1A3320] mb-4">Past Vibrations.</h2>
                        <p className="text-[#5C7562] text-sm md:text-base font-light max-w-xl mx-auto">A glimpse into the energy shared in our previous gatherings.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[250px]">
                        {/* Image 1: Large Featured */}
                        <div className="col-span-2 row-span-2 rounded-[2rem] md:rounded-[3rem] overflow-hidden group relative">
                            <img src="/images/gallery/retreat.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Retreat" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Himalayan Rituals</span>
                            </div>
                        </div>
                        
                        {/* Image 2 */}
                        <div className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden group relative">
                            <img src="/images/gallery/meditation.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Meditation" />
                        </div>
                        
                        {/* Image 3 */}
                        <div className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden group relative">
                            <img src="/images/gallery/zen.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Zen" />
                        </div>

                        {/* Image 4 */}
                        <div className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden group relative">
                            <img src="/images/gallery/pranayama.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Pranayama" />
                        </div>

                        {/* Image 5 */}
                        <div className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden group relative">
                            <img src="/images/gallery/yoga.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Yoga" />
                        </div>
                    </div>
                </div>
            </section>

            {/* WhatsApp Custom Session Form */}
            <section className="py-14 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#EAF0E5]/50 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border border-emerald-100 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <span className="text-emerald-600 font-bold text-[10px] tracking-[0.4em] uppercase mb-4 block">Tailored Experiences</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320] mb-6 leading-tight">Need a <br /><span className="text-emerald-700 italic">Custom Session?</span></h2>
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
        </main>
    );
}