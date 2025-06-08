// pages/api/services.js
let services = [
  "Live Wedding Painting",
  "Portrait Sketch",
  "Event Mural",
];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return all services
    return res.status(200).json(services);
  }

  if (req.method === "POST") {
    const { service } = req.body;
    if (!service || typeof service !== "string" || service.trim() === "") {
      return res.status(400).json({ error: "Invalid service name" });
    }

    if (services.includes(service.trim())) {
      return res.status(400).json({ error: "Service already exists" });
    }

    services.push(service.trim());
    return res.status(201).json({ success: true, services });
  }

  if (req.method === "DELETE") {
    const { service } = req.body;
    if (!service || typeof service !== "string") {
      return res.status(400).json({ error: "Service name required for deletion" });
    }

    const index = services.findIndex((s) => s === service);
    if (index === -1) {
      return res.status(404).json({ error: "Service not found" });
    }

    services.splice(index, 1);
    return res.status(200).json({ success: true, services });
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
