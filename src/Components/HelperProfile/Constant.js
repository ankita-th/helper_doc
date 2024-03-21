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

export const SKILLS = [
  {
    skill_type: "Care",
    skile_opt: [
      { type: "New Born(0-1)" },
      { type: "Toddler(1-3)" },
      { type: "Child(4-12)" },
      { type: "Teen(13-17)" },
      { type: "Elderly (>70)" },
      { type: "Special Care" },
      { type: "Pet" },
    ],
    // skile_opt: [
    //   { type: "new_born(0-1)" },
    //   { type: "toddler(1-3)" },
    //   { type: "child(4-12)" },
    //   { type: "teen(13-17)" },
    //   { type: "elderly(>70)" },
    //   { type: "special_care" },
    //   { type: "pet" },
    // ],
  },
  {
    skill_type: "Cooking",
    skile_opt: [
      { type: "arabic" },
      { type: "chinese" },
      { type: "indian" },
      { type: "thai" },
      { type: "western" },
      { type: "vegetarian" },
      { type: "baking" },
      { type: "dessert" },
    ],
  },
  {
    skill_type: "HouseholdChore",
    skile_opt: [
      { type: "car_washing" },
      { type: "cleaning" },
      { type: "marketing" },
      { type: "gardening" },
    ],
  },
];

export const MARITAL_STATUS = [
  { value_key: "Single" },
  { value_key: "Married" },
];

export const RELIGION = [
  { value_key: "Hindu" },
  { value_key: "Christian" },
  { value_key: "Islam" },
  { value_key: "Buddhist" },
  { value_key: "Other" },
];

export const EDUCATION_LEVEL = [
  {
    value_key: "O-level",
  },
  {
    value_key: "A-level",
  },
  {
    value_key: "1 university year",
  },
  {
    value_key: "2 university year",
  },
];

export const MAJOR_STUDY = [
  {
    value_key: "Elementary",
  },
  {
    value_key: "Junior High School<",
  },
  {
    value_key: "Senior High School",
  },
  {
    value_key: "College",
  },
  {
    value_key: "Undergraduate",
  },
  {
    value_key: "Graduate",
  },
];

// [
//   "elementary",
//   "junior_high_school",
//   "senior_high_school",
//   "college",
//   "undergraduate",
//   "graduate"
// ]

export const SPOKEN_LANGUAGE = [
  {
    value_key: "English",
  },
  {
    value_key: "Spanish",
  },
  {
    value_key: "German",
  },
  {
    value_key: "French",
  },
];

export const LANGUAGE_LEVEL = [
  {
    value_key: "Beginner",
  },
  {
    value_key: "Intermediate",
  },
  {
    value_key: "Advanced",
  },
];

export const EXPERIENCE_LIST = [
  { value_key: "No prior experience" },
  { value_key: "Less then 1 year of experience" },
  { value_key: "1 year of experience" },
  { value_key: "2 year of experience" },
  { value_key: "3 year of experience" },
  { value_key: "4 year of experience" },
];

export const SPECIAL_HELP_REQUIREMENT = [
  {
    type: "Changing Diaper",
  },
  {
    type: "Bedridden",
  },
  {
    type: "Wheelchair",
  },
];

export const CURRENCY_LIST = [
  {
    value_key: "USD",
  },
  {
    value_key: "HK",
  },
];
export const YES_NO = [
  {
    value_key: "YES",
  },
  {
    value_key: "NO",
  },
];

export const UPLOADE_DOCUMENT = [
  {
    label: "Driving License",
    name: "drivingLicense",
    hasDoc: "hasDrivingLicense",
    uploadFile: "drivingLicenseFile",
  },
  {
    label: "First Aid Certification",
    name: "firstAidCertification",
    hasDoc: "hasFirstAidCertification",
    uploadFile: "firstAidFile",
  },
  {
    label: "Elderly Caregiving",
    name: "elderlyCaregiving",
    hasDoc: "hasElderlyCaregiving",
    uploadFile: "elderlyCaregivingFile",
  },
];

export const DUTIES_OTHER_TASK = [
  { type: "New Born" },
  { type: "Baby Sitting" },
  { type: "Indian Cooking" },
  { type: "Chinese Cooking" },
  { type: "Driving" },
  { type: "Gardening" },
];

export const PREFERRED_DAY_OFF = [
  {
    value_key: "Flexible",
  },
  {
    value_key: "Sunday",
  },
  {
    value_key: "Monday",
  },
  {
    value_key: "Tuesday",
  },
  {
    value_key: "Wednesday",
  },
  {
    value_key: "Thrusday",
  },
  {
    value_key: "Friday",
  },
  {
    value_key: "Saturday",
  },
];

export const SLEEPING_ARRANGEMENT = [
  {
    value_key: "Flexible",
  },
  {
    value_key: "Alone",
  },
];
export const LIVING_ARRANGEMENT = [
  {
    value_key: "Flexible",
  },
  {
    value_key: "Live In",
  },
  {
    value_key: "Live Out",
  },
];

export const STEP5_QUESTION = [
  {
    question: "step4_question_1",
    type: "radio",
    answer_type: "smoke",
  },
  {
    question: "step4_question_2",
    type: "radio",
    answer_type: "vaccinatedCovid19",
  },
  {
    question: "step4_question_3",
    type: "radio",
    answer_type: "hasTattoo",
  },
  {
    question: "step4_question_4",
    type: "radio",
    answer_type: "comfortableWithPets",
  },
  {
    question: "step4_question_5",
    type: "radio",
    answer_type: "comfortableWithCoHelper",
  },
  {
    question: "step4_question_6",
    type: "radio",
    answer_type: "willingToWorkOnNonSundayDayOff",
  },
  {
    question: "step4_question_7",
    type: "radio",
    answer_type: "willingToAcceptMonetaryCompensationOnHolidays ",
  },
  {
    question: "step4_question_8",
    type: "radio",
    answer_type: "agreeToHouseCameraSurveillance ",
  },
  {
    question: "step4_question_9",
    type: "radio",
    answer_type: "willingToReturnHomeByEmployerSetTime",
  },
];
