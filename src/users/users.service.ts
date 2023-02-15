import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { isEmpty } from 'src/util/is_empty';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prismaService.users.create({ data: createUserDto });
  }

  findAll(query:Prisma.UsersInclude) {
    return this.prismaService.users.findMany({include:isEmpty(query)?null:query});
  }

  findOne(id: string) {
    return this.prismaService.users.findUnique({ where: { id } });
  }
  findOneByEmail(email: string) {
    return this.prismaService.users.findUnique({ where: { email } });
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.users.update({
      data: updateUserDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.users.delete({where:{id}})}
}
