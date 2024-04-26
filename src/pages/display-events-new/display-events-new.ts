import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Content, ModalController, Platform, App } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';

import { Storage } from '@ionic/storage';
import { mobiscroll, MbscCalendarOptions } from '@mobiscroll/angular';
import { EventLoggerProvider } from '../../providers/event-logger/event-logger';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { TabsPage } from '../tabs/tabs';
import { EventHomeNewPage } from '../event-home-new/event-home-new';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import { Network } from '@ionic-native/network/ngx';

mobiscroll.settings = {
  theme: 'material'
};


@IonicPage()
@Component({
  selector: 'page-display-events-new',
  templateUrl: 'display-events-new.html',

})
export class DisplayEventsNewPage {
  PreviousEvent: any = false;
  PersonData: any;
  EventsDetails: any = [];
  PreviousEventsDetails: any = [];
  monthArray: any = [];
  DuplmonthArray: any = [];
  PastmonthArray: any = [];
  UpCommingEvents: any = [];
  UpCommingEventsType: any = [1, 2];
  PastGameEvents: any = []
  UpCommingSeeMore: any = 0;
  CardViewSeeMore: any = 0;
  CollapseUpCommingEvents: any;
  CollapsemonthArray: any;
  WeekDays: any = [];
  notComingFlag = 0;
  yesComingFlag = 0;
  StoredEventData: any;
  isoffline:false;
  @ViewChild(Content) content: Content;
  calendarOneWeek: Date;
  CreateNote: any = ['Create note', 'Create note'];
  MarkedEvents: any = [];
  loadedFunctionCount: number = 0; // all the functions have loaded or not?
  upcomingEventFunctionData: any;
  previousEventFunctionData: any;
  loader: any;
  FunctionAccess: any;
  PlayerAttending: any = [];
  PlayerNotAttending: any = [];
  swipedDown: boolean = false;
  ReasonSelected: any = '';
  existingEvents:any=[];
  confirmHighlight: any = 'N';
  drawerOptions: any;
  eventList: any = [];
  isEventList: boolean = false;
  isFilterList: boolean = false;
  dateStarted: any = this.formatDateNew(this.getFirstDayOfWeek());
  dateStartedPrev: any = this.formatDateNew(this.getFirstDayOfWeek());
  dateEnded: any = '';
  dateEndedPrev: any = this.formatDateNew(new Date(this.getFirstDayOfWeek()).setDate(new Date(this.getFirstDayOfWeek()).getDate() + 13));
  selectedFilter: number = 0;
  loggedInUserData: any;
  themeColor: any;
  prevEvent: boolean = false;
  divisionIds: any = [];
  sportIds: any = [];
  selectedTeams: any = [];
  client_ids: any = [];
  sportsList: any;
  divisionList: any;
  leagueList: any;
  teamList: any;
  childIds: any = [];
  offlineConnection: any = false;
  isFirstFilter: boolean = true;
  isFirst: boolean = true;
  isScroll: any = 0;
  isDataLoading: any = false;
  current_date: any;
  buckets: any = new Map();
  divisionBuckets: any = new Map();
  appTheme: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public storage: Storage, 
    public global: GlobalProvider, 
    public Alert: AlertController,
    public http: HttpClient, 
    public loadingCtrl: LoadingController, 
    public mdlCtrl: ModalController,
    public logger: EventLoggerProvider, 
    public gFn: GlobalFunctionsProvider, 
    private network: Network,
    public app: App, public global_api: GlobalApiProvider) {



    this.storage.get("mobileAssets").then(
      (res: any) => {
        if (res && res.Theme) {
          this.appTheme = res.Theme;
          console.log("App Theme : ",this.appTheme);
        }
      });
      this.storage.get('attendanceevents').then((val) => {
        this.existingEvents = val
      });

    gFn.showMenuIcon();
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.themeColor = this.loggedInUserData.THEME_BG;
      console.log("themeColor date ", this.themeColor);
      // this.loadPlayers();
      // this.getFilterDetails().then((x) => {
      //   this.checkFilterIsActive();
      // });
    });
    //$('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','true')
    //$('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
    this.logger.NextPreviousIcons('EventBottomIcons', { pram: Date.now() })
    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
    })
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        console.log("hello");
        //this.navCtrl.pop();
        this.navCtrl.setRoot('EventHomeMenuPage');
      });
    })
    this.storage.get('filterSport').then((val) => {
      if (val != null) {
        this.sportIds = val;
      }
    });
    this.storage.get('filterDivision').then((val) => {
      if (val != null) {
        this.divisionIds = val;
      }
    });
    this.storage.get('filterTeam').then((val) => {
      if (val != null) {
        this.selectedTeams = val;
        this.selectedFilter = this.selectedTeams.length;
      }
    });
    this.storage.get('filterChild').then((val) => {
      if (val != null) {
        this.childIds = val;
      }
    });
    this.checkNetwork();

  }

  detectBottom() {
    let dimensions = this.content.getContentDimensions();
    let scrollTop = this.content.scrollTop;
    let contentHeight = dimensions.contentHeight;
    let scrollHeight = dimensions.scrollHeight;
    if ((scrollTop + contentHeight + 20) > scrollHeight) {
      this.isScroll = 1;
      let lastDate = new Date(this.dateEndedPrev);
      if (this.eventList.length) {
        lastDate = new Date(this.eventList[this.eventList.length - 1].DATE_STARTED);
      }
      this.dateStarted = this.formatDateNew(lastDate.setDate(lastDate.getDate() + 1));
      this.dateEnded = this.formatDateNew(lastDate.setDate(lastDate.getDate() + 6));
      this.prevEvent = true;
      this.getEventList().then((x) => {
        this.isScroll = 0;
        if (x) {
          this.offlineConnection = false;
          this.eventList = this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
            .reverse().map(JSON.parse);
          this.eventList.sort(function (a, b) {
            return new Date(a.DATE_STARTED).getTime() - new Date(b.DATE_STARTED).getTime();
          });
        } else {
          this.offlineConnection = true;
        }
      });
    }
  }

  initInfinteScroll(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  goToChooseTeamsPage() {
    this.navCtrl.push('ChooseTeamProfilePage');
  }

  highlightMenuIcon() {
    //$('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','true');
    /* $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/home.svg)',
      'height':'22px',
      'color': '#dedede'}); */
  }

  ionViewDidLeave() {
    /* $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
      'height': '',
      'color': ''}) */
    //this.isFirst = true;
    this.isFirstFilter = true;
    this.gFn.statusbarBlack();
  }
  ionViewDidEnter() {
    this.highlightMenuIcon();
    setTimeout(() => {
      this.highlightMenuIcon();
      this.gFn.statusbarWhite();
    }, 500);
    $(document).off('click');
    $(document).click((e) => {
      if (!$(e.target).parents('.filter_overlay').length && (!$(e.target).hasClass('filtter_button') && !$(e.target).find('.filtter_button').length)) {
        this.closeFilter();
      }
    });
  }
  ionViewWillEnter() {
    this.storage.get('attendanceevents').then((val) => {
      this.existingEvents = val
    });
    this.highlightMenuIcon();
    setTimeout(() => {
      this.highlightMenuIcon();
      this.gFn.statusbarWhite();
    }, 500);
    console.log("isFirst : ", this.isFirst);
    this.checkNetwork();
    
    if (this.isFirst) {
      this.ionViewDidLoad();
    }else{
      this.storage.get('loggedInUserData').then((val) => {
        this.PersonData = val;
        this.getEventListforREfresh();
      });
    }
   
  }
  async checkNetwork() {
    console.log("checkNetworksssss")
    if (this.network.type === "none" || navigator.onLine === false) {
      let newdata = await this.storage.get('selectedEvent')
      this.eventList = []
       this.eventList = newdata
       console.log("checkNetworkcheckNetwork",this.eventList)


    }
  
  }
  ionViewDidLoad() {
    this.highlightMenuIcon();
    this.logger.EventBottomIcons('EventBottomIcons', { pram: Date.now() })
    this.isFirst = false;
   
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData = val;
      this.client_ids = [];
     
      this.storage.get('UpcomingSingleEvent').then((val) => {
        this.StoredEventData = JSON.parse(val);
        if (this.StoredEventData) {
        }
        else {
        }
      });
      
      this.offlineConnection = false;
      this.isEventList = false;
      this.eventList = [];
      this.MarkedEvents = [];
      this.getEventList().then((x) => {
        //this.loader.dismiss();
        if (x) {
          this.isEventList = true;
          this.offlineConnection = false;
          this.eventList = this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
            .reverse().map(JSON.parse);
            console.log("Event List : ", this.eventList);
            
        } else {
          this.isEventList = true;
          this.offlineConnection = true;
        }
      });

      this.getFilterDetails().then((x) => {
        if (x) {
          this.checkFilterIsActive();
        } else {
          this.isEventList = true;
          this.offlineConnection = true;
        }
      });
    });
  }

  getEventListforREfresh(){
    this.getEventList().then((x) => {
      //this.loader.dismiss();
      if (x) {
        this.isEventList = true;
        this.offlineConnection = false;
        this.eventList = this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
          .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
          .reverse().map(JSON.parse);
          console.log("Event List : ", this.eventList);
          
      } else {
        this.isEventList = true;
        this.offlineConnection = true;
      }
    });
  }

  checkFilterIsActive() {
    setTimeout(() => {
      if ($('.filter_overlay .active').length) {
        $('.doubleArrow').addClass('active');
      } else {
        $('.doubleArrow').removeClass('active');
      }
    }, 100);
  }

  loadData() {
    this.isFilterList = true;
    this.sportIds = [];
    let sportIds = [];

    $('page-display-events-new .sports.active').each(function () {
      if ($(this).prop('id') != 0) {
        sportIds.push($(this).prop('id'));
      }
    });
    this.sportIds = sportIds;
    this.divisionIds = [];
    let divisionIds = [];
    $('page-display-events-new .division.active').each(function () {
      if ($(this).prop('id') != 0) {
        divisionIds.push($(this).prop('id'));
      }
    });
    this.divisionIds = divisionIds;
    this.selectedTeams = [];
    let selectedTeams = [];
    $('page-display-events-new .team.active').each(function () {
      if ($(this).prop('id') != 0) {
        selectedTeams.push($(this).prop('id'));
      }
    });
    this.selectedTeams = selectedTeams;
    this.selectedFilter = this.selectedTeams.length;
    /* if(!this.selectedTeams.length){
      this.selectedTeams.push(this.PersonData.SELECTEDTEAM);
    } */
    /* if(!this.client_ids.length){
      this.client_ids.push(this.PersonData.CLIENT_ID);
    } */
    if (this.divisionIds.length == 1 && this.divisionIds[0] == '0') {
      this.divisionIds = [];
    }
    if (this.childIds.length) {
      //this.selectedTeams = [];
      this.client_ids = [];
      //this.divisionIds = [];
    }
    this.storage.set('filterSport', this.sportIds);
    this.storage.set('filterDivision', this.divisionIds);
    this.storage.set('filterTeam', this.selectedTeams);
    this.storage.set('filterChild', this.childIds);
    this.checkFilterIsActive();
    this.dateStarted = this.dateStartedPrev;
    if (this.dateEnded != '') {
      this.dateEnded = this.dateEndedPrev;
    }
    this.isScroll = 0;
    let dataInterval = setInterval(() => {
      if (!this.isDataLoading) {
        this.isFilterList = true;
        this.getEventList().then((x) => {
          this.isFilterList = false;
          if (x) {
            this.offlineConnection = false;
            this.eventList = this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
              .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
              .reverse().map(JSON.parse);
          } else {
            this.offlineConnection = true;
          }
          clearInterval(dataInterval);
        });
      }
    }, 100);
  }

  LoadingCompleted() {
    if (this.loadedFunctionCount == 2) { //checks if all the functions have loaded or not? Change the value accordingly
      this.loader.dismiss();
      if ((!this.previousEventFunctionData || this.PastmonthArray.length == 0)
        && (!this.upcomingEventFunctionData || this.monthArray.length == 0)) {
        this.storage.get('DisplayEventsPageCount').then((val) => {
          let count = (val == null) ? 1 : ++val;
          this.storage.set('DisplayEventsPageCount', count);
          if (count > 1) {
            this.presentAlert('Events', 'No upcoming and previous events found');
          }
        })
      }
    }
  }

  getEventList() {
    this.isDataLoading = true;
    if (this.divisionIds.length == 1 && this.divisionIds[0] == '0') {
      this.divisionIds = [];
    }
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('selectedTeams', JSON.stringify(this.selectedTeams))
        .set('client_ids', JSON.stringify(this.client_ids))
        .set('divisionIds', JSON.stringify(this.divisionIds))
        .set('sportIds', JSON.stringify(this.sportIds))
        .set('childPersonIds', JSON.stringify(this.childIds))
        .set('personId', this.PersonData?.PERSON_ID?this.PersonData.PERSON_ID:"")
        .set('dateStarted', this.dateStarted)
        .set('dateEnded', this.dateEnded)
        .set('isScroll', this.isScroll)
        .set('app_name', this.global.App_id);

      this.http.post(this.global.APIURL + "events/getEventList", PlayersData, { headers: this.global_api.getHeader() })
        .subscribe((data: any) => {
          if (data.SUCCESS == true) {
            if (data.EVENTLIST && data.EVENTLIST.length > 0) {
              /* if(!this.prevEvent){
                this.eventList = data.EVENTLIST;
              } */
              if (this.isFilterList) {
                this.eventList = [];
                this.MarkedEvents = [];
              }
              for (let key in data.EVENTLIST) {
                //if(this.prevEvent){
                this.eventList.unshift(data.EVENTLIST[key]);
                //}
                this.MarkedEvents.push({ d: this.formatDateNew(data.EVENTLIST[key].DATE_STARTED), color: '#43B7CC', data: data.EVENTLIST[key] })
              }
              // this.current_date = this.formatDateNew(new Date().toString());

              // console.log("Current date ",this.current_date);
              // this.eventList =  this.eventList.filter((item : any) => {
              //   return this.formatDateNew(item.DATE_STARTED) >= this.current_date
              // });
              resolve(true);
            } else {
              this.eventList = [];
              this.MarkedEvents = [];
              resolve(true);
            }
            setTimeout(() => {
              this.isDataLoading = false;
            }, 1000);

          } else {
            setTimeout(() => {
              this.isDataLoading = false;
            }, 1000);
            resolve(false)
          }
        }, error => {
          setTimeout(() => {
            this.isDataLoading = false;
          }, 1000);
          resolve(false);
        });
    });
  }

  getFilterDetails() {
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('personId', this.PersonData.PERSON_ID);

      this.http.post(this.global.APIURL + "teams/getFilterDetails", PlayersData, { headers: this.global_api.getHeader() })
        .subscribe((data: any) => {
          if (data.SUCCESS == true) {
            this.sportsList = data.SPORTLIST;
            this.divisionList = data.DIVISIONLIST;
            this.leagueList = data.LEAGUELIST;
            this.teamList = data.TEAMLIST;
            this.markSports();
            this.markSports2();
            resolve(true);
          } else {
            resolve(false)
          }
        }, error => {
          resolve(false);
        });
    });
  }

  showFilter() {
    $('ion-content').addClass('overlay');
    $('page-tabs').addClass('send-back');
    $('.filter_overlay').show();
    $('.sportFilter').show();

    // $('.options_wrap .options').on('click',function(){
    //   $('.options').hide();
    //   $('.filterBack').show();
    //   $('.fliter .sub-title').html($(this).find('p').html());
    //   if($(this).hasClass('sportLink')){
    //     $('.sportFilter').show();
    //   } else if($(this).hasClass('divisionLink')){
    //     $('.divisionFilter').show();
    //   } else if($(this).hasClass('teamLink')){
    //     $('.teamFilter').show();
    //   }
    // });
    this.filterHandler();
  }

  closeFilter() {
    $('ion-content').removeClass('overlay');
    $('page-tabs').removeClass('send-back');
    $('.filter_overlay, .sportFilter, .divisionFilter, .teamFilter, .filterBack').hide();
    $('.fliter .sub-title').html('Filter');
    $('.options').show();
  }

  filterBack() {
    $('.filterBack, .sportFilter, .divisionFilter, .teamFilter').hide();
    $('.fliter .sub-title').html('Filter');
    $('.options').show();
  }

  filterHandler() {
    if (this.isFirstFilter) {
      this.isFirstFilter = false;
      // $('.division').click((e) => {
      //   $('.teamFilter .team').removeClass('active');
      //   if($(e.target).hasClass('division')){
      //     // $(e.target).toggleClass('active');
      //     // if($(e.target).hasClass('active')){
      //     //   $(e.target).parents('.itemListInfo').find('.team').addClass('active');
      //     // }else{
      //     //   $(e.target).parents('.itemListInfo').find('.team').removeClass('active');
      //     // }
      //   }else{
      //     // $(e.target).parent('.division').toggleClass('active');
      //     // if($(e.target).parent('.division').hasClass('active')){
      //     //   $(e.target).parents('.itemListInfo').find('.team').addClass('active');
      //     // }else{
      //     //   $(e.target).parents('.itemListInfo').find('.team').removeClass('active');
      //     // }
      //   }
      //   /* this.divisionIds = [];
      //   let divisionIds = [];
      //   $('.division.active').each(function() {
      //     if($(this).prop('id') != 0){
      //       divisionIds.push($(this).prop('id'));
      //     }
      //   });
      //   this.divisionIds = divisionIds; */
      //   this.loadData();
      // });

      // $('.sports').click((e) => {
      //   $('.teamFilter .team').removeClass('active');
      //   if($(e.target).hasClass('sports')){
      //     // $(e.target).toggleClass('active');
      //     // if($(e.target).hasClass('active')){
      //     //   $(e.target).parents('.itemList').find('.division').addClass('active');
      //     //   $(e.target).parents('.itemList').find('.team').addClass('active');
      //     // }else{
      //     //   $(e.target).parents('.itemList').find('.division').removeClass('active');
      //     //   $(e.target).parents('.itemList').find('.team').removeClass('active');
      //     // }
      //   }else{
      //     // $(e.target).parent('.sports').toggleClass('active');
      //     // if($(e.target).parent('.sports').hasClass('active')){
      //     //   $(e.target).parents('.itemList').find('.division').addClass('active');
      //     //   $(e.target).parents('.itemList').find('.team').addClass('active');
      //     // }else{
      //     //   $(e.target).parents('.itemList').find('.division').removeClass('active');
      //     //   $(e.target).parents('.itemList').find('.team').removeClass('active');
      //     // }
      //   }
      //   /* this.sportIds = [];
      //   let sportIds = [];
      //   $('.sports.active').each(function() {
      //     if($(this).prop('id') != 0){
      //       sportIds.push($(this).prop('id'));
      //     }
      //   });
      //   this.sportIds = sportIds; */
      //   this.loadData();
      // });

      $('.team').click((e) => {
        if ($(e.target).parents('.teamFilter').length) {
          $('.sportFilter .team').removeClass('active');
        } else {
          $('.teamFilter .team').removeClass('active');
        }
        if ($(e.target).hasClass('team')) {
          $(e.target).toggleClass('active');
        } else {
          $(e.target).parent('.team').toggleClass('active');
        }
        /* this.selectedTeams = [];
        let selectedTeams = [];
        $('.team.active').each(function() {
          if($(this).prop('id') != 0){
            selectedTeams.push($(this).prop('id'));
          }
        });
        this.selectedTeams = selectedTeams; */
        this.loadData();
      });

      $('.childId').click((e) => {
        if ($(e.target).hasClass('childId')) {
          //$('.childId').not($(e.target)).removeClass('active');
          $(e.target).toggleClass('active');
        } else {
          //$('.childId').not($(e.target).parent('.childId')).removeClass('active');
          $(e.target).parent('.childId').toggleClass('active');
        }
        this.childIds = [];
        let childIds = [];
        $('.childId.active').each(function () {
          if ($(this).prop('id') != 0) {
            childIds.push($(this).prop('id'));
          }
        });
        this.childIds = childIds;
        this.loadData();
      });
    }
  }

  getAttendingDetails() {

    let Data = new HttpParams()
      .set('event_id', this.StoredEventData.event_id)
      .set('client_id', this.PersonData.CLIENT_ID)
      .set('person_id', this.PersonData.PERSON_ID)
      .set('first_name', this.PersonData.FIRST_NAME)
      .set('last_name', this.PersonData.LAST_NAME)
      .set('selectedTeam', this.PersonData.SELECTEDTEAM);
    this.http.post(this.global.APIURL + "players/getPlayerAttending", Data, { headers: this.global_api.getHeader() })
      .subscribe((data: any) => {

        this.ReasonSelected = data.GETPLAYERATTENDING[0].reasondeclined.substring(0, 7);
        this.confirmHighlight = data.GETPLAYERATTENDING[0].confirmed_status

        for (var key in data.GETPLAYERATTENDING[0].reason_options_list) {

          if (data.GETPLAYERATTENDING[0].reason_options_list[key].confirm_reason == 'Y') {
            this.PlayerAttending.push(data.GETPLAYERATTENDING[0].reason_options_list[key])
          }
          else {
            this.PlayerNotAttending.push(data.GETPLAYERATTENDING[0].reason_options_list[key])
          }
        }
      }, error => {
      });
  }

  PreviousEventfunc() {
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('filter', '4')
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('selectedTeam', this.PersonData.SELECTEDTEAM)
        .set('person_id', this.PersonData.PERSON_ID)
        .set('client_id', this.PersonData.CLIENT_ID)
        .set('SEASON_ID', this.PersonData.SEASON_ID);

      this.http.post(this.global.APIURL + "events/getTeamEventsByMonthGroupPrev", PlayersData, { headers: this.global_api.getHeader() })
        .subscribe((data: any) => {
          if (data.SUCCESS == true) {
            if (data.GETTEAMEVENTSBYMONTHGROUP != '') {
              this.PreviousEventsDetails = data.GETTEAMEVENTSBYMONTHGROUP;
              for (var key in this.PreviousEventsDetails) {
                var tempArray = [];
                try {
                  var monthName = "";
                  var nextMonthName = "";
                  for (var key1 in this.PreviousEventsDetails[key]) {
                    try {
                      if (this.PastGameEvents.length == 0) {
                        this.PastGameEvents.push(this.PreviousEventsDetails[key][key1]);
                      }
                      if (this.PreviousEventsDetails[key][key1].date) {
                        this.MarkedEvents.push({ d: this.PreviousEventsDetails[key][key1].date, color: '#43B7CC', data: this.PreviousEventsDetails[key][key1] })

                      }
                      if (key1 == "month") {
                        monthName = this.PreviousEventsDetails[key][key1];
                      }
                      else if (key1 == "next_month") {
                        nextMonthName = this.PreviousEventsDetails[key][key1];
                      }
                      else {
                        tempArray.push(this.PreviousEventsDetails[key][key1]);
                      }
                    }
                    catch (err) {
                    }
                  }
                  tempArray.push(monthName);
                  tempArray.push(nextMonthName);
                  this.PastmonthArray.push(tempArray);
                }
                catch (err) {
                }
              }
            }
            resolve(true);
          }
          else {
            resolve(false)
          }

        }, error => {
          resolve(false);
        });
    })
  }
  UpcomingEvent() {
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('filter', '1')
        .set('clientTimeZone', this.PersonData.CLIENTTIMEZONE)
        .set('selectedTeam', this.PersonData.SELECTEDTEAM)
        .set('person_id', this.PersonData.PERSON_ID)
        .set('client_id', this.PersonData.CLIENT_ID)
        .set('SEASON_ID', this.PersonData.SEASON_ID);

      this.http.post(this.global.APIURL + "events/getTeamEventsByMonthGroup", PlayersData, { headers: this.global_api.getHeader() })
        .subscribe((data: any) => {
          if (data.SUCCESS == true) {
            if (data.GETTEAMEVENTSBYMONTHGROUP != '') {
              this.EventsDetails = data.GETTEAMEVENTSBYMONTHGROUP;
              for (var key in this.EventsDetails) {
                var tempArray = [];

                for (var key1 in this.EventsDetails[key]) {

                  if (this.UpCommingEvents.length <= 2) {
                    if (this.UpCommingEventsType.includes(this.EventsDetails[key][key1].event_type_id)) {
                      var index = this.UpCommingEventsType.indexOf(this.EventsDetails[key][key1].event_type_id)
                      this.UpCommingEventsType.splice(index, 1)
                      this.UpCommingEvents.push(this.EventsDetails[key][key1])
                    }
                    // console.log(this.UpCommingEvents)
                  }

                  if (this.EventsDetails[key][key1].date) {
                    this.MarkedEvents.push({ d: this.EventsDetails[key][key1].date, color: '#43B7CC', data: this.EventsDetails[key][key1] })
                  }

                  if (this.EventsDetails[key][key1].event_notes && (this.EventsDetails[key][key1].event_notes === true || !(this.EventsDetails[key][key1].event_notes).replace(/\s/g, '').length)) {
                    if (this.FunctionAccess.user_adminLevel == 4) {
                      this.EventsDetails[key][key1].event_notes = 'No Notes'

                    }
                    else {
                      this.EventsDetails[key][key1].event_notes = 'Create Note'
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
          else {
            resolve(false);
          }
        }, error => {
          resolve(false);

        });
    })
  }
  getEventType(eventType, event) {
    // console.log('eventType',eventType)
    $(event.target).closest('.navbar-nav').find('li').removeClass('active')
    $(event.target).closest('li').addClass('active')
    this.monthArray = []
    this.CardViewSeeMore = 0;

    if (eventType == 1) {
      // console.log('eventType1',eventType)
      for (var key2 in this.EventsDetails) {
        var tempArray2 = [];
        var x = false;
        for (var key3 in this.EventsDetails[key2]) {
          if (this.EventsDetails[key2][key3].event_type_id == eventType) {
            // console.log(this.EventsDetails[key2][key3])
            tempArray2.push(this.EventsDetails[key2][key3])
            x = true;
          }
          else if ((key3 == 'month' || key3 == 'next_month') && x) {
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
        if (tempArray2.length > 0) {
          this.monthArray.push(tempArray2)
          console.log(this.monthArray)
        }

      }
      if (this.monthArray.length > 0) {
        this.monthArray[this.monthArray.length - 1][(this.monthArray[this.monthArray.length - 1]).length - 1] = ''
      }
    }
    else if (eventType == 2) {
      // var lastkey2='';
      for (var key2 in this.EventsDetails) {
        var tempArray2 = [];
        var x = false;
        for (var key3 in this.EventsDetails[key2]) {
          // var temp_key=JSON.stringify(parseInt(key2)+1)
          if (this.EventsDetails[key2][key3].event_type_id == eventType) {

            tempArray2.push(this.EventsDetails[key2][key3])

            x = true;
          }
          else if ((key3 == 'month' && x || key3 == 'next_month' && x)) {
            tempArray2.push(this.EventsDetails[key2][key3])

          }
          // lastkey2=JSON.stringify(parseInt(key2)+1)

        }
        // console.log(tempArray2)

        if (tempArray2.length > 0) {
          this.monthArray.push(tempArray2)
          // console.log(this.monthArray)
        }
      }
      if (this.monthArray.length > 0) {
        this.monthArray[this.monthArray.length - 1][(this.monthArray[this.monthArray.length - 1]).length - 1] = ''
      }

      // console.log(this.monthArray[this.monthArray.length-1][(this.monthArray[this.monthArray.length-1]).length-1])

    }


    else if (eventType == 'all') {
      for (var key2 in this.EventsDetails) {
        var tempArray2 = [];
        for (var key3 in this.EventsDetails[key2]) {
          tempArray2.push(this.EventsDetails[key2][key3])
        }

        this.monthArray.push(tempArray2)
        console.log(this.monthArray)
      }
    }


  }

  onGesture(gesture) {
    if (this.swipedDown == false) {
      this.swipedDown = true;
      this.OpenPreviousEvent(gesture);
    }

  }

  onSwipe(event) {
    if (event.offsetDirection == 4) {
      this.closeFilter();
    }
  }

  OpenPreviousEvent(event) {
    $('.CalenderView').show();
    $('.well').removeClass('shadow');
    $('.well').removeClass('float-top');
    this.PreviousEvent = true;
  }
  UpCmngSeeMore(event) {
    if (this.UpCommingEvents.length > 1) {
      $('.well').removeClass('shadow');
      this.CollapseUpCommingEvents = true;
      this.UpCommingSeeMore = this.UpCommingEvents.length - 1;
    }
  }
  UpCmngSeeLess(event) {
    $('.well').addClass('shadow');
    this.CollapseUpCommingEvents = false;
    this.UpCommingSeeMore = 0;
  }
  CardSeeMore(event) {
    $(event.target).closest('.ExtraMonth').find('.multi-shadow').hide();
    $(event.target).closest('.ExtraMonth').find('.mb-50').hide();
    $(event.target).closest('.ExtraMonth').find('.mt-20').show();

    this.CardViewSeeMore = this.CardViewSeeMore + 1;
  }
  CardSeeLess(val) {
    $(event.target).closest('.ExtraMonth').find('.multi-shadow').show();
    $(event.target).closest('.ExtraMonth').find('.mb-50').show();
    $(event.target).closest('.ExtraMonth').find('.mt-20').hide();
    if (this.CardViewSeeMore > 0) {
      this.CardViewSeeMore = val;
    }
  }

  seePastGames(event) {
    if ($(event.target).html() == 'SEE UPCOMING EVENTS') {
      $('.CalenderView').hide();
      $(event.target).closest('.user-form').find('.emptyclass').hide();
      $('.well').addClass('float-top');
      $('.well').addClass('shadow');
      this.PreviousEvent = false;
      this.swipedDown = false;
    }
    else {
      $(event.target).html('SEE UPCOMING EVENTS')
      $(event.target).closest('.user-form').find('.select-events').show();

    }
  }

  PreviousEventDetails(event) {
    $(event.target).closest('.event-card').find('.well').show();
    $(event.target).closest('.emptyclass').find('.section-less').show();
  }
  SeeLessPastEvents(event) {
    // $(event.target).closest('.event-card').find('.well').hide();
    $(event.target).closest('.emptyclass').find('.section-less').hide();
    $(event.target).closest('.emptyclass').find('.well').hide();

  }
  StillComingTick(event, yesComing) {
    this.notComingFlag = 0

    if (yesComing == 0) {
      $(event.target).closest('.event-icons').find('.close-icon').removeClass('close-top-arrow')
      $(event.target).closest('.check-icon').addClass('check-top-arrow')
      $(event.target).closest('.row').find('.noComing').hide();
      $(event.target).closest('.row').find('.yesComing').show();
      this.yesComingFlag = 1
    }
    else {
      $(event.target).closest('.event-icons').find('.close-icon').removeClass('close-top-arrow')
      $(event.target).closest('.check-icon').removeClass('check-top-arrow')
      $(event.target).closest('.row').find('.yesComing').hide();
      this.yesComingFlag = 0
    }

  }
  NotComing(event, notComing) {
    this.yesComingFlag = 0
    if (notComing == 0) {
      $(event.target).closest('.event-icons').find('.check-icon').removeClass('check-top-arrow')
      $(event.target).closest('.close-icon').addClass('close-top-arrow')
      $(event.target).closest('.row').find('.yesComing').hide();
      $(event.target).closest('.row').find('.noComing').show();
      this.notComingFlag = 1
    }
    else {
      $(event.target).closest('.event-icons').find('.check-icon').removeClass('check-top-arrow')
      $(event.target).closest('.close-icon').removeClass('close-top-arrow')
      $(event.target).closest('.row').find('.noComing').hide();
      this.notComingFlag = 0
    }
  }

  ChangePreviousEvent(event) {

    if (event != '') {
      this.PastGameEvents = []
      for (var key in event) {
        this.PastGameEvents.push(event[key])

      }
    }
  }
  presentAlert(Title, SubTitle) {
    let alert = this.Alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ['Dismiss']
    });
    alert.present(alert);
    alert.onDidDismiss(() => {
      this.storage.get('SSODetails').then((val) => {
        if (val) {
          // this.navCtrl.setRoot(TabsPage,{Player_menu:val.SHOWPLAYERSMENU==1?'yes':'no'});
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.navCtrl.setRoot(TabsPage);
        }
      });
    });
  }
  gotoStillComming() {
    this.storage.get('UpcomingSingleEvent').then((val) => {
      if (val) {
        // this.gotoAttandance()
      }
      else {
        alert("Please check Next Event")
      }
    })
  }

  SinglePlayersAttdStates(response, confirm, reasondeclineds, AttendyPersonId, event) {
    $('.check-icon').removeClass('check-top-arrow')
    $('.close-icon').removeClass('close-top-arrow')
    if (response == 'tick') {
      $('.event-icons').find('.check-icon').addClass('RemoveOpacity')
      $('.event-icons').find('.close-icon').removeClass('RemoveOpacity')

    }
    else if (response == 'close') {
      $('.event-icons').find('.check-icon').removeClass('RemoveOpacity')
      $('.event-icons').find('.close-icon').addClass('RemoveOpacity')

    }
    this.ReasonSelected = reasondeclineds.substring(0, 7);

    var attended: any = 0;
    let loader = this.loadingCtrl.create({});
    loader.present();
    let target = event.target;
    if (confirm == 'Y') {
      confirm = 'YES';
      attended = 1;
    }
    else if (confirm == 'N') {
      confirm = 'NO'
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

    this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
      .subscribe((data: any) => {
        if (data.SUCCESS) {
          this.logger.EventPlayerReason('PlayerEventReasonSelect', { pram: Date.now() })
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
  gotoCreateNote(index) {
    if (this.PersonData.adminLevel != 4 && (!this.PersonData.ISPARENT || (this.PersonData.ISPARENT && this.PersonData.PERSON_ID == this.PersonData.PARENT_ID))) {
      let modal = this.mdlCtrl.create('CreateNodePage',
        { 'eventid': this.UpCommingEvents[index]['event_id'], 'event_notes': this.UpCommingEvents[index]['event_notes'] },
        { 'showBackdrop': true, 'enableBackdropDismiss': true }
      );
      modal.present();
      modal.onDidDismiss(data => {
        if (typeof data != 'undefined') {
          this.CreateNote[index] = data.length ? data : 'Create note';
          this.UpCommingEvents[index]['event_notes'] = data;
        }
      })
    }
  }
  gotoEventHome(EventData) {
    console.log("gotoEventHome",EventData)
    this.navCtrl.push('EventHomeNewPage', { 'EventDetails_eventId': EventData })
    //this.app.getActiveNav().select(0);
    //this.app.getActiveNav().push(EventHomeNewPage,{'EventDetails_eventId':EventData});
    this.storage.set('BackButton', true);
  }
  myCalendarOptions: MbscCalendarOptions = {
    onInit: (event, inst) => {
      /* if(parseInt($('.CalenderFullView .mbsc-cal-scroll-c .mbsc-cal-slide-a .mbsc-cal-row:last-child .mbsc-cal-day0 .mbsc-cal-day-date.mbsc-cal-cell-txt').html()) > 7){
        $('.CalenderFullView .mbsc-cal-scroll-c .mbsc-cal-slide-a .mbsc-cal-row:last-child').css('display','table-row');
      } */
    },
    onDayChange: (event, inst) => {
      let options = { month: 'short', day: 'numeric' };
      let date = event.date.toLocaleDateString("en-US").replace(/\s/g, '');
      let newDate = this.formatDateNew(event.date);
      console.log("Date selected : ", newDate);
      let dayToAdd = ($('ion-header').hasClass('showFullCalender')) ? ((6 * 7) - 1) : 6;

      console.log("dayToAdd", dayToAdd);


      this.dateStartedPrev = newDate;
      this.dateEndedPrev = newDate;
      this.prevEvent = true;
      this.isScroll = 0;

      this.dateStarted = newDate;
      this.dateEnded = newDate;
      this.isFilterList = true;
      this.getEventList().then((x) => {
        if (x) {
          //this.content.scrollToTop(1000);
          this.offlineConnection = false;
          this.eventList = this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
            .reverse().map(JSON.parse);
          this.eventList.sort(function (a, b) {
            return new Date(a.DATE_STARTED).getTime() - new Date(b.DATE_STARTED).getTime();
          });
          console.log("Event List :", this.eventList);
          
          let options = { month: 'short', day: 'numeric' };
          let elementId;;
          let y;
          let nextDate;
          setTimeout(() => {
            for (let i = 0; i <= dayToAdd; i++) {
              nextDate = new Date(event.date);
              nextDate = nextDate.setDate(nextDate.getDate() + i);
              elementId = new Date(nextDate).toLocaleDateString("en-US").replace(/\s/g, '');
              if (document.getElementById('H' + elementId)) {
                y = $('#H' + elementId).offset().top - ($('ion-header.top-bar').height() + 12) + this.content._scroll.getTop();
              }
              if (typeof y != 'undefined') {
                setTimeout(() => {
                  this.content.scrollTo(0, y, 2000);
                }, 100);
                break;
              }
            }
          }, 1000);
        } else {
          this.offlineConnection = true;
        }
      });

      setTimeout(() => {
        this.hideFullCalender();
        // this.scrollTo(date);
      }, 1000);
      /* for(let markKey in this.MarkedEvents){
        if(this.MarkedEvents[markKey].d==date){
          this.gotoEventDashboard(this.MarkedEvents[markKey].data)
        }
      } */
    },
    onPageLoaded: (event, inst) => {
      /* if(parseInt($('.CalenderFullView .mbsc-cal-scroll-c .mbsc-cal-slide-a .mbsc-cal-row:last-child .mbsc-cal-day0 .mbsc-cal-day-date.mbsc-cal-cell-txt').html()) > 7){
        $('.CalenderFullView .mbsc-cal-scroll-c .mbsc-cal-slide-a .mbsc-cal-row:last-child').css('display','table-row');
      } */
    },
    onPageChange: (event, inst) => {
      this.dateStarted = this.formatDateNew(event.firstDay);
      this.dateEnded = new Date(event.firstDay);
      let dayToAdd = ($('ion-header').hasClass('showFullCalender')) ? ((6 * 7) - 1) : 6;
      this.dateEnded = this.formatDateNew(this.dateEnded.setDate(this.dateEnded.getDate() + dayToAdd));
      //console.log(event);
      //if(this.dateStarted < this.dateStartedPrev){
      this.dateStartedPrev = this.dateStarted;
      this.dateEndedPrev = this.dateEnded;
      this.prevEvent = true;
      this.isScroll = 0;
      this.getEventList().then((x) => {
        if (x) {
          //this.content.scrollToTop(1000);
          this.offlineConnection = false;
          this.eventList = this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
            .reverse().map(JSON.parse);
          this.eventList.sort(function (a, b) {
            return new Date(a.DATE_STARTED).getTime() - new Date(b.DATE_STARTED).getTime();
          });
          let options = { month: 'short', day: 'numeric' };
          let elementId;;
          let y;
          let nextDate;
          setTimeout(() => {
            for (let i = 0; i <= dayToAdd; i++) {
              nextDate = new Date(event.firstDay);
              nextDate = nextDate.setDate(nextDate.getDate() + i);
              elementId = new Date(nextDate).toLocaleDateString("en-US").replace(/\s/g, '');
              if (document.getElementById('H' + elementId)) {
                y = $('#H' + elementId).offset().top - ($('ion-header.top-bar').height() + 12) + this.content._scroll.getTop();
              }
              if (typeof y != 'undefined') {
                setTimeout(() => {
                  this.content.scrollTo(0, y, 2000);
                }, 100);
                break;
              }
            }
          }, 1000);
        } else {
          this.offlineConnection = true;
        }
      });
      //}else{
      //}
    }
  };

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year].join('/')

  }

  formatDateNew(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');

  }

  getFirstDayOfWeek() {
    let curr = new Date; // get current date
    // let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var firstDay = new Date(curr.getFullYear(), curr.getMonth(), 1);
    // return new Date(curr.setDate(first)).toString();
    return new Date(curr).toString();
  }

  scrollTo(elementId: string) {
    let y: any;
    if (document.getElementById('H' + elementId)) {
      y = $('#H' + elementId).offset().top - ($('ion-header.top-bar').height() + 5) + this.content._scroll.getTop();
    }
    if (typeof y != 'undefined') {
      this.content.scrollTo(0, y, 2000);
    }
  }

  tryAgain() {
    this.ionViewDidLoad();
  }

  showFullCalender() {
    $('.profileFirst, .CalenderView, .showFullCalender').hide();
    $('.CalenderFullView, .hideFullCalender').show();
    $('ion-header, .scroll-content').addClass('showFullCalender');
  }

  hideFullCalender() {
    $('.CalenderFullView, .hideFullCalender').hide();
    $('.profileFirst, .CalenderView, .showFullCalender').show();
    $('ion-header, .scroll-content').removeClass('showFullCalender');
  }


  //pull to refresh
  detectTop(refresher) {
    // console.log("Scroll to top",refresher);
    // console.log("Now started date is",this.dateStartedPrev);

    // let dataNewStarted = new Date(this.dateStartedPrev);
    // let dataNewEnded = new Date(this.dateStartedPrev);

    let dataNewStarted = new Date(this.eventList[0].DATE_STARTED)
    let dataNewEnded = new Date(this.eventList[0].DATE_STARTED);

    // console.log("ended date ",dataNewEnded);
    dataNewEnded.setDate(dataNewEnded.getDate() - 1)
    dataNewStarted.setDate(dataNewStarted.getDate() - 10)
    this.dateStartedPrev = dataNewStarted;
    // console.log("Now started date is",this.formatDateNew(dataNewStarted),"new ended date",this.formatDateNew(dataNewEnded) );
    this.getPreEventList(this.dateStartedPrev, dataNewEnded)

    setTimeout(() => {
      refresher.complete();
    }, 500)

  }

  //getting previous event 
  getPreEventList(dateNewStarted, dateNewEnded) {
    // console.log("Now started date is from get Event",dateNewStarted,"new ended date",dateNewEnded );
    this.dateStarted = this.formatDateNew(dateNewStarted);
    this.dateEnded = this.formatDateNew(dateNewEnded);
    this.prevEvent = true
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
        .set('selectedTeams', JSON.stringify(this.selectedTeams))
        .set('client_ids', JSON.stringify(this.client_ids))
        .set('divisionIds', JSON.stringify(this.divisionIds))
        .set('sportIds', JSON.stringify(this.sportIds))
        .set('childPersonIds', JSON.stringify(this.childIds))
        .set('personId', this.PersonData.PERSON_ID)
        .set('dateStarted', this.dateStarted)
        .set('dateEnded', this.dateEnded)
        .set('isScroll', this.isScroll)
        .set('app_name', this.global.App_id);

      this.http.post(this.global.APIURL + "events/getEventList", PlayersData)
        .subscribe((data: any) => {

          if (data.SUCCESS == true) {
            if (data.EVENTLIST) {
              if (!this.prevEvent) {
                this.eventList = data.EVENTLIST;
              }
              // this.dateEnded = this.dateStarted
              // console.log("Previos datalength",data.EVENTLIST.length);
              // console.log(" New Previos date",data.EVENTLIST[3].DATE_STARTED);

              // let newDate = new Date(this.dateStartedPrev)
              // newDate.setDate(newDate.getDate() - 6);
              // console.log("data from 1263",newDate);
              // if(this.isFilterList){
              //   this.eventList = [];
              //   this.MarkedEvents = [];
              // }
              for (let key in data.EVENTLIST) {
                if (this.prevEvent) {
                  this.eventList.unshift(data.EVENTLIST[key]);
                  // console.log("Previus Events 1266",data.EVENTLIST[key]);

                }
                //   this.MarkedEvents.unshift({ d: this.formatDateNew(data.EVENTLIST[key].DATE_STARTED), color: '#43B7CC',data: data.EVENTLIST[key] })
                // }
              }
              // setTimeout(() => {
              //   this.isDataLoading = false;
              // }, 1000);
              // resolve(true);
            } else {
              // setTimeout(() => {
              //   this.isDataLoading = false;
              // }, 1000);
              // resolve(false)
              let newStartDate = new Date(this.dateStartedPrev)
              this.dateStartedPrev.setDate(newStartDate.getDate() - 6)
              // console.log("else part 1286",this.dateStartedPrev);
            }
          }
        }, error => {
          setTimeout(() => {
            this.isDataLoading = false;
          }, 1000);
          resolve(false);
        });
    });
  }

  //toggling filter for admin starts
  openSublist(i) {
    console.log("Getting Id ", '#sub' + i);
    var id = ("#sub").concat(i);
    $(id).toggle();
  }

  openSportsList(sportName, divisionName, j) {
    // var id = ("#div").concat(j);
    var id = ("#divi".concat(sportName).concat(divisionName).concat(j));
    $(id).toggle();
  }

  //toggling filter for admin ends

  //toggling filter for coachs starts
  openSublist2(j) {
    console.log("Getting Id ", '#sub' + j);
    var id = ("#sublist").concat(j);
    $(id).toggle();
  }

  openSportsList2(sportName, divisionName, i) {
    // var id = ("#div").concat(j);
    var id = ("#div".concat(sportName).concat(divisionName).concat(i));
    $(id).toggle();
  }
  //toggling filter for coach ends


  //marking
  marking(sportsId, teamId, divisionId) {
    console.log("from marking function 1391 sportsId", sportsId, "teamId", teamId);

    // pointing division starts
    if (this.divisionBuckets.has(divisionId)) {
      if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
        this.divisionBuckets.get(divisionId).push(teamId);
      } else {
        this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1)
      }
    } else {
      this.divisionBuckets.set(divisionId, [])
      if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
        this.divisionBuckets.get(divisionId).push(teamId);
      } else {
        this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1)
      }
    }
    this.divisionBuckets.forEach((value, key, map) => {
      if (map.get(key).length) {
        document.getElementById(key + 'events1').innerHTML = map.get(key).length;
      } else {
        document.getElementById(key + 'events1').innerHTML = '';
      }
      this.filterHandler();
    })

    var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
    this.storage.set('divisionBuckets', jsonText2)
    // pointing division ends


    // pointing Sports starts
    if (this.buckets.has(sportsId)) {
      if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
        this.buckets.get(sportsId).push(teamId);
      } else {
        this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1)
      }
    } else {
      this.buckets.set(sportsId, [])
      if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
        this.buckets.get(sportsId).push(teamId);
      } else {
        this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1)
      }
    }
    this.buckets.forEach((value, key, map) => {
      if (map.get(key).length) {
        document.getElementById(key + 'events1').innerHTML = map.get(key).length + ' selected';
      } else {
        document.getElementById(key + 'events1').innerHTML = '';
      }
      this.filterHandler();
    })

    var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
    this.storage.set('bucket', jsonText)
    // pointing Sports ends
  }

  marking2(sportsId, teamId, divisionId) {
    console.log("from marking2 function 1419 sportsId", sportsId, "teamId", teamId, "divisionId", divisionId);

    // pointing division starts
    if (this.divisionBuckets.has(divisionId)) {
      if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
        this.divisionBuckets.get(divisionId).push(teamId);
      } else {
        this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1)
      }
    } else {
      this.divisionBuckets.set(divisionId, [])
      if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
        this.divisionBuckets.get(divisionId).push(teamId);
      } else {
        this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1)
      }
    }
    this.divisionBuckets.forEach((value, key, map) => {
      if (map.get(key).length) {
        document.getElementById(key + 'events2').innerHTML = map.get(key).length;
      } else {
        document.getElementById(key + 'events2').innerHTML = '';
      }
      this.filterHandler();
    })

    var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
    this.storage.set('divisionBuckets', jsonText2)
    // pointing division ends

    // pointing Sports starts
    if (this.buckets.has(sportsId)) {
      if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
        this.buckets.get(sportsId).push(teamId);
      } else {
        this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1)
      }
    } else {
      this.buckets.set(sportsId, [])
      if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
        this.buckets.get(sportsId).push(teamId);
      } else {
        this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1)
      }
    }

    this.buckets.forEach((value, key, map) => {
      if (map.get(key).length) {
        document.getElementById(key + 'events2').innerHTML = map.get(key).length + ' selected';
      } else {
        document.getElementById(key + 'events2').innerHTML = '';
      }
      this.filterHandler();
    })

    var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
    this.storage.set('bucket', jsonText)
    // pointing Sports ends
  }

  //initial marking
  markSports() {

    //initial marking for division starts
    this.storage.get("divisionBuckets").then((val) => {
      this.divisionBuckets = new Map(JSON.parse(val));
      this.divisionBuckets.forEach((value, key, map) => {
        if (map.get(key).length) {
          document.getElementById(key + 'events1').innerHTML = map.get(key).length;
        } else {
          document.getElementById(key + 'events1').innerHTML = '';
        }
        this.filterHandler();
      })
    })
    //initial marking for division ends

    // initial marking for sports starts
    this.storage.get("bucket").then((val) => {
      this.buckets = new Map(JSON.parse(val));
      this.buckets.forEach((value, key, map) => {
        if (map.get(key).length) {
          document.getElementById(key + 'events1').innerHTML = map.get(key).length + ' selected';
        } else {
          document.getElementById(key + 'events1').innerHTML = '';
        }
        this.filterHandler();
      })
    })
    // initial marking for sports ends
  }

  markSports2() {
    //initial marking for division starts
    this.storage.get("divisionBuckets").then((val) => {
      this.divisionBuckets = new Map(JSON.parse(val));
      this.divisionBuckets.forEach((value, key, map) => {
        if (map.get(key).length) {
          document.getElementById(key + 'events2').innerHTML = map.get(key).length;
        } else {
          document.getElementById(key + 'events2').innerHTML = '';
        }
        this.filterHandler();
      })
    })
    //initial marking for division ends

    // initial marking for sports starts
    this.storage.get("bucket").then((val) => {
      this.buckets = new Map(JSON.parse(val));
      this.buckets.forEach((value, key, map) => {
        if (map.get(key).length) {
          document.getElementById(key + 'events2').innerHTML = map.get(key).length + ' selected';
        } else {
          document.getElementById(key + 'events2').innerHTML = '';
        }
        this.filterHandler();
      })
    })
    // initial marking for sports ends
  }

   offlinecheck(value)
  {

    if( this.existingEvents && this.existingEvents.length>0)
    {
      return this.existingEvents.some(item => item.eventid === value.EVENT_ID)

    }
    return false
  }
}
