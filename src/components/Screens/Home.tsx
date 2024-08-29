// the main screen that includes all screens
import NavBar from "../NavBar";
import { useUser } from "../UserContext";
import Login from "./Login";
import duckImage from "../../assets/duck.png";

export default function Dashboard() {
  const { user, logout } = useUser();

  return (
    <div className="Profie">
      {user ? (
        <div>
          {<img src={duckImage} alt="user"  style={{width: '200px', height: "200px"}}/>}
          <h3>User Logged in</h3>
          <h3>Name: {user.name}</h3>
          <h3>Email Address: {user.email}</h3>
          <br/>
          <br/>
          <button onClick={logout}>Log out</button>
          <br/><br/><br/>
          <NavBar />
        </div>
      ) : (
        // add the login screen
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}
