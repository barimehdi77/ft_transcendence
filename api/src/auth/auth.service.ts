import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { authenticator } from 'otplib';
import { UserService } from 'src/user/user.service';
import { SetupUser, UserAuth, UserDecoder } from './dto/User.dto';
import { toFileStream } from 'qrcode';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService,
              private readonly configService: ConfigService) {}


  async GenirateJWT(@Req() req: Request, @Res() res: Response): Promise<SetupUser> {
    const user = await this.userService.validateUser(req.user as Prisma.UserUncheckedCreateInput);
    // console.log("from GenerateJWT", user);
    return (user);
    // res.redirect('http://localhost/setup');
  }


  async generateTwoFactorAuthenticationSecret(user: UserDecoder) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
    await this.userService.setTwoFactorAuthenticationSecret(secret, user.login);
    return {
      secret,
      otpauthUrl
    }
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, auth: string) {
    const user = await this.userService.FindUser(auth) as UserAuth;
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret
    })
  }

}

