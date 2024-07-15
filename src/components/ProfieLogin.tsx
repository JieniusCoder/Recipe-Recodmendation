import {
  CodeResponse,
  googleLogout,
  useGoogleLogin// Add this import
} from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";

interface CredentialResponse {
  code: string; //auth token
  scope: string; //scope of the token
  state: string | undefined;
}

interface Profile {
  name: string;
  email: string;
  picture: string;
}

export default function ProfileLogin() {
  //google login
  const [user, setUser] = useState<CredentialResponse | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const login = useGoogleLogin({
    onSuccess: (
      codeResponse: Omit<
        CodeResponse,
        "error" | "error_description" | "error_uri"
      >
    ) => {
      const credentialResponse:CredentialResponse = {
        code: codeResponse.code,
        scope: codeResponse.scope,
        state: codeResponse.state,
      };
      setUser(credentialResponse);
      console.log("login success");
      console.log("code response");
      console.log(codeResponse);
      console.log(user);
      // console.log("credential response");
      // console.log(credentialResponse);
      // fetchProfile(credentialResponse);
    },
    onError: (
      errorResponse: Pick<
        CodeResponse,
        "error" | "error_description" | "error_uri"
      >
    ) => console.error("login failed:" + errorResponse.error),
  });

  // const fetchProfile = async (credentialResponse: CredentialResponse) => {
  //   try {
  //     const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
  //       headers: {
  //         'Authorization': `Bearer ${credentialResponse.code}`,  
  //       },
  //     });
  //     const data = await response.json();
  //     const profileData: Profile = {
  //       name: data.name,
  //       email: data.email,
  //       picture: data.picture,
  //     };
  //     setProfile(profileData);
  //   } catch (error) {
  //     console.error('Failed to fetch profile:', error);
  //   }
  // };

  useEffect(() => {
    console.log("useeffect called");
    console.log(user);
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.code}`,
          {
            headers: {
              Authorization: `Bearer ${user.code}`,
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

    <div className="Profie">
      <button onClick={login}>Sign in with Google 🚀 </button>
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
    </div>
  );
}
