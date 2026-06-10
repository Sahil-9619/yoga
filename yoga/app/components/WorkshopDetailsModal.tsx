"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Calendar,
    Clock,
    MapPin,
    Globe,
    CreditCard,
    ArrowRight,
    ShieldCheck,
    Layers,
} from 'lucide-react';
import { BASE_URL } from '../lib/api-config';

interface WorkshopDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    workshop: any;
    onBook: (workshop: any) => void;
}

export const WorkshopDetailsModal = ({ isOpen, onClose, workshop, onBook }: WorkshopDetailsModalProps) => {
    React.useEffect(() => {
        // Time left countdown removed as time field is deprecated in favor of free-text scheduleInfo
    }, [workshop, isOpen]);

    if (!workshop) return null;

    const photoSrc = workshop.photo
        ? (workshop.photo.startsWith('http') ? workshop.photo : `${BASE_URL}${workshop.photo}`)
        : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Sheet / Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        className="relative w-full sm:max-w-lg bg-white z-10 sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl min-h-[75vh] max-h-[96vh] sm:min-h-0 sm:max-h-[92vh]"
                    >
                        {/* Hero Image */}
                        <div className="relative h-48 sm:h-64 flex-shrink-0">
                            <img src={photoSrc} alt={workshop.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Close btn */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Badges + Title over image */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    {workshop.Category?.name && (
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest">
                                            {workshop.Category.name}
                                        </span>
                                    )}
                                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur text-white text-[9px] font-bold uppercase tracking-widest border border-white/20">
                                        {workshop.mode}
                                    </span>
                                    {workshop.priceType === 'free' ? (
                                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-emerald-400/90 text-white">Free</span>
                                    ) : (
                                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-amber-400/90 text-amber-900 flex items-center gap-1.5 flex-wrap">
                                            {workshop.singleSessionPrice && <span>1 Session: ${workshop.singleSessionPrice}</span>}
                                            {workshop.singleSessionPrice && <span className="opacity-50">|</span>}
                                            <span>Grp: ${workshop.groupPrice || workshop.amount}</span>
                                            <span className="opacity-50">|</span>
                                            <span>1:1: ${workshop.personalPrice || workshop.amount}</span>
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl sm:text-2xl font-serif text-white leading-snug">{workshop.title}</h2>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto flex flex-col">
                            {/* Quick stats bar */}
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-emerald-100 border-b border-emerald-100 bg-emerald-50/40">
                                <div className="flex flex-col items-center py-3 px-2 gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-[9px] font-bold text-[#5C7562] uppercase tracking-widest">Date / Freq</span>
                                    <span className="text-[11px] font-semibold text-[#1A3320] text-center leading-tight">
                                        {workshop.frequency || (workshop.date ? new Date(workshop.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', year: 'numeric' }) : '')}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center py-3 px-2 gap-1">
                                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-[9px] font-bold text-[#5C7562] uppercase tracking-widest">Schedule</span>
                                    <span className="text-[11px] font-semibold text-[#1A3320] text-center leading-tight">{workshop.scheduleInfo}</span>
                                </div>
                                {workshop.duration && (
                                  <div className="flex flex-col items-center py-3 px-2 gap-1">
                                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                        <span className="text-[9px] font-bold text-[#5C7562] uppercase tracking-widest">Duration</span>
                                        <span className="text-[11px] font-semibold text-[#1A3320] text-center leading-tight">{workshop.duration}</span>
                                    </div>
                                )}
                                <div className="flex flex-col items-center py-3 px-2 gap-1">
                                    {workshop.mode === 'online' ? <Globe className="w-3.5 h-3.5 text-emerald-600" /> : <MapPin className="w-3.5 h-3.5 text-emerald-600" />}
                                    <span className="text-[9px] font-bold text-[#5C7562] uppercase tracking-widest">
                                        {workshop.mode === 'online' ? 'Platform' : 'Location'}
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#1A3320] text-center leading-tight truncate max-w-full px-1">
                                        {workshop.mode === 'online' ? workshop.platform : workshop.location}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="px-5 py-3">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-2">
                                    <Layers className="w-3.5 h-3.5" /> About this Workshop
                                </h3>
                                <p className="text-[#5C7562] text-sm leading-relaxed">
                                    {workshop.description}
                                </p>
                            </div>
                        </div>

                        {/* Book Now Footer */}
                        <div className="flex-shrink-0 p-4 border-t border-emerald-100 bg-white flex items-center gap-3">
                            <div className="flex-1">
                                <div className="text-[9px] font-bold uppercase tracking-widest text-[#5C7562]">Price</div>
                                <div className="text-xl font-serif text-[#1A3320]">
                                    {workshop.priceType === 'free' ? 'Free' : (
                                        <div className="flex flex-col text-xs gap-0.5 mt-1">
                                            {workshop.singleSessionPrice && <span><b className="font-bold text-emerald-700">1 Session:</b> ${workshop.singleSessionPrice}</span>}
                                            <span><b className="font-bold text-emerald-700">Group:</b> ${workshop.groupPrice || workshop.amount}</span>
                                            <span><b className="font-bold text-emerald-700">1:1:</b> ${workshop.personalPrice || workshop.amount}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => onBook(workshop)}
                                className="flex items-center gap-2 px-8 py-3.5 rounded-l bg-[#1A3320] text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20 flex-shrink-0"
                            >
                                Book Now <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
