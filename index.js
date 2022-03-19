import { parse } from 'csv-parse';
import * as fs from 'fs/promises';

// import * as fs from 'fs';

const records = [];

const fileDescriptor = await fs.open('./kepler_data.csv');

const stream = fileDescriptor.createReadStream();

// const fd = await fs.open('./kepler_data.csv');

// const stream = fd.createReadStream();

// const stream = fs.createReadStream('./kepler_data.csv');

stream
  .pipe(
    parse({
      comment: '#',
    })
  )
  .on('data', (data) => {
    records.push(data);
  })
  .on('end', () => {
    console.log(records);
    console.log('done');
  })
  .on('error', (err) => {
    console.log(err.message);
    console.log(records);
  });
