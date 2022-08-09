import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { AppService } from "./app.service";


@Controller()
export class AppController {
	constructor (private readonly appservice: AppService) {
	}
	
	@Get()
	test() {
		return ("I got it");
	}
}
