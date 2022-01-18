import "./topbar.css";

import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";

import dummyProfileImage from "../../images/DummyUserProfileImage.jpg";
import { SERVER_BASE_URL } from "../../links";

const Topbar = () => {
  const { user } = useContext(Context);
  const isLoggedIn = user && true;

  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    if (screenWidth <= 480) setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const handleLogout = () => {
    window.open(`${SERVER_BASE_URL}/api/auth/logout`, "_self");
  };

  return (
    <>
      <button className="tb-toggle-btn" onClick={toggleNav}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={toggleMenu || screenWidth > 480 ? "tb" : "tb hidden"}>
        <div className="tb-left">
          <a
            className="link"
            href="https://twitter.com/pankajgurbani_"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab tb-social-icon fa-twitter-square"></i>
          </a>
          <a
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/pankajgurbani.connect"
          >
            <i className="fab tb-social-icon fa-instagram-square"></i>
          </a>
        </div>
        <div className="tb-center">
          <ul className="tb-nav-list">
            <NavLink className="link" to="/" onClick={toggleNav}>
              <li className="tb-nav-list-item">Home</li>
            </NavLink>
            {/* <NavLink className="link" to="/about" onClick={toggleNav}>
              <li className="tb-nav-list-item">About</li>
            </NavLink>
            <NavLink className="link" to="/contact" onClick={toggleNav}>
              <li className="tb-nav-list-item">Contact</li>
            </NavLink> */}
            <NavLink className="link" to="/write" onClick={toggleNav}>
              <li className="tb-nav-list-item">Write</li>
            </NavLink>
            {isLoggedIn && (
              <li className="tb-nav-list-item" onClick={handleLogout}>
                Logout
              </li>
            )}
          </ul>
        </div>
        <div className="tb-right">
          {isLoggedIn ? (
            <Link className="link" to="/settings" onClick={toggleNav}>
              <img
                src={
                  user.imageURL
                    ? `${SERVER_BASE_URL}${user.imageURL}`
                    : dummyProfileImage
                }
                alt=""
                className="tb-img"
              />
            </Link>
          ) : (
            <ul className="tb-nav-list">
              <NavLink className="link" to="/login" onClick={toggleNav}>
                <li className="tb-nav-list-item">Login</li>
              </NavLink>
              <NavLink className="link" to="/register" onClick={toggleNav}>
                <li className="tb-nav-list-item">Register</li>
              </NavLink>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
