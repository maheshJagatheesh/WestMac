import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Keyboard, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { GlobalProvider } from '../../providers/global/global';
import { HttpClient, HttpParams } from'@angular/common/http'
import * as $ from 'jquery';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the NewDiscussionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-discussion-list',
  templateUrl: 'new-discussion-list.html',
})
export class NewDiscussionListPage {
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
  afterSearch: any = false;
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


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage:Storage,
    public global: GlobalProvider,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private speechRecognition: SpeechRecognition,
    private toastCtrl: ToastController,
    public gFn:GlobalFunctionsProvider,
    public plt:Platform,
    public keyboard:Keyboard,
    public global_api:GlobalApiProvider
    ) {
      plt.ready().then(()=>{
        plt.registerBackButtonAction(()=>{
          this.navCtrl.pop();
        });
      });
      this.storage.get('loggedInUserData').then((val) => {
        this.loggedInUserData = val;
        //this.selectedTeams.push(val.SELECTEDTEAM);
        this.getDefaultData(this.afterSearch);
        this.getFilterDetails().then((x) => {
          this.checkFilterIsActive();
        });
      });
      this.storage.get('FunctionAccess').then((val)=>{
        this.FunctionAccess=val;
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
        }
      });
      this.storage.get('filterRole').then((val) => {
        if(val != null){
          this.roles = val;
        }
      });
  }

  checkFilterIsActive(){
    setTimeout(() => {
      if($('page-new-discussion-list .filter_overlay .active').length){
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
      this.selectedTeam = val.SELECTEDTEAM;
      this.team_id = val.TEAM_ID;
      this.clientId = val.CLIENT_ID;
      let searchVal:any = $("page-new-discussion-list #search").val();
       let chatData = new HttpParams()
       .set('personId', this.personId)
       .set('teamIds', JSON.stringify(this.selectedTeams))
       .set('roles', JSON.stringify(this.roles))
       .set('app_name', this.global.App_id)
       .set('searchVal', searchVal);
      let loading = this.loadingCtrl.create();
      if(afterSearch == false){
        loading.present();
      }
      this.http.post<any>(this.global.APIURL+'messages/getChatPlayerList', chatData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        if(afterSearch == false){
          loading.dismiss();
        }
        if(response.SUCCESS){
          let chats = response.CHATPLAYERLIST;
          this.chats = [];
          for(var key in chats){
            this.chats.push(chats[key]);
          }
        }
      }, error => {
        if(afterSearch == false){
          loading.dismiss();
        }
      });
      /* let loading1 = this.loadingCtrl.create();
      if(afterSearch == false){
        loading1.present();
      }
      let chatGroupData = new HttpParams()
      .set('person_id', this.personId)
      .set('selectedTeam', this.selectedTeam );
      this.http.post<any>(this.global.APIURL+'messages/getChatGroupsName', chatGroupData)
      .subscribe(response => {
        if(afterSearch == false){
          loading1.dismiss();
        }
        if(response.SUCCESS){
          let chatGroups = response.GETCHATGROUPS;
          this.chatGroups = [];
          for(var key in chatGroups){
            this.chatGroups.push(chatGroups[key]);
          }
        }
      }, error => {
        if(afterSearch == false){
          loading1.dismiss();
        }
      }); */

    });
  }


  goBack() {
    this.navCtrl.pop();
  }
  
  viewChat(group_id,chat_person_name,photoPath,char_Person_id,lastName,ev){
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
      clientId :this.clientId
    };
    this.navCtrl.push('ChatViewPage',{data: chatInfo})
  }
  viewGroupChat(group_id, team_id, group_type, photo, name){
    const chatInfo = {
      from : 1,
      to : 10,
      person_id : this.personId,
      selectedTeam : this.selectedTeam,
      groupid : group_id,
      teamid : team_id,
      grouptype : group_type,
      flag : 1,
      userPhoto: '',
      groupName : name,
      accFirstName : this.firstName,
      accLastName : this.lastName,
      clientId :this.clientId
    };
    this.navCtrl.push('GroupChatViewPage',{data: chatInfo})
  }
  search(event){
    if (event.key === "Enter") {
      return false;
    }

      this.searchData.length = 0;
      let searchVal:any = $("page-new-discussion-list #search").val();

      if ( searchVal.length > 0 && event.key != "Enter"){
        /* let searchData = new HttpParams()
          .set('person_id', this.personId)
          .set('searchVal', searchVal);
        let loading = this.loadingCtrl.create();
        loading.present();
        this.http.post<any>(this.global.APIURL+'messages/getChatGroupsSearch', searchData)
        .subscribe(response => {
          //loading.dismiss();
          if(response.SUCCESS){
            let searchData = response.GETCHATGROUPSSEARCH.GROUPNAME;
            this.searchData = [];
            for(var key in searchData){
              this.searchData.push(searchData[key]);
            }
            this.searchHide = 'none';
            this.searchShow = '';
          }
        }, error => {
          //loading.dismiss();
        }); */

        let chatData = new HttpParams()
          .set('personId', this.personId)
          .set('teamIds', JSON.stringify(this.selectedTeams))
          .set('roles', JSON.stringify(this.roles))
          .set('app_name', this.global.App_id)
          .set('searchVal', searchVal);
        /* let loading2 = this.loadingCtrl.create();
        loading2.present(); */
        this.http.post<any>(this.global.APIURL+'messages/getChatPlayerList', chatData,{headers:this.global_api.getHeader()})
          .subscribe(response => {
            //loading2.dismiss();
            if(response.SUCCESS){
              let chats = response.CHATPLAYERLIST;
              this.chats = [];
              for(var key in chats){
                this.chats.push(chats[key]);
              }
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
      this.getDefaultData(this.afterSearch);
    } 
  }
  clearsearch(){
    if($("page-new-discussion-list #search").val() == "Search"){
      $("page-new-discussion-list #search").val('');
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
                        $("page-new-discussion-list #search").blur();
                        $("page-new-discussion-list #search").val(matches[0]).focus();
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
                              $("page-new-discussion-list #search").blur();
                              $("page-new-discussion-list #search").val(matches[0]).focus();
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

  goToNewDiscussionPage(){
    this.navCtrl.push('NewDiscussionCreatePage');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NewDiscussionListPage');
  }

  ionViewDidEnter() {
    $(document).off('click');
    $(document).click((e) => {
      if(!$(e.target).parents('.filter_overlay').length && (!$(e.target).hasClass('filtter_button') && !$(e.target).find('.filtter_button').length)){
        this.closeFilter();
      }
    });
  }

  onSwipe(event){
    if(event.offsetDirection == 4){
      this.closeFilter();
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

  filterData(){
    this.filtering = true;
    this.sportIds = [];
    let sportIds = [];
    $('page-new-discussion-list .sports.active').each(function() {
      if($(this).prop('id') != 0){
        sportIds.push($(this).prop('id'));
      }
    });
    this.sportIds = sportIds;
    this.divisionIds = [];
    let divisionIds = [];
    $('page-new-discussion-list .division.active').each(function() {
      if($(this).prop('id') != 0){
        divisionIds.push($(this).prop('id'));
      }
    });
    this.divisionIds = divisionIds;
    this.selectedTeams = [];
    let selectedTeams = [];
    $('page-new-discussion-list .team.active').each(function() {
      if($(this).prop('id') != 0){
        selectedTeams.push($(this).prop('id'));
      }
    });
    this.selectedTeams = selectedTeams;
    /* if(!this.selectedTeams.length){
      this.selectedTeams.push(this.loggedInUserData.SELECTEDTEAM);
    } */

    /* this.forGruopTeams = [];
    let forGruopTeams = [];
    $('.team.active').each(function() {
      if($(this).prop('id') != 0){
        forGruopTeams.push($(this).prop('id'));
      }
    });
    this.forGruopTeams = forGruopTeams; */
    /*if(!this.forGruopTeams.length){
      this.forGruopTeams.push(this.loggedInUserData.SELECTEDTEAM);
    }*/
    
    if(!this.client_ids.length){
      this.client_ids.push(this.loggedInUserData.CLIENT_ID);
    }
    if(this.divisionIds.length == 1 && this.divisionIds[0] == '0'){
      this.divisionIds = [];
    }

    this.roles = [];
    let roles = [];
    $('page-new-discussion-list .role.active').each(function() {
      if($(this).prop('id') != 0){
        roles.push($(this).prop('id'));
      }
    });
    this.roles = roles;
    /* if(!this.roles.length){
      if(this.loggedInUserData.roles != undefined){
        this.roles.push(this.loggedInUserData.roles);
      }
    } */
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
    $('.options_wrap .options').on('click',function(){
      $('.options').hide();
      $('.filterBack').show();
      $('.fliter .sub-title').html($(this).find('p').html());
      if($(this).hasClass('sportLink')){
        $('.sportFilter').show();
      } else if($(this).hasClass('divisionLink')){
        $('.divisionFilter').show();
      } else if($(this).hasClass('teamLink')){
        $('.teamFilter').show();
      } else if($(this).hasClass('roleLink')){
        $('.roleFilter').show();
      }
    });
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
      $('.division').click((e) => {
        $('.teamFilter .team').removeClass('active');
        if($(e.target).hasClass('division')){
          $(e.target).toggleClass('active');
          if($(e.target).hasClass('active')){
            $(e.target).parents('.itemListInfo').find('.team').addClass('active');
          }else{
            $(e.target).parents('.itemListInfo').find('.team').removeClass('active');
          }
        }else{
          $(e.target).parent('.division').toggleClass('active');
          if($(e.target).parent('.division').hasClass('active')){
            $(e.target).parents('.itemListInfo').find('.team').addClass('active');
          }else{
            $(e.target).parents('.itemListInfo').find('.team').removeClass('active');
          }
        }
        /* this.divisionIds = [];
        let divisionIds = [];
        $('page-new-discussion-list .division.active').each(function() {
          if($(this).prop('id') != 0){
            divisionIds.push($(this).prop('id'));
          }
        });
        this.divisionIds = divisionIds; */
        this.filterData();
      });
  
      $('.sports').click((e) => {
        $('.teamFilter .team').removeClass('active');
        if($(e.target).hasClass('sports')){
          $(e.target).toggleClass('active');
          if($(e.target).hasClass('active')){
            $(e.target).parents('.itemList').find('.division').addClass('active');
            $(e.target).parents('.itemList').find('.team').addClass('active');
          }else{
            $(e.target).parents('.itemList').find('.division').removeClass('active');
            $(e.target).parents('.itemList').find('.team').removeClass('active');
          }
        }else{
          $(e.target).parent('.sports').toggleClass('active');
          if($(e.target).parent('.sports').hasClass('active')){
            $(e.target).parents('.itemList').find('.division').addClass('active');
            $(e.target).parents('.itemList').find('.team').addClass('active');
          }else{
            $(e.target).parents('.itemList').find('.division').removeClass('active');
            $(e.target).parents('.itemList').find('.team').removeClass('active');
          }
        }
        /* this.sportIds = [];
        let sportIds = [];
        $('page-new-discussion-list .sports.active').each(function() {
          if($(this).prop('id') != 0){
            sportIds.push($(this).prop('id'));
          }
        });
        this.sportIds = sportIds; */
        this.filterData();
      });
  
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
        this.selectedTeams = [];
        let selectedTeams = [];
        $('page-new-discussion-list .team.active').each(function() {
          if($(this).prop('id') != 0){
            selectedTeams.push($(this).prop('id'));
          }
        });
        this.selectedTeams = selectedTeams;
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
        $('page-new-discussion-list .role.active').each(function() {
          if($(this).prop('id') != 0){
            roles.push($(this).prop('id'));
          }
        });
        this.roles = roles;
        this.filterData();
      });
    }
  }

}
