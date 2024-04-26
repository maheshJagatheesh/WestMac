import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the VehicleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicle-list',
  templateUrl: 'vehicle-list.html',
})
export class VehicleListPage {
  VehicleList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.VehicleList=navParams.get('details')
    console.log(this.VehicleList)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleListPage');
  }
  close(event){
    if(event.toElement.className=="scroll-content"){
      this.viewCtrl.dismiss()
    }
   }
   selectVehicle(data){
     this.viewCtrl.dismiss(data)
   }
   back(){
    this.viewCtrl.dismiss()
   }

}
