import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    title:string
    
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    body:string
    
    userId:string
    
}
