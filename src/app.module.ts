import { Module } from '@nestjs/common';
import { GithubRepositoriesModule } from './github-repositories/github-repositories.module';
import configuration from '../configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GithubRepositoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
