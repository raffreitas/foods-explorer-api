import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('ingredients')
export class IngredientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => ProductEntity, (product) => product.ingredients, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: ProductEntity;
}
