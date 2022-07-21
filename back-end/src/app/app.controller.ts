import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { Week } from '../db'
import { AppService } from "./app.service";
import { ReservaitonRequestDro, WeekResponseDto } from "./dto/app.dto";


@Controller()
export class AppController {
	constructor (private readonly appservice: AppService) {}
	@Get()
	getWeek() : WeekResponseDto[] {
		return (this.appservice.getWeek());
	}
	@Put()
	reserveTime(
		@Body() data: ReservaitonRequestDro
	) : WeekResponseDto {
		return (this.appservice.reserveTime(data));
	}
	@Delete()
	unReserve(
		@Body() data: ReservaitonRequestDro
	) : WeekResponseDto {
		return (this.appservice.unReserve(data));
	}
}
