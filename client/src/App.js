import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./Router"; // Ensure Router is imported correctly
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
