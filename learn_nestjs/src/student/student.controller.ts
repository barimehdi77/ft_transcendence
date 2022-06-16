import { Controller, Get, Post, Put } from "@nestjs/common"

@Controller('student')
export class StudentController {
	@Get()
	getStudents(){
		return "All students!!";
	}
	@Get('/:StudentById')
	getStudentById(){
		return "Student by ID";
	}
	@Post()
	createStudent(){
		return "create student";
	}
	@Put('/:studentById')
	updateStudent(){
		return "update student by ID";
	}
}

@Controller('login')
export class login{
	@Get()
	getMylogin(){
		return "abdel-ke";
	}
	@Get('/:loginID')
	getLoginId(){
		return "login with ID"
	}
}