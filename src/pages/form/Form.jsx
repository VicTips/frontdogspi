import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperamentsAsync, getDogsAsync } from "../../redux/dogSlice";
import { validate, completedForm, getIdArray } from "../../services/form";
import { CgDanger } from "react-icons/cg";
import Logo from "../../images/logo.svg";
import "./Form.css";
import { urlApi } from "../../constants";

const Form = () => {
  const [temperaments, setTemperaments] = useState([]);
  const [input, setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (
      !completedForm(
        input.name,
        input.min_height,
        input.max_height,
        input.min_weight,
        input.max_weight,
        errors
      )
    ) {
      createDoggie({ ...input, idArray: getIdArray(temperaments) });
      setInput({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
      });
      setTemperaments([]);
      dispatch(getDogsAsync());
    } else alert("Information provided is not valid!");
  };

  const dispatch = useDispatch();
  const options = useSelector((state) => state.dogs.temperaments);

  useEffect(() => {
    if (options.length === 0) {
      dispatch(getTemperamentsAsync());
    }
  }, [dispatch, options]);

  function createDoggie(dog) {
    fetch(`${urlApi}api/dog`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((res) => {
        res.status === 200
          ? alert("Your dog was created successfully!")
          : alert(
              "Your dog could not be created, please try using a different name."
            );
        dispatch(getDogsAsync());
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="formContainer">
      <img src={Logo} alt="logo" className="formLogo" />
      <h1 className="formTitle">Create a Dog</h1>
      <div className="newDogForm">
        <form onSubmit={handleSubmit}>
          <label>
            Name <span className="required">*</span>
          </label>
          <input
            placeholder="For example: Firulais"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <p className="errorMsg">
              <CgDanger /> {errors.name}
            </p>
          )}

          <label>
            Minimum height <span className="required">*</span>
          </label>
          <input
            placeholder="For example: 20"
            name="min_height"
            value={input.min_height}
            onChange={handleInputChange}
          />
          {errors.min_height && (
            <p className="errorMsg">
              <CgDanger /> {errors.min_height}
            </p>
          )}

          <label>
            Maximum height <span className="required">*</span>
          </label>
          <input
            placeholder="For example: 25"
            name="max_height"
            value={input.max_height}
            onChange={handleInputChange}
          />
          {errors.max_height && (
            <p className="errorMsg">
              <CgDanger /> {errors.max_height}
            </p>
          )}

          <label>
            Minimum weight <span className="required">*</span>
          </label>
          <input
            placeholder="For example: 10"
            name="min_weight"
            value={input.min_weight}
            onChange={handleInputChange}
          />
          {errors.min_weight && (
            <p className="errorMsg">
              <CgDanger /> {errors.min_weight}
            </p>
          )}

          <label>
            Maximum weight <span className="required">*</span>
          </label>
          <input
            placeholder="For example: 15"
            name="max_weight"
            value={input.max_weight}
            onChange={handleInputChange}
          />
          {errors.max_weight && (
            <p className="errorMsg">
              <CgDanger /> {errors.max_weight}
            </p>
          )}

          <label>Lifespan </label>
          <input
            placeholder="For example: 12"
            name="life_span"
            value={input.life_span}
            onChange={handleInputChange}
          />
          {errors.life_span && (
            <p className="errorMsg">
              <CgDanger /> {errors.life_span}
            </p>
          )}

          <label>Image url </label>
          <input
            placeholder="Image url"
            name="image"
            value={input.image}
            onChange={handleInputChange}
          />
          {errors.image && (
            <p className="errorMsg">
              <CgDanger /> {errors.image}
            </p>
          )}

          <label>Temperaments </label>
          <select
            name="temperaments"
            defaultValue="default"
            onChange={(e) => {
              setTemperaments([
                ...temperaments,
                {
                  id: e.target.selectedOptions[0].getAttribute("id"),
                  name: e.target.value,
                },
              ]);
            }}
          >
            <option value="default" disabled>
              Select
            </option>
            {options.map((option) => {
              return (
                <option
                  key={option.id}
                  hidden={
                    temperaments.find((t) => t.name === option.name) ===
                    undefined
                      ? false
                      : true
                  }
                  id={option.id}
                >
                  {option.name}
                </option>
              );
            })}
          </select>

          <div className={temperaments.length && "temperamentChips"}>
            {temperaments.map((t) => {
              return (
                <div key={t.id} className="temperamentChip">
                  <p>{t.name} </p>
                  <button
                    onClick={() => {
                      setTemperaments((temperaments) =>
                        temperaments.filter(
                          (temperament) => temperament.id !== t.id
                        )
                      );
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
          <Link to="/home">
            <button className="cancelBtn">Cancel</button>
          </Link>
          <button
            disabled={completedForm(
              input.name,
              input.min_height,
              input.max_height,
              input.min_weight,
              input.max_weight,
              errors
            )}
            className="createBtn"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
