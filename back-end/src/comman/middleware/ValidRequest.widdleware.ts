import { HttpException, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { Week } from "src/db";



@Injectable()
export class ValidRequestMiddleware implements NestMiddleware {
	use (req: Request, res: Response, next: NextFunction) {
		console.log(req.body);
		const Day = Week.find(day => {
			return (day.DayName === req.body.DayName);
		});
		if (!Day)
			throw new HttpException("You Can't reserve in This day", 400);
		console.log(Day.TimeZone["First"]);
		if (req.body.ReservedTime !== "First" && req.body.ReservedTime !== "Second" && req.body.ReservedTime !== "Third")
			throw new HttpException("Reserved Time is Incorrect", 401);
		if (Day)
		{
			if (Day.TimeZone[req.body.ReservedTime].isReserved == true)
				throw new HttpException("TimeZone is reserved", 402);
		}
		next();
	}
}

@Injectable()
export class ValidUnReserveMiddleware implements NestMiddleware {
	use (req: Request, res: Request, next: NextFunction) {
		console.log(req.method);
		console.log(req.body);
		const Day = Week.find(day => {
			return (day.DayName === req.body.DayName);
		});
		if (!Day)
				throw new HttpException("You Can't reserve in This day", 400);
		console.log(Day.TimeZone["First"]);
		console.log(req.body);
		if (req.body.ReservedTime !== "First" && req.body.ReservedTime !== "Second" && req.body.ReservedTime !== "Third")
			throw new HttpException("Reserved Time is Incorrect", 401);
		if (Day)
		{
			if (Day.TimeZone[req.body.ReservedTime].isReserved == false)
				throw new HttpException("TimeZone is Not reserved", 402);
			if (Day.TimeZone[req.body.ReservedTime].reserver !== req.body.Reserver)
				throw new HttpException("You can't unreserve on behalf of someone else", 403)
		}
		next();
	}
}

