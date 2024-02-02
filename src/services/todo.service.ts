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

  /**
   * Retrieves a list of todos based on pagination parameters.
   *
   * @param {number} pageIndex - Page index (starting from 0) for pagination.
   * @param {number} pageSize - Number of todos to include on each page.
   *
   * @returns {Partial<Todo>[]} - List of todos with limited fields (title, description, isComplete).
   */
  async getTodoList(pageIndex: number, pageSize: number) {

    let skipCount = pageIndex * pageSize;
    let limitCount = pageSize;

    // aggregate and get all todos
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

    // check return value is array and its length greater than 0
    if (Array.isArray(content) && content.length > 0) {
      return content;
    } else return []
  }
}

export const TODO_SERVICE = BindingKey.create<TodoService>('service.todoService');
