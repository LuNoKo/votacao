import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const connectionSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME || 'votacao',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'votacao',
  password: process.env.DB_PASSWORD || 'votacao',
  port: Number(process.env.DB_PORT) || 5432,
  entities: [`${__dirname}/**/*.entity{.js,.ts}`],
  migrations: [`${__dirname}/src/migrations/{*.ts,*.js}`],
});

connectionSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
