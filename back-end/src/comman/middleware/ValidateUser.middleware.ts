import { Header, HttpException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/user/user.service";


@Injectable()
export class validateUserMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization.replace("Bearer undefined","") as string;
		console.log("middleware called")
		console.log(token);
		if (token === "") throw new HttpException("unauthorized", 401);
		const user = await this.userService.FindUser(req.headers.authorization)
		if (user.profile_done === false) throw new HttpException("uncompleted", 477);
		req.user = user;
		if (!user) {
			throw new UnauthorizedException();
		}
		next();
	}
}
