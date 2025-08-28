import React, { useEffect, useState } from "react";
import axios from "axios";

const Alluser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user permanently?")) {
            try {
                await axios.delete(`http://localhost:5000/users/${id}`);
                setUsers(users.filter((user) => user._id !== id));
                alert("User deleted successfully!");
            } catch (err) {
                alert("Failed to delete user");
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td className="p-2 border">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{user.userRole}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Alluser;
