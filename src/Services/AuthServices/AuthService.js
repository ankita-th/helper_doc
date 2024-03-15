import { authAxios } from "../../Config/APIConfig";
import { LOGIN, SIGNUP } from "../../Config/APIUrls";

export const registerUser = (payload) => authAxios.post(SIGNUP, payload);

export const loginUser = (payload) => authAxios.post(LOGIN, payload);
