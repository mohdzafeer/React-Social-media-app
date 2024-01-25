import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {useNavigate}from "react-router-dom"
export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate=useNavigate();
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar">
      <div className="link">
        <Link className="linkinlink" to="/">
          Home
        </Link>
        {!user ? <Link className="linkinlink" to="/login">
          Login
        </Link>:
        <Link className="linkinlink" to="/createpost">
        Create post
      </Link>}
        
      </div>
      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width="40" height="40"></img>
            <button className="logoutbtn" onClick={event=>{
              signUserOut();
              navigate("/login");
            }}>
              {" "}
              Log Out
              
            </button>
          </>
        )}
      </div>
    </div>
  );
};
