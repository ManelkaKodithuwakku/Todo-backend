import { /* inject, */ BindingKey, BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Todo} from '../models';
import {TodoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TodoService {
  constructor(
    @repository(TodoRepository)
    private todoRepository: TodoRepository,
  ) { }

  async getTodoList(pageIndex: number, pageSize: number) {

    let skipCount = pageIndex * pageSize;
    let limitCount = pageSize;

    let content: Partial<Todo>[] = await this.todoRepository.aggregate([
      {
        $skip: skipCount,
      },
      {
        $limit: limitCount,
      },
      {
        $project: {
          title: 1,
          description: 1,
          isComplete: 1
        }
      }
    ])

    if (Array.isArray(content) && content.length > 0) {
      return content;
    } else return []
  }
}

export const TODO_SERVICE = BindingKey.create<TodoService>('service.todoService');
