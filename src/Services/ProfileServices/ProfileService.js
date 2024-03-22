import { APIAxios } from "../../Config/APIConfig";
import { GET_PROFILE_DETAILS, GET_PUBLIC_PROFILE } from "../../Config/APIUrls";

export const getProfileData = (userId) =>
  APIAxios.get(GET_PROFILE_DETAILS(userId));

export const completeProfileData = (userId, payload) =>
  APIAxios.put(GET_PROFILE_DETAILS(userId, payload));

export const getHelperPublicProfile = () =>
  APIAxios.get(GET_PUBLIC_PROFILE(getUserId()));

function getUserId() {
  return localStorage.getItem("userId");
}
