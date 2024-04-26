import { Component } from '@angular/core';
import { NavController, IonicPage, Events, NavParams, App, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { DisplayEventsNewPage } from '../display-events-new/display-events-new';
import { EventAttendancePage } from '../event-attendance/event-attendance';
import { PlayersDashboardPage } from '../players-dashboard/players-dashboard';
import { MessageLogDashboardPage } from '../message-log-dashboard/message-log-dashboard';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  seconds: any = 0;
  SSOEnabled: any;
  SSOUrl: any;
  notify: any = '';
  absence: any = '';
  data1: any = '';
  mssgBody: any;
  msg: any;
  event_details: any = {};
  chat_details: any = {};
  loggedInUserData: any;
  logoURL: any;

  constructor(public navCtrl: NavController,
    public app: App,
    public plt: Platform,
    public events: Events,
    public storage: Storage,
    public http: HttpClient,
    public navParams: NavParams,
    public deeplinks: Deeplinks,
    public global: GlobalProvider,
    private appVersion: AppVersion,
    public gFn: GlobalFunctionsProvider,
    public global_api: GlobalApiProvider) {

    this.storage.get("mobileAssets").then(
      res => {
        if (res) {
          this.logoURL = res.Splash_screen;
        } else {
          if (this.global_api && this.global_api.splash) {
            this.logoURL = this.global_api.splash;
          } else {
            this.logoURL = "assets/images/Poweredby.png";
          }
        }
      });

    this.primaryCheckingDuringPageLoad();
    plt.ready().then(() => {
      this.deeplinks.route({
        '/home': TabsPage,
        '/event-attendance': EventAttendancePage,
        '/players-dashboard': PlayersDashboardPage,
        '/display-events': DisplayEventsNewPage,
        '/message-log-dashboard': MessageLogDashboardPage
      }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
        let tabIndex = 0;
        let pageName = '';
        if (match.$link.path.indexOf('players') > -1) {
          tabIndex = 2;
          pageName = 'PlayersDashboardPage';
        } else if (match.$link.path.indexOf('event') > -1) {
          tabIndex = 1;
          pageName = 'DisplayEventsNewPage';
          if (match.$link.path.indexOf('event-attendance') > -1) {
            pageName = 'EventAttendancePage';
          }
        } else if (match.$link.path.indexOf('message-log-dashboard') > -1) {
          tabIndex = 5;
          pageName = 'MessageLogDashboardPage';
        }
        if (tabIndex == 0) {
          this.navCtrl.setRoot(match.$route, match.$args);
        } else {
          setTimeout(() => {
            this.app.getRootNav().getActiveChildNav().select(tabIndex)
              .then(data => {
                this.app.getActiveNav().setRoot(pageName, match.$args);
              });
          }, 500);
        }
      }, nomatch => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
    });
  }

  primaryCheckingDuringPageLoad() {
    console.log('test');
    this.storage.get('loggedInUserData').then((val) => {
      console.log('step 9')
      if (val) {
        this.firebaseNotification().then((x) => {
          console.log(x);
          this.msg = x;
          console.log("happy happpy");
          console.log(this.msg);
          if (this.msg.body == 'You have a new group message in your email') {
            console.log('D');
            this.setupPage(4);
          }
          else if (this.msg.body == 'Please approve your absence.') {
            this.setupPage(5);
          }
          else if (this.msg.body && this.msg.body.indexOf('You have a new chat message') > -1) {
            this.setupPage1(this.msg);
          }
          else if (this.msg.body == 'Please confirm your attendance for the event') {
            console.log('B');
            this.setupPage1(this.msg);
          }
          else if (this.msg.type == 'clientSurvey') {
            console.log('A');
            this.setupPage1(this.msg);
          }
          else {
            console.log('no notification');
            this.setupPage(0);
          }
        });
      }
      else {
        console.log('step 4');
        this.setupPage(0);
      }
    });
    // this.setupPage(1)
  }

  setupPage1(msg) {
    console.log(msg);
    this.storage.get('loggedInUserData').then((val) => {
      console.log('step 6')
      if (val) {
        this.storage.get('isSetUp').then((val1) => {
          this.seconds = -1;
          clearInterval(null);
          if (val1) {
            this.storage.get('SSODetails').then((val3) => {
              console.log('Step2')
              if (val3) {
                console.log('valStep')
                //  this.navCtrl.setRoot(TabsPage,{Player_menu:val3.SHOWPLAYERSMENU==1?'yes':'no',activatedTab:tab});
                this.storage.set('BackButton', true);

                if (("type" in msg) && ("timesheetData" in msg)) {
                  let timesheetData = JSON.parse(msg.timesheetData);
                  let ContractorData = timesheetData.CONTRACTORS[0];
                  ContractorData.hoursRec = this.setRecordedHours(ContractorData.hoursRec);
                  setTimeout(() => {
                    this.app.getRootNav().getActiveChildNav().select(1)
                      .then(data => {
                        this.app.getActiveNav().push('ReadOnlyTimesheetPage', {
                          UpcomingSingleEvent: msg.timesheetData,
                          ContractorData: JSON.stringify(ContractorData)
                        });
                      });
                  }, 500);
                } else if (("eventId" in msg) && !("groupId" in msg)) {
                  //this.navCtrl.setRoot(TabsPage,{Player_menu:val3.SHOWPLAYERSMENU==1?'yes':'no'});
                  this.event_details.event_id = msg.eventId;
                  this.event_details.event_type_id = msg.eventTypeId;
                  this.event_details.client_id = msg.clientId;
                  setTimeout(() => {
                    this.app.getRootNav().getActiveChildNav().select(1)
                      .then(data => {
                        this.app.getActiveNav().push('EventAttendancePage', { EventDetails_eventId: this.event_details, show_tab: 'yes' });
                      });
                  }, 500);

                } else if (("senderId" in msg) && msg.senderId != '' && !("groupId" in msg) && !("eventId" in msg)) {
                  this.navCtrl.setRoot(TabsPage, { Player_menu: val3.SHOWPLAYERSMENU == 1 ? 'yes' : 'no' });
                  this.chat_details.from = 1;
                  this.chat_details.to = 10;
                  this.chat_details.person_id = val.PERSON_ID;
                  this.chat_details.group_id = 0;
                  this.chat_details.receiver_name = msg.firstName + ' ' + msg.lastName;
                  this.chat_details.receiver_last_name = msg.lastName;
                  this.chat_details.receiver_id = msg.senderId;
                  this.chat_details.selectedTeam = val.SELECTEDTEAM;
                  this.chat_details.teamid = val.TEAM_ID;
                  this.chat_details.flag = 1;
                  this.chat_details.userPhoto = msg.photoPath;
                  this.chat_details.accFirstName = val.FIRST_NAME;
                  this.chat_details.accLastName = val.LAST_NAME;
                  this.chat_details.clientId = val.CLIENT_ID;

                  setTimeout(() => {
                    this.app.getRootNav().getActiveChildNav().select(3)
                      .then(data => {
                        this.app.getActiveNav().push('ChatViewPage', { data: this.chat_details, show_tab: 'yes' });
                      });
                  }, 500);
                } else if (("groupId" in msg) && !("eventId" in msg) && msg.groupId != 0) {

                  this.navCtrl.setRoot(TabsPage, { Player_menu: val3.SHOWPLAYERSMENU == 1 ? 'yes' : 'no' });
                  this.chat_details.from = 1;
                  this.chat_details.to = 10;
                  this.chat_details.person_id = val.PERSON_ID;
                  this.chat_details.groupid = msg.groupId;
                  this.chat_details.groupName = msg.groupName;
                  this.chat_details.grouptype = msg.groupType;
                  this.chat_details.groupContactId = msg.groupContactId;
                  this.chat_details.selectedTeam = val.SELECTEDTEAM;
                  this.chat_details.teamid = val.TEAM_ID;
                  this.chat_details.flag = 1;
                  this.chat_details.userPhoto = msg.groupPhoto;
                  this.chat_details.accFirstName = val.FIRST_NAME;
                  this.chat_details.accLastName = val.LAST_NAME;
                  this.chat_details.clientId = val.CLIENT_ID;

                  setTimeout(() => {
                    this.app.getRootNav().getActiveChildNav().select(3)
                      .then(data => {
                        this.app.getActiveNav().push('GroupChatViewPage', { data: this.chat_details, show_tab: 'yes' });
                      });
                  }, 500);
                }
              }
              else {
                console.log('Step2');
                this.storage.set('BackButton', true);

                //this.navCtrl.setRoot(TabsPage);
                this.event_details.event_id = msg.eventId;
                this.event_details.event_type_id = msg.eventTypeId;

                //  this.navCtrl.setRoot(TabsPage,{activatedTab:tab});
                setTimeout(() => {
                  this.app.getRootNav().getActiveChildNav().select(1)
                    .then(data => {
                      this.app.getActiveNav().push('EventHomeNewPage', { EventDetails_eventId: this.event_details, show_tab: 'yes' });
                    });
                }, 500);
              }
            });
          } else {
            this.navCtrl.push('WelcomePage');
          }
        });
      }
      else {
        console.log('step 7')

        // this.seconds=-1;
        // clearInterval();
        // this.navCtrl.push('GetStartedPage');
        this.getSSOaccess().then((response) => {
          if (response && this.SSOEnabled == 1) {
            this.navCtrl.push('GetStartedPage');
            // if(this.SSOEnabled==1){

            // }
            // else if(this.SSOEnabled==0){
            //   this.navCtrl.push('LoginPage');
            // }
          }
          else {
            setTimeout(() => {
              this.navCtrl.push('LoginPage');
            }, 1000);
          }
        });
      }
    });
  }

  setupPage(tab) {
    console.log('step 5')
    this.storage.get('loggedInUserData').then((val) => {
      console.log('step 6')
      if (val) {
        this.storage.get('isSetUp').then((val1) => {
          this.seconds = -1;
          clearInterval(null);
          if (val1) {
            this.storage.get('SSODetails').then((val3) => {
              console.log('Step2')
              if (val3) {
                console.log('valStep')
                // this.navCtrl.setRoot(TabsPage,{Player_menu:val3.SHOWPLAYERSMENU==1?'yes':'no',activatedTab:tab});
                this.navCtrl.setRoot('TabsPage');
              }
              else {
                console.log('Step2')
                this.navCtrl.setRoot('TabsPage', { activatedTab: tab });
              }
            });
          } else {
            this.navCtrl.push('WelcomePage');
          }
        });
      }
      else {
        console.log('step 7')
        // this.seconds=-1;
        // clearInterval();
        // this.navCtrl.push('GetStartedPage');
        this.getSSOaccess().then((response) => {
          if (response && this.SSOEnabled == 1) {
            this.navCtrl.push('GetStartedPage');
            // if(this.SSOEnabled==1){

            // }
            // else if(this.SSOEnabled==0){
            //   this.navCtrl.push('LoginPage');
            // }
          }
          else {
            setTimeout(() => {
              this.navCtrl.push('LoginPage');
            }, 1000);
          }
        });
      }
    });

    //   setInterval(()=>{
    //   if(this.seconds>=0){
    //     this.seconds++;
    //   }
    //   if(this.seconds>1){
    //     this.storage.get('loggedInUserData').then((val) => {
    //       if(val){
    //         this.storage.get('isSetUp').then((val1) => {
    //           this.seconds=-1;
    //           clearInterval();
    //           if(val1){
    //             this.navCtrl.setRoot(TabsPage);
    //           } else {
    //             this.navCtrl.push('WelcomePage');
    //           }
    //         });
    //       }
    //       else{
    //         this.seconds=-1;
    //         clearInterval();
    //         this.navCtrl.push('GetStartedPage');
    //       }
    //     });
    //   }
    // },1000)
  }

  firebaseNotification() {
    console.log('step 2')
    return new Promise((resolve) => {
      console.log('step 3')

      // this.firebase.onNotificationOpen().subscribe(
      //   (msg) => {
      //     debugger
      //     console.log(msg);
      //     if (msg) {
      //       this.msg = msg;
      //       if(this.msg.type && this.msg.type == "groupMessage"){
      //         console.log('D');
      //         this.setupPage(5);

      //         // let count = this.msg.body.length;
      //         // this.badge.set(count)
      //       }
      //       else if(this.msg.body && this.msg.body.indexOf('Please approve your absence') > -1)
      //       {
      //         this.setupPage(6);
      //       }
      //       else if(this.msg.body && this.msg.body.indexOf('You have a new chat message') > -1)
      //       {
      //         this.setupPage1(this.msg);
      //       }
      //       else if(this.msg.type && this.msg.type == "notify")
      //       {
      //         console.log('B');
      //         this.setupPage1(this.msg);
      //       }
      //       else if(this.msg.type && this.msg.type == "timesheet")
      //       {
      //         this.setupPage1(this.msg);
      //       }
      //       else if(this.msg.type == 'clientSurvey'){
      //         console.log('A');
      //         this.setupPage1(this.msg);
      //       }
      //       else{
      //         console.log('no notification');
      //         this.setupPage(0)
      //       }
      //       resolve(msg)
      //     }
      //     else {
      //       resolve(false)
      //     }
      //   }, error => {
      //     console.log('AA')
      //   })
      this.storage.get('loggedInUserData').then((val) => {
        console.log('step 10')
        resolve(false);
      });
    })

  }

  fireSetup() {
    this.storage.get('loggedInUserData').then((val) => {
      console.log(val);
      if (val) {
        // this.firebase.getToken();
        // this.firebase.onNotificationOpen().subscribe(
        //   (msg) => {
        //     console.log(msg);
        //     this.msg = msg;

        //     console.log(this.msg);

        //     if (this.msg != undefined) {

        //       if (this.msg.body == 'You have a new group message in your email') {
        //         this.mssgBody = this.msg.body;


        //         this.storage.get('isSetUp').then((val1) => {
        //           this.seconds = -1;
        //           clearInterval(null);
        //           if (val1) {
        //             this.storage.get('SSODetails').then((val3) => {
        //               console.log('Step2')

        //               if (val3) {
        //                 this.navCtrl.setRoot(TabsPage, { Player_menu: val3.SHOWPLAYERSMENU == 1 ? 'yes' : 'no' });
        //                 if (this.mssgBody) {
        //                   this.navCtrl.push('MessageLogDashboardPage');
        //                 }

        //               }
        //               else {
        //                 this.navCtrl.setRoot(TabsPage);
        //                 if (this.mssgBody) {
        //                   this.navCtrl.push('MessageLogDashboardPage');
        //                 }

        //               }

        //             })

        //           } else {
        //             this.navCtrl.push('WelcomePage');
        //           }
        //         });

        //       }

        //       if (this.msg.body == 'Please approve your absence.') {

        //         this.mssgBody = this.msg.body;

        //       }





        //       if (this.plt.is('ios')) {
        //       } else {
        //         console.log(this.msg);
        //       }
        //     }


        //   });

        console.log(this.mssgBody);
        this.storage.get('isSetUp').then((val1) => {
          this.seconds = -1;
          clearInterval(null);
          if (val1) {
            this.storage.get('SSODetails').then((val3) => {
              console.log('Step4')

              if (val3) {
                // this.navCtrl.setRoot(TabsPage, { Player_menu: val3.SHOWPLAYERSMENU == 1 ? 'yes' : 'no' });
                this.navCtrl.setRoot('TabsPage');
              }
              else {
                this.navCtrl.setRoot('TabsPage');
              }
            });
          } else {
            this.navCtrl.push('WelcomePage');
          }
        });
      }
    });
  }

  getStarted() {
    // this.navCtrl.push('GetStartedPage');
  }

  getSSOaccess() {
    this.storage.get('loggedInUserData').then((val) => {
      if (val == null) {
        this.loggedInUserData = '';
      }
      else {
        this.loggedInUserData = val;
      }
    });
    console.log('step 8')

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': this.global.App_id
    });
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set('app_name', this.global.App_id);

      this.http.post(this.global.APIURL + "teams/getClubDetails", Data, { headers })
        .subscribe((data: any) => {
          if (data.SUCCESS) {
            let SSODetails = this.events.publish('json:query', data.GETCLUBDETAILS)[0][0];
            this.SSOEnabled = SSODetails && SSODetails.ISSSOENABLED ? SSODetails.ISSSOENABLED : 0;
            this.SSOUrl = SSODetails && SSODetails.SSOURL ? SSODetails.SSOURL : '';
            // var SSODetails={
            //   SSOEnabled:this.SSOEnabled,
            //   SSOUrl:this.SSOUrl
            // }
            this.storage.set('SSODetails', SSODetails)
            resolve(true);
          }
          else {
            resolve(false);
            this.gFn.presentToast('Contact Sports department for more Details')
          }
        }, error => {
          resolve(false)
          console.log("Error", error)
          this.gFn.presentToast('Connection problem')
        });
    });
  }

  setRecordedHours(data) {
    var hours = data
    var scoreHour: any = Math.floor(hours)
    var minute: any = parseInt((((hours - Math.floor(hours)) * (60 / 100) * 100)).toFixed(2))
    if (scoreHour < 10) {
      scoreHour = this.padLeft(scoreHour, 2)
    }
    if (minute < 10) {
      minute = this.padLeft(minute, 2)
    }
    hours = scoreHour + ':' + minute
    return hours
  }

  padLeft(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
