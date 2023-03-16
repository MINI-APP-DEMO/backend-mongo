import { ISubMenuScheme } from './../schemes/security/navegacion.scheme';
import { Request, Response } from 'express'
import Controller from '../core/controller.decorator'
import { Get, Post, Delete, ProtectedURL } from '../core/handlers.decorator'
import { SubMenuService } from '../services/submenu.service';
@Controller('/submenu')
export default class SubMenuController {
  private _service = new SubMenuService()

  @ProtectedURL()
  @Get('/all')
  public async findAll(req: Request, res: Response): Promise<void> {
    const findAll = await this._service.findAll()
    console.log('listando datos', findAll)
    res.json({ data: findAll })
  }
  @ProtectedURL()
  @Post('')
  public async add(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body
      const add: Partial<ISubMenuScheme> = { ...body }
      if (!add.nombre || !add.route || !add.menuID) {
        res.status(400).json({message:'[nombre,route,menuID] son requeridos'})
      }
      const save = await this._service.create(add)
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
