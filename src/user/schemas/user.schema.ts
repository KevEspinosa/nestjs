import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  ci: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  bornDate: string;

  @Prop({ required: true })
  studyCareer: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
