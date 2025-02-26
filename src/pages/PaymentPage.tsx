import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { staffMembers } from '../data/staffMembers';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // Redirect if no state is present
  useEffect(() => {
    if (!state || !state.serviceInfo) {
      toast.error('Invalid navigation. Please start your booking from the services page.');
      navigate('/services', { replace: true });
    }
  }, [state, navigate]);

  if (!state || !state.serviceInfo) {
    return null;
  }

  // Destructure passed state
  const { service, serviceInfo, timeSlot, formData, selectedDate, selectedTimeSlot } = state;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [venmoUsername, setVenmoUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to get a coach's email by name
  const getCoachEmail = (coachName) => {
    const coach = staffMembers.find(c => c.name === coachName);
    return coach ? coach.email : '';
  };

  const calculateTotalCost = () => {
    const basePrice = parseInt(serviceInfo.price.replace(/[^0-9]/g, ''));
    const numberOfPlayers = parseInt(formData.numberOfPlayers) || 1;
    
    // Always multiply by number of players for these services
    if (
      service === 'large-group-clinic' ||
      service === 'small-group-clinic' ||
      service === 'skill-session' ||
      service === 'recruiting-mentorship'
    ) {
      return basePrice * numberOfPlayers;
    }
    return basePrice;
  };

  const handleBack = () => {
    navigate(`/book/${service}`, {
      state: {
        formData,
        selectedDate,
        selectedTimeSlot,
        step: 3,
        scrollToCoaches: true
      },
      replace: true
    });
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    if (method !== 'venmo') {
      setVenmoUsername('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (selectedPaymentMethod === 'venmo' && !venmoUsername) {
      toast.error("Please enter your Venmo username");
      return;
    }
    setIsSubmitting(true);

    const updatedFormData = {
      ...formData,
      paymentMethod: selectedPaymentMethod,
      venmoUsername: venmoUsername
    };

    // Look up each coach's email
    const firstCoachEmail = getCoachEmail(updatedFormData.preferredCoaches.first);
    const secondCoachEmail = getCoachEmail(updatedFormData.preferredCoaches.second);
    const thirdCoachEmail = getCoachEmail(updatedFormData.preferredCoaches.third);
    // Combine emails into one comma-separated string
    const allCoachEmails = [firstCoachEmail, secondCoachEmail, thirdCoachEmail]
      .filter(email => email) // remove empty strings
      .join(',');

    // Customer email payload (template_m9q2wck)
    const customerPayload = {
      to_name: updatedFormData.guardianName, // Parent/Guardian Name
      to_email: updatedFormData.email,
      player_name: updatedFormData.name,
      service_title: serviceInfo.title,
      booking_date: new Date(timeSlot.date).toLocaleDateString(),
      booking_time: timeSlot.time,
      total_cost: `$${calculateTotalCost()}`,
      number_of_players: updatedFormData.numberOfPlayers || "1",
      // IMPORTANT: Use a key that matches your template's placeholder (e.g., {{preferred_coach}})
      preferred_coach: `1st: ${updatedFormData.preferredCoaches.first}\n2nd: ${updatedFormData.preferredCoaches.second}\n3rd: ${updatedFormData.preferredCoaches.third}`,
      payment_method: updatedFormData.paymentMethod,
      venmo_username: updatedFormData.venmoUsername || "N/A",
      additional_notes: updatedFormData.notes || "None"
    };

    // Internal email payload (template_dhpsfba)
    const internalPayload = {
      to_email: 'smsoccerclinics@gmail.com',
      cc_email: allCoachEmails, // combined coach emails
      preferred_coach: `${updatedFormData.preferredCoaches.first}, ${updatedFormData.preferredCoaches.second}, and ${updatedFormData.preferredCoaches.third}`,
      service_title: serviceInfo.title,
      booking_date: new Date(timeSlot.date).toLocaleDateString(),
      booking_time: timeSlot.time,
      total_cost: `$${calculateTotalCost()}`,
      client_name: updatedFormData.name,
      client_phone: updatedFormData.phone,
      guardian_name: updatedFormData.guardianName,
      client_age: updatedFormData.age,
      number_of_players: updatedFormData.numberOfPlayers || "1",
      payment_method: updatedFormData.paymentMethod,
      venmo_username: updatedFormData.venmoUsername || "N/A",
      additional_notes: updatedFormData.notes || "None"
    };

    try {
      // Send customer confirmation email
      await emailjs.send(
        'service_0u2iruh',
        'template_m9q2wck', // Customer confirmation template
        customerPayload,
        'RMPNJbYp34PHgcehV'
      );

      // Only send internal notification if client email is not internal email
      if (updatedFormData.email.trim().toLowerCase() !== 'smsoccerclinics@gmail.com') {
        await emailjs.send(
          'service_0u2iruh',
          'template_dhpsfba', // Internal notification template
          internalPayload,
          'RMPNJbYp34PHgcehV'
        );
      }

      navigate('/booking-confirmation', {
        state: {
          serviceInfo,
          timeSlot,
          formData: updatedFormData,
          totalCost: calculateTotalCost()
        }
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("There was an error processing your request. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Payment Details</h1>
            <p className="mt-2 text-gray-600">Complete your booking for {serviceInfo.title}</p>
          </div>

          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service</span>
                <span className="font-medium">{serviceInfo.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{new Date(timeSlot.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{timeSlot.time}</span>
              </div>
              {formData.numberOfPlayers && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Number of Players</span>
                  <span className="font-medium">{formData.numberOfPlayers}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold">Total Cost</span>
                <span className="text-xl font-bold text-cardinal-red">${calculateTotalCost()}</span>
              </div>
            </div>
          </div>

          {/* Payment Method and Form */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">Select Payment Method</h2>
            <p className="text-sm text-gray-500 text-center">
              Choose how you'd like to pay. Payment will be collected at the session.
            </p>

            <div className="grid gap-4">
              <button
                onClick={() => handlePaymentMethodSelect('cash')}
                className={`w-full p-4 border-2 rounded-lg transition-colors text-center ${
                  selectedPaymentMethod === 'cash'
                    ? 'border-cardinal-red bg-cardinal-red/5'
                    : 'border-gray-200 hover:border-cardinal-red'
                }`}
              >
                <p className="text-lg font-medium text-gray-900">Cash</p>
                <p className="text-sm text-gray-500">Pay with cash at the session</p>
              </button>

              <div>
                <button
                  onClick={() => handlePaymentMethodSelect('venmo')}
                  className={`w-full p-4 border-2 rounded-lg transition-colors text-center ${
                    selectedPaymentMethod === 'venmo'
                      ? 'border-cardinal-red bg-cardinal-red/5 border-b-0 rounded-b-none'
                      : 'border-gray-200 hover:border-cardinal-red'
                  }`}
                >
                  <p className="text-lg font-medium text-gray-900">Venmo</p>
                  <p className="text-sm text-gray-500">Venmo details will be provided in your confirmation email</p>
                </button>
                
                {selectedPaymentMethod === 'venmo' && (
                  <div className={`p-4 border-2 border-t-0 border-cardinal-red bg-cardinal-red/5 rounded-b-lg`}>
                    <label htmlFor="venmoUsername" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Venmo Username
                    </label>
                    <input
                      type="text"
                      id="venmoUsername"
                      value={venmoUsername}
                      onChange={(e) => setVenmoUsername(e.target.value)}
                      placeholder="@your-venmo-username"
                      className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  !selectedPaymentMethod ||
                  (selectedPaymentMethod === 'venmo' && !venmoUsername) ||
                  isSubmitting
                }
                className={`flex-1 bg-cardinal-red text-white py-3 px-4 rounded-lg hover:bg-cardinal-dark transition-colors ${
                  (!selectedPaymentMethod || (selectedPaymentMethod === 'venmo' && !venmoUsername) || isSubmitting)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default PaymentPage;