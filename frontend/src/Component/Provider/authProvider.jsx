import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../../firebase.init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = async (email, password, userDetails) => {
        try {
            const nameParts = userDetails.displayName.split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ") || "-";

            const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + "/auth/register", {
                firstName,
                lastName,
                email,
                password,
                photoURL: userDetails.photoURL
            });
            const { token, user: newUser } = res.data;

            setUser({ ...newUser, displayName: newUser.fullName });
            localStorage.setItem("userProfile", JSON.stringify({ ...newUser, displayName: newUser.fullName }));
            localStorage.setItem("jwt_token", token);
            return newUser;
        } catch (error) {
            console.error("Error creating user:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    };

    const updateUserProfile = async (updatedUser) => {
        try {
            if (user) {
                // To keep it simple, just update local state.
                const updatedProfile = {
                    ...user,
                    displayName: updatedUser.displayName,
                    photoURL: updatedUser.photoURL,
                };
                setUser(updatedProfile);
                localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
            throw error;
        }
    };

    const signOutUser = async () => {
        try {
            setUser(null);
            localStorage.removeItem("userProfile");
            localStorage.removeItem("jwt_token");
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Sign-out error:", error.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const fbUser = result.user;
            // Optionally, map to our backend JWT here, but for now just mock Google success
            const mockUser = {
                displayName: fbUser.displayName,
                email: fbUser.email,
                photoURL: fbUser.photoURL,
                userRole: "User",
            };
            setUser(mockUser);
            localStorage.setItem("userProfile", JSON.stringify(mockUser));
            return mockUser;
        } catch (error) {
            console.error("Google Sign-In error:", error.message);
            throw error;
        }
    };

    const signInUser = async (email, password) => {
        try {
            const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + "/auth/login", { email, password });
            const { token, user: loggedInUser } = res.data;
            const updatedUser = { ...loggedInUser, displayName: loggedInUser.fullName };
            setUser(updatedUser);
            localStorage.setItem("userProfile", JSON.stringify(updatedUser));
            localStorage.setItem("jwt_token", token);
            return updatedUser;
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                createUser,
                signInUser,
                signOutUser,
                signInWithGoogle,
                updateUserProfile,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
