import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-42';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.FORTYTWO_CLIENT_ID,
      clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: 'public',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const {
      login,
      first_name,
      last_name,
      image: {link: image_url},
      email,
      id: intra_id,
    } = profile._json;

    const NewUser: Prisma.UserUncheckedCreateInput = {
      login,
      first_name,
      last_name,
      image_url,
      email,
      intra_id,
    };
    return this.userService.validateUser(NewUser);
  }
}
