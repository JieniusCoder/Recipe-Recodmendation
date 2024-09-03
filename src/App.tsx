import React, { useState, useEffect } from "react";
// import logo from './logo.avif';
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./components/Screens/About";
import Upload from "./components/Screens/Upload";
import Reports from "./components/Screens/Reports";
import Contact from "./components/Screens/Contact";
import { UserProvider, useUser } from "./components/UserContext";
import Login from "./components/Screens/Login";

import duckImage from "./assets/duck.png";

const App: React.FC = () => {
  const { user, logout } = useUser();

  const aboutRef = React.useRef<HTMLDivElement>(null);
  const uploadRef = React.useRef<HTMLDivElement>(null);
  const reportsRef = React.useRef<HTMLDivElement>(null);
  const contactRef = React.useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          {
            <img
              src={duckImage}
              alt="user"
              style={{ width: "200px", height: "200px" }}
            />
          }
          <h3>User Logged in</h3>
          <h3>Name: {user.name}</h3>
          <h3>Email Address: {user.email}</h3>
          <br />
          <br />
          <button onClick={logout}>Log out</button>
          <NavBar
            onNavigate={(section: string) => {
              if (section === "about") scrollToSection(aboutRef);
              if (section === "upload") scrollToSection(uploadRef);
              if (section === "reports") scrollToSection(reportsRef);
              if (section === "contact") scrollToSection(contactRef);
            }}
          />
          <div ref={aboutRef}>
            <About />
          </div>
          <div ref={uploadRef}>
            <Upload />
          </div>
          <div ref={reportsRef}>
            <Reports />
          </div>
          <div ref={contactRef}>
            <Contact />
          </div>
        </div>
      ) : (
        // add the login screen
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default App;
