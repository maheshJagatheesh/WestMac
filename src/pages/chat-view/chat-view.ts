import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Content, ToastController, App, Platform,AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { HttpClient, HttpParams } from '@angular/common/http'
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
 * Generated class for the ChatViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-view',
  templateUrl: 'chat-view.html',
})
export class ChatViewPage {

  data: any;
  chatMessages: any= [];
  profilePic: any;
  name: any;
  receiver_last_name: any;
  accFirstName: any;
  accLastName: any;
  randomNumber: any;
  checkPageRedirect: any;
  @ViewChild(Content) content: Content;
  sub: any;
  checkInterval: any;
  messageSend: boolean = false;
  chatMessagesLength: number = 0;
  isScroll: boolean = false;
  AppName: any;
  viewMuteUnmute: any = '';
  isBlocked: any = 0;

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
  ) {
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
    this.profilePic = this.data.userPhoto;
    this.name = this.data.receiver_name;
    this.receiver_last_name = this.data.receiver_last_name;
    this.accFirstName = this.data.accFirstName;
    this.accLastName = this.data.accLastName;
    //this.isBlocked = this.data.isBlocked;
    this.checkPageRedirect = true;
    this.isScroll = false;

    let chatData = new HttpParams()
      .set('person_id', this.data.person_id)
      .set('sender_name', this.data.accFirstName)
      .set('group_id', this.data.group_id)
      .set('receiver_name', this.data.receiver_name)
      .set('receiver_id', this.data.receiver_id);
    let loading = this.loadingCtrl.create();
    if(checkIntervalLoding == false){
      loading.present();
    }
    this.http.post<any>(this.global.APIURL + 'messages/getSingleChatMsg', chatData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        if(checkIntervalLoding == false){
          setTimeout(() => {
            loading.dismiss();
          }, 500);
        }
        if (response.SUCCESS) {
          if(this.chatMessagesLength != response.GETSINGLECHATMSG.length){
            this.isScroll = true;
            this.chatMessagesLength = response.GETSINGLECHATMSG.length;
            this.chatMessages = [];
            let chatMessages = response.GETSINGLECHATMSG;
            for (var key in chatMessages) {
              this.chatMessages.push(chatMessages[key]);
            }
          }else{
            let chatMessages = response.GETSINGLECHATMSG;
            for (var key in chatMessages) {
              this.chatMessages[key].unread = chatMessages[key].unread;
            }
          }
          this.viewMuteUnmute = response.ISMUTE;
          this.isBlocked = response.ISBLOCK;
        }
      }, error => {
        if(checkIntervalLoding == false){
          loading.dismiss();
        }
      });
  }

  ionViewDidEnter() {
    this.gFn.hideFormAccessoryBar(true);

    this.appVersion.getAppName().then(Appname=>{
      this.AppName=Appname;
    })

    this.sub = Observable.interval(3000).subscribe((val) => { 
      this.checkInterval = true;
      this.viewDefaultData(this.checkInterval);
    });
  }

  ionViewWillLeave() {
    this.sub.unsubscribe();
    this.gFn.showMenuIcon();
  }

  goBack() {
    this.navCtrl.pop();
    //this.navCtrl.push('ChatDashboardPage');
    //this.app.getActiveNav().push(ChatDashboardPage);
  }

  goToChooseTeamsPage() {
    this.navCtrl.push('ChooseTeamProfilePage').then(()=>{
      $('.tabs .tab-button[aria-selected=true]:nth-child(4)').attr('aria-selected','false');
    });
  }

  sendMessage(event) {
    if (event.key != "Enter") {
      let message: any = $("#messageContent").val();
      $("#messageContent").val('').focus();
      if(message.trim().length > 0) {
        let msgData = new HttpParams()
          .set('msg_type', '0')
          .set('person_id', this.data.person_id)
          .set('group_id', this.data.group_id)
          .set('team_id', this.data.teamid)
          .set('selectedTeam', this.data.selectedTeam)
          .set('group_type', '0')
          .set('first_name', this.accFirstName)
          .set('last_name', this.accLastName)
          .set('message', message)
          .set('client_id', this.data.clientId)
          .set('urlified_message', '')
          .set('image_value', '')
          .set('player_ids',JSON.stringify([this.data.receiver_id]))
          .set('appName', this.AppName);


        this.http.post<any>(this.global.APIURL + 'messages/sendChat', msgData,{headers:this.global_api.getHeader()})
          .subscribe(response => {
            if (response.SUCCESS) {
              $("#messageContent").val('');
              //this.chatMessages.length = 0;
              let chatData = new HttpParams()
                .set('person_id', this.data.person_id)
                .set('sender_name', this.data.accFirstName)
                .set('group_id', this.data.group_id)
                .set('receiver_name', this.data.receiver_name)
                .set('receiver_id', this.data.receiver_id);
              /* let loading = this.loadingCtrl.create();
              loading.present(); */
              this.http.post<any>(this.global.APIURL + 'messages/getSingleChatMsg', chatData,{headers:this.global_api.getHeader()})
                .subscribe(response => {
                  //loading.dismiss();
                  if (response.SUCCESS) {
                    if(this.chatMessagesLength != response.GETSINGLECHATMSG.length){
                      this.isScroll = true;
                      this.chatMessagesLength = response.GETSINGLECHATMSG.length;
                      this.messageSend = true;
                      let chatMessages = response.GETSINGLECHATMSG;
                      for (var key in chatMessages) {
                        this.chatMessages.push(chatMessages[chatMessages.length-1]);
                        break;
                      }
                    }
                    this.viewMuteUnmute = response.ISMUTE;
                  }
                }, error => {
                  //loading.dismiss();
                });
            }
          }, error => {
          });
      /*}else{
        this.presentToast("Can't send blank message");
      }*/
    }
  }else if(event.key === "Enter"){
     // $("#messageContent").val() + "<br>*";
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

  sendPhoto() {
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
      .set('group_id', this.data.group_id)
      .set('team_id', this.data.teamid)
      .set('selectedTeam', this.data.selectedTeam)
      .set('group_type', '0')
      .set('first_name', this.accFirstName)
      .set('last_name', this.accLastName)
      .set('message', '')
      .set('client_id', this.data.clientId)
      .set('urlified_message', '')
      .set('image_value', image)
      .set('player_ids',JSON.stringify([this.data.receiver_id]))
      .set('appName', this.AppName);
    this.http.post<any>(this.global.APIURL + 'messages/sendChat', msgData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        $("#messageContent").val('');
        let chatData = new HttpParams()
          .set('person_id', this.data.person_id)
          .set('sender_name', this.data.accFirstName)
          .set('group_id', this.data.group_id)
          .set('receiver_name', this.data.receiver_name)
          .set('receiver_id', this.data.receiver_id);
        let loading2 = this.loadingCtrl.create();
        loading2.present();
        this.http.post<any>(this.global.APIURL + 'messages/getSingleChatMsg', chatData,{headers:this.global_api.getHeader()})
          .subscribe(response => {
            loading2.dismiss();
            if (response.SUCCESS) {
              if(this.chatMessagesLength != response.GETSINGLECHATMSG.length){
                this.isScroll = true;
                this.chatMessagesLength = response.GETSINGLECHATMSG.length;
                this.messageSend = true;
                let chatMessages = response.GETSINGLECHATMSG;
                for (var key in chatMessages) {
                  this.chatMessages.push(chatMessages[chatMessages.length-1]);
                  break;
                }
              }
              this.viewMuteUnmute = response.ISMUTE;
            }
          }, error => {
            loading2.dismiss();
          });
      }, error => {
        loading.dismiss();
      });
  }

  gototillBottom() {
    this.content.scrollToBottom(0);
    if(this.messageSend){
      $('#messageContent').focus();
    }
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  muteNotification(){
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
             let muteUnmuteChat = new HttpParams()
            .set('groupId', '0')
            .set('muteHours', muteTime)
            .set('personeId', this.data.person_id)
            .set('senderPersoneId', this.data.receiver_id);
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

  unmuteNotification(){
    let muteUnmuteChat = new HttpParams()
    .set('groupId', '0')
    .set('muteHours', '0')
    .set('personeId', this.data.person_id)
    .set('senderPersoneId', this.data.receiver_id);
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

  blockUnblockSingleChat(block){
    let blockChat = new HttpParams()
    .set('isBlock', block)
    .set('selectedTeam', this.data.selectedTeam)
    .set('personeId', this.data.receiver_id)
    .set('senderPersoneId', this.data.person_id);
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL+'messages/blockUnblockSingleChat', blockChat,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      loading.dismiss();
      let msg;
      if(response.SUCCESS && response.BLOCKUNBLOCK){
        msg = block? 'Blocked successfully': 'Unblocked successfully';
        this.gFn.presentToast(msg);
        this.goBack();
      }else{
        msg = block? 'Problem in block': 'Problem in unblock';
        this.gFn.presentToast(msg);
      }
    }, error => {
      loading.dismiss();
    });
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
