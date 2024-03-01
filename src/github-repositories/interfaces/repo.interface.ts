export interface RepoInterface {
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
  html_url: string;
}
