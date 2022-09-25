import { Controller, Get, Param, Req, Res, Headers, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService,
              private readonly userService: UserService) {}


  @Get('me')
  async me(@Req() req: Request, @Res() res: Response, @Headers('Authorization') auth: string) {
    try {
      const decodeAuth = this.userService.decode(auth);
      const user = await this.profileService.me(decodeAuth.login);
      if (user === null) {
        return res.status(409).json({
          status: 'failure',
          message: "Can not find this User",
        });
      }
      return res.status(200).json({
        status: 'success',
        message: "User found",
        data: user
      });
    } catch (error: any) {
      return res.status(500).json({
				status: 'error',
				message: 'Error updating user data',
				error: error.message ? error.message : error
			});
    }
  }

  @Get(':user_name')
  async findOne(@Param('user_name') user_name: string, @Req() req: Request, @Res() res: Response, @Headers('Authorization') auth: string){

    try {
      const user = await this.profileService.findOne(user_name, auth);
      if (user === null) {
        return res.status(409).json({
          status: 'failure',
          message: "Can not find this User",
        });
      }
      return res.status(200).json({
        status: 'success',
        message: "User found",
        data: user
      });
    } catch (error: any) {
      return res.status(500).json({
				status: 'error',
				message: 'Error updating user data',
				error: error.message ? error.message : error
			});
    }
  }

  @Get(':user_name/matches')
  async getMatches(@Param('user_name') user_name: string, @Req() req: Request, @Res() res: Response) {
    try {
      const matchsHistory = await this.profileService.getMatches(user_name);
      if (matchsHistory === null) {
        return res.status(409).json({
          status: 'failure',
          message: "Can not find the user Matches",
        });
      }
      return res.status(200).json({
        status: 'success',
        message: "Matches Found",
        data: matchsHistory
      });
    } catch (error: any) {
      return res.status(500).json({
				status: 'error',
				message: 'Error Getting user matches',
				error: error.message ? error.message : error
			});
    }
  }
}
