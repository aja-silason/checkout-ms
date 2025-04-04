import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout, CheckoutItem, CheckoutProduct } from './entities/checkout.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Checkout, CheckoutProduct, CheckoutItem])
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
