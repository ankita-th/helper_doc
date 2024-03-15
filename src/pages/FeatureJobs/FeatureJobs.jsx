import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ArrowButton from "../../Components/Common/ArrowButton";
import { useTranslation } from "react-i18next";
import HelperCard from "../../Components/Common/HelperCard";
import { JOBS } from "./Constant";

const FeatureJobs = () => {
  const { t } = useTranslation();

  return (
    <section className="jobsSection">
      <Container className="jobsContainer pageContainer">
        <Grid className="findHelperTitle" textAlign="center" item xs={12}>
          <Typography variant="h2" className="title">
            {t("feature_job_section_title")}
          </Typography>
          <Typography variant="body1">
            {t("feature_job_section_content")}
          </Typography>
        </Grid>
        <Grid container spacing={3}>
          {JOBS.map((job, index) => (
            <Grid key={index} item lg={4} md={6} xs={12}>
              <HelperCard card={job} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} textAlign="center" className="pt-4">
          <ArrowButton title={t("find_more_jobs")} />
        </Grid>
      </Container>
    </section>
  );
};

export default FeatureJobs;
