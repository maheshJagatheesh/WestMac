import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
@IonicPage()
@Component({
  selector: 'page-player-scanner-attendance',
  templateUrl: 'player-scanner-attendance.html',
})
export class PlayerScannerAttendancePage {
  PersonData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
    public global: GlobalProvider) {
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val;
      console.log(this.PersonData)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerScannerAttendancePage');
  }
  close(event){
    if(event.toElement.className=="scroll-content"){
     this.navCtrl.pop()
    }
   }

}
