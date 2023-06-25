import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { IngredientEntity } from './ingredient.entity';

export enum Category {
    MEAL = 'Refeição',
    DESSERT = 'Sobremesa',
    BEVERAGE = 'Bebida',
}

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, unique: true })
    name: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    price: number;

    @Column({ type: 'enum', enum: Category })
    category: Category;

    @OneToMany(() => IngredientEntity, (ingredient) => ingredient.product, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    ingredients: IngredientEntity[];

    @Column({ length: 255 })
    description: string;

    @Column({ length: 255 })
    image: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
