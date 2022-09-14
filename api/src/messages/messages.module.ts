import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from 'src/app/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConversationService } from 'src/conversation/conversation.service';

@Module({
  providers: [
    MessagesGateway,
    MessagesService,
    PrismaService,
    JwtService,
    ConversationService,
  ],
})
export class MessagesModule {}
