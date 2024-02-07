import { Module, forwardRef } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { VotesEntity } from './entity/votes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [TypeOrmModule.forFeature([VotesEntity]), UserModule, SubjectModule],
  providers: [VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
