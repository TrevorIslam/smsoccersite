import React, { useState } from 'react';
import { X } from 'lucide-react';
import { staffMembers } from '../data/staffMembers';

const StaffPage = () => {
  const [selectedCoach, setSelectedCoach] = useState(null);

  const handleModalClose = () => {
    setSelectedCoach(null);
  };

  const handleModalClick = (e) => {
    // Close modal when clicking the backdrop, but not when clicking the modal content
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Expert Coaching Staff
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Learn from Stanford's finest student-athletes and experienced coaches
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {staffMembers.map((member) => (
            <div 
              key={member.name} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedCoach(member)}
            >
              <div className="relative aspect-[3/4]">
                <img
                  className="absolute inset-0 w-full h-full object-contain object-center"
                  src={member.image}
                  alt={member.name}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                  <p className="text-white/90">{member.position}</p>
                  <p className="text-white/80 text-sm">{member.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCoach && (
  <div 
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onClick={handleModalClick}
  >
    <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto relative p-6 shadow-lg">
      {/* Close Button */}
      <button
        onClick={handleModalClose}
        className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 shadow-md text-gray-600 hover:text-gray-800 transition-all"
      >
        <X size={24} />
      </button>
      
      <div className="flex flex-col items-center">
        {/* Image (Centered) */}
        <div className="aspect-[3/4] w-full max-w-xs relative overflow-hidden flex justify-center">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={selectedCoach.image}
            alt={selectedCoach.name}
          />
        </div>
        
        {/* Coach Info */}
        <div className="text-center mt-6">
          <h2 className="text-3xl font-bold text-gray-900">{selectedCoach.name}</h2>
          <p className="text-xl text-cardinal-red font-semibold">{selectedCoach.position}</p>
          <p className="text-gray-600">{selectedCoach.grade}</p>
        </div>

        {/* Details */}
        <div className="text-left w-full mt-6">
          <p className="text-gray-700 mb-6">{selectedCoach.bio}</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Specialties</h3>
              <ul className="list-disc list-inside text-gray-600">
                {selectedCoach.specialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Achievements</h3>
              <ul className="list-disc list-inside text-gray-600">
                {selectedCoach.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Availability</h3>
              <p className="text-gray-600">{selectedCoach.availability}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default StaffPage;