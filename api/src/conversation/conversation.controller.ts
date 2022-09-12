import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import {
  CreateConversatioRoomnDto,
  CreateConversationDmDto,
  CheckPasswordDto,
  addNewMemberDto,
  JoinConversationDto,
  EditRoomDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { BanMemberDto } from './dto/ban-member.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('/room')
  async createConversationRoom(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: CreateConversatioRoomnDto,
  ) {
    try {
      const conversation =
        await this.conversationService.createConversationRoom(dto, intra_id);
      return {
        status: 'success',
        conversation,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/dm')
  async createConversationDm(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: CreateConversationDmDto,
  ) {
    try {
      const res = await this.conversationService.createConversationDm(
        dto,
        intra_id,
      );
      return {
        status: 'success',
        type: res.type,
        conversation: res.conversation,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/checkPassword')
  async checkPassword(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: CheckPasswordDto,
  ) {
    try {
      const res = await this.conversationService.checkPassword(dto, intra_id);
      return {
        status: 'success',
        pass: res,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/room/members/add')
  async addNewMember(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: addNewMemberDto,
  ) {
    try {
      const response = await this.conversationService.addNewMember(
        dto,
        intra_id,
      );
      return {
        status: 'success',
        response,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/room/members/remove')
  async removeMember(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: addNewMemberDto,
  ) {
    try {
      const response = await this.conversationService.removeMember(
        dto,
        intra_id,
      );
      return {
        status: 'success',
        response,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/room/admins/add')
  async addNewAdmin(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: addNewMemberDto,
  ) {
    try {
      const response = await this.conversationService.addNewAdmin(
        dto,
        intra_id,
      );
      return {
        status: 'success',
        response,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/room/admins/remove')
  async removeAdmin(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: addNewMemberDto,
  ) {
    try {
      const response = await this.conversationService.removeAdmin(
        dto,
        intra_id,
      );
      return {
        status: 'success',
        response,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/room/members/join')
  async joinConversation(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: JoinConversationDto,
  ) {
    try {
      const response = await this.conversationService.joinConversation(
        dto,
        intra_id,
      );
      return {
        status: 'success',
        response,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/room/members/leave')
  async leaveConversation(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: JoinConversationDto,
  ) {
    try {
      const response = await this.conversationService.leaveConversation(
        dto,
        intra_id,
      );
      return {
        status: 'success',
        response,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Patch('/room/edit/:id')
  async editConversation(
    @GetUser('intra_id') intra_id: number,
    @Param('id') conversationId: string,
    @Body() dto: EditRoomDto,
  ) {
    try {
      const response = await this.conversationService.editConversation(
        dto,
        conversationId,
        intra_id,
      );
      return {
        status: 'success',
        response,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Get('/room/find')
  async findConversations(@GetUser('intra_id') intra_id: number) {
    try {
      const conversations = await this.conversationService.findConversations(
        intra_id,
      );
      return {
        status: 'success',
        conversations,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Get('/room/me')
  async getMyRoomConversations(@GetUser('intra_id') intra_id: number) {
    try {
      const conversations = await this.conversationService.getMyConversations(
        intra_id,
        'room',
      );
      return {
        status: 'success',
        conversations,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Get('/room/:id')
  async getRoomConversationById(
    @GetUser('intra_id') intra_id: number,
    @Param('id') conversationId: string,
  ) {
    try {
      const conversation = await this.conversationService.getConversationById(
        conversationId,
        intra_id,
        'room',
      );
      return {
        status: 'success',
        conversation,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Get('/dm/me')
  async getMyDmConversations(@GetUser('intra_id') intra_id: number) {
    try {
      const conversations = await this.conversationService.getMyConversations(
        intra_id,
        'dm',
      );
      return {
        status: 'success',
        conversations,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Get('/dm/:id')
  async getDmConversationById(
    @GetUser('intra_id') intra_id: number,
    @Param('id') conversationId: string,
  ) {
    try {
      const conversation = await this.conversationService.getConversationById(
        conversationId,
        intra_id,
        'dm',
      );
      return {
        status: 'success',
        conversation,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }
  @Get('/messages/:id')
  async getConversationMessages(
    @GetUser('intra_id') intra_id: number,
    @Param('id') conversationId: string,
  ) {
    try {
      const messages = await this.conversationService.getConversationMessages(
        conversationId,
        intra_id,
        'room',
      );
      return {
        status: 'success',
        messages,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Get('/dm/messages/:id')
  async getConversationMessagesDms(
    @GetUser('intra_id') intra_id: number,
    @Param('id') conversationId: string,
  ) {
    try {
      const messages = await this.conversationService.getConversationMessages(
        conversationId,
        intra_id,
        'dm',
      );
      return {
        status: 'success',
        messages,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @Post('/room/members/ban')
  async banMemberFromConversation(
    @GetUser('intra_id') intra_id: number,
    @Body() dto: BanMemberDto,
  ) {
    try {
      const response = await this.conversationService.banMemberFromConversation(
        dto,
        intra_id,
      );
      return {
        status: 'success',
        response,
      };
    } catch (error) {
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

}
