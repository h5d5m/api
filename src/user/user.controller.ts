import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
	constructor(private UserService: UserService) {}

	@Post()
	async createUser(@Body() CreateUserDto: CreateUserDto): Promise<User> {
		return await this.UserService.createUser(CreateUserDto);
	}

	@Get()
	async findAllUsers(): Promise<User[]> {
		return await this.UserService.findAllUsers();
	}

	@Get(':id')
	async findUserById(@Param('id') id: string): Promise<User> {
		return await this.UserService.findUserById(id);
	}

	@Put(':id')
	async updateUserById(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto): Promise<User> {
		return await this.UserService.updateUserById(id, UpdateUserDto);
	}

	@Delete(':id')
	async deleteUserById(@Param('id') id: string): Promise<void> {
		return await this.UserService.deleteUserById(id);
	}
}
