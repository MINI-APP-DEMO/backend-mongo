import LoginController from './login.controller'
import MenuController from './menu.controller'
import SubMenuController from './submenu.controller'
import UsuarioController from './usuario.controller'
export const controllers = [
  UsuarioController,
  LoginController,
  MenuController,
  SubMenuController,
]

export interface IResponseController {
  status: number
  message?: string
  data?: object | object[]|null
  error?:string
}
