import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutModule } from './checkout/checkout.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout, CheckoutItem, CheckoutProduct } from './checkout/entities/checkout.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [Checkout, CheckoutItem, CheckoutProduct],
      synchronize: true,
      logging: true
    }),
    CheckoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
