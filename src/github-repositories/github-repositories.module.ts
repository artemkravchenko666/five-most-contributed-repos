import { Module } from '@nestjs/common';
import { GithubRepositoriesController } from './github-repositories.controller';
import { GithubRepositoriesService } from './github-repositories.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GithubRepositoriesController],
  providers: [GithubRepositoriesService],
})
export class GithubRepositoriesModule {}
