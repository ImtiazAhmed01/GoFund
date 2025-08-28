import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Provider/authProvider";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/login" />;


    return React.cloneElement(children, { user });
};

export default PrivateRoute;
