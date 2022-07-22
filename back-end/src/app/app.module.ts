import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
