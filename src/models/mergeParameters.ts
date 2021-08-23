import { DataSourceType } from '../enums/dataSorceType.enum';

export class MergeParameters {
    dataSourceName: string = 'data';
    dataSourceType: DataSourceType = DataSourceType.Json;
    sequence: boolean = false;
    parseColumns: boolean = false;
    strict: boolean = true

    constructor(dataSourceType?: DataSourceType) { 
        this.dataSourceType = dataSourceType || DataSourceType.Json;
    }
}