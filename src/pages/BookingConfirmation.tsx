import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceInfo, timeSlot, formData, totalCost } = location.state;

  const handleReturnHome = () => {
    window.scrollTo(0, 0);
    navigate('/');
  };

  // Format date as MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
            <p className="mt-2 text-gray-600">Thank you for booking with Stanford Men's Soccer Training Program</p>
            <p className="mt-2 text-sm text-gray-500">A confirmation email has been sent to {formData.email}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-6">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Service:</span> {serviceInfo.title}</p>
              <p><span className="font-medium">Date:</span> {formatDate(timeSlot.date)}</p>
              <p><span className="font-medium">Time:</span> {timeSlot.time}</p>
              <p><span className="font-medium">Duration:</span> {serviceInfo.duration}</p>
              <p><span className="font-medium">Total Cost:</span> <span className="text-cardinal-red font-bold">${totalCost}</span></p>
              <p>
                <span className="font-medium">Payment Method:</span>{' '}
                {formData.paymentMethod === 'venmo' ? (
                  <>Venmo (@{formData.venmoUsername})</>
                ) : (
                  'Cash at session'
                )}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <p><span className="font-medium">Guardian Name:</span> {formData.guardianName}</p>
            <p><span className="font-medium">Name:</span> {formData.name}</p>
            <p><span className="font-medium">Age:</span> {formData.age}</p>
            <p><span className="font-medium">Email:</span> {formData.email}</p>
            <p><span className="font-medium">Phone:</span> {formData.phone}</p>
            {formData.numberOfPlayers && (
              <p><span className="font-medium">Number of Players:</span> {formData.numberOfPlayers}</p>
            )}
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Preferred Coaches:</h3>
              <div className="pl-4">
                <p>1st Choice: {formData.preferredCoaches.first || 'Not specified'}</p>
                <p>2nd Choice: {formData.preferredCoaches.second || 'Not specified'}</p>
                <p>3rd Choice: {formData.preferredCoaches.third || 'Not specified'}</p>
              </div>
            </div>

            {formData.notes && (
              <div className="mt-4">
                <p><span className="font-medium">Additional Notes:</span></p>
                <p className="mt-1 text-gray-600">{formData.notes}</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Please check your email for detailed information about your booking.
            </p>
            <button
              onClick={handleReturnHome}
              className="inline-block bg-cardinal-red text-white py-3 px-6 rounded-md hover:bg-cardinal-dark transition duration-300"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default BookingConfirmation;