import { Header, HttpException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/user/user.service";


// @Injectable()
// export class validateUserMiddleware implements NestMiddleware {
// 	constructor(private readonly userService: UserService) {}
// 	async use(req: Request, res: Response, next: NextFunction) {
// 		// console.log("this is not good 2 + auth", req.headers.authorization);
// 		console.log(req);
// 		let token;
// 		if (req.headers.authorization === "Bearer undefined")
// 			token = req.headers.authorization.replace("Bearer undefined","") as string;
// 		else if (req.headers.authorization === 'Bearer null')
// 			token = req.headers.authorization.replace("Bearer null", "") as string
// 		if (token === "") throw new HttpException("unauthorized", 401);
// 		const user = await this.userService.FindUser(req.headers.authorization);
// 		if (!user) {
// 			throw new UnauthorizedException();
// 		}
// 		req.user = user;
// 		next();
// 	}
// }
