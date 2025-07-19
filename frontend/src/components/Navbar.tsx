import axios from "axios";
import React, { useEffect, useState } from "react"

interface UserType {
    id: number;
    username: string;
    email: string;
}
export const SideNav = () => {
    const pathName = window.location.pathname;
    const [userData, setUserData] = useState<UserType | null>(null);
    const getUser = async () => {
        try {
            const result = await axios.get('http://localhost:3000/api/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')} `} });
            setUserData(result.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong')
            }
        }
    };

    useEffect(() => {
        getUser()
    }, []);

    const showNav = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const nav = document.getElementsByClassName('sideNav')[0];
        if (nav.classList.contains('left-0')) {
            nav.classList.remove('left-0')
            nav.classList.add('-left-62')
        } else if (nav.classList.contains('-left-62')) {
            nav.classList.remove('-left-62')
            nav.classList.add('left-0')
        }
    }
    return (
        <div className="sideNav w-62 h-screen fixed md:sticky top-0 left-0 shadow-sm shadow-black/50 flex flex-col space-y-4 z-50 bg-white transition-all duration-250 ease-in-out">
            <button onClick={showNav} className="md:hidden font-bold text-white bg-black absolute top-1/2 -right-6 py-2 rounded-tr-lg rounded-br-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </button>
            <div className="p-4 shadow-sm shadow-black/50 rounded-lg text-center">
                <h1 className="font-black text-3xl italic">Absensi<span className="text-blue-500">Ku</span></h1>
            </div>
            <ul className="flex flex-col space-y-4 p-4">
                <li>
                    <a href="/absensi" className={`${pathName === "/absensi" ? "bg-black text-white" : "text-slate-700"} font-semibold p-2 rounded-md flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-250 ease-in-out`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <p>Absensi</p>
                    </a>
                </li>
                <li>
                    <a href="/scan" className={`${pathName === "/scan" ? "bg-black text-white" : "text-slate-700"} font-semibold p-2 rounded-md flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-250 ease-in-out`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                        </svg>
                        <p>Scan</p>
                    </a>
                </li>
                {userData?.username.toLowerCase() === "admin" && (
                    <li>
                        <a href="/dashboard" className={`${pathName === "/dashboard" ? "bg-black text-white" : "text-slate-700"} font-semibold p-2 rounded-md flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-250 ease-in-out`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>
                            <p>Dashboard</p>
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}