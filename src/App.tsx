import React, { useState, useEffect } from "react";
// import logo from './logo.avif';
import "./App.css";
import logo from "./money_sign.png";
import Posts from "./components/Screens/Post";
import { NavBar } from "./components/NavBar";
import Home from "./components/Screens/Home";
import About from "./components/Screens/About";
import Upload from "./components/Screens/Upload";
import Reports from "./components/Screens/Reports";
import Contact from "./components/Screens/Contact";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="home" element={<About />} />
          <Route path="about" element={<Upload />} />
          <Route path="upload" element={<Reports />} />
          <Route path="reports" element={<Contact />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
