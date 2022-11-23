import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";
import { ensureDir } from "https://deno.land/std@0.165.0/fs/mod.ts";

const flags = parse(Deno.args, {
    string: ['source', 'template', 'output'],
    default: {
        source: './source.csv',
        template: './template.html',
        output: './output',
    }
});

async function readSource(fileLocation: string) {
    try {
        return await Deno.readTextFile(fileLocation);
    } catch (_) {
        console.error(`Failed to read source file at "${fileLocation}"`)
    }
}

async function readTemplate(fileLocation: string) {
    try {
        return await Deno.readTextFile(fileLocation);
    } catch (_) {
        console.error(`Failed to read template file at "${fileLocation}"`)
    }
}

async function writeOutput(fileLocation: string, data: string) {
    try {
        await Deno.writeTextFile(fileLocation, data);
    } catch (_) {
        console.error(`Failed to read write output files to "${fileLocation}"`)
    }
}

async function main() {
    const source = await readSource(flags.source);
    const template = await readTemplate(flags.template);
    const outputDir = flags.output;

    if (! flags.source.endsWith('.csv')) {
        return console.error('Only CSV files are allowed for the source.');
    }

    if (! flags.template.endsWith('.html')) {
        return console.error('Only HTML files are allowed for the template.');
    }

    await ensureDir(outputDir);

    if (!source || !template || !outputDir) return;

    // Make source file text in to JS objects
    const data = source.split('\n')
        .map(x => x.replaceAll('\r', ''))
        .filter(x => x);

    const [columnsAsString, ...rowsAsStrings] = data;
    const columns = columnsAsString.split(',');
    const rows = rowsAsStrings.map(row => row.split(','));

    // Write each signature to its own file
    for (const row of rows) {
        let signature = template;

        // Replace all curly braces with the relevant column
        columns.forEach(col => {
            signature = signature.replace(/\{\{\s?(\w+)\s?\}\}/g, row[columns.findIndex(c => c === col)]);
        });

        await writeOutput(`${outputDir}/${row[0]}.html`, signature);
    }


    console.log(`\nComplete! Generated ${rows.length} signature(s).\nPlease see "${outputDir}" for your HTML files.\n`);
}

main();
