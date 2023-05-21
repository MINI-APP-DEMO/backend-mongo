import Controller from "../core/controller.decorator"
import { Get, Post } from "../core/handlers.decorator"
import { WebPush } from "../settings/web-push"
import { IResponseController } from "./index.controller"
import { Request, Response } from 'express'

@Controller('/notificacion')
export default class NotificacionController {
 
  @Post("/subscribe")
  public async subscribe(req: Request, res: Response): Promise<void> {
    let response = {} as IResponseController
    const body = req.body
    const subscription=body.subscription
    const credentials=body.credentials
    console.log("credenciales::",body)
    try {
      // await saveToDatabase(subscription) //Method to save the subscription to Database
      response.data = {'message':'Suscrito correctamente'}
      response.status = 200
      response.message = 'Notificaciones push'
      const configuracion= WebPush.configuracion(credentials)
      console.log(configuracion)
      WebPush.enviarNotificacion(subscription,"MENSAJE DE PRUEBA",configuracion)
    } catch (error) {
      console.log('error en controller', error)
      response = { error: error + '', data: null, status: 500 }
    }
    res.status(response.status).json(response)
  }


  @Get("/credentials")
  public async credentials(req: Request, res: Response): Promise<void> {
    let response = {} as IResponseController
    try {
      response.data = WebPush.credentials()
      response.status = 200
      response.message = 'credenciales notificacion Push'
    } catch (error) {
      console.log('error en controller', error)
      response = { error: error + '', data: null, status: 500 }
    }
    res.status(response.status).json(response)
  }
}
