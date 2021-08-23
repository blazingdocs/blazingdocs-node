import { createReadStream, readFileSync } from 'fs';
import { BlazingClient, FormFile, MergeParameters  } from '../src';

describe('BlazingClient', () => {

  const client = new BlazingClient('API-KEY')

  test('getAccount', async () => {
    expect(await client.getAccount()).not.toBeNull();
  });

  test('getTemplates', async () => {
    expect(await client.getTemplates()).not.toBeNull();
  });

  test('getUsage', async () => {
    expect(await client.getUsage()).not.toBeNull();
  });

  test('mergeWithFormFile', async () => {
    const data = readFileSync(__dirname + '/PO-Template.json', 'utf8');

    const parameters: MergeParameters = new MergeParameters();

    const readStream = createReadStream(__dirname + '/PO-Template.docx');
    const template: FormFile = new FormFile('PO-Template.docx', readStream);

    const result = await client.mergeWithFormFile(data, 'output.pdf', parameters, template)

    expect(result).not.toBeNull();
  });

  test('mergeWithId', async () => {
    const data = readFileSync(__dirname + '/PO-Template.json', 'utf8');
    const parameters: MergeParameters = new MergeParameters();
    const guid: string = 'TEMPLATE-ID';

    const result = await client.mergeWithId(data, 'output.pdf', parameters, guid);

    expect(result).not.toBeNull();
  })

  test('mergeWithRelativePath', async () => {
    const data = readFileSync(__dirname + '/PO-Template.json', 'utf8');
    const parameters: MergeParameters = new MergeParameters();
    const path = 'RELATIVE-PATH';  // e.g. 'folder/nested_folder/Template.docx'

    const result = await client.mergeWithRelativePath(data, 'output.pdf', parameters, path)

    expect(result).not.toBeNull();
  })

  test('MergeWithArray', async () => {
    const data = readFileSync(__dirname + '/PO-Template-Array.json', 'utf8');

    const parameters: MergeParameters = new MergeParameters();
    parameters.sequence = true;

    const readStream = createReadStream(__dirname + '/PO-Template-Array.docx');
    const template: FormFile = new FormFile('PO-Template-Array.docx', readStream);

    const result = await client.mergeWithFormFile(data, 'output.pdf', parameters, template)

    expect(result).not.toBeNull();
  })
});
