import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,Content, App, Platform, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { HttpClient, HttpParams } from'@angular/common/http'
import * as $ from 'jquery';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ViewChild } from '@angular/core'

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { ChatDashboardPage } from '../chat-dashboard/chat-dashboard';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { Storage } from '@ionic/storage'
import { Camera } from '@ionic-native/camera/ngx';
/**
 * Generated class for the GroupChatViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-chat-view',
  templateUrl: 'group-chat-view.html',
})
export class GroupChatViewPage{
  data:any;
  chatMessages:any[] = [];
  profilePic:any;
  name:any;
  accFirstName:any;
  accLastName:any;
  randomNumber:any;
  imageFallback:any;
  checkPageRedirect: any;
  @ViewChild(Content) content: Content;
  sub: any;
  checkInterval: any;
  messageSend: boolean = false;
  chatMessagesLength: number = 0;
  isScroll: boolean = false;
  AppName: any = '';
  groupContactId: any = '';
  viewMuteUnmute: any = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private toastCtrl: ToastController, 
    public gFn:GlobalFunctionsProvider,
    public app:App,
    public platform: Platform,
    private appVersion: AppVersion,
    private alertCtrl: AlertController,
    private storage:Storage,
    private plt:Platform,
    private modalCtrl: ModalController,
    public global_api:GlobalApiProvider,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
  )
    {
      plt.ready().then(()=>{
        plt.registerBackButtonAction(()=>{
          this.goBack();
        });
      });
      this.gFn.hideMenuIcon();
      this.gFn.hideFormAccessoryBar(true);
      this.checkInterval = false;
      this.viewDefaultData(this.checkInterval);
      this.storage.get('loggedInUserData').then((val) => {
        global_api.getUnreadMessageCount(val);
      });
  }

  viewDefaultData(checkIntervalLoding){
    this.messageSend = false;
    this.data = this.navParams.get('data');
    this.imageFallback = this.global.MESSAGEFALLBACKIMAGE;
    this.name = this.data.userNmae;
    this.accFirstName = this.data.accFirstName;
    this.accLastName = this.data.accLastName;
    this.checkPageRedirect = true;
    this.isScroll = false;
    this.groupContactId = this.data.groupContactId;

    let chatData = new HttpParams()
      .set('person_id', this.data.person_id)
      .set('selectedTeam', this.data.selectedTeam)
      .set('group_id', this.data.groupid)
      .set('team_id', this.data.teamid)
      .set('group_type', this.data.grouptype)
      .set('from', this.data.from)
      .set('to', this.data.to)
      .set('flag', this.data.flag);
    let loading = this.loadingCtrl.create();
    if(checkIntervalLoding == false){
      loading.present();
    }
    this.http.post<any>(this.global.APIURL+'messages/getTeamChatMsgs', chatData,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      //loading.dismiss();
      if(response.SUCCESS){
        if(this.chatMessagesLength != response.GETTEAMCHATMSGS.length){
          this.isScroll = true;
          this.chatMessagesLength = response.GETTEAMCHATMSGS.length;
          this.chatMessages = [];
          let chatMessages = response.GETTEAMCHATMSGS;
          for(var key in chatMessages){
            this.chatMessages.push(chatMessages[key]);
          }
          this.viewMuteUnmute = response.ISMUTE;
        }
        //console.log(this.chatMessages);
        if(checkIntervalLoding == false){
          setTimeout(function(){
            loading.dismiss();
          }, 1000);
        }
      }
    }, error => {
      if(checkIntervalLoding == false){
        loading.dismiss();
        //console.log(error);
      }
    });
  }

  ionViewDidEnter() {
    this.gFn.hideMenuIcon();
    this.gFn.hideFormAccessoryBar(true);
    this.appVersion.getAppName().then(Appname=>{
      this.AppName=Appname;
    });
    if(typeof this.sub != 'undefined'){
      this.sub.unsubscribe();
    }
    this.sub = Observable.interval(3000).subscribe((val) => { 
      this.checkInterval = true;
      this.viewDefaultData(this.checkInterval);
    });
  }

  ionViewWillLeave() {
    if(typeof this.sub != 'undefined'){
      this.sub.unsubscribe();
    }
    this.gFn.showMenuIcon();
  }

  goBack(){
    this.app.getRootNav().getActiveChildNav().select(3);
  }

  goToChooseTeamsPage() {
    this.navCtrl.push('ChooseTeamProfilePage').then(()=>{
      $('.tabs .tab-button[aria-selected=true]:nth-child(4)').attr('aria-selected','false');
    });
  }

  sendMessage(event) {
    if (event.key != "Enter") {
      let message:any = $("#messageContent").val();
      $("#messageContent").val('').focus();
      if(message.trim().length > 0) {
        /* let loading = this.loadingCtrl.create();
        loading.present(); */
        let msgData = new HttpParams()
          .set('msg_type', '0')
          .set('person_id', this.data.person_id)
          .set('group_id', this.data.groupid)
          .set('team_id', this.data.teamid)
          .set('selectedTeam', this.data.selectedTeam)
          .set('group_type', this.data.grouptype)
          .set('first_name', this.accFirstName)
          .set('last_name', this.accLastName)
          .set('message', message)
          .set('client_id', this.data.clientId)
          .set('urlified_message', '')
          .set('player_ids', JSON.stringify([]))
          .set('image_value', '')
          .set('appName', this.AppName);
        this.http.post<any>(this.global.APIURL + 'messages/sendChat', msgData,{headers:this.global_api.getHeader()})
          .subscribe(response => {
            if (response.SUCCESS) {
              $("#messageContent").val('');
              let chatData = new HttpParams()
                .set('person_id', this.data.person_id)
                .set('selectedTeam', this.data.selectedTeam)
                .set('group_id', this.data.groupid)
                .set('team_id', this.data.teamid)
                .set('group_type', this.data.grouptype)
                .set('from', this.data.from)
                .set('to', this.data.to)
                .set('flag', this.data.flag);
              this.http.post<any>(this.global.APIURL + 'messages/getTeamChatMsgs', chatData,{headers:this.global_api.getHeader()})
                .subscribe(response => {
                  if (response.SUCCESS) {
                    this.messageSend = true;
                    if(this.chatMessagesLength != response.GETTEAMCHATMSGS.length){
                      this.isScroll = true;
                      this.chatMessagesLength = response.GETTEAMCHATMSGS.length;
                      let chatMessages = response.GETTEAMCHATMSGS;
                      for (var key in chatMessages) {
                        this.chatMessages.push(chatMessages[chatMessages.length - 1]);
                        break;
                      }
                    }
                    this.viewMuteUnmute = response.ISMUTE;
                    //loading.dismiss();
                  }
                }, error => {
                  //loading.dismiss();
                  //console.log(error);
                });
            }
          }, error => {

            //console.log(error);
          });
     /* }else{
        this.presentToast("Can't send blank message");
      }*/
      }
    }else if(event.key === "Enter"){
      //$("#messageContent").val() + "<br>*";
    }
  }


  settingGroupIcon(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'From Gallery',
          icon: 'cloud-upload',
          handler: () => {
            this.sendPhoto();
          }
        },
        {
          text: 'From Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close-circle',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    console.log("options sourceType :- ",sourceType);
    var options = {
      quality: 20,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      // console.log("direct base64 imagePath :--",imagePath);
      var image = 'data:image/jpeg;base64,' + imagePath;
      // console.log("image in base64",image);
      this.uploadPhoto(encodeURIComponent(imagePath));
    }, (err) => {
      this.presentToast(err);
    });
  }

  sendPhoto(){
    let options = {
      maximumImagesCount: 1,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        this.uploadPhoto(encodeURIComponent(results[i]));
      }
    }, (err) => { });
  }
  uploadPhoto(image) {
    this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
    let loading = this.loadingCtrl.create();
    loading.present();
    let msgData = new HttpParams()
        .set('msg_type', '1')
        .set('person_id', this.data.person_id)
        .set('group_id', this.data.groupid)
        .set('team_id', this.data.teamid)
        .set('selectedTeam', this.data.selectedTeam)
        .set('group_type', this.data.grouptype)
        .set('first_name', this.accFirstName)
        .set('last_name', this.accLastName)
        .set('message', '')
        .set('client_id', this.data.clientId)
        .set('urlified_message', '')
        .set('image_value', image)
        .set('player_ids',JSON.stringify([]))
        .set('appName', this.AppName);
    this.http.post<any>(this.global.APIURL + 'messages/sendChat', msgData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        console.log(response);
        if(response.SUCCESS){
          $("#messageContent").val('');
          let chatData = new HttpParams()
            .set('person_id', this.data.person_id)
            .set('selectedTeam', this.data.selectedTeam)
            .set('group_id', this.data.groupid)
            .set('team_id', this.data.teamid)
            .set('group_type', this.data.grouptype)
            .set('from', this.data.from)
            .set('to', this.data.to)
            .set('flag', this.data.flag);
          let loading = this.loadingCtrl.create();
          loading.present();
          this.http.post<any>(this.global.APIURL+'messages/getTeamChatMsgs', chatData,{headers:this.global_api.getHeader()})
          .subscribe(response => {
            //loading.dismiss();
            if(response.SUCCESS){
              this.messageSend = true;
              if(this.chatMessagesLength != response.GETTEAMCHATMSGS.length){
                this.isScroll = true;
                this.chatMessagesLength = response.GETTEAMCHATMSGS.length;
                let chatMessages = response.GETTEAMCHATMSGS;
                for(var key in chatMessages){
                  this.chatMessages.push(chatMessages[chatMessages.length-1]);
                  break;
                }
              }
              this.viewMuteUnmute = response.ISMUTE;
              setTimeout(function(){
                loading.dismiss();
              }, 1000);
              //console.log(this.chatMessages);
            }
          }, error => {
            loading.dismiss();
            //console.log(error);
          });
          console.log('success');
        }else{
          alert('Sorry, image upload error.');
        }
      }, error => {

      });
  }
  onImageError(){
    console.log("hahahahahaha");
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  gototillBottom() {
    this.content.scrollToBottom(0);
    if(this.messageSend){
      $('#messageContent').focus();
    }
  }

  leaveDiscussion(dis_group_Id,groupContactId){
    let leaveDiscussion = new HttpParams()
    .set('groupContactId', groupContactId)
    .set('client_id', this.data.clientId)
    .set('selectedTeam', this.data.selectedTeam)
    .set('group_id', dis_group_Id)
    .set('team_id', this.data.selectedTeam)
    .set('player_ids', JSON.stringify([]));

    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL+'messages/removePlayerFromGroup', leaveDiscussion,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      loading.dismiss();
      if(response.SUCCESS){
        this.gFn.presentToast('Group leave successful.');
        this.navCtrl.pop();
      }else{
        this.gFn.presentToast('Problem in group Leave.');
      }
    });
  }

  muteNotification(dis_group_Id){
    let alert = this.alertCtrl.create({
      title: 'Specify the reason',
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
          }
        },
        {
          text: 'OK',
          handler: (muteTime:string) => {
              console.log('OK clicked: ' );
              console.log(this.data.person_id);

              let muteUnmuteChat = new HttpParams()
              .set('groupId', dis_group_Id)
              .set('muteHours', muteTime)
              .set('personeId', this.data.person_id);
              let loading = this.loadingCtrl.create();
              loading.present();
              this.http.post<any>(this.global.APIURL+'messages/muteUnmuteChat', muteUnmuteChat,{headers:this.global_api.getHeader()})
              .subscribe(response => {
                loading.dismiss();
                if(response.SUCCESS){
                  if(muteTime == '8'){
                    this.gFn.presentToast('Mute successful for ' + muteTime + ' hours.');
                  }else if(muteTime == '24'){
                    this.gFn.presentToast('Mute successful for one days.');
                  }else if(muteTime == '168'){
                    this.gFn.presentToast('Mute successful for one week.');
                  }
                  this.goBack();
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
    let muteUnmuteChat = new HttpParams()
    .set('groupId', dis_group_Id)
    .set('muteHours', '0')
    .set('personeId', this.data.person_id);
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL+'messages/muteUnmuteChat', muteUnmuteChat,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      loading.dismiss();
      if(response.SUCCESS){
        this.gFn.presentToast('Notification unmute successfully.');
        this.goBack();
      }else{
        this.gFn.presentToast('Problem in mute notification.');
      }
    });
  }

  groupInfo(group_Id){
    console.log(group_Id);
    this.navCtrl.push('ChatGroupInfoPage',{group_Id:group_Id,isMuteStatus:this.viewMuteUnmute});
  }

  viewImage(image){
    let imageModal = this.modalCtrl.create('ChatViewImagePage', {image:image});
    imageModal.present();
    imageModal.onDidDismiss(data => {
      this.plt.ready().then(()=>{
        this.plt.registerBackButtonAction(()=>{
          this.goBack();
        });
      });
    });
  }

}
