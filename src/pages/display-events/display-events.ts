import { Component,ViewChild   } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController,Content,ModalController, Platform } from 'ionic-angular';
import { HttpClient,HttpParams} from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';

import { Storage } from '@ionic/storage';
import { mobiscroll, MbscCalendarOptions  } from '@mobiscroll/angular';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { TabsPage } from '../tabs/tabs';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

mobiscroll.settings = {
    theme: 'material'
};


@IonicPage()
@Component({
  selector: 'page-display-events',
  templateUrl: 'display-events.html',

})
export class DisplayEventsPage {
  PreviousEvent:any=false;
  PersonData:any;
  EventsDetails:any=[];
  PreviousEventsDetails:any=[];
  monthArray:any=[];
  DuplmonthArray:any=[];
  PastmonthArray:any=[];
  UpCommingEvents:any=[];
  UpCommingEventsType:any=[1,2];
  PastGameEvents:any=[]
  UpCommingSeeMore:any=0;
  CardViewSeeMore:any=0;
  CollapseUpCommingEvents:any;
  CollapsemonthArray:any;
  WeekDays:any=[];
  notComingFlag=0;
  yesComingFlag=0;
  StoredEventData:any;
  @ViewChild(Content) content: Content;
  calendarOneWeek: Date;
  CreateNote:any = ['Create note', 'Create note'];
  MarkedEvents:any=[];
  loadedFunctionCount:number = 0; // all the functions have loaded or not?
  upcomingEventFunctionData:any;
  previousEventFunctionData:any;
  loader:any;
  FunctionAccess:any;
  PlayerAttending:any=[];
  PlayerNotAttending:any=[];
  swipedDown:boolean = false;
  ReasonSelected:any='';
  confirmHighlight:any='N';
  drawerOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public storage: Storage,public global: GlobalProvider,public Alert: AlertController,
    public http: HttpClient,public loadingCtrl: LoadingController,public mdlCtrl: ModalController,
    public logger: EventLoggerProvider, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {

      $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({
        'mask-image': '',
        'height': '',
        'color':''
      })
      $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','true')
      $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
      this.logger.NextPreviousIcons('EventBottomIcons',{ pram: Date.now() })
      this.storage.get('FunctionAccess').then((val)=>{
        this.FunctionAccess=val;
      })
      platform.ready().then(()=>{
        platform.registerBackButtonAction(()=>{

          this.navCtrl.pop()
        });
      })
  }

  goToChooseTeamsPage(){
    this.navCtrl.push('ChooseTeamProfilePage');
  }
  
  highlightMenuIcon(){
    $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','true');
    $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/home.svg)',
      'height':'22px',
      'color': '#dedede'});
  }

  ionViewDidLeave(){
    $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
      'height': '',
      'color': ''})
  }
  ionViewDidEnter() {
    this.highlightMenuIcon();
    setTimeout(() => {
      this.highlightMenuIcon();
    }, 500);
  }
  ionViewWillEnter(){
    this.highlightMenuIcon();
    setTimeout(() => {
      this.highlightMenuIcon();
    }, 500);
  }
  ionViewDidLoad() {
    this.highlightMenuIcon();
    this.logger.EventBottomIcons('EventBottomIcons',{ pram: Date.now() })
   
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData=val;
      this.storage.get('UpcomingSingleEvent').then((val) => {
        this.StoredEventData=JSON.parse(val);
        if(this.StoredEventData){
          this.getAttendingDetails();
        }
        else{
          //this.presentAlert('Events','No upcoming and previous events found');
        }
      });
      this.UpcomingEvent().then((x) => {
          this.loadedFunctionCount += 1;
          this.upcomingEventFunctionData = x;
          this.LoadingCompleted();

      });
      this.PreviousEventfunc().then((z) => {
        if(z){
          this.loadedFunctionCount += 1;
          this.previousEventFunctionData = z;
          this.LoadingCompleted();
        }
      });
    });
  }

  LoadingCompleted(){
    if(this.loadedFunctionCount == 2){ //checks if all the functions have loaded or not? Change the value accordingly
      this.loader.dismiss();
      if( (!this.previousEventFunctionData || this.PastmonthArray.length == 0)
        && (!this.upcomingEventFunctionData || this.monthArray.length == 0) ){
        this.storage.get('DisplayEventsPageCount').then((val)=>{
          let count = (val == null)? 1: ++val;
          this.storage.set('DisplayEventsPageCount', count);
          if(count > 1){
            this.presentAlert('Events','No upcoming and previous events found');
          }
        })
      }
    }
  }
  getAttendingDetails(){

      let Data = new HttpParams()
        .set('event_id', this.StoredEventData.event_id)
        .set('client_id', this.PersonData.CLIENT_ID)
        .set('person_id', this.PersonData.PERSON_ID)
        .set('first_name', this.PersonData.FIRST_NAME)
        .set('last_name', this.PersonData.LAST_NAME)
        .set('selectedTeam', this.PersonData.SELECTEDTEAM);
      this.http.post(this.global.APIURL + "players/getPlayerAttending", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {

          this.ReasonSelected=data.GETPLAYERATTENDING[0].reasondeclined.substring(0,7);
          this.confirmHighlight=data.GETPLAYERATTENDING[0].confirmed_status
         
          for(var key in data.GETPLAYERATTENDING[0].reason_options_list){

            if(data.GETPLAYERATTENDING[0].reason_options_list[key].confirm_reason=='Y'){
              this.PlayerAttending.push(data.GETPLAYERATTENDING[0].reason_options_list[key])
            }
            else{
              this.PlayerNotAttending.push(data.GETPLAYERATTENDING[0].reason_options_list[key])
            }
          }
        }, error => {
        });
  }

  tempDate:any = [];

  PreviousEventfunc(){
    return new Promise((resolve) => {
          let PlayersData = new HttpParams()
          .set('filter', '4')
          .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
          .set('selectedTeam', this.PersonData.SELECTEDTEAM)
          .set('person_id', this.PersonData.PERSON_ID)
          .set('client_id', this.PersonData.CLIENT_ID)
          .set('SEASON_ID', this.PersonData.SEASON_ID);

        this.http.post(this.global.APIURL+"events/getTeamEventsByMonthGroupPrev", PlayersData,{headers:this.global_api.getHeader()})
        .subscribe((data:any) => {
          if(data.SUCCESS==true)
            {
              if(data.GETTEAMEVENTSBYMONTHGROUP!=''){
                this.PreviousEventsDetails=data.GETTEAMEVENTSBYMONTHGROUP;
                for(var key in this.PreviousEventsDetails){
                  var tempArray:any=[];
                  try{
                    var monthName = "";
                    var nextMonthName = "";
                    for(var key1 in this.PreviousEventsDetails[key]){
                      try{
                        if(this.PastGameEvents.length==0){
                          this.PastGameEvents.push(this.PreviousEventsDetails[key][key1]);
                          console.log(this.PastGameEvents);
                        }
                        if(this.PreviousEventsDetails[key][key1].date){
                          this.MarkedEvents.push({ d: this.PreviousEventsDetails[key][key1].date, color: '#9C895D',data: this.PreviousEventsDetails[key][key1] })

                        }
                        if(key1 == "month") {
                          monthName = this.PreviousEventsDetails[key][key1];
                        }
                        else if(key1 == "next_month"){
                          nextMonthName = this.PreviousEventsDetails[key][key1];
                        }
                        else{


                          tempArray.push(this.PreviousEventsDetails[key][key1]);

                          this.tempDate = tempArray.sort((a,b)=>a.time24HR >= b.time24HR ? -1 : 1);
                          console.log(this.tempDate);
                          tempArray = this.tempDate.sort((a,b)=>a.day >= b.day ? -1 :1);
                          console.log(tempArray);

                        
                          
                          
                        }
                      }
                      catch(err){
                      }
                    }
                    tempArray.push(monthName);
                    tempArray.push(nextMonthName);
                    this.PastmonthArray.push(tempArray);
                    console.log(this.PastmonthArray);
                  }
                  catch(err){
                  }
                }
                
              }
              resolve(true);
            }
            else{
              resolve(false)
            }

          }, error => {
            resolve(false);
          });
        })
  }
  UpcomingEvent(){
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
            .set('filter', '1')
            .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
            .set('selectedTeam', this.PersonData.SELECTEDTEAM)
            .set('person_id', this.PersonData.PERSON_ID)
            .set('client_id', this.PersonData.CLIENT_ID)
            .set('SEASON_ID', this.PersonData.SEASON_ID);

          this.http.post(this.global.APIURL+"events/getTeamEventsByMonthGroup", PlayersData,{headers:this.global_api.getHeader()})
          .subscribe((data:any) => {
            if(data.SUCCESS==true)
            {
              if(data.GETTEAMEVENTSBYMONTHGROUP!=''){
                this.EventsDetails=data.GETTEAMEVENTSBYMONTHGROUP;
                for(var key in this.EventsDetails){
                  var tempArray=[];

                  for(var key1 in this.EventsDetails[key]){

                    if(this.UpCommingEvents.length<=2 ){
                      if(this.UpCommingEventsType.includes(this.EventsDetails[key][key1].event_type_id)){
                        var index=this.UpCommingEventsType.indexOf(this.EventsDetails[key][key1].event_type_id)
                        this.UpCommingEventsType.splice(index,1)
                        this.UpCommingEvents.push(this.EventsDetails[key][key1])
                      }
                      // console.log(this.UpCommingEvents)
                    }

                    if(this.EventsDetails[key][key1].date){
                      this.MarkedEvents.push({ d: this.EventsDetails[key][key1].date, color: '#9C895D',data: this.EventsDetails[key][key1]})
                    }

                    if(this.EventsDetails[key][key1].event_notes && (this.EventsDetails[key][key1].event_notes === true || !(this.EventsDetails[key][key1].event_notes).replace(/\s/g, '').length)){
                      if(this.FunctionAccess.user_adminLevel==4 ){
                        this.EventsDetails[key][key1].event_notes='No Notes'

                      }
                      else{
                        this.EventsDetails[key][key1].event_notes='Create Note'
                      }
                    }

                    tempArray.push(this.EventsDetails[key][key1])
                  }
                  this.monthArray.push(tempArray)
                  // console.log(this.monthArray)
                }
            }

            resolve(true);
          }
          else{
            resolve(false);
          }
          }, error => {
            resolve(false);

          });
        })
  }
  getEventType(eventType,event){
    // console.log('eventType',eventType)
    $(event.target).closest('.navbar-nav').find('li').removeClass('active')
    $(event.target).closest('li').addClass('active')
    this.monthArray=[]
    this.CardViewSeeMore=0;

    if(eventType==1){
      // console.log('eventType1',eventType)
      for(var key2 in this.EventsDetails){
        var tempArray2=[];
        var x=false;
        for(var key3 in this.EventsDetails[key2]){
          if(this.EventsDetails[key2][key3].event_type_id==eventType){
            // console.log(this.EventsDetails[key2][key3])
            tempArray2.push(this.EventsDetails[key2][key3])
            x=true;
          }
          else if((key3=='month' || key3=='next_month') && x){
            tempArray2.push(this.EventsDetails[key2][key3])
            // console.log('key2',key2)
            // var temp_key=JSON.stringify(parseInt(key2)+1)
            // if(this.EventsDetails[temp_key] && this.EventsDetails[temp_key][key3]){
            //   tempArray2.push(this.EventsDetails[key2][key3])
            // }
            // else if(this.EventsDetails[key2].next_month){
            //   this.EventsDetails[key2][key3]=''
            //   tempArray2.push(this.EventsDetails[key2][key3])
            // }
          }
        }
        if(tempArray2.length>0){
          this.monthArray.push(tempArray2)
          console.log(this.monthArray)
      }

      }
      if(this.monthArray.length>0){
        this.monthArray[this.monthArray.length-1][(this.monthArray[this.monthArray.length-1]).length-1]=''
      }
    }
    else if(eventType==2){
      // var lastkey2='';
      for(var key2 in this.EventsDetails){
        var tempArray2=[];
        var x=false;
        for(var key3 in this.EventsDetails[key2]){
          // var temp_key=JSON.stringify(parseInt(key2)+1)
          if(this.EventsDetails[key2][key3].event_type_id==eventType){

            tempArray2.push(this.EventsDetails[key2][key3])

            x=true;
          }
          else if((key3=='month' && x || key3=='next_month' && x)  ){
            tempArray2.push(this.EventsDetails[key2][key3])

          }
          // lastkey2=JSON.stringify(parseInt(key2)+1)

        }
        // console.log(tempArray2)

        if(tempArray2.length>0){
          this.monthArray.push(tempArray2)
          // console.log(this.monthArray)
      }
    }
      if(this.monthArray.length>0){
        this.monthArray[this.monthArray.length-1][(this.monthArray[this.monthArray.length-1]).length-1]=''
      }

      // console.log(this.monthArray[this.monthArray.length-1][(this.monthArray[this.monthArray.length-1]).length-1])

    }


    else if(eventType=='all'){
      for(var key2 in this.EventsDetails){
        var tempArray2=[];
        for(var key3 in this.EventsDetails[key2]){
            tempArray2.push(this.EventsDetails[key2][key3])
          }

          this.monthArray.push(tempArray2)
          console.log(this.monthArray)
        }
    }


  }

  onGesture(gesture){
    if(this.swipedDown == false){
      this.swipedDown = true;
      this.OpenPreviousEvent(gesture);
    }
    
  }

  OpenPreviousEvent(event){
    $('.CalenderView').show();
    $('.well').removeClass('shadow');
    $('.well').removeClass('float-top');
    this.PreviousEvent=true;
  }
  UpCmngSeeMore(event){
    if(this.UpCommingEvents.length>1){
      $('.well').removeClass('shadow');
      this.CollapseUpCommingEvents=true;
      this.UpCommingSeeMore=this.UpCommingEvents.length-1;
    }
  }
  UpCmngSeeLess(event){
    $('.well').addClass('shadow');
    this.CollapseUpCommingEvents=false;
    this.UpCommingSeeMore=0;
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

  seePastGames(event){
    if($(event.target).html()=='SEE UPCOMING EVENTS'){
      $('.CalenderView').hide();
      $(event.target).closest('.user-form').find('.emptyclass').hide();
      $('.well').addClass('float-top');
      $('.well').addClass('shadow');
      this.PreviousEvent=false;
      this.swipedDown = false;
    }
    else{
      $(event.target).html('SEE UPCOMING EVENTS')
      $(event.target).closest('.user-form').find('.select-events').show();

    }
  }

  PreviousEventDetails(event){
    $(event.target).closest('.event-card').find('.well').show();
    $(event.target).closest('.emptyclass').find('.section-less').show();
  }
  SeeLessPastEvents(event){
    // $(event.target).closest('.event-card').find('.well').hide();
    $(event.target).closest('.emptyclass').find('.section-less').hide();
    $(event.target).closest('.emptyclass').find('.well').hide();

  }
  StillComingTick(event,yesComing){
    this.notComingFlag=0

    if(yesComing==0){
      $(event.target).closest('.event-icons').find('.close-icon').removeClass('close-top-arrow')
      $(event.target).closest('.check-icon').addClass('check-top-arrow')
      $(event.target).closest('.row').find('.noComing').hide();
      $(event.target).closest('.row').find('.yesComing').show();
      this.yesComingFlag=1
    }
    else{
      $(event.target).closest('.event-icons').find('.close-icon').removeClass('close-top-arrow')
      $(event.target).closest('.check-icon').removeClass('check-top-arrow')
      $(event.target).closest('.row').find('.yesComing').hide();
      this.yesComingFlag=0
    }

  }
  NotComing(event,notComing){
    this.yesComingFlag=0
    if(notComing==0){
      $(event.target).closest('.event-icons').find('.check-icon').removeClass('check-top-arrow')
      $(event.target).closest('.close-icon').addClass('close-top-arrow')
      $(event.target).closest('.row').find('.yesComing').hide();
      $(event.target).closest('.row').find('.noComing').show();
      this.notComingFlag=1
    }
    else{
      $(event.target).closest('.event-icons').find('.check-icon').removeClass('check-top-arrow')
      $(event.target).closest('.close-icon').removeClass('close-top-arrow')
      $(event.target).closest('.row').find('.noComing').hide();
      this.notComingFlag=0
    }
  }
            
            
            

  ChangePreviousEvent(event){

    if(event!=''){
      this.PastGameEvents=[]
      for(var key in event){
        this.PastGameEvents.push(event[key])

      }
    }
  }
  presentAlert(Title,SubTitle) {
    let alert = this.Alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ['Dismiss']
    });
    alert.present(alert);
    alert.onDidDismiss(() => {
      this.storage.get('SSODetails').then((val)=>{
        if(val){
          // this.navCtrl.setRoot(TabsPage,{Player_menu:val.SHOWPLAYERSMENU==1?'yes':'no'});
          this.navCtrl.setRoot(TabsPage);

        } else {
          this.navCtrl.setRoot(TabsPage);
        }
      });
    });
  }
  gotoStillComming(){
    this.storage.get('UpcomingSingleEvent').then((val) => {
      if(val){
        // this.gotoAttandance()
      }
      else{
        alert("Please check Next Event")
      }
    })
  }

  SinglePlayersAttdStates(response,confirm,reasondeclineds, AttendyPersonId, event) {
    $('.check-icon').removeClass('check-top-arrow')
    $('.close-icon').removeClass('close-top-arrow')
    if(response=='tick'){
      $('.event-icons').find('.check-icon').addClass('RemoveOpacity')
      $('.event-icons').find('.close-icon').removeClass('RemoveOpacity')

    }
    else if(response=='close'){
      $('.event-icons').find('.check-icon').removeClass('RemoveOpacity')
      $('.event-icons').find('.close-icon').addClass('RemoveOpacity')

  }
    this.ReasonSelected=reasondeclineds.substring(0,7);

    var attended:any=0;
    let loader = this.loadingCtrl.create({});
    loader.present();
    let target = event.target;
    if(confirm=='Y'){
      confirm='YES';
      attended=1;
    }
    else if(confirm=='N'){
      confirm='NO'
    }
    let loginData4 = new HttpParams()
      .set('event_id', this.StoredEventData.event_id)
      .set('personId', AttendyPersonId)
      .set('attended', attended)
      .set('confirmed', confirm)
      .set('reasondeclined', reasondeclineds)
      .set('reasondeclined_by_coach', '-1')
      .set('state_time', '')
      .set('selectedTeam', this.PersonData.SELECTEDTEAM);

    this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        if(data.SUCCESS){
          this.logger.EventPlayerReason('PlayerEventReasonSelect',{ pram: Date.now() })
        }

        $(target).closest('.row').find('ul').hide();

        // $(target).closest('.row').find('.Show_Status').show().html(reasondeclineds);
        $(target).closest('.row').find('.ArrowDivClose').hide();
        $(target).closest('.row').find('.ArrowDivOpen').show();
        // this.AllPlayersLoad().then((y) => {
        //   if (y) {
            loader.dismiss();
        //   }
        // });
      }, error => {

      });

  }
  gotoCreateNote(index){
    if(this.PersonData.adminLevel!=4 && (!this.PersonData.ISPARENT || (this.PersonData.ISPARENT && this.PersonData.PERSON_ID == this.PersonData.PARENT_ID))){
      let modal = this.mdlCtrl.create('CreateNodePage',
        {'eventid':this.UpCommingEvents[index]['event_id'], 'event_notes':this.UpCommingEvents[index]['event_notes']},
        {'showBackdrop':true,'enableBackdropDismiss':true}
      );
      modal.present();
      modal.onDidDismiss(data=>{
        if(typeof data != 'undefined'){
          this.CreateNote[index] = data.length ? data : 'Create note';
          this.UpCommingEvents[index]['event_notes'] = data;
        }
      })
    }
  }
  gotoEventDashboard(EventData){
    this.navCtrl.push('EventDashboardPage',{'EventDetails_eventId':EventData})
    this.storage.set('BackButton',true);
  }
  myCalendarOptions: MbscCalendarOptions = {
    onDayChange: (event, inst) => {
      var date=this.formatDate(event.date)
      for(let markKey in this.MarkedEvents){
        if(this.MarkedEvents[markKey].d==date){
          this.gotoEventDashboard(this.MarkedEvents[markKey].data)

        }

      }
    }
  };
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month,day,year ].join('/')

  }

}
