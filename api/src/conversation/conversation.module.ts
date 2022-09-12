import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaService } from '../app/prisma.service';
import { UserService } from 'src/user/user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  exports: [ConversationModule],
  providers: [ConversationService, PrismaService, UserService, JwtService, CloudinaryService],
  controllers: [ConversationController]
})
export class ConversationModule {}
