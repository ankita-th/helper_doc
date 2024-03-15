// steps={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"]}

export const HELPER_STEP_DETAILS = [
  {
    step_key: "step_1",
    step_title_key: "step1_title",
    img: "/images/registration-steps/step1.svg",
  },
  {
    step_key: "step_2",
    step_title_key: "step2_title",
    img: "/images/registration-steps/step2.svg",
  },
  {
    step_key: "step_3",
    step_title_key: "step3_title",
    img: "/images/registration-steps/step3.svg",
  },
  {
    step_key: "step_4",
    step_title_key: "step4_title",
    img: "/images/registration-steps/step4.svg",
  },
  {
    step_key: "step_5",
    step_title_key: "step5_title",
    img: "/images/registration-steps/step5.svg",
  },
  {
    step_key: "step_6",
    step_title_key: "step6_title",
    img: "/images/registration-steps/step6.svg",
  },
];

export const STEP1_QUESTIONS = [
    {
      id: 1,
      question:'step1_question_1',
      type:'radio',
      radioOption:["yes", "no"],
      required: true
    },
    {
      id: 2,
      question:'step1_question_2',
      type: "radio",
      radioOption:["yes", "no"],
      subQuestion:'if_yes_country_question',
      subQuestionType:'country_dropdown',
      required: true,
      subQuestionRequired: true,
    },
    {
      id: 3,
      question:'step1_question_3',
      type: "radio",
      radioOption:["yes", "no"],
      subQuestion:'if_yes_country_question',
      subQuestionType:'country_dropdown',
      required: true,
      subQuestionRequired: true,
    },
    {
      id: 4,
      question:'step1_question_4',
      type: "radio",
      radioOption:["yes", "no"],
      subQuestion:'step1_question_4_sub_question',
      subQuestionType:'text',
      required: true,
      subQuestionRequired: true,
    },
    {
      id: 5,
      question:'step1_question_5',
      type: "text",
      required: true
    },
  ];
