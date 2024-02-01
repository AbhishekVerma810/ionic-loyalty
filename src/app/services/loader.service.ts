import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  private loading: HTMLIonLoadingElement; 

  async show(msg?: any) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
    });
    await this.loading.present();
  } dismiss() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
