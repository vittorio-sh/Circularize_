import { useState } from "react";
import Image from "next/image";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function Dashboard() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2 lg:min-h-screen xl:min-h-screen">
      {/* Left Column: Background with Dark Overlay */}
      <div className="hidden lg:block bg-muted h-full relative">
        {/* Background Image */}
        <Image
          src="/images/newDash.webp"  // Ensure the image is in your public/images directory
          alt="Image"
          layout="fill"  // Ensures the image takes the full height and width
          objectFit="cover"  // Ensures the image covers the whole area
          className="h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-65"></div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
          <h1 className="text-4xl lg:text-6xl font-bold text-white">Circularize</h1>
          <p className="mt-4 text-lg lg:text-xl text-white max-w-xl">
            Circularize helps you host and organize events with ease. Whether it's a business conference, a concert, or a social gathering, we provide the tools to make your event a success.
          </p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex items-center justify-center py-12 h-full">
        {isLogin ? (
          <LoginForm onToggle={() => setIsLogin(false)} />
        ) : (
          <SignupForm onToggle={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
