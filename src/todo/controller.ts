import { Body, Controller, Delete, Get, Param, Post, Put } from '@danet/core';
import { CallData } from './class.ts';
import { TodoService } from './service.ts';
import { ReturnedType } from '@danet/swagger/decorators';

@Controller('hfx311')
export class TodoController {
  constructor(public todoService: TodoService) {
  }

  @ReturnedType(CallData, true)
  @Get("hfx311")
  async getAllTodo() {
    return this.todoService.getAll(50,50);
  }

  @ReturnedType(CallData)
  @Get(':id')
  async getTodoById(@Param('id') todoId: string) {
    return this.todoService.getById(todoId);
  }

  @ReturnedType(CallData)
  @Post()
  async createTodo(@Body() todo: CallData) {
    return this.todoService.create(todo);
  }

  @Put(':id')
  async updateTodo(@Param('id') todoId: string, @Body() todo: CallData) {
    return this.todoService.update(todoId, todo);
  }

  @Delete(':id')
  async deleteOne(@Param('id') todoId: string) {
    return this.todoService.deleteOneById(todoId);
  }
}
