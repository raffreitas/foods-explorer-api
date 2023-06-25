import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';

import { ProductEntity } from './entities/product.entity';
import { IngredientEntity } from './entities/ingredient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, IngredientEntity])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
