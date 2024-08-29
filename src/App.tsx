import React, { useState, useEffect } from "react";
// import logo from './logo.avif';
import "./App.css";
import logo from "./money_sign.png";
import Posts from "./components/Screens/Post";
import { NavBar } from "./components/NavBar";
import Home from "./components/Screens/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
