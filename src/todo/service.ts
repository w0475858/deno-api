import { Inject, Injectable } from '@danet/core';
import { CallData } from './class.ts';
import type { Repository } from '../database/repository.ts';
import { USER_REPOSITORY } from './constant.ts';

@Injectable()
export class TodoService {
  constructor(@Inject(USER_REPOSITORY) private repository: Repository<CallData>) {
  }

  getAll(_limit: number, _skip: number) {
    return this.repository.getAll(_limit, _skip);
  }

  getById(id: string) {
    return this.repository.getById(id);
  }

  async create(todo: Omit<CallData, '_id'>) {
    return this.repository.create(todo);
  }

  update(todoId: string, todo: CallData) {
    return this.repository.updateOne(todoId, todo);
  }

  async deleteOneById(todoId: string) {
    await this.repository.deleteOne(todoId);
  }

  // deleteAll() {
  //   return this.repository.deleteAll();
  // }
}
