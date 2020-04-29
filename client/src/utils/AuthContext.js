import React from "react";

const AuthContext = React.createContext({
    email: "",
    isAuthenticated: false,

    changeAuthentication: () => {}
});

export default AuthContext; 