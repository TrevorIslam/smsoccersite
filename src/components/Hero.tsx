import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Hero = () => {
  return (
    <div className="relative pt-16">
      <div className="absolute inset-0">
        <img
          className="w-full h-[600px] object-cover"
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80"
          alt="Stanford Soccer Field"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Stanford Men's Soccer Training Program
        </h1>
        <p className="mt-6 text-xl text-white max-w-3xl">
          Elite training from Stanford student-athletes. Join our clinics, private sessions, and mentorship programs to elevate your game to the next level.
        </p>
        <div className="mt-10">
          <ScrollLink
            to="services"
            smooth={true}
            duration={500}
            className="inline-block bg-cardinal-red text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-cardinal-dark transition duration-300 cursor-pointer"
          >
            Book Your Session
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;