import { Controller, Get, Query } from '@nestjs/common';
import { GithubRepositoriesService } from './github-repositories.service';
import { GithubRepositoryDto } from './dtos/github-repository.dto';
import { Observable } from 'rxjs';
import {
  RepositoryContributedData,
  RepositoryContributedNode,
} from './dtos/repository-contributed-to.dto';
import { ContributorDto } from './dtos/contributor.dto';

@Controller('github-repositories')
export class GithubRepositoriesController {
  constructor(private readonly repoService: GithubRepositoriesService) {}

  @Get('with-the-biggest-common-contributors')
  async getWithTheBiggestCommonContributors(
    @Query('owner') owner: string,
    @Query('repo') repo: string,
  ): Promise<{ name: string; contributors: number }[]> {
    return this.repoService.getWithTheBiggestCommonContributors(owner, repo);
  }

  @Get('contributors')
  async getContributors(
    @Query('owner') owner: string,
    @Query('repo') repo: string,
  ): Promise<ContributorDto[]> {
    return this.repoService.getContributors(owner, repo);
  }

  @Get('contributed-repos-by-login')
  async getContributedReposByLogin(
    @Query('login') login: string,
  ): Promise<RepositoryContributedData> {
    return this.repoService.getContributedReposByLogin(login);
  }
}
