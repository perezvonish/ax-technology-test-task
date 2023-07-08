import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../../application/controllers/auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        return {
          global: true,
          secret: await configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3d' },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
