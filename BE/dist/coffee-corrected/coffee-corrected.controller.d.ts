import { CoffeeCorrectedService } from './coffee-corrected.service';
import { CreateCoffeeCorrectedDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeCorrectedDto } from './dtos/update-coffee.dto';
export declare class CoffeeCorrectedController {
    private readonly coffeeService;
    constructor(coffeeService: CoffeeCorrectedService);
    getAll(page?: string, limit?: string): Promise<{
        data: import("./models/coffee.model").CoffeeCorrected[];
        total: number;
        page: number;
        limit: number;
        totalValue: number;
        totalValueWithTax: number;
    }>;
    getOne(id: string): Promise<import("./models/coffee.model").CoffeeCorrected>;
    create(dto: CreateCoffeeCorrectedDto): Promise<import("./models/coffee.model").CoffeeCorrected>;
    update(id: string, dto: UpdateCoffeeCorrectedDto): Promise<import("./models/coffee.model").CoffeeCorrected>;
    remove(id: string): Promise<void>;
}
