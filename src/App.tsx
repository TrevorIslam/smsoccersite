import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StaffPage from './pages/StaffPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import BookingConfirmation from './pages/BookingConfirmation';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/book/:service" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          </Routes>
        </main>
        <footer className="bg-cardinal-red py-6 text-white text-center mt-auto">
          <p>© {new Date().getFullYear()} Stanford Men's Soccer Training Program. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;