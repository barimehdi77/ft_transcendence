import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

	constructor(config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
				const token = request?.cookies["access_token"];
				console.log(token);
				if (!token) return null
				return (token);
			}]),
			secretOrKey: config.get('JWT_SECRET'),
			// sec: config.get('JWT_SECRET'),
		});
	}

	validate (payload: any) {
		return (payload)
	}

}
