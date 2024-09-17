import React, { useState, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/pages/_app'; 

export default function Profile() {
  const { user, setUser } = useContext(UserContext);  
  const [isEditing, setIsEditing] = useState(false);  
  const [loading, setLoading] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value }); 
  };

  const handleSave = async (event) => {
    event.preventDefault();  

    setLoading(true); // Start loading

    try {
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
      const updatedUser = { ...user };  
      setUser(updatedUser);  
      localStorage.setItem('user', JSON.stringify(updatedUser)); 

    } catch (error) {
      console.error('Error updating profile:', error);
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
        <h2 className="text-3xl font-bold mb-4 text-purple-600">Not Logged In</h2>
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-purple-500 text-center mb-6">Profile</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={user.firstName || ''} 
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-purple-200"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={user.lastName || ''}  
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-purple-200"
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={user.country || ''}  
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-purple-200"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={user.phoneNumber || ''}  
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-purple-200"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={user.address || ''}  
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-purple-200"
          />
        </div>
        <div>
          <Label htmlFor="zipCode">Zip/Postal Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={user.zipCode || ''}  
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-purple-200"
          />
        </div>
        <div>
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            id="birthday"
            name="birthday"
            value={user.birthday || ''} 
            onChange={handleInputChange}
            disabled={!isEditing}
            type="date"
            className="w-full mt-1 border-2 border-purple-200"
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={user.city || ''}  
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full mt-1 border-2 border-purple-200"
          />
        </div>
        <div className="col-span-2 flex justify-between mt-6">
          {isEditing ? (
            <Button
              onClick={handleSave}  
              className="bg-purple-500 text-white hover:bg-purple-600"
              disabled={loading}  // Disable the button if loading
            >
              {loading ? 'Saving...' : 'Save'}  
            </Button>
          ) : (
            <Button
              onClick={handleEdit}  // Enable editing
              className="bg-purple-200 text-purple-500 hover:bg-purple-300"
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
