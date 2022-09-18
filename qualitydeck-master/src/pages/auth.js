import { useState } from "react";
import "./css/auth.css";
import { Link } from "react-router-dom";

function Auth({ admin, setAdmin, password, setPassword, loggedin, setLogin }) {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const loginHandler = () => {
    if (admin === name && pwd === password) {
      setLogin(true);
      setMessage("Loggedin");
      setName("");
      setPwd("");
    } else {
      setMessage("Either name or password is incorrect.");
    }
  };

  if (!loggedin)
    return (
      <div className="Home content">
        <div className="credentials-container">
          <h3> Login </h3>
          <input
            placeholder="Name..."
            className="login-input"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            className="login-input"
            value={pwd}
            onChange={(event) => {
              setPwd(event.target.value);
            }}
          />

          <button className="login-btn" onClick={loginHandler}>
            Login
          </button>
        </div>
        <h3 className="message">{message}</h3>
      </div>
    );
  else {
    return (
      <div className="Home content">
        <div className="credentials-container">
          <h3> Change Password </h3>
          <input
            placeholder="Name..."
            className="login-input"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            className="login-input"
            value={pwd}
            onChange={(event) => {
              setPwd(event.target.value);
            }}
          />

          <div
            className="w-100 d-flex"
            style={{ justifyContent: "space-between" }}
          >
            <button
              className="login-btn"
              onClick={() => {
                setAdmin(name);
                setPassword(pwd);
                setLogin(false);
                setName("");
                setPwd("");
              }}
            >
              Change Password
            </button>
            <button
              className="login-btn"
              onClick={() => {
                setLogin(false);
              }}
            >
              Logout
            </button>
          </div>
          {loggedin ? (
            <Link to="/dashboard" className="li text-center mt-5">
              Go to the dashboard
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Auth;
