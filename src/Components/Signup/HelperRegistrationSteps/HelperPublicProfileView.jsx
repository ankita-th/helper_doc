import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  styled,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const TitleWrapper = styled("div")({
  textAlign: "center",
  color: "white",
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between", // Align items with space between
  paddingRight: "20px", // Add right padding for space
});
const HeaderBar = styled("div")({
  backgroundColor: "#0a6259",
  padding: "10px 0",
  marginBottom: "20px",
});

const HelperPublicProfileView = ({
  formData,
  setFormData,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleBack = () => {
    navigate(-1); // This will navigate back to the previous location
  };

  const handleSkillsChange = (event) => {
    const skill = event.target.name;
    if (event.target.checked) {
      setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, skill]);
    } else {
      setSelectedSkills((prevSelectedSkills) =>
        prevSelectedSkills.filter((s) => s !== skill)
      );
    }
  };

  const experienceData = [
    {
      label: "Job 1",
      title: "Hotel Housekeeper",
      duration: "Dec 2022 - Present",
      role: "Housekeeper",
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything",
    },
    {
      label: "Job 2",
      title: "Babysitter",
      duration: "Dec 2021 - Nov 2022",
      role: "Child Care",
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything",
    },
    {
      label: "Job 3",
      title: "Chef",
      duration: "Oct 2020 - Nov 2021",
      role: "Cooking",
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything",
    },
  ];

  const educationData = [
    {
      label: "School 1",
      institute: "Harvard University",
      year: "2015 - 2017",
      study: "Master degree in Computer Science",
    },
    {
      label: "School 2",
      institute: "Harvard University",
      year: "2015 - 2017",
      study: "Master degree in Computer Science",
    },
  ];

  const knownLanguageData = [
    {
      label: "Language 1",
      title: "English",
      level: "Advance",
    },
    {
      label: "Language 2",
      title: "Chinese",
      level: "Native",
    },
  ];

  return (
    <>
      <HeaderBar>
        <TitleWrapper>
          <Button onClick={handleBack} style={{ alignSelf: "flex-start" }}>
            <ArrowBack style={{ color: "white" }} />
          </Button>
          <Typography
            variant="h4"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            View Public Profile
          </Typography>
        </TitleWrapper>
      </HeaderBar>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 100, height: 100, marginRight: "16px" }}>
                <img id="avatar" src={`/default.png`} alt="Avatar" />
              </Avatar>
              <div style={{ marginLeft: "16px" }}>
                <Typography variant="h5">Yee Ting </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "8px" }}>
                    Housekeeper
                  </Typography>
                  <Button variant="outlined">Full Time</Button>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <Button variant="contained" color="primary">
              View CV
            </Button>
          </Grid>
        </Grid>
        <Box marginY={5}>
          <Typography>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. There are many variations of passages of Lorem Ipsum
            available, but the majority have suffered alteration in some form,
            by injected humour, or randomised words which don't look even
            slightly believable.
          </Typography>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">Experience</Typography>
              <Stepper orientation="vertical">
                {experienceData.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    marginBottom={1}
                  >
                    <div
                      style={{
                        marginRight: "8px",
                        border: "1px solid #55DBA6",
                        borderRadius: "20%",
                        padding: "4px",
                      }}
                    >
                      <img
                        src={`/experience.svg`}
                        alt="experience"
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                      />
                    </div>
                    <div>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body1">{item.duration}</Typography>
                      <Typography variant="body1">{item.role}</Typography>
                      <Typography variant="body1">
                        {item.description}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">Education</Typography>
              <Stepper orientation="vertical">
                {educationData.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    marginBottom={1}
                  >
                    <div
                      style={{
                        marginRight: "8px",
                        border: "1px solid #55DBA6",
                        borderRadius: "20%",
                        padding: "4px",
                      }}
                    >
                      <img
                        src={`/graduation.svg`}
                        alt="graduation"
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                      />
                    </div>
                    <div>
                      <Typography variant="h6">{item.institute}</Typography>
                      <Typography variant="body1">{item.year}</Typography>
                      <Typography variant="body1">{item.study}</Typography>
                    </div>
                  </Box>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined">
            <CardContent>
              <FormControl fullWidth>
                <Typography variant="h5" id="skills">
                  Skills
                </Typography>
                <FormGroup>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Typography variant="body1" component="legend">
                        Care
                      </Typography>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSkills.includes("New Born")}
                              onChange={handleSkillsChange}
                              name="New Born"
                            />
                          }
                          label="New Born"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSkills.includes("Baby Sitting")}
                              onChange={handleSkillsChange}
                              name="Baby Sitting"
                            />
                          }
                          label="Baby Sitting"
                        />
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <Typography variant="body1" component="legend">
                        Cooking
                      </Typography>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSkills.includes(
                                "Indian Cooking"
                              )}
                              onChange={handleSkillsChange}
                              name="Indian Cooking"
                            />
                          }
                          label="Indian Cooking"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSkills.includes(
                                "Chinese Cooking"
                              )}
                              onChange={handleSkillsChange}
                              name="Chinese Cooking"
                            />
                          }
                          label="Chinese Cooking"
                        />
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <Typography variant="body1" component="legend">
                        Household
                      </Typography>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSkills.includes("Gardening")}
                              onChange={handleSkillsChange}
                              name="Gardening"
                            />
                          }
                          label="Gardening"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSkills.includes("Driving")}
                              onChange={handleSkillsChange}
                              name="Driving"
                            />
                          }
                          label="Driving"
                        />
                      </FormGroup>
                    </FormGroup>
                  </FormControl>
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">Languages Known</Typography>
              <Grid container spacing={2}>
                {knownLanguageData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box display="flex" alignItems="center" marginBottom={1}>
                      <div
                        style={{
                          marginRight: "8px",
                          border: "1px solid #55DBA6",
                          borderRadius: "20%",
                          padding: "4px",
                        }}
                      >
                        <img
                          src={`/language.svg`}
                          alt="language"
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                      <div>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body1">{item.level}</Typography>
                      </div>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default HelperPublicProfileView;
