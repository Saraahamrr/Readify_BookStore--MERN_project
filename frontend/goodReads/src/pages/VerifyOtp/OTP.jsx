import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Signup() {
  const [OTPValues, setOTPValues] = useState({
    OTP: "",
  });
  const [signinValues, setSigninValues] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ValidateOtp = (values) => {
    const errors = {};

    if (!values.otp) {
      errors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(values.otp)) {
      errors.otp = "OTP must be a 6-digit number";
    }

    return errors;
  };

  const validateSignIn = (values) => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!values.username) errors.username = "Username is required";
    else if (/\s/.test(values.username))
      errors.username = "Username must not contain spaces";

    if (!values.password) errors.password = "Password is required";
    else if (!passwordRegex.test(values.password))
      errors.password =
        "Password must include uppercase, lowercase, special symbol, numbers";
    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const errors = ValidateOtp(OTPValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/verify-otp",
          signupValues
        );
        alert(response.data.msg);
      } catch (error) {
        alert(error.response.data.msg);
      }
      setOTPValues({
        OTP: "",
      });
    } else {
      setIsSubmitted(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const errors = validateSignIn(signinValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/sign-in",
          signinValues
        );
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token);
        alert(response.data.msg);
      } catch (error) {
        alert(error.response.data.msg);
      }
      setSigninValues({
        username: "",
        password: "",
      });
    } else {
      setIsSubmitted(false);
    }
  };

  const handleChangeSignUp = (e) => {
    const { name, value } = e.target;
    setSignupValues({ ...signupValues, [name]: value });
  };
  const handleChangeSignIn = (e) => {
    const { name, value } = e.target;
    setSigninValues({ ...signinValues, [name]: value });
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
                <form onSubmit={handleSignUp}>
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
                    name="otp"
                    placeholder="Enter OTP"
                    value={OTPValues.otp}
                    onChange={handleChangeSignUp}
                    required
                  />
                  {formErrors.OTP && <p className="error">{formErrors.OTP}</p>}
                  <button className="signUp" type="submit">
                    Sign Up
                  </button>
                </form>
              </div>

              <div className="sign-in">
                <form onSubmit={handleSignIn}>
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
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={signinValues.username}
                    onChange={handleChangeSignIn}
                    required
                  />
                  {formErrors.username && (
                    <p className="error">{formErrors.username}</p>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signinValues.password}
                    onChange={handleChangeSignIn}
                    required
                  />
                  {formErrors.password && (
                    <p className="error">{formErrors.password}</p>
                  )}
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
