import React, { useState, useEffect } from "react";
// import logo from './logo.avif';
import "./App.css";
import logo from "./money_sign.png";
import Posts from "./components/Post";
import { NavBar } from "./components/NavBar";
import ProfileLogin from "./components/ProfieLogin";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <header>Save Money and Time Finance Manager</header>
          {/* <Login /> */}
          <ProfileLogin />
        </header>

        <Posts />
      </div>
    </BrowserRouter>
  );
}

export default App;
