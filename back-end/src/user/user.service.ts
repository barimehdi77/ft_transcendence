import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

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

    let req: Request;

    console.log("thisis ", req);

    const secret = this.config.get('JWT_SECRET');

    return (this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    }))

  };

  async validateUser(data: Prisma.UserUncheckedCreateInput): Promise<Prisma.UserUncheckedCreateInput> {
    // const { login } = data;
    const user = await this.prisma.user.findUnique({
      where: {
        intra_id: data.intra_id,
      },
    });

    if (user) {
      // const token = await this.signToken(user.intra_id, user.email, user.login);
      return (user);
    }
    return this.create(data);
  }

  async FindUser(
    where: number,
  ): Promise<Prisma.UserUncheckedCreateInput | undefined> {
    return this.findOne({ intra_id: +where });
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<Prisma.UserUncheckedCreateInput> {
    console.log('The Create function is called');
    const user = await this.prisma.user.create({
      data,
    });

    // const token = await this.signToken(user.intra_id, user.email, user.login);
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
    // console.log(User);

    // const id: Prisma.UserWhereUniqueInput = data.id as Prisma.UserWhereUniqueInput;

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

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
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
