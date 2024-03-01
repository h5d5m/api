import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Connection } from 'src/connection/schemas/connection.schema';

// export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User extends mongoose.Document {
	@Prop({ type: String, default: function genUUID() {
		return uuidv4();
	} })
	_id: string;

	@Prop({ required: true, unique:true })
  	username: string;

  	@Prop({ required: true })
  	password: string;

	@Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Connection'}] })
	connectionIds: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);