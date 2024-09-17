import React, { useContext, useState } from 'react';
import { UserContext } from '@/pages/_app'; 
import { useRouter } from 'next/router'; 
import LoginForm from '../components/LoginForm'; 
import SignupForm from '../components/SignupForm'; 
import { FaUserFriends, FaRunning, FaGuitar, FaCalendarAlt, FaHandshake } from 'react-icons/fa'; 

export default function Dashboard() {
  const [isLogin, setIsLogin] = useState(true); 
  const { loginUser } = useContext(UserContext); 
  const router = useRouter(); 


  const handleLoginSuccess = (userData) => {
    loginUser(userData); 
    router.push('/Home'); 
  };


  const handleGuestAccess = () => {
    router.push('/Home');
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-900 to-indigo-800 text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold">Circularize</h1>
        <p className="text-lg mt-2">Connecting you through events, sports, and friendships.</p>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 max-w-md p-6 rounded-lg text-gray-800">
          {isLogin ? (
            <LoginForm
              onLoginSuccess={handleLoginSuccess} 
              onToggle={() => setIsLogin(false)} 
            />
          ) : (
            <SignupForm
              onSignupSuccess={handleLoginSuccess} // Pass signup success handler
              onToggle={() => setIsLogin(true)} // Toggle to Login form
            />
          )}
          <button
            onClick={handleGuestAccess}
            className="mt-6 w-full bg-white text-black py-3 rounded-lg shadow-md hover:bg-purple-300 transition duration-200 font-bold"
          >
            Continue as Guest
          </button>
        </div>
        <div className="w-full md:w-1/2 max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">How Circularize Works</h2>

          <div className="space-y-6">
            {[ 
              { icon: FaCalendarAlt, title: "Swipe to Find Events", description: "Easily browse and swipe through events to match your interests." },
              { icon: FaRunning, title: "Create Events", description: "Organize your own events, from sports games to music jam sessions." },
              { icon: FaUserFriends, title: "Meet New People", description: "Connect with like-minded individuals for sports or friendships." },
              { icon: FaGuitar, title: "Find Musicians", description: "Discover local musicians to collaborate and jam with in your area." },
              { icon: FaHandshake, title: "Build Communities", description: "Start or join communities based on shared activities and interests." }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <feature.icon className="text-4xl flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
