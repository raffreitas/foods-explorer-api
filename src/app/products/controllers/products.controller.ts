import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from '../services/products.service';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Roles } from 'src/app/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/app/auth/guards/roles.guard';
import { UserRole } from 'src/app/users/entities/user.entity';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.productsService.findOne({ id });
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateProductDto,
    ) {
        return this.productsService.update(id, body);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.productsService.remove(id);
    }
}
