import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpParams, HttpClient } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the ChatGroupInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-group-info',
  templateUrl: 'chat-group-info.html',
})
export class ChatGroupInfoPage {
  groupInfo: any;
  teamName: any;
  divisionName: any;
  sportName: any;
  memberList: any;
  groupId: any;
  isMuteStatus: any = false;
  personId: any = '';
  ISMUTE: any;
  isMuteUnmuteStatus: any;
  public pepperoni:boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public gFn:GlobalFunctionsProvider,
    public global: GlobalProvider,public global_api: GlobalApiProvider) {
      this.groupId = navParams.get('group_Id');
      this.isMuteUnmuteStatus = navParams.get('isMuteStatus');
      
      if(this.isMuteUnmuteStatus == 1){
        this.isMuteStatus = true;
      }
      this.storage.get('loggedInUserData').then((val) => {
        this.personId = val.PERSON_ID;
        this.getGroupInfo();
      });
         
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad ChatGroupInfoPage');
  }

  getGroupInfo(){
       let chatData = new HttpParams()
       .set('groupId', this.groupId)
       .set('personId', this.personId);
       
      this.http.post<any>(this.global.APIURL+'messages/getChatGroupInfo', chatData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        this.teamName = response.GROUPINFO.TEAMS;
        this.divisionName = response.GROUPINFO.DIVISIONS;
        this.sportName = response.GROUPINFO.SPORTS;
        this.memberList = response.GROUPINFO.TOTALUSER;
        this.ISMUTE = response.GROUPINFO.ISMUTE;
        if(this.ISMUTE == 1){
          this.isMuteStatus = true;
        }

        let groupInfoDetails = response.GROUPINFO.USERLIST;
        console.log(groupInfoDetails);
        this.groupInfo = [];
          for(var key in groupInfoDetails){
            this.groupInfo.push(groupInfoDetails[key]);
          }
        if(response.SUCCESS){
         
        }
      }, error => {
       
      });
  }


  muteUnmuteFunction(dis_group_Id){
   //console.log(this.isMuteStatus);
    if(this.isMuteStatus == false){
      this.muteNotification(dis_group_Id);
    }else{
      this.unmuteNotification(dis_group_Id);
    }
  }
  
  muteNotification(dis_group_Id){
    //console.log(dis_group_Id);
    let alert = this.alertCtrl.create({
      title: 'Specify the reason',
      enableBackdropDismiss: false,
      inputs: [
        {
          type: 'radio',
          label: 'Mute for 8 hours',
          value: '8'
        },
        {
          type: 'radio',
          label: 'Mute for 1 day',
          value: '24'
        },
        {
          type: 'radio',
          label: 'Mute for 1 week',
          value: '168'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.goBack();
          }
        },
        {
          text: 'OK',
          handler: (muteTime:string='0') => {
              console.log('OK clicked: ' );
              //console.log(this.personId);

              let muteUnmuteChat = new HttpParams()
              .set('groupId', dis_group_Id)
              .set('muteHours', muteTime)
              .set('personeId', this.personId);
              let loading = this.loadingCtrl.create();
              loading.present();
              this.http.post<any>(this.global.APIURL+'messages/muteUnmuteChat', muteUnmuteChat,{headers:this.global_api.getHeader()})
              .subscribe(response => {
                loading.dismiss();
                if(response.SUCCESS){
                  this.isMuteStatus = true;
                  if(muteTime == '8'){
                    this.gFn.presentToast('Mute successful for ' + muteTime + ' hours.');
                  }else if(muteTime == '24'){
                    this.gFn.presentToast('Mute successful for one days.');
                  }else if(muteTime == '168'){
                    this.gFn.presentToast('Mute successful for one week.');
                  }
                  // this.goBack();
                  this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
                }else{
                  this.gFn.presentToast('Problem in mute notification.');
                }
              });
          }
        }
      ]
    });
    alert.present();
  }

  unmuteNotification(dis_group_Id){
    this.isMuteStatus = false;
    let muteUnmuteChat = new HttpParams()
    .set('groupId', dis_group_Id)
    .set('muteHours', '0')
    .set('personeId', this.personId);
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL+'messages/muteUnmuteChat', muteUnmuteChat,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      loading.dismiss();
      if(response.SUCCESS){
        this.gFn.presentToast('Notification unmute successfully.');
        //this.goBack();
        this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
      }else{
        this.gFn.presentToast('Problem in mute notification.');
      }
    });
  }
 

  goBack() {
    this.navCtrl.pop();
  }

}
