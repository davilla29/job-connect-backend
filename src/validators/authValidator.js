// import Joi from "joi";

// //register validation schema
// const registerSchema = Joi.object({
//   fName: Joi.string().required(),
//   lName: Joi.string().required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
//   role: Joi.string().valid("jobseeker", "recruiter").required(),
// });

// // login validation schema
// const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// export { registerSchema, loginSchema };

import Joi from "joi";

const registerSchema = Joi.object({
  role: Joi.string().valid("applicant", "company").required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),

  // Conditional fields
  fName: Joi.when("role", {
    is: "applicant",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  lName: Joi.when("role", {
    is: "applicant",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  cName: Joi.when("role", {
    is: "company",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
});

// login validation schema remains unchanged
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registerSchema, loginSchema };
