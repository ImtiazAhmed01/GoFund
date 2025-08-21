// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../Provider/authProvider';

// const MyProfile = () => {
//     const { user } = useContext(AuthContext);
//     const [userData, setUserData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (user?.email) {
//                 try {
//                     const response = await fetch(`http://localhost:5000/user/role?email=${user.email}`);
//                     if (!response.ok) {
//                         const errorText = await response.text();
//                         throw new Error(`Server error: ${errorText}`);
//                     }
//                     const data = await response.json();
//                     console.log('Fetched user role:', data.userRole);
//                     setUserData({ userRole: data.userRole, fullName: data.fullName, phone: data.phone });
//                 } catch (error) {
//                     console.error('Error fetching user data:', error.message);
//                     setError(error.message);
//                 }
//             }
//         };
//         fetchUserData();
//     }, [user]);

//     if (!user) {
//         return <p>Loading user data...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div className="p-6  dark:bg-gray-900 dark:text-white">
//             <h1 className="text-2xl text-gray-700 mb-8 animate-slide-in">
//                 Welcome to EduManage, {user?.displayName || 'User'}!
//             </h1>
//             <div className="lg:flex justify-center items-center mt-8">
//                 <img
//                     src={user?.photoURL || '/assets/placeholder.png'}
//                     alt="User profile"
//                     className="w-36 h-36 rounded-lg object-cover border-4 border-gray-700 transition-transform hover:scale-105 mr-8"
//                 />
//                 <div className="text-left text-gray-600">
//                     <p>
//                         <strong className="text-red-500">Name:</strong> {userData?.fullName || 'N/A'}</p>
//                     <p> <strong className="text-red-500">Role:</strong> {userData?.userRole || 'N/A'}
//                     </p>
//                     <p>
//                         <strong className="text-red-500">Email:</strong> {user?.email || 'N/A'}
//                     </p>
//                     <p>
//                         <strong className="text-red-500">Phone:</strong> {userData?.phone || 'N/A'}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyProfile;
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/authProvider';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                try {
                    const email = user.email.toLowerCase();
                    const url = `http://localhost:5000/users/${email}`;
                    console.log('Fetching URL:', url);
                    const response = await fetch(url);
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Server error: ${response.status} - ${errorText}`);
                    }
                    const data = await response.json();
                    console.log('Fetched user data:', data);
                    setUserData({
                        userRole: data.userRole || 'N/A',
                        fullName: data.fullName || 'N/A',
                        phone: data.phone || 'N/A'
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                    setError(error.message);
                }
            }
        };
        fetchUserData();
    }, [user]);

    if (!user) {
        return <p>Loading user data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-6 dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl text-gray-700 mb-8 animate-slide-in">
                Welcome to EduManage, {user?.displayName || 'User'}!
            </h1>
            <div className="lg:flex justify-center items-center mt-8">
                <img
                    src={user?.photoURL || '/assets/placeholder.png'}
                    alt="User profile"
                    className="w-36 h-36 rounded-lg object-cover border-4 border-gray-700 transition-transform hover:scale-105 mr-8"
                />
                <div className="text-left text-gray-600">
                    <p>
                        <strong className="text-red-500">Name:</strong> {userData?.fullName || 'N/A'}
                    </p>
                    <p>
                        <strong className="text-red-500">Role:</strong> {userData?.userRole || 'N/A'}
                    </p>
                    <p>
                        <strong className="text-red-500">Email:</strong> {user?.email || 'N/A'}
                    </p>
                    <p>
                        <strong className="text-red-500">Phone:</strong> {userData?.phone || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;