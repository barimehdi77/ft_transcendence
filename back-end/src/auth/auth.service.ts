import { Injectable, Req, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { SetupUser } from './dto/User.dto';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}


  async GenirateJWT(@Req() req: Request, @Res() res: Response): Promise<SetupUser> {
    const user = await this.userService.validateUser(req.user as Prisma.UserUncheckedCreateInput);
    // console.log("from GenerateJWT", user);
    return (user);
    // res.redirect('http://localhost/setup');
  }

}
