import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { ProductEntity } from '../entities/product.entity';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { MessagesHelper } from '../../../helpers';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
    ) {}

    async create(data: CreateProductDto) {
        const alreadyExists = await this.productsRepository.findOne({
            where: { name: data.name },
        });

        if (alreadyExists) {
            throw new BadRequestException(
                MessagesHelper.PRODUCT_ALREADY_EXISTS,
            );
        }

        const product = this.productsRepository.create(data);
        return await this.productsRepository.save(product);
    }

    async findAll() {
        return await this.productsRepository.find({});
    }

    async findOne(options: FindOptionsWhere<ProductEntity>) {
        return await this.productsRepository.findOne({
            where: options,
            relations: ['ingredients'],
        });
    }

    async update(id: string, data: UpdateProductDto) {
        const product = await this.productsRepository.findOneByOrFail({ id });
        this.productsRepository.merge(product, data);
        return this.productsRepository.save(product);
    }

    async remove(id: string) {
        const product = await this.productsRepository.findOneByOrFail({ id });
        return await this.productsRepository.remove(product);
    }
}
