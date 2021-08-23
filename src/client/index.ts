import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import * as FormData from 'form-data'
import {BlazingArgumentsError, BlazingError} from '../errors';
import {
    AccountInterface,
    BlazingClientInterface,
    OperationInterface,
    TemplateInterface,
    UsageInterface
} from '../interfaces';
import {FormFile, MergeParameters} from '../models';
import {isGuid, isRelativePath} from '../utils';

const BASE_URL = 'https://api.blazingdocs.com';
const TIMEOUT = 10000;

type Guid = string;

export class BlazingClient implements BlazingClientInterface {
    private readonly httpClient: AxiosInstance;

    constructor(apiKey: string) {
        this.httpClient = axios.create({
            baseURL: BASE_URL,
            timeout: TIMEOUT,
        });

        this.httpClient.defaults.headers.common['X-API-Key'] = apiKey;
    }

    async getAccount(): Promise<AccountInterface> {
        const response: AxiosResponse = await this.httpClient.get('/account')
            .catch((err: AxiosError) => {
                const message = err.response?.data.message || err.message;
                const status = err.response?.status;
                throw new BlazingError(message, status);
            });
        return response.data as AccountInterface;
    };

    async getTemplates(path: string = ''): Promise<TemplateInterface[]> {
        const response: AxiosResponse = await this.httpClient.get(`/templates/${path}`)
            .catch((err: AxiosError) => {
                const message = err.response?.data.message || err.message;
                const status = err.response?.status;
                throw new BlazingError(message, status);
            });
        return response.data as TemplateInterface[];
    };

    async getUsage(): Promise<UsageInterface> {
        const response: AxiosResponse = await this.httpClient.get('/usage')
            .catch((err: AxiosError) => {
                const message = err.response?.data.message || err.message;
                const status = err.response?.status;
                throw new BlazingError(message, status);
            });
        return response.data as UsageInterface;
    };

    async mergeWithId(data: string, filename: string, parameters: MergeParameters, guid: Guid): Promise<OperationInterface> {
        return this.merge(data, filename, parameters, guid);
    }

    async mergeWithRelativePath(data: string, filename: string, parameters: MergeParameters, relativePath: string): Promise<OperationInterface> {
        return this.merge(data, filename, parameters, relativePath);
    }

    async mergeWithFormFile(data: string, filename: string, parameters: MergeParameters, formFile: FormFile): Promise<OperationInterface> {
        return this.merge(data, filename, parameters, formFile);
    }

    private async merge(data: string, fileName: string, parameters: MergeParameters, template: string | FormFile): Promise<OperationInterface> {
        const form = new FormData();

        if (!data) {
            throw new BlazingArgumentsError('Data is not provided');
        }

        form.append('Data', data);

        if (!fileName) {
            throw new BlazingArgumentsError('Output filename is not provided');
        }

        form.append('OutputName', fileName);

        if (!parameters || !Object.keys(parameters).length) {
            throw new BlazingArgumentsError('Merge parameters are not provided');
        }

        form.append('MergeParameters', JSON.stringify(parameters));

        if (!template) {
            throw new BlazingArgumentsError('Template is not provided');
        }

        if (isGuid(template)) {
            form.append('Template', template);
        } else if (typeof template === 'string' && isRelativePath(template)) {
            form.append('Template', template.replace('\\', '/').trim());
        } else if (template instanceof FormFile) {
            form.append('Template', template.content, {filename: template.name})
        }

        const response: AxiosResponse =
            await this.httpClient.post('/operation/merge', form, {headers: form.getHeaders()})
                .catch((err: AxiosError) => {
                    const message = err.response?.data.message || err.message;
                    const status = err.response?.status;
                    throw new BlazingError(message, status);
                });

        return response.data as OperationInterface;
    };
}
