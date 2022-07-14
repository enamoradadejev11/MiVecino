import React from "react";

const Context = React.createContext({
  user: {
    email: "",
    username: "",
    token: "",
  },
});

export default Context;
