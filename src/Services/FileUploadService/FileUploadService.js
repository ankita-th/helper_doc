import { FormAxios } from "../../Config/APIConfig";
import { UPLOAD_FILE_IN_S3 } from "../../Config/APIUrls";

// Upload file in s3 bucket
export const uploadFileInS3Bucket = async (payload) =>
  await FormAxios.get(UPLOAD_FILE_IN_S3, payload);
