import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common"
import { createStudentDto, UpdateStudentDto, FindStudentResponseDto, StudentResponseDto } from "../student/dto/student.dto"

@Controller('student')
export class StudentController {
	@Get()
	getStudents() : FindStudentResponseDto[]  {
		return "All students!!";
	}
	@Get('/:StudentById')
	getStudentById(
		@Param('StudentId') sId : string
	) : FindStudentResponseDto{
		return `Student by ID: ${sId}`;
	}
	@Post()
	createStudent(
		@Body() body : createStudentDto
	) : StudentResponseDto {
		return `create student with the following ${JSON.stringify(body)}`;
	}
	@Put('/:studentById')
	updateStudent(
		@Param('studentById') sId : string,
		@Body('name') body : UpdateStudentDto
	) : StudentResponseDto {
		return `update student with ID of '${sId}' With data of '${JSON.stringify(body)}'`;
	}
}
