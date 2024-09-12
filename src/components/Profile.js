import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/pages/_app'; // Access global UserContext
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function Profile() {
  const { user, setUser } = useContext(UserContext); // Access user and setUser from context
  const [profile, setProfile] = useState(user); // Create a local copy of user data
  const [isEditing, setIsEditing] = useState(false); // Manage editing state within Profile

  // Sync local profile with user context only on mount or when user context changes
  useEffect(() => {
    setProfile(user);
  }, [user]);

  // Handle input changes for local profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value }); // Update local state
  };

  // Save changes to global state (context) only when Save is clicked
  const handleSave = () => {
    setUser(profile); // Update global user context
    localStorage.setItem('user', JSON.stringify(profile)); // Optionally persist to local storage
    setIsEditing(false); // Exit edit mode
  };

  // Cancel editing and reset profile to match original user context data
  const handleCancel = () => {
    setProfile(user); // Reset local profile to original context data
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">Profile</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Last Name */}
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={profile.country}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={profile.city}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Zip/Postal Code */}
        <div>
          <Label htmlFor="zipCode">Zip/Postal Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={profile.zipCode}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Birthday */}
        <div>
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            id="birthday"
            name="birthday"
            value={profile.birthday}
            onChange={handleInputChange}
            disabled={!isEditing}
            type="date"
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Save/Cancel Buttons */}
        <div className="col-span-2 flex justify-between mt-6">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-600">
                Save
              </Button>
              <Button onClick={handleCancel} className="bg-gray-500 text-white hover:bg-gray-600">
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-200 text-blue-500 hover:bg-blue-300"
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default React.memo(Profile);
