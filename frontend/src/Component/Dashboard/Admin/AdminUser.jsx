import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    // Fetch users with search functionality
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users?search=${search}`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [search]);

    const handleMakeAdmin = async (email) => {
        try {
            await axios.put(`http://localhost:5000/users/${email}`, { userRole: 'Admin' });
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.email === email ? { ...user, userRole: 'Admin' } : user
                )
            );
            toast.success('Make Admin successful!', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error('Error making admin:', error);
        }
    };

    return (
        <div className=' dark:bg-gray-900 dark:text-white'>
            <h1>All Users</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by username or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />

            {/* User Table */}
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">User Image</th>
                        <th className="border px-4 py-2">Make Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.fullName}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                <img src={user.photoURL} alt={user.username} className="h-12 w-12 rounded-full" />
                            </td>
                            <td className="border px-4 py-2">
                                {/* Only show button if user is not already admin */}
                                {user.userRole !== 'Admin' && (
                                    <button
                                        onClick={() => handleMakeAdmin(user.email)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Make Admin
                                    </button>
                                )}
                                {user.userRole === 'Admin' && (
                                    <button
                                        disabled
                                        className="bg-gray-300 text-white px-4 py-2 rounded"
                                    >
                                        Admin
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;