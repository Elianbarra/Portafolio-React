import NavBarHeader from "./NavBarHeader.jsx";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Contact from "./Contact.jsx";
import Home from "./home.jsx";
import Project from "./Projects.jsx";
import AboutMe from "./AboutMe.jsx";
const fondo2 = `${import.meta.env.BASE_URL}images/Fondo2.png`;
import "./Login.css";

function Login() {
      const [showLogin, setShowLogin] = useState(true);
      const [errorMessage, setErrorMessage] = useState("");

      useEffect(() => {
        setShowLogin(true);
      }, []);

const handleLogin = (event) => {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  var user = JSON.parse(localStorage.getItem(username));
  if (user !== null && user.password === password) {
    alert("¡Successful login!");
  } else {
    setErrorMessage(
      "The account does not exist or the credentials are incorrect. Try again."
    );
  }
};    

const handleRegister = (event) => {
  event.preventDefault();

  // Obtén los valores de los campos de entrada
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

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
    <>
      <div className="Login">
        <div>
          <div id="site-border-left"></div>
          <div id="site-border-right"></div>
          <div id="site-border-top"></div>
          <div id="site-border-bottom"></div>
          <NavBarHeader />

          <div className="section-container">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <img src={fondo2} className="img-responsive" alt="Login" />
                  <div className="card-container">
                    <div className="text-center">
                      <h1 className="h2">04: Login</h1>
                    </div>
                    <blockquote>
                      <p>
                      This project is made in react.jsx for login and registration.
                      </p>
                      <small></small>
                    </blockquote>
                    <div className="container form-wrapper">
                      <div className="form-container">
                        {showLogin ? (
                          <form id="login-form" onSubmit={handleLogin}>
                            <h2>Login</h2>
                            <div className="form-group">
                              <input
                                type="text"
                                id="login-username"
                                placeholder="Mail"
                                required
                                pattern=".+@.+"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="password"
                                id="login-password"
                                placeholder="Password"
                                required
                              />
                            </div>
                            <button type="submit">Login
                            
                            </button>
                            <p
                              id="login-error-message"
                              className="error-message"
                            >
                              {errorMessage}
                            </p>
                            <p>
                              ¿You do not have an account?{" "}
                              <Link to="/register">¡Sign up!</Link>
                            </p>
                          </form>
                        ) : (
                          <form id="register-form" onSubmit={handleRegister}>
                            <h2>Sign up</h2>
                            <div className="form-group">
                              <input
                                type="text"
                                id="register-username"
                                placeholder="Username"
                                required
                                pattern=".+@.+"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="password"
                                id="register-password"
                                placeholder="Password"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm Password"
                                required
                              />
                            </div>
                            <button type="submit">Sign up</button>
                            <p
                              id="register-error-message"
                              className="error-message"
                            ></p>
                            <p>
                              ¿You have an account?{" "}
                              <a href="#" onClick={() => setShowLogin(true)}>
                                ¡Login!
                              </a>
                            </p>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Project />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default Login;
