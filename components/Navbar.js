import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">  
          <div className="text-2xl font-bold text-purple-800">🎨Demo Art's</div>

      <div className="hidden md:flex space-x-6">
        <a href="#home" className="text-gray-600 hover:text-black">Home</a>
        <a href="#about2" className="text-gray-600 hover:text-black">About</a>
        <a href="#services" className="text-gray-600 hover:text-black">Services</a>
        <a href="#portfolio" className="text-gray-600 hover:text-black">Portfolio</a>
        <Link href="/admin/dashboard" className="text-gray-600 hover:text-black">Admin</Link>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-gray-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-md py-4 px-6 flex flex-col space-y-4 md:hidden">
          <Link href="/" className="text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>Home</Link>
          <a href="#about2" className="text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>About</a>
          <a href="#services" className="text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#contact" className="text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>Contact</a>
          <Link href="/admin/dashboard" className="text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}
        </div>
      </div>
    </nav>
  );
}
