import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, isNotEmpty, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from "class-validator";

export class CheckoutItemDto {

    @IsInt()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;
    
    @IsInt()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    product_id: number;

}

export class CreateCheckoutDto {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => CheckoutItemDto)
    items: CheckoutItemDto[];
    
}
