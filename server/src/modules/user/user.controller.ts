import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUserHandler(
    //this part is checking what type of req, the first barcket is for parasm, the second is for responseBody, while the third is for reqBody
    //so passing registerUserBody is for us to know what is been pass through the body or what is avaliale in the model
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  const { username, email, password } = req.body;

  try {
    await createUser({ username, email, password });

    return res.status(StatusCodes.CREATED).send("user created successfully");
  } catch (e) {
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}