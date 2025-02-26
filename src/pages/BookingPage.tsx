import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, ChevronLeft, ChevronRight, Clock, Users, CalendarDays } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { staffMembers } from '../data/staffMembers';
import StrengthFitnessForm from '../components/StrengthFitnessForm';

const availableTimeSlots = {
  "2025-03-15": [
    { id: 1, time: "9:00 AM - 10:30 AM", service: "large-group-clinic", available: true },
    { id: 2, time: "2:00 PM - 3:30 PM", service: "large-group-clinic", available: true },
    { id: 14, time: "11:00 AM - 12:00 PM", service: "recruiting-mentorship", available: true },
  ],
  "2025-03-16": [
    { id: 4, time: "10:00 AM - 11:30 AM", service: "small-group-clinic", available: true },
    { id: 5, time: "3:00 PM - 4:30 PM", service: "small-group-clinic", available: true },
    { id: 15, time: "1:00 PM - 2:00 PM", service: "recruiting-mentorship", available: true },
  ],
  "2025-03-17": [
    { id: 7, time: "4:00 PM - 5:00 PM", service: "skill-session", available: true },
    { id: 16, time: "2:00 PM - 3:00 PM", service: "recruiting-mentorship", available: true },
  ],
  "2025-03-18": [
    { id: 8, time: "5:00 PM - 6:00 PM", service: "skill-session", available: true },
  ],
  "2025-03-19": [
    { id: 9, time: "4:00 PM - 5:00 PM", service: "skill-session", available: true },
  ],
  "2025-03-20": [
    { id: 10, time: "3:00 PM - 4:00 PM", service: "private-training", available: true },
  ],
  "2025-03-21": [
    { id: 11, time: "4:00 PM - 5:00 PM", service: "private-training", available: true },
  ],
  "2025-03-22": [
    { id: 3, time: "9:00 AM - 10:30 AM", service: "large-group-clinic", available: true },
    { id: 12, time: "3:00 PM - 4:00 PM", service: "private-training", available: true },
  ],
  "2025-03-23": [
    { id: 6, time: "10:00 AM - 11:30 AM", service: "small-group-clinic", available: true },
  ],
};

const serviceDetails = {
  "large-group-clinic": {
    title: "Large Group Clinic",
    price: "$50 per player",
    duration: "1.5 hours",
    capacity: "25+ players",
    minPlayers: 25,
    maxPlayers: 100,
  },
  "small-group-clinic": {
    title: "Small Group Clinic",
    price: "$75 per player",
    duration: "1.5 hours",
    capacity: "<25 players",
    minPlayers: 1,
    maxPlayers: 24,
  },
  "skill-session": {
    title: "Skill Session",
    price: "$60 per player",
    duration: "1 hour",
    capacity: "Small groups",
    minPlayers: 1,
    maxPlayers: 100,
  },
  "private-training": {
    title: "Private Training",
    price: "$85",
    duration: "1 hour",
    capacity: "1 player",
    minPlayers: 1,
    maxPlayers: 1,
  },
  "strength-conditioning": {
    title: "D1 Strength & Conditioning",
    price: "$100",
    duration: "Monthly packet",
    capacity: "Individual",
    minPlayers: 1,
    maxPlayers: 1,
  },
  "recruiting-mentorship": {
    title: "College Recruiting Mentorship",
    price: "$80",
    duration: "1 hour",
    capacity: "1-100 players",
    minPlayers: 1,
    maxPlayers: 100,
  },
};

const BookingPage = () => {
  const { service } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Early validation and redirect
  if (!service || !serviceDetails[service]) {
    useEffect(() => {
      toast.error('Invalid service selected. Please choose a valid service.');
      navigate('/services', { replace: true });
    }, []);
    return null;
  }

  if (service === 'strength-conditioning') {
    return <StrengthFitnessForm />;
  }

  const serviceInfo = serviceDetails[service];

  // If coming back from payment page, use the saved form data and step
  const savedFormData = location.state?.formData;
  const savedStep = location.state?.step;
  const savedDate = location.state?.selectedDate;
  const savedTimeSlot = location.state?.selectedTimeSlot;

  const [step, setStep] = useState(savedStep || 1);
  const [selectedDate, setSelectedDate] = useState(savedDate || null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(savedTimeSlot || null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(savedFormData || {
    guardianName: '',
    name: '',
    age: '',
    email: '',
    phone: '',
    numberOfPlayers: serviceInfo.minPlayers.toString(), // Set default to minimum players
    preferredCoaches: {
      first: '',
      second: '',
      third: ''
    },
    coachContactConsent: false,
    notes: ''
  });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getAvailableSlotsForDate = (date) => {
    return availableTimeSlots[date] || [];
  };

  const handleDateSelect = (day) => {
    const selectedDate = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selectedDate);
    const slots = getAvailableSlotsForDate(selectedDate);
    const filteredSlots = service 
      ? slots.filter(slot => slot.service === service)
      : slots;

    if (filteredSlots.length > 0) {
      setStep(2);
    }
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('coach-')) {
      const [_, preference] = name.split('-');
      setFormData(prev => ({
        ...prev,
        preferredCoaches: {
          ...prev.preferredCoaches,
          [preference]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Navigate to payment page with all necessary data
    window.scrollTo(0, 0);
    navigate('/payment', {
      state: {
        service,
        serviceInfo,
        timeSlot: { date: selectedDate, time: selectedTimeSlot.time },
        formData,
        selectedDate,
        selectedTimeSlot,
        step: 3
      }
    });
  };

  const changeMonth = (increment) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + increment));
  };

  const availableCoaches = staffMembers.map(member => ({
    name: member.name,
    value: member.name
  }));

  const getNameFieldLabel = () => {
    if (
      service === 'large-group-clinic' || 
      service === 'small-group-clinic' || 
      service === 'recruiting-mentorship'
    ) {
      return "Player(s) or Team Name";
    }
    return "Player Name";
  };

  const getPlayerCountOptions = () => {
    const { minPlayers, maxPlayers } = serviceDetails[service];
    const options = [];
    for (let i = minPlayers; i <= maxPlayers; i++) {
      options.push(
        <option key={i} value={i}>{i} player{i !== 1 ? 's' : ''}</option>
      );
    }
    return options;
  };

  const showPlayerCount = () => {
    return (
      service === 'large-group-clinic' || 
      service === 'small-group-clinic' || 
      service === 'skill-session' ||
      service === 'recruiting-mentorship'
    );
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {service ? `Book ${serviceInfo.title}` : 'Available Sessions'}
          </h1>
          {service && (
            <div className="mt-6 inline-flex items-center justify-center gap-8 bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-lg font-bold text-cardinal-red">{serviceInfo.price}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <p className="text-lg font-semibold">{serviceInfo.duration}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Capacity</p>
                <p className="text-lg font-semibold">{serviceInfo.capacity}</p>
              </div>
            </div>
          )}
        </div>

        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button 
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={`empty-${index}`} className="p-4"></div>
              ))}

              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const date = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const hasAvailability = availableTimeSlots[date]?.some(
                  slot => !service || slot.service === service
                );

                return (
                  <button
                    key={day}
                    onClick={() => hasAvailability && handleDateSelect(day)}
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg transition-all ${
                      hasAvailability
                        ? 'hover:bg-cardinal-red hover:text-white cursor-pointer hover:shadow-md'
                        : 'text-gray-400 cursor-not-allowed bg-gray-50'
                    } ${
                      selectedDate === date ? 'bg-cardinal-red text-white shadow-md' : 'bg-white'
                    }`}
                  >
                    <span className="text-lg font-medium">{day}</span>
                    {hasAvailability && (
                      <CalendarDays className="h-4 w-4 mt-1 opacity-75" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && selectedDate && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="mb-6 text-cardinal-red hover:text-cardinal-dark flex items-center transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to Calendar
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                Available Times for {new Date(selectedDate).toLocaleDateString()}
              </h2>

              <div className="grid gap-4">
                {getAvailableSlotsForDate(selectedDate)
                  .filter(slot => !service || slot.service === service)
                  .map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSlotSelect(slot)}
                      className="group bg-white p-6 border-2 rounded-lg hover:border-cardinal-red hover:shadow-lg transition-all text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xl font-semibold text-gray-900 group-hover:text-cardinal-red transition-colors">
                            {serviceDetails[slot.service].title}
                          </p>
                          <p className="text-gray-600 mt-1">{slot.time}</p>
                        </div>
                        <p className="text-lg font-bold text-cardinal-red">{serviceDetails[slot.service].price}</p>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{serviceDetails[slot.service].duration}</span>
                        <Users className="h-4 w-4 ml-4 mr-1" />
                        <span>{serviceDetails[slot.service].capacity}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && selectedTimeSlot && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-medium">{new Date(selectedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Time</p>
                  <p className="font-medium">{selectedTimeSlot.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Service</p>
                  <p className="font-medium">{serviceInfo.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="font-medium text-cardinal-red">{serviceInfo.price}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 mb-1">
                  Parent/Legal Guardian Name
                </label>
                <input
                  type="text"
                  id="guardianName"
                  name="guardianName"
                  required
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                  placeholder="Full name of parent or legal guardian"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {getNameFieldLabel()}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                    placeholder="Player or team name"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                    placeholder="Player's age"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              {showPlayerCount() && (
                <div>
                  <label htmlFor="numberOfPlayers" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Players
                  </label>
                  <select
                    id="numberOfPlayers"
                    name="numberOfPlayers"
                    required
                    value={formData.numberOfPlayers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                  >
                    {getPlayerCountOptions()}
                  </select>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-lg font-medium text-gray-900 mb-4">
                  Preferred Coaches
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Choose up to 3 coaches in order of preference. We'll do our best to match you with one of your preferred coaches.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="coach-first" className="block text-sm font-medium text-gray-700">
                      1st Choice Coach
                    </label>
                    <select
                      id="coach-first"
                      name="coach-first"
                      value={formData.preferredCoaches.first}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                    >
                      <option value="">Select a coach</option>
                      {availableCoaches.map(coach => (
                        <option 
                          key={coach.value} 
                          value={coach.value}
                          disabled={
                            coach.value === formData.preferredCoaches.second || 
                            coach.value === formData.preferredCoaches.third
                          }
                        >
                          {coach.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="coach-second" className="block text-sm font-medium text-gray-700">
                      2nd Choice Coach
                    </label>
                    <select
                      id="coach-second"
                      name="coach-second"
                      value={formData.preferredCoaches.second}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                    >
                      <option value="">Select a coach</option>
                      {availableCoaches.map(coach => (
                        <option 
                          key={coach.value} 
                          value={coach.value}
                          disabled={
                            coach.value === formData.preferredCoaches.first || 
                            coach.value === formData.preferredCoaches.third
                          }
                        >
                          {coach.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="coach-third" className="block text-sm font-medium text-gray-700">
                      3rd Choice Coach
                    </label>
                    <select
                      id="coach-third"
                      name="coach-third"
                      value={formData.preferredCoaches.third}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                    >
                      <option value="">Select a coach</option>
                      {availableCoaches.map(coach => (
                        <option 
                          key={coach.value} 
                          value={coach.value}
                          disabled={
                            coach.value === formData.preferredCoaches.first || 
                            coach.value === formData.preferredCoaches.second
                          }
                        >
                          {coach.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="relative flex items-start">
                    <input
                      type="checkbox"
                      name="coachContactConsent"
                      checked={formData.coachContactConsent}
                      onChange={handleInputChange}
                      required
                      className="mt-0.5 h-4 w-4 text-cardinal-red border-gray-300 rounded focus:ring-cardinal-red"
                    />
                    <span className="ml-3 text-sm">
                      I give permission for my contact information to be shared with the selected coaches and for them to contact me regarding training sessions.
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red resize-y min-h-[100px]"
                  placeholder="Any specific requirements, questions, or additional information?"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.coachContactConsent}
                  className={`flex-1 bg-cardinal-red text-white py-3 px-4 rounded-lg hover:bg-cardinal-dark transition-colors ${
                    isSubmitting || !formData.coachContactConsent ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Continue to Payment'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default BookingPage;