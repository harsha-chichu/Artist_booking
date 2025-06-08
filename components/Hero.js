

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-amber-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Every Event Has a Story -
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {" "}Let’s Paint Yours. 
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
               Live Event Paintings · Portraits · Murals · Workshops
              Art that celebrates your story and inspires connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToContact}
                aria-label="Book your event"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Your Event
              </button>
              <button
                onClick={scrollToPortfolio}
                aria-label="View portfolio"
                className="border border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-semibold transition duration-300"
              >
                View Portfolio
              </button>
            </div>
          </div>



          {/* Image Section */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Artist live painting during a wedding"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 bg-amber-300 rounded-full opacity-80 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-28 h-28 sm:w-32 sm:h-32 bg-purple-300 rounded-full opacity-60 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
