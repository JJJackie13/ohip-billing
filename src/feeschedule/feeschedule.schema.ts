import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeeScheduleDocument = FeeSchedule & Document;

@Schema()
export class FeeSchedule {
  @Prop({ required: true }) code: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) amount: number;
}

export const FeeScheduleSchema = SchemaFactory.createForClass(FeeSchedule);
