export default function About() {
  return (
    <section className="bg-white py-16 px-4" id="about">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Meet the Artist</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          With a passion for capturing life’s most cherished moments on canvas, our artist specializes in live wedding and event paintings. Each brushstroke reflects a story, and each artwork is crafted with care and emotion.
        </p>
        
        {/* Experience Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">5+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">100+</h3>
            <p className="text-gray-600">Events Painted</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">30+</h3>
            <p className="text-gray-600">Custom Portraits</p>
          </div>
        </div>

        {/* Events Painted */}
        <h3 className="text-2xl font-semibold mb-4">Notable Events Painted</h3>
        <div className="grid sm:grid-cols-2 gap-6 text-left">
          <div className="bg-amber-100 p-4 rounded shadow">
            <h4 className="font-bold text-gray-900 mb-2">Rohan & Priya's Wedding</h4>
            <p className="text-gray-700 text-sm">
              A magical evening at Taj Falaknuma Palace, capturing their first dance under the stars.
            </p>
          </div>
          <div className="bg-amber-100 p-4 rounded shadow">
            <h4 className="font-bold text-gray-900 mb-2">Sunita’s 50th Birthday</h4>
            <p className="text-gray-700 text-sm">
              A vibrant garden party celebration with laughter, joy, and color.
            </p>
          </div>
          <div className="bg-amber-100 p-4 rounded shadow">
            <h4 className="font-bold text-gray-900 mb-2">Corporate Annual Gala 2024</h4>
            <p className="text-gray-700 text-sm">
              A live illustration of key moments from the company's yearly celebration.
            </p>
          </div>
          <div className="bg-amber-100 p-4 rounded shadow">
            <h4 className="font-bold text-gray-900 mb-2">Asha & Nikhil’s Engagement</h4>
            <p className="text-gray-700 text-sm">
              Capturing the love and excitement as they exchanged rings at a beachside venue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
