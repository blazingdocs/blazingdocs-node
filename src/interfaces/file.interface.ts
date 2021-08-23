type Guid = string;
export interface FileInterface {
    id: Guid;
    name: string;
    contentType: string;
    downloadUrl: string;
    createdAt: Date;
    lastModifiedAt: Date;
    lastAccessedAt: Date;
    length: number
}