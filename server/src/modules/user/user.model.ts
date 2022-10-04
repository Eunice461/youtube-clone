//getModelForClass, prop, pre are is a combination of both mongoose and typescript interface
import { getModelForClass, prop, pre } from "@typegoose/typegoose";
// argon2 npm is used to hash password
import argon2 from "argon2";

//the pre fuction is using for hashing the password before saving it into the database because it saver that way
@pre<User>("save", async function (next) {
    //checking if password exist or if the password is new 
  if (this.isModified("password") || this.isNew) {

    //this hash the password and save the password into the database as a combination of words
    const hash = await argon2.hash(this.password);

    this.password = hash;

    return next();
  }
})

//this function is typescript interface and mongoose for saving models into the database
export class User {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  // checking if the comparepassword is same with the password 
  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

//this function here make timestamps to be true, which mean it enbale out model to send back timestamps
export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});