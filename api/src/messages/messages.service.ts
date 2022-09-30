import { Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { SendMessageDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConversationService } from 'src/conversation/conversation.service';
import * as moment from 'moment-timezone';
import { FriendStatus } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private conversationService: ConversationService,
  ) {}

  async sendMessage(dto: SendMessageDto, intra_id_param: number) {
    try {
      const intra_id: number = intra_id_param === 0 ? dto.sent_by : intra_id_param;
      if (!dto.body || !dto.body.trim().length)
        throw new Error('error: Message is empty');

      if (dto.body.length > 1000)
        throw new Error('error: Message is too long, must be less than 1000');

      let conversations = [];
      if (dto.type === 'room') {
        conversations = await this.conversationService.getConversationByIdRoom(
          dto.conversationId,
        );
      } else {
        conversations = await this.conversationService.getConversationById(
          dto.conversationId,
          intra_id,
          dto.type,
        );
        const isBlocked = await this.prisma.friendsList.findFirst({
          where: {
            OR: [
              {
                from: conversations[0].members[0].intra_id,
                to: conversations[0].members[1].intra_id,
                status: FriendStatus.BLOCKED
              },
              {
                from: conversations[0].members[1].intra_id,
                to: conversations[0].members[0].intra_id,
                status: FriendStatus.BLOCKED
              }
            ]
          }
        });

        if (isBlocked) {
          if (isBlocked.from === intra_id)
            throw new Error('error: You blocked this user, you cannot send this message');
          else
            throw new Error('error: the user blocked you, you cannot send this message');
        }
      }

      if (!conversations.length)
        throw new Error('error: Conversation not found!');

      // check if he's member in conversation
      if (
        !conversations[0].members.find((member) => member.intra_id === intra_id)
      )
        throw new Error('error: You are not in this conversation!');

      // TODO: check if the user banned from this conversation
      const banned =
        await this.conversationService.getBannedMemverWithConversation(
          intra_id,
          dto.conversationId,
        );

      if (banned.length) {
        if (moment().diff(banned[0].bannedUntil, 'minutes') <= 0)
          throw new Error(
            'error: You are banned from this conversation for a limited time!',
          );
      }

      // send message
      const message = await this.prisma.message.create({
        data: {
          conversation_id: dto.conversationId,
          sent_by_id: intra_id,
          body: dto.body,
        },
      });

      // get Message
      const messageData = await this.prisma.message.findUnique({
        where: {
          message_id: message.message_id,
        },
        select: {
          message_id: true,
          conversation_id: true,
          sent_by: {
            select: {
              intra_id: true,
              first_name: true,
              last_name: true,
              user_name: true,
              image_url: true,
            },
          },
          body: true,
          sentAt: true,
        },
      });

      return messageData;
    } catch (error) {

      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  // this is a temp function
  decode(token: string): number {
    if (!token.includes('null')) {
      const jwt = token?.replace('Bearer ', '');
      const decode = this.jwt.decode(jwt, { json: true }) as { intra_id: number };
      return decode.intra_id;
    }
    return 0;
  }
}
