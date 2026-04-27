import NavBarHeader from "./NavBarHeader.jsx";
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import "./register.css";


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (localStorage.getItem(username)) {
      setErrorMessage("The username is already in use.");
    } else {
      localStorage.setItem(
        username,
        JSON.stringify({ username: username, password: password })
      );
      alert("Successful registration! Please log in with your new account.");
    }
  };

  return (

        <div>
          <div id="site-border-left"></div>
          <div id="site-border-right"></div>
          <div id="site-border-top"></div>
          <div id="site-border-bottom"></div>
          <NavBarHeader />
        <div className="bodyregister">
        <div className="container form-wrapper">
        <div className="form-container-register">
        <form id="register-form" onSubmit={handleRegister}>
          <h2>Sign up</h2>
          <div className="form-group-register">
            <input
              type="text"
              id="register-username"
              placeholder="Mail"
              required
              pattern=".+@.+"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group-register">
            <input
              type="password"
              id="register-password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group-register">
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign up</button>
          <p className="error-message">{errorMessage}</p>
          <p>
            ¿You have an account?{" "}
            <Link to="/login">¡Login!</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
    </div>

  );
}

export default Register;