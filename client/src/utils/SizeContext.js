import React from "react";

const SizeContext = React.createContext({
    matches: false,

    changeSize: () => {}
});

export default SizeContext; 