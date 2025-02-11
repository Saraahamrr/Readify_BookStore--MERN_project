import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlicer";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupValues, setSignupValues] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [signinValues, setSigninValues] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateSignUp = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;

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
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "Invalid phone number format";
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
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const errors = validateSignUp(signupValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          "http://localhost:3000/api/sign-up",
          signupValues
        );
        toast.success("User signed-up successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        toast.warn("Please Verify Email", toastOptions);
        // if (isLoggedIn) {
        //   toast.success("Please Verify Your email", toastOptions);
        // }
        if (response.data.msg === "OTP sent to your Email") {
          navigate("/otp");
        }
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      setSignupValues({
        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
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
      try {
        const response = await axios.post(
          "http://localhost:3000/api/sign-in",
          signinValues,
          { withCredentials: true }
        );
        localStorage.setItem("isSubscribed", response.data.isSubscribed);

        toast.success(response.data.msg, toastOptions);
        if (response.data.status === "unauthorized") {
          toast.warn("please verify Email", toastOptions);
        }
        console.log(response);
        localStorage.setItem("isSubscribed", response.data.isSubscribed);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        dispatch(authActions.changeStatus(response.data.status));

        console.log(authActions.login());

        navigate("/");
      } catch (error) {
        toast.error(error.response.data.msg, toastOptions);
      }
      setSigninValues({
        username: "",
        password: "",
      });
    } else {
      setIsSubmitted(false);
      localStorage.setItem("isSubscribed", "false");
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
                    name="username"
                    placeholder="Username"
                    value={signupValues.username}
                    onChange={handleChangeSignUp}
                    required
                  />
                  {formErrors.username && (
                    <p className="error">{formErrors.username}</p>
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupValues.email}
                    onChange={handleChangeSignUp}
                    required
                  />
                  {formErrors.email && (
                    <p className="error">{formErrors.email}</p>
                  )}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={signupValues.phone}
                    onChange={handleChangeSignUp}
                    required
                  />
                  {formErrors.phone && (
                    <p className="error">{formErrors.phone}</p>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signupValues.password}
                    onChange={handleChangeSignUp}
                    required
                  />
                  {formErrors.password && (
                    <p className="error">{formErrors.password}</p>
                  )}

                  <input
                    type="text"
                    name="address"
                    placeholder="address"
                    value={signupValues.address}
                    onChange={handleChangeSignUp}
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
                  <Link to="/forget-pass">Forget password?</Link>{" "}
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
