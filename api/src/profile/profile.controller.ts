import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Headers } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ReadProfileLayout } from './dto/read-profile.dto';
import { UserProfile } from 'src/auth/dto/User.dto';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService,
              private readonly userService: UserService) {}


  @Get('me')
  me(@Req() req: Request, @Headers('Authorization') auth: string): Promise<UserProfile> {
    // console.log(req.user);
    console.log("profile/me is called")
    const user = this.userService.decode(auth);
    return this.profileService.me(user.login);
  }

  @Get(':user_name')
  findOne(@Param('user_name') user_name: string): Promise<UserProfile> {
    console.log("profile/:username is called")
    return this.profileService.findOne(user_name);
  }

  @Get('/layout/:user_name')
  async ProfileLayout (@Param('user_name') user_name: string): Promise<ReadProfileLayout> {
    console.log("profile/layout/:username is called")
    return this.profileService.ProfileLayout(user_name);
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profileService.update(+id, updateProfileDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
