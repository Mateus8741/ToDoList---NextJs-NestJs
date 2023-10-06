import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    return this.prisma.toDo.create({
      data: {
        userId,
        ...createTodoDto,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.toDo.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.toDo.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const data = {
      ...updateTodoDto,
    };

    return this.prisma.toDo.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.toDo.delete({
      where: {
        id,
      },
    });
  }
}
