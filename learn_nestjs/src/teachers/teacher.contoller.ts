import { Controller, Get, Put } from '@nestjs/common'

@Controller('teacher')
export class teacher{
	@Get()
	getTeachers(){
		return "return teachers"
	}
	@Get('/:teacherId')
	getTeacherID(){
		return "return teacher by id";
	}
	@Get(':/teacherId')
	getTeacherIdFromStudent(){
		return "Teacher ID from an Student";
	}
	@Put()
	updateStudentId(){
		return "Update student y ID";
	}
}