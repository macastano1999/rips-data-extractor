import fs from 'fs';
import zl from 'zip-lib';

const IS_UNZIP_REQUIRED = false;
const INPUT_DIR_PATH = './input';
const OUTPUT_DIR_PATH = './output';
const FILE_TYPE = 'AC';
const CUPS_COLUMN = 6;
const DIAG_COLUMN = 9;

if (IS_UNZIP_REQUIRED) {
    const inputDir = fs.readdirSync(INPUT_DIR_PATH);

    inputDir.forEach((child) => {
        zl.extract(`${INPUT_DIR_PATH}/${child}`, `${OUTPUT_DIR_PATH}`).then(
            function () {
                console.log('done');
            },
            function (err) {
                console.log(err);
            }
        );
    });
}

const outputDir = fs.readdirSync(OUTPUT_DIR_PATH);
let outputStr = '';

outputDir.forEach((file) => {
    if (!file.startsWith(FILE_TYPE)) return;

    const lines = fs.readFileSync(`${OUTPUT_DIR_PATH}/${file}`).toString().split('\r\n');
    lines.forEach((line) => {
        const fields = line.split(',');
        outputStr += `cups:${fields[CUPS_COLUMN]}, cie10: ${fields[DIAG_COLUMN]}\n`;
    });
});

fs.writeFileSync('./outputFile.txt', outputStr);
