import { APIAxios } from "../../Config/APIConfig";
import { GET_PROFILE_DETAILS } from "../../Config/APIUrls";

export const getProfileData = (userId) =>
  APIAxios.get(GET_PROFILE_DETAILS(userId));
