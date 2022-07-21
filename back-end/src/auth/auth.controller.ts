import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
// import { AuthenticatedGuard } from './auth.guards';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

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
  redirect(@Req() req: any ,@Res() res: Response) {
    console.log(req);
    res.redirect('http://localhost:3000/setup');
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
