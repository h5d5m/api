import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection } from './schemas/connection.schema';
// import { User } from 'src/user/schemas/user.schema';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';
import { UserService } from 'src/user/user.service';
// import { UserInterface } from 'src/user/interfaces/user.interface';
// import { ConnectionInterface } from './interfaces/connection.interface';

@Injectable()
export class ConnectionService {
	constructor(
		@InjectModel(Connection.name) private connectionModel: Model<Connection>,
		private UserService: UserService,
		private readonly logger: Logger,
	) {}
	
	async createConnection(CreateConnectionDto: CreateConnectionDto): Promise<Connection> {
		const {userId, ...rest} = CreateConnectionDto;
		const existingUser = await this.UserService.findUserById(userId);
		if (!existingUser) {
			this.logger.error(`User with ID ${userId} not found`);
			throw new NotFoundException('User not found');
		}
		const createdConnection = await this.connectionModel.create({...rest, userId: existingUser._id});
		await this.UserService.pushConnectionToArray(userId, createdConnection._id);
		this.logger.log(`Connection created: ${createdConnection._id}`);
		return createdConnection;
	}

	async findAllConnections(): Promise<Connection[]> {
		return await this.connectionModel.find();
	}

	async findConnectionById(id: string): Promise<Connection> {
		const connection = await this.connectionModel.findById(id);
		if (!connection) {
			throw new NotFoundException('Connection not found');
		}
		return connection;
	}

	async updateConnectionById(id: string, UpdateConnectionDto: UpdateConnectionDto): Promise<Connection> {
		const updatedConnection = await this.connectionModel.findByIdAndUpdate(id, CreateConnectionDto, {new: true});
		if (!updatedConnection) {
			throw new NotFoundException('Connection not found');
		}
		return updatedConnection;
	}

	async deleteConnectionById(id: string): Promise<void> {
		const deletedConnection = await this.connectionModel.findByIdAndDelete(id);
		if (!deletedConnection) {
			throw new NotFoundException('Connection not found');
		}
		const existingUser = await this.UserService.findUserById(deletedConnection.userId.toString());
		if (!existingUser) {
			throw new NotFoundException('User not found');
		}
		await this.UserService.pullConnectionFromArray(existingUser._id, deletedConnection._id)
	}
}
