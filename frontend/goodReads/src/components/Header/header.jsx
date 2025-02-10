import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Header/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../../context/fav";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { authActions } from "../../store/authSlicer";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { favorites } = useFavorites();
<<<<<<< HEAD
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

=======
  const dispatch = useDispatch();
>>>>>>> 39b7ba3f0b20b27ae72576e715ae3880e24ca6b1

  const links = [
    { title: "Home", link: "/" },
    { title: "Books", link: "/allbooks" },
    { title: "Authors", link: "/authors" },
  ];

<<<<<<< HEAD
  if (isLoggedIn) {
    links.push({ title: "Profile", link: "/profile" });
    if (role === "user")
      links.push({ title: "Cart", link: "/cart" });
=======
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    links;
>>>>>>> 39b7ba3f0b20b27ae72576e715ae3880e24ca6b1
  }

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/sign-out");
      toast.success(response.data.msg, {
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
      dispatch(authActions.logout());
      console.log(authActions.login());
      navigate("/");
    } catch (error) {
      console.log(error);
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
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "100px", marginLeft: "20px" }}
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form
            className="d-flex bg-light"
            role="search"
            onSubmit={handleSearch}
            style={{ width: "100%" }}
          >
            <div
              style={{
                position: "relative",
                width: "60%",
                display: "flex",
                backgroundColor: "#f8f9fa",
              }}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  marginRight: "-1px",
                  height: "2.5em",
                  margin: "0px",
                }}
              />

              <button
                type="submit"
                style={{
                  backgroundColor: "#fbb02d",
                  border: "none",
                  cursor: "pointer",
                  height: "3.4em",
                  padding: "0px 13px",
                  borderTopRightRadius: "1em",
                  borderBottomRightRadius: "1em",
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  margin: "0px",
                }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ color: "#111111", fontSize: "15px" }}
                />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto">
            {links.map((item, i) => (
              <li key={i} className="nav-item">
                <Link to={item.link} className="nav-link" key={i}>
                  {item.title}
                </Link>
              </li>
            ))}
            {isLoggedIn && role === "user" && (
              <button
                id="fav-btn"
                className="nav-item"
                onClick={() => navigate("/profile/favourites")}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "red", fontSize: "20px", marginRight: "5px" }}
                />
                <span>{favorites.length}</span>
              </button>
            )}
            {isLoggedIn && role === "user" && (
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="btn sign-btn" to="/signup">
                  Sign Up
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="btn sign-btn" onClick={handleSignout}>
                  Sign out
                </Link>
              </li>
            )}
          </ul>
        </div>
<<<<<<< HEAD
      </form>

      <ul className="navbar-nav ms-auto">
        {links.map((item, i) => (
          <li key={i} className="nav-item">
            <Link to={item.link} className="nav-link">{item.title}</Link>
          </li>
        ))}

        {isLoggedIn&& role === "user" &&   <li className="nav-item">
          <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "20px", marginRight: "5px" }} />
          <span>{favorites.length}</span>
        </li>}
      

        {!isLoggedIn && (
          <li className="nav-item">
            <Link className="btn sign-btn" to="/signup">
              Sign Up
            </Link>
          </li>
        )}
      </ul>
    </div>
      </div >
    </nav >
=======
      </div>
    </nav>
>>>>>>> 39b7ba3f0b20b27ae72576e715ae3880e24ca6b1
  );
}
