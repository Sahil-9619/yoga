"use client";
import React, { useEffect, useState } from 'react';
import { CustomerService } from '../services/customer.service';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../lib/api-config';
import { RefreshCw, PlayCircle, Calendar, Clock, MapPin, Globe } from 'lucide-react';
import { BookingService } from '../services/booking.service';

export default function MyLibraryPage() {
    const [purchases, setPurchases] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'videos' | 'workshops'>('workshops');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const user = CustomerService.getCurrentUser();
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const [videoData, bookingData] = await Promise.all([
                    CustomerService.getMyVideos(),
                    BookingService.getMyBookings()
                ]);
                setPurchases(videoData || []);
                setBookings(bookingData || []);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-[#F4F7F2] pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif text-[#1A3320] mb-2">My <span className="text-emerald-700 italic">Library.</span></h1>
                <p className="text-[#5C7562] mb-8">Your purchased videos and booked workshops.</p>

                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setActiveTab('videos')}
                        className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${activeTab === 'videos' ? 'bg-[#1A3320] text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
                    >
                        My Videos ({purchases.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('workshops')}
                        className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${activeTab === 'workshops' ? 'bg-[#1A3320] text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
                    >
                        My Workshops ({bookings.length})
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                    </div>
                ) : activeTab === 'videos' ? (
                    purchases.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-emerald-50">
                            <p className="text-[#5C7562] mb-4">You haven't purchased any videos yet.</p>
                            <button onClick={() => router.push('/workshop?tab=videos')} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition">
                                Explore Videos
                            </button>
                        </div>
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {purchases.map(purchase => {
                            const video = purchase.video;
                            if (!video) return null;
                            return (
                                <div key={purchase.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-50">
                                    {activeVideo === video.videoLink ? (
                                        <div className="aspect-video bg-black">
                                            {video.videoLink.includes('youtube.com') || video.videoLink.includes('youtu.be') ? (
                                                <iframe 
                                                    className="w-full h-full"
                                                    src={`https://www.youtube.com/embed/${video.videoLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2]?.split(/[^0-9a-z_\-]/i)[0]}?autoplay=1`}
                                                    allowFullScreen
                                                    allow="autoplay"
                                                ></iframe>
                                            ) : (
                                                <video src={video.videoLink} className="w-full h-full" controls autoPlay />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-emerald-100 relative group cursor-pointer" onClick={() => setActiveVideo(video.videoLink)}>
                                            <img src={video.thumbnail ? (video.thumbnail.startsWith('http') ? video.thumbnail : `${BASE_URL}${video.thumbnail}`) : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-serif text-[#1A3320] mb-2">{video.title}</h3>
                                        <p className="text-sm text-[#5C7562] line-clamp-2 mb-4">{video.description}</p>
                                        <div className="text-xs text-emerald-600 font-bold uppercase tracking-widest">
                                            {video.duration || 'Full Session'}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    )
                ) : (
                    bookings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-emerald-50">
                            <p className="text-[#5C7562] mb-4">You haven't booked any workshops yet.</p>
                            <button onClick={() => router.push('/workshop?tab=workshops')} className="px-6 py-3 bg-[#1A3320] text-white rounded-xl font-bold hover:bg-emerald-900 transition">
                                Explore Workshops
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bookings.map(booking => {
                                const workshop = booking.Workshop;
                                if (!workshop) return null;
                                return (
                                    <div key={booking.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-50 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-serif text-[#1A3320]">{workshop.title}</h3>
                                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-full">
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-2 text-sm text-[#5C7562]">
                                                <Calendar className="w-4 h-4 text-emerald-600" />
                                                <span>{new Date(workshop.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#5C7562]">
                                                <Clock className="w-4 h-4 text-emerald-600" />
                                                <span>{workshop.time} IST</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#5C7562]">
                                                {workshop.mode === 'online' ? <Globe className="w-4 h-4 text-emerald-600" /> : <MapPin className="w-4 h-4 text-emerald-600" />}
                                                <span>{workshop.mode === 'online' ? workshop.platform : workshop.location}</span>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-emerald-50">
                                            <div className="text-xs text-[#5C7562] uppercase tracking-widest font-bold">
                                                Session: {booking.priceType === 'free' ? 'Free' : booking.priceType === 'group' ? 'Group' : '1:1 Personal'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                )}
            </div>
        </main>
    );
}
