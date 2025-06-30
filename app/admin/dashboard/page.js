"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import Modal from "react-modal";
import ModernCalendar from "@/components/ModernCalendar";
import "react-day-picker/dist/style.css";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentlyUpdated, setRecentlyUpdated] = useState(new Set());
  const [showCalendar, setShowCalendar] = useState(false);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.push("/login");
      } else {
        setUser(data.session.user);
        fetchBookings(1, true);
      }
    };
    getUser();
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  const fetchBookings = async (pageToFetch = 1, reset = false) => {
    setLoading(true);
    const from = (pageToFetch - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Fetch error:", error);
    } else {
      if (reset) {
        setBookings(data);
      } else {
        setBookings((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === pageSize);
    }

    setLoading(false);
  };

  const toggleRead = async (id, isRead) => {
    const { error } = await supabase
      .from("bookings")
      .update({ is_read: !isRead })
      .eq("id", id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, is_read: !isRead } : b))
      );
      toast.success(`Marked as ${!isRead ? "Read" : "Unread"}`);
      flashHighlight(id);
    }
  };

  const toggleBooked = async (id, isBooked) => {
    const { error } = await supabase
      .from("bookings")
      .update({ is_booked: !isBooked })
      .eq("id", id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, is_booked: !isBooked } : b))
      );
      toast.success(`Marked as ${!isBooked ? "Booked" : "Unbooked"}`);
      flashHighlight(id);
    }
  };

  const flashHighlight = (id) => {
    setRecentlyUpdated((prev) => new Set(prev.add(id)));
    setTimeout(() => {
      setRecentlyUpdated((prev) => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    }, 2000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType
      ? booking.service?.toLowerCase() === filterType.toLowerCase()
      : true;

    const bookingDate = new Date(booking.date);
    const matchesStart = startDate ? bookingDate >= new Date(startDate) : true;
    const matchesEnd = endDate ? bookingDate <= new Date(endDate) : true;

    const matchesStatus =
      statusFilter === "unread"
        ? !booking.is_read
        : statusFilter === "read"
        ? booking.is_read
        : statusFilter === "booked"
        ? booking.is_booked
        : true;

    return (
      matchesSearch &&
      matchesType &&
      matchesStart &&
      matchesEnd &&
      matchesStatus
    );
  });

  const bookedDates = bookings
    .filter((b) => b.is_booked)
    .map((b) => new Date(b.date));

  const formatWhatsAppLink = (phone, name) => {
    const cleaned = phone.replace(/\D/g, "");
    if (!cleaned || cleaned.length < 10) return null;
    const message = encodeURIComponent(
      `Hello ${name}, following up on your booking inquiry.`
    );
    return `https://wa.me/${cleaned}?text=${message}`;
  };

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            📋 Booking Submissions
          </h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm"
            >
              Home
            </button>
            <button
              onClick={() => setShowCalendar(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
            >
              📅 Calendar
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        <Modal
          isOpen={showCalendar}
          onRequestClose={() => setShowCalendar(false)}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">📍 Booked Dates</h2>
          <ModernCalendar bookedDates={bookedDates} />
          <p className="mt-2 text-sm text-center text-gray-500">Green = Booked</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowCalendar(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            >
              Close
            </button>
          </div>
        </Modal>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name/email"
            className="border rounded px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Event Types</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate</option>
            <option value="private">Private</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Statuses</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="booked">Booked</option>
          </select>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredBookings.length} results | Total: {bookings.length} | Unread:{" "}
          {bookings.filter((b) => !b.is_read).length}
        </p>

        {loading && bookings.length === 0 ? (
          <p className="text-center">Loading...</p>
        ) : filteredBookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => {
                const isHighlighted = recentlyUpdated.has(booking.id);
                const waLink = formatWhatsAppLink(booking.phone, booking.name);

                return (
                  <div
                    key={booking.id}
                    className={`p-5 sm:p-6 rounded-lg shadow transition duration-300 border ${
                      isHighlighted
                        ? "border-green-400 bg-green-50"
                        : booking.is_read
                        ? "bg-gray-50"
                        : "bg-yellow-50 border-l-4 border-yellow-400"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1 gap-1">
                      <h2 className="text-xl font-semibold text-purple-700">
                        {booking.name}
                      </h2>
                      <div className="flex flex-wrap gap-1">
                        {!booking.is_read && (
                          <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                            Unread
                          </span>
                        )}
                        {booking.is_read && (
                          <span className="bg-gray-300 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                            Read
                          </span>
                        )}
                        {booking.is_booked && (
                          <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                            Booked
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      📧 {booking.email} | 📱 {booking.phone}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      📅 Date: <strong>{booking.date}</strong>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      🎉 {booking.service || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      📍 {booking.location || "Not specified"}
                    </p>
                    {booking.message && (
                      <p className="text-sm italic text-gray-600 mb-1">
                        💬 “{booking.message}”
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      Submitted: {new Date(booking.created_at).toLocaleString()}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <label className="inline-flex items-center text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={booking.is_read}
                          onChange={() => toggleRead(booking.id, booking.is_read)}
                          className="mr-2"
                        />
                        Mark as Read
                      </label>
                      <label className="inline-flex items-center text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={booking.is_booked}
                          onChange={() => toggleBooked(booking.id, booking.is_booked)}
                          className="mr-2"
                        />
                        Mark as Booked
                      </label>
                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchBookings(nextPage);
                  }}
                  className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
