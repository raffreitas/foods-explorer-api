import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    ParseUUIDPipe,
    UseGuards,
    Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';

import { UpdateUserDto, UpdateUserPasswordDto } from './dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.findOneOrFail({ id });
    }

    @Put(':id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Patch(':id/password')
    updatePassword(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateUserDto: UpdateUserPasswordDto,
    ) {
        return this.usersService.updatePassword(id, updateUserDto);
    }
}
