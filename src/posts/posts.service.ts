import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { isEmpty } from 'src/util/is_empty';

@Injectable()
export class PostsService {
  constructor (private prismaService:PrismaService){}
  create(createPostDto: CreatePostDto) {
    return this.prismaService.posts.create({
      data:createPostDto
    })
  }

  findAll(query?:Prisma.PostsInclude) {
    return this.prismaService.posts.findMany({include: isEmpty(query)?null:query})
  }

  findOne(id: string) {
    return this.prismaService.posts.findUnique({where:{id}})
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prismaService.posts.update({data:updatePostDto,where:{id}})
  }

  remove(id: string) {
    return this.prismaService.posts.delete({where:{id}})
  }
}
