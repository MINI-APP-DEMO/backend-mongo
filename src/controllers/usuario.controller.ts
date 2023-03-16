// src/controllers/cat.controller.ts
import { Request, Response } from 'express'
import Controller from '../core/controller.decorator'
import { Get, Post,Delete, ProtectedURL } from '../core/handlers.decorator'
import { IUsuarioScheme, UsuarioModel } from '../schemes/security/usuario.scheme'
import { UsuarioService } from '../services/usuario.service'
@Controller('/usuario')
export default class UsuarioController {
  private _service = new UsuarioService()
  @ProtectedURL()
  @Get('')
  public async listarTodo(req: Request, res: Response): Promise<void> {
    try {
      const findAll = await this._service.findAll()
    res.json({ usuarios: findAll })
    } catch (error) {
      res.send(500).json({message:error+''})
    }
    
  }

  @ProtectedURL()
  @Get('/all')
  public async listarTodo2(req: Request, res: Response): Promise<void> {
    const findAll = await this._service.findAll()
    console.log('listando datos', findAll)
    res.json({ usuarios: findAll })
  }

  @Post('')
  public async add(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body
      const newUsuario: IUsuarioScheme = { ...body }
      const save = await this._service.create(newUsuario)
      console.log(save)
      res.status(200).json(save)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  @Delete('/all')
  public async deleteAll(req: Request, res: Response): Promise<any> {
    try {
      const dele = await this._service.deleteAll()
      console.log(dele)
      res.status(200).json(dele)
    } catch (error) {
      res.status(500).send(error)
    }
  }
 
}
