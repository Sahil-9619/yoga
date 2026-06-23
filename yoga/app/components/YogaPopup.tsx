"use client";

import { useEffect, useState } from "react";

export default function YogaPopup() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    goal: "",
  });

  useEffect(() => {
    setOpen(true);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.city ||
      !form.goal
    ) {
      alert("Please fill all fields.");
      return;
    }

    const message = `🧘 Yoga Enquiry
👤 Name: ${form.name}
📞 Phone: ${form.phone}
🏙️ City: ${form.city}
🎯 Goal: ${form.goal}`;
    const whatsappUrl = `https://wa.me/919119743145?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white text-black p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="flex items-center justify-center gap-3 text-3xl font-bold">
            <img
                src="/logo-v2.png"
                alt="Logo"
                className="h-18 w-18 object-contain"
            />

            <span>Join Yoga Program</span>
        </h2>

        <p className="mb-6 text-center text-gray-900">
          Fill the form and connect with us.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
          />
          
          <input
            type="tel"
            name="phone"
            placeholder="Whatsapp Number"
            onChange={handleChange}
            className="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
          />

          <select
            name="goal"
            onChange={handleChange}
            className="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
          >
            <option value="">Select Goal</option>

            <option value="Weight Loss">
              Weight Loss
            </option>

            <option value="Weight Gain">
              Weight Gain
            </option>

            <option value="Meditation">
              Meditation
            </option>

            <option value="Stress Relief">
              Stress Relief
            </option>

            <option value="General Fitness">
              General Fitness
            </option>
          </select>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setOpen(false)}
              className="w-1/2 rounded-xl bg-gray-500 py-3 font-semibold text-white hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="w-1/2 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}