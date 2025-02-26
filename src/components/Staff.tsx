import React from 'react';

const staffMembers = [
  {
    name: "Coach Smith",
    position: "Head Trainer",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop",
    bio: "Stanford Men's Soccer Team Captain, 3-time All-American"
  },
  {
    name: "Coach Johnson",
    position: "Skills Specialist",
    image: "https://images.unsplash.com/photo-1599351431168-e8d416caa282?w=400&h=400&fit=crop",
    bio: "D1 Soccer Player, Specialized in Technical Training"
  },
  {
    name: "Coach Martinez",
    position: "Strength & Conditioning",
    image: "https://images.unsplash.com/photo-1599351431505-12b4d0f99f5c?w=400&h=400&fit=crop",
    bio: "Exercise Science Major, Certified Strength Coach"
  }
];

const Staff = () => {
  return (
    <section id="staff" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Staff
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Experienced Stanford student-athletes dedicated to your development
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {staffMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                className="w-full h-64 object-cover"
                src={member.image}
                alt={member.name}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-cardinal-red font-medium">{member.position}</p>
                <p className="mt-2 text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Staff;