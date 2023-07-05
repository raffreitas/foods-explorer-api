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

import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorators';
import { UserRole } from '../../users/enum/user-role.enum';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    create(@Body() body: CreateProductDto) {
        return this.productsService.create(body);
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
