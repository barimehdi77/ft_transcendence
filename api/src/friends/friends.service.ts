import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateFriendRequestDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

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

  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }

}
