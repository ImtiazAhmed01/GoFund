
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/authProvider';
import Swal from 'sweetalert2'
const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                try {
                    const email = user.email.toLowerCase();
                    const url = `http://localhost:5000/users/${email}`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    const data = await response.json();
                    setUserData({
                        fullName: data.fullName || user?.displayName || "N/A",
                        userRole: data.userRole || "N/A",
                        phone: data.phone || "N/A",
                        email: user.email,
                        profilePic: user.photoURL || "/assets/placeholder.png",
                        bio: data.bio || "No bio yet",
                        address: data.address || "No address yet",
                        university: data.university || "You can not change this field",
                    });
                } catch (err) {
                    setError(err.message);
                }
            }
        };
        fetchUserData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsEditing(false);
        try {
            const response = await fetch(`http://localhost:5000/users/${user.email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: userData.fullName,
                    bio: userData.bio,
                    phone: userData.phone,
                    address: userData.address,
                    profilePic: userData.profilePic,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const result = await response.json();
            console.log(result.message);
            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                text: "Your profile has been updated successfully ✅",
                confirmButtonColor: "#3085d6",
            });

        } catch (err) {
            console.error("Error updating profile:", err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "There was an error updating your profile ❌",
                confirmButtonColor: "#d33",
            });
        }
    };

    if (!user) return <p>Loading user...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!userData) return <p>Loading profile...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl overflow-hidden">

                {/* Header with Cover */}
                <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    <div className="absolute -bottom-16 left-6">
                        <div className="relative">
                            <img
                                src={userData.profilePic}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="absolute top-4 right-4">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 rounded-full shadow-md hover:bg-white transition-all"
                            >
                                ✏️ Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
                            >
                                ✅ Save Changes
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="pt-20 px-6 pb-8">
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* Left Column */}
                        <div className="md:w-1/3 space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={userData.fullName}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-xl shadow-sm bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{userData.fullName}</h2>
                                )}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Bio</label>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        value={userData.bio}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-xl shadow-sm bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300">{userData.bio}</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:w-2/3 space-y-6">

                            <div className="bg-white/80 dark:bg-gray-700/80 p-5 rounded-xl shadow-sm">
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Your current role</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="userRole"
                                        readOnly
                                        value={userData.university}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-lg shadow-sm bg-white/90 dark:bg-gray-600/90 focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-800 dark:text-white">{userData.userRole}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="bg-white/80 dark:bg-gray-700/80 p-5 rounded-xl shadow-sm">
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Email</label>
                                <p className="text-lg text-gray-800 dark:text-white break-all">{userData.email}</p>
                            </div>

                            {/* Phone */}
                            <div className="bg-white/80 dark:bg-gray-700/80 p-5 rounded-xl shadow-sm">
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-lg shadow-sm bg-white/90 dark:bg-gray-600/90 focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-800 dark:text-white">{userData.phone}</p>
                                )}
                            </div>

                            {/* Address */}
                            <div className="bg-white/80 dark:bg-gray-700/80 p-5 rounded-xl shadow-sm">
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Address</label>
                                {isEditing ? (
                                    <textarea
                                        name="address"
                                        value={userData.address}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-lg shadow-sm bg-white/90 dark:bg-gray-600/90 focus:ring-2 focus:ring-blue-500"
                                        rows="2"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-800 dark:text-white">{userData.address}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
