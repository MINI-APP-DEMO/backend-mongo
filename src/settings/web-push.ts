import webPush from 'web-push'
import { ENVIRONMENT } from '../constantes'


export namespace WebPush{
  export interface ICredentials{
    publicKey:string
    privateKey?:string
  }

  export const credentials=():ICredentials=>{
    // const vapidKeys = webPush.generateVAPIDKeys();//*generamos las claves dinamicamente
    const vapidKeys:ICredentials={
      publicKey:ENVIRONMENT.pushNotificacion.PUBLIC_VAPID_KEY,
      privateKey:ENVIRONMENT.pushNotificacion.PRIVATE_VAPID_KEY
    }
    console.log('credenciales::',vapidKeys);
    return {publicKey:vapidKeys.publicKey,privateKey:vapidKeys.privateKey}
  }
  export const configuracion=(_credentials:ICredentials)=>{
    const _privateKey=ENVIRONMENT.pushNotificacion.PRIVATE_VAPID_KEY
    const publicKey=  _credentials?_credentials.publicKey:''
    const privateKey=  _credentials?_credentials.privateKey:_privateKey
    console.log('public key',publicKey)
    console.log('private key',privateKey)
    webPush.setVapidDetails(
      'mailto:user@example.org',
      publicKey,
     privateKey
    );
    return webPush
  }

  export const enviarNotificacion=(pushSubscription:any,payload:string,_configuracion:any)=>{
    _configuracion.sendNotification(pushSubscription, payload);
  }
  
}