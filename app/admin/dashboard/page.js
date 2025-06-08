'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { initialServices } from '../../../services/data';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('auth');
    if (!isAuth) {
      router.push('/login');
    }
  }, []);

  const [services, setServices] = useState(initialServices);
  const [newService, setNewService] = useState({ name: '', description: '' });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  const handleAdd = () => {
    if (newService.name.trim()) {
      setServices([
        ...services,
        {
          id: Date.now(),
          ...newService
        }
      ]);
      setNewService({ name: '', description: '' });
    }
  };

  const handleDelete = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleDeleteBooking = async (id) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    const res = await fetch('/api/bookings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setBookings(bookings.filter(b => b.id !== id));
    } else {
      alert('Failed to delete booking');
    }
  };

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

        {/* Service Management */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Service Name"
            value={newService.name}
            onChange={e => setNewService({ ...newService, name: e.target.value })}
            className="border rounded px-3 py-2 mr-2 w-full mb-2"
          />
          <textarea
            placeholder="Service Description"
            value={newService.description}
            onChange={e => setNewService({ ...newService, description: e.target.value })}
            className="border rounded px-3 py-2 w-full"
          ></textarea>
          <button
            onClick={handleAdd}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Service
          </button>
        </div>

        <ul className="space-y-4">
          {services.map(service => (
            <li key={service.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
              <button
                onClick={() => handleDelete(service.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Bookings Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map(booking => (
                <li key={booking.id} className="p-4 border rounded flex justify-between items-start">
                  <div className="space-y-1">
                    <p><strong>Name:</strong> {booking.name}</p>
                    <p><strong>Email:</strong> {booking.email}</p>
                    <p><strong>Phone:</strong> {booking.phone || '—'}</p>
                    <p><strong>Event Date:</strong> {booking.date ? new Date(booking.date).toLocaleDateString() : '—'}</p>
                    <p><strong>Event Type:</strong> {booking.service || '—'}</p>
                    <p><strong>Location:</strong> {booking.location || '—'}</p>
                    <p><strong>Message:</strong> {booking.message || '—'}</p>
                    <p><strong>Submitted:</strong> {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : '—'}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="text-red-600 hover:underline ml-4"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
