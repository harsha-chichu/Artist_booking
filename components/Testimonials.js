import { useEffect, useRef } from "react";

const testimonials = [
  { id: 1, name: "Jane Doe", text: "Amazing artwork! Highly recommend." },
  { id: 2, name: "John Smith", text: "The live painting was the highlight!" },
  { id: 3, name: "Emma Johnson", text: "Quick sketches were a big hit." },
  { id: 4, name: "Michael Brown", text: "Portraits captured the essence." },
  { id: 5, name: "Sophia Lee", text: "Professional and timely service." },
];

export default function Testimonials() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    let reqId;

    const step = () => {
      scrollPos += 0.5;
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
      }
      scrollContainer.scrollLeft = scrollPos;
      reqId = requestAnimationFrame(step);
    };

    reqId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(reqId);
  }, []);

  // Duplicate testimonials for seamless infinite scroll
  const displayTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-hidden whitespace-nowrap scrollbar-hide"
      >
        {displayTestimonials.map(({ id, name, text }, i) => (
          <div
            key={`${id}-${i}`}
            className="inline-block w-80 flex-shrink-0 bg-white p-6"
          >
            <p className="text-gray-700 italic mb-4">"{text}"</p>
            <p className="text-right font-semibold text-gray-900">- {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
