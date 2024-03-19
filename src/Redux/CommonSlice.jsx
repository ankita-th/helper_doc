import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoader: false,
  snackBar: {
    show: false,
    msg: "",
    type: "",
  },
  profilePercentage: 0,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setPageLoader: (state, action) => {
      state.isPageLoader = action.payload;
    },
    setSnackBarSlice: (state, action) => {
      state.snackBar = action.payload;
    },
    setProfilePercentage: (state, action) => {
      state.profilePercentage = action.payload;
    },
  },
});

export const { setPageLoader, setSnackBarSlice, setProfilePercentage } = commonSlice.actions;

export default commonSlice.reducer;
