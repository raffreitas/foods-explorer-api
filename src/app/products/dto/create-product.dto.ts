import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Category } from '../entities/product.entity';

import { CreateIngredientDto } from './create-ingredient.dto';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    category: Category;

    @IsNotEmpty()
    @IsArray()
    ingredients: CreateIngredientDto[];

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    image: string;
}
