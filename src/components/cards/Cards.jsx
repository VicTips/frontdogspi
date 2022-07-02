import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDogsAsync, changeBtnNumber } from "../../redux/dogSlice";
import Pagination from "../pagination/Pagination";
import "./Cards.css";

const Cards = () => {
  let allDogs = useSelector((state) => state.dogs.dogsLoaded);
  const sort = useSelector((state) => state.dogs.sorting);
  const source = useSelector((state) => state.dogs.source);
  const filter = useSelector((state) => state.dogs.filter);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  useEffect(() => {
    if (allDogs.length === 0) {
      dispatch(getDogsAsync());
    }
  }, [allDogs, dispatch]);

  let dogsToSort = [...allDogs];
  let sortedDogs;
  switch (sort) {
    case "alphaA":
      sortedDogs = dogsToSort.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "alphaD":
      sortedDogs = dogsToSort.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "weightA":
      sortedDogs = dogsToSort.sort((a, b) => {
        if (a.min_weight === b.min_weight) {
          return a.max_weight < b.max_weight ? -1 : 1;
        } else if (a.min_weight === null) {
          return 1;
        } else if (b.min_weight === null) {
          return -1;
        } else {
          return a.min_weight < b.min_weight ? -1 : 1;
        }
      });
      break;
    case "weightD":
      sortedDogs = dogsToSort.sort((a, b) => {
        if (a.min_weight === b.min_weight) {
          return a.max_weight > b.max_weight ? -1 : 1;
        } else if (a.min_weight === null) {
          return 1;
        } else if (b.min_weight === null) {
          return -1;
        } else {
          return a.min_weight > b.min_weight ? -1 : 1;
        }
      });
      break;

    default:
      sortedDogs = dogsToSort.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  let filteredDogsbySource;
  switch (source) {
    case "apiOnly":
      filteredDogsbySource = sortedDogs.filter(
        (dog) => dog.id.length === undefined
      );
      break;
    case "DBOnly":
      filteredDogsbySource = sortedDogs.filter((dog) => dog.id.length === 36);
      break;

    default:
      filteredDogsbySource = sortedDogs;
  }
  let filteredDogsbyTemperaments;
  if (filter.length !== 0) {
    filteredDogsbyTemperaments = filteredDogsbySource.filter((dog) => {
      return (
        dog.temperament !== undefined &&
        filter.every((t) => dog.temperament.includes(t.name))
      );
    });
  } else {
    filteredDogsbyTemperaments = filteredDogsbySource;
  }

  useEffect(() => {
    setCurrentPage(1);
    dispatch(changeBtnNumber(1));
  }, [dispatch, filteredDogsbyTemperaments.length]);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = filteredDogsbyTemperaments.slice(
    indexOfFirstDog,
    indexOfLastDog
  );

  function changePage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  if (!currentDogs.length && source === "DBOnly")
    return (
      <div>
        <h2 style={{ color: "rgb(65, 10, 119)", marginBottom: "2rem" }}>
          No results found!
        </h2>
      </div>
    );
  else if (!currentDogs.length && filter.length)
    return (
      <div>
        <h2 style={{ color: "rgb(65, 10, 119)", marginBottom: "2rem" }}>
          No results found!
        </h2>
      </div>
    );
  else if (!currentDogs.length)
    return (
      <div>
        <div className="spinnerPurple"></div>
        <h2 style={{ color: "rgb(65, 10, 119)", marginBottom: "2rem" }}>
          Loading...
        </h2>
      </div>
    );
  return (
    <div>
      <div className="cardsContainer">
        {currentDogs.map((dog) => (
          <Card object={dog} key={dog.id} />
        ))}
      </div>

      <Pagination
        dogsPerPage={dogsPerPage}
        totalDogs={filteredDogsbyTemperaments.length}
        changePage={changePage}
      />
    </div>
  );
};

export default Cards;
