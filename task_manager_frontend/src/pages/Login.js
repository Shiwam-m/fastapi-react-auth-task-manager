import React, { useState } from 'react';
import { authApi } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authApi.login(formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.detail || "Login failed");
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <LogIn size={32} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-8">Please enter your details to sign in</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="login-username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input 
                            type="text" name="username" id="login-username" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                   <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" name="password" id="login-password" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    New here? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;