
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/authProvider';
import Swal from 'sweetalert2';

const AdminUser = () => {
    const { user } = useContext(AuthContext);
    const [adminData, setAdminData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchAdminData = async () => {
            if (user?.email) {
                try {
                    const email = user.email.toLowerCase();
                    const url = `http://localhost:5000/users/${email}`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    const data = await response.json();

                    if (data.userRole !== "Admin") {
                        setError("Access denied. Only Admins can view this page.");
                        return;
                    }

                    setAdminData({
                        fullName: data.fullName || user?.displayName || "N/A",
                        userRole: data.userRole || "N/A",
                        phone: data.phone || "N/A",
                        email: user.email,
                        profilePic: user.photoURL || "/assets/placeholder.png",
                        bio: data.bio || "No bio yet",
                        address: data.address || "No address yet",
                        university: data.university || "Not specified",
                    });
                } catch (err) {
                    setError(err.message);
                }
            }
        };
        fetchAdminData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData((prev) => ({ ...prev, [name]: value }));
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
                    fullName: adminData.fullName,
                    bio: adminData.bio,
                    phone: adminData.phone,
                    address: adminData.address,
                    profilePic: adminData.profilePic,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            await response.json();
            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                text: "Your admin profile has been updated successfully ✅",
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
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!adminData) return <p>Loading profile...</p>;

    return (
        <div className=" mx-auto pt-6">
            <div className="bg-gradient-to-br  dark:from-gray-800 dark:to-gray-900 shadow-xl overflow-hidden">

                <div className="h-40 bg-gradient-to-r from-purple-600 to-pink-600 relative">
                    <div className="absolute -bottom-16 left-6">
                        <div className="relative">
                            <img
                                src={adminData.profilePic}
                                alt="Admin Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="absolute top-4 right-4">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 text-purple-600 dark:text-purple-400 rounded-full shadow-md hover:bg-white transition-all"
                            >
                                ✏️ Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition-all"
                            >
                                ✅ Save Changes
                            </button>
                        )}
                    </div>
                </div>

                <div className="pt-20 px-6 pb-8">
                    <div className="flex flex-col md:flex-row gap-8">

                        <div className="md:w-1/3 space-y-6">
                            <div>
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={adminData.fullName}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-xl shadow-sm bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-purple-500"
                                    />
                                ) : (
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{adminData.fullName}</h2>
                                )}


                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Bio</label>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        value={adminData.bio}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-xl shadow-sm bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-purple-500"
                                        rows="3"
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300">{adminData.bio}</p>
                                )}
                            </div>
                        </div>

                        <div className="md:w-2/3 space-y-6">

                            <div className="bg-white/80 dark:bg-gray-700/80 p-5 rounded-xl shadow-sm">
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Role</label>
                                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">{adminData.userRole}</p>
                            </div>

                            <div className="bg-white/80 dark:bg-gray-700/80 p-5 rounded-xl shadow-sm">
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Email</label>
                                <p className="text-lg text-gray-800 dark:text-white break-all">{adminData.email}</p>
                            </div>

                            <div className="bg-white/80 dark:bg-gray-700/80 p-5 rounded-xl shadow-sm">
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={adminData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-lg shadow-sm bg-white/90 dark:bg-gray-600/90 focus:ring-2 focus:ring-purple-500"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-800 dark:text-white">{adminData.phone}</p>
                                )}
                            </div>

                            <div className="bg-white/80 dark:bg-gray-700/80 p-5 rounded-xl shadow-sm">
                                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Address</label>
                                {isEditing ? (
                                    <textarea
                                        name="address"
                                        value={adminData.address}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-lg shadow-sm bg-white/90 dark:bg-gray-600/90 focus:ring-2 focus:ring-purple-500"
                                        rows="2"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-800 dark:text-white">{adminData.address}</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUser;
