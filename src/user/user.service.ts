import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}
	
	async createUser(CreateUserDto: CreateUserDto): Promise<User> {
		const createdUser = await this.userModel.create(CreateUserDto);
		return createdUser;
	}

	async findAllUsers(): Promise<User[]> {
		return await this.userModel.find();
	}

	async findUserById(id: string): Promise<User> {
		const user = await this.userModel.findById(id);
		return user;
	}

	async updateUserById(id: string, UpdateUserDto: UpdateUserDto): Promise<User> {
		const updatedUser = await this.userModel.findByIdAndUpdate(id, UpdateUserDto, {new: true});
		if (!User) {
			throw new NotFoundException('User not found');
		}
		return updatedUser;
	}

	async pushConnectionToArray(userId: string, connectionId: string): Promise<User> {
		return this.userModel.findByIdAndUpdate(userId, {$push: {connectionIds: connectionId}});
	}

	async pullConnectionFromArray(userId: string, connectionId: string): Promise<User> {
		return this.userModel.findByIdAndUpdate(userId, {$pull: {connectionIds: connectionId}});
	}

	async deleteUserById(id: string): Promise<void> {
		const deletedUser = await this.userModel.findByIdAndDelete(id);
		if (!User) {
			throw new NotFoundException('User not found');
		}
	}
}
