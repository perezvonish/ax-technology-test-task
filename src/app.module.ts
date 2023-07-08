import { Module } from '@nestjs/common';
import { UsersModule } from './domain/users/users.module';
import { AuthModule } from './domain/auth/auth.module';
import {HeathController} from "./application/controllers/heath.controller";
import { PostsModule } from './domain/posts/posts.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AcceptLanguageResolver, I18nModule, QueryResolver} from "nestjs-i18n";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as path from "path";
import {databaseProviders, dataSource, dataSourceOptions} from "./infrastructure/dataSourceOptions";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),
      I18nModule.forRoot({
          fallbackLanguage: "en",
          loaderOptions: {
              path: path.join(__dirname, "/i18n/"),
              watch: true
          },
          resolvers: [
              { use: QueryResolver, options: ['lang'] },
              AcceptLanguageResolver,
          ],
          typesOutputPath: path.join(__dirname, '../src/generated/i18n.generated.ts'),
      }),
      TypeOrmModule.forRootAsync(databaseProviders),
      JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
              return {
                  global: true,
                  secret: configService.get('JWT_SECRET'),
                  signOptions: { expiresIn: '3d' },
              }
          }
      }),
      UsersModule, AuthModule, PostsModule],
  controllers: [HeathController],
  providers: [],
})
export class AppModule {}
