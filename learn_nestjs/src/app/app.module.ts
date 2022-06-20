import { Module } from '@nestjs/common';
import { StudentController } from "../student/student.controller"
import { teacher } from "../teachers/teacher.contoller"
import { StudentTeacherController } from "../teachers/student.controller"
import { StudentService } from "../student/student.service"
import { TeachersService } from "../teachers/teachers.service"

@Module({
  imports: [],
  controllers: [
    StudentController, 
    teacher,
    StudentTeacherController 
  ],
  providers: [
    StudentService,
    TeachersService
  ]
})
export class AppModule {}
