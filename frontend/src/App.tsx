import { Navigate } from "react-router-dom";
export default function Home() {
  const token = localStorage.getItem('token');
  

  
  if (!token) return <Navigate to={'/login'} replace />
  return <Navigate to={'absensi'} replace />
}