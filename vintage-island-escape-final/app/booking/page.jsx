"use client";

import { useState } from "react";
import { supabase } from "../../supabase";


export default function BookingPage() {
 const [form, setForm] = useState({
  name: "",
  phone: "",
  ride_type: "",
  date: "",
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

    const { error } = await supabase
  .from("bookings")
  .insert([
    {
      ...form,
      tour_date: form.tour_date, // already YYYY-MM-DD
    },
  ]);


    if (error) {
      setMessage("❌ Booking failed");
      console.error(error);
    } else {
      setMessage("✅ Booking successful!");
      setForm({
       name: "",
  phone: "",
  ride_type: "",
  date: "",
      });
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Book a Tour</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

      <input
  name="ride_type"
  placeholder="Ride type"
  value={form.ride_type}
  onChange={handleChange}
  required
/>

<input
  type="date"
  name="date"
  value={form.date}
  onChange={handleChange}
  required
/>

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Submit Booking"}
        </button>
      </form>

      <p>{message}</p>
    </main>
  );
}
