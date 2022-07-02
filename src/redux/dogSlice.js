import { createSlice } from "@reduxjs/toolkit";

export const dogSlice = createSlice({
  name: "dogs",
  initialState: {
    dogsLoaded: [],
    dogDetail: {},
    sorting: "alphaA",
    source: "apiAndDB",
    temperaments: [],
    filter: [],
    btnNumber: 1,
  },
  reducers: {
    getDogs: (state, action) => {
      state.dogsLoaded = action.payload;
    },
    getDetail: (state, action) => {
      state.dogDetail = action.payload;
    },
    cleanDetail: (state) => {
      state.dogDetail = {};
    },
    changeSorting: (state, action) => {
      state.sorting = action.payload;
    },
    changeSource: (state, action) => {
      state.source = action.payload;
    },
    getTemperaments: (state, action) => {
      state.temperaments = action.payload;
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    changeBtnNumber: (state, action) => {
      state.btnNumber = action.payload;
    },
  },
});

export const {
  getDogs,
  getDetail,
  cleanDetail,
  changeSorting,
  changeSource,
  getTemperaments,
  changeFilter,
  changeBtnNumber,
} = dogSlice.actions;

export const getDogsAsync = () => (dispatch) => {
  fetch("http://localhost:3001/api/dog")
    .then((res) => res.json())
    .then((json) => {
      dispatch(getDogs(json));
    })
    .catch((e) => console.log(e));
};

export const searchDogsAsync = (name) => (dispatch) => {
  fetch(`http://localhost:3001/api/dog?name=${name}`)
    .then((res) => res.json())
    .then((json) => {
      dispatch(getDogs(json));
    })
    .catch((e) => console.log(e));
};

export const dogDetailAsync = (id) => (dispatch) => {
  fetch(`http://localhost:3001/api/dog/${id}`)
    .then((res) => res.json())
    .then((json) => {
      dispatch(getDetail(json));
    })
    .catch((e) => console.log(e));
};

export const getTemperamentsAsync = () => (dispatch) => {
  fetch("http://localhost:3001/api/temperament/")
    .then((res) => res.json())
    .then((json) => {
      dispatch(getTemperaments(json));
    })
    .catch((e) => console.log(e));
};

export default dogSlice.reducer;
