import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateFriendRequestDto, GetFriendRequestDto, UserInfo } from './dto/friend.dto';

@Injectable()
export class FriendsService {

  constructor (private readonly userService: UserService,
              private readonly prisme: PrismaService) {}

  async create(auth: string, createFriendRequestDto: CreateFriendRequestDto) {
    const intra_id = this.userService.decode(auth).intra_id;
    const FriendRequest = await this.prisme.friendsList.create({
      data: {
        from: intra_id,
        to: createFriendRequestDto.to,
      }
    });
    return FriendRequest;
  }

  async findAll(auth: string): Promise<GetFriendRequestDto[]> {
    const intra_id = this.userService.decode(auth).intra_id;
    const getRequestFromDB = await this.prisme.friendsList.findMany({
      where: {
            to: intra_id,
            status: "PENDING",
      },
      select: {
        from: true,
        to: true,
        status: true,
      }
    });
    console.log(`requests from user ${intra_id} in db`, getRequestFromDB);
    if (getRequestFromDB !== null) {
      const parseReq: GetFriendRequestDto[] = await Promise.all(
        getRequestFromDB.map(async (request) => {
          console.log("req", request);
          const req = await this.prisme.user.findUnique({
            where: {
              intra_id: request.from,
            },
            select: {
              user_name: true,
              image_url: true,
            }
          });
          return ({
            to: req,
            status: request.status,
          });
        })
      )
      return (parseReq);
    }
    return (null);
  }

  async listAllFriends(auth: string): Promise<GetFriendRequestDto[]> {
    const intra_id = this.userService.decode(auth).intra_id;
    const getAllFriendsFromDB = await this.prisme.friendsList.findMany({
      where: {
            to: intra_id,
            status: "ACCEPTED",
      },
      select: {
        from: true,
        to: true,
        status: true,
      }
    });
    console.log(`requests from user ${intra_id} in db`, getAllFriendsFromDB);
    if (getAllFriendsFromDB !== null) {
      const parseReq: GetFriendRequestDto[] = await Promise.all(
        getAllFriendsFromDB.map(async (request) => {
          console.log("req", request);
          const req = await this.prisme.user.findUnique({
            where: {
              intra_id: request.from,
            },
            select: {
              user_name: true,
              image_url: true,
            }
          });
          return ({
            to: req,
            status: request.status,
          });
        })
      )
      return (parseReq);
    }
    return (null);
  }

  // update(id: number, updateFriendDto: UpdateFriendDto) {
  //   return `This action updates a #${id} friend`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} friend`;
  // }

}
