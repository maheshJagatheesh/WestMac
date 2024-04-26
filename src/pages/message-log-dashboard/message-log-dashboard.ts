import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Events, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';


@IonicPage()
@Component({
  selector: 'page-message-log-dashboard',
  templateUrl: 'message-log-dashboard.html',
})
export class MessageLogDashboardPage {
  UpcomingSingleEvent: any;
  PersonData: any;
  FunctionAccess:any;
  setActivatedTeam:any;
  messageDetails:any=[];
  success:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App,public http: HttpClient,private storage: Storage,public global: GlobalProvider,public gFn:GlobalFunctionsProvider,public events:Events, public platform:Platform,public global_api:GlobalApiProvider) {

    this.platform.registerBackButtonAction(() => {
      this.app.getRootNav().getActiveChildNav().select(0);
    });
    gFn.showMenuIcon();
     
      this.storage.get('setActivatedTeam').then((val)=>{
        this.setActivatedTeam=JSON.parse(val)
        console.log(this.setActivatedTeam)
        this.storage.get('loggedInUserData').then((val) => {
          this.PersonData = val;
          this.storage.get('FunctionAccess').then((val)=>{
            this.FunctionAccess=val;
            this.getMessages().then((val)=>{
              if(val && this.messageDetails.length>0){

              }
              else if(val && this.messageDetails.length<=0){
                /* this.navCtrl.pop();
                this.gFn.presentToast("Data not Found"); */

              }
              else if(!val){
                this.gFn.presentAlert('Error',"Error getting while connecting to internet");
              }

            })
            // console.log(this.FunctionAccess)
          })
        })
      })
     
  }
  ionViewDidEnter(){
    this.gFn.showMenuIcon();
    // $('.tabs .tab-button[aria-selected=false]:nth-child(1)').attr('aria-selected', 'true')
    /* $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({
      'mask-image': 'url(../assets/images/menu/home-blue.svg)',
      'height': '32px',
      'color':'#43B7CC'
    }) */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageLogDashboardPage');
  }
  ionViewDidLeave(){
    // $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({
    //   'mask-image': 'url(../assets/images/menu/home.svg)',
    //   'height': '22px',
    //   'color':'#dedede'
    // })
  }
  backArrow(){
    this.gFn.gotoHome()
    // this.app.getRootNav().getActiveChildNav().select(0);
  }
  getMessages(){
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('reciever_id', (this.FunctionAccess.user_adminLevel==4)?this.PersonData.PERSON_ID:'')
        .set('sender_id', (this.FunctionAccess.user_adminLevel!=4)?this.PersonData.PERSON_ID:'')//this.PersonData.CLIENT_ID
        //.set('club_division_id', this.PersonData.SELECTEDTEAM)//this.PersonData.SELECTEDTEAM
       
      this.http.post(this.global.APIURL + "players/getGroupMessages", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.success=1
            let GroupMessage=(this.events.publish('json:query', data.GETGROUPMESSAGE))[0]
            for(var key in GroupMessage){
              this.messageDetails.push(GroupMessage[key])
            }
            console.log(this.messageDetails)
            resolve(true);
          }
          else{
            this.success=0;
            resolve(true);
          }
          
        }, error => {
          resolve(false);

        });
    })

  }
  goToChooseTeamsPage(){
    this.navCtrl.push('ChooseTeamProfilePage');
  }

}
