import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { UserContext } from '@/pages/_app'; // Import UserContext
import { useRouter } from 'next/router'; // For navigation
import LoginForm from '../components/LoginForm'; // Reusable LoginForm component
import SignupForm from '../components/SignupForm'; // Reusable SignupForm component

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
    <div className="w-full h-screen flex lg:grid lg:grid-cols-2 relative">
      {/* Background Image for both mobile and desktop */}
      <div className="absolute inset-0 lg:relative lg:block lg:col-span-1">
        <Image
          src="/images/newDash.webp"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-65 lg:bg-opacity-50"></div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 lg:col-span-1 lg:p-12 w-full">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Circularize</h1>
          <p className="mt-4 text-lg lg:text-xl text-white">
            Host and organize events with ease.
          </p>
        </div>

        {/* Login/Signup Form */}
        <div className=" p-6 w-full max-w-md ">
          {isLogin ? (
            <LoginForm
              onLoginSuccess={handleLoginSuccess} // Pass login success handler
              onToggle={() => setIsLogin(false)} // Toggle to Signup form
            />
          ) : (
            <SignupForm
              onSignupSuccess={handleLoginSuccess} // Pass signup success handler
              onToggle={() => setIsLogin(true)} // Toggle to Login form
            />
          )}
        </div>
      </div>
    </div>
  );
}
