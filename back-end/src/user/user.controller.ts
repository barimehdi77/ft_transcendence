import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, Headers, UseFilters, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { jwtInfo } from './dto/jwt.dto';
import { UpdateUserInfo } from './dto/User.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async findUser(@Req() req: Request, @Res() res: Response, @Headers('Authorization') auth: string) {
    console.log("from midd", req.body);
    const user = await this.userService.FindUser(auth);
    return res.send(user);

  }

  @Post('/setup')
  async accountSetup(@Req() req: Request,@Res() res: Response, @Body() data: UpdateUserInfo, @Headers('Authorization') auth: string) {
    console.log("inside", req.body);
    try {
      const user = await this.userService.accountSetup(data, auth);

      if(user === null) {
        return res.status(HttpStatus.CONFLICT).json({
          status: 'faild',
          message: "Username already taken",
        });
      }
      else {
        return res.status(200).json({
          status: 'success',
          message: "User profile updated",
        });
      }

    } catch (error) {
      return res.status(500).json({
				status: 'error',
				message: 'Error updating user data',
				error: error.message ? error.message : error
			});
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.userService.update({id: +id}, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({id: +id});
  }
}
