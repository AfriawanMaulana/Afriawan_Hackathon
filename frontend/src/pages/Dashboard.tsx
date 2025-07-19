import React, { useEffect, useState } from "react";
import { SideNav } from "../components/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface UserType {
    id: number;
    username: string;
    email: string;
};

interface QrType {
    id: number;
    name: string;
    value: string;
    created_at: string;
    expired_at: string;
}
export default function Dashboard() {
    const token = localStorage.getItem('token');
    const [isAdd, setIsAdd] = useState(false);
    const [usersData, setUsersData] = useState<UserType[]>([])
    const [profileData, setProfileData] = useState<UserType | null>(null);

    const [qrData, setQrData] = useState<QrType[]>([])
    const qrValue = `http://localhost:3000/api/scan?token=${token}`;
    const [qrForm, setQrForm] = useState({
        name: '',
        value: qrValue,
        expired_at: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQrForm({
            ...qrForm,
            [e.target.name]: e.target.value
        });
    };

    const getAllUsers = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users', { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            setUsersData(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong')
            }
        }
    }

    const getProfile = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setProfileData(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong');
            }
        };
    };

    const handleGenerate = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/qrcode', qrForm)
            setIsAdd(false);
            setQrForm({ 
                name: '',
                value: '',
                expired_at: ''
            });
            getQRCode();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong');
            }
        };
    };

    const getQRCode = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/qrcode');
            setQrData(res.data)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong')
            }
        }
    };

    useEffect(() => {
        getProfile();
        getAllUsers();
        getQRCode();
    }, [])

    if (!token) return <Navigate to={'/'} replace /> 
    return (
        <div className="flex">
            <SideNav />
            <div className="flex flex-col w-full h-screen relative">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold">Welcome back, <span className="italic font-bold">{profileData?.username}</span></h1>
                </div>

                <div className="p-6 flex gap-4 flex-row">
                    <button onClick={() => setIsAdd(!isAdd)} className="hover:cursor-pointer w-40 font-semibold text-white bg-black p-2 rounded-md flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                        </svg>
                        <p className="font-semibold">Generate QR</p>
                    </button>
                    {/* <button onClick={(e) => e.preventDefault} className="hover:cursor-pointer w-40 font-semibold text-white bg-black p-2 rounded-md flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <p className="font-semibold">Data Report</p>
                    </button> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4">
                    <div className="shadow-sm shadow-black/50 w-auto h-36 rounded-md p-4 flex flex-col items-center justify-evenly">
                        <p className={`${qrData.length > 0 ? "text-green-500" : "text-red-500"} font-bold text-4xl`}>{qrData.length}</p>
                        <p className="font-semibold text-xl">QR-Code Active</p>
                    </div>
                    <div className="shadow-sm shadow-black/50 w-auto h-36 rounded-md p-4 flex flex-col items-center justify-evenly">
                        <p className={`${usersData.length > 0 ? "text-green-500" : "text-red-500"} font-bold text-4xl`}>{usersData.length}</p>
                        <p className="font-semibold text-xl">Total Users</p>
                    </div>
                </div>
                {isAdd && (
                    <div className="absolute w-full h-screen flex items-center justify-center backdrop-blur-sm">
                        <form onSubmit={handleGenerate} method="post" className="flex flex-col space-y-4 shadow-sm shadow-black w-96 md:w-1/3 p-6 rounded-xl relative">
                            <button onClick={() => setIsAdd(false)} className="py-1.5 px-3 rounded-full bg-black text-white font-semibold -right-4 -top-4 absolute hover:cursor-pointer">X</button>
                            <h1 className="font-black text-2xl">Generate QR-Code</h1>
                            <div className="flex flex-col">
                                <label>Location Name</label>
                                <input 
                                    type="text"
                                    name="name" 
                                    onChange={handleChange}
                                    required
                                    className="p-2 rounded-md border" 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>Expired at</label>
                                <input 
                                    type="datetime-local" 
                                    name="expired_at"
                                    onChange={handleChange}
                                    required
                                    className="p-2 rounded-md border" 
                                />
                            </div>
                            <button type="submit" className="hover:cursor-pointer p-2 rounded-md bg-black text-white font-semibold">Generate</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}