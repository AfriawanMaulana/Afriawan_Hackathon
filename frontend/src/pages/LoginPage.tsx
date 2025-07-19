import axios from "axios";
import React, { useState, type SyntheticEvent } from "react"
import { Navigate, useNavigate } from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    interface KeyDown extends SyntheticEvent {
        key?: string;
    }
    const blockSpace = (e: KeyDown) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/login', loginForm);
            if (!res.data) return console.error('Failed to login');
            localStorage.setItem('token', res.data.token)
            navigate('/')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong')
            }
        };
    };

    if (token) return <Navigate to={'/'} replace />
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className="p-6 rounded-xl shadow-sm shadow-black/50 w-96 md:w-1/3 flex flex-col space-y-6">
                <h1 className="font-black text-2xl">Login to your account</h1>
                <form onSubmit={handleLogin} action="./LoginPage.tsx" method="post" className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-600">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={loginForm.email}
                            onChange={handleChange}
                            required
                            className="p-2 rounded-md border focus:outline focus:outline-blue-300 focus:invalid:outline-red-500" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-600">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            onKeyDown={blockSpace}
                            value={loginForm.password}
                            onChange={handleChange}
                            required
                            className="p-2 rounded-md border focus:outline focus:outline-blue-300" 
                        />
                    </div>
                    <button type="submit" className="p-2 rounded-md text-white font-semibold bg-black">Login</button>
                    <a href="/register" className="text-sm text-slate-600 text-center">Don't have an account? <span className="font-semibold text-black">Sign Up</span></a>
                </form>
            </div>
        </div>
    )
}