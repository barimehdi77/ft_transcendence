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
import { validateUserMiddleware } from 'src/comman/middleware/ValidateUser.middleware';
import { UserService } from 'src/user/user.service';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateUserMiddleware)
      .exclude('/auth')
      .forRoutes('*');
  }
}
