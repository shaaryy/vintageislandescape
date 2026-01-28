"use client";

import { useState } from "react";
import { supabase } from "@/supabase";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    tour_type: "",
    tour_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("bookings").insert([form]);

    if (error) {
      console.error(error);
      setMessage("❌ Error submitting booking.");
    } else {
      setMessage("✅ Booking received! We’ll contact you soon.");
      setForm({
        name: "",
        phone: "",
        tour_type: "",
        tour_date: "",
      });
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 40, maxWidth: 500 }}>
      <h1>Book Your Island Tour 🌴</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          name="phone"
          placeholder="Phone / WhatsApp"
          value={form.phone}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <select
          name="tour_type"
          value={form.tour_type}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        >
          <option value="">Select Tour</option>
          <option value="Sandbank Trip">Sandbank Trip</option>
          <option value="Snorkeling">Snorkeling</option>
          <option value="Island Hopping">Island Hopping</option>
          <option value="Sunset / Dolphin Tour">Sunset / Dolphin Tour</option>
        </select>

        <input
          type="date"
          name="tour_date"
          value={form.tour_date}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: "#0ea5e9",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>

      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </main>
  );
}
