import { MenuModel } from './../schemes/security/navegacion.scheme'

import {
  ISubMenuScheme,
  SubMenuModel,
} from '../schemes/security/navegacion.scheme'
import { BaseRepository } from './base.repository'

export class SubMenuRepository extends BaseRepository<ISubMenuScheme> {
  private _menuModel
  constructor() {
    super(SubMenuModel)
    this._menuModel = MenuModel
  }
  override async findAll() {
    return await this._model
      .find()
      .select('route nombre _id status  updatedAt')
      .populate({
        path: 'menuID',
        select: 'route nombre _id',
      })
  }
  override async register(add: Partial<ISubMenuScheme>): Promise<any> {
    try {
      const defaultValues = this.generarDefaultValues()
      const newAdd: Partial<ISubMenuScheme> = { ...add, ...defaultValues }
      const menuFind = await this._menuModel.findById(add.menuID)
      if (!menuFind) throw 'Menu no disponible'
      newAdd.menuID = menuFind
      const register = await this._model.create(newAdd)
      return register._id
    } catch (error) {
      throw error
    }
  }
}
