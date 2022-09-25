import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { AppService } from "./app.service";


@Controller()
export class AppController {
	constructor (private readonly appservice: AppService) {
	}

	@Get()
	run() {
		return ("Server Is running on port 8080");
	}
}
