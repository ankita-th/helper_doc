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
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b141",
    question: "step1_question_1",
    type: "radio",
    radioOption: ["yes", "no"],
    required: true,
  },
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b143",
    question: "step1_question_2",
    type: "radio",
    radioOption: ["yes", "no"],
    subQuestion: "if_yes_country_question",
    subQuestionType: "country_dropdown",
    required: true,
    subQuestionRequired: true,
  },
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b142",
    question: "step1_question_3",
    type: "radio",
    radioOption: ["yes", "no"],
    subQuestion: "if_yes_country_question",
    subQuestionType: "country_dropdown",
    required: true,
    subQuestionRequired: true,
  },
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b144",
    question: "step1_question_4",
    type: "radio",
    radioOption: ["yes", "no"],
    subQuestion: "step1_question_4_sub_question",
    subQuestionType: "text",
    required: true,
    subQuestionRequired: true,
  },
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b145",
    question: "step1_question_5",
    type: "text",
    required: true,
  },
];

export const SKILLS = {
  care: [
    { type: "new_born(0-1)" },
    { type: "toddler(1-3)" },
    { type: "child(4-12)" },
    { type: "teen(13-17)" },
    { type: "elderly(>70)" },
    { type: "special_care" },
    { type: "pet" },
  ],
  cooking: [
    { type: "arabic" },
    { type: "chinese" },
    { type: "indian" },
    { type: "thai" },
    { type: "western" },
    { type: "vegetarian" },
    { type: "baking" },
    { type: "dessert" },
  ],
  householdChore: [
    { activity: "car_washing" },
    { activity: "cleaning" },
    { activity: "marketing" },
    { activity: "gardening" },
  ],
};
