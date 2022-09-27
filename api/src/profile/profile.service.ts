import { Injectable } from '@nestjs/common';
import { FriendStatus } from '@prisma/client';
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

  async getProfile (user_name: string): Promise<UserProfile> {
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
    })
  }

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
    if (!user) {
      return (null);
    }
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

}
