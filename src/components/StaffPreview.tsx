import React from 'react';
import { useNavigate } from 'react-router-dom';
import { staffMembers } from '../data/staffMembers';

const StaffPreview = () => {
  const navigate = useNavigate();
  const previewMembers = staffMembers.slice(0, 3);

  const handleSeeMore = () => {
    window.scrollTo(0, 0);
    navigate('/staff');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Coaches
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Learn from Stanford's finest student-athletes
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {previewMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4]">
                <img
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src={member.image}
                  alt={member.name}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-white/90">{member.position}</p>
                  <p className="text-white/80 text-sm">{member.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleSeeMore}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cardinal-red hover:bg-cardinal-dark transition duration-300"
          >
            See All Coaches
          </button>
        </div>
      </div>
    </section>
  );
};

export default StaffPreview;