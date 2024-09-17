import * as React from "react";
import { useContext } from "react";
import { useRouter } from "next/router"; 
import { UserContext } from "@/pages/_app"; 

export default function FilterNav() {
  const { user, setUser } = useContext(UserContext); 
  const router = useRouter();

  const handleButtonClick = () => {
    if (user) {
      setUser(null); 
      localStorage.removeItem("user"); 
    }
    router.push("/Dashboard"); 
  };

  return (
    <div className="flex justify-between items-center w-full p-4 bg-white shadow-md ">
      <h1 className="text-2xl font-bold text-purple-800">Circularize</h1>
      <button
        onClick={handleButtonClick}
        className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition-all"
      >
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
}
