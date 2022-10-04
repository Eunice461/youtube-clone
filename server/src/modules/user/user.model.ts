import { getModelForClass, prop, pre } from "@typegoose/typegoose"

export class User {
    @prop({ required: true, unique: true })
    public username: string;

    @prop({ required: true, unique: true })
    public email: string;
}
