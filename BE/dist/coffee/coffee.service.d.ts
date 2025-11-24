import { Coffee } from './models/coffee.model';
export declare class CoffeeService {
    private coffeeModel;
    constructor(coffeeModel: typeof Coffee);
    getAllCoffees(): Promise<Coffee[]>;
    fetchOne(id: number): Promise<Coffee | null>;
    createCoffee(data: any): Promise<Coffee>;
    patchCoffee(id: number, payload: any): Promise<Coffee | null>;
    removeCoffee(id: number): Promise<boolean>;
}
