import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDogsAsync, getTemperamentsAsync } from "../../redux/dogSlice";
import Logo from "../../images/logo.svg";
import "./Landing.css";

const Landing = () => {
  const dispatch = useDispatch();

  return (
    <div className="landingContainer">
      <div>
        <div className="landingLogoContainer">
          <img src={Logo} alt="logo" className="landingLogo" />
          <h1 className="landingTitle">
            Dogs <p>App</p>
          </h1>
        </div>
        <Link
          to="/home"
          onClick={() => {
            dispatch(getDogsAsync());
            dispatch(getTemperamentsAsync());
          }}
          className="enterLink"
        >
          <button>Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
