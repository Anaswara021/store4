import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle } from 'lucide-react';

const districts = [
  'Kasargod', 'Kannur', 'Kozhikode', 'Wayanad', 'Malappuram', 'Thrissur',
  'Palakkad', 'Kottayam', 'Kochi', 'Ernakulam', 'Alappuzha', 'Pathanamthitta',
  'Kollam', 'Thiruvananthapuram'
];

const Destination = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    type: '',
    budget: '',
    climate: ''
  });

  // Mock user data (replace with actual user data from your auth system)
  const userData = {
    name: '',
    email: '',
    phone: ''
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3")'
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header with Profile and Back Button */}
          <div className="flex justify-between items-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <UserCircle className="h-8 w-8" />
              </button>
              
              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
                  <div className="space-y-2">
                    <p><span className="text-white/60">Name:</span> {userData.name}</p>
                    <p><span className="text-white/60">Email:</span> {userData.email}</p>
                    <p><span className="text-white/60">Phone:</span> {userData.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold text-white text-center mb-12 leading-tight">
              Plan Your Perfect
              <span className="block text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Kerala Adventure
              </span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
              {/* Location Dropdown */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="bg-gray-800">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district} className="bg-gray-800">
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Type */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Destination Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="bg-gray-800">Select Type</option>
                  <option value="beach" className="bg-gray-800">Beach</option>
                  <option value="hill-station" className="bg-gray-800">Hill Station</option>
                  <option value="wildlife" className="bg-gray-800">Wildlife</option>
                  <option value="heritage" className="bg-gray-800">Heritage</option>
                  <option value="pilgrimage" className="bg-gray-800">Pilgrimage</option>
                </select>
              </div>

              {/* Budget Input */}
              <div>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="Budget"
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Climate Preference */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Climate Preference</label>
                <select
                  value={formData.climate}
                  onChange={(e) => setFormData({...formData, climate: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="bg-gray-800">Select Climate</option>
                  <option value="tropical" className="bg-gray-800">Tropical</option>
                  <option value="moderate" className="bg-gray-800">Moderate</option>
                  <option value="cool" className="bg-gray-800">Cool</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 rounded-xl text-white font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Find Perfect Destinations
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Destination;



