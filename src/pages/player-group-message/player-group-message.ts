import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Events, LoadingController, ToastController} from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the PlayerGroupMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-group-message',
  templateUrl: 'player-group-message.html',
})
export class PlayerGroupMessagePage{
  private loggedInUserData: any;
  private players: any[] = [];
  private groups: any[] = [];
  private showGroups: boolean = false;
  private message: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private events: Events, private http: HttpClient, private loadingCtrl: LoadingController, public global: GlobalProvider, private toastCtrl: ToastController, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
    
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.loadPlayers();
      this.loadGroups();
    });
  }

  loadPlayers() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('club_division_id', this.loggedInUserData.SELECTEDTEAM)
      .set('client_id', this.loggedInUserData.CLIENT_ID);
    this.http.post<any>(this.global.APIURL + 'players/getTeamPlayers', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          let players = this.events.publish('json:query', response.GETTEAMPLAYERS);
          players = players[0];
          for (var key in players) {
            this.players.push(players[key]);
          }
        }
      }, error => {
        loading.dismiss();
      });
  }

  loadGroups() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM);
    this.http.post<any>(this.global.APIURL+'messages/getChatGroupsName', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if(response.SUCCESS){
          let groups = response.GETCHATGROUPS;
          for(var key in groups){
            this.groups.push(groups[key]);
          }
        }
      }, error => {
        loading.dismiss();
      });
  }

  goBack() {
    this.navCtrl.pop();
  }

  setSendOption(){
    if($('#sendToAll').is(':checked')){
      this.showGroups = false;
      $('.groupIDs').prop('checked', false);
      setTimeout(() => {
        if ($('#sendToAll').is(':checked')) {
          $('.playerIDs').prop('checked', true);
        } else {
          $('.playerIDs').prop('checked', false);
        }
      }, 100);
    }else{
      $('.playerIDs, .groupIDs').prop('checked', false);
      if($('#sendToGroup').is(':checked')){
        this.showGroups = true;
      }else{
        this.showGroups = false;
      }
    }
  }

  sendMessage(){
    let groupIDs = [];
    let groupTypes = [];
    let playerIDs = [];
    let restPath = 'messages/sendChat';
    if(this.showGroups){
      restPath = 'messages/sendMultipleGroupChat';
      $('.groupIDs:checked').each( function(){
        groupIDs.push($(this).val());
        groupTypes.push($(this).attr('data-type'));
      });
    }else{
      $('.playerIDs:checked').each( function(){
        playerIDs.push($(this).val());
      });
    }
    if((this.showGroups && groupIDs.length > 0) || (!this.showGroups && playerIDs.length > 0)) {
      if (this.message.length > 0) {
        let loading = this.loadingCtrl.create();
        loading.present();
        let formData = {
          'msg_type': '0',
          'person_id': this.loggedInUserData.PERSON_ID,
          'team_id': this.loggedInUserData.SELECTEDTEAM,
          'selectedTeam': this.loggedInUserData.SELECTEDTEAM,
          'first_name': this.loggedInUserData.FIRST_NAME,
          'last_name': this.loggedInUserData.LAST_NAME,
          'message': this.message,
          'client_id': this.loggedInUserData.CLIENT_ID,
          'urlified_message': '',
          'image_value': ''
        };
        if(this.showGroups){
          formData = Object.assign(formData, {'group_ids': JSON.stringify(groupIDs), 'group_types': JSON.stringify(groupTypes)});
        }else{
          formData = Object.assign(formData, {'group_id': '0', 'group_type': '0', 'player_ids': JSON.stringify(playerIDs)});
        }
        let msgData = new HttpParams({ fromObject: formData });
         this.http.post<any>(this.global.APIURL + restPath, msgData,{headers:this.global_api.getHeader()})
         .subscribe(response => {
           loading.dismiss();
           if (response.SUCCESS) {
             this.presentToast("Message send successfully");
           }else{
             this.presentToast("Error in message send");
           }
         },
         error => {
           loading.dismiss();
           this.presentToast("Error in message send");
         });
      } else {
        this.presentToast("Can't send blank message");
      }
    } else {
      let msg = (this.showGroups)? 'No group selected' : 'No player selected';
      this.presentToast(msg);
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

}
