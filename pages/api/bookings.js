// pages/api/bookings.js

let bookings = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, location, service, date, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !location || !service || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBooking = {
      id: Date.now(),           // Unique ID using timestamp
      name,
      email,
      phone,
      location,
      service,
      date,
      message: message || '',
      createdAt: new Date()
    };

    bookings.push(newBooking);

    return res.status(201).json({ success: true, booking: newBooking });
  }

  if (req.method === 'GET') {
    // Return bookings sorted by createdAt ascending
    const sorted = bookings.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    return res.status(200).json(sorted);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing booking id' });
    }

    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    bookings.splice(index, 1);

    return res.status(200).json({ success: true, message: 'Booking deleted' });
  }

  // Method not allowed for other HTTP verbs
  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
