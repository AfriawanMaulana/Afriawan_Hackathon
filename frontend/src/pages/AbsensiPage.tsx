import { useEffect, useState } from "react";
import { SideNav } from "../components/Navbar";
import {QRCodeSVG} from "qrcode.react";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface QRCodeType {
    id: number;
    name: string;
    value: string;
    created_at: string;
    expired_at: string;
};

interface UserType {
    id: number;
    username: string;
    email: string;
};

interface AbsensiType {
    id: number;
    user_id: number;
    username: string;
    absen_time: string;
    absen_location: string;
}

export default function AbsensiPage() {
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState<UserType | null>(null)

    const [dataAbsensi, setDataAbsensi] = useState<AbsensiType[]>([])

    const [qrCode, setQrCode] = useState<QRCodeType[]>([])
    const getQRCode = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/qrcode');
            setQrCode(res.data)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong')
            }
        };
    } ;

    const getUser = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/profile', {headers: {Authorization:  `Bearer ${localStorage.getItem('token')}`}})
            setUserData(res.data)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Somethinw went wrong')
            }
        }
    };

    const getAbsensi = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/absensi', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setDataAbsensi(res.data)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data.error || 'Something went wrong')
            }
        };
    };

    useEffect(() => {
        getUser();
        getQRCode();
        getAbsensi();
    }, [])
    
    if (!token) return <Navigate to={'/login'} replace />
    return (
        <div className="flex">
            <SideNav />
            <div className="flex flex-col w-full h-screen relative">
                <div className="p-4">
                    <h1 className="font-semibold text-2xl">Welcome back, <span className="font-bold">{userData?.username}</span></h1>
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <h1 className="font-bold text-lg">QR Absensi:</h1>
                    <div className="flex flex-row">
                        {qrCode && qrCode.map((item) => (
                            <div key={item.id} className="h-44 w-auto rounded-md shadow-sm shadow-black/50 p-4 flex flex-col space-y-4 justify-center">
                                <QRCodeSVG value={item.value} level="M" size={250} className=""/>
                                <div className="flex flex-col text-sm justify-center items-center">
                                    <h1 className="font-bold">{item.name.toUpperCase()}</h1>
                                    <p className="font-semibold text-red-500">{item.expired_at}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4"> 
                    <h1 className="font-semibold text-xl">Data absensi kamu:</h1>
                    <div className="overlflow-x-auto rounded-md shadow-sm shadow-black/40">
                        <table className="w-full">
                            <thead className="bg-slate-200 text-sm font-semibold">
                                <tr>
                                    <td className="p-2">No</td>
                                    <td className="p-2">Nama</td>
                                    <td className="p-2">Lokasi</td>
                                    <td className="p-2">Waktu Absen</td>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {dataAbsensi.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-200"}>
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{item.username}</td>
                                        <td className="p-2">{item.absen_location}</td>
                                        <td className="p-2">{item.absen_time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}