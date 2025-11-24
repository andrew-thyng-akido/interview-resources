import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
export declare class CoffeeController {
    private svc;
    constructor(svc: CoffeeService);
    grabAll(): Promise<any[]>;
    single(id: string): Promise<any>;
    make(dto: CreateCoffeeDto): Promise<any>;
    mutate(id: string, body: UpdateCoffeeDto): Promise<any>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
}
