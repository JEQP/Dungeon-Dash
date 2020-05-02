import React from "react";
import "./style.css";
import Button from 'react-bootstrap/Button';

function Navbar(props) {
console.log("Navbar props: ", props);
    return (
        <div>
            <Button variant="primary" size="lg">Homepage</Button>
            <Button variant="danger" size="lg">Restart</Button>
        </div>
    );
}

export default Navbar;