import { User, UserModel } from "./user.model";

//this createUser function is to register a new user, and the function will be use is usercontroller
//when sending back user that have been created without sending back the comparepassword the omit function is used
export async function createUser(user: Omit<User, "comparePassword">) {
  return UserModel.create(user);
}

//the function is finding user email, the email will be pass through the body 
export async function findUserByEmail(email: User["email"]) {
  return UserModel.findOne({ email });
}