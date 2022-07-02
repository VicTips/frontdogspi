import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  dogDetailAsync,
  cleanDetail,
  getDogsAsync,
} from "../../redux/dogSlice";
import "./Detail.css";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dogDetailAsync(params.id));
    return () => dispatch(cleanDetail());
  }, [dispatch, params.id]);

  const dogDetail = useSelector((state) => state.dogs.dogDetail);

  function deleteDog(id) {
    fetch(`http://localhost:3001/api/dog/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        dispatch(getDogsAsync());
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="detailPage">
      {Object.keys(dogDetail).length === 0 ? (
        <div>
          <div className="spinnerWhite"></div>
          <h2 style={{ color: "white" }}>Loading...</h2>
        </div>
      ) : dogDetail.id === "ID not found!" ? (
        <div>
          <h2 style={{ color: "white" }}>ID not found!</h2>
          <Link to={"/home"} className="goBackBtn" style={{ marginRight: "0" }}>
            Go Back
          </Link>
        </div>
      ) : (
        <div className="dogDetailCard">
          <p className="dogName">{dogDetail.name}</p>
          <div className="dogImageAndInformation">
            <div>
              <img
                src={
                  typeof dogDetail.image === "object"
                    ? dogDetail.image.url
                    : dogDetail.image_alt === undefined
                    ? "https://www.sunrisemovement.org/es/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg"
                    : `https://cdn2.thedogapi.com/images/${dogDetail.image_alt}.jpg`
                }
                alt={
                  typeof dogDetail.image === "object"
                    ? dogDetail.image.url
                    : dogDetail.image
                }
                onError={(e) => {
                  e.target.src = `https://cdn2.thedogapi.com/images/${dogDetail.image_alt}.png`;
                }}
              />
            </div>
            <div className="dogInformationContainer">
              <div className="dogInformation">
                <p className="subheading">Temperament</p>
                <p>
                  {dogDetail.temperament ? dogDetail.temperament : "Unknown"}
                </p>
                <p className="subheading">Origin</p>
                <p>{dogDetail.origin ? dogDetail.origin : "Unknown"}</p>
                <p className="subheading">Lifespan</p>
                <p>{dogDetail.life_span ? dogDetail.life_span : "Unknown"}</p>
                <p className="subheading">Weight</p>
                <p>{dogDetail.weight ? `${dogDetail.weight} kg` : "Unknown"}</p>
                <p className="subheading">Height</p>
                <p>{dogDetail.height ? `${dogDetail.height} cm` : "Unknown"}</p>
                <div className="btns">
                  <Link to="/home" className="goBackBtn">
                    Go Back
                  </Link>
                  {dogDetail.id.length === 36 && (
                    <Link
                      to="/home"
                      className="deleteBtn"
                      onClick={() => deleteDog(dogDetail.id)}
                    >
                      Delete
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
