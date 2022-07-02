import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ object }) => {
  return (
    <Link to={`/detail/${object.id}`} className="dogCard">
      <div>
        <div className="cardImgContainer">
          <img
            src={
              typeof object.image === "object"
                ? object.image.url
                : object.image_alt === undefined
                ? "https://www.sunrisemovement.org/es/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg"
                : `https://cdn2.thedogapi.com/images/${object.image_alt}.jpg`
            }
            alt={
              typeof object.image === "object" ? object.image.url : object.image
            }
            onError={(e) => {
              e.target.src = `https://cdn2.thedogapi.com/images/${object.image_alt}.png`;
            }}
          />
          <div className="cardTitle">
            <h3>{object.name}</h3>
          </div>
        </div>
        <h4>Temperament: </h4>
        <p>{object.temperament ? object.temperament : "Unknown"}</p>
        <h4>Weight: </h4>
        <p>{object.weight} kg</p>
      </div>
    </Link>
  );
};

export default Card;
