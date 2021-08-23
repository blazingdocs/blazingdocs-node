type Guid = string;

export interface PlanInterface {
    id: Guid;
    name: string;
    price: number;
    pricePerUnit: number;
    quota: number;
}