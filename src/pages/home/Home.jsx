import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/cards/Cards";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { FaDatabase, FaFilter, FaSort } from "react-icons/fa";
import { SiLinkedin, SiGithub } from "react-icons/si";
import {
  searchDogsAsync,
  changeSorting,
  changeSource,
  getTemperamentsAsync,
  changeFilter,
} from "../../redux/dogSlice";
import "./Home.css";
import Logo from "../../images/logo.svg";

const Home = () => {
  const [search, setSearch] = useState();
  const [temperaments, setTemperaments] = useState([]);
  const sort = useSelector((state) => state.dogs.sorting);
  const source = useSelector((state) => state.dogs.source);
  const options = useSelector((state) => state.dogs.temperaments);

  const dispatch = useDispatch();

  function searchDog(name) {
    dispatch(searchDogsAsync(name));
  }

  useEffect(() => {
    if (options.length === 0) {
      dispatch(getTemperamentsAsync());
    }
  }, [dispatch, options]);

  useEffect(() => {
    dispatch(changeFilter(temperaments));
  }, [dispatch, temperaments]);

  return (
    <div className="homeContainer">
      <div className="searchContainer">
        <div className="logoContainer">
          <img src={Logo} alt="logo" />
          <h1>
            Dogs <p>App</p>
          </h1>
        </div>
        <div className="iconsContainer">
          <a
            href="https://github.com/VicTips"
            target="_blank"
            rel="noreferrer"
            className="githubIcon"
          >
            <SiGithub />
          </a>
          <a
            href="https://www.linkedin.com/m/in/victips"
            target="_blank"
            rel="noreferrer"
          >
            <SiLinkedin />
          </a>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchDog(search);
            // setTemperaments([{ id: 1, name: search }]);
          }}
          className="searchForm"
        >
          <input
            name="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="searchBar"
          />
          <button type="submit" className="searchBtn">
            <RiSearchLine />
          </button>
        </form>
      </div>
      <div className="container">
        <Link to="/form" className="createBtn2">
          <button>+</button>
          <p>Create a Dog</p>
        </Link>
        <div className="sortAndFilter">
          <div>
            <label>
              Sort <FaSort />
            </label>
            <select
              name="sort"
              onChange={(e) => dispatch(changeSorting(e.target.value))}
              value={sort}
              className="sortSelect"
            >
              <option value="alphaA">Alphabetically (A-Z)</option>
              <option value="alphaD">Alphabetically (Z-A)</option>
              <option value="weightA">By weight (ascending)</option>
              <option value="weightD">By weight (descending)</option>
            </select>
          </div>
          <div>
            <label>
              Source <FaDatabase />
            </label>
            <select
              name="source"
              onChange={(e) => dispatch(changeSource(e.target.value))}
              value={source}
            >
              <option value="apiAndDB">All dogs</option>
              <option value="apiOnly">Preset dogs</option>
              <option value="DBOnly">Created dogs</option>
            </select>
          </div>
          <div>
            <label>
              Filter <FaFilter />
            </label>
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
              className="filterSelect"
            >
              <option value="default" disabled>
                All temperaments
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
          </div>
        </div>
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
        {temperaments.length > 0 && (
          <button
            onClick={() => {
              setTemperaments([]);
            }}
            className="cleanBtn"
          >
            Reset
          </button>
        )}
        <br />
        {<Cards />}
      </div>
    </div>
  );
};

export default Home;
