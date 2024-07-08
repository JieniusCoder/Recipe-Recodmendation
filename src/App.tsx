import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";
import { ReactComponent as Logo } from "./logo.svg";
import Posts from "./components/Post";
import { GoogleLogin, googleLogout, useGoogleLogin, CodeResponse } from "@react-oauth/google";
import axios from "axios";

interface credentialResponse {
  code: string; //auth token
  scope: string; //scope of the token
  state: string|undefined; 
}

interface Profile{
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

function App() {
  //google login
  const [user, setUser] = useState<credentialResponse | null>(null);
  const [profile, setProfile] = useState<Profile|null> (null);

  const responseMessage = (response:any) => {
    console.log("responseMessage", response);
  }

  const errorMessage = () => {
    console.log("errorMessage");
  }

  const login = useGoogleLogin({
    onSuccess:(codeResponse:Omit<CodeResponse, "error" | "error_description" | "error_uri">) => {
      const credentialResponse= {
        code: codeResponse.code,
        scope: codeResponse.scope,
        state: codeResponse.state,
      };
    setUser(credentialResponse);
  },
    onError:(errorResponse: Pick<CodeResponse, "error" | "error_description" | "error_uri">) => 
      console.error("login failed: + errorResponse.error")
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.code}`,
          {
            headers: {
              Authorization: "Bearer ${user.access_token}",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  //end google login

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={"/logo.svg"} className="App-logo" alt="logo" /> */}
        <Logo style={{ height: 200 }} />
        <header>Save Money and Time Finance Manager</header>
        {/* {profile ? (
                <div>
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )} */}
        <div>
          <h2>Google Login</h2>
          <GoogleLogin onSuccess={login} onError={} />
        </div>
      </header>
      <Posts />
    </div>
  );
}

export default App;
