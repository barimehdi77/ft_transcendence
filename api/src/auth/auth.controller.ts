import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
  Redirect,
  HttpStatus,
  Headers,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { SetupUser, UserDecoder } from './dto/User.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * GET /api/auth/login
   * This is the route the user will visit to authenticate
   */
  @Get('login')
  @UseGuards(AuthGuard('42'))
  login() {
    return;
  }

  /**
   * GET /api/auth/redirect
   * This is the redirect URL the OAuth2 Provider will call.
   */

  @Get('redirect')
  @UseGuards(AuthGuard('42'))
  async redirect(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.GenirateJWT(req, res);
    res.cookie('token', user.token);
    if (user.isTwoFactorAuthenticationEnabled) return res.redirect(301, 'http:localhost/authenticate');
    else if (user.profile_done) return res.redirect(301, 'http://localhost/');
    else return res.redirect(301, 'http://localhost/setup');
  }

  @Get('generate2fa')
  @UseGuards(AuthGuard('jwt'))
  async generate(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
  ) {
    const user = (await this.userService.decode(auth)) as UserDecoder;
    const otp = await this.authService.generateTwoFactorAuthenticationSecret(
      user,
    );
    return this.authService.pipeQrCodeStream(res, otp.otpauthUrl);
  }

  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async turnOnTwoFactorAuthentication(
    @Req() request: Request,
    @Body() twoFactorAuthenticationCode: string,
    @Headers('Authorization') auth: string,
  ) {
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode,
      auth,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuthentication(
      this.userService.decode(auth).login,
    );
  }

  @Post('authenticate')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async authenticate(
    @Req() req: Request,
    @Res() res: Response,
    @Body() twoFactorAuthenticationCode : string,
    @Headers('Authorization') auth: string,
  ) {
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, auth
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const user = await this.authService.GenirateJWT(req, res);

    res.cookie('token', user.token);
    if (user.profile_done) return res.redirect(301, 'http://localhost/');
    else return res.redirect(301, 'http://localhost/setup');

    // request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    // return request.user;
  }

  /**
   * GET /api/auth/status
   * This will Retrieve the auth status
   */
  @Get('status')
  // @UseGuards(AuthenticatedGuard)
  @UseGuards(AuthGuard('jwt'))
  status(@Req() req: Request) {
    console.log(req);
    return 'You are authenticated';
  }

  /**
   * GET /api/auth/logout
   * This will logging the user out
   */
  @Get('logout')
  logout() {}
}
