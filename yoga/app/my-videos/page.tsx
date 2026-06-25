"use client";
import React, { useEffect, useState } from "react";
import { CustomerService } from "../services/customer.service";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../lib/api-config";
import {
  RefreshCw,
  PlayCircle,
  Calendar,
  Clock,
  MapPin,
  Globe,
} from "lucide-react";
import { BookingService } from "../services/booking.service";

export default function MyLibraryPage() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"videos" | "workshops">(
    "workshops",
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = CustomerService.getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [videoData, bookingData] = await Promise.all([
          CustomerService.getMyVideos(),
          BookingService.getMyBookings(),
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
        <h1 className="text-4xl md:text-5xl font-serif text-[#1A3320] mb-2">
          My <span className="text-emerald-700 italic">Library.</span>
        </h1>
        <p className="text-[#5C7562] mb-8">
          Your purchased videos and booked workshops.
        </p>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${activeTab === "videos" ? "bg-[#1A3320] text-white" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}`}
          >
            My Videos ({purchases.length})
          </button>
          <button
            onClick={() => setActiveTab("workshops")}
            className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${activeTab === "workshops" ? "bg-[#1A3320] text-white" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}`}
          >
            My Workshops ({bookings.length})
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : activeTab === "videos" ? (
          purchases.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-emerald-50">
              <p className="text-[#5C7562] mb-4">
                You haven't purchased any videos yet.
              </p>
              <button
                onClick={() => router.push("/workshop?tab=videos")}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
              >
                Explore Videos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchases.map((purchase) => {
                const video = purchase.video;
                if (!video) return null;
                return (
                  <div
                    key={purchase.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-50"
                  >
                    {activeVideo === video.videoLink ? (
                      <div className="aspect-video bg-black">
                        {video.videoLink.includes("youtube.com") ||
                        video.videoLink.includes("youtu.be") ? (
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${video.videoLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2]?.split(/[^0-9a-z_\-]/i)[0]}?autoplay=1`}
                            allowFullScreen
                            allow="autoplay"
                          ></iframe>
                        ) : (
                          <video
                            src={video.videoLink}
                            className="w-full h-full"
                            controls
                            autoPlay
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        className="aspect-video bg-emerald-100 relative group cursor-pointer"
                        onClick={() => setActiveVideo(video.videoLink)}
                      >
                        <img
                          src={
                            video.thumbnail
                              ? video.thumbnail.startsWith("http")
                                ? video.thumbnail
                                : `${BASE_URL}${video.thumbnail}`
                              : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
                          }
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-[#1A3320] mb-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-[#5C7562] line-clamp-2 mb-4">
                        {video.description}
                      </p>
                      <div className="text-xs text-emerald-600 font-bold uppercase tracking-widest">
                        {video.duration || "Full Session"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-emerald-50">
            <p className="text-[#5C7562] mb-4">
              You haven't booked any workshops yet.
            </p>
            <button
              onClick={() => router.push("/workshop?tab=workshops")}
              className="px-6 py-3 bg-[#1A3320] text-white rounded-xl font-bold hover:bg-emerald-900 transition"
            >
              Explore Workshops
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => {
              const workshop = booking.Workshop;
              if (!workshop) return null;
              return (
                <div
                  key={booking.id}
                  className="bg-white border border-[#E3ECE1]/70 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <h3 className="text-lg font-serif text-[#1A3320] leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {workshop.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex-none ${
                        booking.status?.toLowerCase() === 'confirmed' || booking.status?.toLowerCase() === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center gap-2.5 text-xs text-[#5C7562]">
                        <Calendar className="w-4 h-4 text-emerald-600 flex-none" />
                        <span className="font-medium text-[#1A3320]">
                          {new Date(workshop.date).toLocaleDateString("en-US", {
                            timeZone: "Asia/Kolkata",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      {workshop.time && (
                        <div className="flex items-center gap-2.5 text-xs text-[#5C7562]">
                          <Clock className="w-4 h-4 text-emerald-600 flex-none" />
                          <span className="font-medium text-[#1A3320]">{workshop.time} IST</span>
                        </div>
                      )}
                      {workshop.frequency && (
                        <div className="flex items-center gap-2.5 text-xs text-[#5C7562]">
                          <Clock className="w-4 h-4 text-emerald-600 flex-none" />
                          <span className="font-medium text-[#1A3320]">
                            Freq: {workshop.frequency.toLowerCase().includes('session') || workshop.frequency.toLowerCase().includes('class') ? workshop.frequency : `${workshop.frequency} Sessions`}
                          </span>
                        </div>
                      )}
                      {workshop.duration && (
                        <div className="flex items-center gap-2.5 text-xs text-[#5C7562]">
                          <Clock className="w-4 h-4 text-emerald-600 flex-none" />
                          <span className="font-medium text-[#1A3320]">
                            Dur: {workshop.duration.toLowerCase().includes('hour') || workshop.duration.toLowerCase().includes('min') || workshop.duration.toLowerCase().includes('hr') ? workshop.duration : `${workshop.duration} Hr(s)`}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2.5 text-xs text-[#5C7562]">
                        {workshop.mode === "online" ? (
                          <Globe className="w-4 h-4 text-emerald-600 flex-none" />
                        ) : (
                          <MapPin className="w-4 h-4 text-emerald-600 flex-none" />
                        )}
                        <span className="font-medium text-[#1A3320] truncate" title={workshop.mode === "online" ? (workshop.platform || "Online") : (workshop.location || "In Person")}>
                          {workshop.mode === "online"
                            ? (workshop.platform || "Online")
                            : (workshop.location || "In Person")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3.5 border-t border-emerald-50/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#5C7562] uppercase tracking-widest">Session Type</span>
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-sans uppercase tracking-wider">
                      {booking.priceType === "free"
                        ? "Free"
                        : booking.priceType === "group"
                          ? "Group"
                          : "1:1 Personal"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
