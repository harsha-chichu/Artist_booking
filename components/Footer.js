const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Aria's Live Art
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Creating beautiful, one-of-a-kind live paintings that capture the magic of your special moments.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Wedding Live Painting</li>
              <li>Corporate Events</li>
              <li>Private Parties</li>
              <li>Custom Commissions</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-gray-300">
              <p>aria@liveart.com</p>
              <p>(555) 123-4567</p>
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Aria's Live Art. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
