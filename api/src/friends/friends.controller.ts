import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Headers } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { CreateFriendRequestDto } from './dto/create-friend.dto';
import { Request, Response } from 'express';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Headers('Authorization') auth: string, @Body() createFriendRequestDto: CreateFriendRequestDto) {
    try {
      const NewFriendRequest = this.friendsService.create(auth, createFriendRequestDto);
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

  @Get()
  findAll() {
    return this.friendsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendsService.update(+id, updateFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendsService.remove(+id);
  }
}
