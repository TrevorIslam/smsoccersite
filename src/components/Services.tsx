import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCircle, Dumbbell, GraduationCap } from 'lucide-react';

const services = [
  {
    title: "Large Group Clinic",
    description: "Perfect for entire teams! Professional training in a high-energy environment.",
    price: "$50 per player",
    duration: "1.5 hours",
    capacity: "25+ players",
    icon: Users,
    path: "large-group-clinic"
  },
  {
    title: "Small Group Clinic",
    description: "More focused attention while maintaining team dynamics.",
    price: "$75 per player",
    duration: "1.5 hours",
    capacity: "<25 players",
    icon: Users,
    path: "small-group-clinic"
  },
  {
    title: "Skill Session",
    description: "Intensive skill development in small groups with specialized coaches.",
    price: "$60 per player",
    duration: "1 hour",
    capacity: "Small groups",
    icon: UserCircle,
    path: "skill-session"
  },
  {
    title: "Private Training",
    description: "One-on-one training tailored to your specific needs.",
    price: "$80-100",
    duration: "1 hour",
    capacity: "1 player",
    icon: UserCircle,
    path: "private-training"
  },
  {
    title: "D1 Strength & Conditioning",
    description: "Monthly training packets designed by D1 athletes.",
    price: "$100",
    duration: "Monthly packet",
    capacity: "None",
    icon: Dumbbell,
    path: "strength-conditioning"
  },
  {
    title: "College Recruiting Mentorship",
    description: "Guidance through the college recruitment process.",
    price: "$75-100",
    duration: "30 mins - 1 hour",
    capacity: "None",
    icon: GraduationCap,
    path: "recruiting-mentorship"
  }
];

const Services = () => {
  const navigate = useNavigate();

  const handleBookNow = (path) => {
    window.scrollTo(0, 0);
    navigate(`/book/${path}`);
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive training programs for all skill levels and age groups
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <service.icon className="h-8 w-8 text-cardinal-red" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-cardinal-red font-bold">{service.price}</p>
                  <p className="text-sm text-gray-500">Duration: {service.duration}</p>
                  <p className="text-sm text-gray-500">Capacity: {service.capacity}</p>
                </div>
                <button
                  onClick={() => handleBookNow(service.path)}
                  className="mt-6 w-full bg-cardinal-red text-white py-2 rounded-md hover:bg-cardinal-dark transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;