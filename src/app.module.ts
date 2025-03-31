import { Module } from '@danet/core';
import { TodoModule } from './todo/module.ts';
import { AppController } from './app.controller.ts';
import { TodoController } from './todo/controller.ts';

@Module({
  controllers: [AppController,TodoController],
  imports: [TodoModule],
})
export class AppModule {}
