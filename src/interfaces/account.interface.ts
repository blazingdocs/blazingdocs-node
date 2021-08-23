import { PlanInterface } from './plan.interface';

type Guid = string;
export interface AccountInterface {
    id: Guid;
    plan: PlanInterface;
    apiKey: string;
    obsoleteApiKey: string;
    name: string;
    createdAt: Date;
    lastSyncedAt: Date;
    updatedAt: Date;
}