import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  List,
  ListItem,
  Menu,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  applyJob,
  getJobDetails,
  saveJob,
} from "../../../Services/JobsServices/JobServices";
import { toastMessage } from "../../../Utils/toastMessages";
import { useTranslation } from "react-i18next";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import HelperDashboardSubHeader from "../../../Components/Common/Headers/HelperDashboardSubHeader";
import { useSelector } from "react-redux";
import ProfileNotCompleteModal from "../../../Components/Common/Modal/ProfileNotCompleteModal";
import { successType } from "../../../Constant/Constant";
import JobCard from "../../../Components/Common/JobCard/JobCard";
// import MenuIcon from './tripleDots.svg';

const recommendedJobs = [
  {
    id: 1,
    start_date: "As soon as possible",
    language: "English",
    experience: "Expert",
    title: "Housekeeping",
    titleRight: "A proactive helper to provide excellent childcare",
    description:
      "IMPORTANT: Only apply if you have read the full advert: MUST BE ABLE TO FOLLOW INSTRUCTIONS AND HAVE COMMON SENSE! To apply: RECORD A YOUTUBE VIDEO OR A sound file if you prefer - talk about your experience with children and why you would be a good choice for us. At least 1 minute. Thanks. This is a professional job and we are professional people, so we are looking for a true professional. Thanks. Us: Western family of 5 - 2 working parents, 2 young kids at KG and 1 new baby.",
    location: "Hong Kong",
    date: "From 27 Feb 2024",
    type: "Full Time",
    map_location: "3km, hong kong",
  },
];

const JobDetails = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [jobDetails, setJobDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [openModal, setOpenModal] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const { profilePercentage } = useSelector((state) => state.common);

  useEffect(() => {
    if (id) {
      setLoader(true);
      getJobDetails(id)
        .then((res) => {
          console.log(res.data);
          setJobDetails(res.data);
          setLoader(false);
        })
        .catch((err) => {
          toastMessage(t("invalid_job"));
          navigate("/helper/job-dashboard");
          setLoader(false);
          console.log(err);
        });
    }
  }, [id]);
  const hadleApplyJob = () => {
    if (profilePercentage !== 100) {
      setOpenModal(true);
      return;
    }
    setLoader(true);
    const payload = {
      jobId: id,
    };
    applyJob(userId, payload)
      .then((res) => {
        setLoader(false);
        console.log(res);
        setJobDetails({ ...jobDetails, isApplied: true });
        toastMessage(t("apply_job_success_msg"), successType);
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(t("failure_message"));
        console.log(err);
      });
  };
  const hadleSaveJob = () => {
    if (profilePercentage !== 100) {
      setOpenModal(true);
      return;
    }
    setLoader(true);
    const payload = {
      jobId: id,
    };
    saveJob(userId, payload)
      .then((res) => {
        setLoader(false);
        setJobDetails({ ...jobDetails, isSavedByUser: true });
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
    <>
      {loader && <PageLoader />}
      <Box maxWidth="xl" className="dashboardCol">
        {/* Filter Component Placeholder */}
        <HelperDashboardSubHeader
          title={t("job_details")}
          description={t("find_job_you_love")}
        />
        {/* Recommended Jobs Section */}
        <Grid className="JobsListRow">
          <Box
            className="profileCardBox"
            border={1}
            borderRadius={8}
            borderColor="#DDDDDD"
            py={4}
            px={4}
            mb={2}
            mt={2}
          >
            <Grid item md={12} container>
              <Grid item md={5}>
                <Box className="jobsFlex jobDescription">
                  <Box className="jobsFlex">
                    <img src="/work.svg" alt="Logo" className="work" />
                    <Box className="JobTitle">
                      <Typography variant="h6">
                        {jobDetails?.job?.jobDetails?.jobTitle}
                      </Typography>
                      <Typography variant="body1">
                        {jobDetails?.job?.basicInfo?.jobLocation}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="JobdetailBottom">
                    <List className="jobDescMini">
                      <ListItem>
                        <strong>Location:</strong>{" "}
                        {jobDetails?.job?.basicInfo?.jobLocation}
                      </ListItem>
                      <ListItem>
                        <strong>{t("type")}:</strong>
                        {jobDetails?.job?.basicInfo?.jobType}
                      </ListItem>
                      <ListItem>
                        <strong>{t("experience")}:</strong> Expert
                      </ListItem>
                      <ListItem>
                        <strong>{t("language")}:</strong>{" "}
                        {jobDetails?.job?.requiredSkills?.language?.length > 0
                          ? jobDetails?.job?.requiredSkills?.language.join(", ")
                          : ""}
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={7} className="ViewOptionDesc">
                <div className="d-flex">
                  <Button
                    className="green-btn small"
                    variant="contained"
                    color="primary"
                    onClick={hadleApplyJob}
                    disabled={jobDetails?.job?.isApplied}
                  >
                    {jobDetails?.job?.isApplied ? "Already Applied" : "Apply"}
                  </Button>
                  <Button
                    className="small btn-transparent"
                    variant="contained"
                    color="primary"
                    onClick={hadleSaveJob}
                    disabled={jobDetails?.job?.isSavedByUser}
                  >
                    {jobDetails?.job?.isSavedByUser ? (
                      <>
                        <BookmarkIcon style={{ color: "#0A6259" }} /> Job Saved{" "}
                      </>
                    ) : (
                      <>
                        <BookmarkBorderIcon style={{ color: "#0A6259" }} />
                        Save Job
                      </>
                    )}
                  </Button>
                </div>

                <div className="d-flex">
                  <Link
                    to={"/helper/job-dashboard"}
                    className="small btn-light"
                    variant="contained"
                  >
                    See More Jobs
                  </Link>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth className="selectiondrop">
                      <InputLabel id="demo-simple-select-label">
                        <img
                          src="/tripleDots.svg"
                          alt="Logo"
                          className="work"
                        />
                      </InputLabel>
                      <div>
                        <Menu
                          id="menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>Option 1</MenuItem>
                          <MenuItem onClick={handleClose}>Option 2</MenuItem>
                          <MenuItem onClick={handleClose}>Option 3</MenuItem>
                        </Menu>
                      </div>
                    </FormControl>
                  </Box>
                </div>
              </Grid>
            </Grid>

            <hr className="hrSetting"></hr>

            <Grid className="detailingJob">
              <Typography variant="h6">Job Description</Typography>
              <Typography variant="body1">
                {jobDetails?.job?.jobDetails?.jobDescription}
              </Typography>
            </Grid>

            <Grid className="detailingJob">
              <Typography variant="h6">Key Responsibilities</Typography>
              <Typography variant="body1">
                Etiam eget leo ut enim vehicula congue ac sit amet nunc. Proin
                vel justo nec felis posuere hendrerit vel in eros. Nullam vitae
                orci vitae ex feugiat molestie. Duis et est urna. Vivamus id
                ante velit. Sed lorem lacus, vehicula interdum augue eget,
                commodo malesuada dolor. Sed at posuere nunc,{" "}
              </Typography>
              <List>
                <ListItem>Sed posuere lacus vitae iaculis.</ListItem>
                <ListItem>Nunc sapien.</ListItem>
                <ListItem>lectus, tempus at lacus.</ListItem>
              </List>
            </Grid>

            <Grid className="detailingJob">
              <Typography variant="h6">Additional Information</Typography>
              <Typography variant="body1">
                Fusce ut lacinia enim. Pellentesque porta posuere dolor non
                varius. Mauris ultrices, nisi vitae lacinia posuere, lectus
                purus eleifend tellus, et convallis ligula metus ut sapien. Sed
                a maximus orci. Vestibulum vulputate venenatis mi non fermentum.
                Sed semper metus ut finibus rhoncus. Phasellus eleifend
                vulputate mauris, sit amet viverra est malesuada tincidunt. Duis
                id nunc tincidunt, porta velit sed, finibus ligula. In varius
                malesuada mauris, at ultrices ipsum fermentum at. Nulla non
                augue eget mi ultricies aliquet. Aenean blandit diam arcu.
              </Typography>
            </Grid>
          </Box>
        </Grid>

        {/* Recommended Jobs Section */}
        <JobCard
          jobDetails={jobDetails?.similarJob}
          setLoader={setLoader}
          setJobDetails={setJobDetails}
          setOpenModal={setOpenModal}
        />
      </Box>
      {openModal && <ProfileNotCompleteModal open={openModal} />}
    </>
  );
};

export default JobDetails;
