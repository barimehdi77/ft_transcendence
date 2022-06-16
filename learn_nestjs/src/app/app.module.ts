import { Controller, Module } from '@nestjs/common';
import  { StudentController } from '../student/student.controller'
import  { login } from "../student/student.controller"
import { teacher } from '../teachers/teacher.contoller'

@Module({
  imports: [],
  controllers: [StudentController, login, teacher],
})
export class AppModule {}
