import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { UserProfile } from 'src/auth/dto/User.dto';
import { UserService } from 'src/user/user.service';
import { ReadProfile, ReadProfileLayout } from './dto/read-profile.dto';

@Injectable()
export class ProfileService {

  constructor( private readonly prisma: PrismaService,
    private readonly userService: UserService ) {}


  async me(user_name: string): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_name: user_name,
      },
      select: {
        user_name: true,
        first_name: true,
        last_name: true,
        login: true,
        image_url: true,
        email: true,
        profile: {
          select: {
            status: true,
            PlayedGames: true,
            Wins: true,
            Losses: true,
          }
        }
      }
    });
    return (user);
  };


  async findOne(user_name: string): Promise<UserProfile> {
    const user = this.prisma.user.findUnique({
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
        profile: {
          select: {
            status: true,
            PlayedGames: true,
            Wins: true,
            Losses: true,
          }
        }
      }
    })

    return (user);
  }

  async ProfileLayout(user_name: string) : Promise<ReadProfileLayout> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_name: user_name.toLocaleLowerCase(),
      },
      select: {
        user_name: true,
        image_url: true,
      }
    });
    return (user);
  }

  // update(id: number, updateProfileDto: UpdateProfileDto) {
  //   return `This action updates a #${id} profile`;
  // }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
