import { Controller, Module } from '@nestjs/common';
import  { StudentController } from '../student/student.controller'
import  { login } from "../student/student.controller"

@Module({
  imports: [],
  controllers: [StudentController, login],
})
export class AppModule {}
