import React, { useContext, useState } from 'react';
import Image from "next/image";
import { UserContext } from '@/pages/_app'; // Import UserContext
import { useRouter } from 'next/router'; // For navigation
import LoginForm from "../components/LoginForm"; // Reusable LoginForm component
import SignupForm from "../components/SignupForm"; // Reusable SignupForm component

export default function Dashboard() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const { loginUser } = useContext(UserContext); // Access loginUser from UserContext
  const router = useRouter(); // Initialize router for redirect

  // Handle successful login or signup
  const handleLoginSuccess = (userData) => {
    loginUser(userData); // Set user data in context and localStorage
    router.push('/Home'); // Redirect to home page after login
  };

  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2 lg:min-h-screen xl:min-h-screen">
      {/* Left Column: Background with Dark Overlay */}
      <div className="hidden lg:block bg-muted h-full relative">
        <Image
          src="/images/newDash.webp"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-65"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
          <h1 className="text-4xl lg:text-6xl font-bold text-white">Circularize</h1>
          <p className="mt-4 text-lg lg:text-xl text-white max-w-xl">
            Host and organize events with ease.
          </p>
        </div>
      </div>

      {/* Right Column: Login/Signup Form */}
      <div className="flex items-center justify-center py-12 h-full">
        {isLogin ? (
          <LoginForm 
            onLoginSuccess={handleLoginSuccess} // Pass login success handler
            onToggle={() => setIsLogin(false)} // Toggle to Signup form
          />
        ) : (
          <SignupForm 
            onSignupSuccess={handleLoginSuccess} // Pass signup success handler
            onToggle={() => setIsLogin(true)}  // Toggle to Login form
          />
        )}
      </div>
    </div>
  );
}
