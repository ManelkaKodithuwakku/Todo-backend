import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoRelations} from '../models';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype._id,
  TodoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Todo, dataSource);
  }

  /**
   * Performs an aggregation operation on the "Todo" collection with the specified parameters.
   *
   * @param {any[]} params - The aggregation pipeline stages to be applied.
   *
   * @returns {Promise<any>} - A promise that resolves to the result of the aggregation operation.
   */
  public async aggregate(params?: any[]) {
    if (!params) params = [];
    const response = await (this.dataSource.connector as any).collection('Todo').aggregate(params).get();
    return response;
  }
}
