import { Module } from '@nestjs/common';
import { UsersController } from '../../application/controllers/users.controller';
import { UsersService } from './users.service';
import {UsersRepository} from "../../infrastructure/repositories/users.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
