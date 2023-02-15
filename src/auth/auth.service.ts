import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    
    constructor(private userService:UsersService, private jwtService:JwtService,private readonly prismaService:PrismaService){}
   async validateUser(email:string, password:string){
        const user = await this.userService.findOneByEmail(email)
        if(!user||user.password !==password)return false;
        return user
    }

    sign(user:Users){
        const access_token = this.jwtService.sign({
            sub:user.id,email:user.email
        })
        return {
            status:true,
            message:"Login Successful",
            "token":access_token
        }
    }
   async registerUser(createPostDto:CreateUserDto){
        const user = await this.prismaService.users.create({
            data:createPostDto
        })
        const access_token = this.jwtService.sign({
            sub:user.id,email:user.email
        })
        return {
            status:true,
            message:"Registration Successful",
            "token":access_token
        }
    }
}
