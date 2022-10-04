import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

//here is checking if the user is login
function requireUser(req: Request, res: Response, next: NextFunction) {
    //checking if res.locals.user contains the decoded acessToken
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
//move to the next function
  return next();
}

export default requireUser;