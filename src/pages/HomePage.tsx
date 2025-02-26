import React from 'react';
import Hero from '../components/Hero';
import StaffPreview from '../components/StaffPreview';
import ServicesPreview from '../components/ServicesPreview';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <StaffPreview />
      <ServicesPreview />
      <Contact />
    </main>
  );
};

export default HomePage