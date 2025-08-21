
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/authProvider";
import { ThemeContext } from "../Provider/ThemeProvider";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    const handleLogout = async () => {
        try {
            await signOutUser();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout error:", error.message);
            alert("Failed to log out. Please try again.");
        }
    };

    useEffect(() => {
        if (user?.email) {
            const email = user.email.toLowerCase();
            const url = `http://localhost:5000/users/${email}`;
            console.log("Fetching URL:", url);
            fetch(url)
                .then((response) => {
                    console.log(`Status: ${response.status}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("API Response Data:", data);
                    setUserRole(data.userRole);
                })
                .catch((error) => {
                    console.error("Error fetching user role:", error);
                    setUserRole(null);
                });
        } else {
            setUserRole(null);
        }
    }, [user]);

    const dashboardLink = () => {
        if (userRole === "User") return "/dashboard/myprofile";
        if (userRole === "Admin") return "/dashboard/admin";
        return null;
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const links = (
        <>
            <li>
                <NavLink to="/" activeclassname="active">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/campaigns" activeclassname="active">
                    All Campaign
                </NavLink>
            </li>
            {user && user.displayName && (
                <>
                    <li>
                        <NavLink to="/addCampaign" activeclassname="active">
                            Add New Campaign
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myCampaign" activeclassname="active">
                            My Campaign
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/donation" activeclassname="active">
                            My Donations
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className={darkMode ? "bg-black text-white" : "bg-white text-black"}>
            {user && user.displayName && (
                <div
                    className={darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}
                    style={{ transition: "background 0.3s, color 0.3s" }}
                >
                    <span className="text-sm font-medium">Welcome, {user.displayName}!</span>
                </div>
            )}

            <div
                className={`navbar ${darkMode ? "bg-gray-900 text-white" : "bg-base-100 text-black"} -mb-7`}
                style={{ transition: "background 0.3s, color 0.3s" }}
            >
                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${darkMode ? "bg-gray-800 text-white" : "bg-base-100 text-black"
                                }`}
                        >
                            {links}
                        </ul>
                    </div>
                    <NavLink to="/" className="btn btn-ghost normal-case md:text-xl font-bold">
                        GoFund
                    </NavLink>
                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-4 flex items-center relative">
                    {user ? (
                        <div className="relative group flex gap-4" onClick={toggleDropdown}>
                            <button onClick={toggleTheme} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">
                                {darkMode ? "Light Mode" : "Dark Mode"}
                            </button>
                            <img src={user.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full cursor-pointer" />
                            {dropdownOpen && (
                                <div
                                    className={`absolute right-0 mt-2 w-48 shadow-lg rounded-md py-2 z-10 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                                        }`}
                                >
                                    <div className="px-4 py-2 text-sm">
                                        <p className="font-bold">{user.displayName}</p>
                                        <p>{user.email}</p>
                                    </div>
                                    <hr />
                                    {dashboardLink() && (
                                        <NavLink
                                            to={dashboardLink()}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Dashboard
                                        </NavLink>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={toggleTheme}
                                className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"}`}
                            >
                                {darkMode ? "Light Mode" : "Dark Mode"}
                            </button>
                            <NavLink to="/register" className="btn btn-outline btn-success">
                                Sign Up
                            </NavLink>
                            <NavLink to="/login" className="btn btn-outline btn-success">
                                Log In
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
