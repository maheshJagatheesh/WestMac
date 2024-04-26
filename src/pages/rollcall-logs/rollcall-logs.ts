import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-rollcall-logs',
  templateUrl: 'rollcall-logs.html',
})
export class RollcallLogsPage {
  passenger:any;
  rollCallLogList:any=[]
  rollCallLogListSuccess:any='0';
  private phone: string = '';
  private emergencyContacts: any;
  private email: string = '';
  public active: string = '';
  private playerDetails: any[] = [];
  ShowLogs:boolean=false;
  emergencyPhoneExists: boolean = false;
  private relations: any[] = [];
  NoContactFound:any='0'
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public storage: Storage,
    public global: GlobalProvider, public gFn: GlobalFunctionsProvider,private modalCtrl: ModalController,public global_api:GlobalApiProvider) {
      this.passenger=navParams.get('passengers')
      this.relations[1] = 'Parent';
      this.relations[2] = 'Guardian';
      // console.log(this.passenger.rollcallPersonsId)
      this.getRollCallLogs()
      this.getPlayerDetails()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollcallLogsPage');
  }
  getRollCallLogs(){
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set('rollcallPersonId', this.passenger.rollcallPersonsId)
        .set('timeZoneOffset', new Date().getTimezoneOffset().toString());
        
      this.http.post(this.global.APIURL + "transports/getRollcallLogs", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.rollCallLogList = data.GETROLLCALLLOGS;
            this.rollCallLogListSuccess='1'
            resolve(true);
          }
          else{
            this.rollCallLogListSuccess='2'
            resolve(false);
          }
        }, error => {
          this.rollCallLogListSuccess='2'
          resolve(false)
        });
    })

  }
  getPlayerDetails() {
    // let loading = this.loadingCtrl.create();
    // loading.present();
    let data = new HttpParams()
      .set('person_id', this.passenger.person_id);
    this.http.post<any>(this.global.APIURL + 'players/getPersonDetails', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        // loading.dismiss();
        if (response.SUCCESS) {
          this.playerDetails = response.GETPERSONDETAILS;
          this.phone = this.playerDetails[0].phone_mobile;
          this.email = this.playerDetails[0].email_address;
          this.emergencyContacts = this.playerDetails[0].emergency_contacts;
          for(let key in this.emergencyContacts){
            if(this.emergencyContacts[key].phone_mobile.length > 0){
              this.emergencyPhoneExists = true;
              break;
            }
          }
        }
      }, error => {
        // loading.dismiss();
      });
  }
  showSMSModal(phone=this.phone) {
    this.active = 'sms';
    setTimeout(() => {
      this.active = '';
      if (phone.length == 0) {
        this.gFn.presentToast('Phone number not set');
      } else {
        let smsModal = this.modalCtrl.create(
          'SmsModalPage',
          { phone: phone },
          {
            enableBackdropDismiss: true,
            showBackdrop: true
          }
        );
        smsModal.present();
      }
    }, 300);
  }

  showCallModal(emergency,phone_mobile=this.playerDetails[0].phone_mobile) {
    this.active = emergency ? 'emergencyPhone' : 'phone';
    setTimeout(() => {
      // this.active = '';
      if ((!emergency && phone_mobile == 0) || (emergency && !this.emergencyPhoneExists)) {
        
        if(this.active=='phone'){
          this.gFn.presentToast('No associated contact found.');
        }
        else if(this.active=='emergencyPhone'){
          this.NoContactFound='-1'
          if(!this.ShowLogs){
            this.ShowLogs=true
          }
          else{
            this.ShowLogs=false
          }
        }

      } else {
        
        this.phone = emergency ? '' : phone_mobile;
        
        if(this.active=='phone'){
          
          let callModal = this.modalCtrl.create(
            'CallModalPage',
            { phone: this.phone, emergency: emergency, emergencyContacts: this.emergencyContacts },
            {
              enableBackdropDismiss: true,
              showBackdrop: true
            }
          );
          callModal.present();

        }
        else if(this.active=='emergencyPhone'){
          this.NoContactFound='1'
          if(!this.ShowLogs){
            this.ShowLogs=true
          }
          else{
            this.ShowLogs=false
          }

        }
        
        
      }
    }, 300);
  }

  showEmailModal(email=this.email) {
    this.active = 'email';
    setTimeout(() => {
      this.active = '';
      if (email.length == 0) {
        this.gFn.presentToast('Email not set');
      } else {
        let emailModal = this.modalCtrl.create(
          'EmailModalPage',
          { email: email },
          {
            enableBackdropDismiss: true,
            showBackdrop: true
          }
        );
        emailModal.present();
      }
    }, 300);
  }
  close(event){
   if(event.toElement.className=="scroll-content"){
    this.navCtrl.pop()
   }
  }

}
