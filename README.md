# Siggy – HTML Signature Generator
This app takes a source file, HTML template and replaces variables accordingly. It will generate a single signature per row in the source CSV.

## Setup
This app runs with [Deno](https://deno.land/). Ensure you have it installed first.

## Development
```
deno run --watch --allow-read --allow-write main.ts
```

## Input files
- HTML template ('./template.html'): An HTML file with curly brace variables ("{{ my_variable }}")
- Source CSV ('./source.csv'): Source file with the first row as headers, the remaining as individual signatures to be generated
- Output directory ('./output'): Where would you like the files to be output?

## Generating signatures
Generate your signatures with the following command:
```
deno run --allow-read --allow-write main.ts
```
This will look for files titled `source.csv`, `template.html`, and output to `./output/{signature}.html`. You can specify each manually of these as follows if you'd prefer different file locations:
```
deno run --allow-read --allow-write main.ts --source='./source.csv' --output='./output' --template='./template.html'
```

## Compiled file
To compile:
```
deno compile --allow-read --allow-write main.ts
```

To use the compiled file, simply run `./siggy` from the command line.
