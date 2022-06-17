import { Controller, Module } from '@nestjs/common';
import  { StudentController } from '../student/student.controller'
import  { login } from "../student/student.controller"
import { teacher } from '../teachers/teacher.contoller'
import { StudentTeacherController } from '../teachers/student.controller'

@Module({
  imports: [],
  controllers: [StudentController, login, teacher, StudentTeacherController],
})
export class AppModule {}
