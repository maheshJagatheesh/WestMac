import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ModalController, ToastController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { PlayersDashboardPage } from '../players-dashboard/players-dashboard';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the PlayerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-details',
  templateUrl: 'player-details.html',
})
export class PlayerDetailsPage{
  private playerID: string = '';
  private phone: string = '';
  private emergencyContacts: any;
  private email: string = '';
  public active: string = '';
  private playerDetails: any[] = [];
  public medicalReportGenerated:boolean = false;
  FunctionAccess:any;
  PersonData:any;
  emergencyPhoneExists: boolean = false;
  OperooStatus = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public storage: Storage, public events: Events, private http: HttpClient,
     private loadingCtrl: LoadingController, public global: GlobalProvider,
     private modalCtrl: ModalController, private toastCtrl: ToastController, public gFn:GlobalFunctionsProvider, public plt:Platform,public global_api:GlobalApiProvider) {
			plt.ready().then(()=>{
			  plt.registerBackButtonAction(()=>{
				  this.goBack();
			  });
			});
    
    this.storage.get('FunctionAccess').then((val)=>{
      this.FunctionAccess=val;
    })
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData=val;
      this.getOperooStatus();
    })

    this.playerID = navParams.get('playerID');

    this.getPlayerDetails();
    
  }

  getOperooStatus() {
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set('clubid', this.PersonData.CLUB_ID)          

      this.http.post(this.global.APIURL + "incidents/checkUsingOperoo", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          console.log('operoo status data', data)
          if(data && data.SUCCESS){
            // this.OperooStatus = 0;
            this.OperooStatus = data.USE_OPEROO;
          }
          resolve(true);
        }, error => {

        });
    })
  }

  getOperooData(playerData) {
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set('person_id', playerData.person_id)
        .set('club_id', this.PersonData.CLUB_ID)          

      this.http.post(this.global.APIURL + "users/getOperooProfile", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          resolve(data);
        }, error => {

        });
    })

  }

  getPlayerDetails() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.playerID);
    this.http.post<any>(this.global.APIURL + 'players/getPersonDetails', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
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


          this.getMedicalHistory().then((x) => {
            if(x){
              this.medicalReportGenerated = true;
            }
          });
        }
      }, error => {
        loading.dismiss();
      });
  }

  showToast(message, duration = 2000, position = "bottom") {
    duration = duration || 2000;
    position = position || "bottom";
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }

  showSMSModal() {
    this.active = 'sms';
    setTimeout(() => {
      this.active = '';
      if (this.phone.length == 0) {
        this.showToast('Phone number not set');
      } else {
        let smsModal = this.modalCtrl.create(
          'SmsModalPage',
          { phone: this.phone },
          {
            enableBackdropDismiss: true,
            showBackdrop: true
          }
        );
        smsModal.present();
      }
    }, 300);
  }

  showCallModal(emergency) {
    this.active = emergency ? 'emergencyPhone' : 'phone';
    setTimeout(() => {
      this.active = '';
      if ((!emergency && this.playerDetails[0].phone_mobile == 0) || (emergency && !this.emergencyPhoneExists)) {
        this.showToast('Phone number not found.');
      } else {
        this.phone = emergency ? '' : this.playerDetails[0].phone_mobile;
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
    }, 300);
  }

  showEmailModal() {
    this.active = 'email';
    setTimeout(() => {
      this.active = '';
      if (this.email.length == 0) {
        this.showToast('Email not set');
      } else {
        let emailModal = this.modalCtrl.create(
          'EmailModalPage',
          { email: this.email },
          {
            enableBackdropDismiss: true,
            showBackdrop: true
          }
        );
        emailModal.present();
      }
    }, 300);
  }

  coachingReport(){
    this.navCtrl.push('PlayerCoachingReportPage', {playerDetails: this.playerDetails});
  }

  getMedicalHistory() {
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('person_id', this.playerDetails[0]['person_id']);


      this.http.post(this.global.APIURL + "players/getMedicalHistoryDetails", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if (data.GETMEDICALHISTORYDETAILS) {
            var medicalHistoryDetails = this.events.publish('json:query', data.GETMEDICALHISTORYDETAILS)[0][0];
            this.playerDetails[0]['medical_history'] = medicalHistoryDetails;
          }
          resolve(true);
        }, error => {
          console.log(error);
          resolve(false);
        });


    });
  }

  medicalRecords(){    
      console.log('playerdetails', this.playerDetails,"this.OperooStatus",this.OperooStatus)
      if(this.OperooStatus == 1){
        this.playerDetails[0].operooEnabled = true;
        this.getOperooData(this.playerDetails[0]).then((data:any) => {
          console.log('operoodata',data);
          if(data && data.SUCCESS){
            this.playerDetails[0].operooData = data.OPEROOINFO;
            if (this.playerDetails[0]) {
              this.navCtrl.push('PlayerMedicalRecordsPage', {playerDetails: this.playerDetails});        
            }
            else {
              alert("No details found");
            }
          }
        })
      } else {
        if(this.medicalReportGenerated){
          this.playerDetails[0].operooEnabled = false;
          this.navCtrl.push('PlayerMedicalRecordsPage', {playerDetails: this.playerDetails});
        } else {          
            alert("Medical report generation in progress, please wait");
          }
        }
  }

  viewChat(){
    const chatInfo = {
      from : 1,
      to : 10,
      person_id : this.PersonData.PERSON_ID,
      group_id : "0",
      receiver_name : this.playerDetails[0].first_name,
      receiver_last_name : this.playerDetails[0].last_name,
      receiver_id : this.playerDetails[0].person_id,
      selectedTeam : this.PersonData.SELECTEDTEAM,
      teamid : this.PersonData.TEAM_ID,
      flag : 1,
      userPhoto: this.playerDetails[0].photoPath,
      accFirstName : this.PersonData.FIRST_NAME,
      accLastName : this.PersonData.LAST_NAME,
      isBlocked: 0,
      clientId :this.PersonData.CLIENT_ID
    };
    this.navCtrl.push('ChatViewPage',{data: chatInfo})
  }

  goBack() {
    this.navCtrl.setRoot(PlayersDashboardPage);
  }

}
