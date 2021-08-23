import {BlazingError} from '../errors';
import {FormFile} from '../models/formFile';
import {MergeParameters} from '../models/mergeParameters';
import {AccountInterface} from './account.interface';
import {OperationInterface} from './operation.interface';
import {TemplateInterface} from './template.interface';
import {UsageInterface} from './usage.interface';

type Guid = string;

export interface BlazingClientInterface {

    getAccount(): Promise<AccountInterface>;

    getTemplates(path: string): Promise<TemplateInterface[]>;

    getUsage(): Promise<UsageInterface>;

    mergeWithId(data: string, filename: string, parameters: MergeParameters, guid: Guid): Promise<OperationInterface>;

    mergeWithRelativePath(data: string, filename: string, parameters: MergeParameters, relativePath: string): Promise<OperationInterface>;

    mergeWithFormFile(data: string, filename: string, parameters: MergeParameters, formFile: FormFile): Promise<OperationInterface>;
}
