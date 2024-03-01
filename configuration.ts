import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  github: {
    GITHUB_AUTH_TOKEN:
      process.env.GITHUB_AUTH_TOKEN ||
      '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',
  },
});
