import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-event-group-message-text',
  templateUrl: 'event-group-message-text.html',
})
export class EventGroupMessageTextPage {
  message:any='';
  PersonData:any;
  State:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public global: GlobalProvider,public http: HttpClient,private storage: Storage,public global_api:GlobalApiProvider) {
  }

  ionViewDidLoad() {
    this.State=this.navParams.get('state')
    // console.log(this.State)
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val;
      // console.log(this.PersonData)
    })
    //console.log('ionViewDidLoad EventGroupMessageTextPage');
  }
  send(){
    let Data = new HttpParams()
    .set('message',this.message)
    .set('player_ids',JSON.stringify([]))
    .set('msg_type','0')
    .set('group_id','0')
    .set('team_id',this.PersonData.TEAM_ID)
    .set('group_type','0')
    .set('client_id',this.PersonData.CLIENT_ID)
    .set('person_id',this.PersonData.PERSON_ID)
    .set('selectedTeam',this.PersonData.SELECTEDTEAM)
    .set('urlified_message','')
    .set('image_value','')
    .set('first_name',this.PersonData.FIRST_NAME)
    .set('last_name',this.PersonData.LAST_NAME)
    .set('event_id',this.PersonData.EVENT_ID)
    .set('state',this.State)
    
    this.http.post(this.global.APIURL + "messages/sendChat", Data,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if(data.SUCCESS==true){
          this.navCtrl.pop();
        }
        else{
          alert("Message not sent")
        }
      }, error => {
        
      });
    this.navCtrl.pop();

  }

}
