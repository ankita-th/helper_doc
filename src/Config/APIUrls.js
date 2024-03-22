export const SIGNUP = "users/signup";
export const LOGIN = "users/login";
export const SOCIAL_LOGIN = "users/social-login";
export const FORGOT_PASSWORD = "/users/forgot-password";
export const VERIFY_OTP = "/users/verify-otp";
export const RESET_OTP = "/users/reset-password";

// Stepper API URLS
export const GET_ADD_STEP = "registration-step";

// Get Profile Data
export const GET_PROFILE_DETAILS = (userID) => `/complete-profile/${userID}`

// Get All Job List
export const GET_ALL_JOBS = "job-postings";

// Get applied Job List
export const GET_JOBS_BY_STATUS = (userId) => `users/${userId}/get-jobs`;

// Apply for the job
export const APPLY_JOB = (jobId) => `users/${jobId}/apply-to-job`;

// Save job
export const SAVE_JOB = (jobId) => `users/${jobId}/save-job`;

// Get profile percentage
export const GET_PROFILE_PERCENTAGE = (userId) =>
  `/complete-profile/${userId}/profile-completion`;


// Upload file in s3
export const UPLOAD_FILE_IN_S3 = "upload/presigned-url"

// Get All Notifications List
export const GET_ALL_NOTIFICATION = (userId) => `notifications/${userId}`;

export const DELETE_NOTIFICATION = (userId,notificationId) => `notifications/${userId}/${notificationId}`;
//get all messages
export const GET_ALL_MESSAGES  = (userId)=> `/messages/${userId}`;
