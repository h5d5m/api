import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/schemas/user.schema';

// export type UserDocument = mongoose.HydratedDocument<Connection>;

@Schema()
export class Connection extends mongoose.Document {
	@Prop({ type: String, default: function genUUID() {
		return uuidv4();
	} })
	_id: string;
	
	@Prop({ required: true, unique:true })
  	privateKey: string;

  	@Prop({ required: true, unique:true })
  	ipv4Address: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	userId: mongoose.Types.ObjectId;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);