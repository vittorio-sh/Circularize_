import React, { useState } from 'react';
import Nav from "@/components/Nav";
import Profile from "@/components/Profile";
import Create from "@/components/Create";
import Events from "@/components/Events";
import Find from "@/components/Find";
import FilterNav from "@/components/FilterNav";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('Events');
  const [filters, setFilters] = useState({ type: '', age: '', country: '' });
  const [showNav, setShowNav] = useState(false); // To toggle navigation on small screens

  const handleAddComponent = (component) => {
    setActiveComponent(component);
    setShowNav(false); // Hide navigation after selecting on mobile
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  const handleToggleNav = () => {
    setShowNav(!showNav); // Toggle navigation on small screens
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <FilterNav onFilterChange={handleFilterChange} />
      </div>

      <div className="md:hidden flex justify-center mt-4">
        <button
          onClick={handleToggleNav}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          {showNav ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      <div className="flex-grow flex">
        <div
          className={`${
            showNav ? 'block' : 'hidden'
          } w-full md:w-2/5 p-4 flex flex-col md:flex md:block md:flex-grow md:flex-shrink-0`}
        >
          <Nav onAddComponent={handleAddComponent} />
          <div className="mt-6 flex-grow">
            {activeComponent === 'Profile' && <div className="h-full"><Profile /></div>}
            {activeComponent === 'Create' && <div className="h-full"><Create /></div>}
            {activeComponent === 'Events' && <div className="h-full"><Events /></div>}
          </div>
        </div>

        <div className="w-full md:w-3/5 flex flex-col items-center justify-start">
          <Find className="flex justify-center items-center" filters={filters} />
        </div>
      </div>
    </div>
  );
}
