import { Injectable } from '@nestjs/common';
import { FindTeacherResponseDto } from '../teachers/dto/teacher.dto'
import { teachers } from '../db'
import { teacher } from './teacher.contoller';

@Injectable()
export class TeachersService {
	private teachers = teachers;
	getTeachers() : FindTeacherResponseDto[] {
		return this.teachers;
	}
	getTeacherByID(teacherId : string) : FindTeacherResponseDto{
		return this.teachers.find(teacher => {
			return teacher.id === teacherId;
		})
	}
}
