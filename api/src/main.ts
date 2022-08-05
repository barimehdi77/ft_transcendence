import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser'
// import * as session from 'express-session';
// import * as passport from 'passport';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  // app.use(
  //   session({
  //     cookie: {
  //       maxAge: 86400000, // expire after one day
  //     },
  //     secret: 'odaifniaisfdianondfsainfasinaisdfnposanoianfoiadsn',
  //     resave: false,
  //     saveUninitialized: false
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();
