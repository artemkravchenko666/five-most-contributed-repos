export class RepositoryContributedData {
  data: {
    user: RepositoryContributedToDto;
  };
}

export class RepositoryContributedToDto {
  repositoriesContributedTo: {
    totalCount: number;
    nodes: RepositoryContributedNode[];
  };
}

export class RepositoryContributedNode {
  name: string;
  owner: {
    login: string;
  };
}
