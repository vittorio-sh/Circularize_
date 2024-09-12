import '@/styles/globals.css';
import { createContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext(null);

function App({ Component, pageProps }) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    zipCode: '',
    birthday: '',
    country: '',
    activeEvents: [''],
    createdEvents: [''],
  });

  // On first load, check if user data exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user state from localStorage
    }
  }, []);

  // Function to log in the user and store in localStorage
  const loginUser = (userData) => {
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
      activeEvents: [''],
      createdEvents: [''],
    });
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user,setUser, loginUser, logoutUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default App;
