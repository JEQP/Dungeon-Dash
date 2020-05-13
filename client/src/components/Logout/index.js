import React from "react";
import AuthContext from "../../utils/AuthContext";
import "./style.css";



class Logout extends React.Component {

    logout = () => {
        localStorage.setItem("dungeondashuser", "");
        let value = this.context;
        value.changeAuthentication(false, "");
        console.log("logged out");
    }

    render() {
    return (
        <div id="logout">
            <p onClick={this.logout}>Log Out &nbsp;</p>
        </div>
    )
}
}

export default Logout;
Logout.contextType = AuthContext;