import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import {
  CreateFriendRequestDto,
  GetFriendRequestDto,
  UpdateFriendRequest,
} from './dto/friend.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  async ListAllFriends(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
  ) {
    // return this.friendsService.listAllFriends(auth);

    try {
      const Friends = (await this.friendsService.listAllFriends(
        auth,
      )) as GetFriendRequestDto[];
      if (Friends) {
        return res.status(200).json({
          status: 'success',
          message: 'All Friends Retrieved Successfully',
          data: Friends,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: 'Error Sending Friend Request',
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('request')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
    @Body() createFriendRequestDto: CreateFriendRequestDto,
  ) {
    try {
      const NewFriendRequest = await this.friendsService.create(
        auth,
        createFriendRequestDto,
      );
      if (NewFriendRequest) {
        return res.status(200).json({
          status: 'success',
          message: 'Friend Request sent Successfully',
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: 'Error Sending Friend Request',
        error: error.message ? error.message : error,
      });
    }
  }

  @Get(':id')
  async unfriend(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const unfriend = await this.friendsService.unfriend(+id);
      if (unfriend) {
        return res.status(200).json({
          status: 'success',
          message: 'unfriend Successfully',
          data: unfriend,
        });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        message: 'Error Removing Friend',
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('request')
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
  ) {
    // return this.friendsService.findAll(auth);

    try {
      const AllFriendRequests = (await this.friendsService.findAll(
        auth,
      )) as GetFriendRequestDto[];
      console.log('return from service', AllFriendRequests);
      if (AllFriendRequests) {
        return res.status(200).json({
          status: 'success',
          message: 'All Friend Request retrieved Successfully',
          data: AllFriendRequests,
        });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        message: 'Error Sending Friend Request',
        error: error.message ? error.message : error,
      });
    }
  }

  @Patch('request/:id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    // return this.friendsService.update(+id, updateFriendRequest);

    try {
      const update = await this.friendsService.update(+id, auth);
      console.log('return from service', update);
      if (update) {
        return res.status(200).json({
          status: 'success',
          message: 'Friend Request accepted Successfully',
          data: update,
        });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        message: 'Error Sending updating Friend Request',
        error: error.message ? error.message : error,
      });
    }
  }

  @Delete('request/:id')
  async removeFriendRequest(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    try {
      const removed = await this.friendsService.removeFriendRequest(+id, auth);
      console.log('return from service', removed);
      if (removed) {
        return res.status(200).json({
          status: 'success',
          message: 'Friend Request Removed Successfully',
          data: removed,
        });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        message: 'Error Sending Deleting Friend Request',
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('block')
  async blockUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createFriendRequestDto: CreateFriendRequestDto,
    @Headers('Authorization') auth: string,
  ) {
    try {
      const blockedUser = await this.friendsService.blockUser(
        auth,
        createFriendRequestDto,
      );
      if (blockedUser) {
        return res.status(200).json({
          status: 'success',
          message: 'User blocked Successfully',
          data: blockedUser,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: 'Error Sending Blocking User',
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('unblock')
  async unblockUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createFriendRequestDto: CreateFriendRequestDto,
    @Headers('Authorization') auth: string,
  ) {
    try {
      const blockedUser = await this.friendsService.unblockUser(
        auth,
        createFriendRequestDto,
      );
      if (blockedUser) {
        return res.status(200).json({
          status: 'success',
          message: 'User unblocked Successfully',
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: 'Error Sending Blocking User',
        error: error.message ? error.message : error,
      });
    }
  }
}
