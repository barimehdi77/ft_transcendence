import { Injectable } from '@nestjs/common';
import { students } from '../db'
import { createStudentDto, FindStudentResponseDto, StudentResponseDto, UpdateStudentDto } from '../student/dto/student.dto'
import { v4 as uuid } from 'uuid'
import { FindTeacherResponseDto } from 'src/teachers/dto/teacher.dto';

@Injectable()
export class StudentService {
	private students = students;
	getStudents() : FindStudentResponseDto[] {
		return this.students;
	}
	getStudentById(StudentById : string) : FindStudentResponseDto{
		return this.students.find(student => {
			return student.id === StudentById;
		})
	}
	createStudent(payload: createStudentDto) : StudentResponseDto{
		let newStudent = {
			id : uuid(),
			...payload
		}
		this.students.push(newStudent);
		return newStudent;
	}
	updateStudent(payload: UpdateStudentDto, studentById: string) : StudentResponseDto{
		let updateStudent: StudentResponseDto;
		const updateStudentList = this.students.map(students =>{
			if (students.id === studentById)
			{
				updateStudent = {
					id: studentById,
					...payload
				}
			}else return students;
		});
		this.students = updateStudentList;
		return updateStudent;
	}
	getStudentByteacherId(teacherId:string) : FindStudentResponseDto[] {
		return this.students.filter(students =>{
			return students.teacher;
		})
	}
	updateStudentTeacher(teacherId: string, studentById:string) : StudentResponseDto{
		let updateStudent: StudentResponseDto;
		const updateStudentList = this.students.map(students =>{
			if (students.id === studentById)
			{
				updateStudent = {
					...students,
					teacher:teacherId
				}
			}else return students;
		});
		this.students = updateStudentList;
		return updateStudent;
	}
}
