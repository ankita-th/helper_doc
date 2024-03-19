import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileCompletionProgressBar from "../Profile/ProfileCompletionProgressBar";
import { getProfilePercentage } from "../../../Services/JobsServices/JobServices";
import { useDispatch } from "react-redux";
import { setProfilePercentage } from "../../../Redux/CommonSlice";

export default function HelperDashboardSubHeader({ title, description }) {
  const userId = localStorage.getItem("userId");
  const [percentage, setPercentage] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    getProfilePercentage(userId)
      .then((res) => {
        setPercentage(res.data.percentage);
        dispatch(setProfilePercentage(res.data.percentage));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);
  return (
    <>
      <Typography variant="h2" className="commonTitle">
        {title}
      </Typography>
      <Typography variant="body1" className="commonDesc">
        {description}
      </Typography>
      <ProfileCompletionProgressBar profilePercentage={percentage} />
    </>
  );
}
