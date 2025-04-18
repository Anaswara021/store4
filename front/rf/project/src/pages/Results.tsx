// import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Thermometer, Wallet } from 'lucide-react';

// Mock data - replace with actual ML recommendations
const mockRecommendations = [
  {
    id: 1,
    name: "Munnar Hill Station",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3",
    description: "A beautiful hill station known for its tea plantations and cool climate.",
    rating: 4.8,
    activities: ["Tea Gardens", "Trekking", "Wildlife"],
    bestTime: "September to March",
    budget: "₹2,000 - ₹5,000 per day"
  },
  {
    id: 2,
    name: "Varkala Beach",
    image: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?ixlib=rb-4.0.3",
    description: "Stunning cliff-side beach with pristine waters and amazing sunsets.",
    rating: 4.6,
    activities: ["Swimming", "Surfing", "Yoga"],
    bestTime: "October to March",
    budget: "₹1,500 - ₹4,000 per day"
  },
  {
    id: 3,
    name: "Wayanad Wildlife",
    image: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?ixlib=rb-4.0.3",
    description: "Rich biodiversity with exotic wildlife and lush forests.",
    rating: 4.7,
    activities: ["Safari", "Camping", "Bird Watching"],
    bestTime: "October to May",
    budget: "₹2,500 - ₹6,000 per day"
  }
];

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3")'
      }}
    >
      <div className="min-h-screen bg-[#000000]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors mr-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-4xl font-bold text-[#D4AF37]">Recommended Destinations</h1>
          </div>

          {/* Search Criteria Summary */}
          <div className="bg-black/70 backdrop-blur-lg rounded-xl p-6 mb-8 shadow-[0_0_30px_rgba(212,175,55,0.15)] border border-[#D4AF37]/20">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Your Search Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center text-[#D4AF37]/80">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Location: {formData?.location || 'Any'}</span>
              </div>
              <div className="flex items-center text-[#D4AF37]/80">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Season: {formData?.season || 'Any'}</span>
              </div>
              <div className="flex items-center text-[#D4AF37]/80">
                <Thermometer className="h-5 w-5 mr-2" />
                <span>Climate: {formData?.climate || 'Any'}</span>
              </div>
              <div className="flex items-center text-[#D4AF37]/80">
                <Wallet className="h-5 w-5 mr-2" />
                <span>Budget: ₹{formData?.budget || 'Flexible'}</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRecommendations.map((destination) => (
              <div
                key={destination.id}
                className="bg-black/70 backdrop-blur-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-[#D4AF37]/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 border border-[#D4AF37]/30">
                    <span className="text-[#D4AF37] font-semibold">★ {destination.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">{destination.name}</h3>
                  <p className="text-[#D4AF37]/80 mb-4">{destination.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, index) => (
                        <span
                          key={index}
                          className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-[#D4AF37] border border-[#D4AF37]/30"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-[#D4AF37]/80 border-t border-[#D4AF37]/20 pt-3">
                      <span>Best Time: {destination.bestTime}</span>
                      <span>{destination.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;