import { SideNav } from "../components/Navbar";
import {QRCodeSVG} from "qrcode.react";

export default function AbsensiPage() {
    
    return (
        <div className="flex">
            <SideNav />
            <div className="flex flex-col w-full h-screen relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    <div className="h-40 w-auto rounded-md shadow-sm shadow-black/50 p-4 flex flex-col space-y-4">
                        <QRCodeSVG value={''} />
                        <a href="/absensi/gudang-depan" className="bg-black text-white font-semibold rounded-md p-2 text-center">Absen Sekarang</a>
                    </div>
                    <div className="h-40 w-auto rounded-md shadow-sm shadow-black/50 p-4 flex flex-col space-y-4">
                        <h1></h1>
                        <a href="/absensi/gudang-belakang" className="bg-black text-white font-semibold rounded-md p-2 text-center">Absen Sekarang</a>
                    </div>
                    <div className="h-40 w-auto rounded-md shadow-sm shadow-black/50 p-4 flex flex-col space-y-4">
                        <h1></h1>
                        <a href="/absensi/kantor-staff" className="bg-black text-white font-semibold rounded-md p-2 text-center">Absen Sekarang</a>
                    </div>
                </div>
            </div>
        </div>
    )
}