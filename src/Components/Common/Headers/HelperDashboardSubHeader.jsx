import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileCompletionProgressBar from "../Profile/ProfileCompletionProgressBar";
import { getProfilePercentage } from "../../../Services/JobsServices/JobServices";
import { useDispatch } from "react-redux";
import { setProfilePercentage } from "../../../Redux/CommonSlice";
import './HeaderStyle.css'

export default function HelperDashboardSubHeader({
  title,
  description,
  progessBar = true,
  isChat = false,
  filter,
  setFilter
}) {
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
    <div className="d-flex align-items-top justify-content-between">
      <div className="d-flex flex-column">
        <Typography variant="h2" className="commonTitle">
          {title}
        </Typography>
        <Typography variant="body1" className="commonDesc">
          {description}
        </Typography>
      </div>
        {progessBar && (
          <ProfileCompletionProgressBar profilePercentage={percentage} />
        )}
        {
          isChat && (  <FormControl
            variant="outlined"
            sx={{ minWidth: 300 }}
            className="queRow"
          >
            <InputLabel id="filter-messages-label">
              All Messages
            </InputLabel>
            <Select
              className="formInputFiled"
              labelId="filter-messages-label"
              id="filter-messages"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter Messages"
            >
              <MenuItem value="">All Messages</MenuItem>
              <MenuItem value="John Doe">John Doe</MenuItem>
              <MenuItem value="Jane Smith">Jane Smith</MenuItem>
            </Select>
          </FormControl>)
        }
    </div>
    </>
  );
}
