// Screen to prompt user to login

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useUser } from "../UserContext";
import TicTacToe from "./TicTacToe";
import { TypeAnimation } from "react-type-animation";

export default function Dashboard() {
  const { setUser } = useUser();

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
        const response = result.user;
        setUser({
          uid: response.uid,
          name: response.displayName,
          email: response.email,
          picture: response.photoURL as string | undefined,
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

  return (
    <div>
      <div style={{marginBottom: "30px", marginTop: "30px"}}>
        <TypeAnimation
          sequence={[
            "Welcome to Jie's Finance Manager!",
            1000,
            "Please sign in below to continue...",
            1000,
            "If you don't sign in",
            1000,
            "I will hate you forever!",
            1000,
          ]}
          speed={50}
          repeat={Infinity}
          style={{ 
            fontSize: "30px" , 
            color: "black", 
            textAlign: "center",
            borderBottom: "1px solid black",
          }}
        />
      </div>
      <button onClick={googleLogin}>Sign in with Google 🚀 </button>
      <h3>Or play a game of Tic Tac Toe</h3>
      <TicTacToe />
    </div>
  );
}
