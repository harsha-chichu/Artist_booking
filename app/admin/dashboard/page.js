"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.push("/login");
      } else {
        setUser(data.session.user);
        fetchBookings();
      }
    };
    getUser();
  }, [router]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setBookings(data);
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
    }
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

    return matchesSearch && matchesType && matchesStart && matchesEnd;
  });

  const totalPages = Math.ceil(filteredBookings.length / pageSize);
  const paginatedData = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            📋 Booking Submissions
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name or email..."
            className="border rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500"
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
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Booking Cards */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : paginatedData.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {paginatedData.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-6 rounded-lg shadow transition duration-300 ${
                    booking.is_read
                      ? "bg-gray-50"
                      : "bg-yellow-50 border-l-4 border-yellow-400"
                  }`}
                >
                  <h2 className="text-xl font-semibold text-purple-700 mb-1">
                    {booking.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    📧 {booking.email} | 📱 {booking.phone}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    📅 Date: <strong>{booking.date}</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    🎉 {booking.service || "N/A"}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    📍 {booking.location || "Not specified"}
                  </p>
                  {booking.message && (
                    <p className="text-sm italic text-gray-600 mb-2">
                      💬 “{booking.message}”
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    Submitted: {new Date(booking.created_at).toLocaleString()}
                  </p>

                  <div className="flex items-center space-x-4 mt-4">
                    <label className="inline-flex items-center text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={booking.is_read}
                        onChange={() =>
                          toggleRead(booking.id, booking.is_read)
                        }
                        className="mr-2"
                      />
                      Mark as Read
                    </label>
                    <label className="inline-flex items-center text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={booking.is_booked}
                        onChange={() =>
                          toggleBooked(booking.id, booking.is_booked)
                        }
                        className="mr-2"
                      />
                      Mark as Booked
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages).keys()].map((n) => (
                <button
                  key={n + 1}
                  onClick={() => changePage(n + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === n + 1
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {n + 1}
                </button>
              ))}
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
