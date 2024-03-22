import React, { useEffect, useState } from "react";
import { getHelperPublicProfile } from "../../Services/ProfileServices/ProfileService";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Container, styled } from "@mui/system";

const TitleWrapper = styled("div")({
  textAlign: "center",
  marginTop: " 0, 20px,", // Remove margin from the top
  color: "white", // Change color to white
});

const HeaderBar = styled("div")({
  backgroundColor: "#0a6259", // Background color
  padding: "10px 0", // Padding top and bottom
  marginBottom: "20px", // Margin bottom
});

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function ProfilePreview() {
  const [profileDetails, setProfileDetails] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    getHelperPublicProfile()
      .then((res) => {
        console.log(res.data);
        setProfileDetails(res.data);
        setPageLoader(false);
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {pageLoader && <PageLoader />}
      <HeaderBar className="heroBanner">
        <TitleWrapper>
          <Typography variant="h4" className="pageTitle">
            {t("domestic_helper_form")}
          </Typography>
        </TitleWrapper>
      </HeaderBar>
      <section className="profilePreview">
        <div className="container">
          <div className="topImg d-flex align-items-center">
            <div className="imgWrapper">
              <img
                src={
                  profileDetails?.profilePicURL
                    ? profileDetails.profilePicURL
                    : "./applicantImg.jpg"
                }
                alt="avatar"
              />
            </div>
            <div className="profileName">
              <h2>{profileDetails?.fullName}</h2>
              <p>
                Housekeeper{" "}
                <span className="highlightedText">
                  {profileDetails?.jobType}
                </span>
              </p>
            </div>
          </div>

          <div className="numberVerify">
            <h4 className="profileTitle">Number</h4>
            <span className="highlightedText">+63 9876543210</span>
            <p className="description">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
          </div>

          <div className="profileAbout">
            <h4 className="profileTitle">About Hiroshi Noruma</h4>
            <ul>
              <li>
                <b>Nationality</b> <span>HongKong</span>
              </li>
              <li>
                <b>Date of Birth</b> <span>01/01/2001</span>
              </li>
              <li>
                <b>Marital Status</b> <span>Single</span>
              </li>
              <li>
                <b>Current Location</b> <span>HongKong</span>
              </li>
              <li>
                <b>Religion</b> <span>Islamic</span>
              </li>
              <li>
                <b>Height</b> <span>170cm</span>
              </li>
              <li>
                <b>Passport No</b> <span>X123456(A)</span>
              </li>
              <li>
                <b>Weight</b> <span>65kg</span>
              </li>
            </ul>
          </div>

          <div className="experiencesList">
            <h4 className="profileTitle">Experiences</h4>

            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/experience.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>Domestic Helper</h4>
                  <p className="timeSpan">
                    <span>Dec 2022</span> - <span>Present</span>
                  </p>
                  <span className="role">Housekeeper</span>
                </div>
              </div>
              <div className="profileInner">
                <ul>
                  <li>
                    <b>No of Family Members</b> <span>02 Adults</span>
                  </li>
                  <li>
                    <b>Gender</b> <span>Male</span>
                  </li>
                </ul>
                <p className="description">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries
                </p>

                <ul className="certificates">
                  <li>
                    <a href="">
                      <img src="./pdf.svg" alt="PDF Image" />
                      Experience1.pdf
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/experience.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>Domestic Helper</h4>
                  <p className="timeSpan">
                    <span>Dec 2022</span> - <span>Present</span>
                  </p>
                  <span className="role">Housekeeper</span>
                </div>
              </div>
              <div className="profileInner">
                <ul>
                  <li>
                    <b>No of Family Members</b> <span>02 Adults</span>
                  </li>
                  <li>
                    <b>Gender</b> <span>Male</span>
                  </li>
                </ul>
                <p className="description">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries
                </p>

                <ul className="certificates">
                  <li>
                    <a href="">
                      <img src="./pdf.svg" alt="PDF Image" />
                      Experience1.pdf
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="education experiencesList">
            <h4 className="profileTitle">Education</h4>

            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/graduation.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>Harvard University</h4>
                  <p className="timeSpan">
                    <span>2015</span> - <span>2017</span>
                  </p>
                  <span className="role">
                    Master degree in Computer Science
                  </span>
                </div>
              </div>
            </div>

            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/graduation.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>Harvard University</h4>
                  <p className="timeSpan">
                    <span>2015</span> - <span>2017</span>
                  </p>
                  <span className="role">
                    Master degree in Computer Science
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="skillsetList">
            <h4 className="profileTitle">Skills</h4>

            <div className="skillUInner">
              <h4>Care</h4>
              <ul>
                <li>Newborn(0-1)</li>
                <li>Toddler(1-3)</li>
                <li>Child(4-12)</li>
                <li>Teen (13-17)</li>
                <li>Elderly (>70)</li>
                <li>Special Care</li>
                <li>Pet</li>
              </ul>
            </div>
            <div className="skillUInner">
              <h4>Cooking</h4>
              <ul>
                <li>Arabic</li>
                <li>Chinese</li>
                <li>Indian</li>
                <li>Thai</li>
                <li>Western</li>
                <li>Vegetarian</li>
                <li>Baking</li>
                <li>Dessert</li>
              </ul>
            </div>
            <div className="skillUInner">
              <h4>Household Chore</h4>
              <ul>
                <li>Car Washing</li>
                <li>Cleaning</li>
                <li>Marketing</li>
                <li>Gardening</li>
              </ul>
            </div>
          </div>

          <div className="LanguageKnown experiencesList">
            <h4 className="profileTitle">Language Known</h4>
            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/language.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>English</h4>
                  <p className="timeSpan">
                    <span>Advance</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/language.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>Chinese</h4>
                  <p className="timeSpan">
                    <span>Native</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="documentations experiencesList">
            <h4 className="profileTitle">Documents</h4>
            <ul className="certificates">
              <li>
                <a href="">
                  <img src="./pdf.svg" alt="PDF Image" />
                  Experience1.pdf
                </a>
              </li>
              <li>
                <a href="">
                  <img src="./pdf.svg" alt="PDF Image" />
                  Experience1.pdf
                </a>
              </li>
              <li>
                <a href="">
                  <img src="./pdf.svg" alt="PDF Image" />
                  Experience1.pdf
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
