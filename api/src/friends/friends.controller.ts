import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Headers, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendRequestDto, GetFriendRequestDto } from './dto/friend.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  async ListAllFriends(@Req() req: Request, @Res() res: Response, @Headers('Authorization') auth: string) {
    // return this.friendsService.listAllFriends(auth);

    try {
      const Friends = await this.friendsService.listAllFriends(auth) as GetFriendRequestDto[];
      if (Friends) {
        return res.status(200).json({
          status: 'success',
          message: "All Friends Retrieved Successfully",
          data: Friends,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
				status: 'error',
				message: 'Error Sending Friend Request',
				error: error.message ? error.message : error
			});
    }
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Headers('Authorization') auth: string, @Body() createFriendRequestDto: CreateFriendRequestDto) {
    try {
      const NewFriendRequest = await this.friendsService.create(auth, createFriendRequestDto);
      if (NewFriendRequest) {
        return res.status(200).json({
          status: 'success',
          message: "Friend Request sent Successfully",
        });
      }
    } catch (error: any) {
      return res.status(500).json({
				status: 'error',
				message: 'Error Sending Friend Request',
				error: error.message ? error.message : error
			});
    }
  }

  @Get('request')
  async findAll(@Req() req: Request, @Res() res: Response, @Headers('Authorization') auth: string) {
    // return this.friendsService.findAll(auth);

    try {
      const AllFriendRequests = await this.friendsService.findAll(auth) as GetFriendRequestDto[];
      console.log("return from service", AllFriendRequests);
      if (AllFriendRequests) {
        return res.status(200).json({
          status: 'success',
          message: "All Friend Request retrieved Successfully",
          data: AllFriendRequests,
        });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
				status: 'error',
				message: 'Error Sending Friend Request',
				error: error.message ? error.message : error
			});
    }
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
  //   return this.friendsService.update(+id, updateFriendDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.friendsService.remove(+id);
  // }
}
