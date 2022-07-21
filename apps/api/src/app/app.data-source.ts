import { DataSource } from 'typeorm';

export const cliDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs-ddd-skeleton',
  entities: ['libs/shared/entities/**/*.entity.ts'],
  migrations: ['apps/api/src/migrations/*.ts'],
});

