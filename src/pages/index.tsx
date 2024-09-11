import React, { useState } from 'react';
import Nav from "@/components/Nav";  // Adjust import paths accordingly
import Profile from "@/components/Profile";
import Create from "@/components/Create";
import Events from "@/components/Events";
import Find from "@/components/Find";  // Find is always displayed on the right
import FilterNav from "@/components/FilterNav";  // Import FilterNav

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('Events'); // Single active component
  const [filters, setFilters] = useState({ type: '', age: '', country: '' });

  const handleAddComponent = (component) => {
    setActiveComponent(component); // Only one component will be displayed at a time
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
    console.log(`Filter changed: ${category} = ${value}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dynamic Component */}
      <div className="w-2/5 p-4">
        <Nav onAddComponent={handleAddComponent} />

        <div className="mt-6">
          {activeComponent === 'Profile' && <Profile />}
          {activeComponent === 'Create' && <Create />}
          {activeComponent === 'Events' && <Events />}
        </div>
      </div>

      {/* Right Side - Find and Filter Navigation */}
      <div className="w-3/5 flex flex-col items-center justify-start bg-gray-100 ">
        {/* FilterNav Component */}
        <div className="w-full flex justify-center bg-white p-4">
          <FilterNav onFilterChange={handleFilterChange} />
        </div>

        {/* Find Component */}
        <div className="flex-grow w-full">
          <Find />
        </div>
      </div>
    </div>
  );
}
