# BlazingDocs Node.js client
High-performance document generation API. Generate documents and reports from СSV, JSON, XML with 99,9% uptime and 24/7 monitoring.

## Installation

Using npm:

```
$ npm install blazingdocs
```

## Integration basics

### Setup

You can get your API Key at https://app.blazingdocs.com

```javascript
const client = BlazingClient('API-KEY')
```

### Getting account info

```javascript
const account = await client.getAccount()
```

### Getting merge templates list

```javascript
const templates = await client.getTemplates()
```

### Getting usage info

```javascript
const usage = await client.getUsage()
```

### Executing merge

```javascript
const client = BlazingClient('API-KEY')

const data = readFileSync(__dirname + '/PO-Template-Array.json', 'utf8');

const parameters: MergeParameters = new MergeParameters();
parameters.sequence = true;

const readStream = createReadStream(__dirname + '/PO-Template-Array.docx');
const template: FormFile = new FormFile("PO-Template-Array.docx", readStream);

const operation = await client.mergeWithFormFile(data, "output.pdf", parameters, template)
```

## Documentation

See more details here https://docs.blazingdocs.com
