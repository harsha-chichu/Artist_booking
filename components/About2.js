import CountUp from './bits/CountUp'


const About = () => {
  return (
    <section id="about2" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
                alt="Artist painting"
                className="w-full h-full object-cover"
              />
             
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-pink-300 rounded-full opacity-70 blur-lg"></div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet the Artist
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              lorum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              lorum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                {/* <div className="text-2xl font-bold text-purple-600 mb-2">100+</div> */}
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  <CountUp
                    from={0}
                    to={100}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />{'+'}
                </div>
                <div className="text-gray-600">Events Painted</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600 mb-2">
                  <CountUp
                    from={0}
                    to={5}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />{'+'}
                </div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;