"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { BASE_URL } from '../../lib/api-config';
import { VideoService } from '../../services/video.service';
import Link from 'next/link';

export const FeaturedVideos = () => {
    const [videos, setVideos] = useState<any[]>([]);
    
    useEffect(() => {
        VideoService.getAllVideos().then(vids => setVideos(vids.slice(0, 4))).catch(console.error);
    }, []);

    return (
        <section className="py-24 px-6 relative bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-emerald-600 font-bold text-[10px] tracking-[0.4em] uppercase mb-4 block">Video Experiences</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320] leading-tight">Featured <span className="text-emerald-700 italic">Videos.</span></h2>
                        <p className="text-[#5C7562] mt-4 font-light max-w-lg">Immerse yourself in our selected video sessions designed to guide you towards inner harmony.</p>
                    </motion.div>
                    <Link href="/workshop?tab=videos" className="px-8 py-3 rounded-full border border-emerald-600 text-emerald-700 font-bold uppercase tracking-widest text-xs hover:bg-emerald-600 hover:text-white transition-all shadow-md shadow-emerald-600/10 whitespace-nowrap">
                        View All Videos
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map((video, i) => (
                        <motion.div 
                            key={video.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-[#FAFCF8] rounded-3xl overflow-hidden shadow-lg border border-emerald-50 group hover:shadow-xl transition-shadow"
                        >
                            <Link href={`/workshop?tab=videos`} className="block">
                                <div className="aspect-video relative overflow-hidden bg-emerald-100 flex items-center justify-center">
                                    <img src={video.thumbnail ? (video.thumbnail.startsWith('http') ? video.thumbnail : `${BASE_URL}${video.thumbnail}`) : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'} alt={video.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform drop-shadow-lg" />
                                    </div>
                                    {video.price > 0 && (
                                        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                                            ₹{video.price}
                                        </div>
                                    )}
                                    {video.price == 0 && (
                                        <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                                            Free
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-serif text-[#1A3320] mb-3 group-hover:text-emerald-700 transition-colors">{video.title}</h3>
                                    <p className="text-sm text-[#5C7562] line-clamp-2 mb-6">{video.description}</p>
                                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                                        <span className="text-emerald-600">{video.duration || 'Session'}</span>
                                        <span className="text-emerald-600 group-hover:translate-x-2 transition-transform flex items-center gap-2">Watch Now →</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
