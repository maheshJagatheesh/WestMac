import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Storage } from '@ionic/storage';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
@IonicPage()
@Component({
  selector: 'page-notify-parents',
  templateUrl: 'notify-parents.html',
})
export class NotifyParentsPage {
  characters:any=86;
  text:any=''
  AppName:any
  vehicleDetails:any;
  PersonData:any;
  staffDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public storage: Storage,
    public global: GlobalProvider,private appVersion: AppVersion, public viewCtrl:ViewController,public gFn:GlobalFunctionsProvider,
    public loadingCtrl:LoadingController,public global_api:GlobalApiProvider) {
      this.vehicleDetails=navParams.get('details')
      // console.log(this.vehicleDetails)
      this.appVersion.getAppName().then(Appname=>{
      this.AppName=Appname
    })
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val;
      for(var key in this.vehicleDetails.staffList){
        if( this.vehicleDetails.staffList[key].PERSONID== this.PersonData.PERSON_ID){
          this.staffDetails=this.vehicleDetails.staffList[key]
          // console.log(this.staffDetails)
        }
      }
      if(!this.staffDetails){
        this.gFn.presentToast('Unauthorized access')
        this.viewCtrl.dismiss()
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifyParentsPage');
  }
  close(event){
    if(event.toElement.className=="scroll-content"){
     this.navCtrl.pop()
    }
   }
   sendNotification(){
    let loader = this.loadingCtrl.create({});
    loader.present();
    if(this.text && this.text.length<=86) {
      let PlayersData = new HttpParams()
        .set('transportStaffId',  this.staffDetails.TRANSPORTSTAFFID)
        .set('transportVehicleId', this.vehicleDetails.vehiclesId)//this.PersonData.CLIENT_ID
        .set('message', this.text)//this.PersonData.SELECTEDTEAM
        .set('app_name',  this.global.App_id)
      this.http.post(this.global.APIURL + "transports/notifyParentsByStaff", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          // console.log(data)
          this.viewCtrl.dismiss()
          if(data.SUCCESS && data.NOTIFYPARENTS){
            this.gFn.presentToast('Notify successfull')
            loader.dismiss();
          }
          else{
            this.gFn.presentToast('Notify unsuccessfull')
            loader.dismiss();
          }


        },error=>{
          this.gFn.presentToast('Notify unsuccessfull')
          loader.dismiss();
          this.viewCtrl.dismiss()
        })

   }
   else if(this.text && this.text.length>86){
    this.gFn.presentToast('Message cannot be more than '+this.characters+' characters')
    loader.dismiss();
   }
  
    else{
      this.gFn.presentToast('Message cannot be blank')
      loader.dismiss();
    }
  }

}
