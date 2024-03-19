import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { STEP1_QUESTIONS } from "./Constant";
import { useTranslation } from "react-i18next";
import RadioGroupField from "../Common/FormFields/RadioGroupField";
import CountryDropdown from "../Common/FormFields/CountryDropdown";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));

const HelperRegistrationStep1 = ({ saveStepDetails, stepDetails }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const handleNextStep = (questAnswer) => {
    const answerArray = [];
    for (const key in questAnswer) {
      if (!key.startsWith("sub_que_")) {
        answerArray.push({
          questionId: key,
          answer: questAnswer[key],
          subAnswer: questAnswer[`sub_que_${key}`] || "",
        });
      }
    }
    const payload ={
      answers: answerArray
    }
    saveStepDetails(payload, 'applicant_info');
    // Iterate over originalObject
    // for (const key in questAnswer) {
    //   if (key.startsWith("answer_")) {
    //     const questionId = key.split("_")[1]; // Extract questionId
    //     const subKey = `sub_que_${questionId}`;
    //     // const subAnswer = Array.isArray(questAnswer[subKey])
    //     //   ? questAnswer[subKey].join(", ")
    //     //   : questAnswer[subKey] || "";
    //     const subAnswer = questAnswer[subKey] || "";

    //     answerArray.push({
    //       questionId,
    //       answer: questAnswer[key],
    //       subAnswer: subAnswer || "",
    //     });
    //   }
    // }
  };

  return (
    <Grid item xs={12} md={6} className="stepsForm formDataInfo ">
      <StyledPaper className="StepFormCol">
        <form onSubmit={handleSubmit(handleNextStep)}>
          {STEP1_QUESTIONS.map((ques, index) => (
            <div key={ques.id} className="queRow">
              <Typography variant="body1" className="queTitle">
                {t(ques.question)}*
              </Typography>
              {ques.type === "radio" && (
                <Controller
                  name={ques.id}
                  control={control}
                  defaultValue=""
                  rules={{ required: t("answer_required_msg") }}
                  render={({ field }) => (
                    <RadioGroupField
                      radioOptions={ques.radioOption}
                      field={field}
                    />
                  )}
                />
              )}
              {ques.type === "text" && (
                <Controller
                  name={ques.id}
                  control={control}
                  defaultValue=""
                  rules={{ required: t("answer_required_msg") }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      fullWidth
                      rows={4}
                      className="formInputFiled"
                      variant="outlined"
                      placeholder="Your answer..."
                    />
                  )}
                />
              )}
              {ques.subQuestion && watch(ques.id) === "Yes" && (
                <div>
                  <Typography variant="body1">
                    {t(ques.subQuestion)}*
                  </Typography>
                  {ques.subQuestionType === "country_dropdown" ? (
                    <>
                      <Controller
                        name={`sub_que_${ques.id}`}
                        control={control}
                        type="text"
                        rules={{ required: t("answer_required_msg") }}
                        defaultValue={""}
                        render={({ field }) => (
                          <CountryDropdown field={field} />
                        )}
                      />
                    </>
                  ) : (
                    <Controller
                      name={`sub_que_${ques.id}`}
                      control={control}
                      defaultValue=""
                      rules={{ required: t("answer_required_msg") }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="formInputFiled"
                          multiline
                          fullWidth
                          rows={4}
                          variant="outlined"
                          label="Your answer..."
                        />
                      )}
                    />
                  )}
                  {errors[`sub_que_${ques.id}`] && (
                    <ErrorMessage msg={errors[`sub_que_${ques.id}`]?.message} />
                  )}
                </div>
              )}
              {errors[ques.id] && (
                <ErrorMessage msg={errors[ques.id]?.message} />
              )}
            </div>
          ))}
          <Button className="arrowButton" type="submit">
            Next Step
          </Button>
        </form>
      </StyledPaper>
    </Grid>
  );
};

export default HelperRegistrationStep1;
