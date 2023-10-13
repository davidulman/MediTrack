import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  // @Prop({
  //   required: true,
  //   ref: Medical.name,
  //   type: mongoose.Schema.Types.ObjectId,
  // })
  // medical: Medical;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
