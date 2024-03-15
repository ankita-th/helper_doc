import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoader: false,
  snackBar: {
    show: false,
    msg: "",
    type: "",
  },
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
  },
});

export const { setPageLoader, setSnackBarSlice } = commonSlice.actions;

export default commonSlice.reducer;
