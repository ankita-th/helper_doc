import { APIAxios } from "../../Config/APIConfig";
import {
  APPLY_JOB,
  GET_ALL_JOBS,
  GET_JOBS_BY_STATUS,
  GET_PROFILE_PERCENTAGE,
  SAVE_JOB,
} from "../../Config/APIUrls";

// Get All Jobs List
export const getJobsList = (param) => APIAxios.get(`${GET_ALL_JOBS}${param}`);

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
export const getJobsByStatus = (userId, param) => APIAxios.get(`${GET_JOBS_BY_STATUS(userId)}${param}`);