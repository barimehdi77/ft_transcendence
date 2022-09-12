import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaService } from '../app/prisma.service';

@Module({
  exports: [ConversationModule],
  providers: [ConversationService, PrismaService],
  controllers: [ConversationController]
})
export class ConversationModule {}
