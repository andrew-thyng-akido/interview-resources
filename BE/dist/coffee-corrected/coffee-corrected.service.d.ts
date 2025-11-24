import { CoffeeCorrected } from './models/coffee.model';
import { CreateCoffeeCorrectedDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeCorrectedDto } from './dtos/update-coffee.dto';
export declare class CoffeeCorrectedService {
    private readonly coffeeModel;
    constructor(coffeeModel: typeof CoffeeCorrected);
    private calculatePriceWithTax;
    findAll(page?: number, limit?: number): Promise<{
        data: CoffeeCorrected[];
        total: number;
        page: number;
        limit: number;
        totalValue: number;
        totalValueWithTax: number;
    }>;
    findOne(id: number): Promise<CoffeeCorrected>;
    create(dto: CreateCoffeeCorrectedDto): Promise<CoffeeCorrected>;
    update(id: number, dto: UpdateCoffeeCorrectedDto): Promise<CoffeeCorrected>;
    remove(id: number): Promise<void>;
}
