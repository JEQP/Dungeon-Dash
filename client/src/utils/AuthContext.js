import React from "react";

const AuthContext = React.createContext({
    email: "",
    isAuthenticated: false,
    changeEmail: () => {},
    changeAuthentication: () => {}
});

export default AuthContext; 