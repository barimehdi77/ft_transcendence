import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { jwtInfo } from './dto/jwt.dto';
import { CreateJwt, SetupUser, UserAuth, UserDecoder } from 'src/auth/dto/User.dto';
import { UpdateUserInfo } from './dto/User.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly cloudinary: CloudinaryService,

  ) {}


  async uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
    const image =  await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    return image.url
  }

  async setTwoFactorAuthenticationSecret(secret: string, login: string) {
    return this.prisma.user.update({
      where: {
        login: login,
      },
      data: {
        twoFactorAuthenticationSecret: secret,
      }
    });
  }

  async turnOnTwoFactorAuthentication(login: string) {
    return this.prisma.user.update({
      where: {
        login: login,
      },
      data: {
        isTwoFactorAuthenticationEnabled: true,
      }
    });
  }

  async turnOffTwoFactorAuthentication(login: string) {
    return this.prisma.user.update({
      where: {
        login: login,
      },
      data: {
        isTwoFactorAuthenticationEnabled: false,
        twoFactorAuthenticationSecret: null,
      }
    });
  }

  signToken(user: CreateJwt): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(user, {
      expiresIn: '1d',
      secret: secret,
    });
  }

  async validateUser(
    data: Prisma.UserUncheckedCreateInput,
  ): Promise<SetupUser> {
    const user = await this.prisma.user.findUnique({
      where: {
        intra_id: data.intra_id,
      },
      select: {
        intra_id: true,
        login: true,
        user_name: true,
        email: true,
        profile_done: true,
        isTwoFactorAuthenticationEnabled: true,
      },
    });

    if (user)
      return {
        ...user,
        token: await this.signToken(user),
      };

    const NewUser = await this.create(data);
    return {
      intra_id: NewUser.intra_id,
      login: NewUser.login,
      user_name: NewUser.user_name,
      profile_done: NewUser.profile_done,
      isTwoFactorAuthenticationEnabled: NewUser.isTwoFactorAuthenticationEnabled,
      token: await this.signToken({
        intra_id: NewUser.intra_id,
        login: NewUser.login,
        email: NewUser.email,
        profile_done: NewUser.profile_done,
      }),
    };
  }

  decode(auth: string): UserDecoder {
    const jwt = auth.replace('Bearer ', '');
    const decode = this.jwt.decode(jwt, { json: true }) as UserDecoder;
    return (decode);
  }

  async FindUser(
    auth: string,
  ): Promise<UserAuth> {
    const user = await this.prisma.user.findUnique({
      where: {
        intra_id: this.decode(auth).intra_id,
      },
      select: {
        intra_id: true,
        first_name: true,
        last_name: true,
        user_name: true,
        email: true,
        login: true,
        image_url: true,
        profile_done: true,
        isTwoFactorAuthenticationEnabled: true,
        twoFactorAuthenticationSecret: true,
        profile: {
          select: {
            status: true,
          }
        },
      },
    });
    return user;
  }

  async create(
    data: Prisma.UserUncheckedCreateInput,
  ): Promise<Prisma.UserUncheckedCreateInput> {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        profile: {
          create: {}
        }
      },
    });
    return user;
  }

  async findUserName(user_name: string) {
    return this.prisma.user.findUnique({
      where: {
        user_name: user_name,
      },
    });
  }

  async accountSetup(data: UpdateUserInfo, auth: string) {
    const User = await this.findUserName(data.user_name as string);
    if (User !== null) return null;

    if (data.avatar === undefined) {
      return await this.prisma.user.update({
        where: {
          intra_id: this.decode(auth).intra_id,
        },
        data: {
          profile_done: true,
          user_name: data.user_name.toLowerCase(),
        },
      });
    } else {
      return this.prisma.user.update({
        where: {
          intra_id: this.decode(auth).intra_id,
        },
        data: {
          profile_done: true,
          user_name: data.user_name.toLowerCase(),
          image_url: await this.uploadImageToCloudinary(data.avatar),
        },
      });
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        first_name: true,
        last_name: true,
        user_name: true,
        email: true,
        login: true,
        image_url: true,
      },
    });
  }

  // update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
  //   return this.prisma.user.update({
  //     where,
  //     data,
  //   });
  // }

  // remove(where: Prisma.UserWhereUniqueInput) {
  //   return this.prisma.user.delete({
  //     where,
  //   });
  // }

  findUsers(intra_id: number) {
    return this.prisma.user.findMany({
      where: {
        profile_done: true,
        intra_id: {
          not: {
            equals: intra_id,
          },
        },
      },
      select: {
        intra_id: true,
        first_name: true,
        last_name: true,
        user_name: true,
        image_url: true,
      },
    });
  }

  findUsersNotIn(conversationId: string, intra_id: number) {
    return this.prisma.user.findMany({
      where: {
        profile_done: true,
        intra_id: {
          not: {
            equals: intra_id,
          },
        },
        NOT: {
          MemberConversations: {
            some: {
              conversation_id: conversationId,
            },
          },
        },
      },
      select: {
        intra_id: true,
        first_name: true,
        last_name: true,
        user_name: true,
        image_url: true,
      },
    });
  }

}
