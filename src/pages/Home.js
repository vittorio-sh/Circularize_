import React, { useContext, useState } from 'react';
import { UserContext } from '@/pages/_app'; // Access global UserContext
import Nav from "@/components/Nav";
import Profile from "@/components/Profile";
import Create from "@/components/Create";
import Events from "@/components/Events";
import Find from "@/components/Find";
import FilterNav from "@/components/FilterNav";

export default function Home() {
  const { user } = useContext(UserContext); // Access user context
  const [activeComponent, setActiveComponent] = useState('Profile');
  const [filters, setFilters] = useState({ type: '', age: '', country: '' });
  const [isEditing, setIsEditing] = useState(false);  // Manage editing state in Home

  const handleAddComponent = (component) => {
    setActiveComponent(component);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="w-2/5 p-4">
          <Nav onAddComponent={handleAddComponent} />
          <div className="mt-6">
            {activeComponent === 'Profile' && (
              <Profile isEditing={isEditing} setIsEditing={setIsEditing} />
            )}
            {activeComponent === 'Create' && <Create />}
            {activeComponent === 'Events' && <Events />}
          </div>
        </div>

        <div className="w-3/5 flex flex-col items-center justify-start bg-gray-100 ">
          <div className="w-full flex justify-center bg-white p-4">
            <FilterNav onFilterChange={handleFilterChange} />
          </div>
          <div className="flex-grow w-full">
            <Find filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
}
