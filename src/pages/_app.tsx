import '@/styles/globals.css';
import { createContext, useState, useEffect } from 'react';
import type { AppProps } from 'next/app';

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
  user: User | null;
  setUser: (userData: User | null) => void;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData)); 
  };
  
  const logoutUser = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };
  
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default App;
