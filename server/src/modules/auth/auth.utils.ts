import jwt from "jsonwebtoken";

//this are needed for creating jwt token
const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const EXPIRES_IN = process.env.EXPIRES_IN || "7d";

//the function is for creating jwttoken, and payload is an agurment pass, and it can either be a string or an object or a bufer
export function signJwt(payload: string | Buffer | object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}

//the function is to verify the jwt token created
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded;
  } catch (e) {
    return null;
  }
}