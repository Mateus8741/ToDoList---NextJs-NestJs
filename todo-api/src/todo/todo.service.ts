import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto, userId: number) {
    return this.prisma.toDo.create({
      data: {
        userId,
        title: createTodoDto.title,
        status: createTodoDto.status,
      },
    });
  }

  findAll(userId: number) {
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

    this.prisma.toDo.update({
      where: {
        id,
      },
      data,
    });

    return `Todo ${updateTodoDto.title} updated successfully`;
  }

  remove(id: number) {
    this.prisma.toDo.delete({
      where: {
        id,
      },
    });

    return `Todo has deleted successfully`;
  }
}
