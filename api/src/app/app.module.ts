import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { validateUserMiddleware } from 'src/comman/middleware/ValidateUser.middleware';
import { UserService } from 'src/user/user.service';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ProfileModule } from 'src/profile/profile.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FriendsModule } from 'src/friends/friends.module';
import { ConversationModule } from 'src/conversation/conversation.module';
import { MessagesModule } from 'src/messages/messages.module';
// import { ValidateComplateProfileMiddleware } from 'src/comman/middleware/ValidateCompleteProfile.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    FriendsModule,
    CloudinaryModule,
    ConversationModule,
    MessagesModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, JwtService, CloudinaryService],
})
export class AppModule {}//implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(validateUserMiddleware)
  //     .forRoutes('user', 'profile', '');
  //   consumer
  //     .apply(ValidateComplateProfileMiddleware)
  //     .exclude('api/auth/login', 'api/auth/redirect', 'api/user', 'api/user/setup')
  //     .forRoutes('*');
  // }

// }
