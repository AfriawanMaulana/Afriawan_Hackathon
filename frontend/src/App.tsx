import { Navigate } from "react-router-dom";
import { SideNav } from "./components/Navbar";


export default function Home() {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to={'/login'} replace />
  return (
    <div>
      <SideNav />
    </div>
  )
}