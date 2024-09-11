import { useState } from 'react';

export default function Nav({ onAddComponent }) {
  const [activeComponent, setActiveComponent] = useState('Events');

  const handleNavClick = (component) => {
    setActiveComponent(component);
    onAddComponent(component);
  };

  return (
    <div className="w-full">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <nav className="flex gap-6 text-lg font-medium justify-center flex-1">
          <button
            className={`nav-button ${
              activeComponent === 'Profile' ? 'active' : ''
            }`}
            onClick={() => handleNavClick('Profile')}
          >
            Profile
          </button>
          <button
            className={`nav-button ${
              activeComponent === 'Events' ? 'active' : ''
            }`}
            onClick={() => handleNavClick('Events')}
          >
            Events
          </button>
          <button
            className={`nav-button ${
              activeComponent === 'Create' ? 'active' : ''
            }`}
            onClick={() => handleNavClick('Create')}
          >
            Create
          </button>
        </nav>
      </header>
    </div>
  );
}
