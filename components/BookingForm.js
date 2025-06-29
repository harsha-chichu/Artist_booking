"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

// ✅ Send Email using EmailJS
const sendBookingEmail = (bookingData) => {
  const templateParams = {
    from_name: bookingData.name,
    from_email: bookingData.email,
    phone: bookingData.phone,
    event_date: bookingData.eventDate,
    event_type: bookingData.eventType,
    event_location: bookingData.location,
    message: bookingData.message || "No additional message",
  };

  emailjs
    .send(
      "service_o5647rn",         // Your EmailJS Service ID
      "template_kb0laxd",        // Your EmailJS Template ID
      templateParams,
      "HWkodYIPJO4oxIP4U"        // Your EmailJS Public Key
    )
    .then(
      (response) => {
        console.log("✅ Email sent!", response.status, response.text);
      },
      (err) => {
        console.error("❌ Email sending failed:", err);
      }
    );
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    location: "",
    message: ""
  });

  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      console.log("Fetching booked dates from Supabase...");
      const { data, error } = await supabase
        .from("bookings")
        .select("date")
        .eq("is_booked", true);

      if (error) {
        console.error("Error fetching booked dates:", error);
      } else {
        const booked = data.map((d) => d.date);
        setBookedDates(booked);
        console.log("Fetched booked dates:", booked);
      }
    };

    fetchBookedDates();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.eventDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (bookedDates.includes(formData.eventDate)) {
      toast.error("That date is already booked. Please choose another.");
      return;
    }

    try {
      console.log("Submitting form with data:", formData);
      const { data, error } = await supabase
        .from("bookings")
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          service: formData.eventType,
          date: formData.eventDate,
          message: formData.message,
          is_read: false,
          is_booked: false
        }]);

      if (error) {
        console.error("Supabase insert error:", error);
        toast.error("Something went wrong. Please try again.");
      } else {
        toast.success("Inquiry sent! I'll get back to you within 24 hours.");
        console.log("Booking saved successfully:", data);

        // Send Email
        sendBookingEmail({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventDate: formData.eventDate,
          eventType: formData.eventType,
          location: formData.location,
          message: formData.message
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          eventDate: "",
          eventType: "",
          location: "",
          message: ""
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Server error.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
          Let's Create Something Beautiful Together
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Fill out the form below and let's bring your vision to life!
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Phone & Event Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="e.g., 9876543210"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border ${
                  bookedDates.includes(formData.eventDate)
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {bookedDates.includes(formData.eventDate) && (
                <p className="text-red-600 text-sm mt-1">
                  This date is already booked.
                </p>
              )}
            </div>
          </div>

          {/* Event Type & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select an option</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="private">Private Party</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tell me about your vision
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your event or any special requests..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition duration-300"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
