import { UsuarioScheme } from '../schemes/security/usuario.scheme'

import { IUsuarioScheme, UsuarioModel } from '../schemes/security/usuario.scheme'
import { BaseRepository } from './base.repository'
import { IBaseRepository } from './base.repository.interface'
import { Model } from 'mongoose'
import { ILoginCredencial } from '../controllers/login.controller'

export class UsuarioRepository extends BaseRepository<IUsuarioScheme> {
  constructor() {
    super(UsuarioModel)
  }
  async login(credenciales: ILoginCredencial): Promise<IUsuarioScheme> {
    try {
      const find = await this._model.findOne({
        username: credenciales.username,
        password: credenciales.password,
        isDeleted:false
      })
      if (!find) throw `credenciales invalidas [${JSON.stringify(credenciales)}]`
      return find
    } catch (error) {
      throw error
    }
  }
}
