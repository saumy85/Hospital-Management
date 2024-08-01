import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";

import { ChakraProvider } from "@chakra-ui/react";
import "simplebar/dist/simplebar.min.css";
export const Context = createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        userId,
        setUserId,
      }}
    >
      <App />
      <ToastContainer position="top-center" style={{ zIndex: "99999" }} />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppWrapper />
    </ChakraProvider>
  </React.StrictMode>
);
