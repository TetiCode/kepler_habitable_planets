import { parse } from 'csv-parse';
import * as fs from 'fs/promises';

// import * as fs from 'fs';

const habitablePlanets = [];

const fileDescriptor = await fs.open('./kepler_data.csv');

const stream = fileDescriptor.createReadStream();

// const stream = fs.createReadStream('./kepler_data.csv');

stream
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    console.log(
      '\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n'
    );
    if (isHabitablePlanet(data)) habitablePlanets.push(data);
  })
  .on('end', () => {
    console.log(habitablePlanets.map((planet) => planet['kepler_name']));
    console.log(`Done. Found ${habitablePlanets.length} habitable planets`);
  })
  .on('error', (err) => {
    console.log(err.message);
  });

const isHabitablePlanet = (planet) => {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] >= 0.36 &&
    planet['koi_insol'] <= 1.11 &&
    planet['koi_prad'] <= 1.6
  );
};
