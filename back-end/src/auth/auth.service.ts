import { Injectable, Req, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}


  async GenirateJWT(@Req() req: Request, @Res() res: Response) {
    const token = await this.userService.signToken(req.user as Prisma.UserUncheckedCreateInput);
    console.log(token);
    res.redirect('http://localhost/setup');
  }

}
