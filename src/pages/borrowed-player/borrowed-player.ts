import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ModalController,ToastController } from 'ionic-angular';
import { HttpClient,HttpParams} from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';


@IonicPage()
@Component({
  selector: 'page-borrowed-player',
  templateUrl: 'borrowed-player.html',
})
export class BorrowedPlayerPage {
  PersonData:any;
  BorrowedPlayerPresent:any='No Team Mates';
  PhotoApiUrl=this.global.PROFILEIMAGEURL;
  UpcomingSingleEvent:any;
  FunctionAccess:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,private storage: Storage,public global: GlobalProvider,
    public http: HttpClient,public statusBar: StatusBar,public gFn:GlobalFunctionsProvider,public modalCtrl:ModalController,public toastCtrl:ToastController,public global_api:GlobalApiProvider) {
      this.gFn.hideMenuIcon();
      this.statusBar.hide();
      this.storage.get('FunctionAccess').then((val) => {
        this.FunctionAccess = val;
      })

  }

  ionViewDidLoad() {
    
    if (this.navParams.get('UpcomingSingleEvent')) {
      this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'))
      
    }
    else{
      this.storage.get('UpcomingSingleEvent').then((val) => {
        this.UpcomingSingleEvent = JSON.parse(val)
        
      })

    }

    let loader = this.loadingCtrl.create({});
    loader.present();
    setTimeout(() => {
      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData=val
        this.getborrowList().then((x) => {
          if(x){
                  loader.dismiss();
              }
          });
      })
      }, 500);
  }

  ionViewDidLeave(){
    this.statusBar.show();
    this.gFn.showMenuIcon();
  }
  
  teamList(){
    this.navCtrl.push('TeamListPage',{UpcomingSingleEvent:JSON.stringify(this.UpcomingSingleEvent)});
  }
  backArrow(){
    this.navCtrl.pop();
    //this.navCtrl.push('EventDashboardPage');
  }
  getborrowList(){
    return new Promise((resolve) => {
    let PlayersData = new HttpParams()
          .set('event_id', this.UpcomingSingleEvent.event_id)
          .set('selectedTeam', this.PersonData.SELECTEDTEAM)
          .set('client_id',this.PersonData.CLIENT_ID)


        this.http.post(this.global.APIURL+"borrows/getBorrowedPlayers", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data:any) => {
          if(data.GETBORROWEDPLAYERS!=''){
            this.BorrowedPlayerPresent=data.GETBORROWEDPLAYERS;
            console.log("borrowed player",this.BorrowedPlayerPresent)
          }
          else{
            this.BorrowedPlayerPresent='No Team Mates'
          }

          resolve(true);
        }, error => {
        });
      })
  }
  DeleteborrowPlayer(rid){
    return new Promise((resolve) => {
    let PlayersData = new HttpParams()
          .set('borrow_id', rid)
          
        this.http.post(this.global.APIURL+"borrows/removeSingleBorrowedPlayer", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data:any) => {
          if(data.SUCCESS){
            this.getborrowList()
          }
          resolve(true);
        }, error => {
        });
      })
  }
  DisplaySeverityDetails(playerAilments){
    if(playerAilments){
      let SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
      SeverityModal.present();

    }
    else{
      this.presentToast('No Details found')
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
