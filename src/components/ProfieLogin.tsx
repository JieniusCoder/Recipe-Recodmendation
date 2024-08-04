import {
  CodeResponse,
  googleLogout,
  useGoogleLogin, // Add this import
} from "@react-oauth/google";
import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

interface UserCredentials {
  uid: string; //user id
  accessToken: string; //auth token
  expirationTime: number; //time when the token expires
  refreshToken: string; //refresh token
}

interface Profile {
  uid: string;
  name: string|null;
  email: string|null;
  picture: string|undefined;
}

export default function ProfileLogin() {
  const [profile, setProfile] = useState<Profile>();
  const [userCredentials, setUserCredentials] = useState<UserCredentials>();
  
  //log in function from firebase website
  //https://firebase.google.com/docs/auth/web/google-signin
  const googleLogin = async () => {
    //Google login with Firebase
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user", user);
        console.log("token", token);
        console.log("photoURL", user.photoURL);
        //add the user info to the profile
        setProfile({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          picture: user.photoURL as string | undefined,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logOut = () => {
    googleLogout();
    setProfile(undefined);
  };

  return (
    <div className="Profie">
      {profile ? (
        <div>
          {<img src={profile.picture} alt="user" />}
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={googleLogin}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
