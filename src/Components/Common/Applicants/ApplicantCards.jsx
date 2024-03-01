import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { JOBS } from "./Constant";
import ApplicantDetails from "./ApplicantDetails";

export default function ApplicantCards() {
  return (
    <>
      {JOBS.map((job, index) => (
        <>
            <Grid key={index} item lg={4} md={6} xs={12}>
            <Box className="helpersCol employerapplicant">
                <Box className="profileUpper">
                <Box className="helperImg">
                    <img
                    src={`images/users/${job.image}`}
                    alt={`Helpers ${index}`}
                    />
                </Box>
                <Box className="helperContent">
                    <Box className="wishlistIcon">
                    <img src="wishlist-icon.svg" alt="Wishlist" />
                    </Box>
                    <Typography variant="h5">{job.title}</Typography>
                    <Box className="locationDate">
                    <Box className="location">{job.location}</Box>
                    <Box className="applicant_age">{job.age} years</Box>
                    </Box>
                </Box>
                </Box>
                <Box className="work_Profile">
                <Typography className="job_role">{job.jobrole}</Typography>
                <Typography className="job_title">{job.jobtitle}</Typography>
                <Typography className="job_desc">{job.jobdescription}</Typography>
                </Box>
                <Box className="buttonFlex">
                <Button className="green-btn small">View Profile</Button>
                <Button className="arrowButton small">View Message</Button>
                </Box>
            </Box>
            </Grid>

            {/* <ApplicantDetails/> */}
        </>
      ))}
    </>
  );
}
