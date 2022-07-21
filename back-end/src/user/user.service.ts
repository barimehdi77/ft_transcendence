import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}


  signToken(userId: number, email: string, login: string) : Promise<string> {
    const payload = {
      sub: userId,
      email,
      login
    }

    const secret = this.config.get('JWT_SECRET');

    return (this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    }))

  };

  async validateUser(data: Prisma.UserUncheckedCreateInput) {
    // const { login } = data;
    const user = await this.prisma.user.findUnique({
      where: {
        intra_id: data.intra_id,
      },
    });
    if (user) {
      const token = await this.signToken(user.intra_id, user.email, user.login);
      return (token);
    }
    return this.create(data);
  }

  async FindUser(
    where: number,
  ): Promise<Prisma.UserUncheckedCreateInput | undefined> {
    return this.findOne({ intra_id: +where });
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<string> {
    console.log('The Create function is called');
    const user = await this.prisma.user.create({
      data,
    });

    const token = await this.signToken(user.intra_id, user.email, user.login);
    return (token);
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
    console.log(where);
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
