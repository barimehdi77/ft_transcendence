// import { Injectable } from "@nestjs/common";
// import { PassportSerializer } from "@nestjs/passport";
// import { Prisma, User } from "@prisma/client";
// import { UserService } from "src/user/user.service";


// @Injectable()
// export class SessionSerializer extends PassportSerializer {
// 	constructor(private readonly userService: UserService) {
// 		super();
// 	}

// 	serializeUser(user: Prisma.UserUncheckedCreateInput, done: (err: Error, user: Prisma.UserUncheckedCreateInput) => void) {
// 		done(null, user);
// 	}
// 	async deserializeUser(user: Prisma.UserUncheckedCreateInput, done: (err: Error, user: Prisma.UserUncheckedCreateInput) => void) {
// 		// console.log(user);
// 		const UserDB = await this.userService.FindUser(user.intra_id);
// 		return UserDB ? done(null, UserDB) : done(null, null);
// 	}
// }
