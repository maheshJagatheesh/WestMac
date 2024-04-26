import { Component, ViewChild,NgZone } from '@angular/core';

import {
  IonicPage, NavController, NavParams, LoadingController, Events, ModalController, ToastController, Platform, App,
  AlertController, Keyboard, Tabs
} from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { TabsPage } from '../tabs/tabs';
import { Tab } from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';
/**
 * Generated class for the EventHomeMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-home-menu',
  templateUrl: 'event-home-menu.html',
})
export class EventHomeMenuPage {
  loggedInUserData: any;
  FunctionAccess: any;
  bgThemeColor: string = '';
  @ViewChild(Tab) tabs: Tabs;
  DeviceType: string;
  AppName: string;
  backgroundURL: any;
  appTheme: any;
  eventstorage:any=''
  isoffline=true;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private ngZone: NgZone,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private events: Events,
    public keyboard: Keyboard,
    public global: GlobalProvider,
    public modalCtrl: ModalController,
    private alert: AlertController,

    public app: App,
    public plt: Platform,
    public gFn: GlobalFunctionsProvider,
    private network: Network,
    public global_api: GlobalApiProvider) {

   
    this.plt.ready().then(() => {
      // this.setupNetworkCheck();
    });
    
   this.checkNetwork()
    

    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
      console.log("Function access : ",this.FunctionAccess);
      

    });
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.backgroundThemeColor();
      console.log("loggedInUserData", this.loggedInUserData);
      global_api.getUnreadMessageCount(val);
      global_api.getAlrtMessageCount();
      if(this.loggedInUserData['ALERTCOUNTER'] != undefined && this.loggedInUserData.ALERTCOUNTER > 0){
        this.global_api.showAlertCounter(this.loggedInUserData.ALERTCOUNTER);
      }
    });
    gFn.hideMenuIcon();
    this.global_api.getMedicineName().subscribe((data: any) => {
      let medicineInfo = this.events.publish('json:query', data.QMEDICINE)[0][0];
      this.storage.set('medicineInfo', JSON.stringify(medicineInfo));
    });

    // var current_time = new Date();
    // var diffrns;
    //       this.storage.get('loggedInTime').then((val)=>{

    //         console.log("loging date",new Date(val).getTime());
    //         console.log("current date ",new Date(current_time).getTime());
    //         diffrns = Math.abs(+new Date(current_time).getTime() - +new Date(val).getTime());
    //         var h =Math.floor((diffrns / (1000 * 60)) % 60)
    // console.log("h =-=-=-=>",h);
    //         if(h >= 2){
    //           // this.appVersion.getAppName().then(Appname => {
    //           //   this.AppName = Appname
    //           //   console.log('b', this.AppName)
    //           // })

    //           // if (plt.is('ios')) {
    //           //   this.DeviceType = 'apple'
    //           // }
    //           // else if (plt.is('android')) {
    //           //   this.DeviceType = 'android'
    //           // }

    //           // this.firebase.getToken().then(token => {
    //           //   this.DeviceToken = token
    //           //   console.log("about to logout 76");
    //           // this.logOut(this.DeviceToken)

    //           //   console.log('c', this.DeviceToken)
    //           // })
    //           this.logOut();
    //         }

    //       })

  }
  // setupNetworkCheck() {
  //   setInterval(() => {
  //     this.ngZone.run(() => {
  //       // Call your check network method here
  //       //this.checkNetwork();
  //     });
  //   }, 2000);
  // }






  checkNetwork() {

    // Check if the application is running in a web browser
    if (this.network.type === "none" || navigator.onLine === false) {    

    } else {
      this.storage.get('offline').then((val) => {
     
        console.log("offlinestatuss",val)
  
        if(val===1)
        {
          this.datasynching()
        }
      });
    

      this.network.onConnect().subscribe(() => {
        console.log("Network connected!");
        setTimeout(() => {
          if (this.network.type === "wifi") {
          }
        }, 3000);
      });
    }
  }

  ngOnInit() {
    // this.storage.get("mobileAssets").then(
    //   res => {
    //     if (res && res.Theme && res.Theme) {
    //       this.appTheme = res.Theme;
    //       console.log("Theme : ", res);
    //       this.backgroundURL = this.appTheme.Home_screen_Img.replace(/ /g, "%20");
    //       console.log("backgroundURL : ", this.backgroundURL);
    //     }else{
    //       this.backgroundURL = "assets/images/jtcbgscreen.png";
    //     }
    //   });

      this.storage.get("mobileAssets").then(
      (res: any) => {
        console.log("Result : ",res);

        if (res && res.Theme && res.Theme.Home_screen_Img) {
          
          
          // this.backgroundURL = res.Theme.Home_screen_Img.replace(/ /g,"%20").toString();
          this.backgroundURL = res.Theme.Home_screen_Img.replace(/ /g,"%20").toString();

          console.log("Back : ",this.backgroundURL);

          // this.backgroundURL = "https://wallpaperaccess.com/full/3875473.jpg";
        } else {
          this.backgroundURL = "assets/images/jtcbgscreen.png";
        }
      });
      console.log('initiated...')
      this.storage.get('loggedInUserData').then((val) => {
        if(val && val['ALERTCOUNTER'] != undefined && val.ALERTCOUNTER > 0){
          this.global_api.showAlertCounter(val.ALERTCOUNTER);
        }
      });
      
      
  }

  async datasynching() {

    this.eventstorage = (await this.storage.get("attendanceevents")) || [];
    
    if (this.eventstorage && this.eventstorage.length>0) {

      let alert = this.alert.create({
        title: "<p>CLOSE ROLL</p>",
        message:
          "<div><p>Attendance data is available in local storage. Would you like to synchronize it?.</p></div>",
        cssClass: "close-roll-modal",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "CANCEL",
            role: "cancel",
            cssClass: "modal-cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
          {
            text: "Sync",
            cssClass: "modal-submit",
            handler: () => {
              this.presentToast("Your data is Syncing please wait");
      for (let i = 0; i < this.eventstorage.length; i++) {

      if(this.eventstorage[i].bulkattendpayload &&  this.eventstorage[i].singlepayload&&this.eventstorage[i].singlepayload.length>0)
      {
        console.log("bulk and single")
        this.BulkPayload(this.eventstorage[i].bulkattendpayload,this.eventstorage[i].singlepayload)  
      }

      if(!this.eventstorage[i].bulkattendpayload && this.eventstorage[i].singlepayload&&this.eventstorage[i].singlepayload.length>0)
      {
        console.log("single")
        this.SinglePayload(this.eventstorage[i].singlepayload)
      }

      if(this.eventstorage[i].bulkattendpayload && this.eventstorage[i].singlepayload.length==0)
      {
        this.BulkPayload(this.eventstorage[i].bulkattendpayload,[])  
      }

      if(this.eventstorage[i].rollstatuspayload)
      {
        console.log("rollstatuspayload")
        this.Rollstuatus(this.eventstorage[i].rollstatuspayload)
      }
       
   }
            },
          },
        ],
      });
      alert.present(alert);
  

     
         
    }
  
  }

  Rollstuatus(rollstatuspayload: any) {

    console.log("payloadddde",rollstatuspayload)
   
    if(!rollstatuspayload.updates)
    {
      return new Promise((resolve) => {
        let Data = new HttpParams()
          .set("eventId", rollstatuspayload.eventId)
          .set(
            "teamId",
            rollstatuspayload.teamId
          )
          .set("clubId", rollstatuspayload.clubId)
          .set("adminId", rollstatuspayload.adminId)
          .set("rollStatus", rollstatuspayload.rollStatus);     
        this.http
          .post(this.global.APIURL_CORE + "attendance/updateroll", Data, {
            headers: this.global_api.getHeader(),
          })
          .subscribe(
            (data: any) => {
              // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
              this.storage.set("offline",0)
              console.log("result for change", data);
              this.presentToast("Roll status updated");
              this.clearStorage("","rollstatus");
              resolve(true);
            },
            (error) => {}
          );
      });
    }
    else{
      console.log("updates array exist")
    }

   

  }
  SinglePayload(singlepayload: any) {
    console.log("fulldata",singlepayload)

    for (let i = 0; i < singlepayload.length; i++) {

      console.log("newdartaaa",singlepayload[i])
       let loginData4 = new HttpParams()
      .set("event_id", singlepayload[i].event_id)
      .set("personId", singlepayload[i].personId)
      .set("attended", singlepayload[i].attended)
      .set("confirmed", singlepayload[i].confirmed)
      .set("reasondeclined", singlepayload[i].reasondeclined)
      .set("reasondeclined_by_coach", singlepayload[i].reasondeclined_by_coach)
      .set("state_time", singlepayload[i].state_time)
      .set("selectedTeam", singlepayload[i].selectedTeam);

    this.http
      .post(
        this.global.APIURL + "events/saveSinglePlayersAttdStates",
        loginData4,
        { headers: this.global_api.getHeader() }
      )
      .subscribe(
        (data: any) => {
          if (data.SUCCESS) {
            this.storage.set("offline",0)
            this.presentToast("Single player attendance updated");
            this.clearStorage("single","");
          }
        },
        (error) => {}
      );
    }
  }
  async clearStorage(payload,rollstatus) {
   
    let offlinedata: any = (await this.storage.get("attendanceevents")) || [];

    if (offlinedata && offlinedata.length>0) {
      for (let i = 0; i < offlinedata.length; i++) {
        let event = offlinedata[i];
        // Find the matching eventid

        if(payload)
        {
          event.bulkattendpayload = ""   
          event.singlepayload = []  
        }
        if(rollstatus)
        {
          event.rollstatuspayload =""
        }

      }

      this.storage.set("attendanceevents", offlinedata);
    }

    
    
  }
  BulkPayload(bulkattendpayload: any,singlepayload:any) { 
    return new Promise((resolve) => {
      let Data = new HttpParams()
        .set("eventid", bulkattendpayload.eventid)
        .set(
          "teamid",
          bulkattendpayload.teamid
        )
        .set("attended", bulkattendpayload.attended);
        
      this.http
        .post(this.global.APIURL_CORE + "attendance/attendancebulk", Data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (data: any) => {
            // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
             if(data.SUCCESS)
             {
              this.presentToast("Bulk attendance updated successfully");
              this.storage.set("offline",0)
              if(singlepayload&&singlepayload.length>0)
              {
                this.SinglePayload(singlepayload)
              }
             
             }
           
            resolve(true);
           
          },
          (error) => {}
        );
    });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }
  // styleObject() {
  //   // return {background: 'url(' + this.backgroundURL + ') center no-repeat', 'background-size' : 'cover !important'}
  //   return {
  //     'background': `url(${this.backgroundURL}) no-repeat fixed center`,
  //     'background-position': 'inherit !important',
  //     'background-size': 'cover !important'
  //   }
  // }

  logOut() {
    console.log("in logout from 87");
    $('.tabs').find('.tab-button').attr('aria-selected', 'false')
    // this.setDeviceData(this.loggedInUserData.PERSON_ID, deviceToke)
    this.storage.clear();
    this.navCtrl.setRoot('HomePage');
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }

  setDeviceData(person_id, deviceToke) {
    let Data = new HttpParams()
      .set('person_id', person_id)
      .set('deviceType', this.DeviceType)
      .set('token', deviceToke)
      .set('logged', '0')
      .set('appVer_major', '1')
      .set('appVer_minor', '0')
      .set('appVer_maintenance', '0')
      .set('app_name', this.AppName);

    this.http.post(this.global.APIURL + "push/registerDeviceWithPersonId", Data)
      .subscribe((data: any) => {

      }, error => {
      });
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.gFn.hideMenuIcon();
    }, 500);
    console.log("Function Access Lavel From event-home-menu.ts 48", this.FunctionAccess?.user_adminLevel);

  }

  ionViewWillLeave() {
    //this.gFn.showMenuIcon();
  }

  backgroundThemeColor() {
    switch (this.loggedInUserData.THEME_BG) {
      case "yellow":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "red":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "blue":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "orange":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "pink":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
        case "white":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      default:
        this.bgThemeColor = "blue";
        break;
    }
    console.log("themecolor", this.bgThemeColor)

  }

  gotoEvents() {
    this.app.getRootNav().getActiveChildNav().select(1);
    //this.navCtrl.parent.select(1);
  }

  gotoPlayers() {
    this.app.getRootNav().getActiveChildNav().select(2);
  }

  // gotoTeammates(){
  //   this.app.getRootNav().getActiveChildNav().select(3);
  // }

  gotoChats() {
    this.app.getRootNav().getActiveChildNav().select(3);
  }

  gotoSettings() {
    this.app.getRootNav().getActiveChildNav().select(4);
  }

  gotoMessageLogs() {
    this.app.getRootNav().getActiveChildNav().select(5);
  }

  gotoTimesheets() {
    this.app.getRootNav().getActiveChildNav().select(1).then(data => {
      this.app.getActiveNav().setRoot('TimesheetDashboardPage');
    });
  }
}
