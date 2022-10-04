import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../modules/auth/auth.utils";

//here is checking if accessToken is present in the cookies or header
function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ""
  ).replace(/^Bearer\s/, "");

  if (!accessToken) {
    return next();
  }
//if accessToken is present, then verify it
  const decoded = verifyJwt(accessToken);

  //assigning the value to the save in res.locals.user. so the accessTokn can be get from res.locals.user
  //and in between req.user is same as res.locals.user
  if (decoded) {
    res.locals.user = decoded;
  }
//the return next means it should not stop there n=but to contiune with the next function
  return next();
}

export default deserializeUser;