import { Controller, Get, Param } from '@nestjs/common'
import { FindTeacherResponseDto } from '../teachers/dto/teacher.dto'
import { TeachersService } from './teachers.service'

@Controller('teachers')
export class teacher{
	constructor( private readonly teacherService : TeachersService) {}
	@Get()
	getTeachers() : FindTeacherResponseDto[] {
		return this.teacherService.getTeachers();
	}
	@Get('/:teacherId')
	getTeacherByID(
		@Param() tId: string
	) : FindTeacherResponseDto {
		return this.teacherService.getTeacherByID(tId);
	}
}