import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export type CreateCheckoutCommand = {
    items: {
        quantity: number;
        price: any;
        product: {
            name?: string;
            description?: string ;
            image_url?: string;
            product_id?: number;
        }
    }[]
}

export enum  CheckoutStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED',
}

@Entity()
export class Checkout {

    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'id', type: 'int'})
    id: number;

    @Column()
    total: number;

    @Column()
    status: CheckoutStatus = CheckoutStatus.PENDING;
    
    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => CheckoutItem, (item) => item.checkout, {cascade: ['insert'], eager: true})
    items: CheckoutItem[];

    static create(input: CreateCheckoutCommand){
        const checkout = new Checkout();
        checkout.items = input.items.map((item) => {
            const checkoutItem = new CheckoutItem();
            checkoutItem.quantity = item.quantity;
            checkoutItem.price = item.price;
            checkoutItem.product = new CheckoutProduct();
            checkoutItem.product.name = item.product.name;
            checkoutItem.product.description = item.product.description;
            checkoutItem.product.image_url = item.product.image_url;
            checkoutItem.product.product_id = item.product.product_id;
            return checkoutItem
        });
        checkout.total = checkout.items.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        return checkout
    }

    public pay(){
        if(this.status === CheckoutStatus.PAID){
            throw new Error('Checkout alreafy paid');
        }
        if(this.status === CheckoutStatus.FAILED){
            throw new Error('Checkout failed')
        }

        this.status = CheckoutStatus.PAID;
        
    }

    public fail(){
        if(this.status === CheckoutStatus.FAILED){
            throw new Error('Checkout failed')
        }
        if(this.status === CheckoutStatus.PAID){
            throw new Error('Checkout already paid')
        }

        this.status = CheckoutStatus.FAILED;
    }

}

@Entity()
export class CheckoutProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name?: string;

    @Column()
    description?: string;
    
    @Column()
    image_url?: string;
    
    @Column()
    product_id?: number; //id do producto em outro ms
}

@Entity()
export class CheckoutItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column({type: 'decimal', precision: 5, scale: 2})
    price: number;

    @ManyToOne(() => Checkout)
    checkout: Checkout;

    @ManyToOne(() => CheckoutProduct, {cascade: ['insert'], eager: true})
    product: CheckoutProduct
}
