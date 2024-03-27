import { APIAxios } from "../../Config/APIConfig";
import {
  APPLY_JOB,
  GET_ALL_JOBS,
  GET_ALL_MESSAGES,
  GET_JOBS_BY_STATUS,
  GET_PROFILE_PERCENTAGE,
  SAVE_JOB,
} from "../../Config/APIUrls";

// Get the UserId
function getUserId() {
  return localStorage.getItem("userId");
}

// Get All Jobs List
export const getJobsList = (param) =>
  APIAxios.get(`${GET_JOBS_BY_STATUS(getUserId())}${param}`);

// Get Single Job Details
export const getJobDetails = (id) => APIAxios.get(`${GET_ALL_JOBS}/${id}`);

// Apply for the job
export const applyJob = (userId, payload) =>
  APIAxios.post(APPLY_JOB(userId), payload);

// Save the job
export const saveJob = (userId, payload) =>
  APIAxios.post(SAVE_JOB(userId), payload);

// Get profile completion percentage
export const getProfilePercentage = (userId) =>
  APIAxios.get(GET_PROFILE_PERCENTAGE(userId));

// Get jobs by status
export const getJobsByStatus = (userId, param) =>
  APIAxios.get(`${GET_JOBS_BY_STATUS(userId)}${param}`);
//get all messages
export const getAllMessages = (userId, param) =>
  APIAxios.get(`/messages/${userId}${param}`);
// export const getAllMessages = (userId) => APIAxios.get(`${GET_ALL_MESSAGES(userId)}`);

//delete account
export const deleteAccount = (userId) =>
  APIAxios.put(`/users/delete-account/${userId}`);
//update notiications
export const updateNotifications = (userId, payload) =>
  APIAxios.put(`/users/update-notifications/${userId}`, payload);
export const updatePassword = (userId, payload) =>
  APIAxios.put(`/users/update-password/${userId}`, payload);
