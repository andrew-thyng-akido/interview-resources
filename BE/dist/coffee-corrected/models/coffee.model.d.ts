import { Model } from 'sequelize-typescript';
interface CoffeeAttributes {
    id: number;
    name: string;
    brand: string;
    flavors: string[];
    price: number;
}
export declare class CoffeeCorrected extends Model<CoffeeAttributes, Omit<CoffeeAttributes, 'id'>> {
    id: number;
    name: string;
    brand: string;
    flavors: string[];
    price: number;
}
export {};
