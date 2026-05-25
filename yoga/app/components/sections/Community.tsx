"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiClock } from 'react-icons/hi';
import { InstagramIcon, FacebookIcon } from '../ui/SocialIcons';
import { useSocialLinks } from '../../hooks/useSocialLinks';
import { ReelService, Reel } from '../../services/reel.service';

export const Community = () => {
  const social = useSocialLinks();
  const [videos, setVideos] = useState<Reel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ReelService.getAllReels()
      .then(data => setVideos(data))
      .catch(() => setVideos([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section id="community" className="py-20 overflow-hidden relative bg-[#EAF0E5]">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">The Global Family</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#1A3320]">Growing Together.</h2>
        <p className="text-[#5C7562] max-w-2xl mx-auto font-light leading-relaxed">
          Join a thriving family of over 50,000 mindful seekers. I share daily flows, breathwork secrets, and holistic health tips to help you thrive in every aspect of life.
        </p>
      </div>

      {/* Portrait Videos Grid */}
      {!isLoading && videos.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, i) => (
              <motion.a
                key={video.id}
                href={video.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-xl bg-white"
                style={{ aspectRatio: '4/5' }}
              >
                {/* Background Image */}
                {video.thumbnail ? (
                  <img
                    src={ReelService.getThumbnailUrl(video.thumbnail)!}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/80 to-emerald-950/80" />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-xl text-[10px] font-bold text-white border border-white/10 z-10">
                    <HiClock size={12} className="text-emerald-400" />
                    {video.duration}
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <HiPlay size={24} className="text-white ml-1" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-serif text-white text-lg leading-tight mb-2 line-clamp-1 group-hover:text-emerald-300 transition-colors duration-300">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-white/70 text-xs font-light line-clamp-2 leading-relaxed mb-3">
                      {video.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <HiPlay size={12} /> Watch Reel
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Social Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 px-6 w-full max-w-md mx-auto sm:max-w-none">
        <a
          href={social.instagram || '#'}
          onClick={(e) => { if (!social.instagram) e.preventDefault(); }}
          target={social.instagram ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-[#D8E2D5] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 group ${!social.instagram ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <InstagramIcon size={22} />
          <span className="font-semibold tracking-wide uppercase text-sm text-[#1A3320]">Instagram</span>
        </a>
        <a
          href={social.facebook || '#'}
          onClick={(e) => { if (!social.facebook) e.preventDefault(); }}
          target={social.facebook ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-[#D8E2D5] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 group ${!social.facebook ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FacebookIcon size={22} />
          <span className="font-semibold tracking-wide uppercase text-sm text-[#1A3320]">Facebook</span>
        </a>
      </div>
    </section>
  );
};
