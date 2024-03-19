import React from "react";
import "./progressBar.css";
import { Link } from "react-router-dom";

export default function ProfileCompletionProgressBar({ profilePercentage }) {
  return (
    <div className="complete-profile-right text-left">
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${profilePercentage}%` }}
          aria-valuenow={`${profilePercentage}`}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <p>
        <span>{profilePercentage}%</span> of your profile is complete {">"}{" "}
        <Link>Get Verified</Link> +20%
      </p>
    </div>
  );
}
