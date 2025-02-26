import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { staffMembers } from '../data/staffMembers';

const fitnessGoals = [
  { id: 'muscle', label: 'Build Muscle Mass' },
  { id: 'strength', label: 'Increase Strength' },
  { id: 'speed', label: 'Improve Speed' },
  { id: 'endurance', label: 'Enhance Endurance' },
  { id: 'agility', label: 'Develop Agility' },
  { id: 'power', label: 'Explosive Power' },
  { id: 'flexibility', label: 'Improve Flexibility' },
  { id: 'recovery', label: 'Better Recovery' },
];

const experienceLevels = [
  { id: 'beginner', label: 'Beginner - New to strength training' },
  { id: 'intermediate', label: 'Intermediate - Some experience with weights' },
  { id: 'advanced', label: 'Advanced - Regular strength training experience' },
];

const trainingFrequency = [
  { id: '2-3', label: '2-3 times per week' },
  { id: '3-4', label: '3-4 times per week' },
  { id: '4-5', label: '4-5 times per week' },
  { id: '5+', label: '5+ times per week' },
];

const StrengthFitnessForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Goals and preferences
    goals: [],
    experienceLevel: '',
    trainingFrequency: '',
    equipmentAccess: '',
    injuries: '',
    // Coach preferences
    preferredCoaches: {
      first: '',
      second: '',
      third: ''
    },
    // Personal information
    name: '',
    age: '',
    email: '',
    phone: '',
    notes: ''
  });

  const availableCoaches = staffMembers.map(member => ({
    name: member.name,
    value: member.name
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        [name]: value
      }));
    }
  };

  const handleGoalToggle = (goalId) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_0u2iruh',
        'template_m9q2wck',
        {
          to_email: formData.email,
          from_name: formData.name,
          service_title: "D1 Strength & Conditioning Program",
          goals: formData.goals.map(g => fitnessGoals.find(fg => fg.id === g).label).join(', '),
          experience_level: formData.experienceLevel,
          training_frequency: formData.trainingFrequency,
          equipment_access: formData.equipmentAccess,
          injuries: formData.injuries || 'None',
          preferred_coaches: `1st: ${formData.preferredCoaches.first}\n2nd: ${formData.preferredCoaches.second}\n3rd: ${formData.preferredCoaches.third}`,
          additional_notes: formData.notes || "None",
        },
        'RMPNJbYp34PHgcehV'
      );
      
      navigate('/booking-confirmation', {
        state: {
          serviceInfo: {
            title: "D1 Strength & Conditioning Program",
            price: "$100",
            duration: "Monthly packet",
          },
          formData
        }
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("There was an error processing your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            D1 Strength & Conditioning Program
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get a personalized monthly training program designed by Stanford athletes
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  What are your primary fitness goals? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fitnessGoals.map(goal => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => handleGoalToggle(goal.id)}
                      className={`p-4 text-left rounded-lg border-2 transition-colors ${
                        formData.goals.includes(goal.id)
                          ? 'border-cardinal-red bg-cardinal-red/10 text-cardinal-red'
                          : 'border-gray-200 hover:border-cardinal-red'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  What is your experience level with strength training?
                </label>
                <div className="space-y-3">
                  {experienceLevels.map(level => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => handleInputChange({ target: { name: 'experienceLevel', value: level.id } })}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                        formData.experienceLevel === level.id
                          ? 'border-cardinal-red bg-cardinal-red/10 text-cardinal-red'
                          : 'border-gray-200 hover:border-cardinal-red'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  How often can you train?
                </label>
                <div className="space-y-3">
                  {trainingFrequency.map(freq => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => handleInputChange({ target: { name: 'trainingFrequency', value: freq.id } })}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                        formData.trainingFrequency === freq.id
                          ? 'border-cardinal-red bg-cardinal-red/10 text-cardinal-red'
                          : 'border-gray-200 hover:border-cardinal-red'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-2">
                  What equipment do you have access to?
                </label>
                <textarea
                  name="equipmentAccess"
                  value={formData.equipmentAccess}
                  onChange={handleInputChange}
                  placeholder="E.g., Full gym, Home equipment, etc."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-2">
                  Do you have any injuries or limitations we should know about?
                </label>
                <textarea
                  name="injuries"
                  value={formData.injuries}
                  onChange={handleInputChange}
                  placeholder="List any current or past injuries that might affect your training"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Who would you want to work with?
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Choose up to 3 coaches in order of preference. We'll do our best to match you with one of your preferred coaches.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="coach-first" className="block text-sm font-medium text-gray-700">
                        1st Choice Coach
                      </label>
                      <select
                        id="coach-first"
                        name="coach-first"
                        value={formData.preferredCoaches.first}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
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
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.goals.length || !formData.experienceLevel || !formData.trainingFrequency}
                className="w-full bg-cardinal-red text-white py-3 px-4 rounded-md hover:bg-cardinal-dark transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Personal Information
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring-cardinal-red"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-cardinal-red text-white py-3 px-4 rounded-md hover:bg-cardinal-dark transition duration-300 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default StrengthFitnessForm;