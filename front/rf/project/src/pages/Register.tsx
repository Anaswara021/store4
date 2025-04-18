import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "", email: "", password: "", confirmPassword: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://127.0.0.1:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        if (response.ok) {
          toast.success("Registration successful!");
          navigate("/login");
        } else {
          toast.error(data.error || "Registration failed");
        }
      } catch (error) {
        toast.error("Error connecting to server.");
      }
    }
  };
  

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          // 'url("https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3")',
          'url("data:image/jpeg;base64,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")',
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
            <h2 className="text-3xl font-bold text-white text-center flex-1 mr-6">
              Register
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                placeholder="Full Name"
              />
              {errors.name && <p className="text-red-300 text-sm mt-2">{errors.name}</p>}
            </div>

            <div>
              <input
                type="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                placeholder="Phone Number"
              />
              {errors.phone && <p className="text-red-300 text-sm mt-2">{errors.phone}</p>}
            </div>

            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-300 text-sm mt-2">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-300 text-sm mt-2">{errors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-300 text-sm mt-2">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Register
            </button>

            <div className="text-center text-sm text-white/80">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-white hover:text-white/90">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
