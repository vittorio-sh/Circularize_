import React, { useState, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/pages/_app'; // Import UserContext to access user data

export default function Profile() {
  const { user, setUser } = useContext(UserContext);  // Access the user data from context
  const [isEditing, setIsEditing] = useState(false);  // Start in view mode
  const [loading, setLoading] = useState(false); // Optional loading state

  // Handle input changes directly on user data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });  // Directly update user context with the new input values
  };

  const handleSave = async (event) => {
    event.preventDefault();  // Prevent default form submission

    setLoading(true); // Start loading

    try {
      // Prepare the data in the correct format
      const data = {
        email: user.email,     // Email is required to find the user in the database
        updatedUser: user      // Send the entire updated user object
      };

      // Make an API request to update the database
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  // Send data to the backend
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // If successful, update the user in the context and localStorage
      const updatedUser = { ...user };  // Use the current user object
      setUser(updatedUser);  // Update the user context in App
      localStorage.setItem('user', JSON.stringify(updatedUser));  // Persist user data to localStorage

    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);  // End loading
      setIsEditing(false);  // Exit edit mode
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();  // Prevent default form submission
    setIsEditing(true);
  };
  if (!user) {
    return (
      <div className="p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Not Logged In</h2>
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

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
            value={user.firstName || ''}  // Access user context directly
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
            value={user.lastName || ''}  // Access user context directly
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
            value={user.country || ''}  // Access user context directly
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
            value={user.phoneNumber || ''}  // Access user context directly
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={user.address || ''}  // Access user context directly
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
            value={user.zipCode || ''}  // Access user context directly
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
            value={user.birthday || ''}  // Access user context directly
            onChange={handleInputChange}
            disabled={!isEditing}
            type="date"
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={user.city || ''}  // Access user context directly
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-blue-200"
          />
        </div>

        {/* Save/Cancel Buttons */}
        <div className="col-span-2 flex justify-between mt-6">
          {isEditing ? (
            <Button
              onClick={handleSave}  // Save changes and update the database
              className="bg-blue-500 text-white hover:bg-blue-600"
              disabled={loading}  // Disable the button if loading
            >
              {loading ? 'Saving...' : 'Save'}  {/* Optional loading indication */}
            </Button>
          ) : (
            <Button
              onClick={handleEdit}  // Enable editing
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
