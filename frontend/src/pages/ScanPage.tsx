import { Scanner } from '@yudiel/react-qr-scanner';
import { SideNav } from '../components/Navbar';
import { Navigate } from 'react-router-dom';

export default function ScanPage() {
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to={'/login'} replace />
    return (
        <div className='flex'>
            <SideNav />
            <div className='flex w-full h-screen items-center justify-center'>
                <div className='w-66 h-66 flex flex-col items-center'>
                    <h1 className='font-bold text-2xl'>Scan Here..</h1>
                    <Scanner onScan={(result) => console.log(result)} />
                </div>
            </div>
        </div>
    )
}