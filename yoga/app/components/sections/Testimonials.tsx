"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { BASE_URL } from '../../lib/api-config';
import { TestimonialService } from '../../services/testimonial.service';

export const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    
    useEffect(() => {
        TestimonialService.getAllTestimonials().then(setTestimonials).catch(console.error);
    }, []);

    const textAndImageTestimonials = testimonials.filter(t => t.type !== 'video');
    const videoTestimonials = testimonials.filter(t => t.type === 'video');

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#FAFCF8]">
            {/* Professional Geometric Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
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
                <div className="absolute top-[20%] -left-64 opacity-[0.07]">
                    <svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 0C100 200 500 200 500 400C500 600 100 600 100 800" stroke="#059669" strokeWidth="2"/>
                        <path d="M150 0C150 200 550 200 550 400C550 600 150 600 150 800" stroke="#059669" strokeWidth="2"/>
                        <path d="M200 0C200 200 600 200 600 400C600 600 200 600 200 800" stroke="#059669" strokeWidth="2"/>
                    </svg>
                </div>
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
                            {videoTestimonials.map((video: any, i: number) => (
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
                                        </div>
                                    )}

                                    <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15]">
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
    );
};
