import { Controller, Get, Put, Param, Body } from "@nestjs/common"
import { FindStudentResponseDto, StudentResponseDto } from '../student/dto/student.dto'

@Controller('teachers/:teacherId/students')
export class StudentTeacherController{
	@Get()
	getStudent(
		@Body('login') name
	) : FindStudentResponseDto[] {
		return `get all students that belong to a teacher ${JSON.stringify(name)}`;
	}
	@Put('/:studentId')
	updateStudentTeacher(
		@Param('studentId') StudentI: string,
		@Param('teacherId') tId : string
	) : StudentResponseDto {
		return `Update student with Id of '${StudentI}' To teacher with Id of '${tId}'`;
	}
}
