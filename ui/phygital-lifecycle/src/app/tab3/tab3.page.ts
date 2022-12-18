import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { extraData, serviceDetails } from '../constants/car_data';
import { DigicarService } from '../services/digicar.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  extraDetails: any[] = extraData;
  serviceDetails: any[] = serviceDetails;
  
  constructor(private alertCtrl: AlertController, private digicar: DigicarService) {}

  async displayInsurancePolicy() {
    let header:string = "Insurance Data Sharing"
    let subHeader: string="Aggree to share access to car metrics"
    let message: string="You will be sharing KM, Service Information, Speed data"
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      mode: "ios",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Agree',
          role: 'confirm',
          handler: () => {
            // this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });
    await alert.present();

  }

  async writeKm() {
    const res = await this.digicar.writeKm();
  }

  async writeServiceLog() {
    const res = await this.digicar.writeServiceLog();
  }
}
