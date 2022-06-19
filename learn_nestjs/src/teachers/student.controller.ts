import { Controller, Get, Put, Param, Body } from "@nestjs/common"
import { FindStudentResponseDto, StudentResponseDto } from '../student/dto/student.dto'
import { StudentService } from "src/student/student.service";
import { FindTeacherResponseDto } from "./dto/teacher.dto";

@Controller('teachers/:teacherId/students')
export class StudentTeacherController{
	constructor(private readonly studentServ : StudentService) {}
	@Get()
	getStudent(
		@Param('teacherId') teacherId : string
	) : FindStudentResponseDto[] {
		return this.studentServ.getStudentByteacherId(teacherId);
	}
	@Put('/:studentId')
	updateStudentTeacher(
		@Param('studentId') StudentI: string,
		@Param('teacherId') tId : string
		) : StudentResponseDto {
			return this.studentServ.updateStudentTeacher(tId, StudentI);
			
	}
}
