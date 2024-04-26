import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpClient,HttpParams} from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage({
  name: 'TeamListPage'
})
@Component({
  selector: 'page-team-list',
  templateUrl: 'team-list.html',
})
export class TeamListPage {
  LoggedInDataCred:any;
  TeamList:any;
  UpcomingSingleEvent:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,private storage: Storage,public global: GlobalProvider,
    public http: HttpClient,public statusBar: StatusBar, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
      this.gFn.hideMenuIcon();
      let loader = this.loadingCtrl.create({});
    loader.present();
    setTimeout(() => {

      this.getTeamList().then((x) => {
          if(x){
                  loader.dismiss();

              }
          else{
            this.navCtrl.pop();
          }
          });
          

      }, 1200);

  }

  ionViewDidLoad() {
    this.statusBar.hide();
    if (this.navParams.get('UpcomingSingleEvent')) {
      this.UpcomingSingleEvent = JSON.parse(this.navParams.get('UpcomingSingleEvent'))
      
    }
    else{
      this.storage.get('UpcomingSingleEvent').then((val) => {
        this.UpcomingSingleEvent = JSON.parse(val)
        
      })
    }

  }
  ionViewDidLeave(){
    this.statusBar.show();
  }
  getTeamList(){
    return new Promise((resolve) => {
    this.storage.get('loggedInUserData').then((val) => {
      this.LoggedInDataCred=val;

        let teamData = new HttpParams()
          // .set('person_id', this.LoggedInDataCred.PERSON_ID)
          .set('selectedTeam', this.LoggedInDataCred.SELECTEDTEAM);

        // this.http.post(this.global.APIURL+"teams/getAllTeams", teamData)
        this.http.post(this.global.APIURL+"teams/getAllBorrowedTeams", teamData,{headers:this.global_api.getHeader()})
        .subscribe((data:any) => {
          if(data.SUCCESS){
            this.TeamList=data.GETALLBORROWEDTEAMS;

            resolve(true);

          }
          else{
            resolve(false);
          }
          

        }, error => {
          resolve(false);
        });
      })

    })


  }
  backArrow(){
    this.navCtrl.pop();
  }
  choosePlayer(TeamData,event){
    $(event.target).closest('.well').addClass('active')
    this.navCtrl.push('ChoosePlayersPage',{TeamData:TeamData,UpcomingSingleEvent:JSON.stringify(this.UpcomingSingleEvent)}).then(()=>{
      $(event.target).closest('.well').removeClass('active')
    });
  }

}
