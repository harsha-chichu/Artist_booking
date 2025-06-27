// app/page.js
'use client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { initialServices } from '@/services/data';
import Services from '@/components/Services';
import About2 from '@/components/About2';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import BookingForm from '@/components/BookingForm';
import Portfolio from '@/components/Portfolio';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black scroll-smooth">
      <Navbar />
      <Hero />
      <Services services={initialServices} />
      {/* <About /> */}
      <About2 />
      <Portfolio />
      <Testimonials />
      {/* <ContactCTA /> */}
      <BookingForm />
      <Footer />
    </div>
  );
}
