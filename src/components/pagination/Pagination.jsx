import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeBtnNumber } from "../../redux/dogSlice";
import "./Pagination.css";

const Pagination = ({ dogsPerPage, totalDogs, changePage }) => {
  const pageNumbers = [];
  const btnNumber = useSelector((state) => state.dogs.btnNumber);
  const dispatch = useDispatch();

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => {
            changePage(number);
            dispatch(changeBtnNumber(number));
          }}
          className={number === btnNumber ? "btnSelected" : ""}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
