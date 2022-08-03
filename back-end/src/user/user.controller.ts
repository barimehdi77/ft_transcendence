import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, Headers, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { jwtInfo } from './dto/jwt.dto';
import { UpdateUserInfo } from './dto/User.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: Prisma.UserUncheckedCreateInput) {
    return this.userService.create(data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findUser(@Req() req: Request, @Res() res: Response, @Headers('Authorization') auth: string) {
    console.log("from midd", req.body);
    const user = await this.userService.FindUser(auth);
    return res.send(user);

  }

  @Post('/setup')
  @UseGuards(AuthGuard('jwt'))
  async accountSetup(@Req() req: Request,@Res() res: Response, @Body() data: UpdateUserInfo, @Headers('Authorization') auth: string) {
    const user = await this.userService.accountSetup(data, auth);
    res.redirect(301, 'http://localhost/home');
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
