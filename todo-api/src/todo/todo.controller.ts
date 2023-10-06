import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/auth/RequestWithUser';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('/todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: RequestWithUser) {
    return this.todoService.create(createTodoDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.todoService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch()
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
