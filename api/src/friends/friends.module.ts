import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { PrismaService } from 'src/app/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  exports: [FriendsModule],
  controllers: [FriendsController],
  providers: [FriendsService, PrismaService, JwtService]
})
export class FriendsModule {}
