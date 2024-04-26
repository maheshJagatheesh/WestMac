import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Content,ToastController,ModalController, Keyboard } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

import {Tabs} from "ionic-angular";
/**
 * Generated class for the PlayersDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-players-dashboard',
  templateUrl: 'players-dashboard.html',
})
export class PlayersDashboardPage{
  public loggedInUserData: any;
  public players: any[] = [];
  public activePlayer: string = '';
  isLoaded:boolean = false;
  isOffline:boolean = false;
  searching:boolean = false;
  searchVal: any = '';
  @ViewChild(Content) content: Content;
  ShowSeverityPage:boolean=false
  FunctionAccess:any;
  medicalInfo: boolean=false;
  PlayerDetailSuccess:any;
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
  selectedFilter: number = 0;
  theme: any;
  isEnabled: boolean;
  buckets = new Map();
  divisionBuckets: any = new Map();
  playerDetailsData: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private events: Events, private http: HttpClient, private loadingCtrl: LoadingController,
     public global: GlobalProvider, public gFn:GlobalFunctionsProvider,public modalCtrl:ModalController,public toastCtrl:ToastController, public keyboard:Keyboard,public global_api:GlobalApiProvider) {
      //$('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
      /* $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected','false')
      $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
      'height': '',
      'color': ''})
      $('.tabs .tab-button[aria-selected=false]:nth-child(3)').attr('aria-selected','true') */
      gFn.showMenuIcon();
    this.storage.set('BackButton',false);
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      console.log("data of logged in user 62",this.loggedInUserData);
      this.theme = this.loggedInUserData.THEME_BG;
      this.loadPlayers();
      this.getFilterDetails().then((x) => {
        this.checkFilterIsActive();
      });
    });
    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
      console.log("Access level",this.FunctionAccess);
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
    this.storage.get('filterChild').then((val) => {
      if(val != null){
        this.childIds = val;
      }
    });
    /* this.storage.get('filterRole').then((val) => {
      if(val != null){
        this.roles = val;
      }
    }); */
  }


  ionViewDidLeave(){
    this.gFn.statusbarBlack();
  }
  
  ionViewDidEnter() {
    setTimeout(() => {
      this.gFn.statusbarWhite();
      this.gFn.showMenuIcon();
    }, 500);
    $(document).off('click');
    $(document).click((e) => {
      if(!$(e.target).parents('.filter_overlay').length && (!$(e.target).hasClass('filtter_button') && !$(e.target).find('.filtter_button').length)){
        this.closeFilter();
      }
    });
  }

  goToChooseTeamsPage(){
    this.navCtrl.push('ChooseTeamProfilePage').then(()=>{
      /* $('.tabs .tab-button[aria-selected=true]:nth-child(3)').attr('aria-selected','false') */
    });
  }

  checkFilterIsActive(){
    setTimeout(() => {
      if($('page-players-dashboard .filter_overlay .active').length){
        $('.doubleArrow').addClass('active');
      }else{
        $('.doubleArrow').removeClass('active');
      }
    }, 100);
  }

  loadPlayers() {
    this.storage.get('loggedInUserData').then((val) => {
      /* let loading = this.loadingCtrl.create();
      loading.present(); */
      let data = new HttpParams()
        .set('club_division_id', this.loggedInUserData.SELECTEDTEAM)
        .set('client_id', this.loggedInUserData.CLIENT_ID)
        .set('personId', this.loggedInUserData.PERSON_ID)
        .set('teamIds', JSON.stringify(this.selectedTeams))
        .set('app_name', this.global.App_id)
        .set('searchVal', this.searchVal);
      this.http.post<any>(this.global.APIURL + 'players/getTeamPlayers', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        //loading.dismiss();
        if (response.SUCCESS) {
          this.players = [];
          let players = this.events.publish('json:query', response.GETTEAMPLAYERS);
          players = players[0];
          for (var key in players) {
            if(this.FunctionAccess.view_other_players == 'no' && this.FunctionAccess.user_adminLevel == '4')
            {
              if(players[key].PERSON_ID==this.loggedInUserData.PERSON_ID){
                this.players.unshift(players[key]);
              }
            }
            if(this.FunctionAccess.view_other_players == 'yes' && this.FunctionAccess.user_adminLevel == '4')
            {
              this.players.push(players[key]);
            }

            if(this.FunctionAccess.user_adminLevel != '4')
            {
              this.players.push(players[key]);
            }
           
            // else{
            //   this.players.push(players[key]);
            // }
            
          }
        }
        this.PlayerDetailSuccess=true;
        this.isOffline = false;
        this.isLoaded = true;
      }, error => {
        //loading.dismiss();
        this.PlayerDetailSuccess=true;
        this.isOffline = true;
        this.isLoaded = false;
      });
    });
  }

  search(event){
    if (event.key === "Enter") {
      return false;
    }
    this.searching = true;
    this.searchVal = $("page-players-dashboard #search").val();
    console.log("serch value ", this.searchVal);
    if ( this.searchVal.length > 0 && event.key != "Enter"){
      this.loadPlayers();
    } else if(event.key === "Enter") {
      return false;
    }else if(this.searchVal.length == 0 && event.key != "Enter"){
      this.searching = true;
      this.loadPlayers();
    }
  }

  clearsearch(){
    if($("page-players-dashboard #search").val() == "Search"){
      $("page-players-dashboard #search").val('');
    }
  }

  tryAgain(){
    this.loadPlayers();
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
    this.sportIds = [];
    let sportIds = [];
    $('page-players-dashboard .sports.active').each(function() {
      if($(this).prop('id') != 0){
        sportIds.push($(this).prop('id'));
      }
    });
    this.sportIds = sportIds;
    this.divisionIds = [];
    let divisionIds = [];
    $('page-players-dashboard .division.active').each(function() {
      if($(this).prop('id') != 0){
        divisionIds.push($(this).prop('id'));
      }
    });
    this.divisionIds = divisionIds;
    this.selectedTeams = [];
    let selectedTeams = [];
    $('page-players-dashboard .team.active').each(function() {
      if($(this).prop('id') != 0){
        selectedTeams.push($(this).prop('id'));
      }
    });
    this.selectedTeams = selectedTeams;
    this.selectedFilter = this.selectedTeams.length; 
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

    /* this.roles = [];
    let roles = [];
    $('page-players-dashboard .role.active').each(function() {
      if($(this).prop('id') != 0){
        roles.push($(this).prop('id'));
      }
    });
    this.roles = roles; */
    /* if(!this.roles.length){
      if(this.loggedInUserData.roles != undefined){
        this.roles.push(this.loggedInUserData.roles);
      }
    } */
    this.storage.set('filterSport', this.sportIds);
    this.storage.set('filterDivision', this.divisionIds);
    this.storage.set('filterTeam', this.selectedTeams);
    this.storage.set('filterChild', this.childIds);
    //this.storage.set('filterRole', this.roles);
    this.checkFilterIsActive();
    this.loadPlayers();
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

  showFilter(){
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
    //$('.filter_overlay').hide();
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
        this.selectedTeams = [];
        let selectedTeams = [];
        $('page-players-dashboard .team.active').each(function() {
          if($(this).prop('id') != 0){
            selectedTeams.push($(this).prop('id'));
          }
        });
        this.selectedTeams = selectedTeams;
        this.filterData();
      });
  
      $('.childId').click((e) => {
        if($(e.target).hasClass('childId')){
          //$('.childId').not($(e.target)).removeClass('active');
          $(e.target).toggleClass('active');
        }else{
          //$('.childId').not($(e.target).parent('.childId')).removeClass('active');
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
        this.filterData();
      });
  
      /* $('.role').click((e) => {
        if($(e.target).hasClass('role')){
          $(e.target).toggleClass('active');
        }else{
          $(e.target).parent('.role').toggleClass('active');
        }
        this.roles = [];
        let roles = [];
        $('page-players-dashboard .role.active').each(function() {
          if($(this).prop('id') != 0){
            roles.push($(this).prop('id'));
          }
        });
        this.roles = roles;
        this.filterData();
      }); */
    }
  }

  playerDetails(personID) {
    if(this.ShowSeverityPage==false && !this.medicalInfo){
      let isChild = false;
      if(this.loggedInUserData.ISPARENT) {
        for(var key in this.loggedInUserData.siblings){
          if(this.loggedInUserData.siblings[key].person_id == personID){
            isChild = true;
            break;
          }
        }
      }
      // (!this.loggedInUserData.ISPARENT || (this.loggedInUserData.ISPARENT && isChild))
      if(parseInt(this.loggedInUserData.PERSON_ID)==parseInt(personID) || (this.FunctionAccess.user_adminLevel!=4 || this.FunctionAccess.view_other_players == 'no')) {
        this.activePlayer = personID;
        setTimeout(() => {
          this.navCtrl.push('PlayerDetailsPage', {playerID: personID});
          this.activePlayer = '';
        }, 300);
      }
      else{
        this.gFn.presentToast('Access Denied')
      }

    }
    else{
      this.ShowSeverityPage=false;
    }
    
  }
  DisplaySeverityDetails(playerAilments){
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', playerAilments.PERSON_ID);
    this.http.post<any>(this.global.APIURL + 'players/getPersonDetails', data)
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          this.playerDetailsData = response.GETPERSONDETAILS;
          this.getMedicalHistory(this.playerDetailsData[0]['person_id']);
          // this.navCtrl.push('PlayerMedicalRecordsPage', {playerDetails: playerDetails});
        }   
      }, error => {
        loading.dismiss();
      });
    // this.ShowSeverityPage=true;
    // if(playerAilments){
    //   let SeverityModal = this.modalCtrl.create('SeverityDetailsModalPage', { playerAilments: playerAilments });
    //   SeverityModal.present();

    // }
    // else{
    //   this.presentToast('No Details found')
    // }
  }

    //getting Medical History Details start
    getMedicalHistory(playerId) {
      return new Promise((resolve) => {
        let PlayersData = new HttpParams()
          .set('person_id', playerId);
  
        this.http.post(this.global.APIURL + "players/getMedicalHistoryDetails", PlayersData)
          .subscribe((data: any) => {
            if (data.GETMEDICALHISTORYDETAILS) {
              var medicalHistoryDetails = this.events.publish('json:query', data.GETMEDICALHISTORYDETAILS)[0][0];
              this.playerDetailsData[0]['medical_history'] = medicalHistoryDetails;
             this.navCtrl.push('PlayerMedicalRecordsPage', {playerDetails: this.playerDetailsData});
            }
            resolve(true);
          }, error => {
            console.log(error);
            resolve(false);
          });
  
  
      });
    }
    //getting Medical History Details ends

  MedicineInformation(data){
    this.medicalInfo=true;
		let MedicineInfo = this.modalCtrl.create('MedicineInfoPage', {values:data});
    MedicineInfo.present();
    MedicineInfo.onDidDismiss(()=>{
      this.medicalInfo=false;
    })
	}
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


//filter for admin starts
openSublist(i){
  console.log("Getting Id ",'#fun2'+i);
  var id :string = ("#fun2").concat(i);
  $(id).toggle();
}

openSportsList(sportName,divisionName,j){
  // var id = ("#fun3").concat(j);
  var id =("#funys".concat(sportName).concat(divisionName).concat(j));
  $(id).toggle();
}
//filter for admin ends

// filter for coach starts
openSublist2(j){
  console.log("Getting Id ",'#coachlist'+j);
  var id = ("#coachlist").concat(j);
  $(id).toggle();
}


openSportsList2(sportName,divisionName,i){
  // var id = ("#coachlist2").concat(j);
  var id = ("#coachlists".concat(sportName).concat(divisionName).concat(i));
  $(id).toggle();
}
// filter for coach ends


      //marking data
      marking(sportsId,teamId,divisionId){

        //Marking division starts =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=->
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
            document.getElementById(key+'player').innerHTML = map.get(key).length;
          }else{
            document.getElementById(key+'player').innerHTML = '';
          }
          this.filterHandler();
        })
    
        var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
        this.storage.set('divisionBuckets',jsonText2)
        //Marking division ends =-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=--=-=-=---=-=-=>

        //Marking sports starts =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=---=--=--=-=-=->
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
            document.getElementById(key+'player').innerHTML = map.get(key).length+' selected';
          }else{
            document.getElementById(key+'player').innerHTML = '';
          }
          this.filterHandler();
        })
    
        var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
        this.storage.set('bucket',jsonText)
        //Marking sports ends =-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->

      }
    
      marking2(sportsId,teamId,divisionId){

            //Marking division starts =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=->
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
                document.getElementById(key+'player2').innerHTML = map.get(key).length;
              }else{
                document.getElementById(key+'player2').innerHTML = '';
              }
              this.filterHandler();
            })
        
            var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
            this.storage.set('divisionBuckets',jsonText2)
            //Marking division ends =-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=--=-=-=---=-=-=>

        //marking for sports starts 
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
            document.getElementById(key+'player2').innerHTML = map.get(key).length+' selected';
          }else{
            document.getElementById(key+'player2').innerHTML = '';
          }
          this.filterHandler();
        })
    
        var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
        this.storage.set('bucket',jsonText)
        //marking for sports ends 

      }
       
      //initial marking
        markSports(){
          //initial Marking for division starts
          this.storage.get("divisionBuckets").then((val)=>{
            this.divisionBuckets = new Map(JSON.parse(val));
            console.log("getting data from 96",this.divisionBuckets);
            this.divisionBuckets.forEach((value, key, map) => {
              if(map.get(key).length){
                document.getElementById(key+'player').innerHTML = map.get(key).length;
              }else{
                document.getElementById(key+'player').innerHTML = '';
              }
              this.filterHandler();
            })
          })
          //initial Marking for division ends

          //Inital Mraking for sports starts
          this.storage.get("bucket").then((val)=>{
            this.buckets = new Map(JSON.parse(val));
            console.log("getting data from 96",this.buckets);
            this.buckets.forEach((value, key, map) => {
              if(map.get(key).length){
                document.getElementById(key+'player').innerHTML = map.get(key).length+' selected';
              }else{
                document.getElementById(key+'player').innerHTML = '';
              }
              this.filterHandler();
            })
          })
          //Inital Mraking for sports ends

        }

        markSports2(){

          //initial Marking for division starts
          this.storage.get("divisionBuckets").then((val)=>{
            this.divisionBuckets = new Map(JSON.parse(val));
            console.log("getting data from 96",this.divisionBuckets);
            this.divisionBuckets.forEach((value, key, map) => {
              if(map.get(key).length){
                document.getElementById(key+'player2').innerHTML = map.get(key).length;
              }else{
                document.getElementById(key+'player2').innerHTML = '';
              }
              this.filterHandler();
            })
          })
          //initial Marking for division ends

          //initial Marking for sports starts
          this.storage.get("bucket").then((val)=>{
            this.buckets = new Map(JSON.parse(val));
            console.log("getting data from 96",this.buckets);
            this.buckets.forEach((value, key, map) => {
              if(map.get(key).length){
                document.getElementById(key+'player2').innerHTML = map.get(key).length+' selected';
              }else{
                document.getElementById(key+'player2').innerHTML = '';
              }
              this.filterHandler();
            })
          })
          //initial Marking for sports ends

        }
}
