import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Keyboard, ActionSheetController, Platform, AlertController, normalizeURL } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { GlobalProvider } from '../../providers/global/global';
import { HttpClient, HttpParams } from'@angular/common/http'
import * as $ from 'jquery';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
/**
 * Generated class for the ChatDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-chat-dashboard',
  templateUrl: 'chat-dashboard.html',
})
export class ChatDashboardPage{
  personId: any;
  team_id: any;
  selectedTeam: any;
  chats:any[] = [];
  chatGroups:any[] = [];
  firstName:any;
  lastName:any[];
  clientId:any;
  searchData:any[] = [];
  searchHide:any;
  searchShow:any = 'none';
  showHideOverview:any = '';
  chatIcon:any = 'assets/images/chat.png';
  discussions: any[] = [];
  groupPhoto: any ="";
  afterSearch: any = false;
  loadedFunctionCount: number = 0; // all the functions have loaded or not?
  loader: any;
  loadListAsync: any;
  searching: any = false;
  slidingEvent: any = false;
  filtering: any = false;
  sportsList:any;
  divisionList:any;
  leagueList:any;
  teamList:any;
  divisionIds: any = [];
  sportIds: any = [];
  selectedTeams: any = [];
  client_ids: any = [];
  childIds: any = [];
  roles: any = [];
  isFirstFilter: boolean = true;
  loggedInUserData: any;
  FunctionAccess: any;
  isLoaded:boolean = false;
  isOffline:boolean = false;
  isFirst:boolean = true;
  hideTeamChats:any = false;
  selectedFilter: number = 0;
  themeColor: any;
  groupImage: any;
  buckets = new Map();
  divisionBuckets: any = new Map();
  public randomNumber: string = '';
  private personID: string;
  public image : string = '';
  groupId: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage:Storage,
    public global: GlobalProvider,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private speechRecognition: SpeechRecognition,
    private toastCtrl: ToastController,
    public gFn:GlobalFunctionsProvider,
    public keyboard:Keyboard,
    public global_api:GlobalApiProvider,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public platform: Platform,
    private filePath: FilePath,
    private file: File,
    private base64: Base64,
    private alert: AlertController
    ) {

      storage.get('loggedInUserData').then((val) => {
        // console.log(val);
        this.firstName = val.FIRST_NAME.toString().toLocaleUpperCase();
        this.personID = val.PERSON_ID.toString();
        this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
        this.groupImage = val.PHOTOPATH.toString();
        this.image = "http://api-dev.gojaro.com/profileimage/this.profileImage?r=this.randomNumber";
        this.loggedInUserData = val;
        /* set default to hide image selection */
        this.loggedInUserData.HOMESCREEN_BG = 'img-1.jpg';
        this.storage.set('loggedInUserData', this.loggedInUserData);
      });

      this.isFirst = true;
      gFn.showMenuIcon();
      /* $('.tabbar').css('z-index','10')
      $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
      $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected','false')
      $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
      'height': '',
      'color': ''})
      $('.tabs .tab-button[aria-selected=false]:nth-child(4)').attr('aria-selected','true') */
      this.storage.get('loggedInUserData').then((val) => {
        this.loggedInUserData = val;
        this.themeColor = this.loggedInUserData.THEME_BG
        console.log("loginuser-data=-->91",this.loggedInUserData);
        //this.selectedTeams.push(val.SELECTEDTEAM);
        this.getDefaultData(this.afterSearch);
        this.getFilterDetails().then((x) => {
          this.checkFilterIsActive();
        });
        global_api.getUnreadMessageCount(val);
      });
      this.storage.get('FunctionAccess').then((val)=>{
        this.FunctionAccess=val;
        console.log("Function Access Level =-=-> 101",this.FunctionAccess);
      });
      this.storage.get('filterSport').then((val) => {
        if(val != null){
          this.sportIds = val;
        }
      });
      this.storage.get('filterDivision').then((val) => {
        if(val != null){
          this.divisionIds = val;
        }
      });
      this.storage.get('filterTeam').then((val) => {
        if(val != null){
          this.selectedTeams = val;
          this.selectedFilter = this.selectedTeams.length;
        }
      });
      this.storage.get('filterRole').then((val) => {
        if(val != null){
          this.roles = val;
        }
      });
  }

  ionViewDidEnter(){
    if(this.isFirst){
      this.isFirst = false;
    }else{
      this.getDefaultData(true);
    }
    if(typeof this.loadListAsync != 'undefined'){
      this.loadListAsync.unsubscribe();
    }
    this.loadListAsync = Observable.interval(3000).subscribe((val) => {
      if(this.slidingEvent == false){
        this.getDefaultData(true);
      }
    });
    setTimeout(() => {
      this.gFn.statusbarWhite();
    }, 500);
    $(document).off('click');
    $(document).click((e) => {
      if(!$(e.target).parents('.filter_overlay').length && (!$(e.target).hasClass('filtter_button') && !$(e.target).find('.filtter_button').length)){
        this.closeFilter();
      }
    });
  }

  ionViewDidLeave(){
    if(typeof this.loadListAsync != 'undefined'){
      this.loadListAsync.unsubscribe();
    }
    this.gFn.statusbarBlack();
  }

  onSwipe(event){
    if(event.offsetDirection == 4){
      this.closeFilter();
    }
  }

  checkFilterIsActive(){
    setTimeout(() => {
      if($('page-chat-dashboard .filter_overlay .active').length){
        $('.doubleArrow').addClass('active');
      }else{
        $('.doubleArrow').removeClass('active');
      }
    }, 100);
  }

  getDefaultData(afterSearch){
    this.storage.get('loggedInUserData').then((val) => {
      this.firstName = val.FIRST_NAME;
      this.lastName = val.LAST_NAME;
      this.personId = val.PERSON_ID;
      console.log('this.personId', this.personId)
      this.selectedTeam = val.SELECTEDTEAM;
      this.team_id = val.TEAM_ID;
      this.clientId = val.CLIENT_ID;
      let searchVal:any = $("page-chat-dashboard #search").val();
      if(typeof searchVal == 'undefined'){
        searchVal = '';
      }
       let chatData = new HttpParams()
       .set('person_id', this.personId)
       .set('searchVal', searchVal)
       .set('teamIds', JSON.stringify(this.selectedTeams))
       .set('roles', JSON.stringify([]));
      this.http.post<any>(this.global.APIURL+'messages/getSingleAndDiscussionChatList', chatData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        this.loadedFunctionCount += 1;
        this.isOffline = false;
        if(afterSearch == false && this.loadedFunctionCount >= 2){
          this.isLoaded = true;
        }
        if(response.SUCCESS){
          let chats = response.GETCHATLIST;
          this.chats = [];
          for(var key in chats){
            this.chats.push(chats[key]);
          }
         /* let discussions = response.GETDISCUSSIONLIST;
          this.discussions = [];
          for(var key in discussions){
            this.discussions.push(discussions[key]);
          }*/
        }
        this.filtering = false;
      }, error => {
        this.loadedFunctionCount += 1;
        if(afterSearch == false && this.loadedFunctionCount >= 2){
          this.isLoaded = true;
        }
        this.filtering = false;
        this.isOffline = true;
      });
      let chatGroupData = new HttpParams()
      .set('person_id', this.personId)
      .set('searchVal', searchVal)
      .set('hideTeamChats', this.hideTeamChats?'1':'0')
      .set('selectedTeams', JSON.stringify(this.selectedTeams));
      this.http.post<any>(this.global.APIURL+'messages/getChatGroupsName', chatGroupData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        this.isOffline = false;
        this.loadedFunctionCount += 1;
        if(afterSearch == false && this.loadedFunctionCount >= 2){
          this.isLoaded = true;
        }
        if(response.SUCCESS){
          let chatGroups = response.GETCHATGROUPS;
          this.chatGroups = [];
          for(var key in chatGroups){
            this.chatGroups.push(chatGroups[key]);
          }
        }
        this.filtering = false;
        console.log("Chat group data from 268",this.chatGroups);
      }, error => {
        this.loadedFunctionCount += 1;
        if(afterSearch == false && this.loadedFunctionCount >= 2){
          this.isLoaded = true;
        }
        this.filtering = false;
        this.isOffline = true;
      });

    });
  }

  filterData(){
    this.filtering = true;
    this.sportIds = [];
    let sportIds = [];
    $('page-chat-dashboard .sports.active').each(function() {
      if($(this).prop('id') != 0){
        sportIds.push($(this).prop('id'));
      }
    });
    this.sportIds = sportIds;
    this.divisionIds = [];
    let divisionIds = [];
    $('page-chat-dashboard .division.active').each(function() {
      if($(this).prop('id') != 0){
        divisionIds.push($(this).prop('id'));
      }
    });
    this.divisionIds = divisionIds;
    this.selectedTeams = [];
    let selectedTeams = [];
    $('page-chat-dashboard .team.active').each(function() {
      if($(this).prop('id') != 0){
        selectedTeams.push($(this).prop('id'));
      }
    });
    this.selectedTeams = selectedTeams;
    this.selectedFilter = this.selectedTeams.length;
    if(!this.client_ids.length){
      this.client_ids.push(this.loggedInUserData.CLIENT_ID);
    }
    if(this.divisionIds.length == 1 && this.divisionIds[0] == '0'){
      this.divisionIds = [];
    }

    this.roles = [];
    let roles = [];
    $('page-chat-dashboard .role.active').each(function() {
      if($(this).prop('id') != 0){
        roles.push($(this).prop('id'));
      }
    });
    this.roles = roles;    
    this.storage.set('filterSport', this.sportIds);
    this.storage.set('filterDivision', this.divisionIds);
    this.storage.set('filterTeam', this.selectedTeams);
    this.storage.set('filterRole', this.roles);
    this.checkFilterIsActive();
    this.getDefaultData(true);
  }

  getFilterDetails(){
    return new Promise((resolve) => {
      let PlayersData = new HttpParams()
      .set('personId', this.loggedInUserData.PERSON_ID);

    this.http.post(this.global.APIURL+"teams/getFilterDetails", PlayersData,{headers:this.global_api.getHeader()})
      .subscribe((data:any) => {
        if(data.SUCCESS==true) {
          this.sportsList = data.SPORTLIST;
          this.divisionList = data.DIVISIONLIST;
          this.leagueList = data.LEAGUELIST;
          this.teamList = data.TEAMLIST;
          this.markSports();
          resolve(true);
        } else {
          resolve(false)
        }
      }, error => {
        resolve(false);
      });
    });
  }

  showFilter(){
    $('ion-content').addClass('overlay');
    $('page-tabs').addClass('send-back');
    $('.filter_overlay').show();
    $('.sportFilter').show();

    // $('.options_wrap .options:not(.hideTeamChatsLink)').on('click',function(){
    //   $('.options').hide();
    //   $('.filterBack').show();
    //   $('.fliter .sub-title').html($(this).find('p').html());
    //   if($(this).hasClass('sportLink')){
    //     $('.sportFilter').show();
    //   } else if($(this).hasClass('divisionLink')){
    //     $('.divisionFilter').show();
    //   } else if($(this).hasClass('teamLink')){
    //     $('.teamFilter').show();
    //   } else if($(this).hasClass('roleLink')){
    //     $('.roleFilter').show();
    //   }
    // });
    this.filterHandler();
  }

  closeFilter(){
    $('ion-content').removeClass('overlay');
    $('page-tabs').removeClass('send-back');
    $('.filter_overlay, .sportFilter, .divisionFilter, .teamFilter, .roleFilter, .filterBack').hide();
    $('.fliter .sub-title').html('Filter');
    $('.options').show();
  }

  filterBack(){
    $('.filterBack, .sportFilter, .divisionFilter, .teamFilter, .roleFilter').hide();
    $('.fliter .sub-title').html('Filter');
    $('.options').show();
  }

  filterHandler(){
    if(this.isFirstFilter){
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
      //   this.filterData();
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
      //   this.filterData();
      // });
  
      $('.team').click((e) => {
        if($(e.target).parents('.teamFilter').length){
          $('.sportFilter .team').removeClass('active');
        }else{
          $('.teamFilter .team').removeClass('active');
        }
        if($(e.target).hasClass('team')){
          $(e.target).toggleClass('active');
        }else{
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
        this.filterData();
      });
  
      /* $('.childId').click((e) => {
        if($(e.target).hasClass('childId')){
          $(e.target).toggleClass('active');
        }else{
          $(e.target).parent('.childId').toggleClass('active');
        }
        this.childIds = [];
        let childIds = [];
        $('.childId.active').each(function() {
          if($(this).prop('id') != 0){
            childIds.push($(this).prop('id'));
          }
        });
        this.childIds = childIds;
        //this.loadData();
      }); */
  
      $('.role').click((e) => {
        if($(e.target).hasClass('role')){
          $(e.target).toggleClass('active');
        }else{
          $(e.target).parent('.role').toggleClass('active');
        }
        this.roles = [];
        let roles = [];
        $('page-chat-dashboard .role.active').each(function() {
          if($(this).prop('id') != 0){
            roles.push($(this).prop('id'));
          }
        });
        this.roles = roles;
        this.filterData();
      });
    }
  }

  /*getToday(){
    var currentDate = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = currentDate.getDate() + ' ' + months[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
    return today;
  }
  getYesterday(){
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var yesterday = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    return yesterday;
  }*/

  goToChooseTeamsPage() {
    this.navCtrl.push('ChooseTeamProfilePage').then(()=>{
      /* $('.tabs .tab-button[aria-selected=true]:nth-child(4)').attr('aria-selected','false'); */
    });
  }

  viewChat(group_id,chat_person_name,photoPath,char_Person_id,lastName,isBlocked,ev){

    if($(ev.target).hasClass('select-card') == false){
      $(ev.target).parents(".select-card").addClass("active");
      setTimeout(function(){
        $(ev.target).parents(".select-card").removeClass("active");
      }, 500);
    }else{
      $(ev.target).addClass("active");
      setTimeout(function(){
        $(ev.target).removeClass("active");
      }, 500);
    }

    const chatInfo = {
      from : 1,
      to : 10,
      person_id : this.personId,
      group_id : "0",
      receiver_name : chat_person_name,
      receiver_last_name : lastName,
      receiver_id : char_Person_id,
      selectedTeam : this.selectedTeam,
      teamid : this.team_id,
      flag : 1,
      userPhoto: photoPath,
      accFirstName : this.firstName,
      accLastName : this.lastName,
      isBlocked: isBlocked,
      clientId :this.clientId
    };
    this.navCtrl.push('ChatViewPage',{data: chatInfo})
  }
  viewGroupChat(group_id, team_id, group_type, photo, name,groupContactId,gourpIcon,ev){

    if(groupContactId == ''){
      if($(ev.target).hasClass('select-card') == false){
        $(ev.target).parents(".select-card").addClass("active");
        setTimeout(function(){
          $(ev.target).parents(".select-card").removeClass("active");
        }, 500);
      }else{
        $(ev.target).addClass("active");
        setTimeout(function(){
          $(ev.target).removeClass("active");
        }, 500);
      }
    }else{
      if($(ev.target).hasClass('select-card') == false){
        $(ev.target).parents(".select-card").addClass("active");
        setTimeout(function(){
          $(ev.target).parents(".select-card").removeClass("active");
        }, 500);
      }else{
        $(ev.target).addClass("active");
        setTimeout(function(){
          $(ev.target).removeClass("active");
        }, 500);
      }
    }

    const chatInfo = {
      from : 1,
      to : 10,
      person_id : this.personId,
      selectedTeam : this.selectedTeam,
      groupid : group_id,
      teamid : this.selectedTeam,
      grouptype : group_type,
      flag : 1,
      userPhoto: photo,
      groupName : name,
      accFirstName : this.firstName,
      accLastName : this.lastName,
      clientId :this.clientId,
      groupContactId : groupContactId,
      gourpIcon : gourpIcon
    };
    this.navCtrl.push('GroupChatViewPage',{data: chatInfo})
  }
  search(event){
    if (event.key === "Enter") {
      return false;
    }
    this.searching = true;
    this.searchData.length = 0;
    let searchVal:any = $("page-chat-dashboard #search").val();

    if ( searchVal.length > 0 && event.key != "Enter"){
      let searchData = new HttpParams()
        .set('person_id', this.personId)
        .set('searchVal', searchVal)
        .set('hideTeamChats', this.hideTeamChats?'1':'0')
        .set('selectedTeams', JSON.stringify(this.selectedTeams));
      /* let loading = this.loadingCtrl.create();
      loading.present(); */
      this.http.post<any>(this.global.APIURL+'messages/getChatGroupsName', searchData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        //loading.dismiss();
        if(response.SUCCESS){
          /* let searchData = response.GETCHATGROUPSSEARCH.GROUPNAME;
          this.searchData = [];
          for(var key in searchData){
            this.searchData.push(searchData[key]);
          }
          this.searchHide = 'none';
          this.searchShow = ''; */
          let chatGroups = response.GETCHATGROUPS;
          this.chatGroups = [];
          for(var key in chatGroups){
            this.chatGroups.push(chatGroups[key]);
          }
        }
      }, error => {
        //loading.dismiss();
      });

      let chatData = new HttpParams()
        .set('person_id', this.personId)
        .set('searchVal', searchVal)
        .set('teamIds', JSON.stringify(this.selectedTeams))
        .set('roles', JSON.stringify([]));
      /* let loading2 = this.loadingCtrl.create();
      loading2.present(); */
      this.http.post<any>(this.global.APIURL+'messages/getSingleAndDiscussionChatList', chatData,{headers:this.global_api.getHeader()})
        .subscribe(response => {
          //loading2.dismiss();
          if(response.SUCCESS){
            let chats = response.GETCHATLIST;
            this.chats = [];
            for(var key in chats){
              this.chats.push(chats[key]);
            }
           /* let discussions = response.GETDISCUSSIONLIST;
            this.discussions = [];
            for(var key in discussions){
              this.discussions.push(discussions[key]);
            }*/
          }
        }, error => {
          //loading2.dismiss();
        });
    } else if(event.key === "Enter") {
      return false;
    }else if(searchVal.length == 0 && event.key != "Enter"){
      this.searchHide = '';
      this.searchShow = 'none';
      this.afterSearch = true;
      this.searching = false;
      this.getDefaultData(this.afterSearch);
    }
  }
  clearsearch(){
    if($("page-chat-dashboard #search").val() == "Search"){
      $("page-chat-dashboard #search").val('');
    }
  }

  toggleOverview(){
    if(this.showHideOverview == ''){
      this.showHideOverview = 'none';
      this.chatIcon = 'assets/images/chat-black.png';
    } else if(this.showHideOverview != ''){
      this.showHideOverview = '';
      this.chatIcon = 'assets/images/chat.png';
    }
  }

  listen(){
    // Check feature available
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => {
        if(available){
          // Check permission
          this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if(hasPermission){
                  this.speechRecognition.startListening()
                    .subscribe(
                      (matches: Array<string>) => {
                        $("page-chat-dashboard #search").blur();
                        $("page-chat-dashboard #search").val(matches[0]).focus();
                      },
                      (onerror) => console.log('error:', onerror)
                    )
                }else{
                  // Request permissions
                  this.speechRecognition.requestPermission()
                    .then(
                      () => {
                        this.gFn.presentToast('Request Granted');
                        this.speechRecognition.startListening()
                          .subscribe(
                            (matches: Array<string>) => {
                              $("page-chat-dashboard #search").blur();
                              $("page-chat-dashboard #search").val(matches[0]).focus();
                            },
                            (onerror) => console.log('error:', onerror)
                          );
                      },
                      () => this.gFn.presentToast('Request Denied')
                    )
                }
              }
            )
        }else{
          this.gFn.presentToast('Speech recognition not available');
        }
      });
  }

  goToNewDiscussionCreatePage(){
    this.navCtrl.push('NewDiscussionListPage');
  }

  deletedDiscussionGroup(GROUPID){
    let deletedDiscussion = new HttpParams()
    .set('group_id', GROUPID);
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL+'messages/deleteChatGroup', deletedDiscussion,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      loading.dismiss();
      if(response.SUCCESS){
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }else{
        this.gFn.presentToast('Problem in group delete');
      }
    });
  }

  leaveDiscussion(dis_group_Id,groupContactId){

    let leaveDiscussion = new HttpParams()
    .set('groupContactId', groupContactId)
    .set('client_id', this.clientId)
    .set('selectedTeam', this.selectedTeam)
    .set('group_id', dis_group_Id)
    .set('team_id', this.selectedTeam)
    .set('player_ids', JSON.stringify([]));

    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post<any>(this.global.APIURL+'messages/removePlayerFromGroup', leaveDiscussion,{headers:this.global_api.getHeader()})
    .subscribe(response => {
      loading.dismiss();
      if(response.SUCCESS){
        this.slidingEvent = false;
        this.gFn.presentToast('Group leave successful.');
      }else{
        this.gFn.presentToast('Problem in group Leave.');
      }
    });
  }

  slidingOnOff(ev){
    let percent = ev.getSlidingPercent();
    if (percent >= 1 || percent <= -1) {
      this.slidingEvent = true;
    }else {
      this.slidingEvent = false;
    }
  }

  mBottom: string = "";
  keyboardCheck() {
    if (this.mBottom == "") {
      this.mBottom = $(".scroll-content").css("margin-bottom");
    }
    if (this.keyboard.isOpen()) {
      $(".scroll-content").css("margin-bottom", "0");
      this.gFn.hideMenuIcon();
    }
    else {
      $(".scroll-content").css("margin-bottom", '56px');
      this.gFn.showMenuIcon();
    }
  }
  
  inputFocus() {
    this.keyboardCheck()
  }

  inputBlur() {
    this.keyboardCheck()
  }


  settingGroupIcon(group_id){
    console.log("Setting group icon",group_id);
    this.groupId = group_id;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'From Gallery',
          icon: 'cloud-upload',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'From Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close-circle',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 30,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast(err);
    });
  }

  //Showing Toaster
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  //Creating file name 
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }


  //Copying file to local dribe 
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.groupImage = newFileName;
      this.uploadImage();
    }, error => {
      this.presentToast(error);
    });
  }

  //uploading image 
  uploadImage() {
    let targetPath = normalizeURL(this.pathForImage(this.groupImage));
    this.base64.encodeFile(targetPath).then((base64File: string) => {
      this.uploadPhoto(encodeURIComponent(base64File));
    }, (err) => {
      this.presentAlert('Error','Sorry, image upload error.');
    });
  }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
      if (img === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + img;
      }
    }

    //uploading piture
    uploadPhoto(groupImage) {
      this.groupImage = '';
      this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
      let loading = this.loadingCtrl.create();
      loading.present();
      let data = new HttpParams()
        .set('group_id', this.groupId)
        .set('image', groupImage);
      this.http.post<any>(this.global.APIURL + 'messages/groupChatImageUpload', data)
        .subscribe(response => {
          loading.dismiss();
          // this.groupImage = this.personID + '.jpg';
          // if (response.SUCCESS) {
          //   this.loggedInUserData['PHOTOPATH'] = this.groupImage;
          //   this.storage.set('loggedInUserData', this.loggedInUserData);
          // } else {
          //   this.presentAlert('Error','Sorry, image upload error.');
          // }
        }, error => {
          loading.dismiss();
          // this.groupImage = this.personID + '.jpg';
          this.presentAlert('Error','Sorry, image upload error.');
        });
    }

    presentAlert(Title,SubTitle) {
      let alert = this.alert.create({
        title: Title,
        subTitle: SubTitle,
        buttons: ['Dismiss']
      });
      alert.present(alert);
    }
  

          //open sublist starts
  openSublist(i){
    console.log("Getting Id ",'#fun'+i);
    var id : string = ("#fun").concat(i);
    $(id).toggle();
  }

  openSportsList(sportName,divisionName,j){
    // var id = ("#fun4").concat(j);
    var id =("#funy4".concat(sportName).concat(divisionName).concat(j));
    $(id).toggle();
  }

  //open sublist ends
  
     //marking
     marking(sportsId,teamId,divisionId){
      //Marking for division starts
      if(this.divisionBuckets.has(divisionId)){
        if(this.divisionBuckets.get(divisionId).indexOf(teamId) === -1){
        this.divisionBuckets.get(divisionId).push(teamId);
        }else{
          this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId),1)
        }
      }else{
        this.divisionBuckets.set(divisionId,[])
        if(this.divisionBuckets.get(divisionId).indexOf(teamId) === -1){
          this.divisionBuckets.get(divisionId).push(teamId);
          }else{
            this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId),1)
          }
      }
      this.divisionBuckets.forEach((value, key, map) => {
        if(map.get(key).length){
          document.getElementById(key+'chat').innerHTML = map.get(key).length;
        }else{
          document.getElementById(key+'chat').innerHTML = '';
        }
        this.filterHandler();
      })
  
     var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
     this.storage.set('divisionBuckets',jsonText2)
      //Marking for division starts

      //Marking for sports starts
      if(this.buckets.has(sportsId)){
        if(this.buckets.get(sportsId).indexOf(teamId) === -1){
        this.buckets.get(sportsId).push(teamId);
        }else{
          this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId),1)
        }
      }else{
        this.buckets.set(sportsId,[])
        if(this.buckets.get(sportsId).indexOf(teamId) === -1){
          this.buckets.get(sportsId).push(teamId);
          }else{
            this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId),1)
          }
      }
      this.buckets.forEach((value, key, map) => {
        if(map.get(key).length){
          document.getElementById(key+'chat').innerHTML = map.get(key).length+' selected';
        }else{
          document.getElementById(key+'chat').innerHTML = '';
        }
        this.filterHandler();
      })
  
     var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
     this.storage.set('bucket',jsonText)
      //Marking for sports starts
    }
  
    //initial marking
    markSports(){
      //initial Marking for division starts
      this.storage.get("divisionBuckets").then((val)=>{
        this.divisionBuckets = new Map(JSON.parse(val));
        this.divisionBuckets.forEach((value, key, map) => {
          if(map.get(key).length){
            document.getElementById(key+'chat').innerHTML = map.get(key).length;
          }else{
            document.getElementById(key+'chat').innerHTML = '';
          }
          this.filterHandler();
        })
        // console.log("gettinh new data",this.buckets);
      })
      //initial Marking for division ends

      //initial Marking for sports starts
      this.storage.get("bucket").then((val)=>{
        this.buckets = new Map(JSON.parse(val));
        this.buckets.forEach((value, key, map) => {
          if(map.get(key).length){
            document.getElementById(key+'chat').innerHTML = map.get(key).length+' selected';
          }else{
            document.getElementById(key+'chat').innerHTML = '';
          }
          this.filterHandler();
        })
        // console.log("gettinh new data",this.buckets);
      })
      //initial Marking for sports ends
    }
}
