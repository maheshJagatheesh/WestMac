import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, App } from 'ionic-angular';
import { HttpClient,HttpParams} from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
@IonicPage()
@Component({
  selector: 'page-alert-dashboard',
  templateUrl: 'alert-dashboard.html',
})
export class AlertDashboardPage {
  PersonData:any;
  EventsDetails:any=[];
  UpCommingEvents:any=[];
  monthArray:any=[];
  CardViewSeeMore:any=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public toastCtrl: ToastController,public global: GlobalProvider,public http: HttpClient,public gFn:GlobalFunctionsProvider, public platform: Platform, public app: App,public global_api:GlobalApiProvider ) {

    this.platform.registerBackButtonAction(() => {
      this.app.getRootNav().getActiveChildNav().select(0);
    });
     
  }

  ionViewDidLoad() {
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData=val;
      if(this.PersonData.ISCHILD==1 ){
        this.PersonData.ISPARENT=0

      }
      // console.log(this.PersonData)
      this.storage.get('UpcomingSingleEvent').then((val) => {
      
      });
      // this.UpcomingEvent().then((x) => {
        this.UpcomingEventNew()
      // });
      
    });
    // console.log('ionViewDidLoad AlertDashboardPage');
  }
  gotoConfirmAttendance(val){
    // if(val.AttendStatus==0 || val.AttendStatus==1){
      this.navCtrl.push('EventConfirmAbsencePage',{personDetails:JSON.stringify(val)})
    // }
    // else{
    //   this.presentToast('Cannot be refilled')
    // }
    
  }


  ionViewDidEnter(){
    // $('.tabs .tab-button[aria-selected=false]:nth-child(1)').attr('aria-selected', 'true')
    $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({
      'mask-image': 'url(../assets/images/menu/home-blue.svg)',
      'height': '32px',
      'color':'#43B7CC'
    })
  }

  backArrow(){
    this.gFn.gotoHome()
    // this.app.getRootNav().getActiveChildNav().select(0);
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  UpcomingEventNew(){
    return new Promise((resolve) => {
      let Data = new HttpParams()
            // .set('IsParent', this.PersonData.ISPARENT)
            .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
            .set('selectedTeam', this.PersonData.SELECTEDTEAM)
            //.set('person_id', this.PersonData.PERSON_ID)
            .set('person_id', this.PersonData.LOGGEDIN_USER_PERSON_ID)
            .set('client_id', this.PersonData.CLIENT_ID)
            .set('SEASON_ID', this.PersonData.SEASON_ID);

          this.http.post(this.global.APIURL+"events/getAtendenceEventsList", Data,{headers:this.global_api.getHeader()})
          .subscribe((data:any) => {
          //  console.log(data)
            if(data.SUCCESS==true)
            {
              if(data.GETATENDENCEEVENTSLIST!=''){
                this.EventsDetails=data.GETATENDENCEEVENTSLIST[1];
                // for(var val in this.EventsDetails){
                  for(var key in this.EventsDetails){
                    var tempArray=[];
                    for(var key1 in this.EventsDetails[key]){
                      tempArray.push(this.EventsDetails[key][key1])
                    }
                    this.monthArray.push(tempArray)
                  }
              // }
              // console.log(this.monthArray)
              
            }
            if(this.monthArray.length>0){
              this.monthArray[this.monthArray.length-1][(this.monthArray[this.monthArray.length-1]).length-1]=''
            }
            
            
            resolve(true);
          }
          else{
            resolve(false);
          }
          })
    })
  }
  CardSeeMore(event){
    $(event.target).closest('.ExtraMonth').find('.multi-shadow').hide();
    $(event.target).closest('.ExtraMonth').find('.mb-50').hide();
    $(event.target).closest('.ExtraMonth').find('.mt-20').show();

    this.CardViewSeeMore=this.CardViewSeeMore+1;
  }
  CardSeeLess(val){
    $(event.target).closest('.ExtraMonth').find('.multi-shadow').show();
    $(event.target).closest('.ExtraMonth').find('.mb-50').show();
    $(event.target).closest('.ExtraMonth').find('.mt-20').hide();
    if(this.CardViewSeeMore>0){
      this.CardViewSeeMore=val;
    }
  }

}
