import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, Redirect, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { SetupUser } from './dto/User.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userService: UserService) {}

  /**
   * GET /api/auth/login
   * This is the route the user will visit to authenticate
   */
  @Get('login')
  @UseGuards(AuthGuard('42'))
  login() {
    return ;
  }

  /**
   * GET /api/auth/redirect
   * This is the redirect URL the OAuth2 Provider will call.
   */

  @Get('redirect')
  @UseGuards(AuthGuard('42'))
  async redirect(@Req() req: Request ,@Res() res: Response) {
    // console.log("this is redirect");
    const user = await this.authService.GenirateJWT(req, res);
    // res.status(200);
    // console.log(res);
    // console.log("testt");
    // res.status(HttpStatus.OK).json(user);
    res.cookie('token', user.token);
    res.redirect(301,'http://localhost/setup');
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
    return ('You are authenticated');
  }

  /**
   * GET /api/auth/logout
   * This will logging the user out
   */
  @Get('logout')
  logout() {}
}
