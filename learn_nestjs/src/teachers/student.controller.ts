import { Controller, Get, Put } from "@nestjs/common"


@Controller('teacher/:teacherId/students')
export class StudentTeacherController{
	@Get()
	getStudent(){
		return "Teacher ID from an Student";
	}
	@Put('/:studentId')
	updateStudentTeacher(){
		return "Update student ID";
	}
}
