import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: ''
    };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://127.0.0.1:5000/userLogin', {  // Corrected backend route
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Login successful!');
          console.log('Login response:', data);

          // Store token in localStorage for authentication
          localStorage.setItem('token', data.token);
          localStorage.setItem('user_id', data.user_id);

          navigate('/'); // Redirect to homepage
        } else {
          toast.error(data.message || 'Login failed');
          console.log('Login error:', data);
        }
      } catch (error) {
        toast.error('An error occurred during login');
        console.log('Fetch error:', error);
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        // backgroundImage: 'url("https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3")'
        backgroundImage: 'url("data:image/jpeg;base64,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")'
      }}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h2 className="text-3xl font-bold text-white text-center flex-1 mr-6">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Email"
                />
              </div>
              {errors.email && <p className="text-red-300 text-sm mt-2">{errors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Password"
                />
              </div>
              {errors.password && <p className="text-red-300 text-sm mt-2">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-violet-600 focus:ring-violet-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-white/80 hover:text-white">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Login
            </button>

            <div className="text-center text-sm text-white/80">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-white hover:text-white/90">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
