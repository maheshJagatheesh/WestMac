import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,Keyboard,App } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
@IonicPage()
@Component({
  selector: 'page-timesheet-dashboard',
  templateUrl: 'timesheet-dashboard.html',
})
export class TimesheetDashboardPage {
  segments:any='';
  PersonData: any={};
  UpcomingSingleEvent: any;
  getCoachData:any;
  getContractorList:any=[];
  EventsDetails:any=[];
  HomeEventsDetails:any=[];
  monthArray:any=[];
  HomemonthArray:any=[];
  CardViewSeeMore:any=1;
  PROFILEIMAGEURL:any;
  Event_Success:any=false;
  Hours_Success:any=false;
  eventsStatusCount:any=[0, 0, 0]; // Pending, Approved, Rejected
  homeEventsStatusCount:any=[0, 0, 0]; // Pending, Approved, Rejected
  loggedInUserData: any;
  isContractorsLoading: boolean;
  isMyHoursLoading: boolean;
  isLoading: boolean;
  constructor(public navCtrl: NavController,public http: HttpClient, public storage: Storage,public globalApi:GlobalApiProvider,
    public navParams: NavParams,public global: GlobalProvider, private events: Events,public keyboard: Keyboard,public app:App,public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
      gFn.showMenuIcon();

      // console.log("navParamData",this.navParams.get('segments'));
      // this.storage.get('loggedInUserData').then((val) => {
      //   this.PersonData = val;
      //   console.log("Person Access level",this.PersonData);
      // });
  }

  ionViewDidLoad() {
    // this.PROFILEIMAGEURL= this.global.PROFILEIMAGEDEVURL
    this.gFn.showMenuIcon();
    if(this.navParams.get('segments')){
      this.segments = this.navParams.get('segments');
    }else{
      this.segments = 'Events';
    }
    this.storage.get('UpcomingSingleEvent').then((val) => {
      this.UpcomingSingleEvent = JSON.parse(val)
      console.log("UpcomingSingleEvent--->",this.UpcomingSingleEvent);
      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData = val;
        console.log("PersonData",this.PersonData)
        if(this.PersonData.ISCONTRACTOR == 1){
          this.segments = "MyHours"
        }

        if(this.UpcomingSingleEvent){
          this.getCoachDetails().then(y=>{

          })
        }
       
        if(this.navParams.get('segments')){
          let event: any = {};
          event.value = this.segments;
          this.segmentChanged(event);
        }else{
          // this.globalApi.getTimesheetEvents(this.PersonData).subscribe((user)=>{
          //   this.UpcomingEvent(user)
          this.HomemonthArray = [];
          this.globalApi.getTimesheetDashboardEventsPerson(this.PersonData).subscribe((users)=>{
            this.UpcomingEventSinglePerson(users);
          })
        }
      })
    })
  }
  segmentChanged(ev: any) {

    if(ev.value=='Events'){
      this.monthArray = [];
      this.isLoading = true;
	  this.globalApi.getTimesheetEvents(this.PersonData).subscribe((user)=>{
      console.log("user",user)
        this.UpcomingEvent(user);
      })
      this.CardViewSeeMore = 1;
    } else if(ev.value=='MyHours'){
      this.HomemonthArray = [];
      this.isMyHoursLoading = true;
      this.globalApi.getTimesheetDashboardEventsPerson(this.PersonData).subscribe((users)=>{
        this.UpcomingEventSinglePerson(users);
      })
      this.CardViewSeeMore = 1;
    } else if(ev.value=='Contractors'){
      this.isContractorsLoading = true;
      // this.storage.get('UpcomingSingleEvent').then((val) => {
      //   this.UpcomingSingleEvent = JSON.parse(val)
      //   console.log("UpcomingSingleEvent--->",this.UpcomingSingleEvent);
        this.getCoachDetails().then(y=>{

        });
      // })
      // this.getCoachDetails();

   
    }
  }
  getCoachDetails() {
    // this.storage.get('UpcomingSingleEvent').then((val) =>{
    //     this.UpcomingSingleEvent = JSON.parse(val);
    //     console.log("upcommigdata",this.UpcomingSingleEvent)
    // })
    this.UpcomingSingleEvent.event_id = 0;
    console.log("timesheet dashboard from 90",this.UpcomingSingleEvent.event_id);
    return new Promise((resolve) => {
      let loginData = new HttpParams()
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('person_id', this.PersonData.PERSON_ID)
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('club_id', this.PersonData.CLUB_ID )
        .set('season_id', this.PersonData.SEASON_ID)
        .set('app_name',this.global.App_id);

      this.http.post(this.global.APIURL + "events/getListOfCoaches", loginData,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          this.getContractorList=data.GETLISTOFCOACHES;
          this.isContractorsLoading = false;

          resolve(true);
        }, error => {
          this.isContractorsLoading = false;
        });
    })
  }
  UpcomingEventSinglePerson(data){


    if(data.SUCCESS==true)
    {
      if(data.GETTEAMEVENTSBYMONTHGROUPUPPERSON2!=''){
        this.Hours_Success=true;
        this.HomeEventsDetails=data.GETTEAMEVENTSBYMONTHGROUPUPPERSON2;
        let pendingCount = 0;
        let approvedCount = 0;
        let rejectedCount = 0;
        this.isMyHoursLoading = false;
        for(var key in this.HomeEventsDetails){
          var tempArray=[];

          for(var key1 in this.HomeEventsDetails[key]){
            if(key1!='month' && key1!='next_month' && this.HomeEventsDetails[key][key1]['CONTRACTORS'].length>0){
              for(var key2 in this.HomeEventsDetails[key][key1].CONTRACTORS){
                if(this.HomeEventsDetails[key][key1].CONTRACTORS[key2] && this.HomeEventsDetails[key][key1].CONTRACTORS[key2].hoursRec>=0){
                  this.HomeEventsDetails[key][key1].CONTRACTORS[key2].hoursRec=this.setRecordedHours(this.HomeEventsDetails[key][key1].CONTRACTORS[key2].hoursRec);
                }
				if(this.HomeEventsDetails[key][key1].CONTRACTORS[key2].TSStatus=='Pending' || this.HomeEventsDetails[key][key1].CONTRACTORS[key2].TSStatus==''){
					pendingCount++;
				}
				if(this.HomeEventsDetails[key][key1].CONTRACTORS[key2].TSStatus=='Approved'){
					approvedCount++;
				}
				if(this.HomeEventsDetails[key][key1].CONTRACTORS[key2].TSStatus=='Rejected'){
					rejectedCount++;
				}
              }
            }
            tempArray.push(this.HomeEventsDetails[key][key1])
          }
          if(tempArray.length>0){
            this.HomemonthArray.push(tempArray)
          }
          
        }
        this.homeEventsStatusCount[0] = pendingCount;
        this.homeEventsStatusCount[1] = approvedCount;
        this.homeEventsStatusCount[2] = rejectedCount;
        }

    }
    else{
      this.isMyHoursLoading = false;

    }

}

  UpcomingEvent(data){
    console.log("data",data)

    this.isLoading = true;
      if(data.SUCCESS==true)
      {
        if(data.GETTEAMEVENTSBYMONTHGROUPUPCONS2!=''){
          this.Event_Success=true;
          this.EventsDetails=data.GETTEAMEVENTSBYMONTHGROUPUPCONS2;
          let pendingCount = 0;
          let approvedCount = 0;
          let rejectedCount = 0;
          for(var key in this.EventsDetails){
            var tempArray=[];

            for(var key1 in this.EventsDetails[key]){
              for(var key2 in this.EventsDetails[key][key1].CONTRACTORS){
                if(this.EventsDetails[key][key1].CONTRACTORS[key2].hoursRec>=0){
                  this.EventsDetails[key][key1].CONTRACTORS[key2].hoursRec=this.setRecordedHours(this.EventsDetails[key][key1].CONTRACTORS[key2].hoursRec);
                }
				if(this.EventsDetails[key][key1].CONTRACTORS[key2].TSStatus=='Pending' || this.EventsDetails[key][key1].CONTRACTORS[key2].TSStatus==''){
					pendingCount++;
				}
				if(this.EventsDetails[key][key1].CONTRACTORS[key2].TSStatus=='Approved'){
					approvedCount++;
				}
				if(this.EventsDetails[key][key1].CONTRACTORS[key2].TSStatus=='Rejected'){
					rejectedCount++;
				}
              }

              tempArray.push(this.EventsDetails[key][key1])
            }
            this.monthArray.push(tempArray)
            this.isLoading = false;
          }
          this.eventsStatusCount[0] = pendingCount;
          this.eventsStatusCount[1] = approvedCount;
          this.eventsStatusCount[2] = rejectedCount;
          }

      }
      else{

      }

  }
  getHomeEventType(eventType,event){
    $(event.target).closest('.navbar-nav').find('li').removeClass('active')
    this.HomemonthArray=[]
    this.CardViewSeeMore=0;
    if(eventType==1 || eventType==2){
      for(var key in this.HomeEventsDetails){
        var tempArray=[];
        for(var key1 in this.HomeEventsDetails[key]){
          if(this.HomeEventsDetails[key][key1].event_type_id==eventType){
            tempArray.push(this.HomeEventsDetails[key][key1])
          }
          else if(this.HomeEventsDetails[key].month && tempArray.length>0){
            tempArray.push(this.HomeEventsDetails[key][key1])
          }
        }
        if(tempArray.length>0){
          this.HomemonthArray.push(tempArray)
        }
      }
    }
    else if(eventType=='all'){
      for(var key2 in this.HomeEventsDetails){
        var tempArray2=[];
        for(var key3 in this.HomeEventsDetails[key2]){
            tempArray2.push(this.HomeEventsDetails[key2][key3])
          }
          this.HomemonthArray.push(tempArray2)
        }
    }
    $(event.target).closest('li').addClass('active')

  }
  getHomeStatusType(statusType,event){
    $(event.target).closest('.navbar-nav').find('li').removeClass('active')
    this.HomemonthArray=[];
    this.CardViewSeeMore=1;
    for(var key in this.HomeEventsDetails){
      var tempArray=[];
      for(var key1 in this.HomeEventsDetails[key]){
        if(typeof this.HomeEventsDetails[key][key1].CONTRACTORS != "undefined" && 
		this.HomeEventsDetails[key][key1].CONTRACTORS.length && 
		(this.HomeEventsDetails[key][key1].CONTRACTORS[0].TSStatus==statusType || (statusType == 'Pending' && this.HomeEventsDetails[key][key1].CONTRACTORS[0].TSStatus==''))){
          tempArray.push(this.HomeEventsDetails[key][key1]);
        }
        else if(this.HomeEventsDetails[key].month && tempArray.length>0){
		  if(key1 == 'month' || key1 == 'next_month'){
            tempArray.push(this.HomeEventsDetails[key][key1]);
		  }
        }
      }
      if(tempArray.length>0){
        this.HomemonthArray.push(tempArray);
      }
    }
    $(event.target).closest('li').addClass('active');
  }
  getEventType(eventType,event){
    $(event.target).closest('.navbar-nav').find('li').removeClass('active')
    this.monthArray=[]
    this.CardViewSeeMore=0;
    if(eventType==1 || eventType==2){
      for(var key in this.EventsDetails){
        var tempArray=[];
        for(var key1 in this.EventsDetails[key]){
          if(this.EventsDetails[key][key1].event_type_id==eventType){
            tempArray.push(this.EventsDetails[key][key1])
          }
          else if(this.EventsDetails[key].month && tempArray.length>0){
            tempArray.push(this.EventsDetails[key][key1])
          }
        }
        if(tempArray.length>0){
          this.monthArray.push(tempArray)
        }
      }
    }
    else if(eventType=='all'){
      for(var key2 in this.EventsDetails){
        var tempArray2=[];
        for(var key3 in this.EventsDetails[key2]){
            tempArray2.push(this.EventsDetails[key2][key3])
          }
          this.monthArray.push(tempArray2)
        }
    }
    $(event.target).closest('li').addClass('active')

  }
  getStatusType(statusType,event){
    $(event.target).closest('.navbar-nav').find('li').removeClass('active')
    this.monthArray=[]
    this.CardViewSeeMore=1;
    for(var key in this.EventsDetails){
      var tempArray=[];
      for(var key1 in this.EventsDetails[key]){
        if(typeof this.EventsDetails[key][key1].CONTRACTORS != "undefined" && 
		this.EventsDetails[key][key1].CONTRACTORS.length && 
		(this.EventsDetails[key][key1].CONTRACTORS[0].TSStatus==statusType || (statusType == 'Pending' && this.EventsDetails[key][key1].CONTRACTORS[0].TSStatus==''))){
          tempArray.push(this.EventsDetails[key][key1])
        }
        else if(this.EventsDetails[key].month && tempArray.length>0){
		  if(key1 == 'month' || key1 == 'next_month'){
            tempArray.push(this.EventsDetails[key][key1]);
		  }
        }
      }
      if(tempArray.length>0){
        this.monthArray.push(tempArray)
      }
    }
    $(event.target).closest('li').addClass('active');
  }
  gototimesheetlist(details){
    this.navCtrl.push('ContracterTimesheetListPage',{contractorData:details})

  }
  goToReadOnlyTimeSheet(EventData){
    this.navCtrl.push('ReadOnlyTimesheetPage',{UpcomingSingleEvent:JSON.stringify(EventData)})
  }
  goToReadOnlyContTimeSheet(EventData,ContractorData){
    this.navCtrl.push('ReadOnlyTimesheetPage',{
          UpcomingSingleEvent:JSON.stringify(EventData),
          ContractorData:JSON.stringify(ContractorData)
    })

  }
  gotoReviewerTimesheet(EventData,ContractorData){
    this.navCtrl.push('ReviewerTimesheetPage',{
      UpcomingSingleEvent:JSON.stringify(EventData),
      ContractorData:JSON.stringify(ContractorData)
    });
  }
  setRecordedHours(data){

    var hours=data
    var scoreHour:any=Math.floor(hours)
    var minute:any=parseInt((((hours-Math.floor(hours))*(60/100)*100)).toFixed(2))
    if(scoreHour<10){
      scoreHour=this.padLeft(scoreHour,2)
    }
    if(minute<10){
      minute=this.padLeft(minute,2)
    }
    hours=scoreHour+':'+minute
    return hours
  }
  padLeft(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  backArrow(){
    this.gFn.hideMenuIcon();
    this.app.getRootNav().getActiveChildNav().select(0);
  }

  CardSeeMore(event){
    $(event.target).closest('.ExtraMonth').find('.multi-shadow').hide();
    $(event.target).closest('.ExtraMonth').find('.multiShadow').hide();
    $(event.target).closest('.ExtraMonth').find('.mb-50').hide();
    $(event.target).closest('.ExtraMonth').find('.mt-20').show();

    this.CardViewSeeMore=this.CardViewSeeMore+1;
  }
  CardSeeLess(val){
    $(event.target).closest('.ExtraMonth').find('.multi-shadow').show();
    $(event.target).closest('.ExtraMonth').find('.multiShadow').show();
    $(event.target).closest('.ExtraMonth').find('.mb-50').show();
    $(event.target).closest('.ExtraMonth').find('.mt-20').hide();
    if(this.CardViewSeeMore>0){
      this.CardViewSeeMore=val;
    }
  }

  gotoAdhocTimesheet(){
    this.navCtrl.push('TimesheetAdhocPage');
  }

}
