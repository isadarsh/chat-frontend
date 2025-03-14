import { Routes, Route, Navigate } from "react-router-dom";//singular for specific assignment
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react"
import {Toaster} from 'react-hot-toast';
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const { theme }= useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  
  console.log({ authUser })
  
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen" data-theme={theme}>
      <Navbar />
      {/* <main className="flex-grow"> */}
        <Routes>
          <Route path="/" element={authUser? <HomePage/>: <Navigate to="/login"/>} />
          <Route path="/signup" element={!authUser?<SignupPage/>: <Navigate to="/"/>} />
          <Route path="/login" element={!authUser? <LoginPage />: <Navigate to="/" />} />
          <Route path="/logout" element={<LogoutPage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/profile" element={authUser? <ProfilePage/>: <Navigate to="/login/"/>} />
        </Routes>
      {/* </main> */}
      <Toaster/>
    </div>
  )
}