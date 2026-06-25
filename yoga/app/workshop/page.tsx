"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  RefreshCw,
  MessageCircle,
  Send,
  ArrowUpRight,
  Globe,
  PlayCircle,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { BookingModal } from "../components/BookingModal";
import { WorkshopDetailsModal } from "../components/WorkshopDetailsModal";
import { PaymentModal } from "../components/PaymentModal";
import { SuccessModal } from "../components/SuccessModal";
import { WorkshopService } from "../services/workshop.service";
import { CategoryService } from "../services/category.service";
import { VideoService } from "../services/video.service";
import { CustomerService } from "../services/customer.service";
import { BASE_URL } from "../lib/api-config";
import { useSearchParams, useRouter } from "next/navigation";

function WorkshopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams?.get("tab") || "workshops";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [purchasedVideoIds, setPurchasedVideoIds] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [workshopData, categoryData, videoData] = await Promise.all([
        WorkshopService.getAllWorkshops(),
        CategoryService.getAllCategories(),
        VideoService.getAllVideos(),
      ]);
      setWorkshops(workshopData);
      setCategories(["All", ...categoryData.map((c: any) => c.name)]);
      setVideos(videoData);

      const user = CustomerService.getCurrentUser();
      if (user) {
        const myVids = await CustomerService.getMyVideos();
        setPurchasedVideoIds(myVids.map((p: any) => p.videoId));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/workshop?tab=${tab}`, { scroll: false });
  };

  const openBooking = (workshop: any) => {
    const user = CustomerService.getCurrentUser();
    if (!user) {
      router.push("/login?redirect=/workshop?tab=workshops");
      return;
    }
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
    setIsDetailsOpen(false);
  };

  const openDetails = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setIsDetailsOpen(true);
  };

  const handleBuyVideo = async (video: any) => {
    const user = CustomerService.getCurrentUser();
    if (!user) {
      router.push("/login?redirect=/workshop?tab=videos");
      return;
    }

    setSelectedVideo(video);

    if (Number(video.price) === 0) {
      try {
        await CustomerService.buyVideo(video.id);
        fetchData();
        setIsSuccessOpen(true);
      } catch (e) {
        alert("Failed to get video");
      }
      return;
    }

    setIsPaymentOpen(true);
  };

  const processPaymentSuccess = async () => {
    try {
      await CustomerService.buyVideo(selectedVideo.id);
      fetchData();
      setIsPaymentOpen(false);
      setIsSuccessOpen(true);
    } catch (e) {
      alert("Checkout failed");
      setIsPaymentOpen(false);
    }
  };

  const filteredWorkshops =
    activeCategory === "All"
      ? workshops
      : workshops.filter((w) => w.Category?.name === activeCategory);

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "919119743145";
    const text = `Hi Sargam! My name is ${formData.name}. ${formData.message}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="bg-[#F8FAF7] min-h-screen pt-32 pb-20 overflow-x-hidden">
      {/* Header Section */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 border-b border-emerald-100 pb-8"
          >
            <div className="text-center md:text-left">
              <span className="text-emerald-600 font-bold text-[10px] tracking-[0.4em] uppercase mb-4 block">
                Curated Sessions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A3320] leading-none">
                Explore{" "}
                <span className="text-emerald-700 italic">Offerings.</span>
              </h1>
            </div>

            {/* Toggles */}
            <div className="flex bg-white rounded-full p-1 border border-emerald-100 shadow-sm">
              <button
                onClick={() => handleTabChange("workshops")}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "workshops" ? "bg-emerald-600 text-white shadow-md" : "text-[#5C7562] hover:bg-emerald-50"}`}
              >
                Workshops
              </button>
              <button
                onClick={() => handleTabChange("videos")}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "videos" ? "bg-emerald-600 text-white shadow-md" : "text-[#5C7562] hover:bg-emerald-50"}`}
              >
                Videos
              </button>
            </div>
          </motion.div>

          {activeTab === "workshops" && (
            <div className="flex flex-wrap gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                      : "bg-white text-[#5C7562] hover:bg-emerald-50 border border-emerald-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 md:px-6 py-6 min-h-[400px]">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
              <p className="text-sm text-emerald-600 font-medium">
                Aligning energies...
              </p>
            </div>
          ) : activeTab === "workshops" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorkshops.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {filteredWorkshops.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white border border-[#E3ECE1]/70 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                    >
                      {/* Cover Image & Badges */}
                      <div
                        className="aspect-[16/9] relative overflow-hidden bg-emerald-50/50 flex-none cursor-pointer"
                        onClick={() => openDetails(item)}
                      >
                        <img
                          src={
                            item.photo
                              ? item.photo.startsWith("http")
                                ? item.photo
                                : `${BASE_URL}${item.photo}`
                              : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          alt={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A3320]/60 via-transparent to-transparent opacity-60" />

                        {/* Category Overlay */}
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                          {item.Category?.name || "Yoga"}
                        </span>

                        {/* Mode Overlay */}
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/95 text-emerald-800 text-[10px] font-bold uppercase tracking-widest shadow-sm border border-emerald-100/50">
                          {item.mode}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Date & Frequency Meta */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                          {item.date && (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50/60 px-2 py-0.5 rounded-md">
                              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                              {(() => {
                                try {
                                  const d = new Date(item.date);
                                  return isNaN(d.getTime())
                                    ? ""
                                    : d.toLocaleDateString("en-US", {
                                        timeZone: "Asia/Kolkata",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      });
                                } catch (e) {
                                  return "";
                                }
                              })()}
                            </span>
                          )}
                          {item.frequency && (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              Freq:{" "}
                              {item.frequency
                                .toLowerCase()
                                .includes("session") ||
                              item.frequency.toLowerCase().includes("class")
                                ? item.frequency
                                : `${item.frequency} Sessions`}
                            </span>
                          )}
                          {item.duration && (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                              Dur:{" "}
                              {item.duration.toLowerCase().includes("hour") ||
                              item.duration.toLowerCase().includes("min") ||
                              item.duration.toLowerCase().includes("hr")
                                ? item.duration
                                : `${item.duration} Hr(s)`}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => openDetails(item)}
                          className="text-lg font-serif text-[#1A3320] leading-snug group-hover:text-emerald-700 transition-colors cursor-pointer mb-1.5 line-clamp-1"
                        >
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs font-light text-[#5C7562] line-clamp-2 mb-3 leading-relaxed flex-1">
                          {item.description}
                        </p>

                        {/* Details Grid (Schedule, Platform/Location) */}
                        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-emerald-50/20 border border-emerald-100/30 mb-3 text-[11px] text-slate-700">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold text-[#5C7562] uppercase tracking-wider">
                              Schedule
                            </span>
                            <span
                              className="font-semibold text-[#1A3320] truncate"
                              title={item.scheduleInfo}
                            >
                              {item.scheduleInfo}
                            </span>
                          </div>
                          {((item.mode === "online" && item.platform) ||
                            (item.mode !== "online" && item.location)) && (
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-bold text-[#5C7562] uppercase tracking-wider">
                                {item.mode === "online"
                                  ? "Platform"
                                  : "Location"}
                              </span>
                              <span
                                className="font-semibold text-[#1A3320] truncate"
                                title={
                                  item.mode === "online"
                                    ? item.platform
                                    : item.location
                                }
                              >
                                {item.mode === "online"
                                  ? item.platform
                                  : item.location}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Price Section */}
                        <div className="border-t border-emerald-50/50 pt-2.5 mb-3.5 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-[#5C7562] uppercase tracking-widest">
                            Rates
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {item.priceType === "free" ? (
                              <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100/50 rounded-md px-2 py-0.5 uppercase tracking-wider">
                                Free
                              </span>
                            ) : (
                              <>
                                {item.singleSessionPrice && (
                                  <span className="text-[11px] font-extrabold text-amber-900 bg-amber-50 border border-amber-100/30 rounded-md px-1.5 py-0.5 font-mono">
                                    Single: ${item.singleSessionPrice}
                                  </span>
                                )}
                                <span className="text-[11px] font-extrabold text-emerald-950 bg-emerald-50 border border-emerald-100/30 rounded-md px-1.5 py-0.5 font-mono">
                                  Group: ${item.groupPrice || item.amount}
                                </span>
                                <span className="text-[11px] font-extrabold text-blue-950 bg-blue-50 border border-blue-100/30 rounded-md px-1.5 py-0.5 font-mono">
                                  1:1: ${item.personalPrice || item.amount}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-auto">
                          <button
                            className="flex-1 py-2.5 px-2 rounded-xl border border-emerald-600/30 text-emerald-700 text-xs uppercase tracking-widest font-bold hover:bg-emerald-50 hover:border-emerald-600 transition-all text-center flex items-center justify-center"
                            onClick={() => openDetails(item)}
                          >
                            Details
                          </button>
                          <Button
                            variant="premium"
                            className="flex-1 py-2.5 px-2 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1 shadow-sm hover:shadow-md transition-all"
                            onClick={() => openBooking(item)}
                          >
                            Book Spot{" "}
                            <ArrowUpRight className="w-3.5 h-3.5 animate-pulse" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="col-span-full py-20 text-center bg-emerald-50/20 rounded-[3rem] border border-dashed border-emerald-200">
                  <p className="text-sm text-[#5C7562]">
                    No workshops currently found in this category.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.length > 0 ? (
                videos.map((video, i) => {
                  const isPurchased = purchasedVideoIds.includes(video.id);
                  return (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-lg border border-emerald-50 group hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-video relative overflow-hidden bg-emerald-100 flex items-center justify-center">
                        <img
                          src={
                            video.thumbnail
                              ? video.thumbnail.startsWith("http")
                                ? video.thumbnail
                                : `${BASE_URL}${video.thumbnail}`
                              : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
                          }
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {isPurchased ? (
                          <div
                            className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
                            onClick={() => router.push("/my-videos")}
                          >
                            <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                          </div>
                        ) : (
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                            ₹{video.price || "Free"}
                          </div>
                        )}
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-serif text-[#1A3320] mb-3">
                          {video.title}
                        </h3>
                        <p className="text-sm text-[#5C7562] line-clamp-2 mb-6">
                          {video.description}
                        </p>
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                          <span className="text-emerald-600">
                            {video.duration || "Session"}
                          </span>
                          {isPurchased ? (
                            <button
                              onClick={() => router.push("/my-videos")}
                              className="px-6 py-2 bg-emerald-600 text-white rounded-xl"
                            >
                              Watch Now
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBuyVideo(video)}
                              className="px-6 py-2 bg-[#1A3320] hover:bg-emerald-900 text-white rounded-xl transition-colors"
                            >
                              {Number(video.price) === 0
                                ? "Get Free"
                                : "Buy Video"}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center bg-emerald-50/20 rounded-[3rem] border border-dashed border-emerald-200">
                  <p className="text-sm text-[#5C7562]">
                    No videos currently available.
                  </p>
                </div>
              )}
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
                <span className="text-emerald-400 font-bold text-[10px] tracking-[0.4em] uppercase mb-6 block">
                  Tailored Experiences
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                  Design Your <br />
                  <span className="text-emerald-300 italic font-light">
                    Custom Journey.
                  </span>
                </h2>
                <p className="text-emerald-100/70 font-light leading-relaxed mb-10 text-lg">
                  Whether it&apos;s for a corporate retreat, a private group, or
                  a deep-dive individual journey, we curate sessions that
                  perfectly align with your specific vibration and goals.
                </p>

                <div className="flex items-center gap-5 p-5 rounded-xl bg-white/5 border border-white/10 w-fit backdrop-blur-md">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">
                      Direct Consultation
                    </div>
                    <div className="text-sm text-emerald-100/60 font-light">
                      Instant response on WhatsApp
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-emerald-500 rounded-full blur-2xl opacity-40"></div>

                <form
                  onSubmit={handleWhatsAppRedirect}
                  className="flex flex-col gap-5 relative z-10"
                >
                  <div>
                    <label className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-2 block ml-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-2 block ml-1">
                      Tell us your needs
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all text-sm resize-none"
                      placeholder="I am looking for a 3-day corporate wellness program..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0A1A12] font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-2 shadow-lg shadow-emerald-500/20"
                  >
                    Connect via WhatsApp <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
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
        onBook={() => {
          setIsDetailsOpen(false);
          setTimeout(() => openBooking(selectedWorkshop), 150);
        }}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        video={selectedVideo}
        onPaymentSuccess={processPaymentSuccess}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message="Video successfully added to your library! You can watch it anytime."
        actionText="Watch Now"
        onAction={() => router.push("/my-videos")}
      />
    </main>
  );
}

export default function WorkshopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkshopContent />
    </Suspense>
  );
}
