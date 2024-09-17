import '@/styles/globals.css';
import { createContext, useState, useEffect } from 'react';
import type { AppProps } from 'next/app';

// Define types for User and UserContext
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  zipCode: string;
  birthday: string;
  country: string;
  activeEvents: string[];
  createdEvents: string[];
}

interface UserContextType {
  user: User;
  setUser: (userData: User) => void;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

// Create UserContext
export const UserContext = createContext<UserContextType | null>(null);

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    zipCode: '',
    birthday: '',
    country: '',
    activeEvents: [], 
    createdEvents: [], 
  });

  // On first load, check if user data exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user state from localStorage
    }
  }, []);

  // Function to log in the user and store in localStorage
  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
  };

  // Function to log out the user and clear localStorage
  const logoutUser = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      city: '',
      zipCode: '',
      birthday: '',
      country: '',
      activeEvents: [], // Clear activeEvents
      createdEvents: [], // Clear createdEvents
    });
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default App;
