import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Headers,
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
import { UserService } from 'src/user/user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('conversations')
export class ConversationController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
  ) {}

  @Post('/room')
  async createConversationRoom(
    @Headers('Authorization') auth: string,
    @Body() dto: CreateConversatioRoomnDto,
  ) {
    try {
      const conversation =
        await this.conversationService.createConversationRoom(
          dto,
          this.userService.decode(auth).intra_id,
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

  @Post('/dm')
  async createConversationDm(
    @Headers('Authorization') auth: string,
    @Body() dto: CreateConversationDmDto,
  ) {
    try {
      const res = await this.conversationService.createConversationDm(
        dto,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Body() dto: CheckPasswordDto,
  ) {
    try {
      const res = await this.conversationService.checkPassword(
        dto,
        this.userService.decode(auth).intra_id,
      );
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
    @Headers('Authorization') auth: string,
    @Body() dto: addNewMemberDto,
  ) {
    try {
      const response = await this.conversationService.addNewMember(
        dto,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Body() dto: addNewMemberDto,
  ) {
    try {
      const response = await this.conversationService.removeMember(
        dto,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Body() dto: addNewMemberDto,
  ) {
    try {
      const response = await this.conversationService.addNewAdmin(
        dto,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Body() dto: addNewMemberDto,
  ) {
    try {
      const response = await this.conversationService.removeAdmin(
        dto,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Body() dto: JoinConversationDto,
  ) {
    try {
      const response = await this.conversationService.joinConversation(
        dto,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Body() dto: JoinConversationDto,
  ) {
    try {
      const response = await this.conversationService.leaveConversation(
        dto,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Param('id') conversationId: string,
    @Body() dto: EditRoomDto,
  ) {
    try {
      const response = await this.conversationService.editConversation(
        dto,
        conversationId,
        this.userService.decode(auth).intra_id,
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
  async findConversations(@Headers('Authorization') auth: string) {
    try {
      const conversations = await this.conversationService.findConversations(
        this.userService.decode(auth).intra_id,
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
  async getMyRoomConversations(@Headers('Authorization') auth: string) {
    try {
      const conversations = await this.conversationService.getMyConversations(
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Param('id') conversationId: string,
  ) {
    try {
      const conversation = await this.conversationService.getConversationById(
        conversationId,
        this.userService.decode(auth).intra_id,
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
  async getMyDmConversations(@Headers('Authorization') auth: string) {
    try {
      const conversations = await this.conversationService.getMyConversations(
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Param('id') conversationId: string,
  ) {
    try {
      const conversation = await this.conversationService.getConversationById(
        conversationId,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Param('id') conversationId: string,
  ) {
    try {
      const messages = await this.conversationService.getConversationMessages(
        conversationId,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Param('id') conversationId: string,
  ) {
    try {
      const messages = await this.conversationService.getConversationMessages(
        conversationId,
        this.userService.decode(auth).intra_id,
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
    @Headers('Authorization') auth: string,
    @Body() dto: BanMemberDto,
  ) {
    try {
      const response = await this.conversationService.banMemberFromConversation(
        dto,
        this.userService.decode(auth).intra_id,
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
