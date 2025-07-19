
import axios from "axios";
import React, { useState, type SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('')
    const [registerForm, setRegisterForm] = useState({
        username: '',
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
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (registerForm.password.length < 8) {
            return setStatus('Password minimum 8 characters')
        } else if (registerForm.password.length >= 20) {
            return setStatus('Password max 20 characters');
        };

        try {
            const res = await axios.post('http://localhost:3000/api/register', registerForm);
            if (!res.data) return console.error('Failed to register');
            navigate('/login');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong')
            }
        };
    };

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className="p-6 rounded-xl shadow-sm shadow-black/50 w-96 md:w-1/3 flex flex-col space-y-6">
                <h1 className="font-black text-2xl">Create your account</h1>
                <form onSubmit={handleRegister} action="./RegisterPage.tsx" method="post" className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-600">Username</label>
                        <input 
                            type="text" 
                            name="username"
                            value={registerForm.username}
                            onChange={handleChange}
                            required
                            className="p-2 rounded-md border focus:outline focus:outline-blue-300" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-600">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            onKeyDown={blockSpace}
                            value={registerForm.email}
                            onChange={handleChange}
                            required
                            className="p-2 rounded-md border focus:outline focus:outline-blue-300" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-600">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            onKeyDown={blockSpace}
                            value={registerForm.password}
                            onChange={handleChange}
                            required
                            className="p-2 rounded-md border focus:outline focus:outline-blue-300" 
                        />
                    </div>
                    <p className="text-sm text-slate-600">{status}</p>
                    <button type="submit" className="p-2 rounded-md text-white font-semibold bg-black">Register</button>
                    <a href="/login" className="text-sm text-slate-600 text-center">Already have an account? <span className="font-semibold text-black">Login</span></a>
                </form>
            </div>
        </div>
    )
}