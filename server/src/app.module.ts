import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resources/v1/user/user.module';
import { SubjectModule } from './resources/v1/subject/subject.module';
import { VotesModule } from './resources/v1/votes/votes.module';
import { AuthModule } from './resources/v1/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME || 'votacao',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'votacao',
      password: process.env.DB_PASSWORD || 'votacao',
      port: Number(process.env.DB_PORT) || 5432,
      synchronize: false,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
      verboseRetryLog: true,
    }),
    UserModule,
    SubjectModule,
    VotesModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
