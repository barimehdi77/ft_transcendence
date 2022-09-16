import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FriendStatus } from '@prisma/client';
import { PrismaService } from 'src/app/prisma.service';
import { UserProfile } from 'src/auth/dto/User.dto';
import { UserService } from 'src/user/user.service';
import { ReadProfile, ReadProfileLayout } from './dto/read-profile.dto';

@Injectable()
export class ProfileService {

  constructor( private readonly prisma: PrismaService,
    private readonly userService: UserService ) {}


  async me(login: string): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
      select: {
        user_name: true,
        first_name: true,
        last_name: true,
        login: true,
        image_url: true,
        email: true,
        intra_id: true,
        profile: {
          select: {
            status: true,
            played_games: true,
            user_points: true,
            wins: true,
            losses: true,
          }
        }
      }
    });
    return ({
      ...user,
      isFriends: null
    });
  };

  async findOne(user_name: string, auth: string): Promise<UserProfile> {
    const intra_id = this.userService.decode(auth).intra_id;
    const user = await this.prisma.user.findUnique({
      where: {
        user_name: user_name.toLocaleLowerCase(),
      },
      select: {
        user_name: true,
        first_name: true,
        last_name: true,
        login: true,
        image_url: true,
        email: true,
        intra_id: true,
        profile: {
          select: {
            status: true,
            played_games: true,
            user_points: true,
            wins: true,
            losses: true,
          }
        }
      }
    });
    const isFriends = await this.prisma.friendsList.findFirst({
      where: {
        OR: [
          {
            from: user.intra_id,
            to: intra_id
          },
          {
            from: intra_id,
            to: user.intra_id,
          }
        ]
      }
    })
    if (isFriends && isFriends.status === FriendStatus.BLOCKED) {
      if (isFriends.from === intra_id) {
        return ({
          ...user,
          isFriends: isFriends.status
        })
      }
      else {
        return (null);
      }
    }
    else {
      return ({
        ...user,
        isFriends: (isFriends === null) ? null : isFriends.status
      });
    }
  }

  // async ProfileLayout(user_name: string) : Promise<ReadProfileLayout> {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       user_name: user_name.toLocaleLowerCase(),
  //     },
  //     select: {
  //       user_name: true,
  //       image_url: true,
  //     }
  //   });
  //   return (user);
  // }

  // update(id: number, updateProfileDto: UpdateProfileDto) {
  //   return `This action updates a #${id} profile`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} profile`;
  // }
}
