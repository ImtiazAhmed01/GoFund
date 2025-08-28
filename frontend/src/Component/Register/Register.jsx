// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
// import { Bounce, toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../Provider/authProvider";

// const Register = () => {
//     const { signInWithGoogle } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [passwordError, setPasswordError] = useState("");
//     const [formErrors, setFormErrors] = useState({});

//     const handleGoogleSignIn = async () => {
//         try {
//             const result = await signInWithGoogle();
//             const user = result.user;

//             if (user) {
//                 const newUser = {
//                     displayName: user.displayName || "Google User",
//                     photoURL: user.photoURL || "https://i.ibb.co/default-user.png",
//                     email: user.email,
//                     firstName: user.displayName?.split(" ")[0] || "Google",
//                     lastName: user.displayName?.split(" ")[1] || "User",
//                     registrationDate: new Date().toISOString(),
//                 };

//                 const serverResponse = await fetch("http://localhost:5000/users", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(newUser),
//                 });

//                 if (!serverResponse.ok) {
//                     const errorData = await serverResponse.json();
//                     throw new Error(errorData.message || "Failed to register user.");
//                 }

//                 toast.success("Logged in with Google successfully!");
//                 navigate("/");
//             }
//         } catch (error) {
//             console.error("Google login failed:", error.message);
//             toast.error("Google login failed. Please try again.");
//         }
//     };

//     const validatePassword = (password) => {
//         const hasUppercase = /[A-Z]/.test(password);
//         const hasLowercase = /[a-z]/.test(password);
//         const isLongEnough = password.length >= 6;

//         if (!hasUppercase) {
//             setPasswordError("Password must contain at least one uppercase letter.");
//             return false;
//         }
//         if (!hasLowercase) {
//             setPasswordError("Password must contain at least one lowercase letter.");
//             return false;
//         }
//         if (!isLongEnough) {
//             setPasswordError("Password must be at least 6 characters long.");
//             return false;
//         }

//         setPasswordError("");
//         return true;
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         const fname = e.target.fname.value.trim();
//         const lname = e.target.lname.value.trim();
//         const email = e.target.email.value.trim();
//         const password = e.target.password.value;
//         const imageURL = e.target.imageURL.value.trim() || "https://i.ibb.co/default-user.png";

//         const errors = {};
//         if (!fname) errors.fname = "First name is required.";
//         if (!lname) errors.lname = "Last name is required.";
//         if (!email) errors.email = "Email is required.";
//         if (!password) errors.password = "Password is required.";

//         if (Object.keys(errors).length > 0) {
//             setFormErrors(errors);
//             return;
//         }

//         if (!validatePassword(password)) return;

//         try {
//             const auth = getAuth();
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             await updateProfile(user, {
//                 displayName: `${fname} ${lname}`,
//                 photoURL: imageURL,
//             });

//             const newUser = {
//                 firstName: fname,
//                 lastName: lname,
//                 email: email,
//                 displayName: `${fname} ${lname}`,
//                 photoURL: imageURL,
//                 registrationDate: new Date().toISOString(),
//             };

//             const serverResponse = await fetch("http://localhost:5000/users", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(newUser),
//             });

//             if (!serverResponse.ok) {
//                 const errorData = await serverResponse.json();
//                 throw new Error(errorData.message || "Registration failed.");
//             }

//             toast.success("Registration successful!");
//             navigate("/");
//         } catch (error) {
//             console.error("Registration error:", error.message);
//             toast.error("Registration failed. Please try again.");
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-50  dark:bg-gray-900 dark:text-white py-12 px-4">
//             <ToastContainer transition={Bounce} />
//             <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold text-center text-gray-800">Create an account</h2>
//                 <form onSubmit={handleRegister} className="space-y-4">
//                     <input type="text" name="fname" placeholder="First Name" className="input input-bordered w-full" />
//                     {formErrors.fname && <p className="text-red-500 text-sm">{formErrors.fname}</p>}

//                     <input type="text" name="lname" placeholder="Last Name" className="input input-bordered w-full" />
//                     {formErrors.lname && <p className="text-red-500 text-sm">{formErrors.lname}</p>}

//                     <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
//                     {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

//                     <div className="relative">
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             placeholder="Password"
//                             className="input input-bordered w-full"
//                         />
//                         <span
//                             className="absolute right-3 top-3 cursor-pointer"
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? "🙈" : "👁️"}
//                         </span>
//                     </div>
//                     {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

//                     <input type="text" name="imageURL" placeholder="Photo URL (optional)" className="input input-bordered w-full" />

//                     <button type="submit" className="btn btn-primary w-full">Register</button>
//                 </form>

//                 <div className="divider">OR</div>

//                 <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">Continue with Google</button>

//                 <p className="text-center text-sm mt-4">
//                     Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Register;


import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/authProvider";

const Register = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
                const newUser = {
                    displayName: user.displayName || "Google User",
                    photoURL: user.photoURL || "https://i.ibb.co/default-user.png",
                    email: user.email,
                    firstName: user.displayName?.split(" ")[0] || "Google",
                    lastName: user.displayName?.split(" ")[1] || "User",
                    registrationDate: new Date().toISOString(),
                };

                // Save in backend (don’t block redirect if it fails)
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser),
                }).catch(err => console.error("Backend save failed:", err));

                toast.success("Logged in with Google successfully!");
                navigate("/"); // 🔥 redirect immediately
            }
        } catch (error) {
            console.error("Google login failed:", error.message);
            toast.error("Google login failed. Please try again.");
        }
    };

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase) return setPasswordError("Password must contain at least one uppercase letter."), false;
        if (!hasLowercase) return setPasswordError("Password must contain at least one lowercase letter."), false;
        if (!isLongEnough) return setPasswordError("Password must be at least 6 characters long."), false;

        setPasswordError("");
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const fname = e.target.fname.value.trim();
        const lname = e.target.lname.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const imageURL = e.target.imageURL.value.trim() || "https://i.ibb.co/default-user.png";

        const errors = {};
        if (!fname) errors.fname = "First name is required.";
        if (!lname) errors.lname = "Last name is required.";
        if (!email) errors.email = "Email is required.";
        if (!password) errors.password = "Password is required.";

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        if (!validatePassword(password)) return;

        try {
            // 🔥 Use createUser from AuthContext instead of raw Firebase
            const newUser = await createUser(email, password, {
                displayName: `${fname} ${lname}`,
                photoURL: imageURL,
            });

            // Save in backend (fire-and-forget)
            fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: fname,
                    lastName: lname,
                    email,
                    displayName: `${fname} ${lname}`,
                    photoURL: imageURL,
                    registrationDate: new Date().toISOString(),
                }),
            }).catch(err => console.error("Backend save failed:", err));

            toast.success("Registration successful!");
            navigate("/"); // 🔥 redirect immediately
        } catch (error) {
            console.error("Registration error:", error.message);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 dark:text-white py-12 px-4">
            <ToastContainer transition={Bounce} />
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" name="fname" placeholder="First Name" className="input input-bordered w-full" />
                    {formErrors.fname && <p className="text-red-500 text-sm">{formErrors.fname}</p>}

                    <input type="text" name="lname" placeholder="Last Name" className="input input-bordered w-full" />
                    {formErrors.lname && <p className="text-red-500 text-sm">{formErrors.lname}</p>}

                    <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

                    <input type="text" name="imageURL" placeholder="Photo URL (optional)" className="input input-bordered w-full" />

                    <button type="submit" className="btn btn-primary w-full">Register</button>
                </form>

                <div className="divider">OR</div>

                <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">Continue with Google</button>

                <p className="text-center text-sm mt-4">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
