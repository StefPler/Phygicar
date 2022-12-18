import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DigicarService } from '../services/digicar.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  btnText: string = "Unlock";
  canUnlock: boolean = false;
  unlock: boolean = false;
  constructor(private digicar: DigicarService, private loadingCtrl: LoadingController) {}

  async toggleLock(event: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Setting lock permissions...',
    })
    loading.present();
    await this.digicar.writeLockPerm(!this.canUnlock);
    await this.setLockValue();
    loading.dismiss();
    // this.canUnlock = event.detail.checked;
  }

  async unlockCar() {
    this.unlock = !this.unlock;
    if(this.btnText === "Unlock") {
      this.btnText = "Lock";
    }else {
      this.btnText = "Unlock";
    }
  }

  async setLockValue() {
    const isUnlockable = await this.digicar.readLockPerm();
    this.canUnlock = isUnlockable;
  }

  ngOnInit(): void {
    this.setLockValue();
  }
}
