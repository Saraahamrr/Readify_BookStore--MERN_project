import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Signup() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!values.username) errors.username = "Username is required";
    else if (/\s/.test(values.username))
      errors.username = "Username must not contain spaces";

    if (!values.email) errors.email = "Email is required";
    else if (!emailRegex.test(values.email))
      errors.email = "Wrong email format";

    if (!values.password) errors.password = "Password is required";
    else if (!passwordRegex.test(values.password))
      errors.password =
        "Password must include uppercase, lowercase, special symbol, numbers";
    if (!values.address) errors.address = "Address is required";
    else if (values.address.length < 10)
      errors.address = "Address must be at least 10 characters";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);

      alert("Data submitted successfully");
      setFormValues({
        name: "",
        email: "",
        username: "",
        password: "",
        address: "",
      });
      console.log(formValues);
      console.log(response);
      navigate("/sign-in");
    } else {
      setIsSubmitted(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    const signUpButtons = document.querySelectorAll(".signUp");
    const signInButtons = document.querySelectorAll(".signIn");
    const main = document.getElementById("main");

    const handleSignUpClick = () => main.classList.add("right-panel-active");
    const handleSignInClick = () => main.classList.remove("right-panel-active");

    signUpButtons.forEach((btn) =>
      btn.addEventListener("click", handleSignUpClick)
    );
    signInButtons.forEach((btn) =>
      btn.addEventListener("click", handleSignInClick)
    );

    return () => {
      signUpButtons.forEach((btn) =>
        btn.removeEventListener("click", handleSignUpClick)
      );
      signInButtons.forEach((btn) =>
        btn.removeEventListener("click", handleSignInClick)
      );
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="custom-form-container">
          <div className="containerr" id="main">
            <div className="form-container">
              <div className="sign-up">
                <form onSubmit={handleSubmit}>
                  <h1>Create Account</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faGooglePlusG} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formValues.username}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.username && (
                    <p className="error">{formErrors.username}</p>
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && (
                    <p className="error">{formErrors.email}</p>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.password && (
                    <p className="error">{formErrors.password}</p>
                  )}

                  <input
                    type="text"
                    name="address"
                    placeholder="address"
                    value={formValues.address}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.address && (
                    <p className="error">{formErrors.address}</p>
                  )}
                  <button className="signUp" type="submit">
                    Sign Up
                  </button>
                </form>
              </div>

              <div className="sign-in">
                <form action="#">
                  <h1>Sign in</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faGooglePlusG} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </div>
                  <p>or use your email for login</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <a href="#">Forget Password?</a>
                  <button className="signIn" type="submit">
                    Sign In
                  </button>
                </form>
              </div>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button className="signIn">Sign In</button>
                </div>
                <div className="overlay-right">
                  <h1>Hello, Reader</h1>
                  <p>
                    Enter your personal details and start the journey with us
                  </p>
                  <button className="signUp">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
