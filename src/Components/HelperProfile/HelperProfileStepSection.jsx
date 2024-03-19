import { Step, Stepper } from "@mui/material";
import React from "react";
import { HELPER_STEP_DETAILS } from "./Constant";
import { useTranslation } from "react-i18next";

const HelperProfileStepSection = ({ activeStep, steps, titles, stepIcons }) => {
  const { t } = useTranslation();
  return (
    <div className="stepperNavigation">
      <Stepper activeStep={activeStep} alternativeLabel>
        {HELPER_STEP_DETAILS.map((step, index) => (
          <Step key={step.step_key} completed={index+1 === activeStep}>
            <div className="step-wrapper">
              <div
                className={`${
                  index+1 === activeStep ? "active-step" : "step-icon"
                }`}
              >
                <img src={step.img} alt={`Step ${index + 1}`} />
              </div>
              <span>{t(step.step_key)}</span>
              <h4>{t(step.step_title_key)}</h4>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default HelperProfileStepSection;
