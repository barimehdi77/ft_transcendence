import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Headers,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
// import { jwtInfo } from './dto/jwt.dto';
import { UpdateUserInfo } from './dto/User.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async findUser(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
  ) {
    try {
      const user = await this.userService.FindUser(auth);
      if (user === null) {
        return res.status(409).json({
          status: 'failure',
          message: 'jwt not correct',
        });
      }
      return res.send(user);
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error updating user data',
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('/setup')
  @UseInterceptors(FileInterceptor('avatar'))
  async accountSetup(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateUserInfo,
  ) {
    try {
      data.avatar = file;
      const user = await this.userService.accountSetup(data, auth);

      if (user === null) {
        return res.status(409).json({
          status: 'failure',
          message: 'Username already taken',
        });
      } else if (user === 'NOTVALID') {
        return res.status(409).json({
          status: 'failure',
          message: 'Username Not Valid',
        });
      } else {
        return res.status(200).json({
          status: 'success',
          message: 'User profile updated',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error updating user data',
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('/find')
  @UseGuards(AuthGuard('jwt'))
  findUsersNotIn(@GetUser('intra_id') intra_id: number) {
    return this.userService.findUsers(intra_id);
  }

  @Get('/findConversation/:id')
  @UseGuards(AuthGuard('jwt'))
  findUsers(
    @Param('id') conversationId: string,
    @GetUser('intra_id') intra_id: number,
  ) {
    return this.userService.findUsersNotIn(conversationId, intra_id);
  }

}
