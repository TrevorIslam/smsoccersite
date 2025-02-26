import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCircle, Dumbbell, Info } from 'lucide-react';
import { services } from '../data/services';
import ServiceDetailsModal from './ServiceDetailsModal';

const ServicesPreview = () => {
  const navigate = useNavigate();
  const previewServices = services.slice(0, 3);
  const [selectedService, setSelectedService] = useState(null);

  const handleBookNow = (path) => {
    window.scrollTo(0, 0);
    navigate(`/book/${path}`);
  };

  const getIcon = (title) => {
    switch (title) {
      case "Large Group Clinic":
      case "Small Group Clinic":
        return <Users className="h-8 w-8 text-cardinal-red" />;
      case "Skill Session":
      case "Private Training":
        return <UserCircle className="h-8 w-8 text-cardinal-red" />;
      case "D1 Strength & Conditioning":
        return <Dumbbell className="h-8 w-8 text-cardinal-red" />;
      default:
        return <UserCircle className="h-8 w-8 text-cardinal-red" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Elite training programs for all skill levels
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {previewServices.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  {getIcon(service.title)}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-gray-500 hover:text-cardinal-red transition-colors p-1"
                    title="View Details"
                  >
                    <Info size={24} />
                  </button>
                </div>
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

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/services');
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cardinal-red hover:bg-cardinal-dark transition duration-300"
          >
            View All Services
          </button>
        </div>
      </div>

      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};

export default ServicesPreview;