import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';
import { Connection } from './schemas/connection.schema';

@Controller('connections')
export class ConnectionController {
	constructor(private ConnectionService: ConnectionService) {}

	@Post()
	async createConnection(@Body() CreateConnectionDto: CreateConnectionDto): Promise<Connection> {
		return await this.ConnectionService.createConnection(CreateConnectionDto);
	}

	@Get()
	async findAllConnections(): Promise<Connection[]> {
		return await this.ConnectionService.findAllConnections();
	}

	@Get(':id')
	async findConnectionById(@Param('id') id: string): Promise<Connection> {
		return await this.ConnectionService.findConnectionById(id);
	}

	@Put(':id')
	async updateUserById(@Param('id') id: string, @Body() UpdateConnectionDto: UpdateConnectionDto): Promise<Connection> {
		return await this.ConnectionService.updateConnectionById(id, UpdateConnectionDto);
	}

	@Delete(':id')
	async deleteUserById(@Param('id') id: string): Promise<void> {
		return await this.ConnectionService.deleteConnectionById(id);
	}
}
