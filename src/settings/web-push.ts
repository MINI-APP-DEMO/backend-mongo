import webPush from 'web-push'


export namespace WebPush{
  export interface ICredentials{
    publicKey:string
    privateKey:string
  }

  export const credentials=():ICredentials=>{
    const vapidKeys = webPush.generateVAPIDKeys();
    console.log(vapidKeys.publicKey, vapidKeys.privateKey);
    return {publicKey:vapidKeys.publicKey,privateKey:vapidKeys.privateKey}
  }
  export const configuracion=(_credentials:ICredentials)=>{
    const publicKey=  _credentials?_credentials.publicKey:''
    const privateKey=  _credentials?_credentials.privateKey:''
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