import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  uid: number;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  activateCode: string;

  @Prop({ default: false })
  activated: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
