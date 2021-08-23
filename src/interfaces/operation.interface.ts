import { FileInterface } from './file.interface';
import { OperationTypeInterface } from './operationType.interface';

type Guid = string;

export interface OperationInterface {
    id: Guid;
    type: OperationTypeInterface;
    pageCount: number;
    elapsedMilliseconds: number;
    remoteIpAddress: string;
    files: FileInterface[];
}