import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // hashed

  @Prop({ required: true, enum: ['admin', 'provider'], default: 'provider' })
  role: 'admin' | 'provider';
}

export const UserSchema = SchemaFactory.createForClass(User);
