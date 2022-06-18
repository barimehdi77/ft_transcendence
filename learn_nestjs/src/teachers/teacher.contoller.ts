import { Controller, Get, Param } from '@nestjs/common'
import { FindTeacherResponseDto } from '../teachers/dto/teacher.dto'

@Controller('teachers')
export class teacher{
	@Get()
	getTeachers() : FindTeacherResponseDto[] {
		return "return all teachers"
	}
	@Get('/:teacherId')
	getTeacherByID(
		@Param() tId: string
	) : FindTeacherResponseDto[] {
		return `return teacher by id: ${tId}`;
	}
}