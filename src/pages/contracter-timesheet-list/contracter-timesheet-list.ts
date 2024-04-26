import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-contracter-timesheet-list',
  templateUrl: 'contracter-timesheet-list.html',
})
export class ContracterTimesheetListPage {
  contractorData:any;
  PersonData: any={};
  UpcomingSingleEvent: any;
  getCoachData:any;
  getContractorList:any=[];
  EventsDetails:any=[];
  monthArray:any=[];
  CardViewSeeMore:any=1;
  Event_Success:any=false;
  eventsStatusCount:any=[0, 0, 0]; // Pending, Approved, Rejected
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public global: GlobalProvider,
    public globalApi:GlobalApiProvider) {
  }

  ionViewDidLoad() {
    this.contractorData=this.navParams.get('contractorData')
    console.log(this.contractorData)
    this.storage.get('UpcomingSingleEvent').then((val) => {
      this.UpcomingSingleEvent = JSON.parse(val)
      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData = val;
          this.contractorData['CLIENTTIMEZONE']= this.PersonData.CLIENTTIMEZONE
          this.contractorData['SELECTEDTEAM']= this.PersonData.SELECTEDTEAM
          this.contractorData['CLIENT_ID']= this.PersonData.CLIENT_ID
          this.contractorData['SEASON_ID']= this.PersonData.SEASON_ID
          this.contractorData['PERSON_ID']=this.contractorData.person_id_fk
          console.log(this.contractorData)
          this.globalApi.getTimesheetDashboardEventsPerson(this.contractorData).subscribe((user)=>{
            this.UpcomingEvent(user)
          })
      })
    })

    console.log('ionViewDidLoad ContracterTimesheetListPage');
  }

  UpcomingEvent(data){
    
    if (data.SUCCESS == true) {
      if (data.GETTEAMEVENTSBYMONTHGROUPUPPERSON2 != '') {
        this.Event_Success = true;
        this.EventsDetails = data.GETTEAMEVENTSBYMONTHGROUPUPPERSON2;
        let pendingCount = 0;
        let approvedCount = 0;
        let rejectedCount = 0;
        for (var key in this.EventsDetails) {
          var tempArray = [];

          for (var key1 in this.EventsDetails[key]) {
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
        }
        this.eventsStatusCount[0] = pendingCount;
        this.eventsStatusCount[1] = approvedCount;
        this.eventsStatusCount[2] = rejectedCount;
      }

    }
    else {

    }
    
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
        this.monthArray.push(tempArray);
      }
    }
    $(event.target).closest('li').addClass('active');
  }
  gotoReviewerTimesheet(EventData,ContractorData){
    this.navCtrl.push('ReviewerTimesheetPage',{
      UpcomingSingleEvent:JSON.stringify(EventData),
      ContractorData:JSON.stringify(ContractorData)
    });
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
