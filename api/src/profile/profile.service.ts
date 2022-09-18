import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/app/prisma.service';
import { UserProfile } from 'src/auth/dto/User.dto';
import { UserService } from 'src/user/user.service';
import { matchDetails, ReadProfile, ReadProfileLayout, winner } from './dto/read-profile.dto';

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
            played_games: true,
            user_points: true,
            wins: true,
            losses: true,
          }
        }
      }
    })
    return (user);
  }


  async getMatches(username: string): Promise<matchDetails[]> {
    const matches = await this.prisma.match.findMany({
      where: {
        OR: [
          {
            player_one: username,
          },
          {
            player_two: username
          }
        ],
      }
    });
    console.log(`the user ${username} played `,matches)
    const matchsHistory: matchDetails[] = matches.map(match => {
      return ({
        player_one: {
          name: match.player_one,
          score: match.player_one_score,
        },
        player_two: {
          name: match.player_two,
          score: match.player_two_score
        },
        winner: (match.player_one_score > match.player_two_score) ? winner.PLAYER_ONE : winner.PLAYER_TWO
      });
    });
    return (matchsHistory);
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
