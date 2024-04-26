import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,Events,App, AlertController,ModalController,ToastController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpParams} from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { DisplayEventsPage } from '../display-events/display-events';
import { EventDashboardPage } from '../event-dashboard/event-dashboard';
import { Calendar } from '@ionic-native/calendar/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
@IonicPage()
@Component({
  selector: 'page-event-welfare',
  templateUrl: 'event-welfare.html',
})
export class EventWelfarePage {
  PhotoApiUrl:string;
  personDetail:any;
  arrDetail:any=[];
  PersonData:any;
  WelfarePeopleDetail:any;
  QuestionSuccess:any;
  QuestionPlayerId:any;
  UpcomingSingleEvent:any;
  FunctionAccess:any;
  BackButton:any=false;
  ShowSeverityPage:boolean=false
  showEvent:boolean=false;
  groundAdress:any='';
  groundState:any='';
  latitude:any='';
  longitude='';
  medicalInfo:any=false;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public app:App,
     public global: GlobalProvider,private events: Events,public navParams: NavParams,public modalCtrl:ModalController,public toastCtrl:ToastController,
     public http: HttpClient,public storage: Storage, public gFn:GlobalFunctionsProvider, private calendar: Calendar,
     private launchNavigator: LaunchNavigator, private Alert: AlertController, private plt: Platform,public global_Api:GlobalApiProvider,public global_api:GlobalApiProvider) {
			plt.ready().then(()=>{
			  plt.registerBackButtonAction(()=>{
				  this.navCtrl.pop();
			  });
			});
    
    this.QuestionSuccess=navParams.get('success');
    this.QuestionPlayerId=navParams.get('personId')

    this.PhotoApiUrl=this.global.PROFILEIMAGEURL
    // $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/home.svg)',
    // 'height':'22px',
    // 'color': '#dedede'})
    // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
    // 'height': '36px',
    // 'color': '#43B7CC'})
    
  }

  ionViewDidLoad() {
    // $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','false')
    this.storage.get('EventDetails').then((val)=>{
      this.arrDetail=val
      this.groundAdress=this.arrDetail[0].ground_address;
      this.groundState=this.arrDetail[0].ground_state;
      this.longitude=this.arrDetail[0].geoloc_longitude;
      this.latitude=this.arrDetail[0].geoloc_latitude;
      // console.log(this.groundAdress,this.groundState,this.longitude,this.latitude)

    })
    
    this.storage.get('FunctionAccess').then((val)=>{
      this.FunctionAccess=val;
    })
    this.storage.get('BackButton').then((val) => {
      this.BackButton= val;
    })
    this.storage.get('UpcomingSingleEvent').then((val)=>{
      this.UpcomingSingleEvent=JSON.parse(val)
      // this.UpcomingSingleEvent.event_type_id
      // console.log('Event Id',JSON.parse(val))
    })
    this.storage.get('loggedInUserData').then((val)=>{
      this.PersonData=val;
      // console.log('PersonData',this.PersonData)
      let loader = this.loadingCtrl.create();
      loader.present();
      // this.getPersonDetail().then((y) => {
        this.displayFunction().then((x) => {
          if(x){
            setTimeout(() => {
              loader.dismiss();
              }, 100);
            
          }
        });

      // })

    })
    this.gFn.showMenuIcon();
  }
  backArrow() {
    this.navCtrl.pop();
  }

  goToChooseTeamsPage(){
    this.navCtrl.push('ChooseTeamProfilePage');
  }
  gotoResults(){
    this.gFn.gotoResults()
    this.showEvent=true
  }
  gotoAttandance(){
    this.gFn.gotoAttandance()
    this.showEvent=true
  }

  
  displayFunction() {
    return new Promise((resolve) => {
      let selectedTeam = this.PersonData.SELECTEDTEAM;
      if(this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid){
        selectedTeam = this.UpcomingSingleEvent.teamid;
      }else if(this.UpcomingSingleEvent.event_type_id == 1){
        if(this.UpcomingSingleEvent.homeclubid == this.PersonData.CLUB_ID){
          selectedTeam = this.UpcomingSingleEvent.hometeam;
        }else{
          selectedTeam = this.UpcomingSingleEvent.awayteam;
        }
      }
      let loginData4 = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('clientSport', 'team')
        .set('client_id', this.UpcomingSingleEvent.client_id)
        .set('club_id', this.PersonData.CLUB_ID)
        .set('adminLevel', this.PersonData.ADMINLEVEL)
        .set('selectedTeam', selectedTeam);

      this.http.post(this.global.APIURL + "events/getPlayersEvent", loginData4,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.WelfarePeopleDetail = data.GETPLAYERSEVENT
          //console.log('data',data)
          resolve(true);

        }, error => {
          //console.log(error);
        });
    });

  }

  PlayerQuestion(Player_detail, event) {
    if (!this.medicalInfo) {
      if (this.ShowSeverityPage == false) {
        if (this.PersonData.PERSON_ID == Player_detail.person_id || this.FunctionAccess.event_Welfare == 'yes') {
          $(event.target).closest('.event-card').find('.well').addClass('active');
          this.navCtrl.push('PlayerQuestionPage', { Player_detail: Player_detail }).then((x) => {
            $(event.target).closest('.event-card').find('.well').removeClass('active');
          });

        }
      }
      else {
        this.ShowSeverityPage = false
      }
    }
  }

  DisplaySeverityDetails(playerAilments) {
    this.ShowSeverityPage = true
    if (playerAilments) {
      let SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
      SeverityModal.present();

    }
    else {
      this.presentToast('No Details found')
    }
  }

  MedicineInformation(data) {
    this.medicalInfo = true;
    let MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
    MedicineInfo.present();
    MedicineInfo.onDidDismiss(() => {
      this.medicalInfo = false;
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present()
  }

  ionViewDidLeave(){
    
  }
  addEventToCalendar() {
    let calOptions = this.calendar.getCalendarOptions(); // grab the defaults
    let endDate = new Date(this.arrDetail[0].date_ended);
    endDate.setSeconds(endDate.getSeconds() + 10);
    let address = [];
    let addressName = ' ';
    if (this.arrDetail[0].ground_address.length > 0) {
      address.push(this.arrDetail[0].ground_address);
    }
    if (this.arrDetail[0].ground_state.length > 0) {
      address.push(this.arrDetail[0].ground_state);
    }

    if (address.length > 0) {
      addressName = address.join(',');
    }

    if (Object.prototype.toString.call(endDate) === "[object Date]") {
      if (isNaN(endDate.getTime())) {
        // date is not valid
        endDate = new Date(this.arrDetail[0].date_started);
        endDate.setSeconds(endDate.getSeconds() + 10);
      }
    } else {
      // not a date
      endDate = new Date(this.arrDetail[0].date_started);
      endDate.setSeconds(endDate.getSeconds() + 10);
    }

    this.calendar.createEventWithOptions(
      this.arrDetail[0].name,
      addressName,
      this.arrDetail[0].event_notes,
      new Date(this.arrDetail[0].date_started),
      endDate,
      calOptions).then(
        (msg) => {
          this.presentAlert('Success', 'Event added to calendar.');
        },
        (err) => {
          this.presentAlert('Error', 'Problem in adding event to calendar. Please check the app permission settings.');
        }
      );
  }

  presentAlert(Title, SubTitle) {
    let alert = this.Alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ['Dismiss']
    });
    alert.present(alert);
  }


  openMap(address, state, latitude, longitude) {
    if (latitude != 0 && longitude != 0) {
      this.launchNavigator.navigate(latitude + ', ' + longitude);
    }
    else if (address || state) {
      this.launchNavigator.navigate(address + ', ' + state);
    }
    else {
      this.gFn.presentToast('Location undefined');
    }

  }

}
