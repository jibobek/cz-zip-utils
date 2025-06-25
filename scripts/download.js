const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');
const iconv = require('iconv-lite');
const csvParser = require('csv-parser');

const ZIP_URL = 'https://services.cuzk.cz/sestavy/cis/UI_ADRESNI_POSTA.zip';
const OUTPUT_FILE = path.resolve(__dirname, '../data/index.ts');

const downloadZip = async (url, outputPath) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(outputPath, response.data);
};

const extractCsvFromZip = (zipPath) => {
  const zip = new AdmZip(zipPath);
  const zipEntries = zip.getEntries();
  const csvEntry = zipEntries.find((entry) => entry.entryName.endsWith('.csv'));

  if (!csvEntry) {
    throw new Error('CSV file not found in ZIP archive.');
  }

  const csvContent = iconv.decode(csvEntry.getData(), 'win1250');
  return csvContent;
};

const parseCsv = (csvContent) => {
  return new Promise((resolve, reject) => {
    const rows = {};
    let isHeader = true;
    const stream = csvParser({
      separator: ';',
      headers: ['zip', 'city', 'ignored'],
    });

    stream.on('data', (row) => {
      if (isHeader) {
        isHeader = false;
        return;
      }
      const cleanZip = row.zip.replace(/\s/g, '');
      rows[cleanZip] = row.city;
    });

    stream.on('end', () => resolve(rows));
    stream.on('error', reject);

    stream.write(csvContent);
    stream.end();
  });
};

const generateDataFile = async () => {
  const zipPath = path.resolve(__dirname, 'data.zip');

  console.log('Downloading ZIP file...');
  await downloadZip(ZIP_URL, zipPath);

  console.log('Extracting CSV file...');
  const csvContent = extractCsvFromZip(zipPath);

  console.log('Parsing CSV data...');
  const zipData = await parseCsv(csvContent);

  console.log('Generating data.ts...');
  const fileContent = `export const zipData: { [zip: string]: string } = ${JSON.stringify(
    zipData,
    null,
    2,
  )};\n`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log('data.ts has been generated successfully!');

  console.log('Deleting data.zip...');
  fs.unlinkSync(zipPath);
  console.log('data.zip has been deleted successfully!');
};

generateDataFile().catch((error) => {
  console.error('Error:', error.message);
});
