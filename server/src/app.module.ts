import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resources/user/user.module';
import { SubjectModule } from './resources/subject/subject.module';

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
    UserModule,
    SubjectModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
