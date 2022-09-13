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

    try {
      const user = await this.authService.GenirateJWT(req, res);

      if(user === null) {
        return res.status(409).json({
          status: 'failure',
          message: "Can not Generate JWT Token",
        });
      }
      else {
        res.cookie('token', user.token);
        if (user.isTwoFactorAuthenticationEnabled) return res.redirect(301, 'http://localhost/authenticate');
        else if (user.profile_done) return res.redirect(301, 'http://localhost/');
        else return res.redirect(301, 'http://localhost/setup');
      }

    } catch (error) {
      return res.status(500).json({
				status: 'error',
				message: 'Error updating user data',
				error: error.message ? error.message : error
			});
    }
  }

  @Get('generate2fa')
  @UseGuards(AuthGuard('jwt'))
  async generate(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
  ) {
    try {
      console.log("test");
      const user = this.userService.decode(auth) as UserDecoder;
      const otp = await this.authService.generateTwoFactorAuthenticationSecret(user);
      const QRcode = await this.authService.pipeQrCodeStream(res, otp.otpauthUrl);

      if(QRcode === null) {
        return res.status(409).json({
          status: 'failure',
          message: "Can not Generate QR code",
        });
      }
      else {
        return QRcode
      }

    } catch (error) {
      return res.status(500).json({
				status: 'error',
				message: 'Error updating user data',
				error: error.message ? error.message : error
			});
    }
  }

  @Post('turn-on')
  @UseGuards(AuthGuard('jwt'))
  async turnOnTwoFactorAuthentication(
    @Req() request: Request,
    @Res() res: Response,
    @Body("twoFactorAuthenticationCode") twoFactorAuthenticationCode: string,
    @Headers('Authorization') auth: string,
  ) {

    try {
      const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, auth);

      if(isCodeValid === false) {
        return res.status(409).json({
          status: 'failure',
          message: "Wrong authentication code",
        });
      }
      else {
        const user = await this.userService.turnOnTwoFactorAuthentication(this.userService.decode(auth).login);
        return res.status(200).json({
          status: 'success',
          message: "2FA Activated Successfully",
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

  @Get('turn-off')
  @UseGuards(AuthGuard('jwt'))
  async turnOffTwoFactorAuthentication(
    @Req() request: Request,
    @Res() res: Response,
    @Headers('Authorization') auth: string,
  ) {

    try {
      const user = await this.userService.turnOffTwoFactorAuthentication(this.userService.decode(auth).login);

      if(user === null) {
        return res.status(409).json({
          status: 'failure',
          message: "An Error Happend while turning 2FA off",
        });
      }
      else {
        return res.status(200).json({
          status: 'success',
          message: "2FA Disactivated Successfully",
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

  @Post('authenticate')
  @UseGuards(AuthGuard('jwt'))
  async authenticate(
    @Req() req: Request,
    @Res() res: Response,
    @Body() twoFactorAuthenticationCode : string,
    @Headers('Authorization') auth: string,
  ) {


    try {
      const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, auth);

      if(isCodeValid === null) {
        return res.status(409).json({
          status: 'failure',
          message: "Wrong authentication code",
        });
      }
      else {
        return res.status(200).json({
          status: 'success',
          message: "2FA Code is valid",
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
