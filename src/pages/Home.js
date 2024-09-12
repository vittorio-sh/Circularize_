import React, { useContext, useState } from 'react';
import { UserContext } from '@/pages/_app'; // Access global UserContext
import Nav from "@/components/Nav";
import Profile from "@/components/Profile";
import Create from "@/components/Create";
import Events from "@/components/Events";
import Find from "@/components/Find";
import FilterNav from "@/components/FilterNav";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('Events');
  const [filters, setFilters] = useState({ type: '', age: '', country: '' });

  const handleAddComponent = (component) => {
    setActiveComponent(component);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Navigation and Components */}
      <div className="w-2/5 p-4">
        <Nav onAddComponent={handleAddComponent} />
        <div className="mt-6">
          {activeComponent === 'Profile' && <Profile />}
          {activeComponent === 'Create' && <Create />}
          {activeComponent === 'Events' && (
            <div className="h-[calc(100vh-160px)] overflow-y-auto">
              {/* Limit height and allow scroll */}
              <Events />
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Filter Navigation and Find Component */}
      <div className="w-3/5 flex flex-col items-center justify-start bg-gray-100">
        <div className="w-full flex justify-center p-4">
          <FilterNav onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-grow w-full ">
          <Find filters={filters} />
        </div>
      </div>
    </div>
  );
}
