import { object, string, TypeOf } from "zod";

//this function create a body for the creation of user and check for some of the error message, this is schema for the user database
export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "username is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("must be a valid email"),
    password: string({
      required_error: "password is required",
    })
      .min(6, "Password must be at least 6 characters long")
      .max(64, "Password should not be longer than 64 characters"),
    confirmPassword: string({
      required_error: "username is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};

//here is giving the type of registerUserSchema, which is a body
export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;