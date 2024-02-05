import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATA_BASE_DATABASE,
      host: process.env.DATA_BASE_HOST,
      username: process.env.DATA_BASE_USERNAME,
      password: process.env.DATA_BASE_PASSWORD,
      port: Number(process.env.DATA_BASE_PORT),
      synchronize: false,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
      verboseRetryLog: true,
    }),
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
