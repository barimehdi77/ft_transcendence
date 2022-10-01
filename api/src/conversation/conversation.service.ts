import { Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import {
  addNewMemberDto,
  CheckPasswordDto,
  CreateConversationDmDto,
  CreateConversatioRoomnDto,
  EditRoomDto,
  JoinConversationDto,
} from './dto';
import Utils from '../helpers/utils';
import * as argon from 'argon2';
import { BanMemberDto } from './dto/ban-member.dto';
import * as moment from 'moment-timezone';
import { FriendStatus } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async createConversationRoom(dto: CreateConversatioRoomnDto, userId: number) {
    try {
      const data = {
        ...dto,
        type: 'room',
      };

      if (dto.members.indexOf(userId.toString()) !== -1)
        throw new Error('error: Something went wrong!');

      if (dto.status === 'locked' && !dto.password)
        throw new Error('error: Password is required!');

      if (dto.password && dto.status === 'locked') {
        const hash = await argon.hash(dto.password);
        data.password = hash;
      }

      if (dto.status !== 'locked') delete data.password;

      const members = dto.members.map(
        (intra_id: string): { intra_id: number } => {
          return { intra_id: parseInt(intra_id, 10) };
        },
      );

      const conversation = await this.prisma.conversation.create({
        data: {
          ...data,
          userId,
          members: {
            connect: [{ intra_id: userId }, ...members],
          },
          admins: {
            connect: [
              {
                intra_id: userId,
              },
            ],
          },
        },
      });
      delete conversation.password;
      return conversation;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async createConversationDm(dto: CreateConversationDmDto, userId: number) {
    try {
      if (dto.user === userId.toString())
        throw new Error(
          'error: Invalid user! You cannot send message to yourself!',
        );

      // check conversation exist
      const existConv = await this.checkExistConversation(
        userId,
        parseInt(dto.user, 10),
      );

      if (existConv?.length > 0) {
        const conversation = existConv[0];
        return { type: 'exist', conversation };
      }

      const conversationCreated = await this.prisma.conversation.create({
        data: {
          name: 'Direct Message',
          status: 'private',
          type: 'dm',
          userId,
          members: {
            connect: [
              { intra_id: userId },
              { intra_id: parseInt(dto.user, 10) },
            ],
          },
        },
      });

      const conversation = await this.getConversationById(
        conversationCreated.conversation_id,
        userId,
        'dm',
      );

      return { type: 'new', conversation: conversation[0] };
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async checkPassword(dto: CheckPasswordDto, userId: number) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        conversation_id: dto.conversationId,
        status: 'locked',
      },
      select: {
        password: true,
        members: {
          select: {
            intra_id: true,
          },
        },
      },
    });

    if (!conversation) throw new Error('error: Conversation not found!');

    const isValid = await argon.verify(conversation.password, dto.password);

    if (!isValid) throw new Error('error: Invalid password!');

    const members = conversation.members.map(
      (member: { intra_id: number }): number => member.intra_id,
    );

    if (members.indexOf(userId) === -1)
      throw new Error('error: You are not allowed!');

    return true;
  }

  async addNewMember(dto: addNewMemberDto, userId: number) {
    try {
      if (dto.user === userId.toString())
        throw new Error('error: Invalid user! You cannot add yourself!');

      // check conversation exist
      const conversations = await this.getConversationByIdWithAdmin(
        userId,
        dto.conversationId,
      );

      if (!conversations.length)
        throw new Error(
          'error: Conversation not found or you are not allowed!',
        );

      // check user already in conversation
      if (
        conversations[0].members.some(
          (member) => member.intra_id === parseInt(dto.user, 10),
        )
      )
        throw new Error('error: User already in conversation!');

      // add new member
      const conversation = await this.prisma.conversation.update({
        where: {
          conversation_id: dto.conversationId,
        },
        data: {
          members: {
            connect: [{ intra_id: parseInt(dto.user, 10) }],
          },
        },
      });

      return conversation;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async removeMember(dto: addNewMemberDto, userId: number) {
    try {
      if (dto.user === userId.toString())
        throw new Error('error: Invalid user! You cannot remove yourself!');

      // check conversation exist
      const conversations = await this.getConversationByIdWithAdmin(
        userId,
        dto.conversationId,
      );

      if (!conversations.length)
        throw new Error(
          'error: Conversation not found or you are not allowed!',
        );

      // check user already in conversation
      if (
        !conversations[0].members.find(
          (member) => member.intra_id === parseInt(dto.user, 10),
        )
      )
        throw new Error('error: User not in conversation!');

      // check if user is admin
      let admin;
      if (
        conversations[0].admins.find(
          (admin) => admin.intra_id === parseInt(dto.user, 10),
        )
      ) {
        admin = true;
      }

      // remove member
      const conversation = await this.prisma.conversation.update({
        where: {
          conversation_id: dto.conversationId,
        },
        data: {
          members: {
            disconnect: [{ intra_id: parseInt(dto.user, 10) }],
          },
          admins: admin && {
            disconnect: [{ intra_id: parseInt(dto.user, 10) }],
          },
        },
      });

      return conversation;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async addNewAdmin(dto: addNewMemberDto, userId: number) {
    try {
      if (dto.user === userId.toString())
        throw new Error('error: Invalid user! You cannot add yourself!');

      // check conversation exist
      const conversations = await this.getConversationByIdWithAdmin(
        userId,
        dto.conversationId,
      );

      if (!conversations.length)
        throw new Error(
          'error: Conversation not found or you are not allowed!',
        );

      // check if the user not in conversation
      if (
        conversations[0].members.every(
          (member) => member.intra_id !== parseInt(dto.user, 10),
        )
      )
        throw new Error(
          'error: User must be a member in conversation before be admin!',
        );
      // check if user already admin
      if (
        conversations[0].admins.some(
          (admin) => admin.intra_id === parseInt(dto.user, 10),
        )
      )
        throw new Error('error: User already admin in conversation!');

      // add new member
      const conversation = await this.prisma.conversation.update({
        where: {
          conversation_id: dto.conversationId,
        },
        data: {
          admins: {
            connect: [{ intra_id: parseInt(dto.user, 10) }],
          },
        },
      });

      return conversation;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async removeAdmin(dto: addNewMemberDto, userId: number) {
    try {
      if (dto.user === userId.toString())
        throw new Error('error: Invalid user! You cannot remove yourself!');

      // check conversation exist
      const conversations = await this.getConversationByIdWithAdmin(
        userId,
        dto.conversationId,
      );

      if (!conversations.length)
        throw new Error(
          'error: Conversation not found or you are not allowed!',
        );
      else if (conversations[0].admins.length === 1)
        throw new Error('error: You are the only admin in conversation!');

      // check if user already admin
      if (
        !conversations[0].admins.some(
          (admin) => admin.intra_id === parseInt(dto.user, 10),
        )
      )
        throw new Error('error: User not admin in this conversation!');

      // add new member
      const conversation = await this.prisma.conversation.update({
        where: {
          conversation_id: dto.conversationId,
        },
        data: {
          admins: {
            disconnect: [{ intra_id: parseInt(dto.user, 10) }],
          },
        },
      });

      return conversation;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async joinConversation(dto: JoinConversationDto, userId: number) {
    try {
      // check conversation exist
      const conversations = await this.getConversationByIdRoom(
        dto.conversationId,
      );

      if (!conversations.length)
        throw new Error('error: Conversation not found!');

      // check status of conversation
      if (conversations[0].status !== 'public')
        throw new Error('error: Conversation is not public!');

      // check user already in conversation
      if (conversations[0].members.some((member) => member.intra_id === userId))
        throw new Error('error: You are already in this conversation!');

      // join conversation
      const conversation = await this.prisma.conversation.update({
        where: {
          conversation_id: dto.conversationId,
        },
        data: {
          members: {
            connect: [{ intra_id: userId }],
          },
        },
      });

      return conversation;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async leaveConversation(dto: JoinConversationDto, userId: number) {
    try {
      // check conversation exist
      const conversations = await this.getConversationByIdRoom(
        dto.conversationId,
      );

      if (!conversations.length)
        throw new Error('error: Conversation not found!');

      // check if in conversation
      if (
        !conversations[0].members.find((member) => member.intra_id === userId)
      )
        throw new Error('error: You are not in this conversation!');

      const isAdmin = conversations[0].admins.find(
        (admin) => admin.intra_id === userId,
      );

      if (isAdmin && conversations[0].admins.length === 1)
        throw new Error('error: You are the only admin in conversation!');

      // leave conversation
      const conversation = await this.prisma.conversation.update({
        where: {
          conversation_id: dto.conversationId,
        },
        data: {
          members: {
            disconnect: [{ intra_id: userId }],
          },
          admins: isAdmin && {
            disconnect: [{ intra_id: userId }],
          },
        },
      });

      return conversation;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async editConversation(
    dto: EditRoomDto,
    conversationId: string,
    userId: number,
  ) {
    try {
      const data = {
        ...dto,
      };
      // check conversation exist
      const conversations = await this.getConversationByIdWithAdmin(
        userId,
        conversationId,
      );

      if (!conversations.length)
        throw new Error(
          'error: Conversation not found or you are not allowed!',
        );

      if (dto.status === 'locked' && !dto.password)
        throw new Error('error: Password is required!');

      if (dto.password && dto.status === 'locked') {
        const hash = await argon.hash(dto.password);
        data.password = hash;
      } else data.password = '';

      if (Utils.isEmpty(dto))
        throw new Error(
          'error: Invalid data! Please provide at least one valid field!',
        );

      // update conversation
      const conversation = await this.prisma.conversation.update({
        where: {
          conversation_id: conversationId,
        },
        data,
      });
      delete conversation.password;
      return conversation;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async banMemberFromConversation(dto: BanMemberDto, userId: number) {
    try {
      if (dto.user === userId.toString())
        throw new Error('error: Invalid user! You cannot ban yourself!');

      // check conversation exist
      const conversations = await this.getConversationByIdWithAdmin(
        userId,
        dto.conversationId,
      );

      if (!conversations.length)
        throw new Error(
          'error: Conversation not found or you are not allowed!',
        );

      // check user if the use is member
      if (
        !conversations[0].members.some(
          (memeber) => memeber.intra_id === parseInt(dto.user, 10),
        )
      )
        throw new Error('error: User is not member of this conversation!');

      // check if user already admin
      if (
        conversations[0].admins.some(
          (admin) => admin.intra_id === parseInt(dto.user, 10),
        )
      )
        throw new Error('error: You cannot ban admin!');

      // check if is aleady banned
      const banned = await this.getBannedMemverWithConversation(
        parseInt(dto.user, 10),
        dto.conversationId,
      );

      if (banned.length) {
        // update banned member

        const bannedMember = await this.prisma.bannedUser.update({
          where: {
            ban_id: banned[0].ban_id,
          },
          data: {
            bannedBy_id: userId,
            duration: dto.duration,
            bannedUntil: moment()
              .tz('Africa/Casablanca')
              .add(dto.duration, 'm')
              .toDate(),
          },
        });

        return bannedMember;
      } else {
        // add new ban

        const bannedMember = await this.prisma.bannedUser.create({
          data: {
            userId: parseInt(dto.user, 10),
            conversation_id: dto.conversationId,
            bannedBy_id: userId,
            duration: dto.duration,
            bannedUntil: moment()
              .tz('Africa/Casablanca')
              .add(dto.duration, 'm')
              .toDate(),
          },
        });

        return bannedMember;
      }
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async findConversations(intra_id: number) {
    try {
      const conversations = await this.prisma.conversation.findMany({
        where: {
          status: 'public',
          type: 'room',
          NOT: {
            members: {
              some: {
                intra_id: intra_id,
              },
            },
          },
        },
        select: {
          conversation_id: true,
          type: true,
          name: true,
          status: true,
          members: {
            select: {
              intra_id: true,
              first_name: true,
              last_name: true,
              user_name: true,
              image_url: true,
              profile: {
                select: {
                  status: true,
                },
              },
            },
          },
        },
      });
      return conversations;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async getMyConversations(intra_id: number, type: string) {
    try {
      const conversations = await this.prisma.conversation.findMany({
        where: {
          members: {
            some: {
              intra_id,
            },
          },
          type,
        },
        select: {
          conversation_id: true,
          type: true,
          name: true,
          status: true,
          createdAt: true,
          messages: {
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
                  profile: {
                    select: {
                      status: true,
                    },
                  },
                },
              },
              body: true,
              sentAt: true,
            },
          },
          members: {
            select: {
              intra_id: true,
              first_name: true,
              last_name: true,
              user_name: true,
              image_url: true,
              profile: {
                select: {
                  status: true,
                },
              },
            },
          },
          admins: {
            select: {
              intra_id: true,
              first_name: true,
              last_name: true,
              user_name: true,
              image_url: true,
              profile: {
                select: {
                  status: true,
                },
              },
            },
          },
        },
      });
      return conversations.map((conversation) => {
        let conversationObj = {
          ...conversation,
          last_message: conversation.messages[conversation.messages.length - 1],
        };
        if (!conversationObj.last_message) {
          conversationObj.last_message = {
            message_id: 'message_id',
            conversation_id: 'conversation_id',
            sent_by: {
              intra_id: 0,
              first_name: 'first_name',
              last_name: 'last_name',
              user_name: 'user_name',
              image_url: 'image_url',
              profile: {
                status: 'OFFLINE',
              },
            },
            body: 'No message yet',
            sentAt: conversation.createdAt,
          };
        }
        delete conversationObj.messages;
        return conversationObj;
      });
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async getConversationById(
    conversationId: string,
    intra_id: number,
    type: string,
  ) {
    try {
      // check conversation exist
      const conversations = await this.getConversationByIdMember(
        conversationId,
        intra_id,
        type,
      );

      if (!conversations.length)
        throw new Error(
          'error: Conversation not found or you are not allowed!',
        );

      return conversations;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  async getConversationMessages(
    conversationId: string,
    intra_id: number,
    type: string,
  ) {
    try {
      // check conversation exist
      const conversations = await this.getConversationByIdMember(
        conversationId,
        intra_id,
        type,
      );

      if (!conversations.length)
        throw new Error(
          'error: Conversation not found or you are not allowed!',
        );

        const block = await this.prisma.friendsList.findMany({
          where: {
            from: intra_id,
            status: FriendStatus.BLOCKED,
          },
          select: {
            to: true,
          }
        });

      const messages = await this.prisma.message.findMany({
        where: {
          conversation_id: conversationId,
          NOT: {
            sent_by_id: {
              in: block.map((b) => {return b.to})
            },
          },
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
              profile: {
                select: {
                  status: true,
                }
              },
            },
          },
          body: true,
          sentAt: true,
        },
      });
      return messages;
    } catch (error) {
      throw new Error(
        error.message && error.message.startsWith('error: ')
          ? error.message
          : 'Something went wrong!',
      );
    }
  }

  //// Databse Helpers /////
  async checkExistConversation(memb1: number, memb2: number) {
    const conversation = await this.prisma.conversation.findMany({
      where: {
        OR: [
          {
            members: {
              some: {
                intra_id: memb2,
              },
            },
            userId: memb1,
          },
          {
            members: {
              some: {
                intra_id: memb1,
              },
            },
            userId: memb2,
          },
        ],
        type: 'dm',
      },
      select: {
        conversation_id: true,
        name: true,
        type: true,
        status: true,
        members: {
          select: {
            intra_id: true,
            first_name: true,
            last_name: true,
            user_name: true,
            image_url: true,
            profile: {
              select: {
                status: true,
              }
            },
          },
        },
      },
    });

    return conversation;
  }

  async getConversationByIdWithAdmin(userId: number, conversationId: string) {
    const conversation = await this.prisma.conversation.findMany({
      where: {
        conversation_id: conversationId,
        type: 'room',
        admins: {
          some: {
            intra_id: userId,
          },
        },
      },
      select: {
        conversation_id: true,
        name: true,
        status: true,
        type: true,
        members: {
          select: {
            intra_id: true,
          },
        },
        admins: {
          select: {
            intra_id: true,
          },
        },
      },
    });

    return conversation;
  }

  async getConversationByIdRoom(conversationId: string) {
    const conversation = await this.prisma.conversation.findMany({
      where: {
        conversation_id: conversationId,
        type: 'room',
      },
      select: {
        conversation_id: true,
        name: true,
        status: true,
        type: true,
        members: {
          select: {
            intra_id: true,
          },
        },
        admins: {
          select: {
            intra_id: true,
          },
        },
      },
    });

    return conversation;
  }

  async getConversationByIdMember(
    conversationId: string,
    intra_id: number,
    type: string,
  ) {
    const conversation = await this.prisma.conversation.findMany({
      where: {
        conversation_id: conversationId,
        type: type,
        members: {
          some: {
            intra_id,
          },
        },
      },
      select: {
        conversation_id: true,
        name: true,
        status: type === 'room' ? true : false,
        type: true,
        members: {
          select: {
            intra_id: true,
            first_name: true,
            last_name: true,
            user_name: true,
            image_url: true,
            profile: {
              select: {
                status: true,
              }
            },
          },
        },
        admins: {
          select: {
            intra_id: true,
            first_name: true,
            last_name: true,
            user_name: true,
            image_url: true,
            profile: {
              select: {
                status: true,
              }
            },
          },
        },
      },
    });

    return conversation;
  }

  async getBannedMemverWithConversation(
    userId: number,
    conversation_id: string,
  ) {
    const banned = await this.prisma.bannedUser.findMany({
      where: {
        conversation_id,
        userId,
      },
    });

    return banned;
  }
}
