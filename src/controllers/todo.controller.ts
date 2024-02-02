import {inject} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  HttpErrors,
  del,
  get,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {FilterObj, Todo, TodoCreateRequestBody} from '../models';
import {TodoRepository} from '../repositories';
import {TODO_SERVICE, TodoService} from '../services';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    private todoRepository: TodoRepository,
    @inject(TODO_SERVICE)
    private todoService: TodoService
  ) { }

  @post('/api/todos/add')
  async createNewTask(
    @requestBody() todo: TodoCreateRequestBody,
  ) {

    let response;

    if (!todo.title) throw new HttpErrors.NotAcceptable("title is required");

    try {
      response = await this.todoRepository.create(todo);
    } catch (err) {
      console.error('Error creating new todo:', err);
      throw new HttpErrors.NotAcceptable("Error occured while create new todo");
    }

    return response;
  }

  @post('/api/todos/list')
  async getTodoList(
    @requestBody() filter: FilterObj,
  ) {

    let pageIndex = filter.pageIndex ? filter.pageIndex : 0;
    let pageSize = filter.pageSize ? filter.pageSize : 20;

    return await this.todoService.getTodoList(pageIndex, pageSize);

  }

  @get('/api/todos/{id}')
  async findById(
    @param.path.string('id') id: string,
  ) {

    let response: Partial<Todo>;

    try {
      response = await this.todoRepository.findById(id);
    }
    catch (err) {
      throw new HttpErrors.NotAcceptable("Error occured while finding todos.");
    }

    return response;
  }

  @patch('/api/todos/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() todo: Partial<Todo>,
  ): Promise<void> {

    try {
      await this.todoRepository.updateById(id, todo);
    }
    catch (err) {
      throw new HttpErrors.NotAcceptable("Error occured while updating todos");
    }

  }

  @del('/api/todos/{id}')
  async deleteById(@param.path.string('id') id: string): Promise<void> {

    try {
      await this.todoRepository.deleteById(id);
    }
    catch (err) {
      throw new HttpErrors.NotAcceptable("Error occured while deleting todos");
    }
  }
}
