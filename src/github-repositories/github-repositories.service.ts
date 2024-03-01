import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as _ from 'lodash';
import { firstValueFrom, map } from 'rxjs';
import { RepositoryContributedData } from './dtos/repository-contributed-to.dto';
import { ContributorDto } from './dtos/contributor.dto';
import { ConfigService } from '@nestjs/config';

const config = {
  url: 'https://api.github.com/graphql',
};

@Injectable()
export class GithubRepositoriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getContributedReposByLogin(
    login: string,
  ): Promise<RepositoryContributedData> {
    const graphqlQuery = `
    {
      user(login: "${login}") {
        repositoriesContributedTo(first: 100) {
          totalCount
          nodes {
            name
            owner {
              login
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;
    const token = this.configService.get<string>('github.GITHUB_AUTH_TOKEN');

    return firstValueFrom(
      this.httpService
        .post<RepositoryContributedData>(
          config.url,
          {
            query: graphqlQuery,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .pipe(
          map((response) => {
            return response.data;
          }),
        ),
    );
  }

  async getWithTheBiggestCommonContributors(
    owner: string,
    repo: string,
  ): Promise<{ name: string; contributors: number }[]> {
    const contributors = await this.getContributors(owner, repo);

    const requests = contributors.map((contributor) =>
      this.getContributedReposByLogin(contributor.login),
    );

    const contributedRepos = await Promise.all(requests).then((response) =>
      response
        .filter((r) => r.data.user?.repositoriesContributedTo?.nodes)
        .map((r) => r.data.user.repositoriesContributedTo.nodes)
        .flat(),
    );

    return _.chain(contributedRepos)
      .groupBy((repo) => repo.owner.login + '/' + repo.name)
      .toPairs()
      .sortBy(([_, values]) => -values.length) // Sort by array length in descending order
      .map(([key, value]) => ({ name: key, contributors: value.length }))
      .take(5) // Take the top two keys
      .value();
  }

  async getContributors(
    owner: string,
    repo: string,
  ): Promise<ContributorDto[]> {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;

    return firstValueFrom(
      this.httpService.get<ContributorDto[]>(apiUrl).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );
  }
}
