import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport/dist";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UnauthorizedException } from "@nestjs/common/exceptions";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({
            usernameField:"email"
        })
    }
  async  validate(email:string,password:string){
        const user = await this.authService.validateUser(email,password)
        if(!user)throw new UnauthorizedException
        return user
    }
}