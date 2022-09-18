import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  Req,
  Res,
  Headers,
  // UseFilters,
  // HttpCode,
  // HttpStatus,
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

  // @Get('find')
  // find() {
  //   return 'ana findit chi haja'; // abdel-ke
  // }
  // @Post()
  // async create(@Body() data: Prisma.UserUncheckedCreateInput, @Res() res: Response) {
  //   try {
  //     const user = await this.userService.create(data);
  //     if (!user) {
  //       return res.status(HttpStatus.BAD_REQUEST).json({
  //         status: 'faild',
  //         message: "Can not Create User",
  //       });
  //     }
  // return res.status(200).json({
  //   status: 'success',
  //   message: "User Register Successfully",
  //   data: user,
  // });
  //   } catch (error) {

  //   }
  // }

  @Get()
  async findUser(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
  ) {
    const user = await this.userService.FindUser(auth);
    return res.send(user);
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
    console.log('File: ', file);
    console.log('Data: ', data);
    try {
      data.avatar = file;
      const user = await this.userService.accountSetup(data, auth);

      if (user === null) {
        return res.status(409).json({
          status: 'failure',
          message: 'Username already taken',
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
  //   return this.userService.update({id: +id}, data);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove({id: +id});
  // }
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
