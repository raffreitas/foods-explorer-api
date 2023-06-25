import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
} from '@nestjs/common';

import { UpdateUserDto } from '../dto/update-user.dto';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/app/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/app/auth/guards/roles.guard';
import { UserRole } from '../entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.store(createUserDto);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.findOneOrFail({ id });
    }

    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }
}
