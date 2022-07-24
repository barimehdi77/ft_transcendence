import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { jwtInfo } from './dto/jwt.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  signToken(user: Prisma.UserUncheckedCreateInput) : Promise<string> {
    const payload = {
      sub: user.intra_id,
      email: user.email,
      login: user.login
    }
    const secret = this.config.get('JWT_SECRET');
    return (this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    }))

  };

  async validateUser(data: Prisma.UserUncheckedCreateInput): Promise<Prisma.UserUncheckedCreateInput> {
    const user = await this.prisma.user.findUnique({
      where: {
        intra_id: data.intra_id,
      },
    });

    if (user) return (user);
    return this.create(data);
  }

  async FindUser(
    data: jwtInfo,
  ): Promise<Prisma.UserUncheckedCreateInput | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        intra_id: data.sub,
      },
      select: {
        first_name: true,
        last_name: true,
        user_name: true,
        email: true,
        login: true,
        image_url: true,
      },
    });
    console.log("heiii haa", user);
    return (user);

  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<Prisma.UserUncheckedCreateInput> {
    const user = await this.prisma.user.create({
      data,
    });
    return (user);
  }

  async findUserName(user_name: string) {
    return this.prisma.user.findUnique({
      where: {
        user_name
      }
    });
  }

  async accountSetup(data: Prisma.UserUncheckedUpdateInput) {
    console.log(data);

    const User = await this.findUserName(data.user_name as string);

    if (User) return ("user already exists");

    return (this.prisma.user.update({
      where: {
        intra_id: data.intra_id as number,
      },
      data: {
        ProfileDone: true,
        ...data
      },
    }))
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

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where,
      data,
    });
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}
