import { ReadStream } from 'fs';

export class FormFile {
    name: string;
    content: ReadStream;

    constructor(name: string, content: ReadStream) {
        this.name = name;
        this.content = content;
    }
}