// components/Services.js
import Image from 'next/image';


export default function Services({ services }) {
  return (
    <section id="services" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the art services i offer, tailored to capture your special moments.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer flex flex-col"
          >
            {service.image && (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                  priority
                />
              </div>
            )}

            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 flex-grow">{service.description}</p>
            <p className="mt-4 font-bold text-lg">{service.price}</p>

            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition duration-300"
              onClick={() => alert(`Booking for ${service.title} coming soon!`)}
              aria-label={`Book ${service.title}`}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
