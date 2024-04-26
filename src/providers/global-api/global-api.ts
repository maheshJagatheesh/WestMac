import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import {App, ToastController, NavController, Events} from "ionic-angular";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Injectable()
export class GlobalApiProvider {
  unreadCounter: any;
  SSODetails: any={};
  loginUserToken:any;
  private loggedInUserData: any;
  private FunctionAccess: any;
  isLogoutData: any =true;
  backgroundURL:any;
  public splash:any;
  alrtCounter: any;
  constructor(public http: HttpClient,public global:GlobalProvider,public toastCtrl:ToastController, public storage: Storage,private app :App, public events:Events) {
    console.log('Hello GlobalApiProvider Provider');
    
    this.storage.get('token').then(val=>{
      this.loginUserToken =  val;
    })
    
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      
    });
    this.storage.get('FunctionAccess').then((val)=>{
      this.FunctionAccess=val;
    });
  }
  getHeader(){
    this.storage.set("token",this.loginUserToken);
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': this.loginUserToken,
      'X-Requested-With': this.global.App_id});
      return headers;
  }
  
  getUpcomingEvent(PersonData){
    let PlayersData = new HttpParams()
            .set('filter', '1')
            .set('clientTimeZone', PersonData.CLIENTTIMEZONE)
            .set('selectedTeam', PersonData.SELECTEDTEAM)
            .set('person_id', PersonData.PERSON_ID)
            .set('client_id',PersonData.CLIENT_ID)
            .set('SEASON_ID', PersonData.SEASON_ID);

          return this.http.post(this.global.APIURL+"events/getTeamEventsByMonthGroup", PlayersData,{headers:this.getHeader()})
          
  }

  getTimesheetDashboardEvents(PersonData){
    let data=new HttpParams()
      .set('clientTimeZone', PersonData.CLIENTTIMEZONE)
      .set('selectedTeam', PersonData.SELECTEDTEAM)
      .set('person_id', PersonData.PERSON_ID)
      .set('client_id',PersonData.CLIENT_ID)
      .set('SEASON_ID', PersonData.SEASON_ID);
      return this.http.post(this.global.APIURL+"events/getTeamEventsByMonthGroupUPCons", data,{headers:this.getHeader()})

  }
  getTimesheetEvents(PersonData){
    let data=new HttpParams()
      .set('clientTimeZone', PersonData.CLIENTTIMEZONE)
      .set('selectedTeam', PersonData.SELECTEDTEAM)
      .set('person_id', PersonData.PERSON_ID)
      .set('client_id',PersonData.CLIENT_ID)
      .set('SEASON_ID', PersonData.SEASON_ID)
      .set('app_name',this.global.App_id);
      return this.http.post(this.global.APIURL+"events/getTeamEventsByMonthGroupUPCons2", data,{headers:this.getHeader()})

  }
  getTimesheetDashboardEventsPerson(PersonData){
    let data=new HttpParams()
      .set('clientTimeZone', PersonData.CLIENTTIMEZONE)
      .set('selectedTeam', PersonData.SELECTEDTEAM)
      .set('person_id', PersonData.PERSON_ID)
      .set('client_id',PersonData.CLIENT_ID)
      .set('SEASON_ID', PersonData.SEASON_ID);
      return this.http.post(this.global.APIURL+"events/getTeamEventsByMonthGroupUPPerson2", data,{headers:this.getHeader()})

  }

  getUnreadMessageCount(PersonData){
    //$('.tab-button:nth-child(4)').removeClass('has-badge');
    this.storage.get('loggedInUserData').then((val) => {
      if(typeof val.CHATCOUNTER != 'undefined'){
        this.showChatCounter(val.CHATCOUNTER);
      }
    });

    this.storage.get('isLogout').then(value=>{
    })
    let data = new HttpParams()
      .set('personId', PersonData.PERSON_ID);
    if(typeof this.unreadCounter != 'undefined'){
      this.unreadCounter.unsubscribe();
    }
    this.unreadCounter = Observable.interval(5000).subscribe((val) => {
      this.http.post<any>(this.global.APIURL+'messages/countUnreadMessage', data,{headers:this.getHeader()})
      .subscribe(response => {
        if(response.SUCCESS){
          let counter = parseInt(response.UNREADCOUNT);
          this.storage.set('count',counter);
          PersonData.CHATCOUNTER = counter;
          this.storage.set('loggedInUserData', PersonData);
          this.showChatCounter(counter);
        }else{
          console.log("session expired");
          this.logout();
        }
      }, error => {
        console.log("expired"); 
        // this.logout();
       });
    });
  }

  getAlrtMessageCount() {

    console.log("this.FunctionAccess",this.FunctionAccess)
    console.log("this.loggedInUserData",this.loggedInUserData)
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('reciever_id', (this.FunctionAccess && this.FunctionAccess.user_adminLevel == 4) ? this.loggedInUserData.PERSON_ID : '')
        .set('sender_id', (this.FunctionAccess && this.FunctionAccess.user_adminLevel != 4) ? this.loggedInUserData.PERSON_ID : '');
  
      if (typeof this.alrtCounter !== 'undefined') {
        this.alrtCounter.unsubscribe();
      }
  
      this.alrtCounter = Observable.interval(5000).subscribe((val) => {
        this.http.post(this.global.APIURL + "players/getGroupMessages", PlayersData, { headers: this.getHeader() })
          .subscribe((data: any) => {
            if (data.SUCCESS) {
              let counter = data.GETGROUPMESSAGE.DATA.length;
              if(this.loggedInUserData && this.loggedInUserData.ALERTCOUNTER )
              {
                this.loggedInUserData.this.loggedInUserData.ALERTCOUNTER = counter;

              }
              this.storage.set('loggedInUserData', this.loggedInUserData);
              this.showAlertCounter(counter);
              resolve(true);
            } else {
              resolve(true);
            }
          }, error => {
            resolve(false);
          });
      });
    });
  }

  // getAlrtMessageCountf(PersonData){
  //   this.storage.get('isLogout').then(value=>{
  //   })
  //   let data = new HttpParams()
  //     .set('personId', PersonData.PERSON_ID);
  //     if(typeof this.alrtCounter != 'undefined'){
  //       this.alrtCounter.unsubscribe();
  //     }
  //   this.alrtCounter = Observable.interval(5000).subscribe((val) => {
  //     // replace it with alert api
  //     this.http.post<any>(this.global.APIURL+'messages/countaler', data,{headers:this.getHeader()})
  //     .subscribe(response => {
  //       if(response.SUCCESS){
  //          let counter = parseInt(response.UNREADCOUNT);
  //         // this.storage.set('count',counter);
  //         // PersonData.CHATCOUNTER = counter;
  //         // this.storage.set('loggedInUserData', PersonData);
  //          this.showAlertCounter(counter);
  //       }else{
  //         console.log("session expired");
  //         this.logout();
  //       }
  //     }, error => {
  //       console.log("expired"); 
  //       this.showAlertCounter(10);
  //      });
  //   });
  // }

  logout(){
    this.storage.get('isLogout').then(value =>{
      console.log("is Loggout vale ",value);
      if(value){
       this.logOut();
      }
    });
    if(this.isLogoutData == true){
      console.log("Logout now ");
      this.logOut();
    }else{
      console.log("Already logout");
    }
  }

  logOut() {
    // this.app.getActiveNav().setRoot('HomePage')
    $('.tabs').find('.tab-button').attr('aria-selected','false')
    // $('.tabs .tab-button[aria-selected=false]:nth-child(1)')
    // $('.tab-button').find('aria-label',).attr('aria-selected','false')
    // this.navCtrl.setRoot('HomePage')
    // this.LogoutClicked = true;
    // this.setDeviceData(this.loggedInUserData.PERSON_ID)
    this.isLogoutData = false;
    // this.storage.set('isLogout',this.isLogoutData)
    this.storage.clear();
    this.app.getActiveNav().setRoot('HomePage');
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }

 

  showChatCounter(counter){
    // this is for testing purpose 
    //  this.showAlertCounter(counter)
    // counter = 10;
    if(counter > 0){
      $('.tab-button:nth-child(4)').addClass('has-badge');
      $('.icon-wrap.chats .badge').removeClass('hide');
      // alrt
      // $('.icon-wrap.alerts .badge').removeClass('hide');
      
      if(counter > 9){
        $('.tab-button:nth-child(4) ion-badge.tab-badge').removeClass('single');
        $('.tab-button:nth-child(4) ion-badge.tab-badge').text('9+');
        $('.icon-wrap.chats .badge .counter').text('9+');
        // alrt
        // $('.icon-wrap.alerts .badge .counter').text('9+');
      }else{
        $('.tab-button:nth-child(4) ion-badge.tab-badge').addClass('single');
        $('.tab-button:nth-child(4) ion-badge.tab-badge').text(counter);
        $('.icon-wrap.chats .badge .counter').text(counter);
        // alrts
        // $('.icon-wrap.alerts .badge .counter').text(counter);
      }
    }else{
      $('.tab-button:nth-child(4)').removeClass('has-badge');
      $('.icon-wrap.chats .badge').addClass('hide');
    }
  }

  

  showAlertCounter(counter){
    if(counter > 0){
      // alrt
      $('.icon-wrap.alerts .badge').removeClass('hide');
      if(counter > 9){
        // alrt
        $('.icon-wrap.alerts .badge .counter').text('9+');
      }else{
       
        $('.icon-wrap.alerts .badge .counter').text(counter);
      }
    }else{
      $('.icon-wrap.chats .alerts').addClass('hide');
    }
  }

  removeUnreadCounter(){
    if(typeof this.unreadCounter != 'undefined'){
      this.unreadCounter.unsubscribe();
    }
    if(typeof this.alrtCounter != 'undefined'){
      this.alrtCounter.unsubscribe();
    }
  }

  presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'top'
    });
    toast.present()
  }
  getMedicineName(){
    let data=new HttpParams()
      return this.http.post(this.global.APIURL+"medicine/Medicine", data,{headers:this.getHeader()})

  }
  getFunctionAccess(person_id, client_id, clubDivivionId){
    return new Promise((resolve) => {
      let data = new HttpParams()
          .set('person_id', person_id)
          .set('client_id', client_id)
          .set('club_division_id', clubDivivionId)

      this.http.post<any>(this.global.APIURL + 'users/getPersonAccess', data,{headers:this.getHeader()})
      .subscribe(response => {
        this.storage.get('SSODetails').then((val)=>{
          this.SSODetails=val;
          this.storage.get('loggedInUserData').then((val) => {
            this.loggedInUserData = val;
            if( this.loggedInUserData && this.loggedInUserData['TIMESHEETREVIEWER'] )
            {
              this.loggedInUserData['TIMESHEETREVIEWER'] = response.TIMESHEETREVIEWER ? response.TIMESHEETREVIEWER : false;
            }
            if( this.loggedInUserData && this.loggedInUserData['ISCONTRACTOR'] )
            {
              this.loggedInUserData['ISCONTRACTOR'] = response.ISCONTRACTOR ? response.ISCONTRACTOR : false;

            }
             
              this.storage.set('loggedInUserData', this.loggedInUserData);
            if(response.GETPERSONACCESS==1){
              var setData={
                user_adminLevel:1,
                event_StillComing:'no',
                event_EventDetail:'yes', //check
                event_EventDetail_checkbox:'yes',
                event_BorrowPlayer:'yes',
                event_NotifyPlayer:this.SSODetails?.SHOWNOTIFYPLAYERMENU==1?'yes':'no', //check
                event_GroupMessage:this.SSODetails?.SHOWGROUPMESSAGEMENU==1?'yes':'no', //check
                event_SessionPlan:'yes but not now',
                event_Injury:this.SSODetails?.SHOWINJURYMENU==1?'yes':'no', //check
                event_Transport:this.SSODetails?.SHOWTRANSPORTMENU==1?this.SSODetails.SHOWTRANSPORTMENU:0,
                event_tab_Attendance:'yes',
                event_tab_Overview:'no',
                event_Welfare:this.SSODetails?.SHOWWELFAREMENU==1?'yes':'no', //check
                event_Result:this.SSODetails?.SHOWRESULTSMENU==1?'yes':'no', 
                // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                team_assigned:'yes',
                player_coachingReport:'yes',
                player_sms:'yes',
                player_phone:'yes',
                player_emergency_phone:'yes',
                voting_for_player: this.SSODetails?.SHOWMVPMENU==1?'yes':'no',
                game_report: 'yes',
                game_score: 'yes',
                bottom_player_menu:this.SSODetails?.SHOWPLAYERSMENU==1?'yes':'no',
                bottom_chat_menu:this.SSODetails?.SHOWCHATMENU==1?'yes':'no',
                profile_menu:this.SSODetails?.profile_menu==1?'yes':'no',
                sec_absences_menu:this.SSODetails?.SHOWSECABSENCEMENU==1?'yes':'no', //check
                session_assessment_menu:this.SSODetails?.SHOWSESSIONASSESSMENTMENU==1?'yes':'no',
                // rsvp_menu:this.SSODetails.SHOWRSVPMENU==0?'yes':'no',
                // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',  
                // medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                HasMedicineReviewAccess:this.SSODetails?.SHOWMEDICALMENU==1?response.HASMEDICINEREVIEWACCESS:0, //check
                showSurveyMenu:this.SSODetails?.SHOWSURVEYMENU==1?'yes':'no',
              }
              this.storage.set('FunctionAccess',setData)
            }
            else if(response.GETPERSONACCESS==2){
              var setData1={
                user_adminLevel:2,
                event_StillComing:'no',
                event_EventDetail:'yes',
                event_EventDetail_checkbox:'yes',
                event_BorrowPlayer:'yes',
                event_NotifyPlayer:this.SSODetails.SHOWNOTIFYPLAYERMENU==1?'yes':'no',
                event_GroupMessage:this.SSODetails.SHOWGROUPMESSAGEMENU==1?'yes':'no',
                event_SessionPlan:'yes but not now',
                event_Injury:this.SSODetails.SHOWINJURYMENU==1?'yes':'no',
                event_Transport:this.SSODetails.SHOWTRANSPORTMENU==1?this.SSODetails.SHOWTRANSPORTMENU:0,
                event_tab_Attendance:'yes',
                event_tab_Overview:'no',
                event_Welfare:this.SSODetails.SHOWWELFAREMENU==1?'yes':'no',
                event_Result:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no', 
                // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                team_assigned:'yes',
                player_coachingReport:'yes',
                player_sms:'no',
                player_phone:'yes',
                player_emergency_phone:'yes',
                voting_for_player: this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                game_report: 'yes',
                game_score: 'yes',
                bottom_player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',
                bottom_chat_menu:this.SSODetails.SHOWCHATMENU==1?'yes':'no',
                profile_menu:this.SSODetails.profile_menu==1?'yes':'no',
                sec_absences_menu:this.SSODetails.SHOWSECABSENCEMENU==1?'yes':'no',
                session_assessment_menu:this.SSODetails.SHOWSESSIONASSESSMENTMENU==1?'yes':'no',
                // rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
                // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                HasMedicineReviewAccess:this.SSODetails.SHOWMEDICALMENU==1?response.HASMEDICINEREVIEWACCESS:0,
                showSurveyMenu:this.SSODetails.SHOWSURVEYMENU==1?'yes':'no',
              }
              this.storage.set('FunctionAccess',setData1)
            }
            else if(response.GETPERSONACCESS==3){
              var setData2={
                user_adminLevel:3,
                event_StillComing:'no',
                event_EventDetail:'yes',
                event_EventDetail_checkbox:'yes',
                event_BorrowPlayer:'yes',
                event_NotifyPlayer:this.SSODetails.SHOWNOTIFYPLAYERMENU==1?'yes':'no',
                event_GroupMessage:this.SSODetails.SHOWGROUPMESSAGEMENU==1?'yes':'no',
                event_SessionPlan:'yes but not now',
                event_Injury:this.SSODetails.SHOWINJURYMENU==1?'yes':'no',
                event_Transport:this.SSODetails.SHOWTRANSPORTMENU==1?this.SSODetails.SHOWTRANSPORTMENU:0,
                event_tab_Attendance:'yes',
                event_tab_Overview:'no',
                event_Welfare:this.SSODetails.SHOWWELFAREMENU==1?'yes':'no',
                event_Result:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no', 
                team_assigned:'yes',
                player_coachingReport:'yes',
                player_sms:'no',
                player_phone:'yes',
                player_emergency_phone:'yes',
                voting_for_player: this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                game_report: 'yes',
                game_score: 'yes',
                bottom_player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',
                bottom_chat_menu:this.SSODetails.SHOWCHATMENU==1?'yes':'no',
                profile_menu:this.SSODetails.profile_menu==1?'yes':'no',
                sec_absences_menu:this.SSODetails.SHOWSECABSENCEMENU==1?'yes':'no',
                session_assessment_menu:this.SSODetails.SHOWSESSIONASSESSMENTMENU==1?'yes':'no',
                HasMedicineReviewAccess:this.SSODetails.SHOWMEDICALMENU==1?response.HASMEDICINEREVIEWACCESS:0,
                showSurveyMenu:this.SSODetails.SHOWSURVEYMENU==1?'yes':'no',
              }
              this.storage.set('FunctionAccess',setData2)
            }
            // ALLOWTOVIEWOTHERPLAYERS
            else {
              var setData3={
                user_adminLevel:4,
                event_StillComing:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
                event_EventDetail:this.SSODetails.SHOWRSVPMENU==1?'self':'no',
                event_EventDetail_checkbox:'self',
                event_BorrowPlayer:'no',
                event_NotifyPlayer:'no',
                event_GroupMessage:'no',
                event_SessionPlan:'no',
                event_Injury:this.SSODetails.SHOWINJURYMENU==1?'self':'no',  //Done
                event_Transport:this.SSODetails.SHOWTRANSPORTMENU==1?this.SSODetails.SHOWTRANSPORTMENU:0,
                event_tab_Attendance:'no',
                event_tab_Overview:'yes',
                event_Welfare:this.SSODetails.SHOWWELFAREMENU==1?'self':'no', //Done
                event_Result:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                team_assigned:'yes',
                player_coachingReport:'yes',
                player_sms:'yes',
                player_phone:'yes',
                player_emergency_phone:'yes',
                voting_for_player: this.SSODetails.SHOWMVPMENU==1?'self':'no',
                game_report: 'no',
                game_score: 'no',
                bottom_player_menu:this.SSODetails.SHOWPLAYERSMENU==1?'yes':'no',//New 
                bottom_chat_menu:this.SSODetails.SHOWCHATMENU==1?'yes':'no',//New  //Discuss
                profile_menu:this.SSODetails.profile_menu==1?'yes':'no',//New       //Discuss
                sec_absences_menu:this.SSODetails.SHOWSECABSENCEMENU==1?'yes':'no',//New //aaj //Done
                session_assessment_menu:this.SSODetails.SHOWSESSIONASSESSMENTMENU==1?'yes':'no',//New //Discuss
                view_other_players:this.SSODetails.ALLOWTOVIEWOTHERPLAYERS==1?'yes':'no',//New //Discuss
                //rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',//New
                // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',//New
                HasMedicineReviewAccess:this.SSODetails.SHOWMEDICALMENU==1?response.HASMEDICINEREVIEWACCESS:0,
                showSurveyMenu:this.SSODetails.SHOWSURVEYMENU==1?'yes':'no',
              }
              this.storage.set('FunctionAccess',setData3)
            }
            resolve(true);
          });
        });
      }, error => {
        this.storage.set('FunctionAccess', '')
        resolve(false);
      });
    });
  }

}
