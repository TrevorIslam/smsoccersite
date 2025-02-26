import React from 'react';
import { X } from 'lucide-react';

interface ServiceDetailsModalProps {
  service: {
    title: string;
    description: string;
    price: string;
    duration: string;
    capacity: string;
    details: string;
    benefits: string[];
    includes: string[];
  };
  onClose: () => void;
}

const ServiceDetailsModal = ({ service, onClose }: ServiceDetailsModalProps) => {
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getLocationText = (title: string) => {
    switch (title) {
      case "D1 Strength & Conditioning":
        return "Asynchronous";
      case "College Recruiting Mentorship":
        return "These sessions will take place on Zoom. The coaches will reach out the day before with their personalized Zoom link.";
      default:
        return "All sessions will meet at 641 Nelson Rd, Stanford, CA, 94305 (Cagan Stadium)";
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleModalClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <p>Price: <span className="font-semibold text-cardinal-red">{service.price}</span></p>
            <p>Duration: <span className="font-semibold">{service.duration}</span></p>
            <p>Capacity: <span className="font-semibold">{service.capacity}</span></p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Overview</h3>
              <p className="text-gray-600">{service.details}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What You'll Get</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {service.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Includes</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {service.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">
                {getLocationText(service.title)}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Coaching Staff</h3>
              <p className="text-gray-600">
                Each session is led by Stanford Men's Soccer student-athletes, ensuring personalized attention and expert instruction. Our coaches are selected based on client preference as well as their expertise in the specific areas covered in each session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;