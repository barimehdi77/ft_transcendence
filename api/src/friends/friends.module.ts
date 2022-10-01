import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { PrismaService } from 'src/app/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  exports: [FriendsModule],
  controllers: [FriendsController],
  providers: [
    FriendsService,
    PrismaService,
    JwtService,
    UserService,
    CloudinaryService,
  ],
})
export class FriendsModule {}
