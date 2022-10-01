import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/app/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [UserModule],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    PrismaService,
    UserService,
    JwtService,
    CloudinaryService,
  ],
})
export class ProfileModule {}
