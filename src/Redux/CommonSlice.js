import { createSlice } from "@reduxjs/toolkit";
import { getMasterData } from "../Services/MasterServices/MasterService";
import { toastMessage } from "../Utils/toastMessages";
import { t } from "i18next";

const initialState = {
  isPageLoader: false,
  profilePercentage: 0,
  certificates: [],
  countriesList: [],
  daysOff: [],
  dutiesTasksList: [],
  educationLevel: [],
  genders: [],
  jobTypes: [],
  languageLevel: [],
  livingArrangement: [],
  maritalStatus: [],
  nationality: [],
  nativeLanguages: [],
  religion: [],
  requiredSpecialCare: [],
  shareRoomCoWorker: [],
  skillsList: [],
  yourExperince: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setPageLoader: (state, action) => {
      state.isPageLoader = action.payload;
    },
    setProfilePercentage: (state, action) => {
      state.profilePercentage = action.payload;
    },
    setMasterData: (state, action) => {
      for (let value in action.payload) {
        state[value] = action.payload[value];
      }
    },
  },
});

export const { setPageLoader, setProfilePercentage, setMasterData } =
  commonSlice.actions;

export default commonSlice.reducer;

export function getAllSeadersData() {
  return async (dispatch) => {
    try {
      const res = await getMasterData();
      console.log(res, "common slice");
      if (res.status === 200) {
        dispatch(setMasterData(res.data));
      }
    } catch (err) {
      if (err.response.data?.message) {
        toastMessage(err.response.data?.message);
      } else {
        toastMessage(t("failure_message"));
      }
    }
  };
}
