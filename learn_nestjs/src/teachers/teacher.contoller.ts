import { Controller, Get } from '@nestjs/common'

@Controller('teacher')
export class teacher{
	@Get()
	getTeachers(){
		return "return all teachers"
	}
	@Get('/:teacherId')
	getTeacherByID(){
		return "return teacher by id";
	}
}