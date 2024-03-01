import { Controller, Get, Query } from '@nestjs/common';
import { GithubRepositoriesService } from './github-repositories.service';

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
}
