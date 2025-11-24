import { Model } from 'sequelize-typescript';
export declare class Coffee extends Model<any> {
    id: number;
    name: string;
    brand: string;
    flavors: string[];
    price: number;
}
