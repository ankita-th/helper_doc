import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FeatureIcon from "../../../Assets/SVGIcons/FeatureIcon";
import ArrowButton from "../ArrowButton";
import { useTranslation } from "react-i18next";
import { applyJob, saveJob } from "../../../Services/JobsServices/JobServices";
import { JOB_STATUS, successType } from "../../../Constant/Constant";
import { toastMessage } from "../../../Utils/toastMessages";
import { calculateTimeAgo } from "../../../Utils/timeAgo";
import { useSelector } from "react-redux";
import AppliedBadgeIcon from "../../../Assets/SVGIcons/AppliedBadgeIcon";
import SaveBadgeIcon from "../../../Assets/SVGIcons/SaveBadgeIcon";

export default function JobCard({
  jobDetails,
  setLoader,
  setJobDetails,
  setOpenModal,
  badge,
}) {
  const navigate = useNavigate();
  const handleBookmarkToggle = () => {};
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { profilePercentage } = useSelector((state) => state.common);

  const hadleApplyJob = (jobId) => {
    if (profilePercentage !== 100) {
      setOpenModal(true);
      return;
    }
    setLoader(true);
    const payload = {
      jobId: jobId,
    };
    applyJob(userId, payload)
      .then((res) => {
        setLoader(false);
        console.log(res);
        toastMessage(t("apply_job_success_msg"), successType);
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(t("failure_message"));
        console.log(err);
      });
  };
  const hadleSaveJob = (jobId) => {
    if (profilePercentage !== 100) {
      setOpenModal(true);
      return;
    }
    setLoader(true);
    const payload = {
      jobId: jobId,
    };
    saveJob(userId, payload)
      .then((res) => {
        setLoader(false);
        toastMessage(t("job_saved_success_msg"), successType);
        console.log(res);
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(t("failure_message"));
        console.log(err);
      });
  };

  return (
    <Grid item md={12}>
      <Box className="JobBox">
        <Box className="JobInfoBox">
          <Box className="jobsFlex">
            <img src="/work.svg" alt="Logo" className="work" />
            <Box
              className="JobTitle"
              onClick={() => navigate(`/helper/job-detail/${jobDetails._id}`)}
            >
              <Typography variant="h6">
                {jobDetails?.jobDetails?.jobTitle}
              </Typography>
              <Typography variant="body1">
                {jobDetails?.basicInfo?.jobLocation}
              </Typography>
            </Box>
          </Box>
          <Box className="JobdetailBottom">
            <List className="jobDescMini">
              <ListItem>
                <strong>{t("start_date")}:</strong>{" "}
                {jobDetails?.basicInfo?.jobStartDate}
              </ListItem>
              <ListItem>
                <strong>{t("type")}:</strong>Full Time
              </ListItem>
              <ListItem>
                <strong>{t("experience")}:</strong> Expert
              </ListItem>
              <ListItem>
                <strong>{t("location")}:</strong>{" "}
                {jobDetails?.basicInfo?.jobLocation}
              </ListItem>
              <ListItem>
                <strong>{t("language")}:</strong>{" "}
                {jobDetails?.requiredSkills?.language?.length > 0
                  ? jobDetails?.requiredSkills?.language.join(", ")
                  : ""}
              </ListItem>
              <ListItem>
                <strong>{t("map_location")}:</strong>{" "}
                <span>
                  <i>3km, hong kong</i>{" "}
                  <a
                    target="_blank"
                    href={`http://maps.google.com/?q=${jobDetails?.basicInfo?.jobLocation}`}
                  >
                    {t("see_map")}
                  </a>
                </span>
              </ListItem>
            </List>
            <Typography className="postedTime">
              {t("posted")} {calculateTimeAgo(jobDetails?.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box className="JobInfoRight">
          <IconButton
            onClick={() => handleBookmarkToggle(2)}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            {jobDetails?.isSavedByUser ? (
              <BookmarkIcon style={{ color: "#0A6259" }} />
            ) : (
              <BookmarkBorderIcon
                style={{ color: "#0A6259" }}
                onClick={() => hadleSaveJob(jobDetails._id)}
              />
            )}
          </IconButton>
          {badge === JOB_STATUS.APPLIED && <AppliedBadgeIcon />}
          {badge === JOB_STATUS.SAVED && <SaveBadgeIcon />}

          <div className="featuredTag">
            <FeatureIcon />
            {t("featured")}
          </div>

          <Typography variant="h6">
            {jobDetails?.jobDetails?.jobTitle}
          </Typography>
          <Typography variant="body1">
            {jobDetails?.jobDetails?.jobDescription}
          </Typography>
          <Box className="buttonFlex">
            <Button
              className="green-btn small"
              onClick={() => navigate("/helper/chat")}
            >
              {t("contact")}
            </Button>
            {badge ? (
              <ArrowButton
                title={t("view_job")}
                onClick={() => navigate(`/helper/job-detail/${jobDetails._id}`)}
              />
            ) : (
              <ArrowButton
                title={t("apply_job")}
                onClick={() => hadleApplyJob(jobDetails._id)}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
