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

  /**
   * Creates a new task (todo) with the provided data.
   *
   * @param {TodoCreateRequestBody} todo - The request body containing details of the new todo.
   * @property {string} title - Title of the todo.
   * @property {string} description - Description of the todo.
   * @property {boolean} isComplete - Indicates whether the todo is complete or not.
   *
   * @returns {Object} response - The response object containing details of the created todo.
   */
  @post('/api/todos/add')
  async createNewTask(
    @requestBody() todo: TodoCreateRequestBody,
  ) {

    let response;

    // validate todo object
    if (!todo.title) throw new HttpErrors.NotAcceptable("title is required");

    // create new todo record and return it
    try {
      response = await this.todoRepository.create(todo);
    } catch (err) {
      console.error('Error creating new todo:', err);
      throw new HttpErrors.NotAcceptable("Error occured while create new todo");
    }

    return response;
  }

  /**
   * Retrieves a list of todos based on the provided filter parameters.
   *
   * @param {FilterObj} filter - The request body containing filter options.
   * @property {number} pageIndex - Page index (starting from 0) for pagination.
   * @property {number} pageSize - Number of todos to include on each page (default is 20).
   *
   * @returns {Todo[]} - List of todos that match the specified filter criteria.
   */
  @post('/api/todos/list')
  async getTodoList(
    @requestBody() filter: FilterObj,
  ) {

    let pageIndex = filter.pageIndex ? filter.pageIndex : 0;
    let pageSize = filter.pageSize ? filter.pageSize : 20;

    return await this.todoService.getTodoList(pageIndex, pageSize);

  }

  /**
   * Retrieves a partial todo by its unique identifier.
   *
   * @param {string} id - The unique identifier of the todo.
   *
   * @returns {Partial<Todo>} - Partial details of the todo with the specified identifier.
   */
  @get('/api/todos/{id}')
  async findTodoById(
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

  /**
   * Updates a todo by its unique identifier with the provided partial data.
   *
   * @param {string} id - The unique identifier of the todo to be updated.
   * @param {Partial<Todo>} todo - The partial data to update in the todo.
   * @property {string} title - Updated title of the todo.
   * @property {string} description - Updated description of the todo.
   * @property {boolean} isComplete - Updated completion status of the todo.
   */
  @patch('/api/todos/{id}')
  async updateTodoById(
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

  /**
   * Deletes a todo by its unique identifier.
   *
   * @param {string} id - The unique identifier of the todo to be deleted.
   */
  @del('/api/todos/{id}')
  async deleteTodoById(@param.path.string('id') id: string): Promise<void> {

    try {
      await this.todoRepository.deleteById(id);
    }
    catch (err) {
      throw new HttpErrors.NotAcceptable("Error occured while deleting todos");
    }
  }
}
