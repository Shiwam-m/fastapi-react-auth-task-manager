import React, { useState } from 'react';
import { authApi } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        username: '', 
        email: '', 
        hash_password: '' 
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Register.js mein handlesubmit ke andar:
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authApi.register(formData);
            console.log("Success:", response.data);
            alert("Registration Successful!");
        } catch (error) {
            // --- YE CHANGE KAREIN ---
            const errorMsg = error.response?.data?.detail 
                ? JSON.stringify(error.response.data.detail) 
                : "Something went wrong";
            
            console.log("Asli Backend Error:", error.response?.data);
            alert("Backend Error: " + errorMsg);
            // ------------------------
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                        <UserPlus size={32} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-8">Join us to start managing your tasks</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input 
                            type="text" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                            onChange={(e) => setFormData({...formData, hash_password: e.target.value})}
                        />
                    </div>
                    <button 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95"
                    >
                        {loading ? "Creating account..." : "Register Now"}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account? <Link to="/" className="text-blue-600 font-semibold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;