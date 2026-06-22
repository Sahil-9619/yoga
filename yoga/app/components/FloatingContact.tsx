import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* WhatsApp */}
      <a
        href="https://wa.me/919119743145"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <FaWhatsapp className="text-3xl" />
      </a>

      {/* Call */}
      <a
        href="tel:+919119743145"
        aria-label="Call"
        className="group flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <FaPhoneAlt className="text-2xl" />
      </a>

    </div>
  );
}