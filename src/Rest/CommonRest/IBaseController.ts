import { GetParamsModel } from '../../Common/Models/GetParamsModel';

export interface IBaseController {
  getList(params?: GetParamsModel): Promise<any>;
  get(id: number): Promise<any>;
  create(model: any): Promise<any>;
  update(id: number, model: any): Promise<any>;
  delete(id: number): Promise<any>;
}
