import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController
  ) { }
   async presentToast(msg?: any, color?: any,position?: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,
      position: position,
    
    });
     await toast.present();
    }
 }
