import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  github: {
    GITHUB_AUTH_TOKEN:
      process.env.GITHUB_AUTH_TOKEN ||
      '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',
  },
});
