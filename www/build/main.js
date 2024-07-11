webpackJsonp([106],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayersDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the PlayersDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlayersDashboardPage = /** @class */ (function () {
    function PlayersDashboardPage(navCtrl, navParams, storage, events, http, loadingCtrl, global, gFn, modalCtrl, toastCtrl, keyboard, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.gFn = gFn;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.keyboard = keyboard;
        this.global_api = global_api;
        this.players = [];
        this.activePlayer = '';
        this.isLoaded = false;
        this.isOffline = false;
        this.searching = false;
        this.searchVal = '';
        this.ShowSeverityPage = false;
        this.medicalInfo = false;
        this.divisionIds = [];
        this.sportIds = [];
        this.selectedTeams = [];
        this.client_ids = [];
        this.childIds = [];
        this.roles = [];
        this.isFirstFilter = true;
        this.selectedFilter = 0;
        this.buckets = new Map();
        this.divisionBuckets = new Map();
        this.mBottom = "";
        //$('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
        /* $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected','false')
        $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
        'height': '',
        'color': ''})
        $('.tabs .tab-button[aria-selected=false]:nth-child(3)').attr('aria-selected','true') */
        gFn.showMenuIcon();
        this.storage.set('BackButton', false);
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            console.log("data of logged in user 62", _this.loggedInUserData);
            _this.theme = _this.loggedInUserData.THEME_BG;
            _this.loadPlayers();
            _this.getFilterDetails().then(function (x) {
                _this.checkFilterIsActive();
            });
        });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
            console.log("Access level", _this.FunctionAccess);
        });
        this.storage.get('filterSport').then(function (val) {
            if (val != null) {
                _this.sportIds = val;
            }
        });
        this.storage.get('filterDivision').then(function (val) {
            if (val != null) {
                _this.divisionIds = val;
            }
        });
        this.storage.get('filterTeam').then(function (val) {
            if (val != null) {
                _this.selectedTeams = val;
                _this.selectedFilter = _this.selectedTeams.length;
            }
        });
        this.storage.get('filterChild').then(function (val) {
            if (val != null) {
                _this.childIds = val;
            }
        });
        /* this.storage.get('filterRole').then((val) => {
          if(val != null){
            this.roles = val;
          }
        }); */
    }
    PlayersDashboardPage.prototype.ionViewDidLeave = function () {
        this.gFn.statusbarBlack();
    };
    PlayersDashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.gFn.statusbarWhite();
            _this.gFn.showMenuIcon();
        }, 500);
        $(document).off('click');
        $(document).click(function (e) {
            if (!$(e.target).parents('.filter_overlay').length && (!$(e.target).hasClass('filtter_button') && !$(e.target).find('.filtter_button').length)) {
                _this.closeFilter();
            }
        });
    };
    PlayersDashboardPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage').then(function () {
            /* $('.tabs .tab-button[aria-selected=true]:nth-child(3)').attr('aria-selected','false') */
        });
    };
    PlayersDashboardPage.prototype.checkFilterIsActive = function () {
        setTimeout(function () {
            if ($('page-players-dashboard .filter_overlay .active').length) {
                $('.doubleArrow').addClass('active');
            }
            else {
                $('.doubleArrow').removeClass('active');
            }
        }, 100);
    };
    PlayersDashboardPage.prototype.loadPlayers = function () {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            /* let loading = this.loadingCtrl.create();
            loading.present(); */
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('club_division_id', _this.loggedInUserData.SELECTEDTEAM)
                .set('client_id', _this.loggedInUserData.CLIENT_ID)
                .set('personId', _this.loggedInUserData.PERSON_ID)
                .set('teamIds', JSON.stringify(_this.selectedTeams))
                .set('app_name', _this.global.App_id)
                .set('searchVal', _this.searchVal);
            _this.http.post(_this.global.APIURL + 'players/getTeamPlayers', data, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                //loading.dismiss();
                if (response.SUCCESS) {
                    _this.players = [];
                    var players = _this.events.publish('json:query', response.GETTEAMPLAYERS);
                    players = players[0];
                    for (var key in players) {
                        if (_this.FunctionAccess.view_other_players == 'no' && _this.FunctionAccess.user_adminLevel == '4') {
                            if (players[key].PERSON_ID == _this.loggedInUserData.PERSON_ID) {
                                _this.players.unshift(players[key]);
                            }
                        }
                        if (_this.FunctionAccess.view_other_players == 'yes' && _this.FunctionAccess.user_adminLevel == '4') {
                            _this.players.push(players[key]);
                        }
                        if (_this.FunctionAccess.user_adminLevel != '4') {
                            _this.players.push(players[key]);
                        }
                        // else{
                        //   this.players.push(players[key]);
                        // }
                    }
                }
                _this.PlayerDetailSuccess = true;
                _this.isOffline = false;
                _this.isLoaded = true;
            }, function (error) {
                //loading.dismiss();
                _this.PlayerDetailSuccess = true;
                _this.isOffline = true;
                _this.isLoaded = false;
            });
        });
    };
    PlayersDashboardPage.prototype.search = function (event) {
        if (event.key === "Enter") {
            return false;
        }
        this.searching = true;
        this.searchVal = $("page-players-dashboard #search").val();
        console.log("serch value ", this.searchVal);
        if (this.searchVal.length > 0 && event.key != "Enter") {
            this.loadPlayers();
        }
        else if (event.key === "Enter") {
            return false;
        }
        else if (this.searchVal.length == 0 && event.key != "Enter") {
            this.searching = true;
            this.loadPlayers();
        }
    };
    PlayersDashboardPage.prototype.clearsearch = function () {
        if ($("page-players-dashboard #search").val() == "Search") {
            $("page-players-dashboard #search").val('');
        }
    };
    PlayersDashboardPage.prototype.tryAgain = function () {
        this.loadPlayers();
    };
    PlayersDashboardPage.prototype.onSwipe = function (event) {
        if (event.offsetDirection == 4) {
            this.closeFilter();
        }
    };
    PlayersDashboardPage.prototype.keyboardCheck = function () {
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
    };
    PlayersDashboardPage.prototype.inputFocus = function () {
        this.keyboardCheck();
    };
    PlayersDashboardPage.prototype.inputBlur = function () {
        this.keyboardCheck();
    };
    PlayersDashboardPage.prototype.filterData = function () {
        this.sportIds = [];
        var sportIds = [];
        $('page-players-dashboard .sports.active').each(function () {
            if ($(this).prop('id') != 0) {
                sportIds.push($(this).prop('id'));
            }
        });
        this.sportIds = sportIds;
        this.divisionIds = [];
        var divisionIds = [];
        $('page-players-dashboard .division.active').each(function () {
            if ($(this).prop('id') != 0) {
                divisionIds.push($(this).prop('id'));
            }
        });
        this.divisionIds = divisionIds;
        this.selectedTeams = [];
        var selectedTeams = [];
        $('page-players-dashboard .team.active').each(function () {
            if ($(this).prop('id') != 0) {
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
        if (!this.client_ids.length) {
            this.client_ids.push(this.loggedInUserData.CLIENT_ID);
        }
        if (this.divisionIds.length == 1 && this.divisionIds[0] == '0') {
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
    };
    PlayersDashboardPage.prototype.getFilterDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('personId', _this.loggedInUserData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "teams/getFilterDetails", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    _this.sportsList = data.SPORTLIST;
                    _this.divisionList = data.DIVISIONLIST;
                    _this.leagueList = data.LEAGUELIST;
                    _this.teamList = data.TEAMLIST;
                    _this.markSports();
                    _this.markSports2();
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    PlayersDashboardPage.prototype.showFilter = function () {
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
    };
    PlayersDashboardPage.prototype.closeFilter = function () {
        $('ion-content').removeClass('overlay');
        $('page-tabs').removeClass('send-back');
        $('.filter_overlay, .sportFilter, .divisionFilter, .teamFilter, .roleFilter, .filterBack').hide();
        //$('.filter_overlay').hide();
        $('.fliter .sub-title').html('Filter');
        $('.options').show();
    };
    PlayersDashboardPage.prototype.filterBack = function () {
        $('.filterBack, .sportFilter, .divisionFilter, .teamFilter, .roleFilter').hide();
        $('.fliter .sub-title').html('Filter');
        $('.options').show();
    };
    PlayersDashboardPage.prototype.filterHandler = function () {
        var _this = this;
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
            $('.team').click(function (e) {
                if ($(e.target).parents('.teamFilter').length) {
                    $('.sportFilter .team').removeClass('active');
                }
                else {
                    $('.teamFilter .team').removeClass('active');
                }
                if ($(e.target).hasClass('team')) {
                    $(e.target).toggleClass('active');
                }
                else {
                    $(e.target).parent('.team').toggleClass('active');
                }
                _this.selectedTeams = [];
                var selectedTeams = [];
                $('page-players-dashboard .team.active').each(function () {
                    if ($(this).prop('id') != 0) {
                        selectedTeams.push($(this).prop('id'));
                    }
                });
                _this.selectedTeams = selectedTeams;
                _this.filterData();
            });
            $('.childId').click(function (e) {
                if ($(e.target).hasClass('childId')) {
                    //$('.childId').not($(e.target)).removeClass('active');
                    $(e.target).toggleClass('active');
                }
                else {
                    //$('.childId').not($(e.target).parent('.childId')).removeClass('active');
                    $(e.target).parent('.childId').toggleClass('active');
                }
                _this.childIds = [];
                var childIds = [];
                $('.childId.active').each(function () {
                    if ($(this).prop('id') != 0) {
                        childIds.push($(this).prop('id'));
                    }
                });
                _this.childIds = childIds;
                _this.filterData();
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
    };
    PlayersDashboardPage.prototype.playerDetails = function (personID) {
        var _this = this;
        if (this.ShowSeverityPage == false && !this.medicalInfo) {
            var isChild = false;
            if (this.loggedInUserData.ISPARENT) {
                for (var key in this.loggedInUserData.siblings) {
                    if (this.loggedInUserData.siblings[key].person_id == personID) {
                        isChild = true;
                        break;
                    }
                }
            }
            // (!this.loggedInUserData.ISPARENT || (this.loggedInUserData.ISPARENT && isChild))
            if (parseInt(this.loggedInUserData.PERSON_ID) == parseInt(personID) || (this.FunctionAccess.user_adminLevel != 4 || this.FunctionAccess.view_other_players == 'no')) {
                this.activePlayer = personID;
                setTimeout(function () {
                    _this.navCtrl.push('PlayerDetailsPage', { playerID: personID });
                    _this.activePlayer = '';
                }, 300);
            }
            else {
                this.gFn.presentToast('Access Denied');
            }
        }
        else {
            this.ShowSeverityPage = false;
        }
    };
    PlayersDashboardPage.prototype.DisplaySeverityDetails = function (playerAilments) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', playerAilments.PERSON_ID);
        this.http.post(this.global.APIURL + 'players/getPersonDetails', data)
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.playerDetailsData = response.GETPERSONDETAILS;
                _this.getMedicalHistory(_this.playerDetailsData[0]['person_id']);
                // this.navCtrl.push('PlayerMedicalRecordsPage', {playerDetails: playerDetails});
            }
        }, function (error) {
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
    };
    //getting Medical History Details start
    PlayersDashboardPage.prototype.getMedicalHistory = function (playerId) {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', playerId);
            _this.http.post(_this.global.APIURL + "players/getMedicalHistoryDetails", PlayersData)
                .subscribe(function (data) {
                if (data.GETMEDICALHISTORYDETAILS) {
                    var medicalHistoryDetails = _this.events.publish('json:query', data.GETMEDICALHISTORYDETAILS)[0][0];
                    _this.playerDetailsData[0]['medical_history'] = medicalHistoryDetails;
                    _this.navCtrl.push('PlayerMedicalRecordsPage', { playerDetails: _this.playerDetailsData });
                }
                resolve(true);
            }, function (error) {
                console.log(error);
                resolve(false);
            });
        });
    };
    //getting Medical History Details ends
    PlayersDashboardPage.prototype.MedicineInformation = function (data) {
        var _this = this;
        this.medicalInfo = true;
        var MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
        MedicineInfo.present();
        MedicineInfo.onDidDismiss(function () {
            _this.medicalInfo = false;
        });
    };
    PlayersDashboardPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    //filter for admin starts
    PlayersDashboardPage.prototype.openSublist = function (i) {
        console.log("Getting Id ", '#fun2' + i);
        var id = ("#fun2").concat(i);
        $(id).toggle();
    };
    PlayersDashboardPage.prototype.openSportsList = function (sportName, divisionName, j) {
        // var id = ("#fun3").concat(j);
        var id = ("#funys".concat(sportName).concat(divisionName).concat(j));
        $(id).toggle();
    };
    //filter for admin ends
    // filter for coach starts
    PlayersDashboardPage.prototype.openSublist2 = function (j) {
        console.log("Getting Id ", '#coachlist' + j);
        var id = ("#coachlist").concat(j);
        $(id).toggle();
    };
    PlayersDashboardPage.prototype.openSportsList2 = function (sportName, divisionName, i) {
        // var id = ("#coachlist2").concat(j);
        var id = ("#coachlists".concat(sportName).concat(divisionName).concat(i));
        $(id).toggle();
    };
    // filter for coach ends
    //marking data
    PlayersDashboardPage.prototype.marking = function (sportsId, teamId, divisionId) {
        var _this = this;
        //Marking division starts =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=->
        if (this.divisionBuckets.has(divisionId)) {
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        else {
            this.divisionBuckets.set(divisionId, []);
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        this.divisionBuckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'player').innerHTML = map.get(key).length;
            }
            else {
                document.getElementById(key + 'player').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
        this.storage.set('divisionBuckets', jsonText2);
        //Marking division ends =-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=--=-=-=---=-=-=>
        //Marking sports starts =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=---=--=--=-=-=->
        if (this.buckets.has(sportsId)) {
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        else {
            this.buckets.set(sportsId, []);
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        this.buckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'player').innerHTML = map.get(key).length + ' selected';
            }
            else {
                document.getElementById(key + 'player').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
        this.storage.set('bucket', jsonText);
        //Marking sports ends =-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
    };
    PlayersDashboardPage.prototype.marking2 = function (sportsId, teamId, divisionId) {
        var _this = this;
        //Marking division starts =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=->
        if (this.divisionBuckets.has(divisionId)) {
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        else {
            this.divisionBuckets.set(divisionId, []);
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        this.divisionBuckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'player2').innerHTML = map.get(key).length;
            }
            else {
                document.getElementById(key + 'player2').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
        this.storage.set('divisionBuckets', jsonText2);
        //Marking division ends =-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=--=-=-=---=-=-=>
        //marking for sports starts 
        if (this.buckets.has(sportsId)) {
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        else {
            this.buckets.set(sportsId, []);
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        this.buckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'player2').innerHTML = map.get(key).length + ' selected';
            }
            else {
                document.getElementById(key + 'player2').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
        this.storage.set('bucket', jsonText);
        //marking for sports ends 
    };
    //initial marking
    PlayersDashboardPage.prototype.markSports = function () {
        var _this = this;
        //initial Marking for division starts
        this.storage.get("divisionBuckets").then(function (val) {
            _this.divisionBuckets = new Map(JSON.parse(val));
            console.log("getting data from 96", _this.divisionBuckets);
            _this.divisionBuckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'player').innerHTML = map.get(key).length;
                }
                else {
                    document.getElementById(key + 'player').innerHTML = '';
                }
                _this.filterHandler();
            });
        });
        //initial Marking for division ends
        //Inital Mraking for sports starts
        this.storage.get("bucket").then(function (val) {
            _this.buckets = new Map(JSON.parse(val));
            console.log("getting data from 96", _this.buckets);
            _this.buckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'player').innerHTML = map.get(key).length + ' selected';
                }
                else {
                    document.getElementById(key + 'player').innerHTML = '';
                }
                _this.filterHandler();
            });
        });
        //Inital Mraking for sports ends
    };
    PlayersDashboardPage.prototype.markSports2 = function () {
        var _this = this;
        //initial Marking for division starts
        this.storage.get("divisionBuckets").then(function (val) {
            _this.divisionBuckets = new Map(JSON.parse(val));
            console.log("getting data from 96", _this.divisionBuckets);
            _this.divisionBuckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'player2').innerHTML = map.get(key).length;
                }
                else {
                    document.getElementById(key + 'player2').innerHTML = '';
                }
                _this.filterHandler();
            });
        });
        //initial Marking for division ends
        //initial Marking for sports starts
        this.storage.get("bucket").then(function (val) {
            _this.buckets = new Map(JSON.parse(val));
            console.log("getting data from 96", _this.buckets);
            _this.buckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'player2').innerHTML = map.get(key).length + ' selected';
                }
                else {
                    document.getElementById(key + 'player2').innerHTML = '';
                }
                _this.filterHandler();
            });
        });
        //initial Marking for sports ends
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], PlayersDashboardPage.prototype, "content", void 0);
    PlayersDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-players-dashboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/players-dashboard/players-dashboard.html"*/'<!--\n  Generated template for the PlayersDashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <nav class="navbar navbar-fixed-top player-home-nav">\n      <div class="top-bar clearfix">\n          <!-- <div class="prev-next pull-right chat-search-prev-next" (click)="goToChooseTeamsPage()">\n              <a href="javascript:void(0);" class="next"></a>\n          </div> -->\n          <div class="prev-next pull-right doubleArrow" *ngIf="isLoaded" (click)="showFilter()">\n              <a href="javascript:void(0);"><img src="assets/images/event-filter-icon.svg" class="filtter_button"></a>\n              <a href="javascript:void(0);"><img src="assets/images/event-filter-icon-active.svg" class="filtter_button active"></a>\n          </div>\n          <div class="bg-header">\n              <div *ngIf="FunctionAccess?.user_adminLevel == 1 || FunctionAccess?.user_adminLevel == 2" class="title fontBold chat-text">GROUPS</div>\n              <div *ngIf="FunctionAccess?.user_adminLevel == 4" class="title fontBold chat-text">GROUPS</div>\n          </div>\n      </div>\n  </nav>\n</ion-header>\n\n<ion-content>\n  <section class="main">\n    <!-- no internet message start -->\n    <div class="background_grey" *ngIf="isOffline">\n        <div class="off-wrap">\n            <p><img src="assets/images/events-new-icon/offline-logo-alt.svg" class=""></p>\n            <h3>OFFLINE</h3>\n            <p>Your network is unavalaible, please check your data or connection</p>\n            <button type="button" class="btn btn-sm-black try-again" (click)="tryAgain()">TRY AGAIN</button>\n        </div>\n    </div>\n    <!-- no internet message end -->\n    <!-- loading skeleton -->\n    <div class="skeleton" *ngIf="!isLoaded && !isOffline">\n        \n        <div class="event-card bg-gray">\n            <div class="search-bar fadeShine"></div>\n          <!-- Regular player combined Start -->\n            <!-- <div class="title fadeShine"></div> -->\n            <div class=" select-card well mt-10 fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <!-- <div class="title fadeShine"></div> -->\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n              <div class="row">\n                <div class="card-img col-xs-2 p-0">\n                  <span>\n                    <div class="img-circle">\n                        <span class="img-text"></span>\n                    </div>\n                  </span>\n                </div>\n                <div class="card-title col-xs-8 p-0"></div>\n                <div class="col-xs-2 checkArrow-group"></div>\n              </div>\n          </div>\n          <div class=" select-card well fadeShine">\n                <div class="row">\n                  <div class="card-img col-xs-2 p-0">\n                    <span>\n                      <div class="img-circle">\n                          <span class="img-text"></span>\n                      </div>\n                    </span>\n                  </div>\n                  <div class="card-title col-xs-8 p-0"></div>\n                  <div class="col-xs-2 checkArrow-group"></div>\n                </div>\n            </div>\n            <div class=" select-card well fadeShine">\n                <div class="row">\n                  <div class="card-img col-xs-2 p-0">\n                    <span>\n                      <div class="img-circle">\n                          <span class="img-text"></span>\n                      </div>\n                    </span>\n                  </div>\n                  <div class="card-title col-xs-8 p-0"></div>\n                  <div class="col-xs-2 checkArrow-group"></div>\n                </div>\n            </div>\n            <div class=" select-card well fadeShine">\n                <div class="row">\n                  <div class="card-img col-xs-2 p-0">\n                    <span>\n                      <div class="img-circle">\n                          <span class="img-text"></span>\n                      </div>\n                    </span>\n                  </div>\n                  <div class="card-title col-xs-8 p-0"></div>\n                  <div class="col-xs-2 checkArrow-group"></div>\n                </div>\n            </div>\n          <!-- Regular player combined End -->\n  \n        </div>\n    </div>\n    <!-- loading skeleton end -->\n    <form action="" class="user-form player-item" *ngIf="isLoaded && !isOffline">\n      <section class="profileFirst heightAuto xs-padding">\n        <div class="row player-search-image">\n            <div class="col-xs-12 search-player search-inner mb-20">\n                <div class="search-icon"><i class="seh material-icons">search</i></div>\n                <input type="text" name="search" id="search" class="form-control text-input" placeholder="Search" (keyup)="search($event)" (click)="clearsearch()" (focus)="inputFocus()" (blur)="inputBlur()">\n            </div>\n        </div>\n        <div class="event-card welfare bg-gray player-home-list" *ngIf="players.length > 0 && PlayerDetailSuccess; else noPlayers">\n          <div class="well select-card" [class.active]="(activePlayer==player.PERSON_ID)" *ngFor="let player of players">\n            <div class="row">\n              <div class="card-img col-xs-2 p-0" (click)="playerDetails(player.PERSON_ID)">\n                <span class="">\n                  <img *ngIf="player.PHOTOPATH != null && player.PHOTOPATH.length > 0; else noImage" src="{{global.PROFILEIMAGEURL}}{{player.PHOTOPATH}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                  <ng-template #noImage>\n                      <div class="img-circle"><span class="img-text">{{player.FIRST_NAME[0]}} {{player.LAST_NAME[0]}} </span></div>\n\n                  </ng-template>\n                </span>\n              </div>\n              <div class="card-title col-xs-9">\n                <p (click)="playerDetails(player.PERSON_ID)">{{player.FIRST_NAME | uppercase}} {{player.LAST_NAME | uppercase}}</p>\n                <div (click)="playerDetails(player.PERSON_ID)">\n                  <span *ngIf="player.UNIFORMID != null && player.UNIFORMID.length > 0">#{{player.UNIFORMID}}</span>\n                </div>\n                <div class="suit-iconCard fixedRight" (click)="DisplaySeverityDetails(player)" *ngIf="FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1 && ((player.PLAYERAILMENTSSEVERITYICON) || (player.SHOWMEDICINE==1))">\n                    <img src={{global.ImagesPath}}{{player.PLAYERAILMENTSSEVERITYICON}} class="suit-icon" *ngIf="(player.PLAYERAILMENTSSEVERITYICON  && (player.SHOWMEDICINE==1 || player.SHOWMEDICINE==0))">\n                    <img src="{{global.ImagesPath}}pills.svg" class="medical-bottle" *ngIf="((player.SHOWMEDICINE==1) && (!player.PLAYERAILMENTSSEVERITYICON))">\n                </div>\n            \n              </div>\n              <!---<div class="col-xs-3 p-0">\n                  <div class="suit-iconCard" (click)="DisplaySeverityDetails(player.PLAYERAILMENTS)" *ngIf="player.PLAYERAILMENTSSEVERITYICON && FunctionAccess && FunctionAccess.medicalKit==\'yes\'">\n                      <img src={{global.ImagesPath}}{{player.PLAYERAILMENTSSEVERITYICON}}  class="suit-icon">\n                  </div> -->\n                <!--                 \n                  <div class="medical-bottleCard" (click)="MedicineInformation(player)" *ngIf="player.SHOWMEDICINE==1 && FunctionAccess && FunctionAccess.HasMedicineReviewAccess==1">\n                      <img src="{{global.ImagesPath}}medicine_bottle.png" class="medical-bottle">\n                  </div> -->\n              <!-- </div> -->\n\n              <div class="event-next col-xs-1 p-0" *ngIf="(FunctionAccess && FunctionAccess.user_adminLevel!=4) || (loggedInUserData.PERSON_ID.toString() == player.PERSON_ID.toString())">\n                <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n              </div>\n            </div>\n          </div>\n        </div>\n        <ng-template #noPlayers>\n          <div class="event-card welfare bg-gray player-home-list">\n            <div class="well select-card noPlayerCard">\n              <div class="row">\n                <div class="card-title col-xs-12 p-0"><p>No Teammates Found</p></div>\n              </div>\n            </div>\n          </div>\n        </ng-template>\n      </section>\n    </form>\n  </section>\n</ion-content>\n\n<div class="filter_overlay" style="display: none;" (swipe)="onSwipe($event)">\n  <div class="fliter">\n      <div class="itemList clearfix">\n          <div class="pull-left">\n              <img class="filterBack" src="assets/images/arrow-white.svg" (click)="filterBack()" />\n              <p class="sub-title" *ngIf="(FunctionAccess && (FunctionAccess?.user_adminLevel == 4) || (PersonData && PersonData.ISPARENT) )">FILTER</p>\n              <p class="sub-title2" *ngIf="FunctionAccess && ((FunctionAccess.user_adminLevel == 1) ||  (FunctionAccess?.user_adminLevel == 2) || (FunctionAccess?.user_adminLevel == 3))">ACTIVITY</p>\n          </div>\n          <div class="pull-right close-icon" (click)="closeFilter()">\n              <img src="assets/images/close-icon.svg" alt="">\n          </div>\n      </div>\n\n      <!-- filter for coach start -->\n      <div class="fliter_options" *ngIf="(FunctionAccess && FunctionAccess?.user_adminLevel == 2) || (FunctionAccess?.user_adminLevel == 3) ">\n        <p class="color">\n          <span class="suggestion">Select activity to filter</span>\n          <span class="selected">{{selectedFilter}} Selected</span>\n        </p>  \n        <div class="itemList clearfix">\n              <div class="pull-left"><p>Activity</p></div>\n          </div>\n          <div class="itemList clearfix" *ngFor="let key of sportsList;let j = index">\n              <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID?.toString()) > -1" id="{{key.SPORTID}}" (click)="openSublist2(j)"><p>{{key.SPORTNAME}}</p><p id="{{key.SPORTID}}player" style="width: 25%;color: gray;"></p></div>\n\n              <div id="coachlist{{j}}" style="display: none;">\n                <div class="itemListInfo clearfix subFilter has-child" *ngFor="let division of key.DIVISIONLIST; let i = index">\n                    <div class="font_light" class="division" [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)" id="{{division.DIVISIONID}}" (click)="openSportsList2(key.SPORTNAME[0],division.DIVISIONID,i)"><p class="divi">{{division.DIVISIONNAME}}</p><p id="{{division.DIVISIONID}}player" style="width: 5%;color: gray;"></p></div>\n                    <div id="coachlists{{key.SPORTNAME[0]}}{{division.DIVISIONID}}{{i}}" class="font_light" class="division" style="display: none;">\n                      <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                          <div class="font_light" class="team" [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID?.toString()) > -1)" id="{{team.CLUBDIVISIONID}}" (click)="marking(key.SPORTID,team.CLUBDIVISIONID,division.DIVISIONID)"><p class="divi">{{team.TEAMNAME}}</p></div>\n                      </div>\n                    </div>\n                </div>\n              </div>\n          </div>\n      </div>\n      <!-- filter for coach ends -->\n\n      <!-- filetr for parent and player start-->\n      <div class="fliter_options" *ngIf="(FunctionAccess && FunctionAccess?.user_adminLevel == 4) || ((PersonData && PersonData.ISPARENT) && (!FunctionAccess.user_adminLevel == 1)) ">\n        <div class="itemList clearfix">\n            <div class="pull-left"><p class="parent">Sports</p></div>\n        </div>\n        <div class="itemList clearfix" *ngFor="let key of sportsList">\n            <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID?.toString()) > -1" id="{{key.SPORTID}}"><p>{{key.SPORTNAME}}</p></div>\n            <div class="itemListInfo clearfix subFilter has-child" *ngFor="let division of key.DIVISIONLIST">\n                <div class="font_light" class="division" [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)" id="{{division.DIVISIONID}}"><p>{{division.DIVISIONNAME}}</p></div>\n                <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                    <div class="font_light" class="team" [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID.toString()) > -1)" id="{{team.CLUBDIVISIONID}}"><p>{{team.TEAMNAME}}</p></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- filter for parent and player ends -->\n\n      <div class="options_wrap" *ngIf="FunctionAccess && FunctionAccess.user_adminLevel == 1">\n         \n        <!-- <div class="options teamLink">\n              <p>My Teams</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n          </div>\n          <div class="options sportLink">\n              <p>Sports and teams</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n          </div> -->\n\n          <!-- <div class="options roleLink" *ngIf="FunctionAccess && FunctionAccess.user_adminLevel != 4">\n              <p>Roles</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n          </div> -->                  \n          <!-- <div class="options divisionLink">\n            <p>Division</p>\n            <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n          </div> -->                 \n          <!-- <div class="options teamLink">\n            <p>Teams</p>\n            <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n          </div> -->\n\n          <!-- style="display: none;" -->\n          <div class="fliter_options sportFilter" >\n            <p class="color">\n              <span class="suggestion">Select activity to filter</span>\n              <span class="selected">{{selectedFilter}} Selected</span>\n            </p>\n              <!-- <div class="itemList clearfix">\n                  <div class="pull-left"><p>Show all my sports</p></div>\n                  <div class="pull-right">\n                      <div class="toggle">\n                          <label class="switch">\n                          <input type="checkbox" class="sports" name="sports" value="0" [checked]="sportIds.indexOf(\'0\') > -1">\n                          <span class="slider round"></span>\n                          </label>\n                      </div>\n                  </div>\n              </div> -->\n              <div class="itemList clearfix" *ngFor="let key of sportsList;let i = index">\n                  <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID?.toString()) > -1" id="{{key.SPORTID}}" (click)="openSublist(i)"><p>{{key.SPORTNAME}}</p><p id="{{key.SPORTID}}player2" style="width: 25%;color: gray;"></p></div>\n                  <!-- <div class="pull-right">\n                      <div class="toggle">\n                          <label class="switch">\n                          <input type="checkbox" class="sports" name="sports" value="{{key.SPORTID}}" [checked]="sportIds.indexOf(key.SPORTID.toString()) > -1">\n                          <span class="slider round"></span>\n                          </label>\n                      </div>\n                  </div> -->\n                  <div id="fun2{{i}}" style="display: none">\n                  <div class="itemListInfo clearfix subFilter has-child" *ngFor="let division of key.DIVISIONLIST; let j = index">\n                      <div class="font_light" class="division" [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)" id="{{division.DIVISIONID}}" (click)="openSportsList(key.SPORTNAME[0],division.DIVISIONID,j)"><p class="divi">{{division.DIVISIONNAME}}</p><p id="{{division.DIVISIONID}}player2" style="width: 5%;color: gray;"></p></div>\n                      <div id="funys{{key.SPORTNAME[0]}}{{division.DIVISIONID}}{{j}}" class="font_light" class="division" style="display: none;">\n                        <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                            <div class="font_light" class="team" [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID?.toString()) > -1)" id="{{team.CLUBDIVISIONID}}" (click)="marking2(key.SPORTID,team.CLUBDIVISIONID,division.DIVISIONID)"><p class="divi">{{team.TEAMNAME}}</p></div>\n                        </div>\n                      </div>\n                  </div>\n                  </div>\n              </div>\n          </div>\n\n          <!-- <div class="fliter_options divisionFilter" style="display: none;">\n              <div class="itemList clearfix">\n                  <div class="pull-left"><p>Show all my division</p></div>\n                  <div class="pull-right">\n                      <div class="toggle">\n                          <label class="switch">\n                          <input type="checkbox" class="division" name="division" value="0" [checked]="divisionIds.indexOf(\'0\') > -1">\n                          <span class="slider round"></span>\n                          </label>\n                      </div>\n                  </div>\n              </div>\n              <div class="itemList clearfix" *ngFor="let key of divisionList">\n                  <div class="pull-left font_light"><p>{{key.DIVISIONNAME}}</p></div>\n                  <div class="pull-right">\n                      <div class="toggle">\n                          <label class="switch">\n                          <input type="checkbox" class="division" name="division" value="{{key.DIVISIONID}}" [checked]="(divisionIds.indexOf(key.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)">\n                          <span class="slider round"></span>\n                          </label>\n                      </div>\n                  </div>\n              </div>\n          </div> -->\n\n          <div class="fliter_options teamFilter" style="display: none;">\n              <!-- <div class="itemList clearfix">\n                  <div class="pull-left"><p>Show all my teams</p></div>\n                  <div class="pull-right">\n                      <div class="toggle">\n                          <label class="switch">\n                          <input type="checkbox" class="team" name="team" value="0" [checked]="selectedTeams.indexOf(\'0\') > -1">\n                          <span class="slider round"></span>\n                          </label>\n                      </div>\n                  </div>\n              </div> -->\n              <div class="itemList clearfix" *ngFor="let key of teamList">\n                  <div class="font_light" class="team" [class.active]="selectedTeams.indexOf(key.CLUBDIVISIONID?.toString()) > -1" id="{{key.CLUBDIVISIONID}}"><p style="float: left;width:100% ;">{{key.TEAMNAME}}</p><p style="float: right;">{{key.DIVISIONNAME}}</p></div>\n                  <!-- <div class="pull-right">\n                      <div class="toggle">\n                          <label class="switch">\n                          <input type="checkbox" class="team" name="team" value="{{key.CLUBDIVISIONID}}" [checked]="selectedTeams.indexOf(key.CLUBDIVISIONID.toString()) > -1">\n                          <span class="slider round"></span>\n                          </label>\n                      </div>\n                  </div> -->\n              </div>\n          </div>\n\n          <div class="fliter_options roleFilter" style="display: none;">\n              <div class="itemList clearfix">\n                  <div class="font_light" class="role" [class.active]="roles.indexOf(\'1\') > -1" id="1"><p>Admins</p></div>\n              </div>\n              <div class="itemList clearfix" *ngIf="loggedInUserData && !loggedInUserData.ISPARENT">\n                  <div class="font_light" class="role" [class.active]="roles.indexOf(\'2\') > -1" id="2"><p>Members</p></div>\n              </div>\n              <div class="itemList clearfix">\n                  <div class="font_light" class="role" [class.active]="roles.indexOf(\'3\') > -1" id="3"><p>Parents</p></div>\n              </div>\n          </div>\n      </div>\n\n\n      <!-- filte for parent start  -->\n      <div class="fliter_options" *ngIf="loggedInUserData && loggedInUserData.ISPARENT">\n        <div class="itemList clearfix">\n            <div class="pull-left"><p>View</p></div>\n        </div>\n        <div class="itemList clearfix" *ngFor="let key of loggedInUserData.siblings">\n            <div class="font_light" class="childId" id="{{key.person_id}}" [class.active]="childIds.indexOf(key.person_id.toString()) > -1"><p>{{key.last_name}} {{key.first_name}} </p></div>\n        </div>\n        <div class="itemList clearfix">\n            <div class="font_light" class="childId" style="margin-left: 20px;" id="{{loggedInUserData.PERSON_ID}}" [class.active]="childIds.indexOf(loggedInUserData.PERSON_ID.toString()) > -1"><p>Self</p></div>\n        </div>\n    </div>\n      <!-- filte for parent ends  -->\n\n  </div>\n</div>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/players-dashboard/players-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], PlayersDashboardPage);
    return PlayersDashboardPage;
}());

//# sourceMappingURL=players-dashboard.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisplayEventsNewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mobiscroll_angular__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mobiscroll_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__mobiscroll_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_network_ngx__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











__WEBPACK_IMPORTED_MODULE_5__mobiscroll_angular__["mobiscroll"].settings = {
    theme: 'material'
};
var DisplayEventsNewPage = /** @class */ (function () {
    function DisplayEventsNewPage(navCtrl, navParams, platform, storage, global, Alert, http, loadingCtrl, mdlCtrl, logger, gFn, network, app, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.storage = storage;
        this.global = global;
        this.Alert = Alert;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.mdlCtrl = mdlCtrl;
        this.logger = logger;
        this.gFn = gFn;
        this.network = network;
        this.app = app;
        this.global_api = global_api;
        this.PreviousEvent = false;
        this.EventsDetails = [];
        this.PreviousEventsDetails = [];
        this.monthArray = [];
        this.DuplmonthArray = [];
        this.PastmonthArray = [];
        this.UpCommingEvents = [];
        this.UpCommingEventsType = [1, 2];
        this.PastGameEvents = [];
        this.UpCommingSeeMore = 0;
        this.CardViewSeeMore = 0;
        this.WeekDays = [];
        this.notComingFlag = 0;
        this.yesComingFlag = 0;
        this.CreateNote = ['Create note', 'Create note'];
        this.MarkedEvents = [];
        this.loadedFunctionCount = 0; // all the functions have loaded or not?
        this.PlayerAttending = [];
        this.PlayerNotAttending = [];
        this.swipedDown = false;
        this.ReasonSelected = '';
        this.existingEvents = [];
        this.confirmHighlight = 'N';
        this.eventList = [];
        this.isEventList = false;
        this.isFilterList = false;
        this.dateStarted = this.formatDateNew(this.getFirstDayOfWeek());
        this.dateStartedPrev = this.formatDateNew(this.getFirstDayOfWeek());
        this.dateEnded = '';
        this.dateEndedPrev = this.formatDateNew(new Date(this.getFirstDayOfWeek()).setDate(new Date(this.getFirstDayOfWeek()).getDate() + 13));
        this.selectedFilter = 0;
        this.prevEvent = false;
        this.divisionIds = [];
        this.sportIds = [];
        this.selectedTeams = [];
        this.client_ids = [];
        this.childIds = [];
        this.offlineConnection = false;
        this.isFirstFilter = true;
        this.isFirst = true;
        this.isScroll = 0;
        this.isDataLoading = false;
        this.buckets = new Map();
        this.divisionBuckets = new Map();
        this.myCalendarOptions = {
            onInit: function (event, inst) {
                /* if(parseInt($('.CalenderFullView .mbsc-cal-scroll-c .mbsc-cal-slide-a .mbsc-cal-row:last-child .mbsc-cal-day0 .mbsc-cal-day-date.mbsc-cal-cell-txt').html()) > 7){
                  $('.CalenderFullView .mbsc-cal-scroll-c .mbsc-cal-slide-a .mbsc-cal-row:last-child').css('display','table-row');
                } */
            },
            onDayChange: function (event, inst) {
                var options = { month: 'short', day: 'numeric' };
                var date = event.date.toLocaleDateString("en-US").replace(/\s/g, '');
                var newDate = _this.formatDateNew(event.date);
                console.log("Date selected : ", newDate);
                var dayToAdd = ($('ion-header').hasClass('showFullCalender')) ? ((6 * 7) - 1) : 6;
                console.log("dayToAdd", dayToAdd);
                _this.dateStartedPrev = newDate;
                _this.dateEndedPrev = newDate;
                _this.prevEvent = true;
                _this.isScroll = 0;
                _this.dateStarted = newDate;
                _this.dateEnded = newDate;
                _this.isFilterList = true;
                _this.getEventList().then(function (x) {
                    if (x) {
                        //this.content.scrollToTop(1000);
                        _this.offlineConnection = false;
                        _this.eventList = _this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse);
                        _this.eventList.sort(function (a, b) {
                            return new Date(a.DATE_STARTED).getTime() - new Date(b.DATE_STARTED).getTime();
                        });
                        console.log("Event List :", _this.eventList);
                        var options_1 = { month: 'short', day: 'numeric' };
                        var elementId_1;
                        ;
                        var y_1;
                        var nextDate_1;
                        setTimeout(function () {
                            for (var i = 0; i <= dayToAdd; i++) {
                                nextDate_1 = new Date(event.date);
                                nextDate_1 = nextDate_1.setDate(nextDate_1.getDate() + i);
                                elementId_1 = new Date(nextDate_1).toLocaleDateString("en-US").replace(/\s/g, '');
                                if (document.getElementById('H' + elementId_1)) {
                                    y_1 = $('#H' + elementId_1).offset().top - ($('ion-header.top-bar').height() + 12) + _this.content._scroll.getTop();
                                }
                                if (typeof y_1 != 'undefined') {
                                    setTimeout(function () {
                                        _this.content.scrollTo(0, y_1, 2000);
                                    }, 100);
                                    break;
                                }
                            }
                        }, 1000);
                    }
                    else {
                        _this.offlineConnection = true;
                    }
                });
                setTimeout(function () {
                    _this.hideFullCalender();
                    // this.scrollTo(date);
                }, 1000);
                /* for(let markKey in this.MarkedEvents){
                  if(this.MarkedEvents[markKey].d==date){
                    this.gotoEventDashboard(this.MarkedEvents[markKey].data)
                  }
                } */
            },
            onPageLoaded: function (event, inst) {
                /* if(parseInt($('.CalenderFullView .mbsc-cal-scroll-c .mbsc-cal-slide-a .mbsc-cal-row:last-child .mbsc-cal-day0 .mbsc-cal-day-date.mbsc-cal-cell-txt').html()) > 7){
                  $('.CalenderFullView .mbsc-cal-scroll-c .mbsc-cal-slide-a .mbsc-cal-row:last-child').css('display','table-row');
                } */
            },
            onPageChange: function (event, inst) {
                _this.dateStarted = _this.formatDateNew(event.firstDay);
                _this.dateEnded = new Date(event.firstDay);
                var dayToAdd = ($('ion-header').hasClass('showFullCalender')) ? ((6 * 7) - 1) : 6;
                _this.dateEnded = _this.formatDateNew(_this.dateEnded.setDate(_this.dateEnded.getDate() + dayToAdd));
                //console.log(event);
                //if(this.dateStarted < this.dateStartedPrev){
                _this.dateStartedPrev = _this.dateStarted;
                _this.dateEndedPrev = _this.dateEnded;
                _this.prevEvent = true;
                _this.isScroll = 0;
                _this.getEventList().then(function (x) {
                    if (x) {
                        //this.content.scrollToTop(1000);
                        _this.offlineConnection = false;
                        _this.eventList = _this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse);
                        _this.eventList.sort(function (a, b) {
                            return new Date(a.DATE_STARTED).getTime() - new Date(b.DATE_STARTED).getTime();
                        });
                        var options = { month: 'short', day: 'numeric' };
                        var elementId_2;
                        ;
                        var y_2;
                        var nextDate_2;
                        setTimeout(function () {
                            for (var i = 0; i <= dayToAdd; i++) {
                                nextDate_2 = new Date(event.firstDay);
                                nextDate_2 = nextDate_2.setDate(nextDate_2.getDate() + i);
                                elementId_2 = new Date(nextDate_2).toLocaleDateString("en-US").replace(/\s/g, '');
                                if (document.getElementById('H' + elementId_2)) {
                                    y_2 = $('#H' + elementId_2).offset().top - ($('ion-header.top-bar').height() + 12) + _this.content._scroll.getTop();
                                }
                                if (typeof y_2 != 'undefined') {
                                    setTimeout(function () {
                                        _this.content.scrollTo(0, y_2, 2000);
                                    }, 100);
                                    break;
                                }
                            }
                        }, 1000);
                    }
                    else {
                        _this.offlineConnection = true;
                    }
                });
                //}else{
                //}
            }
        };
        this.storage.get("mobileAssets").then(function (res) {
            if (res && res.Theme) {
                _this.appTheme = res.Theme;
                console.log("App Theme : ", _this.appTheme);
            }
        });
        this.storage.get('attendanceevents').then(function (val) {
            _this.existingEvents = val;
        });
        gFn.showMenuIcon();
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.themeColor = _this.loggedInUserData.THEME_BG;
            console.log("themeColor date ", _this.themeColor);
            // this.loadPlayers();
            // this.getFilterDetails().then((x) => {
            //   this.checkFilterIsActive();
            // });
        });
        //$('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','true')
        //$('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
        this.logger.NextPreviousIcons('EventBottomIcons', { pram: Date.now() });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                console.log("hello");
                //this.navCtrl.pop();
                _this.navCtrl.setRoot('EventHomeMenuPage');
            });
        });
        this.storage.get('filterSport').then(function (val) {
            if (val != null) {
                _this.sportIds = val;
            }
        });
        this.storage.get('filterDivision').then(function (val) {
            if (val != null) {
                _this.divisionIds = val;
            }
        });
        this.storage.get('filterTeam').then(function (val) {
            if (val != null) {
                _this.selectedTeams = val;
                _this.selectedFilter = _this.selectedTeams.length;
            }
        });
        this.storage.get('filterChild').then(function (val) {
            if (val != null) {
                _this.childIds = val;
            }
        });
        this.checkNetwork();
    }
    DisplayEventsNewPage.prototype.detectBottom = function () {
        var _this = this;
        var dimensions = this.content.getContentDimensions();
        var scrollTop = this.content.scrollTop;
        var contentHeight = dimensions.contentHeight;
        var scrollHeight = dimensions.scrollHeight;
        if ((scrollTop + contentHeight + 20) > scrollHeight) {
            this.isScroll = 1;
            var lastDate = new Date(this.dateEndedPrev);
            if (this.eventList.length) {
                lastDate = new Date(this.eventList[this.eventList.length - 1].DATE_STARTED);
            }
            this.dateStarted = this.formatDateNew(lastDate.setDate(lastDate.getDate() + 1));
            this.dateEnded = this.formatDateNew(lastDate.setDate(lastDate.getDate() + 6));
            this.prevEvent = true;
            this.getEventList().then(function (x) {
                _this.isScroll = 0;
                if (x) {
                    _this.offlineConnection = false;
                    _this.eventList = _this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                    _this.eventList.sort(function (a, b) {
                        return new Date(a.DATE_STARTED).getTime() - new Date(b.DATE_STARTED).getTime();
                    });
                }
                else {
                    _this.offlineConnection = true;
                }
            });
        }
    };
    DisplayEventsNewPage.prototype.initInfinteScroll = function (infiniteScroll) {
        setTimeout(function () {
            infiniteScroll.complete();
        }, 1000);
    };
    DisplayEventsNewPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage');
    };
    DisplayEventsNewPage.prototype.highlightMenuIcon = function () {
        //$('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected','true');
        /* $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/home.svg)',
          'height':'22px',
          'color': '#dedede'}); */
    };
    DisplayEventsNewPage.prototype.ionViewDidLeave = function () {
        /* $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
          'height': '',
          'color': ''}) */
        //this.isFirst = true;
        this.isFirstFilter = true;
        this.gFn.statusbarBlack();
    };
    DisplayEventsNewPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.highlightMenuIcon();
        setTimeout(function () {
            _this.highlightMenuIcon();
            _this.gFn.statusbarWhite();
        }, 500);
        $(document).off('click');
        $(document).click(function (e) {
            if (!$(e.target).parents('.filter_overlay').length && (!$(e.target).hasClass('filtter_button') && !$(e.target).find('.filtter_button').length)) {
                _this.closeFilter();
            }
        });
    };
    DisplayEventsNewPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('attendanceevents').then(function (val) {
            _this.existingEvents = val;
        });
        this.highlightMenuIcon();
        setTimeout(function () {
            _this.highlightMenuIcon();
            _this.gFn.statusbarWhite();
        }, 500);
        console.log("isFirst : ", this.isFirst);
        this.checkNetwork();
        if (this.isFirst) {
            this.ionViewDidLoad();
        }
        else {
            this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                _this.getEventListforREfresh();
            });
        }
    };
    DisplayEventsNewPage.prototype.checkNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newdata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("checkNetworksssss");
                        if (!(this.network.type === "none" || navigator.onLine === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storage.get('selectedEvent')];
                    case 1:
                        newdata = _a.sent();
                        this.eventList = [];
                        this.eventList = newdata;
                        console.log("checkNetworkcheckNetwork", this.eventList);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DisplayEventsNewPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.highlightMenuIcon();
        this.logger.EventBottomIcons('EventBottomIcons', { pram: Date.now() });
        this.isFirst = false;
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            _this.client_ids = [];
            _this.storage.get('UpcomingSingleEvent').then(function (val) {
                _this.StoredEventData = JSON.parse(val);
                if (_this.StoredEventData) {
                }
                else {
                }
            });
            _this.offlineConnection = false;
            _this.isEventList = false;
            _this.eventList = [];
            _this.MarkedEvents = [];
            _this.getEventList().then(function (x) {
                //this.loader.dismiss();
                if (x) {
                    _this.isEventList = true;
                    _this.offlineConnection = false;
                    _this.eventList = _this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                    console.log("Event List : ", _this.eventList);
                }
                else {
                    _this.isEventList = true;
                    _this.offlineConnection = true;
                }
            });
            _this.getFilterDetails().then(function (x) {
                if (x) {
                    _this.checkFilterIsActive();
                }
                else {
                    _this.isEventList = true;
                    _this.offlineConnection = true;
                }
            });
        });
    };
    DisplayEventsNewPage.prototype.getEventListforREfresh = function () {
        var _this = this;
        this.getEventList().then(function (x) {
            //this.loader.dismiss();
            if (x) {
                _this.isEventList = true;
                _this.offlineConnection = false;
                _this.eventList = _this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                console.log("Event List : ", _this.eventList);
            }
            else {
                _this.isEventList = true;
                _this.offlineConnection = true;
            }
        });
    };
    DisplayEventsNewPage.prototype.checkFilterIsActive = function () {
        setTimeout(function () {
            if ($('.filter_overlay .active').length) {
                $('.doubleArrow').addClass('active');
            }
            else {
                $('.doubleArrow').removeClass('active');
            }
        }, 100);
    };
    DisplayEventsNewPage.prototype.loadData = function () {
        var _this = this;
        this.isFilterList = true;
        this.sportIds = [];
        var sportIds = [];
        $('page-display-events-new .sports.active').each(function () {
            if ($(this).prop('id') != 0) {
                sportIds.push($(this).prop('id'));
            }
        });
        this.sportIds = sportIds;
        this.divisionIds = [];
        var divisionIds = [];
        $('page-display-events-new .division.active').each(function () {
            if ($(this).prop('id') != 0) {
                divisionIds.push($(this).prop('id'));
            }
        });
        this.divisionIds = divisionIds;
        this.selectedTeams = [];
        var selectedTeams = [];
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
        var dataInterval = setInterval(function () {
            if (!_this.isDataLoading) {
                _this.isFilterList = true;
                _this.getEventList().then(function (x) {
                    _this.isFilterList = false;
                    if (x) {
                        _this.offlineConnection = false;
                        _this.eventList = _this.eventList.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse);
                    }
                    else {
                        _this.offlineConnection = true;
                    }
                    clearInterval(dataInterval);
                });
            }
        }, 100);
    };
    DisplayEventsNewPage.prototype.LoadingCompleted = function () {
        var _this = this;
        if (this.loadedFunctionCount == 2) { //checks if all the functions have loaded or not? Change the value accordingly
            this.loader.dismiss();
            if ((!this.previousEventFunctionData || this.PastmonthArray.length == 0)
                && (!this.upcomingEventFunctionData || this.monthArray.length == 0)) {
                this.storage.get('DisplayEventsPageCount').then(function (val) {
                    var count = (val == null) ? 1 : ++val;
                    _this.storage.set('DisplayEventsPageCount', count);
                    if (count > 1) {
                        _this.presentAlert('Events', 'No upcoming and previous events found');
                    }
                });
            }
        }
    };
    DisplayEventsNewPage.prototype.getEventList = function () {
        var _this = this;
        this.isDataLoading = true;
        if (this.divisionIds.length == 1 && this.divisionIds[0] == '0') {
            this.divisionIds = [];
        }
        return new Promise(function (resolve) {
            var _a;
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('selectedTeams', JSON.stringify(_this.selectedTeams))
                .set('client_ids', JSON.stringify(_this.client_ids))
                .set('divisionIds', JSON.stringify(_this.divisionIds))
                .set('sportIds', JSON.stringify(_this.sportIds))
                .set('childPersonIds', JSON.stringify(_this.childIds))
                .set('personId', ((_a = _this.PersonData) === null || _a === void 0 ? void 0 : _a.PERSON_ID) ? _this.PersonData.PERSON_ID : "")
                .set('dateStarted', _this.dateStarted)
                .set('dateEnded', _this.dateEnded)
                .set('isScroll', _this.isScroll)
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "events/getEventList", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    if (data.EVENTLIST && data.EVENTLIST.length > 0) {
                        /* if(!this.prevEvent){
                          this.eventList = data.EVENTLIST;
                        } */
                        if (_this.isFilterList) {
                            _this.eventList = [];
                            _this.MarkedEvents = [];
                        }
                        for (var key in data.EVENTLIST) {
                            //if(this.prevEvent){
                            _this.eventList.unshift(data.EVENTLIST[key]);
                            //}
                            _this.MarkedEvents.push({ d: _this.formatDateNew(data.EVENTLIST[key].DATE_STARTED), color: '#43B7CC', data: data.EVENTLIST[key] });
                        }
                        // this.current_date = this.formatDateNew(new Date().toString());
                        // console.log("Current date ",this.current_date);
                        // this.eventList =  this.eventList.filter((item : any) => {
                        //   return this.formatDateNew(item.DATE_STARTED) >= this.current_date
                        // });
                        resolve(true);
                    }
                    else {
                        _this.eventList = [];
                        _this.MarkedEvents = [];
                        resolve(true);
                    }
                    setTimeout(function () {
                        _this.isDataLoading = false;
                    }, 1000);
                }
                else {
                    setTimeout(function () {
                        _this.isDataLoading = false;
                    }, 1000);
                    resolve(false);
                }
            }, function (error) {
                setTimeout(function () {
                    _this.isDataLoading = false;
                }, 1000);
                resolve(false);
            });
        });
    };
    DisplayEventsNewPage.prototype.getFilterDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('personId', _this.PersonData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "teams/getFilterDetails", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    _this.sportsList = data.SPORTLIST;
                    _this.divisionList = data.DIVISIONLIST;
                    _this.leagueList = data.LEAGUELIST;
                    _this.teamList = data.TEAMLIST;
                    _this.markSports();
                    _this.markSports2();
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    DisplayEventsNewPage.prototype.showFilter = function () {
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
    };
    DisplayEventsNewPage.prototype.closeFilter = function () {
        $('ion-content').removeClass('overlay');
        $('page-tabs').removeClass('send-back');
        $('.filter_overlay, .sportFilter, .divisionFilter, .teamFilter, .filterBack').hide();
        $('.fliter .sub-title').html('Filter');
        $('.options').show();
    };
    DisplayEventsNewPage.prototype.filterBack = function () {
        $('.filterBack, .sportFilter, .divisionFilter, .teamFilter').hide();
        $('.fliter .sub-title').html('Filter');
        $('.options').show();
    };
    DisplayEventsNewPage.prototype.filterHandler = function () {
        var _this = this;
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
            $('.team').click(function (e) {
                if ($(e.target).parents('.teamFilter').length) {
                    $('.sportFilter .team').removeClass('active');
                }
                else {
                    $('.teamFilter .team').removeClass('active');
                }
                if ($(e.target).hasClass('team')) {
                    $(e.target).toggleClass('active');
                }
                else {
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
                _this.loadData();
            });
            $('.childId').click(function (e) {
                if ($(e.target).hasClass('childId')) {
                    //$('.childId').not($(e.target)).removeClass('active');
                    $(e.target).toggleClass('active');
                }
                else {
                    //$('.childId').not($(e.target).parent('.childId')).removeClass('active');
                    $(e.target).parent('.childId').toggleClass('active');
                }
                _this.childIds = [];
                var childIds = [];
                $('.childId.active').each(function () {
                    if ($(this).prop('id') != 0) {
                        childIds.push($(this).prop('id'));
                    }
                });
                _this.childIds = childIds;
                _this.loadData();
            });
        }
    };
    DisplayEventsNewPage.prototype.getAttendingDetails = function () {
        var _this = this;
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.StoredEventData.event_id)
            .set('client_id', this.PersonData.CLIENT_ID)
            .set('person_id', this.PersonData.PERSON_ID)
            .set('first_name', this.PersonData.FIRST_NAME)
            .set('last_name', this.PersonData.LAST_NAME)
            .set('selectedTeam', this.PersonData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + "players/getPlayerAttending", Data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            _this.ReasonSelected = data.GETPLAYERATTENDING[0].reasondeclined.substring(0, 7);
            _this.confirmHighlight = data.GETPLAYERATTENDING[0].confirmed_status;
            for (var key in data.GETPLAYERATTENDING[0].reason_options_list) {
                if (data.GETPLAYERATTENDING[0].reason_options_list[key].confirm_reason == 'Y') {
                    _this.PlayerAttending.push(data.GETPLAYERATTENDING[0].reason_options_list[key]);
                }
                else {
                    _this.PlayerNotAttending.push(data.GETPLAYERATTENDING[0].reason_options_list[key]);
                }
            }
        }, function (error) {
        });
    };
    DisplayEventsNewPage.prototype.PreviousEventfunc = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('filter', '4')
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('SEASON_ID', _this.PersonData.SEASON_ID);
            _this.http.post(_this.global.APIURL + "events/getTeamEventsByMonthGroupPrev", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    if (data.GETTEAMEVENTSBYMONTHGROUP != '') {
                        _this.PreviousEventsDetails = data.GETTEAMEVENTSBYMONTHGROUP;
                        for (var key in _this.PreviousEventsDetails) {
                            var tempArray = [];
                            try {
                                var monthName = "";
                                var nextMonthName = "";
                                for (var key1 in _this.PreviousEventsDetails[key]) {
                                    try {
                                        if (_this.PastGameEvents.length == 0) {
                                            _this.PastGameEvents.push(_this.PreviousEventsDetails[key][key1]);
                                        }
                                        if (_this.PreviousEventsDetails[key][key1].date) {
                                            _this.MarkedEvents.push({ d: _this.PreviousEventsDetails[key][key1].date, color: '#43B7CC', data: _this.PreviousEventsDetails[key][key1] });
                                        }
                                        if (key1 == "month") {
                                            monthName = _this.PreviousEventsDetails[key][key1];
                                        }
                                        else if (key1 == "next_month") {
                                            nextMonthName = _this.PreviousEventsDetails[key][key1];
                                        }
                                        else {
                                            tempArray.push(_this.PreviousEventsDetails[key][key1]);
                                        }
                                    }
                                    catch (err) {
                                    }
                                }
                                tempArray.push(monthName);
                                tempArray.push(nextMonthName);
                                _this.PastmonthArray.push(tempArray);
                            }
                            catch (err) {
                            }
                        }
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    DisplayEventsNewPage.prototype.UpcomingEvent = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('filter', '1')
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('SEASON_ID', _this.PersonData.SEASON_ID);
            _this.http.post(_this.global.APIURL + "events/getTeamEventsByMonthGroup", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    if (data.GETTEAMEVENTSBYMONTHGROUP != '') {
                        _this.EventsDetails = data.GETTEAMEVENTSBYMONTHGROUP;
                        for (var key in _this.EventsDetails) {
                            var tempArray = [];
                            for (var key1 in _this.EventsDetails[key]) {
                                if (_this.UpCommingEvents.length <= 2) {
                                    if (_this.UpCommingEventsType.includes(_this.EventsDetails[key][key1].event_type_id)) {
                                        var index = _this.UpCommingEventsType.indexOf(_this.EventsDetails[key][key1].event_type_id);
                                        _this.UpCommingEventsType.splice(index, 1);
                                        _this.UpCommingEvents.push(_this.EventsDetails[key][key1]);
                                    }
                                    // console.log(this.UpCommingEvents)
                                }
                                if (_this.EventsDetails[key][key1].date) {
                                    _this.MarkedEvents.push({ d: _this.EventsDetails[key][key1].date, color: '#43B7CC', data: _this.EventsDetails[key][key1] });
                                }
                                if (_this.EventsDetails[key][key1].event_notes && (_this.EventsDetails[key][key1].event_notes === true || !(_this.EventsDetails[key][key1].event_notes).replace(/\s/g, '').length)) {
                                    if (_this.FunctionAccess.user_adminLevel == 4) {
                                        _this.EventsDetails[key][key1].event_notes = 'No Notes';
                                    }
                                    else {
                                        _this.EventsDetails[key][key1].event_notes = 'Create Note';
                                    }
                                }
                                tempArray.push(_this.EventsDetails[key][key1]);
                            }
                            _this.monthArray.push(tempArray);
                            // console.log(this.monthArray)
                        }
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    DisplayEventsNewPage.prototype.getEventType = function (eventType, event) {
        // console.log('eventType',eventType)
        $(event.target).closest('.navbar-nav').find('li').removeClass('active');
        $(event.target).closest('li').addClass('active');
        this.monthArray = [];
        this.CardViewSeeMore = 0;
        if (eventType == 1) {
            // console.log('eventType1',eventType)
            for (var key2 in this.EventsDetails) {
                var tempArray2 = [];
                var x = false;
                for (var key3 in this.EventsDetails[key2]) {
                    if (this.EventsDetails[key2][key3].event_type_id == eventType) {
                        // console.log(this.EventsDetails[key2][key3])
                        tempArray2.push(this.EventsDetails[key2][key3]);
                        x = true;
                    }
                    else if ((key3 == 'month' || key3 == 'next_month') && x) {
                        tempArray2.push(this.EventsDetails[key2][key3]);
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
                    this.monthArray.push(tempArray2);
                    console.log(this.monthArray);
                }
            }
            if (this.monthArray.length > 0) {
                this.monthArray[this.monthArray.length - 1][(this.monthArray[this.monthArray.length - 1]).length - 1] = '';
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
                        tempArray2.push(this.EventsDetails[key2][key3]);
                        x = true;
                    }
                    else if ((key3 == 'month' && x || key3 == 'next_month' && x)) {
                        tempArray2.push(this.EventsDetails[key2][key3]);
                    }
                    // lastkey2=JSON.stringify(parseInt(key2)+1)
                }
                // console.log(tempArray2)
                if (tempArray2.length > 0) {
                    this.monthArray.push(tempArray2);
                    // console.log(this.monthArray)
                }
            }
            if (this.monthArray.length > 0) {
                this.monthArray[this.monthArray.length - 1][(this.monthArray[this.monthArray.length - 1]).length - 1] = '';
            }
            // console.log(this.monthArray[this.monthArray.length-1][(this.monthArray[this.monthArray.length-1]).length-1])
        }
        else if (eventType == 'all') {
            for (var key2 in this.EventsDetails) {
                var tempArray2 = [];
                for (var key3 in this.EventsDetails[key2]) {
                    tempArray2.push(this.EventsDetails[key2][key3]);
                }
                this.monthArray.push(tempArray2);
                console.log(this.monthArray);
            }
        }
    };
    DisplayEventsNewPage.prototype.onGesture = function (gesture) {
        if (this.swipedDown == false) {
            this.swipedDown = true;
            this.OpenPreviousEvent(gesture);
        }
    };
    DisplayEventsNewPage.prototype.onSwipe = function (event) {
        if (event.offsetDirection == 4) {
            this.closeFilter();
        }
    };
    DisplayEventsNewPage.prototype.OpenPreviousEvent = function (event) {
        $('.CalenderView').show();
        $('.well').removeClass('shadow');
        $('.well').removeClass('float-top');
        this.PreviousEvent = true;
    };
    DisplayEventsNewPage.prototype.UpCmngSeeMore = function (event) {
        if (this.UpCommingEvents.length > 1) {
            $('.well').removeClass('shadow');
            this.CollapseUpCommingEvents = true;
            this.UpCommingSeeMore = this.UpCommingEvents.length - 1;
        }
    };
    DisplayEventsNewPage.prototype.UpCmngSeeLess = function (event) {
        $('.well').addClass('shadow');
        this.CollapseUpCommingEvents = false;
        this.UpCommingSeeMore = 0;
    };
    DisplayEventsNewPage.prototype.CardSeeMore = function (event) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').hide();
        $(event.target).closest('.ExtraMonth').find('.mb-50').hide();
        $(event.target).closest('.ExtraMonth').find('.mt-20').show();
        this.CardViewSeeMore = this.CardViewSeeMore + 1;
    };
    DisplayEventsNewPage.prototype.CardSeeLess = function (val) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').show();
        $(event.target).closest('.ExtraMonth').find('.mb-50').show();
        $(event.target).closest('.ExtraMonth').find('.mt-20').hide();
        if (this.CardViewSeeMore > 0) {
            this.CardViewSeeMore = val;
        }
    };
    DisplayEventsNewPage.prototype.seePastGames = function (event) {
        if ($(event.target).html() == 'SEE UPCOMING EVENTS') {
            $('.CalenderView').hide();
            $(event.target).closest('.user-form').find('.emptyclass').hide();
            $('.well').addClass('float-top');
            $('.well').addClass('shadow');
            this.PreviousEvent = false;
            this.swipedDown = false;
        }
        else {
            $(event.target).html('SEE UPCOMING EVENTS');
            $(event.target).closest('.user-form').find('.select-events').show();
        }
    };
    DisplayEventsNewPage.prototype.PreviousEventDetails = function (event) {
        $(event.target).closest('.event-card').find('.well').show();
        $(event.target).closest('.emptyclass').find('.section-less').show();
    };
    DisplayEventsNewPage.prototype.SeeLessPastEvents = function (event) {
        // $(event.target).closest('.event-card').find('.well').hide();
        $(event.target).closest('.emptyclass').find('.section-less').hide();
        $(event.target).closest('.emptyclass').find('.well').hide();
    };
    DisplayEventsNewPage.prototype.StillComingTick = function (event, yesComing) {
        this.notComingFlag = 0;
        if (yesComing == 0) {
            $(event.target).closest('.event-icons').find('.close-icon').removeClass('close-top-arrow');
            $(event.target).closest('.check-icon').addClass('check-top-arrow');
            $(event.target).closest('.row').find('.noComing').hide();
            $(event.target).closest('.row').find('.yesComing').show();
            this.yesComingFlag = 1;
        }
        else {
            $(event.target).closest('.event-icons').find('.close-icon').removeClass('close-top-arrow');
            $(event.target).closest('.check-icon').removeClass('check-top-arrow');
            $(event.target).closest('.row').find('.yesComing').hide();
            this.yesComingFlag = 0;
        }
    };
    DisplayEventsNewPage.prototype.NotComing = function (event, notComing) {
        this.yesComingFlag = 0;
        if (notComing == 0) {
            $(event.target).closest('.event-icons').find('.check-icon').removeClass('check-top-arrow');
            $(event.target).closest('.close-icon').addClass('close-top-arrow');
            $(event.target).closest('.row').find('.yesComing').hide();
            $(event.target).closest('.row').find('.noComing').show();
            this.notComingFlag = 1;
        }
        else {
            $(event.target).closest('.event-icons').find('.check-icon').removeClass('check-top-arrow');
            $(event.target).closest('.close-icon').removeClass('close-top-arrow');
            $(event.target).closest('.row').find('.noComing').hide();
            this.notComingFlag = 0;
        }
    };
    DisplayEventsNewPage.prototype.ChangePreviousEvent = function (event) {
        if (event != '') {
            this.PastGameEvents = [];
            for (var key in event) {
                this.PastGameEvents.push(event[key]);
            }
        }
    };
    DisplayEventsNewPage.prototype.presentAlert = function (Title, SubTitle) {
        var _this = this;
        var alert = this.Alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
        alert.onDidDismiss(function () {
            _this.storage.get('SSODetails').then(function (val) {
                if (val) {
                    // this.navCtrl.setRoot(TabsPage,{Player_menu:val.SHOWPLAYERSMENU==1?'yes':'no'});
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__tabs_tabs__["a" /* TabsPage */]);
                }
            });
        });
    };
    DisplayEventsNewPage.prototype.gotoStillComming = function () {
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            if (val) {
                // this.gotoAttandance()
            }
            else {
                alert("Please check Next Event");
            }
        });
    };
    DisplayEventsNewPage.prototype.SinglePlayersAttdStates = function (response, confirm, reasondeclineds, AttendyPersonId, event) {
        var _this = this;
        $('.check-icon').removeClass('check-top-arrow');
        $('.close-icon').removeClass('close-top-arrow');
        if (response == 'tick') {
            $('.event-icons').find('.check-icon').addClass('RemoveOpacity');
            $('.event-icons').find('.close-icon').removeClass('RemoveOpacity');
        }
        else if (response == 'close') {
            $('.event-icons').find('.check-icon').removeClass('RemoveOpacity');
            $('.event-icons').find('.close-icon').addClass('RemoveOpacity');
        }
        this.ReasonSelected = reasondeclineds.substring(0, 7);
        var attended = 0;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var target = event.target;
        if (confirm == 'Y') {
            confirm = 'YES';
            attended = 1;
        }
        else if (confirm == 'N') {
            confirm = 'NO';
        }
        var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.StoredEventData.event_id)
            .set('personId', AttendyPersonId)
            .set('attended', attended)
            .set('confirmed', confirm)
            .set('reasondeclined', reasondeclineds)
            .set('reasondeclined_by_coach', '-1')
            .set('state_time', '')
            .set('selectedTeam', this.PersonData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.logger.EventPlayerReason('PlayerEventReasonSelect', { pram: Date.now() });
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
        }, function (error) {
        });
    };
    DisplayEventsNewPage.prototype.gotoCreateNote = function (index) {
        var _this = this;
        if (this.PersonData.adminLevel != 4 && (!this.PersonData.ISPARENT || (this.PersonData.ISPARENT && this.PersonData.PERSON_ID == this.PersonData.PARENT_ID))) {
            var modal = this.mdlCtrl.create('CreateNodePage', { 'eventid': this.UpCommingEvents[index]['event_id'], 'event_notes': this.UpCommingEvents[index]['event_notes'] }, { 'showBackdrop': true, 'enableBackdropDismiss': true });
            modal.present();
            modal.onDidDismiss(function (data) {
                if (typeof data != 'undefined') {
                    _this.CreateNote[index] = data.length ? data : 'Create note';
                    _this.UpCommingEvents[index]['event_notes'] = data;
                }
            });
        }
    };
    DisplayEventsNewPage.prototype.gotoEventHome = function (EventData) {
        console.log("gotoEventHome", EventData);
        this.navCtrl.push('EventHomeNewPage', { 'EventDetails_eventId': EventData });
        //this.app.getActiveNav().select(0);
        //this.app.getActiveNav().push(EventHomeNewPage,{'EventDetails_eventId':EventData});
        this.storage.set('BackButton', true);
    };
    DisplayEventsNewPage.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [month, day, year].join('/');
    };
    DisplayEventsNewPage.prototype.formatDateNew = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    DisplayEventsNewPage.prototype.getFirstDayOfWeek = function () {
        var curr = new Date; // get current date
        // let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var firstDay = new Date(curr.getFullYear(), curr.getMonth(), 1);
        // return new Date(curr.setDate(first)).toString();
        return new Date(curr).toString();
    };
    DisplayEventsNewPage.prototype.scrollTo = function (elementId) {
        var y;
        if (document.getElementById('H' + elementId)) {
            y = $('#H' + elementId).offset().top - ($('ion-header.top-bar').height() + 5) + this.content._scroll.getTop();
        }
        if (typeof y != 'undefined') {
            this.content.scrollTo(0, y, 2000);
        }
    };
    DisplayEventsNewPage.prototype.tryAgain = function () {
        this.ionViewDidLoad();
    };
    DisplayEventsNewPage.prototype.showFullCalender = function () {
        $('.profileFirst, .CalenderView, .showFullCalender').hide();
        $('.CalenderFullView, .hideFullCalender').show();
        $('ion-header, .scroll-content').addClass('showFullCalender');
    };
    DisplayEventsNewPage.prototype.hideFullCalender = function () {
        $('.CalenderFullView, .hideFullCalender').hide();
        $('.profileFirst, .CalenderView, .showFullCalender').show();
        $('ion-header, .scroll-content').removeClass('showFullCalender');
    };
    //pull to refresh
    DisplayEventsNewPage.prototype.detectTop = function (refresher) {
        // console.log("Scroll to top",refresher);
        // console.log("Now started date is",this.dateStartedPrev);
        // let dataNewStarted = new Date(this.dateStartedPrev);
        // let dataNewEnded = new Date(this.dateStartedPrev);
        var dataNewStarted = new Date(this.eventList[0].DATE_STARTED);
        var dataNewEnded = new Date(this.eventList[0].DATE_STARTED);
        // console.log("ended date ",dataNewEnded);
        dataNewEnded.setDate(dataNewEnded.getDate() - 1);
        dataNewStarted.setDate(dataNewStarted.getDate() - 10);
        this.dateStartedPrev = dataNewStarted;
        // console.log("Now started date is",this.formatDateNew(dataNewStarted),"new ended date",this.formatDateNew(dataNewEnded) );
        this.getPreEventList(this.dateStartedPrev, dataNewEnded);
        setTimeout(function () {
            refresher.complete();
        }, 500);
    };
    //getting previous event 
    DisplayEventsNewPage.prototype.getPreEventList = function (dateNewStarted, dateNewEnded) {
        var _this = this;
        // console.log("Now started date is from get Event",dateNewStarted,"new ended date",dateNewEnded );
        this.dateStarted = this.formatDateNew(dateNewStarted);
        this.dateEnded = this.formatDateNew(dateNewEnded);
        this.prevEvent = true;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('selectedTeams', JSON.stringify(_this.selectedTeams))
                .set('client_ids', JSON.stringify(_this.client_ids))
                .set('divisionIds', JSON.stringify(_this.divisionIds))
                .set('sportIds', JSON.stringify(_this.sportIds))
                .set('childPersonIds', JSON.stringify(_this.childIds))
                .set('personId', _this.PersonData.PERSON_ID)
                .set('dateStarted', _this.dateStarted)
                .set('dateEnded', _this.dateEnded)
                .set('isScroll', _this.isScroll)
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "events/getEventList", PlayersData)
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    if (data.EVENTLIST) {
                        if (!_this.prevEvent) {
                            _this.eventList = data.EVENTLIST;
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
                        for (var key in data.EVENTLIST) {
                            if (_this.prevEvent) {
                                _this.eventList.unshift(data.EVENTLIST[key]);
                                // console.log("Previus Events 1266",data.EVENTLIST[key]);
                            }
                            //   this.MarkedEvents.unshift({ d: this.formatDateNew(data.EVENTLIST[key].DATE_STARTED), color: '#43B7CC',data: data.EVENTLIST[key] })
                            // }
                        }
                        // setTimeout(() => {
                        //   this.isDataLoading = false;
                        // }, 1000);
                        // resolve(true);
                    }
                    else {
                        // setTimeout(() => {
                        //   this.isDataLoading = false;
                        // }, 1000);
                        // resolve(false)
                        var newStartDate = new Date(_this.dateStartedPrev);
                        _this.dateStartedPrev.setDate(newStartDate.getDate() - 6);
                        // console.log("else part 1286",this.dateStartedPrev);
                    }
                }
            }, function (error) {
                setTimeout(function () {
                    _this.isDataLoading = false;
                }, 1000);
                resolve(false);
            });
        });
    };
    //toggling filter for admin starts
    DisplayEventsNewPage.prototype.openSublist = function (i) {
        console.log("Getting Id ", '#sub' + i);
        var id = ("#sub").concat(i);
        $(id).toggle();
    };
    DisplayEventsNewPage.prototype.openSportsList = function (sportName, divisionName, j) {
        // var id = ("#div").concat(j);
        var id = ("#divi".concat(sportName).concat(divisionName).concat(j));
        $(id).toggle();
    };
    //toggling filter for admin ends
    //toggling filter for coachs starts
    DisplayEventsNewPage.prototype.openSublist2 = function (j) {
        console.log("Getting Id ", '#sub' + j);
        var id = ("#sublist").concat(j);
        $(id).toggle();
    };
    DisplayEventsNewPage.prototype.openSportsList2 = function (sportName, divisionName, i) {
        // var id = ("#div").concat(j);
        var id = ("#div".concat(sportName).concat(divisionName).concat(i));
        $(id).toggle();
    };
    //toggling filter for coach ends
    //marking
    DisplayEventsNewPage.prototype.marking = function (sportsId, teamId, divisionId) {
        var _this = this;
        console.log("from marking function 1391 sportsId", sportsId, "teamId", teamId);
        // pointing division starts
        if (this.divisionBuckets.has(divisionId)) {
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        else {
            this.divisionBuckets.set(divisionId, []);
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        this.divisionBuckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'events1').innerHTML = map.get(key).length;
            }
            else {
                document.getElementById(key + 'events1').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
        this.storage.set('divisionBuckets', jsonText2);
        // pointing division ends
        // pointing Sports starts
        if (this.buckets.has(sportsId)) {
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        else {
            this.buckets.set(sportsId, []);
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        this.buckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'events1').innerHTML = map.get(key).length + ' selected';
            }
            else {
                document.getElementById(key + 'events1').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
        this.storage.set('bucket', jsonText);
        // pointing Sports ends
    };
    DisplayEventsNewPage.prototype.marking2 = function (sportsId, teamId, divisionId) {
        var _this = this;
        console.log("from marking2 function 1419 sportsId", sportsId, "teamId", teamId, "divisionId", divisionId);
        // pointing division starts
        if (this.divisionBuckets.has(divisionId)) {
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        else {
            this.divisionBuckets.set(divisionId, []);
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        this.divisionBuckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'events2').innerHTML = map.get(key).length;
            }
            else {
                document.getElementById(key + 'events2').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
        this.storage.set('divisionBuckets', jsonText2);
        // pointing division ends
        // pointing Sports starts
        if (this.buckets.has(sportsId)) {
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        else {
            this.buckets.set(sportsId, []);
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        this.buckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'events2').innerHTML = map.get(key).length + ' selected';
            }
            else {
                document.getElementById(key + 'events2').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
        this.storage.set('bucket', jsonText);
        // pointing Sports ends
    };
    //initial marking
    DisplayEventsNewPage.prototype.markSports = function () {
        var _this = this;
        //initial marking for division starts
        this.storage.get("divisionBuckets").then(function (val) {
            _this.divisionBuckets = new Map(JSON.parse(val));
            _this.divisionBuckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'events1').innerHTML = map.get(key).length;
                }
                else {
                    document.getElementById(key + 'events1').innerHTML = '';
                }
                _this.filterHandler();
            });
        });
        //initial marking for division ends
        // initial marking for sports starts
        this.storage.get("bucket").then(function (val) {
            _this.buckets = new Map(JSON.parse(val));
            _this.buckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'events1').innerHTML = map.get(key).length + ' selected';
                }
                else {
                    document.getElementById(key + 'events1').innerHTML = '';
                }
                _this.filterHandler();
            });
        });
        // initial marking for sports ends
    };
    DisplayEventsNewPage.prototype.markSports2 = function () {
        var _this = this;
        //initial marking for division starts
        this.storage.get("divisionBuckets").then(function (val) {
            _this.divisionBuckets = new Map(JSON.parse(val));
            _this.divisionBuckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'events2').innerHTML = map.get(key).length;
                }
                else {
                    document.getElementById(key + 'events2').innerHTML = '';
                }
                _this.filterHandler();
            });
        });
        //initial marking for division ends
        // initial marking for sports starts
        this.storage.get("bucket").then(function (val) {
            _this.buckets = new Map(JSON.parse(val));
            _this.buckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'events2').innerHTML = map.get(key).length + ' selected';
                }
                else {
                    document.getElementById(key + 'events2').innerHTML = '';
                }
                _this.filterHandler();
            });
        });
        // initial marking for sports ends
    };
    DisplayEventsNewPage.prototype.offlinecheck = function (value) {
        if (this.existingEvents && this.existingEvents.length > 0) {
            return this.existingEvents.some(function (item) { return item.eventid === value.EVENT_ID; });
        }
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], DisplayEventsNewPage.prototype, "content", void 0);
    DisplayEventsNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-display-events-new',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/display-events-new/display-events-new.html"*/'<div class="top-bar clearfix navbar-fixed-top">\n    <div class="prev-next pull-right doubleArrow" *ngIf="!offlineConnection && isEventList" (click)="showFilter()">\n        <a href="javascript:void(0);"><img src="assets/images/event-filter-icon.svg" class="filtter_button"></a>\n        <a href="javascript:void(0);"><img src="assets/images/event-filter-icon-active.svg"\n                class="filtter_button active"></a>\n    </div>\n    <div class="prev-next pull-left leftArrow">\n        <a href="javascript:void(0);" class="showFullCalender" (click)="showFullCalender()"><i\n                class="fa fa-chevron-left"></i></a>\n        <a href="javascript:void(0);" class="hideFullCalender" (click)="hideFullCalender()"><i\n                class="fa fa-times"></i></a>\n    </div>\n</div>\n<ion-header class="top-bar">\n    <!--<div class="bg-header navbar-fixed-top ">\n            <div class="title fontBold ScrolledUpCard">EVENTS\n                <!--<img src="assets/images/group-name.png" class="rounded-circle pull-right coustom_img_float">\n                <img src="assets/images/group-name.png" class="rounded-circle pull-right coustom_img_float">\n                <img src="assets/images/group-name.png" class="rounded-circle pull-right coustom_img_float">-->\n    <!-- </div>\n    </div> -->\n    <mbsc-form class="CalenderView">\n        <mbsc-form-group>\n            <mbsc-calendar [options]="myCalendarOptions" [marked]="MarkedEvents" [ngModelOptions]="{standalone: true}"\n                [(ngModel)]="calendarOneWeek" display="inline" weeks="1"></mbsc-calendar>\n        </mbsc-form-group>\n    </mbsc-form>\n</ion-header>\n\n\n<ion-content class="bg-gray event cardBottom" (ionScrollEnd)="detectBottom()">\n    <!--(ionScrollEnd)="logScrollEnd()"-->\n\n    <ion-refresher (ionRefresh)="detectTop($event)">\n        <ion-refresher-content pullingText="Load Previous Event" pullingIcon="arrow-dropdown"\n            refreshingSpinner="circles">\n        </ion-refresher-content>\n    </ion-refresher>\n    <!-- no internet message start -->\n    <!-- <div class="background_grey" *ngIf="offlineConnection">\n        <div class="off-wrap">\n            <p><img src="assets/images/events-new-icon/offline-logo-alt.svg" class=""></p>\n            <h3>OFFLINE</h3>\n            <p>Your network is unavalaible, please check your data or connection</p>\n            <button type="button" class="btn btn-sm-black try-again" (click)="tryAgain()">TRY AGAIN</button>\n        </div>\n    </div> -->\n    <!-- no internet message end -->\n\n    <section class="main" >\n        <!-- loading skeleton -->\n        <div class="skeleton" *ngIf="!isEventList">\n            <h3 class="title fadeShine"></h3>\n            <div class="list-item">\n                <div class="infoList fadeShine"></div>\n                <div class="infoList fadeShine"></div>\n            </div>\n            <h4 class="title fadeShine"></h4>\n            <div class="dark_underline"></div>\n            <div class="well eventOption fadeShine"></div>\n\n            <h4 class="title fadeShine"></h4>\n            <div class="dark_underline"></div>\n            <div class="well eventOption fadeShine"></div>\n        </div>\n\n        <!-- loading skeleton End-->\n        <form action="" class="user-form profile cardBottom" *ngIf="monthArray || PastmonthArray">\n            <mbsc-form class="CalenderFullView">\n                <mbsc-form-group>\n                    <mbsc-calendar [options]="myCalendarOptions" [marked]="MarkedEvents"\n                        [ngModelOptions]="{standalone: true}" [(ngModel)]="calendarOneWeek" display="inline"\n                        months="1"></mbsc-calendar>\n                </mbsc-form-group>\n            </mbsc-form>\n\n            <section class="profileFirst heightAuto xs-padding">\n\n\n                <div class="eventFixed" *ngFor="let key of eventList; let i = index">\n                    <h4 *ngIf="i==0 || (i>0 && key.DATE_STARTED != eventList[i-1].DATE_STARTED)"\n                        class="text-left heading_blue_section" id="H{{key.DATE_STARTED | date: \'MMMd\'}}">\n                        {{key.DATE_STARTED | date: "EEEE d MMMM"}}</h4>\n                    <div *ngIf="i==0 || (i>0 && key.DATE_STARTED != eventList[i-1].DATE_STARTED)"\n                        class="dark_underline"></div>\n                    <div class="PastEventCard">\n                        <div class="well eventOption text-left" id="G{{key.DATE_STARTED | date: \'MMMd\'}}"\n                            (click)="gotoEventHome(key)" *ngIf="key.EVENT_TYPE_ID==1"\n                            [ngStyle]="{\'background\':  appTheme && appTheme.Games_color_tile ? appTheme.Games_color_tile : \'#fdb913\'}">\n                            <div class="row">\n                                <div class="col-xs-11 p-0 mb-10">\n                                    <h4 class="coustom_pull_left fontBold sportDivision"\n                                    [ngStyle]="{\'color\':  appTheme && appTheme.Games_color_text_1 ? appTheme.Games_color_text_1 : \'#fff\'}">\n                                        <span *ngFor="let child of key.CHILDLIST; let i=index;"><span *ngIf="i>0">,\n                                            </span>{{child.FIRSTNAME}} {{child.LASTNAME}}</span>\n                                        <span *ngIf="key.CHILDLIST.length">-</span> {{key.SPORTNAME}} -\n                                        {{key.DIVISION_NAME}}\n                                    </h4>\n                                </div>\n                                <div class="col-xs-1 p-0 mb-10 text-right next-group">\n                                    <img src="assets/images/right arrow.svg" class="next_arrow">\n                                </div>\n                                <div class="col-xs-9 p-0">\n                                    <h4 class="sub-title_coustom fontBold"\n                                    [ngStyle]="{\'color\':  appTheme && appTheme.Games_color_text_1 ? appTheme.Games_color_text_1 : \'#15233C\'}">\n                                    {{key.TEAMHOME_NAME}} vs {{key.TEAMAWAY_NAME}}</h4>\n                                </div>\n                                <div class="img-group col-xs-3 p-0 text-right" *ngIf="key.CHILDLIST.length > 0">\n                                    <span class="xs_img" *ngFor="let child of key.CHILDLIST">\n                                        <img *ngIf="child.PHOTOPATH != \'\'; else noImage"\n                                            src="{{global.PROFILEIMAGEURL + child.PHOTOPATH}}" alt="" class="img-circle"\n                                            onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                        <ng-template #noImage>\n                                            <div class="img-circle"><span class="img-text">{{child.FIRSTNAME[0] |\n                                                    uppercase}} {{child.LASTNAME[0] | uppercase}} </span></div>\n                                        </ng-template>\n                                    </span>\n                                </div>\n                               \n                            </div>\n                            <h4 class="coustom_pull_left fontBold"\n                            [ngStyle]="{\'color\':  appTheme && appTheme.Games_color_text_1 ? appTheme.Games_color_text_1 : \'#fff\'}">\n                                <span *ngIf="key.TIME != \'\'">{{key.TIME}},\n                                </span>{{key.DATE_STARTED | date: "EEEE d"}}</h4>\n                            <div class="row">\n                                <div class="col-xs-10 infoText p-0">\n                                    <h4 class="add-item" *ngIf="key.GROUND_NAME != \'\' && key.GROUND_ADDRESS != \'\'"\n                                    [ngStyle]="{\'color\':  appTheme && appTheme.Games_color_text_2 ? appTheme.Games_color_text_2 : \'#000000\'}">\n                                        {{key.GROUND_NAME}}, {{key.GROUND_ADDRESS}}</h4>\n                                </div>\n                            </div>\n                           \n                            <!-- <div class="divider mt-10" *ngIf="key.ISSCOREUPDATED"></div> -->\n                            <div class="divider mt-10"></div>\n                            <!-- <div class="text-left" *ngIf="key.ISSCOREUPDATED"> -->\n                                <div class="text-left">\n                                <h4 class="infoBox">\n                                    <img *ngIf="key.HOMECLUBLOGO.length > 0 && key.AWAYCLUBLOGO.length > 0"\n                                        src="{{global.CHATGROUPLOGOURL}}{{key.HOMECLUBLOGO}}" class="xs-img">\n                                    <span class="text-score" [ngStyle]="{\'color\':  appTheme && appTheme.Games_color_text_2 ? appTheme.Games_color_text_2 : \'#fff\'}">\n                                        {{key.simple_home_score}} - {{key.simple_away_score}}</span>\n                                    <img *ngIf="key.HOMECLUBLOGO.length > 0 && key.AWAYCLUBLOGO.length > 0"\n                                        src="{{global.CHATGROUPLOGOURL}}{{key.AWAYCLUBLOGO}}" class="xs-img">\n                                </h4>\n                            </div>\n                            <div class="divider mt-10" *ngIf="key.EVENT_NOTES != \'\'"></div>\n                            <div class="text-left" *ngIf="key.EVENT_NOTES != \'\'">\n                                <h4 class="infoBox">\n                                    <img src="assets/images/megaphone.svg" class="megafone_png">\n                                    <span class="text-item" [ngStyle]="{\'color\':  appTheme && appTheme.Games_color_text_2 ? appTheme.Games_color_text_2 : \'#fff\'}">\n                                        {{key.EVENT_NOTES}}</span>\n                                </h4>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="PastEventCard">\n                        <div class="well eventOption blue-alt text-left" id="T{{key.DATE_STARTED | date: \'MMMd\'}}"\n                            (click)="gotoEventHome(key)" *ngIf="key.EVENT_TYPE_ID==2"\n                            [ngStyle]="{\'background\':  appTheme && appTheme.Training_color_tile ? appTheme.Training_color_tile : \'#004278\'}">\n                            <div class="row">\n                                <div class="col-xs-11 p-0 mb-10">\n                                    <h4 class="coustom_pull_left fontBold sportDivision"\n                                    [ngStyle]="{\'color\':  appTheme && appTheme.Training_color_text_1 ? appTheme.Training_color_text_1 : \'#fff\'}">\n                                        <span *ngFor="let child of key.CHILDLIST; let i=index;"><span *ngIf="i>0">,\n                                            </span>{{child.FIRSTNAME}} {{child.LASTNAME}}</span>\n                                        <span *ngIf="key.CHILDLIST.length">-</span> {{key.SPORTNAME}} -\n                                        {{key.DIVISION_NAME}}\n                                    </h4>\n                                </div>\n                                <div class="col-xs-1 p-0 mb-10 text-right next-group">\n                                    <img src="assets/images/right arrow.svg" class="next_arrow">\n                                </div>\n                               \n                                <div class="col-xs-9 p-0">\n                                    <h4 class="sub-title_coustom fontBold"\n                                    [ngStyle]="{\'color\':  appTheme && appTheme.Training_color_text_1 ? appTheme.Training_color_text_1 : \'#15233C\'}">\n                                    {{key.EVENT_NAME}}</h4>\n                                    <h4 class="sub-title_coustom fontBold" [ngStyle]="{\'color\':  appTheme && appTheme.Training_color_text_1 ? appTheme.Training_color_text_1 : \'#15233C\'}">\n                                        {{key.TEAMHOME_NAME}}</h4>\n                                </div>\n                                <div class="img-group col-xs-3 p-0 text-right" *ngIf="key.CHILDLIST.length > 0">\n                                    <span class="xs_img" *ngFor="let child of key.CHILDLIST">\n                                        <img *ngIf="child.PHOTOPATH != \'\'; else noImage"\n                                            src="{{global.PROFILEIMAGEURL + child.PHOTOPATH}}" alt="" class="img-circle"\n                                            onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                        <ng-template #noImage>\n                                            <div class="img-circle"><span class="img-text">{{child.FIRSTNAME[0] |\n                                                    uppercase}} {{child.LASTNAME[0] | uppercase}} </span></div>\n                                        </ng-template>\n                                    </span>\n                                </div>\n                                <div class="col-xs-1 p-0 mb-10 text-right next-group" *ngIf="offlinecheck(key)">\n                                    <img src="assets/images/offline.png">\n                                </div>\n                            </div>\n                            <h4 class="coustom_pull_left fontBold" [ngStyle]="{\'color\':  appTheme && appTheme.Training_color_text_1 ? appTheme.Training_color_text_1 : \'#15233C\'}">\n                                <span *ngIf="key.TIME != \'\'">{{key.TIME}},\n                                </span>{{key.DATE_STARTED | date: "EEEE d"}}</h4>\n                            <h4 class="add-item" *ngIf="key.GROUND_NAME != \'\' && key.GROUND_ADDRESS != \'\'" [ngStyle]="{\'color\':  appTheme && appTheme.Training_color_text_2 ? appTheme.Training_color_text_2 : \'#15233C\'}">\n                                {{key.GROUND_NAME}}, {{key.GROUND_ADDRESS}}</h4>\n                            <div class="divider mt-10" *ngIf="key.EVENT_NOTES != \'\'"></div>\n                            <div class="text-left" *ngIf="key.EVENT_NOTES != \'\'">\n                                <h4 class="text-item" [ngStyle]="{\'color\':  appTheme && appTheme.Training_color_text_2 ? appTheme.Training_color_text_2 : \'#fff\'}">\n                                    {{key.EVENT_NOTES}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n\n\n                <div class="event-card select-events bg-gray cardBottom" *ngIf="isEventList && eventList.length == 0">\n                    <div class="well select-card ">\n                        <div class="row">\n                            <div class="col-xs-12 ">\n                                <h5 class="sub-title">No events this week, browse calendar or refine your filter\n                                    selection</h5>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </section>\n            <ion-infinite-scroll threshold="50px" (ionInfinite)="initInfinteScroll($event)">\n                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n        </form>\n\n    </section>\n\n\n</ion-content>\n\n<div class="filter_overlay" style="display: none;" (swipe)="onSwipe($event)">\n    <div class="fliter">\n        <div class="itemList clearfix">\n            <div class="pull-left">\n                <img class="filterBack" src="assets/images/arrow-white.svg" (click)="filterBack()" />\n                <p class="sub-title"\n                    *ngIf="(FunctionAccess?.user_adminLevel == 4) || (PersonData && PersonData.ISPARENT) ">FILTER</p>\n                <p class="sub-title2"\n                    *ngIf="(FunctionAccess?.user_adminLevel == 1) ||  (FunctionAccess?.user_adminLevel == 2) || (FunctionAccess?.user_adminLevel == 3)">\n                    ACTIVITY</p>\n            </div>\n            <div class="pull-right close-icon" (click)="closeFilter()">\n                <img src="assets/images/close-icon.svg" alt="">\n            </div>\n        </div>\n\n        <!-- filter for coach start -->\n        <div class="fliter_options"\n            *ngIf="(FunctionAccess && FunctionAccess?.user_adminLevel == 2) || (FunctionAccess?.user_adminLevel == 3) ">\n            <p class="color">\n                <span class="suggestion">Select activity to filter</span>\n                <span class="selected">{{selectedFilter}} Selected</span>\n            </p>\n            <div class="itemList clearfix">\n                <div class="pull-left">\n                    <p>Activity</p>\n                </div>\n                <!-- <div class="pull-right">\n                    <div class="toggle"> \n                        <label class="switch">\n                        <input type="checkbox" class="sports" value="0" [checked]="sportIds.indexOf(\'0\') > -1">\n                        <span class="slider round"></span>\n                        </label>\n                    </div>\n                </div> -->\n            </div>\n            <div class="itemList clearfix" *ngFor="let key of sportsList;let j = index">\n                <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID?.toString()) > -1"\n                    id="{{key.SPORTID}}" (click)="openSublist2(j)">\n                    <p>{{key.SPORTNAME}}</p>\n                    <p id="{{key.SPORTID}}events1" style="width: 25%;color: gray;"></p>\n                </div>\n\n                <div id="sublist{{j}}" style="display: none;">\n                    <div class="itemListInfo clearfix subFilter has-child"\n                        *ngFor="let division of key.DIVISIONLIST; let i = index">\n                        <div class="font_light" class="division"\n                            [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)"\n                            id="{{division.DIVISIONID}}"\n                            (click)="openSportsList2(key.SPORTNAME[0],division.DIVISIONID,i)">\n                            <p class="divi">{{division.DIVISIONNAME}}</p>\n                            <p id="{{division.DIVISIONID}}events1" style="width: 5%;color: gray;"></p>\n                        </div>\n                        <div id="div{{key.SPORTNAME[0]}}{{division.DIVISIONID}}{{i}}" class="font_light"\n                            class="division" style="display: none;">\n                            <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                                <div class="font_light" class="team"\n                                    [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID?.toString()) > -1)"\n                                    id="{{team.CLUBDIVISIONID}}"\n                                    (click)="marking(key.SPORTID,team.CLUBDIVISIONID,division.DIVISIONID)">\n                                    <p class="divi">{{team.TEAMNAME}}</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- filter for coach ends  -->\n\n        <!-- filter for parent and player start -->\n        <div class="fliter_options"\n            *ngIf="(FunctionAccess && FunctionAccess.user_adminLevel == 4) || ((PersonData && PersonData.ISPARENT) && (!FunctionAccess.user_adminLevel == 1)) ">\n            <div class="itemList clearfix">\n                <div class="pull-left">\n                    <p class="parent">Sports</p>\n                </div>\n                <!-- <div class="pull-right">\n                    <div class="toggle">\n                        <label class="switch">\n                        <input type="checkbox" class="sports" value="0" [checked]="sportIds.indexOf(\'0\') > -1">\n                        <span class="slider round"></span>\n                        </label>\n                    </div>\n                </div> -->\n            </div>\n            <div class="itemList clearfix" *ngFor="let key of sportsList">\n                <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID?.toString()) > -1"\n                    id="{{key.SPORTID}}">\n                    <p>{{key.SPORTNAME}}</p>\n                </div>\n                <div class="itemListInfo clearfix subFilter has-child" *ngFor="let division of key.DIVISIONLIST">\n                    <div class="font_light" class="division"\n                        [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)"\n                        id="{{division.DIVISIONID}}">\n                        <p>{{division.DIVISIONNAME}}</p>\n                    </div>\n                    <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                        <div class="font_light" class="team"\n                            [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID?.toString()) > -1)"\n                            id="{{team.CLUBDIVISIONID}}">\n                            <p>{{team.TEAMNAME}}</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- filter for  parent and player ends -->\n\n\n        <div class="options_wrap" *ngIf="FunctionAccess && FunctionAccess.user_adminLevel == 1">\n            <!-- <div class="options">\n              <p class="sub-title">Filter</p>\n              <img src="assets/images/e-remove.png" class="pull_right_arrow close-icon">\n            </div> -->\n            <!-- edited on 1/6/2020 start            -->\n            <!-- <div class="options teamLink">\n                <p>My Teams</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div>                  \n            <div class="options sportLink">\n              <p>Sports and teams</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div>        -->\n            <!-- edited on 1/6/2020 start            -->\n\n\n            <!-- <div class="options divisionLink">\n              <p>Division</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->\n            <!-- <div class="options teamLink">\n              <p>Teams</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->\n\n            <!-- style="display: none;" -->\n            <div class="fliter_options sportFilter">\n                <p class="color">\n                    <span class="suggestion">Select activity to filter</span>\n                    <span class="selected">{{selectedFilter}} Selected</span>\n                </p>\n                <!-- <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my sports</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="sports" name="sports" value="0" [checked]="sportIds.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div> -->\n                <div class="itemList clearfix" *ngFor="let key of sportsList;let i = index">\n                    <div class="font_light" class="sports"\n                        [class.active]="sportIds.indexOf(key.SPORTID?.toString()) > -1" id="{{key.SPORTID}}"\n                        (click)="openSublist(i)">\n                        <p>{{key.SPORTNAME}}</p>\n                        <p id="{{key.SPORTID}}events2" style="width: 25%;color: gray;"></p>\n                    </div>\n                    <!-- <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="sports" name="sports" value="{{key.SPORTID}}" [checked]="sportIds.indexOf(key.SPORTID.toString()) > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div> -->\n                    <div id="sub{{i}}" style="display: none;">\n                        <div class="itemListInfo clearfix subFilter has-child"\n                            *ngFor="let division of key.DIVISIONLIST;let j = index">\n                            <div class="font_light" class="division"\n                                [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)"\n                                id="{{division.DIVISIONID}}"\n                                (click)="openSportsList(key.SPORTNAME[0],division.DIVISIONID,j)">\n                                <p class="divi">{{division.DIVISIONNAME}}</p>\n                                <p id="{{division.DIVISIONID}}events2" style="width: 5%;color: gray;"></p>\n                            </div>\n                            <div id="divi{{key.SPORTNAME[0]}}{{division.DIVISIONID}}{{j}}" class="font_light"\n                                class="division" style="display: none;">\n                                <div class="itemListInfo clearfix subChildFilter"\n                                    *ngFor="let team of division.TEAMLIST">\n                                    <div class="font_light" class="team"\n                                        [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID?.toString()) > -1)"\n                                        id="{{team.CLUBDIVISIONID}}"\n                                        (click)="marking2(key.SPORTID,team.CLUBDIVISIONID,division.DIVISIONID)">\n                                        <p class="divi">{{team.TEAMNAME}}</p>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- <div class="fliter_options divisionFilter" style="display: none;">\n                <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my division</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="division" name="division" value="0" [checked]="divisionIds.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class="itemList clearfix" *ngFor="let key of divisionList">\n                    <div class="pull-left font_light"><p>{{key.DIVISIONNAME}}</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="division" name="division" value="{{key.DIVISIONID}}" [checked]="(divisionIds.indexOf(key.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </div> -->\n\n            <div class="fliter_options teamFilter" style="display: none;">\n                <!-- <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my teams</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="team" name="team" value="0" [checked]="selectedTeams.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div> -->\n                <div class="itemList clearfix" *ngFor="let key of teamList">\n                    <div class="font_light" class="team"\n                        [class.active]="selectedTeams.indexOf(key.CLUBDIVISIONID?.toString()) > -1"\n                        id="{{key.CLUBDIVISIONID}}">\n                        <p style="float: left;width:100% ;">{{key.TEAMNAME}}</p>\n                        <p style="float: right;">{{key.DIVISIONNAME}}</p>\n                    </div>\n                    <!-- <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="team" name="team" value="{{key.CLUBDIVISIONID}}" [checked]="selectedTeams.indexOf(key.CLUBDIVISIONID.toString()) > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div> -->\n                </div>\n            </div>\n        </div>\n\n        <!-- filter for parent start -->\n        <div class="fliter_options" *ngIf="PersonData && PersonData.ISPARENT">\n            <div class="itemList clearfix">\n                <div class="pull-left">\n                    <p>View</p>\n                </div>\n                <!-- <div class="pull-right">\n                    <div class="toggle">\n                        <label class="switch">\n                        <input type="checkbox" class="childId" name="childId" value="0" [checked]="childIds.indexOf(\'0\') > -1">\n                        <span class="slider round"></span>\n                        </label>\n                    </div>\n                </div> -->\n            </div>\n            <div class="itemList clearfix" *ngFor="let key of PersonData.siblings">\n                <div class="font_light" class="childId" id="{{key.person_id}}"\n                    [class.active]="childIds.indexOf(key.person_id.toString()) > -1">\n                    <p>{{key.last_name}} {{key.first_name}} </p>\n                </div>\n                <!-- <div class="pull-right">\n                    <div class="toggle">\n                        <label class="switch">\n                        <input type="checkbox" class="childId" name="childId" value="{{key.person_id}}" [checked]="childIds.indexOf(key.person_id.toString()) > -1">\n                        <span class="slider round"></span>\n                        </label>\n                    </div>\n                </div> -->\n            </div>\n            <div class="itemList clearfix">\n                <div class="font_light" class="childId" style="margin-left: 20px;" id="{{PersonData.PERSON_ID}}"\n                    [class.active]="childIds.indexOf(PersonData.PERSON_ID.toString()) > -1">\n                    <p>Self</p>\n                </div>\n            </div>\n        </div>\n        <!-- filter for parent ends -->\n\n    </div>\n</div>\n<!-- <content-drawer [options]="drawerOptions">\n        <div class="content">\n          The world is your oyster.\n          <p>\n            If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.\n          </p>\n        </div>\n    </content-drawer> -->\n<!-- <ion-footer>\n    <nav class="navbar navbar-default navbar-fixed-bottom">\n        <div class="container-fluid">\n            <ul class="nav navbar-nav">\n                <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n                <li class="events active"><a href="javascript:void(0);">Events</a></li>\n                <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n                <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n                <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n            </ul>\n        </div>\n    </nav>\n</ion-footer> -->'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/display-events-new/display-events-new.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__["a" /* EventLoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_network_ngx__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], DisplayEventsNewPage);
    return DisplayEventsNewPage;
}());

//# sourceMappingURL=display-events-new.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageLogDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MessageLogDashboardPage = /** @class */ (function () {
    function MessageLogDashboardPage(navCtrl, navParams, app, http, storage, global, gFn, events, platform, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.gFn = gFn;
        this.events = events;
        this.platform = platform;
        this.global_api = global_api;
        this.messageDetails = [];
        this.success = '';
        this.platform.registerBackButtonAction(function () {
            _this.app.getRootNav().getActiveChildNav().select(0);
        });
        gFn.showMenuIcon();
        this.storage.get('setActivatedTeam').then(function (val) {
            _this.setActivatedTeam = JSON.parse(val);
            console.log(_this.setActivatedTeam);
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                _this.storage.get('FunctionAccess').then(function (val) {
                    _this.FunctionAccess = val;
                    _this.getMessages().then(function (val) {
                        if (val && _this.messageDetails.length > 0) {
                        }
                        else if (val && _this.messageDetails.length <= 0) {
                            /* this.navCtrl.pop();
                            this.gFn.presentToast("Data not Found"); */
                        }
                        else if (!val) {
                            _this.gFn.presentAlert('Error', "Error getting while connecting to internet");
                        }
                    });
                    // console.log(this.FunctionAccess)
                });
            });
        });
    }
    MessageLogDashboardPage.prototype.ionViewDidEnter = function () {
        this.gFn.showMenuIcon();
        // $('.tabs .tab-button[aria-selected=false]:nth-child(1)').attr('aria-selected', 'true')
        /* $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({
          'mask-image': 'url(../assets/images/menu/home-blue.svg)',
          'height': '32px',
          'color':'#43B7CC'
        }) */
    };
    MessageLogDashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessageLogDashboardPage');
    };
    MessageLogDashboardPage.prototype.ionViewDidLeave = function () {
        // $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({
        //   'mask-image': 'url(../assets/images/menu/home.svg)',
        //   'height': '22px',
        //   'color':'#dedede'
        // })
    };
    MessageLogDashboardPage.prototype.backArrow = function () {
        this.gFn.gotoHome();
        // this.app.getRootNav().getActiveChildNav().select(0);
    };
    MessageLogDashboardPage.prototype.getMessages = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                .set('reciever_id', (_this.FunctionAccess.user_adminLevel == 4) ? _this.PersonData.PERSON_ID : '')
                .set('sender_id', (_this.FunctionAccess.user_adminLevel != 4) ? _this.PersonData.PERSON_ID : ''); //this.PersonData.CLIENT_ID
            //.set('club_division_id', this.PersonData.SELECTEDTEAM)//this.PersonData.SELECTEDTEAM
            _this.http.post(_this.global.APIURL + "players/getGroupMessages", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.success = 1;
                    var GroupMessage = (_this.events.publish('json:query', data.GETGROUPMESSAGE))[0];
                    for (var key in GroupMessage) {
                        _this.messageDetails.push(GroupMessage[key]);
                    }
                    console.log(_this.messageDetails);
                    resolve(true);
                }
                else {
                    _this.success = 0;
                    resolve(true);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    MessageLogDashboardPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage');
    };
    MessageLogDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-message-log-dashboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/message-log-dashboard/message-log-dashboard.html"*/'<ion-header class="header-md">\n  <ion-navbar class="main">\n    \n    <div class="top-bar clearfix">\n      <div class="pull-left col-xs-6 pr-0" (click)="backArrow()">\n        <div class="backArrow"> MESSAGE LOG </div>\n    </div>\n      <!-- <div class="prev-next pull-right pr-10" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n      </div> -->\n    </div>\n  </ion-navbar>\n  \n</ion-header>\n\n\n<ion-content class="bg-gray event">\n    <section class="main">\n        \n            <section class=" heightAuto bg-gray show-card">\n                <div class="event-card welfare" *ngIf="success==1 && messageDetails.length<=0">\n                    <div class="well select-card " >\n                        <div class="row">\n                            <div class="col-xs-12 ">\n                                <h5 class="sub-title">No alerts found</h5>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="event-card welfare" *ngFor="let details of messageDetails.slice().reverse()">\n                    <div class="well select-card" style="margin-bottom: 0 !important">\n    \n                        <div class="row">\n                            <div class="card-img col-xs-2 p-0">\n                                <span class="" *ngIf="!details.SENDER_IMAGE">\n                                    <div class="img-circle"><span class="img-text">{{details.SENDERFIRSTNAME[0] | uppercase}} {{details.SENDERLASTNAME[0] | uppercase}} </span></div>\n                                    \n                                </span>\n                                <span class="" *ngIf="details.SENDER_IMAGE">\n                                            <img src="{{PhotoApiUrl}}{{details.SENDER_IMAGE}}" alt="" class="img-circle">\n                                </span>\n                            </div>\n    \n                            <div class="card-title col-xs-9 p-0">{{details.EVENTNAME}} \n                                <p class="MESSAGE_DATE-color">{{details.MESSAGEDATE}}</p>\n                                <div class="MessageCard">\n                                    <p>\n                                        {{details.MESSAGE}}\n                                    </p>\n                                    <span class="text-Color">{{details.SENDERFIRSTNAME | uppercase}} {{details.SENDERLASTNAME | uppercase}}</span>\n                                    <span class="text-Color" style="float: right">{{details.MESSAGETIME}}</span>\n                                </div>\n                                \n                            </div>\n                        \n                        </div>\n                    </div>\n    \n                  </div>\n            </section>\n          \n          </section>\n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/message-log-dashboard/message-log-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], MessageLogDashboardPage);
    return MessageLogDashboardPage;
}());

//# sourceMappingURL=message-log-dashboard.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AlertDashboardPage = /** @class */ (function () {
    function AlertDashboardPage(navCtrl, navParams, storage, toastCtrl, global, http, gFn, platform, app, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.global = global;
        this.http = http;
        this.gFn = gFn;
        this.platform = platform;
        this.app = app;
        this.global_api = global_api;
        this.EventsDetails = [];
        this.UpCommingEvents = [];
        this.monthArray = [];
        this.CardViewSeeMore = 0;
        this.platform.registerBackButtonAction(function () {
            _this.app.getRootNav().getActiveChildNav().select(0);
        });
    }
    AlertDashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            if (_this.PersonData.ISCHILD == 1) {
                _this.PersonData.ISPARENT = 0;
            }
            // console.log(this.PersonData)
            _this.storage.get('UpcomingSingleEvent').then(function (val) {
            });
            // this.UpcomingEvent().then((x) => {
            _this.UpcomingEventNew();
            // });
        });
        // console.log('ionViewDidLoad AlertDashboardPage');
    };
    AlertDashboardPage.prototype.gotoConfirmAttendance = function (val) {
        // if(val.AttendStatus==0 || val.AttendStatus==1){
        this.navCtrl.push('EventConfirmAbsencePage', { personDetails: JSON.stringify(val) });
        // }
        // else{
        //   this.presentToast('Cannot be refilled')
        // }
    };
    AlertDashboardPage.prototype.ionViewDidEnter = function () {
        // $('.tabs .tab-button[aria-selected=false]:nth-child(1)').attr('aria-selected', 'true')
        $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({
            'mask-image': 'url(../assets/images/menu/home-blue.svg)',
            'height': '32px',
            'color': '#43B7CC'
        });
    };
    AlertDashboardPage.prototype.backArrow = function () {
        this.gFn.gotoHome();
        // this.app.getRootNav().getActiveChildNav().select(0);
    };
    AlertDashboardPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    AlertDashboardPage.prototype.UpcomingEventNew = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                // .set('IsParent', this.PersonData.ISPARENT)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                //.set('person_id', this.PersonData.PERSON_ID)
                .set('person_id', _this.PersonData.LOGGEDIN_USER_PERSON_ID)
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('SEASON_ID', _this.PersonData.SEASON_ID);
            _this.http.post(_this.global.APIURL + "events/getAtendenceEventsList", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                //  console.log(data)
                if (data.SUCCESS == true) {
                    if (data.GETATENDENCEEVENTSLIST != '') {
                        _this.EventsDetails = data.GETATENDENCEEVENTSLIST[1];
                        // for(var val in this.EventsDetails){
                        for (var key in _this.EventsDetails) {
                            var tempArray = [];
                            for (var key1 in _this.EventsDetails[key]) {
                                tempArray.push(_this.EventsDetails[key][key1]);
                            }
                            _this.monthArray.push(tempArray);
                        }
                        // }
                        // console.log(this.monthArray)
                    }
                    if (_this.monthArray.length > 0) {
                        _this.monthArray[_this.monthArray.length - 1][(_this.monthArray[_this.monthArray.length - 1]).length - 1] = '';
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    AlertDashboardPage.prototype.CardSeeMore = function (event) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').hide();
        $(event.target).closest('.ExtraMonth').find('.mb-50').hide();
        $(event.target).closest('.ExtraMonth').find('.mt-20').show();
        this.CardViewSeeMore = this.CardViewSeeMore + 1;
    };
    AlertDashboardPage.prototype.CardSeeLess = function (val) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').show();
        $(event.target).closest('.ExtraMonth').find('.mb-50').show();
        $(event.target).closest('.ExtraMonth').find('.mt-20').hide();
        if (this.CardViewSeeMore > 0) {
            this.CardViewSeeMore = val;
        }
    };
    AlertDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-alert-dashboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/alert-dashboard/alert-dashboard.html"*/'<ion-header [scrollingHeader]=\'content\' class="top-bar header-md">\n        <ion-navbar class="main">\n    <div class="top-bar clearfix">\n        <div class="pull-left col-xs-6 pr-0" (click)="backArrow()">\n          <div class="backArrow"> ALERTS </div>\n      </div>\n      </div>\n      </ion-navbar>\n</ion-header>\n<ion-content class="bg-gray event cardBottom" > <!--(ionScrollEnd)="logScrollEnd()"-->\n  <section class="main">\n    <section class="profileFirst heightAuto xs-padding">\n      <div class="event-card select-events bg-gray cardBottom" *ngIf="monthArray.length<1 ">\n          <div class="well select-card " >\n              <div class="row">\n                  <div class="col-xs-12 ">\n                      <h5 class="sub-title">No Event Present</h5>\n                  </div>\n              </div>\n          </div>\n      </div>\n      <!-- <div *ngFor="let key2 of monthArray"> -->\n        <div class="ExtraMonth" *ngFor="let key of monthArray;let y=index">\n\n            <div class="event-card select-events bg-gray"  *ngIf="y <=CardViewSeeMore">\n                <div *ngIf="y <=CardViewSeeMore">\n                    <div class="event-black" >\n                        <h5 class="v-center">{{key[key.length-2]}}</h5>\n                    </div>\n    \n                    <div  *ngFor="let key1 of key; let i=index;" (click)="gotoConfirmAttendance(key1)">\n    \n                            <div class="well select-card "  [class.active]="i==0" *ngIf="i<key.length-2">\n                                <div class="row">\n                                    <div class="event-date col-xs-3 p-0">\n                                        <div class="badge badge-blue">{{key1.weekday}} {{key1.day}}</div>\n                                        <p>{{key1.time_started}}</p>\n                                    </div>\n                                    <div class="event-title col-xs-8 p-0">\n                                        <h5>{{key1.event_name}}</h5>\n                                        <p>{{key1.ground_name}}</p>\n                                        <p>{{key1.attendInfo.first_name}} - {{key1.attendInfo.reasondeclined}}</p>\n                                        <p class="status-info" [class.pending]="key1.attendInfo.status==\'Pending\' || !key1.attendInfo.status" [class.approved]="key1.attendInfo.status==\'Approved\'" [class.rejected]="key1.attendInfo.status==\'Rejected\'">\n                                            <span>{{key1.attendInfo.status?key1.attendInfo.status:\'Pending\'}}</span> \n                                        </p>\n                                    </div>\n                                    <div class="event-next col-xs-1 p-0">\n                                        <a href="javascript:void(0)" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                                    </div>\n                                </div>\n                            </div>\n                    </div>\n                </div>\n                \n            </div>\n            <div class="event-card select-events bg-gray multi-shadow" >\n                <div *ngIf="y <=CardViewSeeMore && key[key.length-1]!=\'\'">\n                    <div class="event-black" >\n                        <h5 class="v-center">{{key[key.length-1]}}</h5>\n                    </div>\n                </div>\n            </div>\n    \n            <div class="section-more mb-50 clearfix" *ngIf="y <=CardViewSeeMore && key[key.length-1]!=\'\'" (click)="CardSeeMore($event)">\n                <a href="javascript:void(0)" class="see-more pull-right">SEE MORE</a>\n            </div>\n            <div class="section-more clearfix mt-20" *ngIf="y <=CardViewSeeMore" (click)="CardSeeLess(y)" style="display:none">\n                <a href="javascript:void(0)"  class="see-more pull-right">SEE LESS</a>\n            </div>\n            \n        </div>\n      <!-- </div> -->\n      \n    </section>\n  </section>\n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/alert-dashboard/alert-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], AlertDashboardPage);
    return AlertDashboardPage;
}());

//# sourceMappingURL=alert-dashboard.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_speech_recognition_ngx__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_interval__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera_ngx__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_path_ngx__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_ngx__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_base64_ngx__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var ChatDashboardPage = /** @class */ (function () {
    function ChatDashboardPage(navCtrl, navParams, storage, global, http, loadingCtrl, speechRecognition, toastCtrl, gFn, keyboard, global_api, actionSheetCtrl, camera, platform, filePath, file, base64, alert) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.speechRecognition = speechRecognition;
        this.toastCtrl = toastCtrl;
        this.gFn = gFn;
        this.keyboard = keyboard;
        this.global_api = global_api;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.platform = platform;
        this.filePath = filePath;
        this.file = file;
        this.base64 = base64;
        this.alert = alert;
        this.chats = [];
        this.chatGroups = [];
        this.searchData = [];
        this.searchShow = 'none';
        this.showHideOverview = '';
        this.chatIcon = 'assets/images/chat.png';
        this.discussions = [];
        this.groupPhoto = "";
        this.afterSearch = false;
        this.loadedFunctionCount = 0; // all the functions have loaded or not?
        this.searching = false;
        this.slidingEvent = false;
        this.filtering = false;
        this.divisionIds = [];
        this.sportIds = [];
        this.selectedTeams = [];
        this.client_ids = [];
        this.childIds = [];
        this.roles = [];
        this.isFirstFilter = true;
        this.isLoaded = false;
        this.isOffline = false;
        this.isFirst = true;
        this.hideTeamChats = false;
        this.selectedFilter = 0;
        this.buckets = new Map();
        this.divisionBuckets = new Map();
        this.randomNumber = '';
        this.image = '';
        this.mBottom = "";
        storage.get('loggedInUserData').then(function (val) {
            // console.log(val);
            _this.firstName = val.FIRST_NAME.toString().toLocaleUpperCase();
            _this.personID = val.PERSON_ID.toString();
            _this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
            _this.groupImage = val.PHOTOPATH.toString();
            _this.image = "http://api-dev.gojaro.com/profileimage/this.profileImage?r=this.randomNumber";
            _this.loggedInUserData = val;
            /* set default to hide image selection */
            _this.loggedInUserData.HOMESCREEN_BG = 'img-1.jpg';
            _this.storage.set('loggedInUserData', _this.loggedInUserData);
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
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.themeColor = _this.loggedInUserData.THEME_BG;
            console.log("loginuser-data=-->91", _this.loggedInUserData);
            //this.selectedTeams.push(val.SELECTEDTEAM);
            _this.getDefaultData(_this.afterSearch);
            _this.getFilterDetails().then(function (x) {
                _this.checkFilterIsActive();
            });
            global_api.getUnreadMessageCount(val);
        });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
            console.log("Function Access Level =-=-> 101", _this.FunctionAccess);
        });
        this.storage.get('filterSport').then(function (val) {
            if (val != null) {
                _this.sportIds = val;
            }
        });
        this.storage.get('filterDivision').then(function (val) {
            if (val != null) {
                _this.divisionIds = val;
            }
        });
        this.storage.get('filterTeam').then(function (val) {
            if (val != null) {
                _this.selectedTeams = val;
                _this.selectedFilter = _this.selectedTeams.length;
            }
        });
        this.storage.get('filterRole').then(function (val) {
            if (val != null) {
                _this.roles = val;
            }
        });
    }
    ChatDashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.isFirst) {
            this.isFirst = false;
        }
        else {
            this.getDefaultData(true);
        }
        if (typeof this.loadListAsync != 'undefined') {
            this.loadListAsync.unsubscribe();
        }
        this.loadListAsync = __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__["Observable"].interval(3000).subscribe(function (val) {
            if (_this.slidingEvent == false) {
                _this.getDefaultData(true);
            }
        });
        setTimeout(function () {
            _this.gFn.statusbarWhite();
        }, 500);
        __WEBPACK_IMPORTED_MODULE_5_jquery__(document).off('click');
        __WEBPACK_IMPORTED_MODULE_5_jquery__(document).click(function (e) {
            if (!__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.filter_overlay').length && (!__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).hasClass('filtter_button') && !__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).find('.filtter_button').length)) {
                _this.closeFilter();
            }
        });
    };
    ChatDashboardPage.prototype.ionViewDidLeave = function () {
        if (typeof this.loadListAsync != 'undefined') {
            this.loadListAsync.unsubscribe();
        }
        this.gFn.statusbarBlack();
    };
    ChatDashboardPage.prototype.onSwipe = function (event) {
        if (event.offsetDirection == 4) {
            this.closeFilter();
        }
    };
    ChatDashboardPage.prototype.checkFilterIsActive = function () {
        setTimeout(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__('page-chat-dashboard .filter_overlay .active').length) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.doubleArrow').addClass('active');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.doubleArrow').removeClass('active');
            }
        }, 100);
    };
    ChatDashboardPage.prototype.getDefaultData = function (afterSearch) {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            _this.firstName = val.FIRST_NAME;
            _this.lastName = val.LAST_NAME;
            _this.personId = val.PERSON_ID;
            console.log('this.personId', _this.personId);
            _this.selectedTeam = val.SELECTEDTEAM;
            _this.team_id = val.TEAM_ID;
            _this.clientId = val.CLIENT_ID;
            var searchVal = __WEBPACK_IMPORTED_MODULE_5_jquery__("page-chat-dashboard #search").val();
            if (typeof searchVal == 'undefined') {
                searchVal = '';
            }
            var chatData = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.personId)
                .set('searchVal', searchVal)
                .set('teamIds', JSON.stringify(_this.selectedTeams))
                .set('roles', JSON.stringify([]));
            _this.http.post(_this.global.APIURL + 'messages/getSingleAndDiscussionChatList', chatData, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                _this.loadedFunctionCount += 1;
                _this.isOffline = false;
                if (afterSearch == false && _this.loadedFunctionCount >= 2) {
                    _this.isLoaded = true;
                }
                if (response.SUCCESS) {
                    var chats = response.GETCHATLIST;
                    _this.chats = [];
                    for (var key in chats) {
                        _this.chats.push(chats[key]);
                    }
                    /* let discussions = response.GETDISCUSSIONLIST;
                     this.discussions = [];
                     for(var key in discussions){
                       this.discussions.push(discussions[key]);
                     }*/
                }
                _this.filtering = false;
            }, function (error) {
                _this.loadedFunctionCount += 1;
                if (afterSearch == false && _this.loadedFunctionCount >= 2) {
                    _this.isLoaded = true;
                }
                _this.filtering = false;
                _this.isOffline = true;
            });
            var chatGroupData = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.personId)
                .set('searchVal', searchVal)
                .set('hideTeamChats', _this.hideTeamChats ? '1' : '0')
                .set('selectedTeams', JSON.stringify(_this.selectedTeams));
            _this.http.post(_this.global.APIURL + 'messages/getChatGroupsName', chatGroupData, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                _this.isOffline = false;
                _this.loadedFunctionCount += 1;
                if (afterSearch == false && _this.loadedFunctionCount >= 2) {
                    _this.isLoaded = true;
                }
                if (response.SUCCESS) {
                    var chatGroups = response.GETCHATGROUPS;
                    _this.chatGroups = [];
                    for (var key in chatGroups) {
                        _this.chatGroups.push(chatGroups[key]);
                    }
                }
                _this.filtering = false;
                console.log("Chat group data from 268", _this.chatGroups);
            }, function (error) {
                _this.loadedFunctionCount += 1;
                if (afterSearch == false && _this.loadedFunctionCount >= 2) {
                    _this.isLoaded = true;
                }
                _this.filtering = false;
                _this.isOffline = true;
            });
        });
    };
    ChatDashboardPage.prototype.filterData = function () {
        this.filtering = true;
        this.sportIds = [];
        var sportIds = [];
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-chat-dashboard .sports.active').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                sportIds.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
            }
        });
        this.sportIds = sportIds;
        this.divisionIds = [];
        var divisionIds = [];
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-chat-dashboard .division.active').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                divisionIds.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
            }
        });
        this.divisionIds = divisionIds;
        this.selectedTeams = [];
        var selectedTeams = [];
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-chat-dashboard .team.active').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                selectedTeams.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
            }
        });
        this.selectedTeams = selectedTeams;
        this.selectedFilter = this.selectedTeams.length;
        if (!this.client_ids.length) {
            this.client_ids.push(this.loggedInUserData.CLIENT_ID);
        }
        if (this.divisionIds.length == 1 && this.divisionIds[0] == '0') {
            this.divisionIds = [];
        }
        this.roles = [];
        var roles = [];
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-chat-dashboard .role.active').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                roles.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
            }
        });
        this.roles = roles;
        this.storage.set('filterSport', this.sportIds);
        this.storage.set('filterDivision', this.divisionIds);
        this.storage.set('filterTeam', this.selectedTeams);
        this.storage.set('filterRole', this.roles);
        this.checkFilterIsActive();
        this.getDefaultData(true);
    };
    ChatDashboardPage.prototype.getFilterDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('personId', _this.loggedInUserData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "teams/getFilterDetails", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    _this.sportsList = data.SPORTLIST;
                    _this.divisionList = data.DIVISIONLIST;
                    _this.leagueList = data.LEAGUELIST;
                    _this.teamList = data.TEAMLIST;
                    _this.markSports();
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    ChatDashboardPage.prototype.showFilter = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('ion-content').addClass('overlay');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-tabs').addClass('send-back');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.filter_overlay').show();
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.sportFilter').show();
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
    };
    ChatDashboardPage.prototype.closeFilter = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('ion-content').removeClass('overlay');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-tabs').removeClass('send-back');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.filter_overlay, .sportFilter, .divisionFilter, .teamFilter, .roleFilter, .filterBack').hide();
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.fliter .sub-title').html('Filter');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.options').show();
    };
    ChatDashboardPage.prototype.filterBack = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.filterBack, .sportFilter, .divisionFilter, .teamFilter, .roleFilter').hide();
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.fliter .sub-title').html('Filter');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.options').show();
    };
    ChatDashboardPage.prototype.filterHandler = function () {
        var _this = this;
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
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.team').click(function (e) {
                if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.teamFilter').length) {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__('.sportFilter .team').removeClass('active');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__('.teamFilter .team').removeClass('active');
                }
                if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).hasClass('team')) {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).toggleClass('active');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parent('.team').toggleClass('active');
                }
                /* this.selectedTeams = [];
                let selectedTeams = [];
                $('.team.active').each(function() {
                  if($(this).prop('id') != 0){
                    selectedTeams.push($(this).prop('id'));
                  }
                });
                this.selectedTeams = selectedTeams; */
                _this.filterData();
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
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.role').click(function (e) {
                if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).hasClass('role')) {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).toggleClass('active');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parent('.role').toggleClass('active');
                }
                _this.roles = [];
                var roles = [];
                __WEBPACK_IMPORTED_MODULE_5_jquery__('page-chat-dashboard .role.active').each(function () {
                    if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                        roles.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
                    }
                });
                _this.roles = roles;
                _this.filterData();
            });
        }
    };
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
    ChatDashboardPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage').then(function () {
            /* $('.tabs .tab-button[aria-selected=true]:nth-child(4)').attr('aria-selected','false'); */
        });
    };
    ChatDashboardPage.prototype.viewChat = function (group_id, chat_person_name, photoPath, char_Person_id, lastName, isBlocked, ev) {
        if (__WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).hasClass('select-card') == false) {
            __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).parents(".select-card").addClass("active");
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).parents(".select-card").removeClass("active");
            }, 500);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).addClass("active");
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).removeClass("active");
            }, 500);
        }
        var chatInfo = {
            from: 1,
            to: 10,
            person_id: this.personId,
            group_id: "0",
            receiver_name: chat_person_name,
            receiver_last_name: lastName,
            receiver_id: char_Person_id,
            selectedTeam: this.selectedTeam,
            teamid: this.team_id,
            flag: 1,
            userPhoto: photoPath,
            accFirstName: this.firstName,
            accLastName: this.lastName,
            isBlocked: isBlocked,
            clientId: this.clientId
        };
        this.navCtrl.push('ChatViewPage', { data: chatInfo });
    };
    ChatDashboardPage.prototype.viewGroupChat = function (group_id, team_id, group_type, photo, name, groupContactId, gourpIcon, ev) {
        if (groupContactId == '') {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).hasClass('select-card') == false) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).parents(".select-card").addClass("active");
                setTimeout(function () {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).parents(".select-card").removeClass("active");
                }, 500);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).addClass("active");
                setTimeout(function () {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).removeClass("active");
                }, 500);
            }
        }
        else {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).hasClass('select-card') == false) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).parents(".select-card").addClass("active");
                setTimeout(function () {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).parents(".select-card").removeClass("active");
                }, 500);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).addClass("active");
                setTimeout(function () {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(ev.target).removeClass("active");
                }, 500);
            }
        }
        var chatInfo = {
            from: 1,
            to: 10,
            person_id: this.personId,
            selectedTeam: this.selectedTeam,
            groupid: group_id,
            teamid: this.selectedTeam,
            grouptype: group_type,
            flag: 1,
            userPhoto: photo,
            groupName: name,
            accFirstName: this.firstName,
            accLastName: this.lastName,
            clientId: this.clientId,
            groupContactId: groupContactId,
            gourpIcon: gourpIcon
        };
        this.navCtrl.push('GroupChatViewPage', { data: chatInfo });
    };
    ChatDashboardPage.prototype.search = function (event) {
        var _this = this;
        if (event.key === "Enter") {
            return false;
        }
        this.searching = true;
        this.searchData.length = 0;
        var searchVal = __WEBPACK_IMPORTED_MODULE_5_jquery__("page-chat-dashboard #search").val();
        if (searchVal.length > 0 && event.key != "Enter") {
            var searchData = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', this.personId)
                .set('searchVal', searchVal)
                .set('hideTeamChats', this.hideTeamChats ? '1' : '0')
                .set('selectedTeams', JSON.stringify(this.selectedTeams));
            /* let loading = this.loadingCtrl.create();
            loading.present(); */
            this.http.post(this.global.APIURL + 'messages/getChatGroupsName', searchData, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                //loading.dismiss();
                if (response.SUCCESS) {
                    /* let searchData = response.GETCHATGROUPSSEARCH.GROUPNAME;
                    this.searchData = [];
                    for(var key in searchData){
                      this.searchData.push(searchData[key]);
                    }
                    this.searchHide = 'none';
                    this.searchShow = ''; */
                    var chatGroups = response.GETCHATGROUPS;
                    _this.chatGroups = [];
                    for (var key in chatGroups) {
                        _this.chatGroups.push(chatGroups[key]);
                    }
                }
            }, function (error) {
                //loading.dismiss();
            });
            var chatData = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', this.personId)
                .set('searchVal', searchVal)
                .set('teamIds', JSON.stringify(this.selectedTeams))
                .set('roles', JSON.stringify([]));
            /* let loading2 = this.loadingCtrl.create();
            loading2.present(); */
            this.http.post(this.global.APIURL + 'messages/getSingleAndDiscussionChatList', chatData, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                //loading2.dismiss();
                if (response.SUCCESS) {
                    var chats = response.GETCHATLIST;
                    _this.chats = [];
                    for (var key in chats) {
                        _this.chats.push(chats[key]);
                    }
                    /* let discussions = response.GETDISCUSSIONLIST;
                     this.discussions = [];
                     for(var key in discussions){
                       this.discussions.push(discussions[key]);
                     }*/
                }
            }, function (error) {
                //loading2.dismiss();
            });
        }
        else if (event.key === "Enter") {
            return false;
        }
        else if (searchVal.length == 0 && event.key != "Enter") {
            this.searchHide = '';
            this.searchShow = 'none';
            this.afterSearch = true;
            this.searching = false;
            this.getDefaultData(this.afterSearch);
        }
    };
    ChatDashboardPage.prototype.clearsearch = function () {
        if (__WEBPACK_IMPORTED_MODULE_5_jquery__("page-chat-dashboard #search").val() == "Search") {
            __WEBPACK_IMPORTED_MODULE_5_jquery__("page-chat-dashboard #search").val('');
        }
    };
    ChatDashboardPage.prototype.toggleOverview = function () {
        if (this.showHideOverview == '') {
            this.showHideOverview = 'none';
            this.chatIcon = 'assets/images/chat-black.png';
        }
        else if (this.showHideOverview != '') {
            this.showHideOverview = '';
            this.chatIcon = 'assets/images/chat.png';
        }
    };
    ChatDashboardPage.prototype.listen = function () {
        var _this = this;
        // Check feature available
        this.speechRecognition.isRecognitionAvailable()
            .then(function (available) {
            if (available) {
                // Check permission
                _this.speechRecognition.hasPermission()
                    .then(function (hasPermission) {
                    if (hasPermission) {
                        _this.speechRecognition.startListening()
                            .subscribe(function (matches) {
                            __WEBPACK_IMPORTED_MODULE_5_jquery__("page-chat-dashboard #search").blur();
                            __WEBPACK_IMPORTED_MODULE_5_jquery__("page-chat-dashboard #search").val(matches[0]).focus();
                        }, function (onerror) { return console.log('error:', onerror); });
                    }
                    else {
                        // Request permissions
                        _this.speechRecognition.requestPermission()
                            .then(function () {
                            _this.gFn.presentToast('Request Granted');
                            _this.speechRecognition.startListening()
                                .subscribe(function (matches) {
                                __WEBPACK_IMPORTED_MODULE_5_jquery__("page-chat-dashboard #search").blur();
                                __WEBPACK_IMPORTED_MODULE_5_jquery__("page-chat-dashboard #search").val(matches[0]).focus();
                            }, function (onerror) { return console.log('error:', onerror); });
                        }, function () { return _this.gFn.presentToast('Request Denied'); });
                    }
                });
            }
            else {
                _this.gFn.presentToast('Speech recognition not available');
            }
        });
    };
    ChatDashboardPage.prototype.goToNewDiscussionCreatePage = function () {
        this.navCtrl.push('NewDiscussionListPage');
    };
    ChatDashboardPage.prototype.deletedDiscussionGroup = function (GROUPID) {
        var _this = this;
        var deletedDiscussion = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
            .set('group_id', GROUPID);
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + 'messages/deleteChatGroup', deletedDiscussion, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
            }
            else {
                _this.gFn.presentToast('Problem in group delete');
            }
        });
    };
    ChatDashboardPage.prototype.leaveDiscussion = function (dis_group_Id, groupContactId) {
        var _this = this;
        var leaveDiscussion = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
            .set('groupContactId', groupContactId)
            .set('client_id', this.clientId)
            .set('selectedTeam', this.selectedTeam)
            .set('group_id', dis_group_Id)
            .set('team_id', this.selectedTeam)
            .set('player_ids', JSON.stringify([]));
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + 'messages/removePlayerFromGroup', leaveDiscussion, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.slidingEvent = false;
                _this.gFn.presentToast('Group leave successful.');
            }
            else {
                _this.gFn.presentToast('Problem in group Leave.');
            }
        });
    };
    ChatDashboardPage.prototype.slidingOnOff = function (ev) {
        var percent = ev.getSlidingPercent();
        if (percent >= 1 || percent <= -1) {
            this.slidingEvent = true;
        }
        else {
            this.slidingEvent = false;
        }
    };
    ChatDashboardPage.prototype.keyboardCheck = function () {
        if (this.mBottom == "") {
            this.mBottom = __WEBPACK_IMPORTED_MODULE_5_jquery__(".scroll-content").css("margin-bottom");
        }
        if (this.keyboard.isOpen()) {
            __WEBPACK_IMPORTED_MODULE_5_jquery__(".scroll-content").css("margin-bottom", "0");
            this.gFn.hideMenuIcon();
        }
        else {
            __WEBPACK_IMPORTED_MODULE_5_jquery__(".scroll-content").css("margin-bottom", '56px');
            this.gFn.showMenuIcon();
        }
    };
    ChatDashboardPage.prototype.inputFocus = function () {
        this.keyboardCheck();
    };
    ChatDashboardPage.prototype.inputBlur = function () {
        this.keyboardCheck();
    };
    ChatDashboardPage.prototype.settingGroupIcon = function (group_id) {
        var _this = this;
        console.log("Setting group icon", group_id);
        this.groupId = group_id;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'From Gallery',
                    icon: 'cloud-upload',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'From Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
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
    };
    ChatDashboardPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 30,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast(err);
        });
    };
    //Showing Toaster
    ChatDashboardPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    //Creating file name 
    ChatDashboardPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    //Copying file to local dribe 
    ChatDashboardPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.groupImage = newFileName;
            _this.uploadImage();
        }, function (error) {
            _this.presentToast(error);
        });
    };
    //uploading image 
    ChatDashboardPage.prototype.uploadImage = function () {
        var _this = this;
        var targetPath = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* normalizeURL */])(this.pathForImage(this.groupImage));
        this.base64.encodeFile(targetPath).then(function (base64File) {
            _this.uploadPhoto(encodeURIComponent(base64File));
        }, function (err) {
            _this.presentAlert('Error', 'Sorry, image upload error.');
        });
    };
    // Always get the accurate path to your apps folder
    ChatDashboardPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    //uploading piture
    ChatDashboardPage.prototype.uploadPhoto = function (groupImage) {
        var _this = this;
        this.groupImage = '';
        this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
            .set('group_id', this.groupId)
            .set('image', groupImage);
        this.http.post(this.global.APIURL + 'messages/groupChatImageUpload', data)
            .subscribe(function (response) {
            loading.dismiss();
            // this.groupImage = this.personID + '.jpg';
            // if (response.SUCCESS) {
            //   this.loggedInUserData['PHOTOPATH'] = this.groupImage;
            //   this.storage.set('loggedInUserData', this.loggedInUserData);
            // } else {
            //   this.presentAlert('Error','Sorry, image upload error.');
            // }
        }, function (error) {
            loading.dismiss();
            // this.groupImage = this.personID + '.jpg';
            _this.presentAlert('Error', 'Sorry, image upload error.');
        });
    };
    ChatDashboardPage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    //open sublist starts
    ChatDashboardPage.prototype.openSublist = function (i) {
        console.log("Getting Id ", '#fun' + i);
        var id = ("#fun").concat(i);
        __WEBPACK_IMPORTED_MODULE_5_jquery__(id).toggle();
    };
    ChatDashboardPage.prototype.openSportsList = function (sportName, divisionName, j) {
        // var id = ("#fun4").concat(j);
        var id = ("#funy4".concat(sportName).concat(divisionName).concat(j));
        __WEBPACK_IMPORTED_MODULE_5_jquery__(id).toggle();
    };
    //open sublist ends
    //marking
    ChatDashboardPage.prototype.marking = function (sportsId, teamId, divisionId) {
        var _this = this;
        //Marking for division starts
        if (this.divisionBuckets.has(divisionId)) {
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        else {
            this.divisionBuckets.set(divisionId, []);
            if (this.divisionBuckets.get(divisionId).indexOf(teamId) === -1) {
                this.divisionBuckets.get(divisionId).push(teamId);
            }
            else {
                this.divisionBuckets.get(divisionId).splice(this.divisionBuckets.get(divisionId).indexOf(teamId), 1);
            }
        }
        this.divisionBuckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'chat').innerHTML = map.get(key).length;
            }
            else {
                document.getElementById(key + 'chat').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText2 = JSON.stringify(Array.from(this.divisionBuckets.entries()));
        this.storage.set('divisionBuckets', jsonText2);
        //Marking for division starts
        //Marking for sports starts
        if (this.buckets.has(sportsId)) {
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        else {
            this.buckets.set(sportsId, []);
            if (this.buckets.get(sportsId).indexOf(teamId) === -1) {
                this.buckets.get(sportsId).push(teamId);
            }
            else {
                this.buckets.get(sportsId).splice(this.buckets.get(sportsId).indexOf(teamId), 1);
            }
        }
        this.buckets.forEach(function (value, key, map) {
            if (map.get(key).length) {
                document.getElementById(key + 'chat').innerHTML = map.get(key).length + ' selected';
            }
            else {
                document.getElementById(key + 'chat').innerHTML = '';
            }
            _this.filterHandler();
        });
        var jsonText = JSON.stringify(Array.from(this.buckets.entries()));
        this.storage.set('bucket', jsonText);
        //Marking for sports starts
    };
    //initial marking
    ChatDashboardPage.prototype.markSports = function () {
        var _this = this;
        //initial Marking for division starts
        this.storage.get("divisionBuckets").then(function (val) {
            _this.divisionBuckets = new Map(JSON.parse(val));
            _this.divisionBuckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'chat').innerHTML = map.get(key).length;
                }
                else {
                    document.getElementById(key + 'chat').innerHTML = '';
                }
                _this.filterHandler();
            });
            // console.log("gettinh new data",this.buckets);
        });
        //initial Marking for division ends
        //initial Marking for sports starts
        this.storage.get("bucket").then(function (val) {
            _this.buckets = new Map(JSON.parse(val));
            _this.buckets.forEach(function (value, key, map) {
                if (map.get(key).length) {
                    document.getElementById(key + 'chat').innerHTML = map.get(key).length + ' selected';
                }
                else {
                    document.getElementById(key + 'chat').innerHTML = '';
                }
                _this.filterHandler();
            });
            // console.log("gettinh new data",this.buckets);
        });
        //initial Marking for sports ends
    };
    ChatDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat-dashboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/chat-dashboard/chat-dashboard.html"*/'<!--\n  Generated template for the ChatDashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <nav class="navbar navbar-fixed-top player-home-nav">\n        <div class="top-bar clearfix">\n            <!-- <div class="prev-next pull-right chat-search-prev-next" (click)="goToChooseTeamsPage()">\n                <a href="javascript:void(0);" class="next"></a>\n            </div> -->\n            <div class="prev-next pull-right doubleArrow" *ngIf="FunctionAccess && FunctionAccess.user_adminLevel != 4  && isLoaded" (click)="showFilter()">\n                <a href="javascript:void(0);"><img src="assets/images/event-filter-icon.svg" class="filtter_button"></a>\n                <a href="javascript:void(0);"><img src="assets/images/event-filter-icon-active.svg" class="filtter_button active"></a>\n            </div>\n            <div class="bg-header">\n                <div class="title fontBold chat-text">CHAT</div>\n                <div class="title chat-img" (click)="toggleOverview()"><img src="{{chatIcon}}" class="microphone"/></div>\n            </div>\n        </div>\n    </nav>\n</ion-header>\n\n\n<ion-content class="bg-gray">\n  <div class="bg-gray event">\n      <section class="main">\n        <!-- no internet message start -->\n        <div class="background_grey" *ngIf="isOffline">\n            <div class="off-wrap">\n                <p><img src="assets/images/events-new-icon/offline-logo-alt.svg" class=""></p>\n                <h3>OFFLINE</h3>\n                <p>Your network is unavalaible, please check your data or connection</p>\n                <button type="button" class="btn btn-sm-black try-again">TRY AGAIN</button>\n            </div>\n        </div>\n        <!-- no internet message end -->\n        <!-- loading skeleton -->\n        <div class="skeleton" *ngIf="!isLoaded && !isOffline">\n            \n            <div class="event-card bg-gray">\n                <div class="search-bar fadeShine"></div>\n              <!-- Regular player combined Start -->\n                <div class="title fadeShine"></div>\n                <div class=" select-card well mt-10 fadeShine">\n                  <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                      <span>\n                        <div class="img-circle">\n                            <span class="img-text"></span>\n                        </div>\n                      </span>\n                    </div>\n                    <div class="card-title col-xs-8 p-0"></div>\n                    <div class="col-xs-2 checkArrow-group"></div>\n                  </div>\n              </div>\n              <div class=" select-card well fadeShine">\n                  <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                      <span>\n                        <div class="img-circle">\n                            <span class="img-text"></span>\n                        </div>\n                      </span>\n                    </div>\n                    <div class="card-title col-xs-8 p-0"></div>\n                    <div class="col-xs-2 checkArrow-group"></div>\n                  </div>\n              </div>\n              <div class=" select-card well fadeShine">\n                  <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                      <span>\n                        <div class="img-circle">\n                            <span class="img-text"></span>\n                        </div>\n                      </span>\n                    </div>\n                    <div class="card-title col-xs-8 p-0"></div>\n                    <div class="col-xs-2 checkArrow-group"></div>\n                  </div>\n              </div>\n              <div class=" select-card well fadeShine">\n                  <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                      <span>\n                        <div class="img-circle">\n                            <span class="img-text"></span>\n                        </div>\n                      </span>\n                    </div>\n                    <div class="card-title col-xs-8 p-0"></div>\n                    <div class="col-xs-2 checkArrow-group"></div>\n                  </div>\n              </div>\n              <div class="title fadeShine"></div>\n              <div class=" select-card well fadeShine">\n                  <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                      <span>\n                        <div class="img-circle">\n                            <span class="img-text"></span>\n                        </div>\n                      </span>\n                    </div>\n                    <div class="card-title col-xs-8 p-0"></div>\n                    <div class="col-xs-2 checkArrow-group"></div>\n                  </div>\n              </div>\n              <div class=" select-card well fadeShine">\n                  <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                      <span>\n                        <div class="img-circle">\n                            <span class="img-text"></span>\n                        </div>\n                      </span>\n                    </div>\n                    <div class="card-title col-xs-8 p-0"></div>\n                    <div class="col-xs-2 checkArrow-group"></div>\n                  </div>\n              </div>\n              <div class=" select-card well fadeShine">\n                  <div class="row">\n                    <div class="card-img col-xs-2 p-0">\n                      <span>\n                        <div class="img-circle">\n                            <span class="img-text"></span>\n                        </div>\n                      </span>\n                    </div>\n                    <div class="card-title col-xs-8 p-0"></div>\n                    <div class="col-xs-2 checkArrow-group"></div>\n                  </div>\n              </div>\n              <div class=" select-card well fadeShine">\n                    <div class="row">\n                      <div class="card-img col-xs-2 p-0">\n                        <span>\n                          <div class="img-circle">\n                              <span class="img-text"></span>\n                          </div>\n                        </span>\n                      </div>\n                      <div class="card-title col-xs-8 p-0"></div>\n                      <div class="col-xs-2 checkArrow-group"></div>\n                    </div>\n                </div>\n                <div class=" select-card well fadeShine">\n                    <div class="row">\n                      <div class="card-img col-xs-2 p-0">\n                        <span>\n                          <div class="img-circle">\n                              <span class="img-text"></span>\n                          </div>\n                        </span>\n                      </div>\n                      <div class="card-title col-xs-8 p-0"></div>\n                      <div class="col-xs-2 checkArrow-group"></div>\n                    </div>\n                </div>\n                <div class=" select-card well fadeShine">\n                    <div class="row">\n                      <div class="card-img col-xs-2 p-0">\n                        <span>\n                          <div class="img-circle">\n                              <span class="img-text"></span>\n                          </div>\n                        </span>\n                      </div>\n                      <div class="card-title col-xs-8 p-0"></div>\n                      <div class="col-xs-2 checkArrow-group"></div>\n                    </div>\n                </div>\n              <!-- Regular player combined End -->\n      \n            </div>\n        </div>\n        <!-- loading skeleton end -->\n          <form action="" class="user-form profile setting-first" *ngIf="isLoaded && !isOffline">\n              <section class="profileFirst heightAuto player-search-swipe-down">\n                  <div class="event-card welfare bg-gray">\n                      <div class="row player-search-image">\n                          <div class="col-xs-12 search-player search-inner">\n                              <div class="search-icon"><i class="seh material-icons">search</i></div>\n                              <input type="text" name="search" id="search" class="form-control text-input" placeholder="Search" (keyup)="search($event)" (click)="clearsearch()" (focus)="inputFocus()" (blur)="inputBlur()">\n                              <!--<div class="microph-image" (click)="listen()"><img src="assets/images/microphone-voice.png" class="microphone"/></div>-->\n                          </div>\n                      </div>\n                      <!--Search start-->\n                      <div class="row" [ngStyle]="{\'display\': searchShow}" *ngIf="searchData.length">\n                            <div class=" col-xs-5 p-0 chat-new-message">\n                                <h5>GROUP</h5>\n                            </div>\n                        </div>\n                        <div class="well select-card" *ngFor="let search of searchData" [ngStyle]="{\'display\': searchShow}">\n                            <div class="row" (click)="viewGroupChat(search.GROUP_ID, search.CLUB_DIVISION_ID_FK, search.GROUP_TYPE, groupPhoto, search.GROUP_NAME,groupPhoto,$event)">\n                                <div class="card-img col-xs-2 p-0">\n                                    <span class="">\n                                        <img src="assets/images/group-blue-icon.svg" alt="" class="img-circle">\n                                  </span>\n                                </div>\n                                <div class="card-title col-xs-10 p-0 chat-home">\n                                    <div class="row">\n                                        <div class="col-xs-7 p-0">\n                                               <span>{{search.GROUP_NAME}}</span>\n                                        </div>\n                                        <div class="col-xs-5 p-10">\n                                                <p class="ch-time">{{search.CHATDATE}}</p>\n                                        </div>\n                                    </div>\n                                    <div class="row">\n                                        <h5 class="ch-text">{{search.MESSAGE}}</h5>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <!-- <div class="well select-card" *ngIf="searchData.length == 0" [ngStyle]="{\'display\': searchShow}">\n                            <div class="row">\n                                <div class="card-title col-xs-12 p-0 chat-home">\n                                    <div class="row">\n                                        <div class="col-xs-12 p-0 text-center noList">\n                                            <span>No Group List Found</span>\n                                        </div>\n                                        \n                                    </div>\n                                </div>\n                            </div>\n                        </div> -->\n                        \n                      <!--search end-->\n                      <div class="row" [ngStyle]="{\'display\': searchHide}" *ngIf="chatGroups.length">\n                          <div class=" col-xs-5 p-0 chat-new-message">\n                              <h5>GROUP</h5>\n                          </div>\n                      </div>\n                      <div class="well select-card" *ngFor="let chatGroup of chatGroups;" [ngStyle]="{\'display\': searchHide}">\n                          <div class="row" >\n                              <div class="card-img col-xs-2 p-0">\n                                  <span class="" (click)="settingGroupIcon(chatGroup.group_id)">\n                                      <!-- <img [src]="chatGroup.groupImage ?global.GroupImageURL+chatGroup.groupImage:\'assets/images/group-name.svg\' " alt="" class="img-circle"> -->\n                                      <img [src]="chatGroup.groupImage ? global.MESSAGEIMAGE+chatGroup.groupImage:\'assets/images/group-name.svg\' " alt="" class="img-circle">\n\n                                </span>\n                              </div>\n                              <div class="card-title chat-list col-xs-10 p-0" (click)="viewGroupChat(chatGroup.group_id, chatGroup.team_id, chatGroup.group_type, groupPhoto, chatGroup.group_name,groupPhoto,chatGroup.groupImage,$event)">\n                                  <div class="row">\n                                      <div class="col-xs-7 p-0">\n                                            <span>{{chatGroup.group_name}}</span>\n                                      </div>\n                                      <div class="col-xs-5 p-0 text-right">\n                                        <p class="ch-time">{{chatGroup.chatDateTime}}</p>\n                                      </div>\n                                  </div>\n                                  <div class="row">\n                                        <div class="col-xs-10 p-0">\n                                            <h5 class="ch-text" [ngStyle]="{\'display\': showHideOverview}">{{chatGroup.message}}</h5>\n                                        </div>\n                                        <!-- <div *ngIf="chatGroup.unReadChat != \'\' && chatGroup.unReadChat != \'0\'" class="col-xs-2 p-0">\n                                            <img src="assets/images/chat-counter/{{chatGroup.unReadChat}}.svg">\n                                        </div> -->\n                                        <div class="col-xs-10 p-0"> \n                                            <h5 class="ch-text blocked"  [ngStyle]="{\'display\': showHideOverview}">NEW</h5>\n                                        </div>\n                                        \n                                  </div>\n                              </div>\n                          </div>\n                      </div>\n                      <!-- <div class="well select-card" *ngIf="chatGroups.length == 0" [ngStyle]="{\'display\': searchHide}">\n                            <div class="row">\n                                <div class="card-title col-xs-12 p-0 chat-home">\n                                    <div class="row">\n                                        <div class="col-xs-12 p-0 text-center noList">\n                                            <span>No Group List Found</span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div> -->\n                      <div class="row">\n                          <div class=" col-xs-5 p-0 chat-new-message">\n                              <h5>CHAT</h5>\n                          </div>\n                      </div>\n\n                        <ion-list class="list list-md" *ngFor="let discussion of chats;">\n                            \n                            <ion-item-sliding class="well select-card" (ionDrag)="slidingOnOff($event)">\n                                <ion-item>\n                                    <div class="row" (click)="discussion.groupType == 3 ? viewGroupChat(discussion.group_id,team_id ,discussion.groupType, discussion.photoPath, discussion.chat_name,discussion.groupContactId,$event) : viewChat(discussion.group_id, discussion.chat_name, discussion.photoPath, discussion.personId, discussion.lastName, discussion.isBlocked, $event)">\n                                        <div class="card-img col-xs-2 p-0">\n                                            <span class="">\n                                                \n                                                <div *ngIf="discussion.groupType == 3" class="{{discussion.photoPath}} background_color_hover"></div>\n                                                <img *ngIf="discussion.photoPath != \'\' && discussion.groupType != 3; else noImage" src="{{global.PROFILEIMAGEURL + discussion.photoPath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                                <ng-template #noImage>\n                                                    <div class="img-circle" *ngIf="discussion.chat_name != \'\' && discussion.groupType != 3"><span class="img-text">{{discussion.chat_name[0] | uppercase}} {{discussion.lastName[0] | uppercase}} </span></div>\n                                                    <div class="img-circle" *ngIf="discussion.chat_name == \'\' && discussion.groupType != 3"><span class="img-text"> N N </span></div>\n                                                </ng-template>\n                                            </span>\n                                        </div>\n                                        <div class="card-title chat-list col-xs-10 p-0">\n                                            <div class="row">\n                                                <div class="col-xs-7 p-0">\n                                                    <span>{{discussion.chat_name}} <span *ngIf="discussion.groupType != 3 && discussion.role">{{discussion.role}}</span></span>\n                                                </div>\n                                                <div class="col-xs-5 p-0 text-right">\n                                                <p class="ch-time">{{discussion.chatDateTime}}</p>\n                                                </div>\n                                            </div>\n                                            <div class="row">\n                                                <div class="col-xs-10 p-0">\n                                                    <h5 class="ch-text" *ngIf="discussion.isBlocked==0" [ngStyle]="{\'display\': showHideOverview}">{{discussion.message}}</h5>\n                                                    <h5 class="ch-text blocked" *ngIf="discussion.isBlocked==1" [ngStyle]="{\'display\': showHideOverview}">Sender blocked</h5>\n                                                </div>\n                                                <!-- <div *ngIf="discussion.unReadChat != \'\' && discussion.unReadChat != \'0\'" class="col-xs-2 p-0">\n                                                    <img src="assets/images/chat-counter/{{discussion.unReadChat}}.svg">\n                                                </div> -->\n                                                <!-- new messages -->\n                                                <div  *ngIf="discussion.isBlocked==0 && discussion.unReadChat > 0">\n                                                    <span class="ch-text blocked new-msg"  [ngStyle]="{\'display\': showHideOverview}"><p>NEW</p></span>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </ion-item>\n                                <ion-item-options side="left" *ngIf="discussion.groupType == 3">\n                                    <button ion-button danger (click)="leaveDiscussion(discussion.group_id,discussion.groupContactId)">LEAVE</button>\n                                </ion-item-options>\n                                <ion-item-options side="right" *ngIf="discussion.groupType == 3">\n                                    <button ion-button danger (click)="deletedDiscussionGroup(discussion.group_id,discussion.groupContactId)">DELETE</button>\n                                </ion-item-options>\n                            </ion-item-sliding>\n                        </ion-list>\n\n                      <!--<ion-list no-lines class="well select-card" *ngFor="let chat of chats">\n                          <ion-item-sliding>\n                                <ion-item>\n                                <div class="row" ion-item-sliding (click)="viewChat(chat.group_id, chat.chat_person_name, chat.photoPath, chat.char_Person_id,chat.lastName,$event)">\n                                    <div class="card-img col-xs-2 p-0">\n                                        <span class="">\n                                            \n                                            <img *ngIf="chat.photoPath != \'\'; else noImage" src="{{global.PROFILEIMAGEDEVURL + chat.photoPath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                            <ng-template #noImage>\n                                                <div class="img-circle" *ngIf="chat.chat_person_name != \'\'"><span class="img-text">{{chat.chat_person_name[0] | uppercase}} {{chat.lastName[0] | uppercase}} </span></div>\n                                                <div class="img-circle" *ngIf="chat.chat_person_name == \'\'"><span class="img-text"> N N </span></div>\n                                            </ng-template>\n                                        </span>\n                                    </div>\n                                    <div class="card-title col-xs-10 p-0 chat-home">\n                                        <div class="row">\n                                            <div class="col-xs-7 p-0">\n                                                   <span *ngIf="chat.chat_person_name != \'\'">{{chat.chat_person_name}}</span>\n                                                   <span *ngIf="chat.chat_person_name == \'\'">No Name</span>\n                                            </div>\n                                            <div class="col-xs-5 p-10">\n                                              <p class="ch-time">{{chat.chatDateTime}}</p>\n                                            </div>\n                                        </div>\n                                        <div class="row">\n                                            <div class="col-xs-10 p-0">\n                                                <h5 [ngStyle]="{\'display\': showHideOverview}" class="ch-text">{{chat.message}}</h5>\n                                            </div>\n                                            <div class="col-xs-2 p-0">\n                                                <p *ngIf="chat.unReadChat != \'\' && chat.unReadChat != \'0\'" class="unreadMSG">{{chat.unReadChat}}</p>\n                                            </div>\n                                        </div>\n                                    </div>\n\n                                </div>\n                                </ion-item>-->\n                                <!--<ion-item-options side="right" >\n                                    <button ion-button danger>DELETE</button>\n                                </ion-item-options>-->\n                          <!--</ion-item-sliding >\n                      </ion-list>-->\n                      <div class="well select-card" *ngIf="chats.length == 0">\n                            <div class="row">\n                                <div class="card-title col-xs-12 p-0 chat-home">\n                                    <div class="row">\n                                        <div class="col-xs-12 p-0 text-center noList">\n                                            <span>No Discussion List Found</span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                  </div>\n              </section>\n          </form>\n      </section>\n  </div>\n  <ion-fab bottom right class="fab-mb-20" (click)="goToNewDiscussionCreatePage()" *ngIf="isLoaded && !isOffline">\n        <button ion-fab fab-fixed class="chat-svg">\n          <ion-icon name="chatboxes" is-active="false"></ion-icon>\n        </button>\n   </ion-fab>\n</ion-content>\n\n<div class="filter_overlay" style="display: none;" (swipe)="onSwipe($event)">\n    <div class="fliter">\n        <div class="itemList clearfix">\n            <div class="pull-left">\n                <img class="filterBack" src="assets/images/arrow-white.svg" (click)="filterBack()" />\n                <p class="sub-title">ACTIVITY</p>\n            </div>\n            <div class="pull-right close-icon" (click)="closeFilter()">\n                <img src="assets/images/close-icon.svg" alt="">\n            </div>\n        </div>\n        <!-- <div class="fliter_options" *ngIf="(FunctionAccess && FunctionAccess.user_adminLevel != 1) || (PersonData && PersonData.ISPARENT)">\n            <div class="itemList clearfix" *ngFor="let key of sportsList">\n                <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID.toString()) > -1" id="{{key.SPORTID}}"><p>{{key.SPORTNAME}}</p></div>\n                <div class="itemListInfo clearfix subFilter has-child" *ngFor="let division of key.DIVISIONLIST">\n                    <div class="font_light" class="division" [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)" id="{{division.DIVISIONID}}"><p>{{division.DIVISIONNAME}}</p></div>\n                    <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                        <div class="font_light" class="team" [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID.toString()) > -1)" id="{{team.CLUBDIVISIONID}}"><p>{{team.TEAMNAME}}</p></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="fliter_options" *ngIf="PersonData && PersonData.ISPARENT">\n            <div class="itemList clearfix" *ngFor="let key of PersonData.siblings">\n                <div class="font_light" class="childId" id="{{key.person_id}}" [class.active]="childIds.indexOf(key.person_id.toString()) > -1"><p>{{key.first_name}} {{key.last_name}}</p></div>\n            </div>\n        </div> -->\n\n        <div class="options_wrap">          \n            <!-- <div class="options teamLink">\n                <p>My Teams</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->\n            <div class="options hideTeamChatsLink" *ngIf="FunctionAccess && FunctionAccess.user_adminLevel != 4">                \n                <div class="itemList clearfix">\n                    <div class="pull-left"><p>Hide team chats</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="hideTeamChats" name="hideTeamChats" [(ngModel)]="hideTeamChats" value="1" [checked]="hideTeamChats">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </div>               \n            <!-- <div class="options sportLink">\n                <p>My teams</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div>   -->\n            <!-- <div class="options roleLink" *ngIf="FunctionAccess && FunctionAccess.user_adminLevel != 4">\n                <p>Roles</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->                  \n            <!-- <div class="options divisionLink">\n              <p>Division</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->                 \n            <!-- <div class="options teamLink">\n              <p>Teams</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->\n\n            <div class="fliter_options sportFilter" style="display: none;">\n                <p class="color">\n                    <span class="suggestion">Select activity to filter</span>\n                    <span class="selected">{{selectedFilter}} Selected</span>\n                </p>\n                <!-- <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my sports</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="sports" name="sports" value="0" [checked]="sportIds.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div> -->\n                <div class="itemList clearfix" *ngFor="let key of sportsList;let i = index"  >\n                    <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID?.toString()) > -1" id="{{key.SPORTID}}" (click)="openSublist(i)"><p>{{key.SPORTNAME}}</p><p id="{{key.SPORTID}}chat" style="width: 25%;color: gray;"></p></div>\n                    <!-- <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="sports" name="sports" value="{{key.SPORTID}}" [checked]="sportIds.indexOf(key.SPORTID.toString()) > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div> -->\n                    <div id="fun{{i}}" style="display:none;">\n                    <div class="itemListInfo clearfix subFilter has-child" *ngFor="let division of key.DIVISIONLIST;let j = index">\n                        <div class="font_light" class="division" [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)" id="{{division.DIVISIONID}}" (click)="openSportsList(key.SPORTNAME[0],division.DIVISIONID,j)"><p class="divi">{{division.DIVISIONNAME}}</p><p id="{{division.DIVISIONID}}chat" style="width: 5%;color: gray;"></p></div>\n                        <div id="funy4{{key.SPORTNAME[0]}}{{division.DIVISIONID}}{{j}}" class="font_light" class="division" style="display: none;">\n                            <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                                <div class="font_light" class="team" [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID?.toString()) > -1)" id="{{team.CLUBDIVISIONID}}" (click)="marking(key.SPORTID,team.CLUBDIVISIONID,division.DIVISIONID)"><p class="divi">{{team.TEAMNAME}}</p></div>\n                            </div>\n                        </div>\n                    </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- <div class="fliter_options divisionFilter" style="display: none;">\n                <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my division</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="division" name="division" value="0" [checked]="divisionIds.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class="itemList clearfix" *ngFor="let key of divisionList">\n                    <div class="pull-left font_light"><p>{{key.DIVISIONNAME}}</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="division" name="division" value="{{key.DIVISIONID}}" [checked]="(divisionIds.indexOf(key.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </div> -->\n\n            <div class="fliter_options teamFilter" style="display: none;">\n                <!-- <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my teams</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="team" name="team" value="0" [checked]="selectedTeams.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div> -->\n                <div class="itemList clearfix" *ngFor="let key of teamList">\n                    <div class="font_light" class="team" [class.active]="selectedTeams.indexOf(key.CLUBDIVISIONID?.toString()) > -1" id="{{key.CLUBDIVISIONID}}"><p>{{key.TEAMNAME}}</p></div>\n                    <!-- <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="team" name="team" value="{{key.CLUBDIVISIONID}}" [checked]="selectedTeams.indexOf(key.CLUBDIVISIONID.toString()) > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div> -->\n                </div>\n            </div>\n\n            <div class="fliter_options roleFilter" style="display: none;">\n                <div class="itemList clearfix">\n                    <div class="font_light" class="role" [class.active]="roles.indexOf(\'1\') > -1" id="1"><p>Admins</p></div>\n                </div>\n                <div class="itemList clearfix" *ngIf="loggedInUserData && !loggedInUserData.ISPARENT">\n                    <div class="font_light" class="role" [class.active]="roles.indexOf(\'2\') > -1" id="2"><p>Players</p></div>\n                </div>\n                <div class="itemList clearfix">\n                    <div class="font_light" class="role" [class.active]="roles.indexOf(\'3\') > -1" id="3"><p>Parents</p></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/chat-dashboard/chat-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_speech_recognition_ngx__["a" /* SpeechRecognition */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera_ngx__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_path_ngx__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_ngx__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_base64_ngx__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ChatDashboardPage);
    return ChatDashboardPage;
}());

//# sourceMappingURL=chat-dashboard.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventHomeMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network_ngx__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









/**
 * Generated class for the EventHomeMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventHomeMenuPage = /** @class */ (function () {
    function EventHomeMenuPage(navCtrl, navParams, http, ngZone, toastCtrl, loadingCtrl, storage, events, keyboard, global, modalCtrl, alert, app, plt, gFn, network, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.ngZone = ngZone;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.events = events;
        this.keyboard = keyboard;
        this.global = global;
        this.modalCtrl = modalCtrl;
        this.alert = alert;
        this.app = app;
        this.plt = plt;
        this.gFn = gFn;
        this.network = network;
        this.global_api = global_api;
        this.bgThemeColor = '';
        this.eventstorage = '';
        this.isoffline = true;
        this.plt.ready().then(function () {
            // this.setupNetworkCheck();
        });
        this.checkNetwork();
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
            console.log("Function access : ", _this.FunctionAccess);
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.backgroundThemeColor();
            console.log("loggedInUserData", _this.loggedInUserData);
            global_api.getUnreadMessageCount(val);
            global_api.getAlrtMessageCount();
            if (_this.loggedInUserData['ALERTCOUNTER'] != undefined && _this.loggedInUserData.ALERTCOUNTER > 0) {
                _this.global_api.showAlertCounter(_this.loggedInUserData.ALERTCOUNTER);
            }
        });
        gFn.hideMenuIcon();
        this.global_api.getMedicineName().subscribe(function (data) {
            var medicineInfo = _this.events.publish('json:query', data.QMEDICINE)[0][0];
            _this.storage.set('medicineInfo', JSON.stringify(medicineInfo));
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
    EventHomeMenuPage.prototype.checkNetwork = function () {
        var _this = this;
        // Check if the application is running in a web browser
        if (this.network.type === "none" || navigator.onLine === false) {
        }
        else {
            this.storage.get('offline').then(function (val) {
                console.log("offlinestatuss", val);
                if (val === 1) {
                    _this.datasynching();
                }
            });
            this.network.onConnect().subscribe(function () {
                console.log("Network connected!");
                setTimeout(function () {
                    if (_this.network.type === "wifi") {
                    }
                }, 3000);
            });
        }
    };
    EventHomeMenuPage.prototype.ngOnInit = function () {
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
        var _this = this;
        this.storage.get("mobileAssets").then(function (res) {
            console.log("Result : ", res);
            if (res && res.Theme && res.Theme.Home_screen_Img) {
                // this.backgroundURL = res.Theme.Home_screen_Img.replace(/ /g,"%20").toString();
                _this.backgroundURL = res.Theme.Home_screen_Img.replace(/ /g, "%20").toString();
                console.log("Back : ", _this.backgroundURL);
                // this.backgroundURL = "https://wallpaperaccess.com/full/3875473.jpg";
            }
            else {
                _this.backgroundURL = "assets/images/jtcbgscreen.png";
            }
        });
        console.log('initiated...');
        this.storage.get('loggedInUserData').then(function (val) {
            if (val && val['ALERTCOUNTER'] != undefined && val.ALERTCOUNTER > 0) {
                _this.global_api.showAlertCounter(val.ALERTCOUNTER);
            }
        });
    };
    EventHomeMenuPage.prototype.datasynching = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, alert_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        _a.eventstorage = (_b.sent()) || [];
                        if (this.eventstorage && this.eventstorage.length > 0) {
                            alert_1 = this.alert.create({
                                title: "<p>CLOSE ROLL</p>",
                                message: "<div><p>Attendance data is available in local storage. Would you like to synchronize it?.</p></div>",
                                cssClass: "close-roll-modal",
                                enableBackdropDismiss: false,
                                buttons: [
                                    {
                                        text: "CANCEL",
                                        role: "cancel",
                                        cssClass: "modal-cancel",
                                        handler: function () {
                                            console.log("Cancel clicked");
                                        },
                                    },
                                    {
                                        text: "Sync",
                                        cssClass: "modal-submit",
                                        handler: function () {
                                            _this.presentToast("Your data is Syncing please wait");
                                            for (var i = 0; i < _this.eventstorage.length; i++) {
                                                if (_this.eventstorage[i].bulkattendpayload && _this.eventstorage[i].singlepayload && _this.eventstorage[i].singlepayload.length > 0) {
                                                    console.log("bulk and single");
                                                    _this.BulkPayload(_this.eventstorage[i].bulkattendpayload, _this.eventstorage[i].singlepayload);
                                                }
                                                if (!_this.eventstorage[i].bulkattendpayload && _this.eventstorage[i].singlepayload && _this.eventstorage[i].singlepayload.length > 0) {
                                                    console.log("single");
                                                    _this.SinglePayload(_this.eventstorage[i].singlepayload);
                                                }
                                                if (_this.eventstorage[i].bulkattendpayload && _this.eventstorage[i].singlepayload.length == 0) {
                                                    _this.BulkPayload(_this.eventstorage[i].bulkattendpayload, []);
                                                }
                                                if (_this.eventstorage[i].rollstatuspayload) {
                                                    console.log("rollstatuspayload");
                                                    _this.Rollstuatus(_this.eventstorage[i].rollstatuspayload);
                                                }
                                            }
                                        },
                                    },
                                ],
                            });
                            alert_1.present(alert_1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EventHomeMenuPage.prototype.Rollstuatus = function (rollstatuspayload) {
        var _this = this;
        console.log("payloadddde", rollstatuspayload);
        if (!rollstatuspayload.updates) {
            return new Promise(function (resolve) {
                var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                    .set("eventId", rollstatuspayload.eventId)
                    .set("teamId", rollstatuspayload.teamId)
                    .set("clubId", rollstatuspayload.clubId)
                    .set("adminId", rollstatuspayload.adminId)
                    .set("rollStatus", rollstatuspayload.rollStatus);
                _this.http
                    .post(_this.global.APIURL_CORE + "attendance/updateroll", Data, {
                    headers: _this.global_api.getHeader(),
                })
                    .subscribe(function (data) {
                    // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                    _this.storage.set("offline", 0);
                    console.log("result for change", data);
                    _this.presentToast("Roll status updated");
                    _this.clearStorage("", "rollstatus");
                    resolve(true);
                }, function (error) { });
            });
        }
        else {
            console.log("updates array exist");
        }
    };
    EventHomeMenuPage.prototype.SinglePayload = function (singlepayload) {
        var _this = this;
        console.log("fulldata", singlepayload);
        for (var i = 0; i < singlepayload.length; i++) {
            console.log("newdartaaa", singlepayload[i]);
            var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("event_id", singlepayload[i].event_id)
                .set("personId", singlepayload[i].personId)
                .set("attended", singlepayload[i].attended)
                .set("confirmed", singlepayload[i].confirmed)
                .set("reasondeclined", singlepayload[i].reasondeclined)
                .set("reasondeclined_by_coach", singlepayload[i].reasondeclined_by_coach)
                .set("state_time", singlepayload[i].state_time)
                .set("selectedTeam", singlepayload[i].selectedTeam);
            this.http
                .post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.storage.set("offline", 0);
                    _this.presentToast("Single player attendance updated");
                    _this.clearStorage("single", "");
                }
            }, function (error) { });
        }
    };
    EventHomeMenuPage.prototype.clearStorage = function (payload, rollstatus) {
        return __awaiter(this, void 0, void 0, function () {
            var offlinedata, i, event_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get("attendanceevents")];
                    case 1:
                        offlinedata = (_a.sent()) || [];
                        if (offlinedata && offlinedata.length > 0) {
                            for (i = 0; i < offlinedata.length; i++) {
                                event_1 = offlinedata[i];
                                // Find the matching eventid
                                if (payload) {
                                    event_1.bulkattendpayload = "";
                                    event_1.singlepayload = [];
                                }
                                if (rollstatus) {
                                    event_1.rollstatuspayload = "";
                                }
                            }
                            this.storage.set("attendanceevents", offlinedata);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EventHomeMenuPage.prototype.BulkPayload = function (bulkattendpayload, singlepayload) {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("eventid", bulkattendpayload.eventid)
                .set("teamid", bulkattendpayload.teamid)
                .set("attended", bulkattendpayload.attended);
            _this.http
                .post(_this.global.APIURL_CORE + "attendance/attendancebulk", Data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (data) {
                // this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                if (data.SUCCESS) {
                    _this.presentToast("Bulk attendance updated successfully");
                    _this.storage.set("offline", 0);
                    if (singlepayload && singlepayload.length > 0) {
                        _this.SinglePayload(singlepayload);
                    }
                }
                resolve(true);
            }, function (error) { });
        });
    };
    EventHomeMenuPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: "top",
        });
        toast.present();
    };
    // styleObject() {
    //   // return {background: 'url(' + this.backgroundURL + ') center no-repeat', 'background-size' : 'cover !important'}
    //   return {
    //     'background': `url(${this.backgroundURL}) no-repeat fixed center`,
    //     'background-position': 'inherit !important',
    //     'background-size': 'cover !important'
    //   }
    // }
    EventHomeMenuPage.prototype.logOut = function () {
        console.log("in logout from 87");
        $('.tabs').find('.tab-button').attr('aria-selected', 'false');
        // this.setDeviceData(this.loggedInUserData.PERSON_ID, deviceToke)
        this.storage.clear();
        this.navCtrl.setRoot('HomePage');
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    EventHomeMenuPage.prototype.setDeviceData = function (person_id, deviceToke) {
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', person_id)
            .set('deviceType', this.DeviceType)
            .set('token', deviceToke)
            .set('logged', '0')
            .set('appVer_major', '1')
            .set('appVer_minor', '0')
            .set('appVer_maintenance', '0')
            .set('app_name', this.AppName);
        this.http.post(this.global.APIURL + "push/registerDeviceWithPersonId", Data)
            .subscribe(function (data) {
        }, function (error) {
        });
    };
    EventHomeMenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var _a;
        setTimeout(function () {
            _this.gFn.hideMenuIcon();
        }, 500);
        console.log("Function Access Lavel From event-home-menu.ts 48", (_a = this.FunctionAccess) === null || _a === void 0 ? void 0 : _a.user_adminLevel);
    };
    EventHomeMenuPage.prototype.ionViewWillLeave = function () {
        //this.gFn.showMenuIcon();
    };
    EventHomeMenuPage.prototype.backgroundThemeColor = function () {
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
        console.log("themecolor", this.bgThemeColor);
    };
    EventHomeMenuPage.prototype.gotoEvents = function () {
        this.app.getRootNav().getActiveChildNav().select(1);
        //this.navCtrl.parent.select(1);
    };
    EventHomeMenuPage.prototype.gotoPlayers = function () {
        this.app.getRootNav().getActiveChildNav().select(2);
    };
    // gotoTeammates(){
    //   this.app.getRootNav().getActiveChildNav().select(3);
    // }
    EventHomeMenuPage.prototype.gotoChats = function () {
        this.app.getRootNav().getActiveChildNav().select(3);
    };
    EventHomeMenuPage.prototype.gotoSettings = function () {
        this.app.getRootNav().getActiveChildNav().select(4);
    };
    EventHomeMenuPage.prototype.gotoMessageLogs = function () {
        this.app.getRootNav().getActiveChildNav().select(5);
    };
    EventHomeMenuPage.prototype.gotoTimesheets = function () {
        var _this = this;
        this.app.getRootNav().getActiveChildNav().select(1).then(function (data) {
            _this.app.getActiveNav().setRoot('TimesheetDashboardPage');
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Tab */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Tabs */])
    ], EventHomeMenuPage.prototype, "tabs", void 0);
    EventHomeMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-home-menu',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-home-menu/event-home-menu.html"*/'\n<!-- <ion-header mode="" *ngIf="bgThemeColor==\'red\' || bgThemeColor==\'yellow\'">\n  <ion-toolbar class="top-logo" mode="md">\n    <img class="logo-top" [src]="backgroundURL" alt="">\n  </ion-toolbar>\n</ion-header> -->\n<!-- [ngStyle]="{\'background\': \'url(\' + backgroundURL + \') no-repeat\',\'background-position\' : \'center !important\'}" -->\n\n<!-- [ngStyle]="{\'background\': \'url(\' + backgroundURL + \') no-repeat fixed center\'}" -->\n<ion-content class="bg-homeScreen {{bgThemeColor}}"\n[ngStyle]="{\'background\': \'url(\' + backgroundURL + \') no-repeat\',\'background-position\' : \'center !important\'}">\n  <div>\n    <section class="main">\n      <section class="menu-card">\n        <!-- <div class="option-item"\n        *ngIf="loggedInUserData && loggedInUserData.SHOWTIMESHEETMENU  && (loggedInUserData.ISCONTRACTOR || loggedInUserData.TIMESHEETREVIEWER)"> -->\n\n        <div class="option-item"  *ngIf="loggedInUserData && loggedInUserData.SHOWTIMESHEETMENU">\n          <div class="row">\n            <div class="well col-xs-4">\n              <div class="icon-wrap" (click)="gotoEvents()">\n                <img src="assets/images/home-menu/events.svg" alt="">\n                <label>ACTIVITIES</label>\n                \n              </div>\n            </div>\n            <div class="well col-xs-4">\n              <div class="icon-wrap" (click)="gotoPlayers()">\n                <img src="assets/images/home-menu/players.svg" alt="">\n                <label>GROUPS</label>\n              </div>\n            </div>\n            <div class="well col-xs-4">\n              <div class="icon-wrap chats" (click)="gotoChats()">\n                <div class="badge hide"><span class="counter">0</span></div>\n                <img src="assets/images/home-menu/msg.svg" alt="">\n                <label>CHAT</label>\n              </div>\n            </div>\n          </div>\n\n          <div class="row" *ngIf="loggedInUserData.SHOWTIMESHEETMENU && (loggedInUserData.ADMINLEVEL==1 || loggedInUserData.ADMINLEVEL==2 ||loggedInUserData.ADMINLEVEL==3)&&(loggedInUserData.ISCONTRACTOR)">\n            <div class="well col-xs-4">\n              <div class="icon-wrap" (click)="gotoTimesheets()" *ngIf="loggedInUserData.ISCONTRACTOR">\n                <img src="assets/images/home-menu/timesheet.svg" alt="">\n                <label>TIMESHEETS</label>\n              </div>\n            </div>\n            <div class="well col-xs-4">\n              <div class="icon-wrap alerts" (click)="gotoMessageLogs()">\n                <div class="badge hide"><span class="counter">0</span></div>\n                <img src="assets/images/home-menu/alerts.svg" alt="">\n                <label>ALERTS</label>\n              </div>\n            </div>\n            <div class="well col-xs-4">\n              <div class="icon-wrap" (click)="gotoSettings()">\n                <img src="assets/images/home-menu/more.svg" alt="">\n                <label>MORE</label>\n              </div>\n            </div>\n          </div>\n\n\n     <!---new oneeeeeee-->\n\n          <div class="row" *ngIf="!(loggedInUserData.SHOWTIMESHEETMENU && (loggedInUserData.ADMINLEVEL === 1 || loggedInUserData.ADMINLEVEL === 2 || loggedInUserData.ADMINLEVEL === 3)&&(loggedInUserData.ISCONTRACTOR))">\n            <div class="well col-xs-6">\n              <div class="icon-wrap alerts" (click)="gotoMessageLogs()">\n                <div class="badge hide"><span class="counter">0</span></div>\n                <img src="assets/images/home-menu/alerts.svg" alt="">\n                <label>ALERTS</label>\n              </div>\n            </div>\n            <div class="well col-xs-6">\n              <div class="icon-wrap" (click)="gotoSettings()">\n                <img src="assets/images/home-menu/more.svg" alt="">\n                <label>MORE</label>\n              </div>\n            </div>\n          </div>\n          \n        </div>\n        <!-- *ngIf="loggedInUserData && (!loggedInUserData.ISCONTRACTOR && !loggedInUserData.TIMESHEETREVIEWER) "> -->\n        <div class="option-item"\n          *ngIf="loggedInUserData && !loggedInUserData.SHOWTIMESHEETMENU ">\n          <div class="row">\n            <div class="well col-xs-6">\n              <div class="icon-wrap alerts" (click)="gotoMessageLogs()">\n                <div class="badge hide"><span class="counter">0</span></div>\n                <img src="assets/images/home-menu/alerts.svg" alt="">\n                <label>ALERTS</label>\n              </div>\n            </div>\n            <div class="well col-xs-6">\n              <div class="icon-wrap" (click)="gotoPlayers()">\n                <img src="assets/images/home-menu/players.svg" alt="">\n                <label>GROUPS</label>\n              </div>\n            </div>\n          </div>\n\n          <div class="row">\n            <div class="well col-xs-4">\n              <div class="icon-wrap chats" (click)="gotoChats()">\n                <div class="badge hide"><span class="counter">0</span></div>\n                <img src="assets/images/home-menu/msg.svg" alt="">\n                <label>CHAT</label>\n              </div>\n            </div>\n            <div class="well col-xs-4">\n              <div class="icon-wrap" (click)="gotoEvents()">\n                <img src="assets/images/home-menu/events.svg" alt="">\n                <label>ACTIVITIES</label>\n              </div>\n            </div>\n            <div class="well col-xs-4">\n              <div class="icon-wrap" (click)="gotoSettings()">\n                <img src="assets/images/home-menu/more.svg" alt="">\n                <label>MORE</label>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n    </section>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-home-menu/event-home-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_network_ngx__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventHomeMenuPage);
    return EventHomeMenuPage;
}());

//# sourceMappingURL=event-home-menu.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer_ngx__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar_ngx__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { Firebase } from '@ionic-native/firebase/ngx';



var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, storage, global, http, loadingCtrl, events, emailComposer, appVersion, plt, alert, statusBar, gFn, app, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.emailComposer = emailComposer;
        this.appVersion = appVersion;
        this.plt = plt;
        this.alert = alert;
        this.statusBar = statusBar;
        this.gFn = gFn;
        this.app = app;
        this.global_api = global_api;
        this.themeColor = '';
        this.bgThemeColor = '';
        this.DeviceType = '';
        this.DeviceToken = '';
        this.AppName = '';
        this.LogoutClicked = false;
        this.ShowAlert = false;
        this.load = false;
        global_api.removeUnreadCounter();
        /* $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected','false')
        $('.tabbar').css('z-index','0') */
        //   let elements = document.querySelectorAll(".tabbar");
        // if (elements != null) {
        // 	Object.keys(elements).map((key) => {
        // 		elements[key].style.display = 'none';
        // 	});
        // }
        plt.ready().then(function () {
            //statusBar.hide();
            plt.registerBackButtonAction(function () {
                _this.goBack();
            });
        });
        this.storage.get("mobileAssets").then(function (res) {
            if (res && res.Theme && res.Theme) {
                _this.appTheme = res.Theme;
            }
        });
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            //this.themeColor = this.loggedInUserData.THEME_BG;
            console.log("Login user Data : ", _this.loggedInUserData);
            // this.backgroundThemeColor();
            // this.bgThemeColor = this.loggedInUserData.THEME_BG;
            if (typeof (_this.loggedInUserData.THEME_BG) != "undefined" && _this.loggedInUserData.THEME_BG != null && _this.loggedInUserData.THEME_BG != "") {
                if (_this.loggedInUserData.THEME_BG == _this.appTheme.theme_1 || _this.loggedInUserData.THEME_BG == _this.appTheme.theme_2)
                    _this.bgThemeColor = _this.loggedInUserData.THEME_BG;
                else
                    _this.bgThemeColor = _this.appTheme.theme_1;
            }
            else {
                _this.bgThemeColor = _this.appTheme.theme_1;
            }
            _this.storage.get('FunctionAccess').then(function (val1) {
                _this.FunctionAccess = val1;
                if (_this.loggedInUserData.ISPARENT && parseInt(_this.loggedInUserData.PERSON_ID) != parseInt(_this.loggedInUserData.PARENT_ID)) {
                    if (_this.FunctionAccess.sec_absences_menu == 'yes') {
                        _this.ShowAlert = true;
                    }
                }
            });
        });
        this.appVersion.getAppName().then(function (Appname) {
            _this.AppName = Appname;
            console.log('b', _this.AppName);
        });
        this.appVersion.getVersionNumber().then(function (Appversion) {
            _this.AppVersion = Appversion;
            console.log(Appversion);
        });
        // this.firebase.getToken().then(token => {
        //   this.DeviceToken = token
        //   console.log('c', this.DeviceToken)
        // })
        this.storage.get('registerDeviceToken').then(function (val) {
            if (val && val.token && val.platform) {
                console.log(val.token);
                _this.DeviceToken = val.token;
            }
        });
        if (plt.is('ios')) {
            this.DeviceType = 'apple';
        }
        else if (plt.is('android')) {
            this.DeviceType = 'android';
        }
        // this.gFn.hideMenuIcon()
        // this.lastPageName = this.navCtrl.last().name;
    }
    SettingsPage.prototype.ionViewDidLeave = function () {
        // this.gFn.showMenuIcon()
        if (!this.LogoutClicked) {
            this.gFn.showMenuIcon();
            //this.statusBar.show();
        }
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
        this.gFn.hideMenuIcon();
    };
    SettingsPage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "blue":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "red":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "grey":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "orange":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "darkgreen":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "yellow":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            /*case "pink":
              this.bgThemeColor = this.loggedInUserData.THEME_BG;
              break;*/
            default:
                this.bgThemeColor = "blue";
                this.themeColor = "blue";
                break;
        }
    };
    SettingsPage.prototype.goBack = function () {
        this.gFn.gotoHome();
        // this.navCtrl.setRoot(TabsPage, this.navParams.data).then(() => {
        //this.statusBar.show();
        // });
    };
    SettingsPage.prototype.emailSender = function () {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                //Now we know we can send
            }
        });
        var email = {
            to: 'support@gojaro.com',
            isHtml: true
        };
        // Send a text message using default options
        this.emailComposer.open(email);
    };
    SettingsPage.prototype.setTheme = function (themeName) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.bgThemeColor = themeName;
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('theme_bg', this.bgThemeColor);
        this.http.post(this.global.APIURL + 'users/setThemeHomeScreen', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.loggedInUserData['THEME_BG'] = _this.bgThemeColor;
                _this.storage.set('loggedInUserData', _this.loggedInUserData);
            }
            else {
                alert('Error');
            }
        }, function (error) {
            loading.dismiss();
            //alert(JSON.stringify(error));
        });
    };
    SettingsPage.prototype.goToSettingsHomeImage = function () {
        this.navCtrl.push('SettingsHomeImagesPage');
    };
    SettingsPage.prototype.goToGalleryEvents = function () {
        this.navCtrl.push('GalleryEventsPage');
    };
    SettingsPage.prototype.logOut = function () {
        // this.app.getActiveNav().setRoot('HomePage')
        $('.tabs').find('.tab-button').attr('aria-selected', 'false');
        // $('.tabs .tab-button[aria-selected=false]:nth-child(1)')
        // $('.tab-button').find('aria-label',).attr('aria-selected','false')
        // this.navCtrl.setRoot('HomePage')
        this.storage.set('Refresh', this.load);
        this.LogoutClicked = true;
        // this.setDeviceData(this.loggedInUserData.PERSON_ID)
        this.storage.clear();
        this.getClubDetails();
        this.setMobileAssets();
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    SettingsPage.prototype.setMobileAssets = function () {
        var _this = this;
        new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "teams/getMobileAssets", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data && data.ASSETS) {
                    _this.storage.set("mobileAssets", data.ASSETS[0]);
                    _this.navCtrl.setRoot('LoginPage');
                }
                else {
                    _this.navCtrl.setRoot('LoginPage');
                }
            }, function (error) {
                _this.navCtrl.setRoot('LoginPage');
                resolve(false);
            });
        });
    };
    SettingsPage.prototype.getClubDetails = function () {
        var _this = this;
        new Promise(function (resolve) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': _this.global.App_id
            });
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "teams/getClubDetails", Data, { headers: headers })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    var SSODetails = _this.events.publish('json:query', data.GETCLUBDETAILS)[0][0];
                    _this.storage.set('SSODetails', SSODetails);
                    resolve(true);
                }
            }, function (err) {
                resolve(true);
            });
        });
    };
    SettingsPage.prototype.goToProfileStatisticsPage = function () {
        this.profileHoverActive = 'active';
        this.navCtrl.push('SettingsProfileStatisticsPage');
    };
    SettingsPage.prototype.setDeviceData = function (person_id) {
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', person_id)
            .set('deviceType', this.DeviceType)
            .set('token', this.DeviceToken)
            .set('logged', '0')
            .set('appVer_major', '1')
            .set('appVer_minor', '0')
            .set('appVer_maintenance', '0')
            .set('app_name', this.AppName);
        this.http.post(this.global.APIURL + "push/registerDeviceWithPersonId", Data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
        }, function (error) {
        });
    };
    SettingsPage.prototype.showAboutUs = function () {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]();
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + 'settings/getAboutUs', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.SUCCESS) {
                loading.dismiss();
                var alert_1 = _this.alert.create({
                    title: 'Version No: ' + _this.AppVersion,
                    buttons: ['Dismiss']
                });
                alert_1.present(alert_1);
            }
            else {
                loading.dismiss();
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    SettingsPage.prototype.sendTimesheetDashboard = function () {
        this.navCtrl.push('TimesheetDashboardPage');
    };
    SettingsPage.prototype.gotoAlerts = function () {
        this.app.getRootNav().getActiveChildNav().select(6);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/settings/settings.html"*/'<ion-content [ngStyle]="{\'background-color\': bgThemeColor ? bgThemeColor :  \'#ffffff\'}" >\n  <section class="main mt-20">\n    <div class="top-bar">\n      <div class="col-xs-3">\n        <div class="backArrow inverse" (click)="goBack()"></div>\n      </div>\n    </div>\n\n    <form action="" class="user-form profile setting-first formUpperPadding">\n      <section class="profileFirst heightAuto">\n        <div class="row setting-row">\n          <div class="card-img col-xs-12 p-0 setting-logo logo_position">\n            <span class=""><img src="assets/images/logo.svg" alt="" class="img-circle"></span>\n          </div>\n        </div>\n        <div class="form-group">\n          <div class="row setting-row">\n            <div class="card-title col-xs-11 p-0 setting-title textFont" (click)="goToProfileStatisticsPage()"><a href="javascript:void(0);" class="textFontColor {{bgThemeColor}} {{profileHoverActive}}" >PROFILE</a></div>\n            <!--<div class="card-title col-xs-11 p-0 setting-title textFont" (click)="goToGalleryEvents()"><a href="javascript:void(0);" class="textFontColor">PHOTO GALLERY</a></div>-->\n          </div>\n        </div>\n\n        <div class="lineSpace"></div>\n        <div class="form-group">\n          <label class="mb-30 settingTextColor">SETTINGS</label>\n        </div>\n        <div class="divider"></div>\n        <div class="form-group mt-xl">\n          <label class="mb-30 textFontColor">Choose colour theme</label>\n          <div class="themeCircle">\n            <!-- <span><img class="img-circle" [class.active]="(bgThemeColor==\'blue\')" src="assets/images/theme/blue.svg" alt="" (click)="setTheme(\'blue\')"></span> -->\n            <!-- <span><img class="img-circle" [class.active]="(bgThemeColor==\'yellow\')" src="assets/images/theme/yellow.svg" alt="" (click)="setTheme(\'yellow\')"></span> -->\n            <span class="img-circle circle-image" [class.active]="(bgThemeColor== (appTheme && appTheme.theme_1))" \n            [ngStyle]="{\'background\': appTheme && appTheme.theme_1 ? appTheme.theme_1 :  \'blue\'}" (click)="setTheme(appTheme.theme_1)"></span>\n            <span class="img-circle circle-image" [class.active]="(bgThemeColor==(appTheme && appTheme.theme_2))"  \n            [ngStyle]="{\'background\':  appTheme && appTheme.theme_2 ? appTheme.theme_2 :  \'yellow\'}"\n            (click)="setTheme(appTheme.theme_2)"></span>\n\n          </div>\n          <div class="theme-line" *ngIf="loggedInUserData && (loggedInUserData.ISCONTRACTOR || loggedInUserData.TIMESHEETREVIEWER)"></div>\n\n          <div class="row setting-row" *ngIf="loggedInUserData && (loggedInUserData.ISCONTRACTOR || loggedInUserData.TIMESHEETREVIEWER)" (click)="sendTimesheetDashboard()">\n            <div class="card-title col-xs-11 p-0 setting-title {{bgThemeColor == (appTheme && appTheme.theme_1) ? \'blue\' : \'yellow\' }}">Timesheet</div>\n            <div class="event-next col-xs-1 p-0 setting-arrow">\n              <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n            </div>\n          </div>\n          <div class="theme-line" *ngIf="ShowAlert"></div>\n          <div class="row setting-row" *ngIf="ShowAlert" (click)="gotoAlerts()">\n            <div class="card-title col-xs-11 p-0 setting-title">Alert</div>\n            <div class="event-next col-xs-1 p-0 setting-arrow">\n              <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n            </div>\n          </div>\n          <!-- <div class="theme-line"></div>\n          <div class="row setting-row" (click)="goToSettingsHomeImage()">\n            <div class="card-title col-xs-11 p-0 setting-title">Choose home screen image</div>\n            <div class="event-next col-xs-1 p-0 setting-arrow">\n              <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n            </div>\n          </div> -->\n          <div class="theme-line"></div>\n          <div class="row setting-row" (click)="emailSender()">\n            <div class="card-title col-xs-11 p-0 setting-title {{bgThemeColor == (appTheme && appTheme.theme_1) ? \'blue\' : \'yellow\' }}">Help &amp; support</div>\n            <div class="event-next col-xs-1 p-0 setting-arrow">\n              <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n            </div>\n          </div>\n          <div class="theme-line"></div>\n          <div class="row setting-row aboutus-bottom" (click)="showAboutUs()">\n            <div class="card-title col-xs-11 p-0 setting-title {{bgThemeColor == (appTheme && appTheme.theme_1) ? \'blue\' : \'yellow\' }}">About us</div>\n            <div class="event-next col-xs-1 p-0 setting-arrow">\n              <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right {{bgThemeColor == (appTheme && appTheme.theme_1) ? \'blue\' : \'yellow\' }}" aria-hidden="true"></i></a>\n            </div>\n          </div>\n          <div class="theme-line"></div>\n          <div class="row setting-row aboutus-bottom" (click)="logOut()">\n            <div class="card-title col-xs-11 p-0 setting-title {{bgThemeColor == (appTheme && appTheme.theme_1) ? \'blue\' : \'yellow\' }}">Logout</div>\n            <div class="event-next col-xs-1 p-0 setting-arrow">\n              <a href="javascript:void(0);" class="next-arrow v-center"><i class="fa fa-chevron-right {{bgThemeColor == (appTheme && appTheme.theme_1) ? \'blue\' : \'yellow\' }}" aria-hidden="true"></i></a>\n            </div>\n          </div>\n          <div class="theme-line"></div>\n        </div>\n      </section>\n    </form>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer_ngx__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_version_ngx__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar_ngx__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EventHomePage = /** @class */ (function () {
    function EventHomePage(navCtrl, navParams, storage, events, http, global, loadingCtrl, Alert, logger, app, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.http = http;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.Alert = Alert;
        this.logger = logger;
        this.app = app;
        this.global_api = global_api;
        this.bgThemeColor = '';
        /* $('.tabbar').css('z-index','10')
     
      $('.tabs .tab-button[aria-selected=false]:nth-child(1)').attr('aria-selected','true')
      $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': '',
        'height': '',
        'color': ''}) */
        this.presentAlert('test', 'subtest');
        var weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        var monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        this.CurrentDate = weekdays[new Date().getDay()] + ' ' + new Date().getDate() + ' ' + monthNames[new Date().getMonth()] + ', ' + new Date().getFullYear();
        // console.log('1')
        this.storage.get('setActivatedTeam').then(function (val) {
            _this.setActivatedTeam = JSON.parse(val);
            // console.log('this.setActivatedTeam',this.setActivatedTeam)
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            global_api.getUnreadMessageCount(val);
            _this.storage.get('FunctionAccess').then(function (val1) {
                _this.FunctionAccess = val1;
                if (_this.loggedInUserData.ISPARENT && parseInt(_this.loggedInUserData.PERSON_ID) != parseInt(_this.loggedInUserData.PARENT_ID)) {
                    _this.isParent = true;
                    // console.log(' this.isParent', this.isParent)
                    //   console.log('2')
                    if (_this.isParent && _this.FunctionAccess.sec_absences_menu == 'yes') {
                        _this.ShowAlert = true;
                        // console.log(this.FunctionAccess)
                    }
                }
            });
            _this.backgroundThemeColor();
            _this.getImageName();
        });
        // console.log('3')
        this.global_api.getMedicineName().subscribe(function (data) {
            var medicineInfo = _this.events.publish('json:query', data.QMEDICINE)[0][0];
            _this.storage.set('medicineInfo', JSON.stringify(medicineInfo));
            // console.log(medicineInfo)
        });
    }
    EventHomePage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage');
    };
    // goToTimesheet(){
    //   this.navCtrl.push('TimesheetPage')
    // }
    EventHomePage.prototype.getNextEventDetails = function () {
        var _this = this;
        this.logger.NextPreviousIcons('NextPreviousIcons', { pram: Date.now() });
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('clientTimeZone', this.loggedInUserData.CLIENTTIMEZONE)
            .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('SEASON_ID', this.loggedInUserData.SEASON_ID)
            .set('nextEvent', '1')
            .set('filter', '1')
            .set('client_id', this.loggedInUserData.CLIENT_ID);
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + 'events/getTeamEvents', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            // console.log('response',response.GETTEAMEVENTS[0])
            if (response.SUCCESS) {
                loading.dismiss();
                if (response.GETTEAMEVENTS != "") {
                    var UpcomingSingleEvent = JSON.stringify(response.GETTEAMEVENTS[0]);
                    _this.storage.set('UpcomingSingleEvent', UpcomingSingleEvent);
                    // console.log('response',UpcomingSingleEvent)
                    _this.loggedInUserData['EVENT_ID'] = response.GETTEAMEVENTS[0].event_id;
                    _this.loggedInUserData['EVENT_TYPE_ID'] = response.GETTEAMEVENTS[0].event_type_id;
                    _this.storage.set('loggedInUserData', _this.loggedInUserData);
                    _this.sendEventDashboard(response.GETTEAMEVENTS[0]);
                }
                else {
                    _this.loggedInUserData['EVENT_ID'] = "";
                    _this.loggedInUserData['EVENT_TYPE_ID'] = "";
                    _this.storage.set('loggedInUserData', _this.loggedInUserData);
                    _this.presentAlert('Upcoming Events', 'No upcoming events present');
                }
            }
            else {
                loading.dismiss();
            }
        }, function (error) {
            loading.dismiss();
            _this.presentAlert('Error', 'Data not found or Connection issue.');
        });
    };
    EventHomePage.prototype.getPreviousEventDetails = function () {
        var _this = this;
        this.logger.NextPreviousIcons('NextPreviousIcons', { pram: Date.now() });
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('clientTimeZone', this.loggedInUserData.CLIENTTIMEZONE)
            .set('selectedTeam', this.loggedInUserData.SELECTEDTEAM)
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('SEASON_ID', this.loggedInUserData.SEASON_ID)
            .set('nextEvent', '1')
            .set('filter', '4')
            .set('client_id', this.loggedInUserData.CLIENT_ID);
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + 'events/getTeamEvents', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            // console.log('response',response.GETTEAMEVENTS[0])
            if (response.SUCCESS) {
                loading.dismiss();
                if (response.GETTEAMEVENTS != "") {
                    var UpcomingSingleEvent = JSON.stringify(response.GETTEAMEVENTS[0]);
                    _this.storage.set('UpcomingSingleEvent', UpcomingSingleEvent);
                    // console.log('response',UpcomingSingleEvent)
                    _this.loggedInUserData['EVENT_ID'] = response.GETTEAMEVENTS[0].event_id;
                    _this.loggedInUserData['EVENT_TYPE_ID'] = response.GETTEAMEVENTS[0].event_type_id;
                    _this.storage.set('loggedInUserData', _this.loggedInUserData);
                    _this.sendEventDashboard(response.GETTEAMEVENTS[0]);
                }
                else {
                    _this.loggedInUserData['EVENT_ID'] = "";
                    _this.loggedInUserData['EVENT_TYPE_ID'] = "";
                    _this.storage.set('loggedInUserData', _this.loggedInUserData);
                    _this.presentAlert('Upcoming Events', 'No past events present');
                }
            }
            else {
                loading.dismiss();
            }
        }, function (error) {
            loading.dismiss();
            _this.presentAlert('Error', 'Data not found or Connection issue.');
        });
    };
    EventHomePage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "green":
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
            default:
                this.bgThemeColor = "blue";
                break;
        }
    };
    EventHomePage.prototype.getImageName = function () {
        this.homeScreen_bg = this.loggedInUserData.HOMESCREEN_BG;
        this.setHomeScreenImage = 'assets/images/' + this.homeScreen_bg;
    };
    EventHomePage.prototype.ionViewDidLoad = function () {
        // console.log('kk')
        /* $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected','false')
        $('.tabs .tab-button[aria-selected=false]:nth-child(1)').attr('aria-selected','true') */
        // $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({'mask-image': '',
        // 'height':'',
        // 'color': ''})
        // $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({'mask-image': '',
        // 'height':'',
        // 'color': ''})
        // $('.tabs').find('.tab-button').attr('aria-selected','true')
        this.storage.set('BackButton', false);
    };
    EventHomePage.prototype.goToGradingPage = function () {
        this.navCtrl.push('PlayerGradingPage');
    };
    EventHomePage.prototype.sendEventDashboard = function (EventData) {
        // this.navCtrl.push('EventDashboardPage')
        // this.app
        this.app.getActiveNav().push('EventHomeNewPage', { 'EventDetails_eventId': EventData });
        // this.app.getRootNav().push('EventDashboardPage')
    };
    EventHomePage.prototype.sendGameDashboard = function () {
        this.navCtrl.push('GameboardPage');
    };
    EventHomePage.prototype.sendTimesheetDashboard = function () {
        this.navCtrl.push('TimesheetDashboardPage');
    };
    EventHomePage.prototype.sendToMessageLog = function () {
        this.app.getRootNav().getActiveChildNav().select(5);
    };
    EventHomePage.prototype.gotoAlerts = function () {
        this.app.getRootNav().getActiveChildNav().select(6);
    };
    EventHomePage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.Alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    EventHomePage.prototype.gotoGalleryEvent = function () {
        this.navCtrl.push('GalleryEventsPage');
    };
    EventHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-home',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-home/event-home.html"*/'\n    <nav class="navbar navbar-fixed-top" hideBackButton="true" transparent>\n        <!-- <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n          <a href="javascript:void(0);" class="next"></a>\n        </div> -->\n        <div class="prev-next pull-right trophy" (click)="sendToMessageLog()">\n          <img src="assets/images/bell.svg">\n        </div>\n      </nav>\n\n\n<ion-content class="bg-homeScreen {{bgThemeColor}}" [ngStyle]="{\'background-image\':\'url(\' + setHomeScreenImage + \')\'}">\n  <div>\n    <section class="main">\n\n      <form action="" class="user-form profile">\n        <section class="profileFirst heightAuto">\n            <img class="logo-top" src="assets/images/Brisbaneboys-logo.svg" alt="">\n          <div class="form-group">\n            <h5 class="info-item">{{CurrentDate}}</h5>\n          </div>\n\n          <div class="form-group mt-xl">\n            <div class="title" *ngIf="loggedInUserData && loggedInUserData.ISPARENT == 0">\n              Hi {{loggedInUserData.LOGGEDIN_USER_FIRST_NAME}},\n              <br>\n              <div *ngIf="setActivatedTeam">\n                welcome to {{setActivatedTeam.TEAM_NAME}},\n                <span *ngIf="setActivatedTeam.DIVISION_NAME && setActivatedTeam.DIVISION_NAME.length > 0">\n                <br>{{setActivatedTeam.DIVISION_NAME}},\n                </span>\n                <br> {{setActivatedTeam.CLIENT_NAME}}\n              </div>\n            </div>\n            <div class="title" *ngIf="loggedInUserData && loggedInUserData.ISPARENT == 1">\n                Hi {{loggedInUserData.LOGGEDIN_USER_FIRST_NAME}}\n                <span *ngIf="loggedInUserData.LOGGEDIN_USER_PERSON_ID!=loggedInUserData.PERSON_ID">\n                  ! You are looking at:<br><br> {{loggedInUserData.FIRST_NAME}}\n                </span>\n\n                <div *ngIf="setActivatedTeam">\n                  <span *ngIf="setActivatedTeam.DIVISION_NAME && setActivatedTeam.DIVISION_NAME.length > 0">\n                  <br>{{setActivatedTeam.DIVISION_NAME}},\n                  </span>\n                  <br> {{setActivatedTeam.CLIENT_NAME}}\n                </div>\n\n              </div>\n          </div>\n\n          <div class="option-item mt-30">\n            <div class="row">\n              <div class="well col-xs-6">\n                <div class="icon-wrap" (click)="getPreviousEventDetails()">\n                  <img src="assets/images/event-prev.svg" alt="">\n                  <label >PREVIOUS EVENT</label>\n                </div>\n              </div>\n              <div class="well col-xs-6">\n                <div class="icon-wrap" (click)="getNextEventDetails()">\n                  <img src="assets/images/event-nxt.svg" alt="">\n                  <label >NEXT EVENT</label>\n                </div>\n              </div>\n            </div>\n            <div class="row" *ngIf="loggedInUserData && ((loggedInUserData.ISCONTRACTOR || loggedInUserData.TIMESHEETREVIEWER) || ShowAlert)">\n              <div class="well col-xs-6" *ngIf="loggedInUserData && (loggedInUserData.ISCONTRACTOR || loggedInUserData.TIMESHEETREVIEWER)">\n                <div class="icon-wrap" (click)="sendTimesheetDashboard()">\n                  <img src="assets/images/time_sheet.svg" alt="" >\n                  <label>TIMESHEETS</label>\n                </div>\n              </div>\n              <div class="well col-xs-6" *ngIf="loggedInUserData && (loggedInUserData.ISCONTRACTOR || loggedInUserData.TIMESHEETREVIEWER)">&nbsp;</div>\n              <div class="well col-xs-6" (click)="gotoAlerts()" *ngIf="ShowAlert">\n                <div class="icon-wrap" >\n                  <img src="assets/images/alerts.svg" alt="">\n                  <label>ALERTS</label>\n                </div>\n              </div>\n              <div class="well col-xs-6" *ngIf="ShowAlert">&nbsp;</div>\n            </div>\n            <!--\n            <div class="row">\n              <div class="well col-xs-6">\n                <div class="icon-wrap" >\n                  <img src="assets/images/start-game.png" alt="">\n                  <label>START GAME</label>\n                </div>\n              </div>\n              <div class="well col-xs-6">\n                <div class="icon-wrap" (click)="goToGradingPage()">\n                  <img src="assets/images/grading.png" alt="">\n                  <label>GRADING</label>\n                </div>\n              </div>\n            </div>\n            <div class="row">\n              <div class="well in col-xs-6">\n                <div class="icon-wrap" (click)="gotoGalleryEvent()">\n                  <img src="assets/images/gallery.png">\n                  <label>GALLERY</label>\n                </div>\n              </div>\n              <div class="well col-xs-6">\n                <div class="icon-wrap">\n                  <img src="assets/images/stats-lineup.png" alt="">\n                  <label>LEADERBOARD</label>\n                </div>\n              </div>\n            </div>\n              -->\n        \n          </div>\n        </section>\n        <!-- <div class="slider">\n          <div class="sliderBg">\n            <ion-slides loop="true" pager="true">\n              <ion-slide>\n              <div class="item">\n                <div class="card">\n                  <h4 class="inverseText">NEWSFEED</h4>\n                  <div class="row pt-30">\n                    <div class="thumbnail col-xs-3">\n                      <img src="assets/images/img-2.png" class="img-responsive" alt="">\n                    </div>\n                    <div class="col-xs-9">\n                      <h4 class="card-title">Thanks to everyone who helped raise $300 at the cake stall.</h4>\n                    </div>\n                  </div>\n                  <div class="card-circle bottom-right">\n                    <span>56</span> <i class="fa fa-star" aria-hidden="true"></i>\n                  </div>\n                </div>\n              </div>\n              </ion-slide>\n              <ion-slide>\n              <div class="item">\n                <div class="card">\n                  <h4 class="inverseText">NEWSFEED</h4>\n                  <div class="row pt-30">\n                    <div class="thumbnail col-xs-3">\n                      <img src="assets/images/img-2.png" class="img-responsive" alt="">\n                    </div>\n                    <div class="col-xs-9">\n                      <h4 class="card-title">Thanks to everyone who helped raise $300 at the cake stall.</h4>\n                    </div>\n                  </div>\n                  <div class="card-circle bottom-right">\n                    <span>56</span> <i class="fa fa-star" aria-hidden="true"></i>\n                  </div>\n                </div>\n              </div>\n              </ion-slide>\n              <ion-slide>\n              <div class="item">\n                <div class="card">\n                  <h4 class="inverseText">NEWSFEED</h4>\n                  <div class="row pt-30">\n                    <div class="thumbnail col-xs-3">\n                      <img src="assets/images/img-2.png" class="img-responsive" alt="">\n                    </div>\n                    <div class="col-xs-9">\n                      <h4 class="card-title">Thanks to everyone who helped raise $300 at the cake stall.</h4>\n                    </div>\n                  </div>\n                  <div class="card-circle bottom-right">\n                    <span>56</span> <i class="fa fa-star" aria-hidden="true"></i>\n                  </div>\n                </div>\n              </div>\n              </ion-slide>\n            </ion-slides>\n          </div>\n        </div> -->\n      </form>\n    </section>\n  </div>\n</ion-content>\n<!--\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav">\n        <li class="home active"><a href="javascript:void(0)">Home</a></li>\n        <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0)">Events</a></li>\n        <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0)">Players</a></li>\n        <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0)">Comments</a></li>\n        <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n      </ul>\n    </div>\n  </nav>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-home/event-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__["a" /* EventLoggerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventHomePage);
    return EventHomePage;
}());

//# sourceMappingURL=event-home.js.map

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GlobalProvider = /** @class */ (function () {
    function GlobalProvider(http) {
        this.http = http;
        this.APIURL = 'https://api.gojaro.com/rest/jaro/';
        // public APIURL_CORE = 'https://coreapi.gojaro.com/';
        this.APIURL_CORE = 'https://api.gojaro.com/rest/jaro/';
        this.PROFILEIMAGEURL = 'https://database.gojaro.com/profiles/';
        this.CHATGROUPLOGOURL = 'http://database.gojaro.com/logos/';
        //public PROFILEIMAGEURL = 'http://api.gojaro.com/profileimage/';
        this.MESSAGEIMAGE = 'http://api.gojaro.com/chatUploadImage/';
        this.MESSAGEFALLBACKIMAGE = 'http://mobile.gojaro.com/message_cache/';
        this.GALLERYIMAGEURL = 'http://api.gojaro.com/GalleryImage/';
        this.MEDICALCERTIFICATEIMAGEURL = 'http://api.gojaro.com/MedicalCertificateImages/';
        this.ImagesPath = 'assets/images/';
        this.App_id = 'com.gojaro.westmacapp';
        //console.log('Hello GlobalProvider Provider');
    }
    GlobalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], GlobalProvider);
    return GlobalProvider;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 230:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 230;

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_interval__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_interval__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GlobalApiProvider = /** @class */ (function () {
    function GlobalApiProvider(http, global, toastCtrl, storage, app, events) {
        var _this = this;
        this.http = http;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.app = app;
        this.events = events;
        this.SSODetails = {};
        this.isLogoutData = true;
        console.log('Hello GlobalApiProvider Provider');
        this.storage.get('token').then(function (val) {
            _this.loginUserToken = val;
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
        });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
    }
    GlobalApiProvider.prototype.getHeader = function () {
        this.storage.set("token", this.loginUserToken);
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': this.loginUserToken,
            'X-Requested-With': this.global.App_id
        });
        return headers;
    };
    GlobalApiProvider.prototype.getUpcomingEvent = function (PersonData) {
        var PlayersData = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
            .set('filter', '1')
            .set('clientTimeZone', PersonData.CLIENTTIMEZONE)
            .set('selectedTeam', PersonData.SELECTEDTEAM)
            .set('person_id', PersonData.PERSON_ID)
            .set('client_id', PersonData.CLIENT_ID)
            .set('SEASON_ID', PersonData.SEASON_ID);
        return this.http.post(this.global.APIURL + "events/getTeamEventsByMonthGroup", PlayersData, { headers: this.getHeader() });
    };
    GlobalApiProvider.prototype.getTimesheetDashboardEvents = function (PersonData) {
        var data = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
            .set('clientTimeZone', PersonData.CLIENTTIMEZONE)
            .set('selectedTeam', PersonData.SELECTEDTEAM)
            .set('person_id', PersonData.PERSON_ID)
            .set('client_id', PersonData.CLIENT_ID)
            .set('SEASON_ID', PersonData.SEASON_ID);
        return this.http.post(this.global.APIURL + "events/getTeamEventsByMonthGroupUPCons", data, { headers: this.getHeader() });
    };
    GlobalApiProvider.prototype.getTimesheetEvents = function (PersonData) {
        var data = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
            .set('clientTimeZone', PersonData.CLIENTTIMEZONE)
            .set('selectedTeam', PersonData.SELECTEDTEAM)
            .set('person_id', PersonData.PERSON_ID)
            .set('client_id', PersonData.CLIENT_ID)
            .set('SEASON_ID', PersonData.SEASON_ID)
            .set('app_name', this.global.App_id);
        return this.http.post(this.global.APIURL + "events/getTeamEventsByMonthGroupUPCons2", data, { headers: this.getHeader() });
    };
    GlobalApiProvider.prototype.getTimesheetDashboardEventsPerson = function (PersonData) {
        var data = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
            .set('clientTimeZone', PersonData.CLIENTTIMEZONE)
            .set('selectedTeam', PersonData.SELECTEDTEAM)
            .set('person_id', PersonData.PERSON_ID)
            .set('client_id', PersonData.CLIENT_ID)
            .set('SEASON_ID', PersonData.SEASON_ID);
        return this.http.post(this.global.APIURL + "events/getTeamEventsByMonthGroupUPPerson2", data, { headers: this.getHeader() });
    };
    GlobalApiProvider.prototype.getUnreadMessageCount = function (PersonData) {
        var _this = this;
        //$('.tab-button:nth-child(4)').removeClass('has-badge');
        this.storage.get('loggedInUserData').then(function (val) {
            if (typeof val.CHATCOUNTER != 'undefined') {
                _this.showChatCounter(val.CHATCOUNTER);
            }
        });
        this.storage.get('isLogout').then(function (value) {
        });
        var data = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
            .set('personId', PersonData.PERSON_ID);
        if (typeof this.unreadCounter != 'undefined') {
            this.unreadCounter.unsubscribe();
        }
        this.unreadCounter = __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].interval(5000).subscribe(function (val) {
            _this.http.post(_this.global.APIURL + 'messages/countUnreadMessage', data, { headers: _this.getHeader() })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    var counter = parseInt(response.UNREADCOUNT);
                    _this.storage.set('count', counter);
                    PersonData.CHATCOUNTER = counter;
                    _this.storage.set('loggedInUserData', PersonData);
                    _this.showChatCounter(counter);
                }
                else {
                    console.log("session expired");
                    _this.logout();
                }
            }, function (error) {
                console.log("expired");
                // this.logout();
            });
        });
    };
    GlobalApiProvider.prototype.getAlrtMessageCount = function () {
        var _this = this;
        console.log("this.FunctionAccess", this.FunctionAccess);
        console.log("this.loggedInUserData", this.loggedInUserData);
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
                .set('reciever_id', (_this.FunctionAccess && _this.FunctionAccess.user_adminLevel == 4) ? _this.loggedInUserData.PERSON_ID : '')
                .set('sender_id', (_this.FunctionAccess && _this.FunctionAccess.user_adminLevel != 4) ? _this.loggedInUserData.PERSON_ID : '');
            if (typeof _this.alrtCounter !== 'undefined') {
                _this.alrtCounter.unsubscribe();
            }
            _this.alrtCounter = __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].interval(5000).subscribe(function (val) {
                _this.http.post(_this.global.APIURL + "players/getGroupMessages", PlayersData, { headers: _this.getHeader() })
                    .subscribe(function (data) {
                    if (data.SUCCESS) {
                        var counter = data.GETGROUPMESSAGE.DATA.length;
                        if (_this.loggedInUserData && _this.loggedInUserData.ALERTCOUNTER) {
                            _this.loggedInUserData.this.loggedInUserData.ALERTCOUNTER = counter;
                        }
                        _this.storage.set('loggedInUserData', _this.loggedInUserData);
                        _this.showAlertCounter(counter);
                        resolve(true);
                    }
                    else {
                        resolve(true);
                    }
                }, function (error) {
                    resolve(false);
                });
            });
        });
    };
    // getAlrtMessageCountf(PersonData){
    //   this.storage.get('isLogout').then(value=>{
    //   })
    //   let data = new HttpParams()
    //     .set('personId', PersonData.PERSON_ID);
    //     if(typeof this.alrtCounter != 'undefined'){
    //       this.alrtCounter.unsubscribe();
    //     }
    //   this.alrtCounter = Observable.interval(5000).subscribe((val) => {
    //     // replace it with alert api
    //     this.http.post<any>(this.global.APIURL+'messages/countaler', data,{headers:this.getHeader()})
    //     .subscribe(response => {
    //       if(response.SUCCESS){
    //          let counter = parseInt(response.UNREADCOUNT);
    //         // this.storage.set('count',counter);
    //         // PersonData.CHATCOUNTER = counter;
    //         // this.storage.set('loggedInUserData', PersonData);
    //          this.showAlertCounter(counter);
    //       }else{
    //         console.log("session expired");
    //         this.logout();
    //       }
    //     }, error => {
    //       console.log("expired"); 
    //       this.showAlertCounter(10);
    //      });
    //   });
    // }
    GlobalApiProvider.prototype.logout = function () {
        var _this = this;
        this.storage.get('isLogout').then(function (value) {
            console.log("is Loggout vale ", value);
            if (value) {
                _this.logOut();
            }
        });
        if (this.isLogoutData == true) {
            console.log("Logout now ");
            this.logOut();
        }
        else {
            console.log("Already logout");
        }
    };
    GlobalApiProvider.prototype.logOut = function () {
        // this.app.getActiveNav().setRoot('HomePage')
        $('.tabs').find('.tab-button').attr('aria-selected', 'false');
        // $('.tabs .tab-button[aria-selected=false]:nth-child(1)')
        // $('.tab-button').find('aria-label',).attr('aria-selected','false')
        // this.navCtrl.setRoot('HomePage')
        // this.LogoutClicked = true;
        // this.setDeviceData(this.loggedInUserData.PERSON_ID)
        this.isLogoutData = false;
        // this.storage.set('isLogout',this.isLogoutData)
        this.storage.clear();
        this.app.getActiveNav().setRoot('HomePage');
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    GlobalApiProvider.prototype.showChatCounter = function (counter) {
        // this is for testing purpose 
        //  this.showAlertCounter(counter)
        // counter = 10;
        if (counter > 0) {
            $('.tab-button:nth-child(4)').addClass('has-badge');
            $('.icon-wrap.chats .badge').removeClass('hide');
            // alrt
            // $('.icon-wrap.alerts .badge').removeClass('hide');
            if (counter > 9) {
                $('.tab-button:nth-child(4) ion-badge.tab-badge').removeClass('single');
                $('.tab-button:nth-child(4) ion-badge.tab-badge').text('9+');
                $('.icon-wrap.chats .badge .counter').text('9+');
                // alrt
                // $('.icon-wrap.alerts .badge .counter').text('9+');
            }
            else {
                $('.tab-button:nth-child(4) ion-badge.tab-badge').addClass('single');
                $('.tab-button:nth-child(4) ion-badge.tab-badge').text(counter);
                $('.icon-wrap.chats .badge .counter').text(counter);
                // alrts
                // $('.icon-wrap.alerts .badge .counter').text(counter);
            }
        }
        else {
            $('.tab-button:nth-child(4)').removeClass('has-badge');
            $('.icon-wrap.chats .badge').addClass('hide');
        }
    };
    GlobalApiProvider.prototype.showAlertCounter = function (counter) {
        if (counter > 0) {
            // alrt
            $('.icon-wrap.alerts .badge').removeClass('hide');
            if (counter > 9) {
                // alrt
                $('.icon-wrap.alerts .badge .counter').text('9+');
            }
            else {
                $('.icon-wrap.alerts .badge .counter').text(counter);
            }
        }
        else {
            $('.icon-wrap.chats .alerts').addClass('hide');
        }
    };
    GlobalApiProvider.prototype.removeUnreadCounter = function () {
        if (typeof this.unreadCounter != 'undefined') {
            this.unreadCounter.unsubscribe();
        }
        if (typeof this.alrtCounter != 'undefined') {
            this.alrtCounter.unsubscribe();
        }
    };
    GlobalApiProvider.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    GlobalApiProvider.prototype.getMedicineName = function () {
        var data = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]();
        return this.http.post(this.global.APIURL + "medicine/Medicine", data, { headers: this.getHeader() });
    };
    GlobalApiProvider.prototype.getFunctionAccess = function (person_id, client_id, clubDivivionId) {
        var _this = this;
        return new Promise(function (resolve) {
            var data = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', person_id)
                .set('client_id', client_id)
                .set('club_division_id', clubDivivionId);
            _this.http.post(_this.global.APIURL + 'users/getPersonAccess', data, { headers: _this.getHeader() })
                .subscribe(function (response) {
                _this.storage.get('SSODetails').then(function (val) {
                    _this.SSODetails = val;
                    _this.storage.get('loggedInUserData').then(function (val) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                        _this.loggedInUserData = val;
                        if (_this.loggedInUserData && _this.loggedInUserData['TIMESHEETREVIEWER']) {
                            _this.loggedInUserData['TIMESHEETREVIEWER'] = response.TIMESHEETREVIEWER ? response.TIMESHEETREVIEWER : false;
                        }
                        if (_this.loggedInUserData && _this.loggedInUserData['ISCONTRACTOR']) {
                            _this.loggedInUserData['ISCONTRACTOR'] = response.ISCONTRACTOR ? response.ISCONTRACTOR : false;
                        }
                        _this.storage.set('loggedInUserData', _this.loggedInUserData);
                        if (response.GETPERSONACCESS == 1) {
                            var setData = {
                                user_adminLevel: 1,
                                event_StillComing: 'no',
                                event_EventDetail: 'yes',
                                event_EventDetail_checkbox: 'yes',
                                event_BorrowPlayer: 'yes',
                                event_NotifyPlayer: ((_a = _this.SSODetails) === null || _a === void 0 ? void 0 : _a.SHOWNOTIFYPLAYERMENU) == 1 ? 'yes' : 'no',
                                event_GroupMessage: ((_b = _this.SSODetails) === null || _b === void 0 ? void 0 : _b.SHOWGROUPMESSAGEMENU) == 1 ? 'yes' : 'no',
                                event_SessionPlan: 'yes but not now',
                                event_Injury: ((_c = _this.SSODetails) === null || _c === void 0 ? void 0 : _c.SHOWINJURYMENU) == 1 ? 'yes' : 'no',
                                event_Transport: ((_d = _this.SSODetails) === null || _d === void 0 ? void 0 : _d.SHOWTRANSPORTMENU) == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                                event_tab_Attendance: 'yes',
                                event_tab_Overview: 'no',
                                event_Welfare: ((_e = _this.SSODetails) === null || _e === void 0 ? void 0 : _e.SHOWWELFAREMENU) == 1 ? 'yes' : 'no',
                                event_Result: ((_f = _this.SSODetails) === null || _f === void 0 ? void 0 : _f.SHOWRESULTSMENU) == 1 ? 'yes' : 'no',
                                // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                                team_assigned: 'yes',
                                player_coachingReport: 'yes',
                                player_sms: 'yes',
                                player_phone: 'yes',
                                player_emergency_phone: 'yes',
                                voting_for_player: ((_g = _this.SSODetails) === null || _g === void 0 ? void 0 : _g.SHOWMVPMENU) == 1 ? 'yes' : 'no',
                                game_report: 'yes',
                                game_score: 'yes',
                                bottom_player_menu: ((_h = _this.SSODetails) === null || _h === void 0 ? void 0 : _h.SHOWPLAYERSMENU) == 1 ? 'yes' : 'no',
                                bottom_chat_menu: ((_j = _this.SSODetails) === null || _j === void 0 ? void 0 : _j.SHOWCHATMENU) == 1 ? 'yes' : 'no',
                                profile_menu: ((_k = _this.SSODetails) === null || _k === void 0 ? void 0 : _k.profile_menu) == 1 ? 'yes' : 'no',
                                sec_absences_menu: ((_l = _this.SSODetails) === null || _l === void 0 ? void 0 : _l.SHOWSECABSENCEMENU) == 1 ? 'yes' : 'no',
                                session_assessment_menu: ((_m = _this.SSODetails) === null || _m === void 0 ? void 0 : _m.SHOWSESSIONASSESSMENTMENU) == 1 ? 'yes' : 'no',
                                // rsvp_menu:this.SSODetails.SHOWRSVPMENU==0?'yes':'no',
                                // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',  
                                // medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                                HasMedicineReviewAccess: ((_o = _this.SSODetails) === null || _o === void 0 ? void 0 : _o.SHOWMEDICALMENU) == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                                showSurveyMenu: ((_p = _this.SSODetails) === null || _p === void 0 ? void 0 : _p.SHOWSURVEYMENU) == 1 ? 'yes' : 'no',
                            };
                            _this.storage.set('FunctionAccess', setData);
                        }
                        else if (response.GETPERSONACCESS == 2) {
                            var setData1 = {
                                user_adminLevel: 2,
                                event_StillComing: 'no',
                                event_EventDetail: 'yes',
                                event_EventDetail_checkbox: 'yes',
                                event_BorrowPlayer: 'yes',
                                event_NotifyPlayer: _this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
                                event_GroupMessage: _this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
                                event_SessionPlan: 'yes but not now',
                                event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
                                event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                                event_tab_Attendance: 'yes',
                                event_tab_Overview: 'no',
                                event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
                                event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                                // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                                team_assigned: 'yes',
                                player_coachingReport: 'yes',
                                player_sms: 'no',
                                player_phone: 'yes',
                                player_emergency_phone: 'yes',
                                voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
                                game_report: 'yes',
                                game_score: 'yes',
                                bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                                bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                                profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                                sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                                session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                                // rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
                                // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                                //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                                HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                                showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                            };
                            _this.storage.set('FunctionAccess', setData1);
                        }
                        else if (response.GETPERSONACCESS == 3) {
                            var setData2 = {
                                user_adminLevel: 3,
                                event_StillComing: 'no',
                                event_EventDetail: 'yes',
                                event_EventDetail_checkbox: 'yes',
                                event_BorrowPlayer: 'yes',
                                event_NotifyPlayer: _this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
                                event_GroupMessage: _this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
                                event_SessionPlan: 'yes but not now',
                                event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
                                event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                                event_tab_Attendance: 'yes',
                                event_tab_Overview: 'no',
                                event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
                                event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                                team_assigned: 'yes',
                                player_coachingReport: 'yes',
                                player_sms: 'no',
                                player_phone: 'yes',
                                player_emergency_phone: 'yes',
                                voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
                                game_report: 'yes',
                                game_score: 'yes',
                                bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                                bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                                profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                                sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                                session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                                HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                                showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                            };
                            _this.storage.set('FunctionAccess', setData2);
                        }
                        // ALLOWTOVIEWOTHERPLAYERS
                        else {
                            var setData3 = {
                                user_adminLevel: 4,
                                event_StillComing: _this.SSODetails.SHOWRSVPMENU == 1 ? 'yes' : 'no',
                                event_EventDetail: _this.SSODetails.SHOWRSVPMENU == 1 ? 'self' : 'no',
                                event_EventDetail_checkbox: 'self',
                                event_BorrowPlayer: 'no',
                                event_NotifyPlayer: 'no',
                                event_GroupMessage: 'no',
                                event_SessionPlan: 'no',
                                event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'self' : 'no',
                                event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                                event_tab_Attendance: 'no',
                                event_tab_Overview: 'yes',
                                event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'self' : 'no',
                                event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                                // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                                team_assigned: 'yes',
                                player_coachingReport: 'yes',
                                player_sms: 'yes',
                                player_phone: 'yes',
                                player_emergency_phone: 'yes',
                                voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'self' : 'no',
                                game_report: 'no',
                                game_score: 'no',
                                bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                                bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                                profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                                sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                                session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                                view_other_players: _this.SSODetails.ALLOWTOVIEWOTHERPLAYERS == 1 ? 'yes' : 'no',
                                //rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',//New
                                // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                                //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',//New
                                HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                                showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                            };
                            _this.storage.set('FunctionAccess', setData3);
                        }
                        resolve(true);
                    });
                });
            }, function (error) {
                _this.storage.set('FunctionAccess', '');
                resolve(false);
            });
        });
    };
    GlobalApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */]])
    ], GlobalApiProvider);
    return GlobalApiProvider;
}());

//# sourceMappingURL=global-api.js.map

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-rollcalls/add-rollcalls.module": [
		752,
		95
	],
	"../pages/additional-passenger/additional-passenger.module": [
		753,
		94
	],
	"../pages/alert-dashboard/alert-dashboard.module": [
		281
	],
	"../pages/borrowed-player/borrowed-player.module": [
		754,
		93
	],
	"../pages/call-modal/call-modal.module": [
		755,
		92
	],
	"../pages/chat-dashboard/chat-dashboard.module": [
		282
	],
	"../pages/chat-group-info/chat-group-info.module": [
		756,
		91
	],
	"../pages/chat-view-image/chat-view-image.module": [
		757,
		90
	],
	"../pages/chat-view/chat-view.module": [
		759,
		89
	],
	"../pages/choose-home-image/choose-home-image.module": [
		758,
		88
	],
	"../pages/choose-players/choose-players.module": [
		762,
		87
	],
	"../pages/choose-team-profile/choose-team-profile.module": [
		760,
		105
	],
	"../pages/choose-team/choose-team.module": [
		761,
		86
	],
	"../pages/choose-theme/choose-theme.module": [
		763,
		85
	],
	"../pages/contracter-timesheet-list/contracter-timesheet-list.module": [
		764,
		84
	],
	"../pages/create-node/create-node.module": [
		765,
		83
	],
	"../pages/display-events-new/display-events-new.module": [
		766,
		104
	],
	"../pages/display-events/display-events.module": [
		767,
		103
	],
	"../pages/email-modal/email-modal.module": [
		768,
		82
	],
	"../pages/event-attendance-confirm/event-attendance-confirm.module": [
		770,
		81
	],
	"../pages/event-attendance-loadingpage/event-attendance-loadingpage.module": [
		769,
		80
	],
	"../pages/event-attendance-note/event-attendance-note.module": [
		771,
		79
	],
	"../pages/event-attendance/event-attendance.module": [
		772,
		102
	],
	"../pages/event-confirm-absence/event-confirm-absence.module": [
		773,
		78
	],
	"../pages/event-dashboard-loading/event-dashboard-loading.module": [
		774,
		77
	],
	"../pages/event-dashboard-new/event-dashboard-new.module": [
		777,
		76
	],
	"../pages/event-dashboard/event-dashboard.module": [
		775,
		75
	],
	"../pages/event-group-message-text/event-group-message-text.module": [
		776,
		74
	],
	"../pages/event-group-message/event-group-message.module": [
		778,
		0
	],
	"../pages/event-group-send-message/event-group-send-message.module": [
		779,
		73
	],
	"../pages/event-home-menu/event-home-menu.module": [
		780,
		101
	],
	"../pages/event-home-new/event-home-new.module": [
		857,
		72
	],
	"../pages/event-home/event-home.module": [
		781,
		100
	],
	"../pages/event-offline-alt/event-offline-alt.module": [
		782,
		71
	],
	"../pages/event-offline/event-offline.module": [
		783,
		70
	],
	"../pages/event-session-plan/event-session-plan.module": [
		784,
		69
	],
	"../pages/event-stats-graph/event-stats-graph.module": [
		785,
		68
	],
	"../pages/event-stats/event-stats.module": [
		786,
		67
	],
	"../pages/event-update-player-modal/event-update-player-modal.module": [
		787,
		66
	],
	"../pages/event-welfare/event-welfare.module": [
		788,
		65
	],
	"../pages/events-results/events-results.module": [
		791,
		64
	],
	"../pages/filter-temp/filter-temp.module": [
		790,
		63
	],
	"../pages/forget/forget.module": [
		789,
		62
	],
	"../pages/gallery-album/gallery-album.module": [
		792,
		61
	],
	"../pages/gallery-events/gallery-events.module": [
		793,
		60
	],
	"../pages/gallery-timeline-details/gallery-timeline-details.module": [
		794,
		59
	],
	"../pages/gallery-timeline/gallery-timeline.module": [
		795,
		58
	],
	"../pages/gameboard/gameboard.module": [
		796,
		57
	],
	"../pages/get-started/get-started.module": [
		290
	],
	"../pages/group-chat-view/group-chat-view.module": [
		797,
		56
	],
	"../pages/home/home.module": [
		798,
		55
	],
	"../pages/injured-list/injured-list.module": [
		799,
		54
	],
	"../pages/injury-cause/injury-cause.module": [
		800,
		53
	],
	"../pages/injury-incident-report/injury-incident-report.module": [
		802,
		52
	],
	"../pages/last-rollcall/last-rollcall.module": [
		801,
		51
	],
	"../pages/login/login.module": [
		803,
		50
	],
	"../pages/map-tracker/map-tracker.module": [
		805,
		49
	],
	"../pages/medicine-info/medicine-info.module": [
		804,
		48
	],
	"../pages/menu/menu.module": [
		807,
		47
	],
	"../pages/message-log-dashboard/message-log-dashboard.module": [
		806,
		99
	],
	"../pages/new-discussion-create/new-discussion-create.module": [
		808,
		46
	],
	"../pages/new-discussion-list/new-discussion-list.module": [
		809,
		45
	],
	"../pages/new-discussion-save/new-discussion-save.module": [
		810,
		44
	],
	"../pages/notify-parents/notify-parents.module": [
		811,
		43
	],
	"../pages/notify-players/notify-players.module": [
		813,
		42
	],
	"../pages/player-add-for-grading/player-add-for-grading.module": [
		812,
		41
	],
	"../pages/player-coaching-report/player-coaching-report.module": [
		837,
		40
	],
	"../pages/player-details/player-details.module": [
		816,
		39
	],
	"../pages/player-grading/player-grading.module": [
		814,
		38
	],
	"../pages/player-group-message/player-group-message.module": [
		815,
		37
	],
	"../pages/player-list-grade-report/player-list-grade-report.module": [
		817,
		36
	],
	"../pages/player-medical-records/player-medical-records.module": [
		818,
		35
	],
	"../pages/player-question/player-question.module": [
		819,
		34
	],
	"../pages/player-scanner-attendance/player-scanner-attendance.module": [
		820,
		33
	],
	"../pages/players-dashboard/players-dashboard.module": [
		823,
		98
	],
	"../pages/pregame-rollcall/pregame-rollcall.module": [
		821,
		32
	],
	"../pages/rated-perceived/rated-perceived.module": [
		822,
		31
	],
	"../pages/read-only-timesheet/read-only-timesheet.module": [
		824,
		30
	],
	"../pages/reviewer-timesheet/reviewer-timesheet.module": [
		825,
		29
	],
	"../pages/rollcall-logs/rollcall-logs.module": [
		826,
		28
	],
	"../pages/rollcalls-players/rollcalls-players.module": [
		827,
		27
	],
	"../pages/rollcalls/rollcalls.module": [
		828,
		26
	],
	"../pages/scanning/scanning.module": [
		829,
		25
	],
	"../pages/set-home-image/set-home-image.module": [
		831,
		24
	],
	"../pages/set-to-go/set-to-go.module": [
		830,
		23
	],
	"../pages/settings-home-images/settings-home-images.module": [
		832,
		22
	],
	"../pages/settings-profile-edit/settings-profile-edit.module": [
		834,
		21
	],
	"../pages/settings-profile-statistics/settings-profile-statistics.module": [
		833,
		20
	],
	"../pages/settings/settings.module": [
		835,
		97
	],
	"../pages/severity-details-modal/severity-details-modal.module": [
		836,
		19
	],
	"../pages/signup/signup.module": [
		839,
		18
	],
	"../pages/sms-modal/sms-modal.module": [
		838,
		17
	],
	"../pages/startgame-dashboard/startgame-dashboard.module": [
		840,
		16
	],
	"../pages/survey/survey.module": [
		841,
		15
	],
	"../pages/tabs/tabs.module": [
		291
	],
	"../pages/team-list/team-list.module": [
		842,
		14
	],
	"../pages/timesheet-adhoc/timesheet-adhoc.module": [
		843,
		13
	],
	"../pages/timesheet-dashboard/timesheet-dashboard.module": [
		844,
		12
	],
	"../pages/timesheet/timesheet.module": [
		846,
		11
	],
	"../pages/track-member/track-member.module": [
		845,
		10
	],
	"../pages/transport-add-staff/transport-add-staff.module": [
		847,
		9
	],
	"../pages/transport-dashboard/transport-dashboard.module": [
		848,
		8
	],
	"../pages/transport-list/transport-list.module": [
		849,
		7
	],
	"../pages/transport-remove-modal/transport-remove-modal.module": [
		851,
		6
	],
	"../pages/transport-staff-passenger/transport-staff-passenger.module": [
		850,
		5
	],
	"../pages/vehicle-details/vehicle-details.module": [
		852,
		4
	],
	"../pages/vehicle-list/vehicle-list.module": [
		853,
		3
	],
	"../pages/vehicle/vehicle.module": [
		856,
		2
	],
	"../pages/vote-for-player/vote-for-player.module": [
		854,
		1
	],
	"../pages/welcome/welcome.module": [
		855,
		96
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 274;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertDashboardPageModule", function() { return AlertDashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_dashboard__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_scrolling_header__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AlertDashboardPageModule = /** @class */ (function () {
    function AlertDashboardPageModule() {
    }
    AlertDashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__alert_dashboard__["a" /* AlertDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__alert_dashboard__["a" /* AlertDashboardPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_scrolling_header__["a" /* ScrollingHeaderModule */]
            ],
        })
    ], AlertDashboardPageModule);
    return AlertDashboardPageModule;
}());

//# sourceMappingURL=alert-dashboard.module.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatDashboardPageModule", function() { return ChatDashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_dashboard__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatDashboardPageModule = /** @class */ (function () {
    function ChatDashboardPageModule() {
    }
    ChatDashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat_dashboard__["a" /* ChatDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat_dashboard__["a" /* ChatDashboardPage */]),
            ],
        })
    ], ChatDashboardPageModule);
    return ChatDashboardPageModule;
}());

//# sourceMappingURL=chat-dashboard.module.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetStartedPageModule", function() { return GetStartedPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__get_started__ = __webpack_require__(729);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GetStartedPageModule = /** @class */ (function () {
    function GetStartedPageModule() {
    }
    GetStartedPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__get_started__["a" /* GetStartedPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__get_started__["a" /* GetStartedPage */]),
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__get_started__["a" /* GetStartedPage */])
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__get_started__["a" /* GetStartedPage */]
            ]
        })
    ], GetStartedPageModule);
    return GetStartedPageModule;
}());

//# sourceMappingURL=get-started.module.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_swipe_all__ = __webpack_require__(338);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var TabsPageModule = /** @class */ (function () {
    function TabsPageModule() {
    }
    TabsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
            // TabsPage,
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* TabsPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_swipe_all__["a" /* IonicSwipeAllModule */]
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());

//# sourceMappingURL=tabs.module.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipes_pipes__ = __webpack_require__(733);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pipes_pipes__["a" /* PipesPipe */], __WEBPACK_IMPORTED_MODULE_1__pipes_pipes__["b" /* SafeStylePipe */], __WEBPACK_IMPORTED_MODULE_1__pipes_pipes__["c" /* bloodGroupPipe */], __WEBPACK_IMPORTED_MODULE_1__pipes_pipes__["d" /* swimmingAbilityPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pipes_pipes__["a" /* PipesPipe */], __WEBPACK_IMPORTED_MODULE_1__pipes_pipes__["b" /* SafeStylePipe */], __WEBPACK_IMPORTED_MODULE_1__pipes_pipes__["c" /* bloodGroupPipe */], __WEBPACK_IMPORTED_MODULE_1__pipes_pipes__["d" /* swimmingAbilityPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventAttendancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_calendar_ngx__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_vibration_ngx__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Generated class for the EventAttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventAttendancePage = /** @class */ (function () {
    function EventAttendancePage(navCtrl, navParams, http, toastCtrl, loadingCtrl, storage, events, keyboard, global, modalCtrl, app, launchNavigator, logger, plt, gFn, calendar, Alert, vibration, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.events = events;
        this.keyboard = keyboard;
        this.global = global;
        this.modalCtrl = modalCtrl;
        this.app = app;
        this.launchNavigator = launchNavigator;
        this.logger = logger;
        this.plt = plt;
        this.gFn = gFn;
        this.calendar = calendar;
        this.Alert = Alert;
        this.vibration = vibration;
        this.global_api = global_api;
        this.eventAttend = [];
        this.DupeventAttendLen = [];
        this.DupeventAttendsec = [];
        this.DupEventAttendSecBorrowed = [];
        this.combinedPlayersArray = [];
        this.combinedBorrowedPlayersArray = [];
        this.percentArray = [];
        this.Arrowflag = false;
        this.AttendyPersonId = '';
        this.arrDetail = [];
        this.GoingColor = '#68E048';
        this.MaybeColor = '#2BBFF0';
        this.NotGoingColor = '#D80000';
        this.NoResponseColor = '#F59044';
        this.AttdnColor = '#fff';
        this.reason_options_list = [];
        this.Attendance = false;
        this.filterState = 0;
        this.filterButton = '';
        this.BorrowTagFlag = 0;
        this.BackButton = false;
        this.SymbolAlert = false;
        this.groundAdress = '';
        this.groundState = '';
        this.latitude = '';
        this.longitude = '';
        this.homeAwayText = '';
        this.isParent = false;
        this.showEvent = false;
        this.AutoSegments = {};
        this.ShowSeverityPage = false;
        this.medicalInfo = false;
        //Result
        this.players = [];
        this.reportTextRowOpened = false;
        this.scoreHome = "0";
        this.scoreAway = "0";
        this.gameDismissed = "";
        this.reportText = "";
        this.vote1 = '';
        this.vote2 = '';
        this.vote3 = '';
        this.activePlayer = '';
        this.voteSuccess = false;
        this.voteForPlayerId = '';
        this.coachDetails = [];
        this.EmptyBorrowPlayer = false;
        this.scoreIsUpdated = 0;
        this.isLoaded = false;
        this.isOffline = false;
        this.playerDetails = [];
        this.attendanceReason = '';
        this.gFn.showMenuIcon();
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').toggle()
        // $('.tabs .tab-button[aria-selected=true]:nth-child(4) .tab-button-icon').css({'mask-image': '',
        // 'height': '',
        // 'color': '#dedede'})
        this.loadDefaultData();
        plt.registerBackButtonAction(function () {
            _this.backArrow();
        });
    }
    EventAttendancePage.prototype.loadDefaultData = function () {
        var _this = this;
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
            _this.storage.get('loggedInUserData').then(function (val) {
                _this.PersonData = val;
                _this.coachDetails[0] = val;
                _this.person_id = _this.PersonData.PERSON_ID;
                console.log(_this.FunctionAccess);
                _this.storage.get('filterChild').then(function (val) {
                    if (val != null && val.length) {
                        _this.person_id = val[0];
                    }
                    if (_this.navParams.get('EventDetails_eventId')) {
                        _this.UpcomingSingleEvent = _this.navParams.get('EventDetails_eventId');
                        if (_this.navParams.get('deeplink')) {
                            _this.UpcomingSingleEvent = JSON.parse(_this.UpcomingSingleEvent);
                        }
                        _this.storage.set('UpcomingSingleEvent', JSON.stringify(_this.UpcomingSingleEvent));
                        _this.event_id = _this.UpcomingSingleEvent.event_id;
                        if (_this.FunctionAccess.event_Welfare == 'yes' && _this.UpcomingSingleEvent.welfare_question == 1) {
                            $('.top_tab').find('.Welfare_tab').css('display', 'inherit');
                            _this.ShowWelfare = true;
                        }
                        if ((_this.FunctionAccess.event_Result == 'yes' || _this.FunctionAccess.voting_for_player != 'no') && _this.UpcomingSingleEvent.event_type_id != 2) {
                            $('.top_tab').find('.Result_tab').css('display', 'inherit');
                            _this.ShowResult = true;
                        }
                        var active_tab = _this.navParams.get('ActiveTab') ? _this.navParams.get('ActiveTab') : 'Attendance';
                        _this.segments = active_tab;
                        _this.AutoSegments = { value: _this.segments };
                        _this.segmentChanged(_this.AutoSegments);
                    }
                    else {
                        _this.storage.get('UpcomingSingleEvent').then(function (val) {
                            _this.UpcomingSingleEvent = JSON.parse(val);
                            _this.event_id = _this.UpcomingSingleEvent.event_id;
                            if (_this.FunctionAccess.event_Welfare == 'yes' && _this.UpcomingSingleEvent.welfare_question == 1) {
                                $('.top_tab').find('.Welfare_tab').css('display', 'inherit');
                                _this.ShowWelfare = true;
                            }
                            if ((_this.FunctionAccess.event_Result == 'yes' || _this.FunctionAccess.voting_for_player != 'no') && _this.UpcomingSingleEvent.event_type_id != 2) {
                                $('.top_tab').find('.Result_tab').css('display', 'inherit');
                                _this.ShowResult = true;
                            }
                            var active_tab = _this.navParams.get('ActiveTab') ? _this.navParams.get('ActiveTab') : 'Attendance';
                            _this.segments = active_tab;
                            _this.AutoSegments = { value: _this.segments };
                            _this.segmentChanged(_this.AutoSegments);
                        });
                    }
                });
            });
        });
    };
    EventAttendancePage.prototype.segmentChanged = function (event) {
        var _this = this;
        this.isOffline = false;
        this.getAttendingDetails();
        this.getEventDetails().then(function (x) {
            if (x) {
                _this.isLoaded = true;
            }
            else {
                _this.isOffline = true;
            }
        });
    };
    EventAttendancePage.prototype.highlightMenuIcon = function () {
        // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
        /* $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true')
        $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
          'mask-image': 'url(../assets/images/menu/home.svg)',
          'height': '22px',
          'color': '#dedede'
        }) */
        // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
        // 'height': '36px',
        // 'color': '#43B7CC'})
    };
    EventAttendancePage.prototype.unhighlightMenuIcon = function () {
        if (!this.showEvent) {
            /* console.log(';ll')
            // this.navCtrl.pop()
            $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
              'mask-image': '',
              'height': '',
              'color': ''
            })
            // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': '',
            // 'height': '',
            // 'color': ''})
            $('.tab-button-icon').closest('.tabs .tab-button[aria-selected=true]:nth-child(1) .activated').css({
              'mask-image': '',
              'height': '',
              'color': ''
            })
            $('.tabs .tab-button[aria-selected=true]:nth-child(2)').attr('aria-selected', 'false') */
        }
    };
    EventAttendancePage.prototype.ionViewDidEnter = function () {
        this.highlightMenuIcon();
    };
    EventAttendancePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.highlightMenuIcon();
        this.storage.get('BackButton').then(function (val) {
            _this.BackButton = val;
        });
    };
    EventAttendancePage.prototype.ionViewWillLeave = function () {
        this.unhighlightMenuIcon();
    };
    EventAttendancePage.prototype.getAttendingDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('client_id', _this.UpcomingSingleEvent.client_id)
                .set('person_id', _this.person_id)
                .set('first_name', _this.PersonData.FIRST_NAME)
                .set('last_name', _this.PersonData.LAST_NAME)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM);
            _this.http.post(_this.global.APIURL + "players/getPlayerAttending", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.playerDetails = data.GETPLAYERATTENDING;
                _this.reason_options_list.push(data.GETPLAYERATTENDING[0].reason_options_list);
                console.log("getAttendingDetails.reason_options_list", _this.playerDetails);
                console.log("getAttendingDetails.reason_options_list[0]", _this.reason_options_list[0]);
                setTimeout(function () {
                    if ($('.attendence:checked').length) {
                        _this.attendanceReason = $('.attendence:checked').val();
                    }
                }, 1000);
                resolve(true);
            }, function (error) {
            });
        });
    };
    EventAttendancePage.prototype.gotoResults = function () {
        this.gFn.gotoResults();
        this.showEvent = true;
    };
    EventAttendancePage.prototype.gotoWelfare = function () {
        this.gFn.gotoWelfare();
        this.showEvent = true;
    };
    EventAttendancePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    EventAttendancePage.prototype.getEventDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('event_id', _this.UpcomingSingleEvent.event_id)
                .set('event_type_id', _this.UpcomingSingleEvent.event_type_id)
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('client_id', _this.UpcomingSingleEvent.client_id);
            _this.http.post(_this.global.APIURL + "events/getEventDetails", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                _this.arrDetail = response.GETEVENTDETAILS;
                _this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                _this.storage.set('EventDetails', _this.arrDetail);
                for (var _i = 0, _a = _this.arrDetail; _i < _a.length; _i++) {
                    var keys = _a[_i];
                    _this.key = keys;
                    _this.date = _this.key.date.split('/')[0];
                    _this.groundAdress = _this.key.ground_address;
                    _this.groundState = _this.key.ground_state;
                    _this.longitude = _this.key.geoloc_longitude;
                    _this.latitude = _this.key.geoloc_latitude;
                }
                if (response.GETEVENTDETAILS.length > 0) {
                    _this.scoreIsUpdated = response.GETEVENTDETAILS[0]["isUpdated"];
                    _this.reportText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? response.GETEVENTDETAILS[0]["report_home"] : response.GETEVENTDETAILS[0]["report_away"];
                    _this.homeAwayText = (response.GETEVENTDETAILS[0]["ishometeam"]) ? 'Home' : 'Away';
                    if (response.GETEVENTDETAILS[0]["washout"] == "1") {
                        _this.gameDismissed = "washout";
                        $(".radio-game-dismissed").each(function () {
                            if ($(this).val() == "washout")
                                $(this).attr("checked", "checked");
                            $('.radio').find('.Washout').addClass('HighLight');
                        });
                    }
                    else if (response.GETEVENTDETAILS[0]["forfeit"] == "1") {
                        _this.gameDismissed = "forfeit";
                        $(".radio-game-dismissed").each(function () {
                            if ($(this).val() == "forfeit")
                                $(this).attr("checked", "checked");
                            $('.radio').find('.forfeit').addClass('HighLight');
                        });
                    }
                    else {
                        _this.gameDismissed = "";
                    }
                }
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    EventAttendancePage.prototype.SinglePlayersAttdStates = function (confirm, attended, reason, AttendyPersonId, event) {
        var _this = this;
        if ((this.FunctionAccess.user_adminLevel == 4)) {
            event.preventDefault();
            return;
        }
        if (this.PersonData.ISPARENT && confirm == 'N' && this.PersonData.PERSON_ID != AttendyPersonId && this.attendanceReason.length && $(event.target).val() != this.attendanceReason) {
            this.gotoConfirmAttendance();
            return;
        }
        var reasondeclined = '';
        var reasondeclined_by_coach = '';
        var unsetAttendance = '0';
        if ($(event.target).val() == this.attendanceReason) {
            unsetAttendance = '1';
        }
        if (this.FunctionAccess.user_adminLevel == 4) {
            if (confirm == 'Y') {
                confirm = 'YES';
                attended = 1;
            }
            else if (confirm == 'N') {
                confirm = 'NO';
                attended = 0;
            }
            reasondeclined = reason;
        }
        else if (this.FunctionAccess.user_adminLevel != 4) {
            if (confirm == 'Y') {
                confirm = 'YES';
                attended = 1;
            }
            else if (confirm == 'N') {
                confirm = 'NO';
                attended = 0;
            }
            reasondeclined_by_coach = reason;
        }
        /* let loader = this.loadingCtrl.create({});
        loader.present(); */
        var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.UpcomingSingleEvent.event_id)
            .set('personId', AttendyPersonId)
            .set('attended', attended)
            .set('confirmed', confirm)
            .set('reasondeclined', reasondeclined.trim())
            .set('reasondeclined_by_coach', reasondeclined_by_coach.trim())
            .set('unsetAttendance', unsetAttendance)
            .set('state_time', '')
            .set('selectedTeam', this.PersonData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                if (unsetAttendance == '0') {
                    _this.attendanceReason = reason;
                }
                else {
                    _this.attendanceReason = '';
                    $(event.target).prop('checked', false);
                }
                //loader.dismiss();
                if (_this.FunctionAccess.user_adminLevel == 4) {
                    _this.logger.DashboardPlayerReason('PlayerAttendReasonSelect', { pram: Date.now() });
                }
                else if (_this.FunctionAccess.user_adminLevel != 4) {
                    _this.logger.CoachArrowAttd_Mark('CoachArrowAttd_Mark', { pram: Date.now() });
                }
                _this.vibration.vibrate(300);
                // this.navCtrl.push('EventHomeNewPage');
                _this.navCtrl.pop();
                _this.presentToast('Status Updated');
            }
        }, function (error) {
            //loader.dismiss();
        });
    };
    EventAttendancePage.prototype.gotoConfirmAttendance = function () {
        var _this = this;
        var val = this.PersonData;
        val.event_id = this.event_id;
        val.attendInfo = this.playerDetails[0];
        val.attendInfo.person_id = this.playerDetails[0].child_person_id;
        val.attendInfo.parent_id = this.PersonData.PERSON_ID;
        val.attendInfo.attendanceReason = $('.attendence:checked').val();
        var Modal = this.modalCtrl.create('EventAttendanceConfirmPage', { personDetails: JSON.stringify(val) });
        Modal.present();
        //this.navCtrl.pop();
        Modal.onDidDismiss(function (data) {
            if (typeof data != 'undefined') {
                _this.attendanceReason = data;
            }
            if (_this.attendanceReason != '') {
                $('.attendence[value="' + _this.attendanceReason + '"]').prop('checked', true);
            }
            else {
                $('.attendence').prop('checked', false);
            }
        });
    };
    EventAttendancePage.prototype.backArrow = function () {
        if (this.navParams.get('deeplink')) {
            this.app.getRootNav().getActiveChildNav().select(1);
        }
        else {
            this.navCtrl.pop();
        }
    };
    EventAttendancePage.prototype.tryAgain = function () {
        // this.loadDefaultData();
    };
    EventAttendancePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-attendance',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-attendance/event-attendance.html"*/'<!--\n  Generated template for the EventAttendancePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header-md header">\n\n    <ion-navbar class="main toolbar toolbar-md"><div class="toolbar-background toolbar-background-md" ng-reflect-klass="toolbar-background" ng-reflect-ng-class="toolbar-background-md"></div><button class="back-button disable-hover bar-button bar-button-md back-button-md bar-button-default bar-button-default-md" ion-button="bar-button" ng-reflect-klass="back-button" ng-reflect-ng-class="back-button-md"><span class="button-inner"><ion-icon class="back-button-icon icon icon-md back-button-icon-md ion-md-arrow-back" role="img" ng-reflect-klass="back-button-icon" ng-reflect-ng-class="back-button-icon-md" aria-label="arrow back" ng-reflect-name="md-arrow-back"></ion-icon><span class="back-button-text back-button-text-md" ng-reflect-klass="back-button-text" ng-reflect-ng-class="back-button-text-md"></span></span><div class="button-effect"></div></button><div class="toolbar-content toolbar-content-md" ng-reflect-klass="toolbar-content" ng-reflect-ng-class="toolbar-content-md">\n  \n      \n  \n      <div class="top-bar clearfix">\n  \n        <div class="pull-left">\n  \n          <div class="backArrow" (click)="backArrow()"> EVENTS </div>\n  \n      </div>\n  \n        \n  \n      </div>\n  \n    </div></ion-navbar>\n  \n    \n  \n  </ion-header>\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>event-attendance</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content class="bg-black">\n  <!-- Loading skeleton -->\n  <div class="skeleton" *ngIf="!isLoaded && !isOffline">\n      <div class="img-card">\n          <span class="img-text animate"></span>\n      </div>\n      <div class="top-info text-center">\n          <h3 class="text-center animate">&nbsp;</h3>\n          <div class="ruller animate">&nbsp;</div>\n          <h4 class="text-center animate">&nbsp;</h4>\n          <p class="text-center animate">&nbsp;</p>\n          <!-- <h5 class="text-center">&nbsp;</h5> -->\n          <div class="ruller">&nbsp;</div>\n      </div>\n      <div class="radio-option">\n          <div class="row">\n              <div class="col-xs-5 list-item p-0">\n                <p class="animate">&nbsp;</p>\n              </div>\n              <div class="col-xs-2 text-center  p-0">\n                  <div class="radio clearfix">\n                        <span class="xs-circle animate"></span>\n                  </div>\n              </div>\n              <div class="col-xs-5 attending_aria_left p-0"><p></p></div>\n          </div>\n          <div class="row">\n              <div class="col-xs-5 list-item p-0">\n                <p class="animate">&nbsp;</p>\n              </div>\n              <div class="col-xs-2 text-center  p-0">\n                  <div class="radio clearfix">\n                        <span class="xs-circle animate"></span>\n                  </div>\n              </div>\n              <div class="col-xs-5 attending_aria_left p-0"><p></p></div>\n          </div>\n          <div class="row">\n              <div class="col-xs-5 list-item p-0">\n                <p class="animate">&nbsp;</p>\n              </div>\n              <div class="col-xs-2 text-center  p-0">\n                  <div class="radio clearfix">\n                        <span class="xs-circle animate"></span>\n                  </div>\n              </div>\n              <div class="col-xs-5 p-0"></div>\n          </div>\n          <div class="row">\n              <div class="col-xs-5 p-0"></div>\n              <div class="col-xs-2 text-center p-0">\n                  <div class="radio clearfix">\n                        <span class="xs-circle animate"></span>\n                  </div>\n              </div>\n              <div class="col-xs-5 list-item p-0">\n                <p class="animate">&nbsp;</p>\n              </div>\n          </div>\n          <div class="row">\n              <div class="col-xs-5 p-0"></div>\n              <div class="col-xs-2 text-center p-0">\n                  <div class="radio clearfix">\n                        <span class="xs-circle animate"></span>\n                  </div>\n              </div>\n              <div class="col-xs-5 list-item p-0">\n                <p class="animate">&nbsp;</p>\n              </div>\n          </div>\n          <div class="row">\n              <div class="col-xs-5 p-0"></div>\n              <div class="col-xs-2 text-center p-0">\n                  <div class="radio clearfix">\n                        <span class="xs-circle animate"></span>\n                  </div>\n              </div>\n              <div class="col-xs-5 list-item p-0">\n                <p class="animate">&nbsp;</p>\n              </div>\n          </div>\n      </div>\n  </div>\n \n  <!-- Loading skeleton End-->\n  <div class="body_aria" *ngIf="isLoaded && !isOffline">\n    <div *ngFor="let player of playerDetails">\n      <div class="card-img">\n        <span *ngIf="!player.photoPath">\n          <div class="img-circle"><span class="img-text">{{player.first_name[0] | uppercase}} {{player.last_name[0] | uppercase}} </span></div>          \n        </span>\n        <span *ngIf="player.photoPath">\n          <img src="{{global.PROFILEIMAGEURL}}{{player.photoPath}}" alt="" class="img-circle" onerror="this.src=\'assets/images/test-user.svg\'">\n        </span>\n      </div>\n      <div *ngFor="let detail of arrDetail">\n        <h3 class="text-center">ATTENDANCE</h3>\n        <div class="ruller"></div>\n        <h4 class="text-center inverseText" *ngIf="detail.event_type_id==1">{{detail.hometeamname}} vs {{detail.awayteamname}}</h4>\n        <h4 class="text-center inverseText" *ngIf="detail.event_type_id==2">{{detail.name}}</h4>\n        <p class="venu" *ngIf="detail.ground_name">{{detail.ground_name}}</p>\n        <p class="venu" *ngIf="detail.ground_address && detail.ground_state">{{detail.ground_address}}, {{detail.ground_state}}</p>\n        <p class="venu_time">{{detail.date_started | date: \'MMM d\'}} AT {{detail.time_started}}</p>\n        <div class="ruller"></div>\n      </div>\n\n      <div class="radio_aria">\n        <div class="row" *ngFor="let key of reason_options_list[0]">\n          <div class="col-xs-5 attending_aria_right p-0"><p *ngIf="key.confirm_reason == \'Y\'">{{key.reason_display}}</p></div>\n          <div class="col-xs-2 text-center">\n            <div class="radio clearfix" [class.absent]="key.confirm_reason == \'N\'">\n              <input \n                type="radio" \n                class="attendence"  \n                name="attendence" \n                [value]="key.reason_display.trim()"\n                [checked]="key.reason.trim() === player.reasondeclined.trim() || key.reason_display.trim() === player.reasondeclined.trim() ? true : false"  \n                (click)="SinglePlayersAttdStates(key.confirm_reason,\'\',key.reason_display,player.child_person_id,$event)"  \n              />\n              <label class=""></label>\n            </div>\n          </div>\n          <div class="col-xs-5 attending_aria_left p-0"><p *ngIf="key.confirm_reason == \'N\'">{{key.reason_display }}</p></div>\n        </div>\n        <!-- <div class="row">\n          <div class="col-xs-5 attending_aria_right p-0"><p>Yes,5mint late</p></div>\n          <div class="col-xs-2 text-center">\n              <div class="radio clearfix">\n                  <input type="radio" value="" name="">\n                  <label class=""></label>\n            </div>\n          </div>\n          <div class="col-xs-5 attending_aria_left p-0"><p></p></div>\n        </div>\n        <div class="row">\n          <div class="col-xs-5 attending_aria_right p-0"><p>Yes, ingured</p></div>\n          <div class="col-xs-2 text-center">\n              <div class="radio clearfix">\n                  <input type="radio" value="" name="">\n                  <label class=""></label>\n            </div>\n          </div>\n          <div class="col-xs-5 attending_aria_left p-0"><p></p></div>\n        </div> -->\n      </div>\n\n      <!-- <div class="radio_aria">\n          <div class="row">\n            <div class="col-xs-5 attending_aria_right p-0"><p></p></div>\n            <div class="col-xs-2 text-center">\n                <div class="radio clearfix">\n                    <input type="radio" value="" name="">\n                    <label class=""></label>\n              </div>\n            </div>\n            <div class="col-xs-5 attending_aria_left p-0"><p>Not my usual</p></div>\n          </div>\n          <div class="row">\n              <div class="col-xs-5 attending_aria_right p-0"><p></p></div>\n              <div class="col-xs-2 text-center">\n                  <div class="radio absent clearfix">\n                      <input type="radio" value="" name="">\n                      <label class=""></label>\n                </div>\n              </div>\n              <div class="col-xs-5 attending_aria_left p-0"><p>No,sick</p></div>\n            </div>\n        </div> -->\n    </div>\n  </div>\n\n  <!-- Offline -->\n  <div class="background_blue" *ngIf="isOffline">\n    <div class="off-wrap">\n      <p><img src="assets/images/events-new-icon/offline-logo.svg" class=""></p>\n      <h3>OFFLINE</h3>\n      <p>Your network is unavalaible, please check your data or connection</p>\n      <button type="button" class="btn btn-sm-black try-again" (click)="tryAgain()">TRY AGAIN</button>\n    </div>  \n  </div>\n\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-attendance/event-attendance.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__["a" /* EventLoggerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_calendar_ngx__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_vibration_ngx__["a" /* Vibration */], __WEBPACK_IMPORTED_MODULE_11__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventAttendancePage);
    return EventAttendancePage;
}());

//# sourceMappingURL=event-attendance.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalFunctionsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_choose_team_profile_choose_team_profile__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard_ngx__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GlobalFunctionsProvider = /** @class */ (function () {
    function GlobalFunctionsProvider(http, app, toastCtrl, alert, modalCtrl, statusBar) {
        this.http = http;
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.alert = alert;
        this.modalCtrl = modalCtrl;
        this.statusBar = statusBar;
        //this.hideFormAccessoryBar();
    }
    GlobalFunctionsProvider.prototype.hideMenuIcon = function () {
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    GlobalFunctionsProvider.prototype.showMenuIcon = function () {
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = '';
            });
        }
    };
    GlobalFunctionsProvider.prototype.gotoAttandance = function () {
        // 	this.navCtrl.push(EventDashboardPage)
        this.app.getActiveNav().push('EventDashboardPage');
    };
    GlobalFunctionsProvider.prototype.gotoResults = function () {
        this.app.getActiveNav().push('EventsResultsPage');
    };
    GlobalFunctionsProvider.prototype.gotoWelfare = function () {
        this.app.getActiveNav().push('EventWelfarePage');
    };
    GlobalFunctionsProvider.prototype.gotoDisplayEvents = function () {
        //   this.navCtrl.push('DisplayEventsPage')
        this.app.getActiveNav().push('DisplayEventsPage');
    };
    GlobalFunctionsProvider.prototype.gotoHome = function () {
        this.checkPageRedirect = false;
        this.app.getRootNav().getActiveChildNav().select(0);
        // this.app.getRootNavs()[0].setRoot(HomePage);
    };
    // this.app.getActiveNav().push(EventHomePage);
    //   this.navCtrl.push(EventHomePage)
    GlobalFunctionsProvider.prototype.goToPlayersDashboard = function () {
        //   this.navCtrl.push(PlayersDashboardPage);
        this.app.getActiveNav().push('PlayersDashboardPage');
    };
    GlobalFunctionsProvider.prototype.goToChatDashboard = function () {
        //   this.navCtrl.push('ChatDashboardPage');
        this.app.getActiveNav().push('ChatDashboardPage');
    };
    GlobalFunctionsProvider.prototype.goToMenuPage = function () {
        //  this.navCtrl.push(SettingsPage, this.navParams.data);
        this.app.getActiveNav().push('SettingsPage');
    };
    GlobalFunctionsProvider.prototype.goToPlayerGrading = function () {
        //   this.navCtrl.push('PlayerGradingPage');
        this.app.getActiveNav().push('PlayerGradingPage');
    };
    GlobalFunctionsProvider.prototype.goToPlayerAddForGrading = function () {
        //   this.navCtrl.push('PlayerAddForGradingPage');
        this.app.getActiveNav().push('PlayerAddForGradingPage');
    };
    GlobalFunctionsProvider.prototype.goToPlayerGroupMessage = function () {
        //   this.navCtrl.push('PlayerGroupMessagePage');
        this.app.getActiveNav().push('PlayerGroupMessagePage');
    };
    GlobalFunctionsProvider.prototype.goToChooseTeamsPage = function () {
        console.log("goToChooseTeamsPage function");
        this.checkPageRedirect = false;
        //   this.navCtrl.push('ChooseTeamProfilePage');
        this.app.getActiveNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_choose_team_profile_choose_team_profile__["a" /* ChooseTeamProfilePage */]);
    };
    GlobalFunctionsProvider.prototype.goToSurvey = function (surveyId, eventId, clientId, clubDivisionId, personId) {
        this.checkPageRedirect = false;
        this.app.getActiveNav().push('SurveyPage', { surveyId: surveyId, eventId: eventId, clientId: clientId, clubDivisionId: clubDivisionId, personId: personId });
    };
    GlobalFunctionsProvider.prototype.presentToast = function (msg, cssClass) {
        if (cssClass === void 0) { cssClass = ""; }
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top',
            cssClass: cssClass
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    GlobalFunctionsProvider.prototype.hideFormAccessoryBar = function (hide) {
        if (hide === void 0) { hide = false; }
        var keyboard = new __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard_ngx__["a" /* Keyboard */]();
        keyboard.hideFormAccessoryBar(hide);
    };
    GlobalFunctionsProvider.prototype.presentAlert = function (Title, SubTitle, cssClass) {
        if (cssClass === void 0) { cssClass = ''; }
        var alert = this.alert.create({
            title: Title,
            subTitle: SubTitle,
            cssClass: cssClass,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    GlobalFunctionsProvider.prototype.MedicineInformation = function (data) {
        var MedicineInfo = this.modalCtrl.create('MedicineInfoPage', { values: data });
        MedicineInfo.present();
    };
    GlobalFunctionsProvider.prototype.statusbarWhite = function () {
        /* this.statusBar.backgroundColorByHexString('#fff');
        this.statusBar.styleDefault(); */
    };
    GlobalFunctionsProvider.prototype.statusbarBlack = function () {
        /* this.statusBar.backgroundColorByHexString('#000');
        this.statusBar.styleLightContent(); */
    };
    GlobalFunctionsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__["a" /* StatusBar */]])
    ], GlobalFunctionsProvider);
    return GlobalFunctionsProvider;
}());

//# sourceMappingURL=global-functions.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseTeamProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar_ngx__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__event_home_event_home__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard_ngx__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ChooseTeamProfilePage = /** @class */ (function () {
    function ChooseTeamProfilePage(navCtrl, navParams, formBuilder, http, storage, events, loadingCtrl, global, statusBar, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.statusBar = statusBar;
        this.global_api = global_api;
        this.teams = [];
        this.bgThemeColor = '';
        this.clients = [];
        this.seasons = [];
        this.divisions = [];
        this.seasonNamesSchool = ['NA', 'Term 4', 'Term 1', 'Term 2', 'Term 3'];
        this.seasonNamesNonSchool = ['NA', 'Summer', 'Autumn', 'Winter', 'Spring'];
        this.siblings = [];
        this.lblSeason = "Season";
        this.SSODetails = {};
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.selectTeam = val.SELECTEDTEAM;
            _this.teamName = val.TEAM_NAME;
            _this.client_id = val.CLIENT_ID;
            _this.season_id = val.SEASON_ID;
            _this.IsParent = val.ISPARENT == 1;
            _this.IsPlayer = val.HAS_RECORD_IN_PLAYERHISTORY;
            _this.siblings = val.siblings;
            _this.loggedInUserPersonId = val.LOGGEDIN_USER_PERSON_ID;
            _this.backgroundThemeColor();
            var keyboard = new __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard_ngx__["a" /* Keyboard */]();
            keyboard.hideFormAccessoryBar(false);
        });
        this.chooseTeamFormProfile = this.formBuilder.group({
            default: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]()
        });
        this.lastPageName = this.navCtrl.last().name;
        setTimeout(function () {
            if (_this.IsParent) {
                _this.changePerson($("#person").val());
            }
            else {
                _this.getClients(_this.loggedInUserData.PERSON_ID, '0');
            }
        }, 1000);
    }
    ChooseTeamProfilePage.prototype.ionViewDidLoad = function () {
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    ChooseTeamProfilePage.prototype.ionViewDidLeave = function () {
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = '';
            });
        }
        this.statusBar.show();
    };
    ChooseTeamProfilePage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "green":
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
            default:
                this.bgThemeColor = "blue";
                break;
        }
    };
    ChooseTeamProfilePage.prototype.goToChooseTeam = function (teamIdName) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var teamValue = teamIdName;
        teamValue = teamValue.toString().split('::');
        this.storage.get('SSODetails').then(function (val) {
            _this.SSODetails = val;
            console.log(_this.SSODetails);
            _this.getFunctionAccess(teamValue[0]);
        });
        //this.getFunctionAccess(teamValue[0])
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('team_person_id', this.loggedInUserData.PERSON_ID)
            .set('club_division_id', teamValue[0])
            .set('team_name', teamValue[1])
            .set('client_id', this.client_id);
        this.http.post(this.global.APIURL + 'teams/setActivatedTeamForHome', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS && response.SETACTIVATEDTEAMFORHOME) {
                var setActivatedTeam = _this.events.publish('json:query', response.SETACTIVATEDTEAMFORHOME)[0][0];
                _this.storage.set('setActivatedTeam', JSON.stringify(setActivatedTeam));
                _this.selectTeam = teamValue[0];
                _this.loggedInUserData['SELECTEDTEAM'] = teamValue[0];
                _this.loggedInUserData['CLUB_DIVISION_ID'] = teamValue[0];
                _this.loggedInUserData['SEASON_ID'] = _this.season_id;
                _this.loggedInUserData['CLIENT_ID'] = _this.client_id;
                _this.loggedInUserData['TIMESHEETREVIEWER'] = (setActivatedTeam && _this.SSODetails.SHOWTIMESHEETMENU == 1) ? setActivatedTeam.TIMESHEETREVIEWER : false;
                _this.loggedInUserData['ISCONTRACTOR'] = (setActivatedTeam && _this.SSODetails.SHOWTIMESHEETMENU == 1) ? setActivatedTeam.ISCONTRACTOR : false;
                _this.storage.set('loggedInUserData', _this.loggedInUserData);
                _this.storage.get('loggedInUserData').then(function (val) {
                    _this.loggedInUserData = val;
                });
                _this.getNextEventDetails();
            }
            else {
                alert('Error');
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    ChooseTeamProfilePage.prototype.goToChooseHomeImage = function () {
        this.navCtrl.push('SettingsHomeImagesPage');
    };
    ChooseTeamProfilePage.prototype.goBack = function () {
        var _this = this;
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__tabs_tabs__["a" /* TabsPage */], this.navParams.data).then(function () {
            _this.statusBar.show();
        });
    };
    ChooseTeamProfilePage.prototype.gotoHome = function (teamIdName) {
        var _this = this;
        var teamValue = teamIdName;
        teamValue = teamValue.toString().split('::');
        this.storage.get('SSODetails').then(function (val) {
            _this.SSODetails = val;
            console.log(_this.SSODetails);
            _this.getFunctionAccess(teamValue[0]);
        });
        //this.getFunctionAccess(teamValue[0])
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__event_home_event_home__["a" /* EventHomePage */], this.navParams.data).then(function () {
            _this.statusBar.show();
        });
    };
    ChooseTeamProfilePage.prototype.gotoHomeWithNoTeam = function () {
        var _this = this;
        this.loggedInUserData['SELECTEDTEAM'] = 0;
        this.loggedInUserData['SEASON_ID'] = 0;
        this.loggedInUserData['TEAM_ID'] = 0;
        this.loggedInUserData['TEAM_NAME'] = "";
        this.storage.set('loggedInUserData', this.loggedInUserData);
        var setActivatedTeam = { CLIENT_NAME: $('#client option:selected').text() };
        this.storage.set('setActivatedTeam', JSON.stringify(setActivatedTeam));
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__event_home_event_home__["a" /* EventHomePage */], this.navParams.data).then(function () {
            _this.statusBar.show();
        });
    };
    ChooseTeamProfilePage.prototype.getTeams = function (client_id, season_id, selectedTeam, divisionID) {
        var _this = this;
        this.teams = [];
        this.divisions = [];
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('client_id', client_id)
            .set('season_id', season_id)
            .set('selectedTeam', selectedTeam)
            .set('divisionID', divisionID);
        this.http.post(this.global.APIURL + 'teams/getTeamsByClientSeason', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                var teams = response.GETTEAMSBYCLIENTSEASON;
                var divisions = response.GETTEAMSBYDIVISION;
                for (var key in divisions) {
                    _this.divisions.push(divisions[key]);
                }
                _this.defaultSelected = false;
                for (var key in teams) {
                    _this.teams.push(teams[key]);
                    if (!_this.defaultSelected && _this.selectTeam == teams[key].club_division_id) {
                        _this.defaultSelected = true;
                    }
                }
                if (_this.defaultSelected) {
                    _this.chooseTeamFormProfile = _this.formBuilder.group({
                        team: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.loggedInUserData.SELECTEDTEAM + '::' + _this.loggedInUserData.TEAM_NAME, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required)
                    });
                }
                else if (teams.length) {
                    _this.chooseTeamFormProfile = _this.formBuilder.group({
                        team: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](teams[0].club_division_id + '::' + teams[0].team_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required)
                    });
                }
            }
            else {
                alert('Sorry no matching result found');
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    ChooseTeamProfilePage.prototype.getClients = function (person_id, client_id) {
        var _this = this;
        this.clients = [];
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', person_id)
            .set('client_id', client_id);
        this.http.post(this.global.APIURL + 'teams/getClientsByPerson', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.SUCCESS) {
                var clients = response.GETCLIENTSBYPERSON;
                for (var key in clients) {
                    _this.clients.push(clients[key]);
                }
                if (_this.IsParent && client_id == 0 && clients.length > 0) {
                    _this.client_id = clients[0].client_id;
                }
                _this.getSeasons((client_id == 0) ? _this.client_id : client_id, null, (client_id == 0) ? true : false);
            }
        }, function (error) {
        });
    };
    ChooseTeamProfilePage.prototype.getSeasons = function (client_id, season_id, isFirst) {
        var _this = this;
        season_id = season_id || this.loggedInUserData.SEASON_ID;
        this.fixSeasonsNames(client_id);
        this.seasons = [];
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('season_id', season_id)
            .set('client_id', client_id)
            .set('clientsport', this.loggedInUserData.CLIENTSPORT)
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('selectedTeam', this.selectTeam);
        this.http.post(this.global.APIURL + 'teams/getSeasonsByClient', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.SUCCESS) {
                var seasons = response.GETSEASONSBYCLIENT;
                var currentseason = seasons.filter(function (value, index) { return value.currentseason == 1; });
                var season_id_1 = (currentseason.length) ? currentseason[0].season_id : seasons[seasons.length - 1].season_id;
                _this.season_id = (isFirst && !_this.IsParent) ? _this.loggedInUserData.SEASON_ID : season_id_1;
                _this.getTeams(client_id, _this.season_id, _this.selectTeam, 0);
                for (var key in seasons) {
                    if (seasons[key].season_id != 0) {
                        _this.seasons.push(seasons[key]);
                    }
                }
            }
        }, function (error) {
        });
    };
    ChooseTeamProfilePage.prototype.changePerson = function (person_id) {
        this.loggedInUserData.PERSON_ID = person_id;
        if (person_id == this.loggedInUserPersonId) {
            this.loggedInUserData.FIRST_NAME = this.loggedInUserData.LOGGEDIN_USER_FIRST_NAME;
            this.loggedInUserData.LAST_NAME = this.loggedInUserData.LOGGEDIN_USER_LAST_NAME;
            this.loggedInUserData.PHOTOPATH = this.loggedInUserData.LOGGEDIN_USER_PHOTOPATH;
            this.loggedInUserData.BARCODEIMAGE = this.loggedInUserData.LOGGEDIN_USER_BARCODEIMAGE;
            this.loggedInUserData.ISCHILD = 0;
        }
        else {
            for (var i = 0; i < this.siblings.length; i++) {
                if (person_id == this.siblings[i].person_id) {
                    this.loggedInUserData.FIRST_NAME = this.siblings[i].first_name;
                    this.loggedInUserData.LAST_NAME = this.siblings[i].last_name;
                    this.loggedInUserData.PHOTOPATH = this.siblings[i].photopath;
                    this.loggedInUserData.BARCODEIMAGE = this.siblings[i].barcodeImage;
                    this.loggedInUserData.ISCHILD = 1;
                    break;
                }
            }
        }
        this.storage.set('loggedInUserData', this.loggedInUserData);
        this.getClients(person_id, '0');
    };
    ChooseTeamProfilePage.prototype.changeClient = function (client_id) {
        this.client_id = client_id;
        this.getSeasons(this.client_id, this.season_id, false);
    };
    ChooseTeamProfilePage.prototype.changeSeason = function (season_id) {
        this.season_id = season_id;
        this.getTeams(this.client_id, this.season_id, this.selectTeam, 0);
    };
    ChooseTeamProfilePage.prototype.changeDivision = function (divisionID) {
        this.divisionID = divisionID;
        this.getTeams(this.client_id, this.season_id, this.selectTeam, divisionID);
    };
    ChooseTeamProfilePage.prototype.getFunctionAccess = function (club_division_id) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('client_id', this.client_id)
            .set('club_division_id', club_division_id);
        this.http.post(this.global.APIURL + 'users/getPersonAccess', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.GETPERSONACCESS == 1) {
                var setData = {
                    user_adminLevel: 1,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_EventDetail_checkbox: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_NotifyPlayer: _this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
                    event_GroupMessage: _this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
                    event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
                    event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                    // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    player_sms: 'yes',
                    player_phone: 'yes',
                    player_emergency_phone: 'yes',
                    voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
                    game_report: 'yes',
                    game_score: 'yes',
                    bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                    bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                    profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                    sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                    session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                    // rsvp_menu:this.SSODetails.SHOWRSVPMENU==0?'yes':'no',
                    // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no', 
                    // medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                    HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                    showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                };
                _this.storage.set('FunctionAccess', setData);
            }
            else if (response.GETPERSONACCESS == 2) {
                var setData1 = {
                    user_adminLevel: 2,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_EventDetail_checkbox: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_NotifyPlayer: _this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
                    event_GroupMessage: _this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
                    event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
                    event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                    // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    player_sms: 'no',
                    player_phone: 'yes',
                    player_emergency_phone: 'yes',
                    voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
                    game_report: 'yes',
                    game_score: 'yes',
                    bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                    bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                    profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                    sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                    session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                    // rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
                    // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                    //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                    HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                    showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                };
                _this.storage.set('FunctionAccess', setData1);
            }
            else if (response.GETPERSONACCESS == 3) {
                var setData2 = {
                    user_adminLevel: 3,
                    event_StillComing: 'no',
                    event_EventDetail: 'yes',
                    event_EventDetail_checkbox: 'yes',
                    event_BorrowPlayer: 'yes',
                    event_NotifyPlayer: _this.SSODetails.SHOWNOTIFYPLAYERMENU == 1 ? 'yes' : 'no',
                    event_GroupMessage: _this.SSODetails.SHOWGROUPMESSAGEMENU == 1 ? 'yes' : 'no',
                    event_SessionPlan: 'yes but not now',
                    event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'yes' : 'no',
                    event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                    event_tab_Attendance: 'yes',
                    event_tab_Overview: 'no',
                    event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'yes' : 'no',
                    event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                    // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    player_sms: 'no',
                    player_phone: 'yes',
                    player_emergency_phone: 'yes',
                    voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'yes' : 'no',
                    game_report: 'yes',
                    game_score: 'yes',
                    bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                    bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                    profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                    sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                    session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                    //rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',
                    // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                    //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',
                    HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                    showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                };
                _this.storage.set('FunctionAccess', setData2);
            }
            else {
                var setData3 = {
                    user_adminLevel: 4,
                    event_StillComing: _this.SSODetails.SHOWRSVPMENU == 1 ? 'yes' : 'no',
                    event_EventDetail: _this.SSODetails.SHOWRSVPMENU == 1 ? 'self' : 'no',
                    event_EventDetail_checkbox: 'self',
                    event_BorrowPlayer: 'no',
                    event_NotifyPlayer: 'no',
                    event_GroupMessage: 'no',
                    event_SessionPlan: 'no',
                    event_Injury: _this.SSODetails.SHOWINJURYMENU == 1 ? 'self' : 'no',
                    event_Transport: _this.SSODetails.SHOWTRANSPORTMENU == 1 ? _this.SSODetails.SHOWTRANSPORTMENU : 0,
                    event_tab_Attendance: 'no',
                    event_tab_Overview: 'yes',
                    event_Welfare: _this.SSODetails.SHOWWELFAREMENU == 1 ? 'self' : 'no',
                    event_Result: _this.SSODetails.SHOWRESULTSMENU == 1 ? 'yes' : 'no',
                    // event_result_321voting:this.SSODetails.SHOWRESULTSMENU==1?'yes':'no',
                    team_assigned: 'yes',
                    player_coachingReport: 'yes',
                    player_sms: 'yes',
                    player_phone: 'yes',
                    player_emergency_phone: 'yes',
                    voting_for_player: _this.SSODetails.SHOWMVPMENU == 1 ? 'self' : 'no',
                    game_report: 'no',
                    game_score: 'no',
                    bottom_player_menu: _this.SSODetails.SHOWPLAYERSMENU == 1 ? 'yes' : 'no',
                    bottom_chat_menu: _this.SSODetails.SHOWCHATMENU == 1 ? 'yes' : 'no',
                    profile_menu: _this.SSODetails.profile_menu == 1 ? 'yes' : 'no',
                    sec_absences_menu: _this.SSODetails.SHOWSECABSENCEMENU == 1 ? 'yes' : 'no',
                    session_assessment_menu: _this.SSODetails.SHOWSESSIONASSESSMENTMENU == 1 ? 'yes' : 'no',
                    //rsvp_menu:this.SSODetails.SHOWRSVPMENU==1?'yes':'no',//New
                    // mvp_menu:this.SSODetails.SHOWMVPMENU==1?'yes':'no',
                    //medical_menu:this.SSODetails.SHOWMEDICALMENU==1?'yes':'no',//New
                    HasMedicineReviewAccess: _this.SSODetails.SHOWMEDICALMENU == 1 ? response.HASMEDICINEREVIEWACCESS : 0,
                    showSurveyMenu: _this.SSODetails.SHOWSURVEYMENU == 1 ? 'yes' : 'no',
                };
                _this.storage.set('FunctionAccess', setData3);
            }
        }, function (error) {
            _this.storage.set('FunctionAccess', '');
        });
    };
    ChooseTeamProfilePage.prototype.getNextEventDetails = function () {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            var loggedInUserData = val;
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('clientTimeZone', loggedInUserData.CLIENTTIMEZONE)
                .set('selectedTeam', loggedInUserData.SELECTEDTEAM)
                .set('person_id', loggedInUserData.PERSON_ID)
                .set('SEASON_ID', loggedInUserData.SEASON_ID)
                .set('nextEvent', '1')
                .set('filter', '1')
                .set('client_id', loggedInUserData.CLIENT_ID);
            _this.http.post(_this.global.APIURL + 'events/getTeamEvents', data, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                if (response.SUCCESS) {
                    if (response.GETTEAMEVENTS != "") {
                        var UpcomingSingleEvent = JSON.stringify(response.GETTEAMEVENTS[0]);
                        _this.storage.set('UpcomingSingleEvent', UpcomingSingleEvent);
                    }
                }
            }, function (error) {
            });
        });
    };
    ChooseTeamProfilePage.prototype.fixSeasonsNames = function (client_id) {
        this.seasonNames = this.seasonNamesNonSchool;
        for (var i = 0; i < this.clients.length; i++) {
            if (this.clients[i].client_id == client_id) {
                this.seasonNames = (this.clients[i].is_school == 1) ? this.seasonNamesSchool : this.seasonNamesNonSchool;
                this.lblSeason = (this.clients[i].is_school == 1) ? "Term" : "Season";
                break;
            }
        }
    };
    ChooseTeamProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-choose-team-profile',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-team-profile/choose-team-profile.html"*/'<!--\n  Generated template for the ChooseTeamProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content class="bg-gradient {{bgThemeColor}}">\n  <div class="close-top fixed-top">\n    <img src="assets/images/close.svg" alt="" (click)="goBack()">\n    <!----<div class="rotate-text">\n      <span (click)="goBack()">CLOSE</span>\n    </div>-->\n  </div>\n  <section class="main">\n    <form action="" class="user-form profile" [formGroup]="chooseTeamFormProfile">\n      <section class="profileFirst">\n        <div class="form-group">\n          <label class="mb-30">WHICH TEAM DO YOU <br> WANT TO SEE?</label>\n        </div>\n        <div class="form-group mb-30">\n          <div class="row" *ngIf="IsParent">\n            <div class="col-xs-612 pl-0">\n              <label for="client">Team for:</label>\n              <select class="form-control" id="person" (change)="changePerson($event.target.value)">\n                <option [value]="loggedInUserPersonId" *ngIf="IsPlayer">Self</option>\n                <option *ngFor="let sibling of siblings" [value]="sibling.person_id" [selected]="person_id==sibling.person_id">{{sibling.first_name}}\n                  {{sibling.last_name}}</option>\n              </select>\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-xs-6 pl-0">\n              <label for="client">League</label>\n              <select class="form-control" id="client" (change)="changeClient($event.target.value)" [disabled]="clients.length==0">\n                <option *ngFor="let client of clients" [value]="client.client_id" [selected]="client_id==client.client_id">{{client.client_name}}</option>\n              </select>\n            </div>\n            <div class="col-xs-6 pl-0">\n              <label for="season">{{lblSeason}}</label>\n              <select class="form-control" id="season" (change)="changeSeason($event.target.value)" [disabled]="clients.length==0">\n                <ng-container *ngFor="let season of seasons">\n                  <option *ngIf="season.season_id" [value]="season.season_id" [selected]="season_id==season.season_id">\n                    {{seasonNames[season.period]}} {{season.year}}\n                  </option>\n                </ng-container>\n              </select>\n            </div>\n            <div class="col-xs-6 pl-0">\n                <label for="client">Division</label>\n                <select class="form-control" id="" (change)="changeDivision($event.target.value)">\n                    <option [value]="0" [selected]="">All</option>\n                    <ng-container *ngFor="let division of divisions">\n                      <option *ngIf="division.division_id" [value]="division.division_id" [selected]="divisionID==division.division_id">\n                        {{division.division_name}}\n                      </option>\n                    </ng-container>\n                </select>\n              </div>\n          </div>\n        </div>\n        <div class="divider"></div>\n        <div class="form-group mt-sm" *ngFor="let team of teams">\n          <div class="radio clearfix">\n            <div class="leftWrap">\n              <input type="radio" value="{{team.club_division_id}}::{{team.team_name}}" name="team" formControlName="team"\n                [checked]="team.club_division_id==selectTeam" (click)="goToChooseTeam(team.club_division_id + \'::\' + team.team_name)">\n\n              <label class="sub-title textBlack fontBold">\n                {{team.client_name}}\n              </label>\n              <div class="infoWrap">\n                <h6 class="inverseText fontBold">{{team.division_name}}</h6>\n                <h6 class="inverseText fontBold">{{team.team_name}}</h6>\n              </div>\n            </div>\n            <div class="rightWrap" [class.active]="selectTeam == team.club_division_id">\n              <button type="button" class="login-circle xs" (click)="gotoHome(team.club_division_id + \'::\' + team.team_name)"></button>\n            </div>\n          </div>\n        </div>\n        <div class="form-group mt-sm info-item" *ngIf="teams.length == 0">\n          If you do not see the team you believe you should have access to, please contact the Sports department so we can update your access.\n        </div>\n        <div class="form-group mt-30">\n          <a href="javascript:void(0)" class="info-link" (click)="goToChooseHomeImage()">Do you want to change your <br>\n            homescreen image for this team?</a>\n        </div>\n        <div class="sign-up-left mt-30" *ngIf="teams.length==0">\n          <button type="button" class="login-circle xs" (click)="gotoHomeWithNoTeam()"></button>\n        </div>\n      </section>\n    </form>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-team-profile/choose-team-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar_ngx__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ChooseTeamProfilePage);
    return ChooseTeamProfilePage;
}());

//# sourceMappingURL=choose-team-profile.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisplayEventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mobiscroll_angular__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mobiscroll_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__mobiscroll_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










__WEBPACK_IMPORTED_MODULE_5__mobiscroll_angular__["mobiscroll"].settings = {
    theme: 'material'
};
var DisplayEventsPage = /** @class */ (function () {
    function DisplayEventsPage(navCtrl, navParams, platform, storage, global, Alert, http, loadingCtrl, mdlCtrl, logger, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.storage = storage;
        this.global = global;
        this.Alert = Alert;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.mdlCtrl = mdlCtrl;
        this.logger = logger;
        this.gFn = gFn;
        this.global_api = global_api;
        this.PreviousEvent = false;
        this.EventsDetails = [];
        this.PreviousEventsDetails = [];
        this.monthArray = [];
        this.DuplmonthArray = [];
        this.PastmonthArray = [];
        this.UpCommingEvents = [];
        this.UpCommingEventsType = [1, 2];
        this.PastGameEvents = [];
        this.UpCommingSeeMore = 0;
        this.CardViewSeeMore = 0;
        this.WeekDays = [];
        this.notComingFlag = 0;
        this.yesComingFlag = 0;
        this.CreateNote = ['Create note', 'Create note'];
        this.MarkedEvents = [];
        this.loadedFunctionCount = 0; // all the functions have loaded or not?
        this.PlayerAttending = [];
        this.PlayerNotAttending = [];
        this.swipedDown = false;
        this.ReasonSelected = '';
        this.confirmHighlight = 'N';
        this.tempDate = [];
        this.myCalendarOptions = {
            onDayChange: function (event, inst) {
                var date = _this.formatDate(event.date);
                for (var markKey in _this.MarkedEvents) {
                    if (_this.MarkedEvents[markKey].d == date) {
                        _this.gotoEventDashboard(_this.MarkedEvents[markKey].data);
                    }
                }
            }
        };
        $('.tabs .tab-button[aria-selected=false]:nth-child(1) .tab-button-icon').css({
            'mask-image': '',
            'height': '',
            'color': ''
        });
        $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true');
        $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected', 'false');
        this.logger.NextPreviousIcons('EventBottomIcons', { pram: Date.now() });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.pop();
            });
        });
    }
    DisplayEventsPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage');
    };
    DisplayEventsPage.prototype.highlightMenuIcon = function () {
        $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true');
        $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({ 'mask-image': 'url(../assets/images/menu/home.svg)',
            'height': '22px',
            'color': '#dedede' });
    };
    DisplayEventsPage.prototype.ionViewDidLeave = function () {
        $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({ 'mask-image': '',
            'height': '',
            'color': '' });
    };
    DisplayEventsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.highlightMenuIcon();
        setTimeout(function () {
            _this.highlightMenuIcon();
        }, 500);
    };
    DisplayEventsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.highlightMenuIcon();
        setTimeout(function () {
            _this.highlightMenuIcon();
        }, 500);
    };
    DisplayEventsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.highlightMenuIcon();
        this.logger.EventBottomIcons('EventBottomIcons', { pram: Date.now() });
        this.loader = this.loadingCtrl.create();
        this.loader.present();
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            _this.storage.get('UpcomingSingleEvent').then(function (val) {
                _this.StoredEventData = JSON.parse(val);
                if (_this.StoredEventData) {
                    _this.getAttendingDetails();
                }
                else {
                    //this.presentAlert('Events','No upcoming and previous events found');
                }
            });
            _this.UpcomingEvent().then(function (x) {
                _this.loadedFunctionCount += 1;
                _this.upcomingEventFunctionData = x;
                _this.LoadingCompleted();
            });
            _this.PreviousEventfunc().then(function (z) {
                if (z) {
                    _this.loadedFunctionCount += 1;
                    _this.previousEventFunctionData = z;
                    _this.LoadingCompleted();
                }
            });
        });
    };
    DisplayEventsPage.prototype.LoadingCompleted = function () {
        var _this = this;
        if (this.loadedFunctionCount == 2) { //checks if all the functions have loaded or not? Change the value accordingly
            this.loader.dismiss();
            if ((!this.previousEventFunctionData || this.PastmonthArray.length == 0)
                && (!this.upcomingEventFunctionData || this.monthArray.length == 0)) {
                this.storage.get('DisplayEventsPageCount').then(function (val) {
                    var count = (val == null) ? 1 : ++val;
                    _this.storage.set('DisplayEventsPageCount', count);
                    if (count > 1) {
                        _this.presentAlert('Events', 'No upcoming and previous events found');
                    }
                });
            }
        }
    };
    DisplayEventsPage.prototype.getAttendingDetails = function () {
        var _this = this;
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.StoredEventData.event_id)
            .set('client_id', this.PersonData.CLIENT_ID)
            .set('person_id', this.PersonData.PERSON_ID)
            .set('first_name', this.PersonData.FIRST_NAME)
            .set('last_name', this.PersonData.LAST_NAME)
            .set('selectedTeam', this.PersonData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + "players/getPlayerAttending", Data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            _this.ReasonSelected = data.GETPLAYERATTENDING[0].reasondeclined.substring(0, 7);
            _this.confirmHighlight = data.GETPLAYERATTENDING[0].confirmed_status;
            for (var key in data.GETPLAYERATTENDING[0].reason_options_list) {
                if (data.GETPLAYERATTENDING[0].reason_options_list[key].confirm_reason == 'Y') {
                    _this.PlayerAttending.push(data.GETPLAYERATTENDING[0].reason_options_list[key]);
                }
                else {
                    _this.PlayerNotAttending.push(data.GETPLAYERATTENDING[0].reason_options_list[key]);
                }
            }
        }, function (error) {
        });
    };
    DisplayEventsPage.prototype.PreviousEventfunc = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('filter', '4')
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('SEASON_ID', _this.PersonData.SEASON_ID);
            _this.http.post(_this.global.APIURL + "events/getTeamEventsByMonthGroupPrev", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    if (data.GETTEAMEVENTSBYMONTHGROUP != '') {
                        _this.PreviousEventsDetails = data.GETTEAMEVENTSBYMONTHGROUP;
                        for (var key in _this.PreviousEventsDetails) {
                            var tempArray = [];
                            try {
                                var monthName = "";
                                var nextMonthName = "";
                                for (var key1 in _this.PreviousEventsDetails[key]) {
                                    try {
                                        if (_this.PastGameEvents.length == 0) {
                                            _this.PastGameEvents.push(_this.PreviousEventsDetails[key][key1]);
                                            console.log(_this.PastGameEvents);
                                        }
                                        if (_this.PreviousEventsDetails[key][key1].date) {
                                            _this.MarkedEvents.push({ d: _this.PreviousEventsDetails[key][key1].date, color: '#9C895D', data: _this.PreviousEventsDetails[key][key1] });
                                        }
                                        if (key1 == "month") {
                                            monthName = _this.PreviousEventsDetails[key][key1];
                                        }
                                        else if (key1 == "next_month") {
                                            nextMonthName = _this.PreviousEventsDetails[key][key1];
                                        }
                                        else {
                                            tempArray.push(_this.PreviousEventsDetails[key][key1]);
                                            _this.tempDate = tempArray.sort(function (a, b) { return a.time24HR >= b.time24HR ? -1 : 1; });
                                            console.log(_this.tempDate);
                                            tempArray = _this.tempDate.sort(function (a, b) { return a.day >= b.day ? -1 : 1; });
                                            console.log(tempArray);
                                        }
                                    }
                                    catch (err) {
                                    }
                                }
                                tempArray.push(monthName);
                                tempArray.push(nextMonthName);
                                _this.PastmonthArray.push(tempArray);
                                console.log(_this.PastmonthArray);
                            }
                            catch (err) {
                            }
                        }
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    DisplayEventsPage.prototype.UpcomingEvent = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('filter', '1')
                .set('clientTimeZone', _this.PersonData.CLIENTTIMEZONE)
                .set('selectedTeam', _this.PersonData.SELECTEDTEAM)
                .set('person_id', _this.PersonData.PERSON_ID)
                .set('client_id', _this.PersonData.CLIENT_ID)
                .set('SEASON_ID', _this.PersonData.SEASON_ID);
            _this.http.post(_this.global.APIURL + "events/getTeamEventsByMonthGroup", PlayersData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    if (data.GETTEAMEVENTSBYMONTHGROUP != '') {
                        _this.EventsDetails = data.GETTEAMEVENTSBYMONTHGROUP;
                        for (var key in _this.EventsDetails) {
                            var tempArray = [];
                            for (var key1 in _this.EventsDetails[key]) {
                                if (_this.UpCommingEvents.length <= 2) {
                                    if (_this.UpCommingEventsType.includes(_this.EventsDetails[key][key1].event_type_id)) {
                                        var index = _this.UpCommingEventsType.indexOf(_this.EventsDetails[key][key1].event_type_id);
                                        _this.UpCommingEventsType.splice(index, 1);
                                        _this.UpCommingEvents.push(_this.EventsDetails[key][key1]);
                                    }
                                    // console.log(this.UpCommingEvents)
                                }
                                if (_this.EventsDetails[key][key1].date) {
                                    _this.MarkedEvents.push({ d: _this.EventsDetails[key][key1].date, color: '#9C895D', data: _this.EventsDetails[key][key1] });
                                }
                                if (_this.EventsDetails[key][key1].event_notes && (_this.EventsDetails[key][key1].event_notes === true || !(_this.EventsDetails[key][key1].event_notes).replace(/\s/g, '').length)) {
                                    if (_this.FunctionAccess.user_adminLevel == 4) {
                                        _this.EventsDetails[key][key1].event_notes = 'No Notes';
                                    }
                                    else {
                                        _this.EventsDetails[key][key1].event_notes = 'Create Note';
                                    }
                                }
                                tempArray.push(_this.EventsDetails[key][key1]);
                            }
                            _this.monthArray.push(tempArray);
                            // console.log(this.monthArray)
                        }
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    DisplayEventsPage.prototype.getEventType = function (eventType, event) {
        // console.log('eventType',eventType)
        $(event.target).closest('.navbar-nav').find('li').removeClass('active');
        $(event.target).closest('li').addClass('active');
        this.monthArray = [];
        this.CardViewSeeMore = 0;
        if (eventType == 1) {
            // console.log('eventType1',eventType)
            for (var key2 in this.EventsDetails) {
                var tempArray2 = [];
                var x = false;
                for (var key3 in this.EventsDetails[key2]) {
                    if (this.EventsDetails[key2][key3].event_type_id == eventType) {
                        // console.log(this.EventsDetails[key2][key3])
                        tempArray2.push(this.EventsDetails[key2][key3]);
                        x = true;
                    }
                    else if ((key3 == 'month' || key3 == 'next_month') && x) {
                        tempArray2.push(this.EventsDetails[key2][key3]);
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
                    this.monthArray.push(tempArray2);
                    console.log(this.monthArray);
                }
            }
            if (this.monthArray.length > 0) {
                this.monthArray[this.monthArray.length - 1][(this.monthArray[this.monthArray.length - 1]).length - 1] = '';
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
                        tempArray2.push(this.EventsDetails[key2][key3]);
                        x = true;
                    }
                    else if ((key3 == 'month' && x || key3 == 'next_month' && x)) {
                        tempArray2.push(this.EventsDetails[key2][key3]);
                    }
                    // lastkey2=JSON.stringify(parseInt(key2)+1)
                }
                // console.log(tempArray2)
                if (tempArray2.length > 0) {
                    this.monthArray.push(tempArray2);
                    // console.log(this.monthArray)
                }
            }
            if (this.monthArray.length > 0) {
                this.monthArray[this.monthArray.length - 1][(this.monthArray[this.monthArray.length - 1]).length - 1] = '';
            }
            // console.log(this.monthArray[this.monthArray.length-1][(this.monthArray[this.monthArray.length-1]).length-1])
        }
        else if (eventType == 'all') {
            for (var key2 in this.EventsDetails) {
                var tempArray2 = [];
                for (var key3 in this.EventsDetails[key2]) {
                    tempArray2.push(this.EventsDetails[key2][key3]);
                }
                this.monthArray.push(tempArray2);
                console.log(this.monthArray);
            }
        }
    };
    DisplayEventsPage.prototype.onGesture = function (gesture) {
        if (this.swipedDown == false) {
            this.swipedDown = true;
            this.OpenPreviousEvent(gesture);
        }
    };
    DisplayEventsPage.prototype.OpenPreviousEvent = function (event) {
        $('.CalenderView').show();
        $('.well').removeClass('shadow');
        $('.well').removeClass('float-top');
        this.PreviousEvent = true;
    };
    DisplayEventsPage.prototype.UpCmngSeeMore = function (event) {
        if (this.UpCommingEvents.length > 1) {
            $('.well').removeClass('shadow');
            this.CollapseUpCommingEvents = true;
            this.UpCommingSeeMore = this.UpCommingEvents.length - 1;
        }
    };
    DisplayEventsPage.prototype.UpCmngSeeLess = function (event) {
        $('.well').addClass('shadow');
        this.CollapseUpCommingEvents = false;
        this.UpCommingSeeMore = 0;
    };
    DisplayEventsPage.prototype.CardSeeMore = function (event) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').hide();
        $(event.target).closest('.ExtraMonth').find('.mb-50').hide();
        $(event.target).closest('.ExtraMonth').find('.mt-20').show();
        this.CardViewSeeMore = this.CardViewSeeMore + 1;
    };
    DisplayEventsPage.prototype.CardSeeLess = function (val) {
        $(event.target).closest('.ExtraMonth').find('.multi-shadow').show();
        $(event.target).closest('.ExtraMonth').find('.mb-50').show();
        $(event.target).closest('.ExtraMonth').find('.mt-20').hide();
        if (this.CardViewSeeMore > 0) {
            this.CardViewSeeMore = val;
        }
    };
    DisplayEventsPage.prototype.seePastGames = function (event) {
        if ($(event.target).html() == 'SEE UPCOMING EVENTS') {
            $('.CalenderView').hide();
            $(event.target).closest('.user-form').find('.emptyclass').hide();
            $('.well').addClass('float-top');
            $('.well').addClass('shadow');
            this.PreviousEvent = false;
            this.swipedDown = false;
        }
        else {
            $(event.target).html('SEE UPCOMING EVENTS');
            $(event.target).closest('.user-form').find('.select-events').show();
        }
    };
    DisplayEventsPage.prototype.PreviousEventDetails = function (event) {
        $(event.target).closest('.event-card').find('.well').show();
        $(event.target).closest('.emptyclass').find('.section-less').show();
    };
    DisplayEventsPage.prototype.SeeLessPastEvents = function (event) {
        // $(event.target).closest('.event-card').find('.well').hide();
        $(event.target).closest('.emptyclass').find('.section-less').hide();
        $(event.target).closest('.emptyclass').find('.well').hide();
    };
    DisplayEventsPage.prototype.StillComingTick = function (event, yesComing) {
        this.notComingFlag = 0;
        if (yesComing == 0) {
            $(event.target).closest('.event-icons').find('.close-icon').removeClass('close-top-arrow');
            $(event.target).closest('.check-icon').addClass('check-top-arrow');
            $(event.target).closest('.row').find('.noComing').hide();
            $(event.target).closest('.row').find('.yesComing').show();
            this.yesComingFlag = 1;
        }
        else {
            $(event.target).closest('.event-icons').find('.close-icon').removeClass('close-top-arrow');
            $(event.target).closest('.check-icon').removeClass('check-top-arrow');
            $(event.target).closest('.row').find('.yesComing').hide();
            this.yesComingFlag = 0;
        }
    };
    DisplayEventsPage.prototype.NotComing = function (event, notComing) {
        this.yesComingFlag = 0;
        if (notComing == 0) {
            $(event.target).closest('.event-icons').find('.check-icon').removeClass('check-top-arrow');
            $(event.target).closest('.close-icon').addClass('close-top-arrow');
            $(event.target).closest('.row').find('.yesComing').hide();
            $(event.target).closest('.row').find('.noComing').show();
            this.notComingFlag = 1;
        }
        else {
            $(event.target).closest('.event-icons').find('.check-icon').removeClass('check-top-arrow');
            $(event.target).closest('.close-icon').removeClass('close-top-arrow');
            $(event.target).closest('.row').find('.noComing').hide();
            this.notComingFlag = 0;
        }
    };
    DisplayEventsPage.prototype.ChangePreviousEvent = function (event) {
        if (event != '') {
            this.PastGameEvents = [];
            for (var key in event) {
                this.PastGameEvents.push(event[key]);
            }
        }
    };
    DisplayEventsPage.prototype.presentAlert = function (Title, SubTitle) {
        var _this = this;
        var alert = this.Alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
        alert.onDidDismiss(function () {
            _this.storage.get('SSODetails').then(function (val) {
                if (val) {
                    // this.navCtrl.setRoot(TabsPage,{Player_menu:val.SHOWPLAYERSMENU==1?'yes':'no'});
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__tabs_tabs__["a" /* TabsPage */]);
                }
            });
        });
    };
    DisplayEventsPage.prototype.gotoStillComming = function () {
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            if (val) {
                // this.gotoAttandance()
            }
            else {
                alert("Please check Next Event");
            }
        });
    };
    DisplayEventsPage.prototype.SinglePlayersAttdStates = function (response, confirm, reasondeclineds, AttendyPersonId, event) {
        var _this = this;
        $('.check-icon').removeClass('check-top-arrow');
        $('.close-icon').removeClass('close-top-arrow');
        if (response == 'tick') {
            $('.event-icons').find('.check-icon').addClass('RemoveOpacity');
            $('.event-icons').find('.close-icon').removeClass('RemoveOpacity');
        }
        else if (response == 'close') {
            $('.event-icons').find('.check-icon').removeClass('RemoveOpacity');
            $('.event-icons').find('.close-icon').addClass('RemoveOpacity');
        }
        this.ReasonSelected = reasondeclineds.substring(0, 7);
        var attended = 0;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var target = event.target;
        if (confirm == 'Y') {
            confirm = 'YES';
            attended = 1;
        }
        else if (confirm == 'N') {
            confirm = 'NO';
        }
        var loginData4 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.StoredEventData.event_id)
            .set('personId', AttendyPersonId)
            .set('attended', attended)
            .set('confirmed', confirm)
            .set('reasondeclined', reasondeclineds)
            .set('reasondeclined_by_coach', '-1')
            .set('state_time', '')
            .set('selectedTeam', this.PersonData.SELECTEDTEAM);
        this.http.post(this.global.APIURL + "events/saveSinglePlayersAttdStates", loginData4, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.logger.EventPlayerReason('PlayerEventReasonSelect', { pram: Date.now() });
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
        }, function (error) {
        });
    };
    DisplayEventsPage.prototype.gotoCreateNote = function (index) {
        var _this = this;
        if (this.PersonData.adminLevel != 4 && (!this.PersonData.ISPARENT || (this.PersonData.ISPARENT && this.PersonData.PERSON_ID == this.PersonData.PARENT_ID))) {
            var modal = this.mdlCtrl.create('CreateNodePage', { 'eventid': this.UpCommingEvents[index]['event_id'], 'event_notes': this.UpCommingEvents[index]['event_notes'] }, { 'showBackdrop': true, 'enableBackdropDismiss': true });
            modal.present();
            modal.onDidDismiss(function (data) {
                if (typeof data != 'undefined') {
                    _this.CreateNote[index] = data.length ? data : 'Create note';
                    _this.UpCommingEvents[index]['event_notes'] = data;
                }
            });
        }
    };
    DisplayEventsPage.prototype.gotoEventDashboard = function (EventData) {
        this.navCtrl.push('EventDashboardPage', { 'EventDetails_eventId': EventData });
        this.storage.set('BackButton', true);
    };
    DisplayEventsPage.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [month, day, year].join('/');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], DisplayEventsPage.prototype, "content", void 0);
    DisplayEventsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-display-events',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/display-events/display-events.html"*/'\n<div  class="top-bar clearfix navbar-fixed-top">\n    <div class="prev-next pull-right doubleArrow" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n        <a href="javascript:void(0);" class="prev"></a>\n    </div>\n</div>\n<ion-header [scrollingHeader]=\'content\' class="top-bar">\n        <div class="bg-header navbar-fixed-top ">\n                <div class="title fontBold ScrolledUpCard">EVENTS</div>\n        </div>\n</ion-header>\n\n\n<ion-content class="bg-gray event cardBottom" > <!--(ionScrollEnd)="logScrollEnd()"-->\n    <section class="main">\n        <form action="" class="user-form profile cardBottom" *ngIf="monthArray || PastmonthArray">\n                <mbsc-form class="CalenderView" style="display: none">\n                    <mbsc-form-group>\n                        <mbsc-calendar  [options]="myCalendarOptions" [marked]="MarkedEvents" [ngModelOptions]="{standalone: true}" [(ngModel)]="calendarOneWeek" display="inline" weeks="1"></mbsc-calendar>\n                    </mbsc-form-group>\n                </mbsc-form>\n            <div *ngIf="PreviousEvent==true">\n                \n                <div class="section-more clearfix" *ngIf="PastGameEvents!=\'\'" (click)="seePastGames($event)">\n                        <a href="javascript:void(0)" class="see-more pull-right" >SEE PAST EVENTS</a>\n                </div>\n                \n                <div class="emptyclass" *ngFor="let key of PastmonthArray">    \n                    <div class="event-card select-events "  style="display:none">\n                        <div class="event-blue" (click)="PreviousEventDetails($event)">\n                            <h5 class="v-center">{{key[key.length-2]}}</h5>\n                        </div>\n                        <div *ngFor="let key1 of key; let i=index" >\n                            <div class="well select-card " [class.active]="i==0"  *ngIf="i<key.length-2" style="display: none" (click)="gotoEventDashboard(key1)">\n                                <div class="row">\n                                    <div class="event-date col-xs-3 p-0">\n                                        <div class="badge badge-blue">{{key1.weekday}} {{key1.day}}</div>\n                                        <p>{{key1.time_started}}</p>\n                                    </div>\n                                    <div class="event-title col-xs-8 p-0">\n                                        <h5>{{key1.event_name}}</h5>\n                                        <p>{{key1.ground_name}}</p>\n                                    </div>\n                                    <div class="event-next col-xs-1 p-0">\n                                        <a href="#" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n                        \n                    </div>\n                    <div class="section-less clearfix mt-20" style="display:none">\n                        <a href="javascript:void(0)" class="see-less pull-right" (click)="SeeLessPastEvents($event)">SEE LESS</a>\n                    </div>\n                </div>    \n            </div>\n\n            <section class="profileFirst heightAuto xs-padding">\n                <div class="eventFixed" >\n                    <div class="PastEventCard" *ngFor="let key of PastGameEvents">\n                        <div class="well eventOption blue PrevClickableDiv"  *ngIf="PreviousEvent==false "  (click)="gotoEventDashboard(key)" swipeAll (swipedown)="onGesture($event)">\n                            <h5 class="sub-title SubTitleTop fontBold">PREVIOUS EVENT: {{key.weekday}} {{key.day}} {{key.month}}\n                                <div class="down-arrow" style="float: right" (click)="OpenPreviousEvent($event)"><i class="large material-icons">arrow_downward</i></div>\n                            </h5>\n                            <h5 class="sub-title fontBold">{{key.event_name}}</h5>\n\n                        </div>\n\n                        <div class="well eventOption blue" *ngIf="PreviousEvent==true" (click)="gotoEventDashboard(key)">\n                                <h5 class="sub-title fontBold">PREVIOUS EVENT: {{key.weekday}} {{key.day}} {{key.month}}</h5>\n                                <h4 class=" fontBold">{{key.event_name}}</h4>\n                                <div class="divider mt-20"></div>\n                                <div class="add text-left"> <span>{{key.ground_name?key.ground_name:\'Undefined Location\'}}</span></div>\n                                <div class="time text-left">{{key.time_started}}</div>\n                                <!-- <div class="divider mt-20"></div>\n                                <h5 class="info-item fontBold text-left">ACTION TO GO HERE</h5> -->\n                        </div>\n                    </div>\n                    <!-- <ion-scroll scrollY="true"  style="height: 100%" scrollbar-y="false" zoom="true" (ionScroll)="onScroll(\'list\',\'head\')" style="position: static"> -->\n\n                    <div *ngFor="let key of UpCommingEvents;let i=index">\n                        <div class="well eventOption black float-top shadow" [class.mapUpcoming]="UpCommingSeeMore==1" [class.Remove-float-top]="PastGameEvents==\'\'" *ngIf="i<=UpCommingSeeMore" (swipedown)="onGesture($event)"><!--(swipedown)="onGesture($event)"-->\n                            <div class="ClickableDiv" (click)="gotoEventDashboard(key)">\n                                <div>\n                                    <h5 class="sub-title fontBold text-blue">UPCOMING EVENT: {{key.weekday}} {{key.day}} {{key.month}}</h5>\n                                    <h4 class="fontBold">{{key.event_name}}</h4>\n                                </div>\n                                <div class="divider mt-20"></div>\n                                <div class="add text-left"> <span>{{key.ground_name?key.ground_name:\'Undefined Location\'}}</span></div>\n                                <div class="time text-left">{{key.time_started}}</div>\n                                <div class="divider mt-20"></div>\n                            </div>\n                            <div class="bookmark text-left no-note" (click)="FunctionAccess.user_adminLevel==4 ? \'\': gotoCreateNote(i)">\n                                <!-- <span ng-bind-html="notesTxt" class="bookmark-info note" *ngIf="key.event_notes!=\'\'">{{CreateNote?CreateNote:key.event_notes}}</span> -->\n                                <span class="bookmark-info" *ngIf="FunctionAccess.user_adminLevel!=4">{{(key.event_notes==\'\')?CreateNote[i]:key.event_notes}}</span>\n                                <span class="bookmark-info " *ngIf="FunctionAccess.user_adminLevel==4">{{(key.event_notes==\'\')?\'No Note\':key.event_notes}}</span>\n                            </div>\n                            \n                            <div class="row" *ngIf="FunctionAccess && FunctionAccess.event_StillComing==\'yes\'">\n                                <div class="divider mt-20"></div>\n                                <div class="col-xs-6 p-0">\n                                    <h5 class="info-item  text-left">STILL COMING? \n                                        <span class="reasonCard">{{ReasonSelected}}...</span> </h5>\n                                </div>\n                                <div class="event-icons col-xs-6 p-0" >\n                                    <a href="javascript:void(0)" class="check-icon " [class.RemoveOpacity]="confirmHighlight==\'Y\'" (click)="StillComingTick($event,yesComingFlag)"><i class="material-icons">check</i></a>\n                                    <a href="javascript:void(0)" class="close-icon " [class.RemoveOpacity]="confirmHighlight==\'N\'" (click)="NotComing($event,notComingFlag)"><i class="material-icons">close</i></a>\n                                </div>\n                                <ul class="dropdown-menu card-dropdown yesComing" >\n                                    <li *ngFor="let key of PlayerAttending" (click)="SinglePlayersAttdStates(\'tick\',key.confirm_reason,key.reason_display,PersonData.PERSON_ID,$event)">\n                                         <a href="javascript:void(0)">{{key.reason_display}}</a>\n                                    </li>\n                                    <!-- <li (click)="SinglePlayersAttdStates(\'YES\', \'YES, LATE\',PersonData.PERSON_ID,$event)">\n                                        <a href="javascript:void(0)">YES, LATE</a>\n                                    </li> -->\n                                </ul>\n                                <ul class="dropdown-menu card-dropdown noComing" >\n                                        <li *ngFor="let key of PlayerNotAttending" (click)="SinglePlayersAttdStates(\'close\',key.confirm_reason,key.reason_display,PersonData.PERSON_ID,$event)">\n                                                <a href="javascript:void(0)">{{key.reason_display}}</a>\n                                        </li>\n                                        \n                                    </ul>\n                                \n                            </div>\n                            \n                        </div>\n                    </div>\n                <!-- </ion-scroll> -->\n                   \n                </div>\n                \n                <p class="more eventFixed text-blue" (click)="UpCmngSeeMore($event)" *ngIf="UpCommingEvents.length>1 && UpCommingSeeMore==0">\n                    <span class="span">SEE MORE</span>\n                </p>\n                <p class="more eventFixed text-blue" (click)="UpCmngSeeLess($event)" *ngIf="CollapseUpCommingEvents">\n                    <span class="span">SEE LESS</span>\n                </p>\n                <div class="navbar navbar-default event-menu" *ngIf="UpCommingEvents.length>0">\n                        <ul class="nav navbar-nav">\n                            <li class="active" (click)="getEventType(\'all\',$event)"><a class="all" href="javascript:void(0)">ALL</a></li>\n                            <li class="" (click)="getEventType(2,$event)"><a class="training" href="javascript:void(0)">TRAINING</a></li>\n                            <li class="" (click)="getEventType(1,$event)"><a class="games" href="javascript:void(0)">GAMES</a></li>\n                        </ul>\n                </div>\n                <div class="event-card select-events bg-gray cardBottom" *ngIf="monthArray.length<=0 && UpCommingEvents.length>0">\n                    <div class="well select-card " >\n                        <div class="row">\n                            <div class="col-xs-12 ">\n                                <h5 class="sub-title">No Event Present</h5>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="ExtraMonth" *ngFor="let key of monthArray;let y=index">\n\n                    <div class="event-card select-events bg-gray"  *ngIf="y <=CardViewSeeMore">\n                        <div *ngIf="y <=CardViewSeeMore">\n                            <div class="event-black" >\n                                <h5 class="v-center">{{key[key.length-2]}}</h5>\n                            </div>\n\n                            <div  *ngFor="let key1 of key; let i=index;" (click)="gotoEventDashboard(key1)">\n\n                                    <div class="well select-card "  [class.active]="i==0" *ngIf="i<key.length-2">\n                                        <div class="row">\n                                            <div class="event-date col-xs-3 p-0">\n                                                <div class="badge badge-blue">{{key1.weekday}} {{key1.day}}</div>\n                                                <p>{{key1.time_started}}</p>\n                                            </div>\n                                            <div class="event-title col-xs-8 p-0">\n                                                <h5>{{key1.event_name}}</h5>\n                                                <p>{{key1.ground_name}}</p>\n                                            </div>\n                                            <div class="event-next col-xs-1 p-0">\n                                                <a href="javascript:void(0)" class="next-arrow v-center"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>\n                                            </div>\n                                        </div>\n                                    </div>\n                            </div>\n                        </div>\n                        \n                    </div>\n                    <div class="event-card select-events bg-gray multi-shadow" >\n                        <div *ngIf="y <=CardViewSeeMore && key[key.length-1]!=\'\'">\n                            <div class="event-black" >\n                                <h5 class="v-center">{{key[key.length-1]}}</h5>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="section-more mb-50 clearfix" *ngIf="y <=CardViewSeeMore && key[key.length-1]!=\'\'" (click)="CardSeeMore($event)">\n                        <a href="javascript:void(0)" class="see-more pull-right">SEE MORE</a>\n                    </div>\n                    <div class="section-more clearfix mt-20" *ngIf="y <=CardViewSeeMore" (click)="CardSeeLess(y)" style="display:none">\n                        <a href="javascript:void(0)"  class="see-more pull-right">SEE LESS</a>\n                    </div>\n                \n            </div>\n            </section>\n        </form>\n  </section>\n\n</ion-content>\n<!-- <content-drawer [options]="drawerOptions">\n        <div class="content">\n          The world is your oyster.\n          <p>\n            If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.\n          </p>\n        </div>\n    </content-drawer> -->\n<!-- <ion-footer>\n    <nav class="navbar navbar-default navbar-fixed-bottom">\n        <div class="container-fluid">\n            <ul class="nav navbar-nav">\n                <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n                <li class="events active"><a href="javascript:void(0);">Events</a></li>\n                <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n                <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n                <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n            </ul>\n        </div>\n    </nav>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/display-events/display-events.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_logger_event_logger__["a" /* EventLoggerProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], DisplayEventsPage);
    return DisplayEventsPage;
}());

//# sourceMappingURL=display-events.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_base64_ngx__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera_ngx__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_ngx__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path_ngx__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, navParams, http, storage, base64, loadingCtrl, global, actionSheetCtrl, camera, platform, file, filePath, toastCtrl, alert, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.base64 = base64;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.platform = platform;
        this.file = file;
        this.filePath = filePath;
        this.toastCtrl = toastCtrl;
        this.alert = alert;
        this.global_api = global_api;
        this.profileImage = '';
        this.bgThemeColor = '';
        this.randomNumber = '';
        this.image = '';
        this.defaultImage = '';
        this.refresh = true;
        storage.get('loggedInUserData').then(function (val) {
            console.log(val);
            _this.firstName = val.FIRST_NAME.toString().toLocaleUpperCase();
            _this.personID = val.PERSON_ID.toString();
            _this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
            _this.profileImage = val.PHOTOPATH.toString();
            _this.image = "http://api-dev.gojaro.com/profileimage/this.profileImage?r=this.randomNumber";
            _this.loggedInUserData = val;
            /* set default to hide image selection */
            _this.loggedInUserData.HOMESCREEN_BG = 'img-1.jpg';
            _this.storage.set('loggedInUserData', _this.loggedInUserData);
            _this.storage.set('Refresh', _this.refresh);
            _this.backgroundThemeColor();
        });
    }
    WelcomePage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "green":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "grey":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "orange":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "pink":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            default:
                this.bgThemeColor = "grey";
                break;
        }
    };
    WelcomePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'From Gallery',
                    icon: 'cloud-upload',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'From Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
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
    };
    WelcomePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            console.log("Image Path : ", imagePath);
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast(err);
        });
    };
    // Create a new name for the image
    WelcomePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    WelcomePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        console.log("resolver URL : ", namePath, currentName);
        this.file.readAsDataURL(namePath, currentName).then(function (res) {
            console.log("resolver URL : ", res);
            _this.uploadPhoto(encodeURIComponent(res));
        }, function (error) {
            console.log("Error in readAsDataURL :", error);
        });
        /* this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
          this.profileImage = newFileName;
          this.uploadImage();
        }, error => {
          this.presentToast(error);
        }); */
    };
    WelcomePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    WelcomePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    WelcomePage.prototype.uploadImage = function () {
        var _this = this;
        var targetPath = this.pathForImage(this.profileImage);
        this.base64.encodeFile(targetPath).then(function (base64File) {
            _this.uploadPhoto(encodeURIComponent(base64File));
        }, function (err) {
            _this.presentAlert('Error', 'Sorry, image upload error.');
        });
    };
    WelcomePage.prototype.uploadPhoto = function (profileImage) {
        var _this = this;
        this.profileImage = '';
        this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('profileImage', profileImage);
        this.http.post(this.global.APIURL + 'users/uploadProfileImage', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            console.log("Image : ", response);
            _this.profileImage = _this.personID + '.jpg';
            console.log("profileImage : ", _this.profileImage);
            if (response.SUCCESS) {
                _this.loggedInUserData['PHOTOPATH'] = _this.profileImage;
                _this.storage.set('loggedInUserData', _this.loggedInUserData);
            }
            else {
                _this.presentAlert('Error', 'Sorry, image upload error.');
            }
        }, function (error) {
            loading.dismiss();
            _this.profileImage = _this.personID + '.jpg';
            _this.presentAlert('Error', 'Sorry, image upload error.');
        });
    };
    WelcomePage.prototype.goToChooseTheme = function () {
        var isLogout = true;
        this.storage.set('isLogout', isLogout);
        if (this.loggedInUserData.THEME_BG != "") {
            //this.navCtrl.push('ChooseTeamPage', {}, {animation: 'ios-transition'});
            if (this.loggedInUserData.HOMESCREEN_BG != "") {
                this.navCtrl.push('SetToGoPage', {}, { animation: 'ios-transition' });
            }
            else {
                this.navCtrl.push('ChooseHomeImagePage', {}, { animation: 'ios-transition' });
            }
        }
        else {
            this.navCtrl.push('ChooseThemePage', {}, { animation: 'ios-transition' });
        }
    };
    WelcomePage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/welcome/welcome.html"*/'<!--\n  Generated template for the WelcomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n  <div class="bg-white-gradient ">\n    <section class="main">\n      <form action="" class="user-form profile">\n        <section class="profileFirst Card_View">\n          <div class="form-group">\n            <label class="mb-30">WELCOME {{ firstName }}</label>\n          </div>\n          <div class="divider"></div>\n          <div class="form-group mt-xl">\n            <label class="mb-30">Let\'s personalise your experience.</label>\n            <div class="info-item" *ngIf="profileImage.length == 0">Add your profile photo</div>\n          </div>\n\n          <div class="circle mt-xxl mb-30 success" id="profileImgWrap" *ngIf="profileImage.length > 0; else noImage">\n            <img src="{{global.PROFILEIMAGEURL}}{{profileImage}}?r={{randomNumber}}" alt="" (click)="presentActionSheet()" onerror="this.src=\'assets/images/camera.svg\';var element = document.getElementById(\'profileImgWrap\');element.classList.remove(\'success\');" />\n          </div>\n          <ng-template #noImage>\n            <div class="circle mt-xxl mb-30 bg-color">\n              <img class="default-image" src="assets/images/camera.svg" alt="" (click)="presentActionSheet()">\n            </div>\n          </ng-template>\n\n          <div class="scroll-arrow">\n            <!--<img src="assets/images/arrow-navig.svg" alt="">\n            <div class="sub-title inverseText">SCROLL DOWN</div>-->\n            <div>\n              <button type="button" class="login-circle  xs" (click)="goToChooseTheme()"></button>\n            </div>\n          </div>\n        </section>\n        <!--<section class="details bg-black">\n          <div class="desc">\n            <h5 class="inverseText text-left">Let\'s start with some information.</h5>\n          </div>\n          <div class="desc">\n            <h5 class="inverseText text-left">Profile settings to go here…</h5>\n          </div>\n          <div class="sign-up-left">\n            <button type="button" class="login-circle xs" (click)="goToChooseTheme()"></button>\n          </div>\n        </section>-->\n      </form>\n    </section>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/welcome/welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_base64_ngx__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera_ngx__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_ngx__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path_ngx__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(459);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mobiscroll_angular__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mobiscroll_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mobiscroll_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen_ngx__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar_ngx__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_image_picker_ngx__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64_ngx__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_sms_ngx__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng_circle_progress__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_speech_recognition_ngx__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_ngx__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_path_ngx__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_android_permissions_ngx__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_camera_ngx__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_network_ngx__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ionic_scrolling_header__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_event_logger_event_logger__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_email_composer_ngx__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_calendar_ngx__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_display_events_display_events__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_display_events_new_display_events_new__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_event_home_event_home__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_event_home_menu_event_home_menu__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_chat_dashboard_chat_dashboard__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_settings_settings__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_players_dashboard_players_dashboard__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_geolocation_ngx__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_barcode_scanner_ngx__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_in_app_browser_ngx__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_message_log_dashboard_message_log_dashboard__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_alert_dashboard_alert_dashboard__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_ng_lazyload_image__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_vibration_ngx__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_deeplinks_ngx__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_alert_dashboard_alert_dashboard_module__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_chat_dashboard_chat_dashboard_module__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_push_ngx__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pipes_pipes_module__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_tabs_tabs_module__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_get_started_get_started_module__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_keyboard_ngx__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_secure_storage_ngx__ = __webpack_require__(344);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















// import { FileTransfer } from '@ionic-native/file-transfer';




// import * as firebase from "firebase/app";



// import { Firebase } from '@ionic-native/firebase/ngx';





//import { EventHomeNewPage } from '../pages/event-home-new/event-home-new';























//  import { Push } from '@ionic-native/push';
// import { Badge }from '@ionic-native/badge/ngx';
// import { Deeplinks } from '@ionic-native/deehomeplinks';
// import { FCM } from '@ionic-native/fcm/ngx';
// var config = {
//   apiKey: "AIzaSyC3EgL_fWuSZN3lNeu6E9QacbqHWXGrvV4",
//   authDomain: "pulteney-ac45f.firebaseapp.com",
//   databaseURL: "https://pulteney-ac45f.firebaseio.com",c
//   projectId: "pulteney-ac45f",
//   storageBucket: "pulteney-ac45f.appspot.com",
//   messagingSenderId: "226231413267"
// };
// firebase.initializeApp(config);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_event_home_event_home__["a" /* EventHomePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_display_events_display_events__["a" /* DisplayEventsPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_players_dashboard_players_dashboard__["a" /* PlayersDashboardPage */],
                //ChatDashboardPage,
                //EventHomeNewPage,
                __WEBPACK_IMPORTED_MODULE_30__pages_event_home_menu_event_home_menu__["a" /* EventHomeMenuPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_display_events_new_display_events_new__["a" /* DisplayEventsNewPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_message_log_dashboard_message_log_dashboard__["a" /* MessageLogDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__mobiscroll_angular__["MbscModule"],
                __WEBPACK_IMPORTED_MODULE_49__pages_tabs_tabs_module__["TabsPageModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {
                    animate: false,
                    swipeBackEnabled: false,
                }, {
                    links: [
                        { loadChildren: '../pages/add-rollcalls/add-rollcalls.module#AddRollcallsPageModule', name: 'AddRollcallsPage', segment: 'add-rollcalls', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/additional-passenger/additional-passenger.module#AdditionalPassengerPageModule', name: 'AdditionalPassengerPage', segment: 'additional-passenger', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/borrowed-player/borrowed-player.module#BorrowedPlayerPageModule', name: 'BorrowedPlayerPage', segment: 'borrowed-player', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/alert-dashboard/alert-dashboard.module#AlertDashboardPageModule', name: 'AlertDashboardPage', segment: 'alert-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/call-modal/call-modal.module#CallModalPageModule', name: 'CallModalPage', segment: 'call-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat-dashboard/chat-dashboard.module#ChatDashboardPageModule', name: 'ChatDashboardPage', segment: 'chat-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat-group-info/chat-group-info.module#ChatGroupInfoPageModule', name: 'ChatGroupInfoPage', segment: 'chat-group-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat-view-image/chat-view-image.module#ChatViewImagePageModule', name: 'ChatViewImagePage', segment: 'chat-view-image', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/choose-home-image/choose-home-image.module#ChooseHomeImagePageModule', name: 'ChooseHomeImagePage', segment: 'choose-home-image', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat-view/chat-view.module#ChatViewPageModule', name: 'ChatViewPage', segment: 'chat-view', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/choose-team-profile/choose-team-profile.module#ChooseTeamProfilePageModule', name: 'ChooseTeamProfilePage', segment: 'choose-team-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/choose-team/choose-team.module#ChooseTeamPageModule', name: 'ChooseTeamPage', segment: 'choose-team', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/choose-players/choose-players.module#ChoosePlayersPageModule', name: 'ChoosePlayersPage', segment: 'choose-players', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/choose-theme/choose-theme.module#ChooseThemePageModule', name: 'ChooseThemePage', segment: 'choose-theme', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contracter-timesheet-list/contracter-timesheet-list.module#ContracterTimesheetListPageModule', name: 'ContracterTimesheetListPage', segment: 'contracter-timesheet-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/create-node/create-node.module#CreateNodePageModule', name: 'CreateNodePage', segment: 'create-node', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/display-events-new/display-events-new.module#DisplayEventsNewPageModule', name: 'DisplayEventsNewPage', segment: 'display-events-new', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/display-events/display-events.module#DisplayEventsPageModule', name: 'DisplayEventsPage', segment: 'display-events', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/email-modal/email-modal.module#EmailModalPageModule', name: 'EmailModalPage', segment: 'email-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-attendance-loadingpage/event-attendance-loadingpage.module#EventAttendanceLoadingpagePageModule', name: 'EventAttendanceLoadingpagePage', segment: 'event-attendance-loadingpage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-attendance-confirm/event-attendance-confirm.module#EventAttendanceConfirmPageModule', name: 'EventAttendanceConfirmPage', segment: 'event-attendance-confirm', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-attendance-note/event-attendance-note.module#EventAttendanceNotePageModule', name: 'EventAttendanceNotePage', segment: 'event-attendance-note', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-attendance/event-attendance.module#EventAttendancePageModule', name: 'EventAttendancePage', segment: 'event-attendance', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-confirm-absence/event-confirm-absence.module#EventConfirmAbsencePageModule', name: 'EventConfirmAbsencePage', segment: 'event-confirm-absence', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-dashboard-loading/event-dashboard-loading.module#EventDashboardLoadingPageModule', name: 'EventDashboardLoadingPage', segment: 'event-dashboard-loading', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-dashboard/event-dashboard.module#EventDashboardPageModule', name: 'EventDashboardPage', segment: 'event-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-group-message-text/event-group-message-text.module#EventGroupMessageTextPageModule', name: 'EventGroupMessageTextPage', segment: 'event-group-message-text', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-dashboard-new/event-dashboard-new.module#EventDashboardNewPageModule', name: 'EventDashboardNewPage', segment: 'event-dashboard-new', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-group-message/event-group-message.module#EventGroupMessagePageModule', name: 'EventGroupMessagePage', segment: 'event-group-message', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-group-send-message/event-group-send-message.module#EventGroupSendMessagePageModule', name: 'EventGroupSendMessagePage', segment: 'event-group-send-message', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-home-menu/event-home-menu.module#EventHomeMenuPageModule', name: 'EventHomeMenuPage', segment: 'event-home-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-home/event-home.module#EventHomePageModule', name: 'EventHomePage', segment: 'event-home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-offline-alt/event-offline-alt.module#EventOfflineAltPageModule', name: 'EventOfflineAltPage', segment: 'event-offline-alt', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-offline/event-offline.module#EventOfflinePageModule', name: 'EventOfflinePage', segment: 'event-offline', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-session-plan/event-session-plan.module#EventSessionPlanPageModule', name: 'EventSessionPlanPage', segment: 'event-session-plan', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-stats-graph/event-stats-graph.module#EventStatsGraphPageModule', name: 'EventStatsGraphPage', segment: 'event-stats-graph', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-stats/event-stats.module#EventStatsPageModule', name: 'EventStatsPage', segment: 'event-stats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-update-player-modal/event-update-player-modal.module#EventUpdatePlayerModalPageModule', name: 'EventUpdatePlayerModalPage', segment: 'event-update-player-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-welfare/event-welfare.module#EventWelfarePageModule', name: 'EventWelfarePage', segment: 'event-welfare', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forget/forget.module#ForgetPageModule', name: 'ForgetPage', segment: 'forget', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/filter-temp/filter-temp.module#FilterTempPageModule', name: 'FilterTempPage', segment: 'filter-temp', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/events-results/events-results.module#EventsResultsPageModule', name: 'EventsResultsPage', segment: 'events-results', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gallery-album/gallery-album.module#GalleryAlbumPageModule', name: 'GalleryAlbumPage', segment: 'gallery-album', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gallery-events/gallery-events.module#GalleryEventsPageModule', name: 'GalleryEventsPage', segment: 'gallery-events', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gallery-timeline-details/gallery-timeline-details.module#GalleryTimelineDetailsPageModule', name: 'GalleryTimelineDetailsPage', segment: 'gallery-timeline-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gallery-timeline/gallery-timeline.module#GalleryTimelinePageModule', name: 'GalleryTimelinePage', segment: 'gallery-timeline', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gameboard/gameboard.module#GameboardPageModule', name: 'GameboardPage', segment: 'gameboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/group-chat-view/group-chat-view.module#GroupChatViewPageModule', name: 'GroupChatViewPage', segment: 'group-chat-view', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/injured-list/injured-list.module#InjuredListPageModule', name: 'InjuredListPage', segment: 'injured-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/get-started/get-started.module#GetStartedPageModule', name: 'GetStartedPage', segment: 'get-started', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/injury-cause/injury-cause.module#InjuryCausePageModule', name: 'InjuryCausePage', segment: 'injury-cause', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/last-rollcall/last-rollcall.module#LastRollcallPageModule', name: 'LastRollcallPage', segment: 'last-rollcall', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/injury-incident-report/injury-incident-report.module#InjuryIncidentReportPageModule', name: 'InjuryIncidentReportPage', segment: 'injury-incident-report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/medicine-info/medicine-info.module#MedicineInfoPageModule', name: 'MedicineInfoPage', segment: 'medicine-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map-tracker/map-tracker.module#MapTrackerPageModule', name: 'MapTrackerPage', segment: 'map-tracker', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/message-log-dashboard/message-log-dashboard.module#MessageLogDashboardPageModule', name: 'MessageLogDashboardPage', segment: 'message-log-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/new-discussion-create/new-discussion-create.module#NewDiscussionCreatePageModule', name: 'NewDiscussionCreatePage', segment: 'new-discussion-create', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/new-discussion-list/new-discussion-list.module#NewDiscussionListPageModule', name: 'NewDiscussionListPage', segment: 'new-discussion-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/new-discussion-save/new-discussion-save.module#NewDiscussionSavePageModule', name: 'NewDiscussionSavePage', segment: 'new-discussion-save', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notify-parents/notify-parents.module#NotifyParentsPageModule', name: 'NotifyParentsPage', segment: 'notify-parents', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-add-for-grading/player-add-for-grading.module#PlayerAddForGradingPageModule', name: 'PlayerAddForGradingPage', segment: 'player-add-for-grading', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notify-players/notify-players.module#NotifyPlayersPageModule', name: 'NotifyPlayersPage', segment: 'notify-players', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-grading/player-grading.module#PlayerGradingPageModule', name: 'PlayerGradingPage', segment: 'player-grading', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-group-message/player-group-message.module#PlayerGroupMessagePageModule', name: 'PlayerGroupMessagePage', segment: 'player-group-message', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-details/player-details.module#PlayerDetailsPageModule', name: 'PlayerDetailsPage', segment: 'player-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-list-grade-report/player-list-grade-report.module#PlayerListGradeReportPageModule', name: 'PlayerListGradeReportPage', segment: 'player-list-grade-report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-medical-records/player-medical-records.module#PlayerMedicalRecordsPageModule', name: 'PlayerMedicalRecordsPage', segment: 'player-medical-records', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-question/player-question.module#PlayerQuestionPageModule', name: 'PlayerQuestionPage', segment: 'player-question', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-scanner-attendance/player-scanner-attendance.module#PlayerScannerAttendancePageModule', name: 'PlayerScannerAttendancePage', segment: 'player-scanner-attendance', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pregame-rollcall/pregame-rollcall.module#PregameRollcallPageModule', name: 'PregameRollcallPage', segment: 'pregame-rollcall', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rated-perceived/rated-perceived.module#RatedPerceivedPageModule', name: 'RatedPerceivedPage', segment: 'rated-perceived', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/players-dashboard/players-dashboard.module#PlayersDashboardPageModule', name: 'PlayersDashboardPage', segment: 'players-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/read-only-timesheet/read-only-timesheet.module#ReadOnlyTimesheetPageModule', name: 'ReadOnlyTimesheetPage', segment: 'read-only-timesheet', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reviewer-timesheet/reviewer-timesheet.module#ReviewerTimesheetPageModule', name: 'ReviewerTimesheetPage', segment: 'reviewer-timesheet', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rollcall-logs/rollcall-logs.module#RollcallLogsPageModule', name: 'RollcallLogsPage', segment: 'rollcall-logs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rollcalls-players/rollcalls-players.module#RollcallsPlayersPageModule', name: 'RollcallsPlayersPage', segment: 'rollcalls-players', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rollcalls/rollcalls.module#RollcallsPageModule', name: 'RollcallsPage', segment: 'rollcalls', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/scanning/scanning.module#ScanningPageModule', name: 'ScanningPage', segment: 'scanning', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/set-to-go/set-to-go.module#SetToGoPageModule', name: 'SetToGoPage', segment: 'set-to-go', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/set-home-image/set-home-image.module#SetHomeImagePageModule', name: 'SetHomeImagePage', segment: 'set-home-image', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings-home-images/settings-home-images.module#SettingsHomeImagesPageModule', name: 'SettingsHomeImagesPage', segment: 'settings-home-images', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings-profile-statistics/settings-profile-statistics.module#SettingsProfileStatisticsPageModule', name: 'SettingsProfileStatisticsPage', segment: 'settings-profile-statistics', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings-profile-edit/settings-profile-edit.module#SettingsProfileEditPageModule', name: 'SettingsProfileEditPage', segment: 'settings-profile-edit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/severity-details-modal/severity-details-modal.module#SeverityDetailsModalPageModule', name: 'SeverityDetailsModalPage', segment: 'severity-details-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/player-coaching-report/player-coaching-report.module#PlayerCoachingReportPageModule', name: 'PlayerCoachingReportPage', segment: 'player-coaching-report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sms-modal/sms-modal.module#SmsModalPageModule', name: 'SmsModalPage', segment: 'sms-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/startgame-dashboard/startgame-dashboard.module#StartgameDashboardPageModule', name: 'StartgameDashboardPage', segment: 'startgame-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/survey/survey.module#SurveyPageModule', name: 'SurveyPage', segment: 'survey', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/team-list/team-list.module#TeamListPageModule', name: 'TeamListPage', segment: 'team-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/timesheet-adhoc/timesheet-adhoc.module#TimesheetAdhocPageModule', name: 'TimesheetAdhocPage', segment: 'timesheet-adhoc', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/timesheet-dashboard/timesheet-dashboard.module#TimesheetDashboardPageModule', name: 'TimesheetDashboardPage', segment: 'timesheet-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/track-member/track-member.module#TrackMemberPageModule', name: 'TrackMemberPage', segment: 'track-member', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/timesheet/timesheet.module#TimesheetPageModule', name: 'TimesheetPage', segment: 'timesheet', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transport-add-staff/transport-add-staff.module#TransportAddStaffPageModule', name: 'TransportAddStaffPage', segment: 'transport-add-staff', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transport-dashboard/transport-dashboard.module#TransportDashboardPageModule', name: 'TransportDashboardPage', segment: 'transport-dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transport-list/transport-list.module#TransportListPageModule', name: 'TransportListPage', segment: 'transport-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transport-staff-passenger/transport-staff-passenger.module#TransportStaffPassengerPageModule', name: 'TransportStaffPassengerPage', segment: 'transport-staff-passenger', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transport-remove-modal/transport-remove-modal.module#TransportRemoveModalPageModule', name: 'TransportRemoveModalPage', segment: 'transport-remove-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vehicle-details/vehicle-details.module#VehicleDetailsPageModule', name: 'VehicleDetailsPage', segment: 'vehicle-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vehicle-list/vehicle-list.module#VehicleListPageModule', name: 'VehicleListPage', segment: 'vehicle-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vote-for-player/vote-for-player.module#VoteForPlayerPageModule', name: 'VoteForPlayerPage', segment: 'vote-for-player', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vehicle/vehicle.module#VehiclePageModule', name: 'VehiclePage', segment: 'vehicle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-home-new/event-home-new.module#EventHomeNewPageModule', name: 'EventHomeNewPage', segment: 'event-home-new', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_42_ng_lazyload_image__["a" /* LazyLoadImageModule */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '__mydb',
                    driverOrder: ['sqlite', 'websql', 'indexeddb']
                }),
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_14_ng_circle_progress__["a" /* NgCircleProgressModule */],
                __WEBPACK_IMPORTED_MODULE_21_ionic_scrolling_header__["a" /* ScrollingHeaderModule */],
                __WEBPACK_IMPORTED_MODULE_45__pages_alert_dashboard_alert_dashboard_module__["AlertDashboardPageModule"],
                __WEBPACK_IMPORTED_MODULE_46__pages_chat_dashboard_chat_dashboard_module__["ChatDashboardPageModule"],
                __WEBPACK_IMPORTED_MODULE_48__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_50__pages_get_started_get_started_module__["GetStartedPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_event_home_event_home__["a" /* EventHomePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_display_events_display_events__["a" /* DisplayEventsPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_players_dashboard_players_dashboard__["a" /* PlayersDashboardPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_chat_dashboard_chat_dashboard__["a" /* ChatDashboardPage */],
                //EventHomeNewPage,
                __WEBPACK_IMPORTED_MODULE_30__pages_event_home_menu_event_home_menu__["a" /* EventHomeMenuPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_display_events_new_display_events_new__["a" /* DisplayEventsNewPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_message_log_dashboard_message_log_dashboard__["a" /* MessageLogDashboardPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_alert_dashboard_alert_dashboard__["a" /* AlertDashboardPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_push_ngx__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar_ngx__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen_ngx__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_speech_recognition_ngx__["a" /* SpeechRecognition */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_image_picker_ngx__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64_ngx__["a" /* Base64 */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_sms_ngx__["a" /* SMS */],
                __WEBPACK_IMPORTED_MODULE_12__providers_global_global__["a" /* GlobalProvider */],
                // SplashScreen,
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_ngx__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_camera_ngx__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_path_ngx__["a" /* FilePath */],
                // FileTransfer,
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_android_permissions_ngx__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_network_ngx__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_22__providers_event_logger_event_logger__["a" /* EventLoggerProvider */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_email_composer_ngx__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_app_version_ngx__["a" /* AppVersion */],
                // Firebase,
                __WEBPACK_IMPORTED_MODULE_34__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_calendar_ngx__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_36__providers_global_api_global_api__["a" /* GlobalApiProvider */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_deeplinks_ngx__["a" /* Deeplinks */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_geolocation_ngx__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_barcode_scanner_ngx__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_vibration_ngx__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_deeplinks_ngx__["a" /* Deeplinks */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_keyboard_ngx__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_52__ionic_native_secure_storage_ngx__["a" /* SecureStorage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_3__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__display_events_new_display_events_new__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_home_menu_event_home_menu__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__players_dashboard_players_dashboard__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat_dashboard_chat_dashboard__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__message_log_dashboard_message_log_dashboard__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__alert_dashboard_alert_dashboard__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TabsPage = /** @class */ (function () {
    // @ViewChild(Nav) nav:Nav;
    function TabsPage(navParam, app, keyboard, navCtrl, storage, platform) {
        var _this = this;
        this.navParam = navParam;
        this.app = app;
        this.keyboard = keyboard;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.platform = platform;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__event_home_menu_event_home_menu__["a" /* EventHomeMenuPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__display_events_new_display_events_new__["a" /* DisplayEventsNewPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_5__players_dashboard_players_dashboard__["a" /* PlayersDashboardPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_6__chat_dashboard_chat_dashboard__["a" /* ChatDashboardPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_4__settings_settings__["a" /* SettingsPage */];
        this.tab6Root = __WEBPACK_IMPORTED_MODULE_8__message_log_dashboard_message_log_dashboard__["a" /* MessageLogDashboardPage */];
        this.tab7Root = __WEBPACK_IMPORTED_MODULE_9__alert_dashboard_alert_dashboard__["a" /* AlertDashboardPage */];
        this.activatedTab = 0;
        this.isAdmin = false;
        this.isPlayer = true;
        this.isAndroid = false;
        this.isAndroid = platform.is('android');
        this.PlayerMenu = navParam.get('Player_menu');
        this.activatedTab = navParam.get('activatedTab');
        // this.refresh = navParam.get('Refresh');
        console.log("Activated tab", this.activatedTab);
        console.log('this.PlayerMenu', this.PlayerMenu);
        // console.log("this.refresh",this.refresh);
        if (this.PlayerMenu == 'yes') {
            $('.tabs-md .tab-button:nth-child(4)').css('display', 'inherit');
            console.log('inherit');
        }
        else if (this.PlayerMenu == 'no') {
            this.interval = setInterval(function () {
                $('.tabs-md .tab-button:nth-child(4)').css('display', 'none');
                clearInterval(_this.interval);
                console.log('none');
            }, 10);
        }
        console.log('The keyboard is open:', this.keyboard.isOpen());
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
            console.log("Function access level ", _this.FunctionAccess);
            // this.interval=setInterval(()=>{
            //   if(this.FunctionAccess.bottom_player_menu=='yes'){
            //     $('.tabs-md .tab-button:nth-child(3)').css('display','inherit')
            //     clearInterval(this.interval)
            //    }
            //    else if(this.FunctionAccess.bottom_player_menu=='no'){
            //     $('.tabs-md .tab-button:nth-child(3)').css('display','none')
            //     clearInterval(this.interval)
            //    }
            // },10)
            if (_this.FunctionAccess.user_adminLevel == 1 || _this.FunctionAccess.user_adminLevel == 2) {
                _this.isAdmin = true;
                // this.isPlayer =false;
                // this.tabs.getByIndex(3).show = false;
                // this.tabs.getByIndex(2).show = true
                console.log("i'm Admin from tab.ts 88");
                // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','inline-block');
                // $('.tabs-md .tab-button:nth-child(4) .tab-button-icon').css('display','none');
            }
            else if (_this.FunctionAccess.user_adminLevel == 4) {
                _this.isAdmin = false;
                _this.data = 'custom-students1';
                // this.tabs.getByIndex(2).show = false;
                // this.tabs.getByIndex(3).show = true;
                // this.isPlayer = true;
                // $('.tabs-md .tab-button:nth-child(2) .tab-button-icon').css('display','inline-block');
                // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','none');
                console.log("i'm Player from tab.ts 91");
            }
            else {
                _this.isAdmin = false;
                _this.data = 'custom-students1';
                // this.tabs.getByIndex(2).show = false;
                // this.tabs.getByIndex(3).show = true;
                // this.isPlayer = true;
                // $('.tabs-md .tab-button:nth-child(4) .tab-button-icon').css('display','inline-block');
                // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','none');
                console.log("i'm NOthing from tab.ts 91");
            }
        });
        // this.storage.get('Refresh').then((val)=>{
        //   this.refresh = val;
        //   if(this.refresh == true){
        //     console.log("reloading");
        //     // this.navCtrl.setRoot(this.navCtrl.getActive().component())
        //     this.storage.set('Refresh',false);
        //     setTimeout(()=>{
        //       window.location.reload();
        //     },200)
        //   }else{
        //     console.log("not reloading");
        //     // this.storage.set('Refresh',true);
        //   }
        // })
        setTimeout(function () {
            if (_this.FunctionAccess.user_adminLevel == 1 || _this.FunctionAccess.user_adminLevel == 2) {
                _this.isAdmin = true;
                // this.isPlayer =false;
                // this.tabs.getByIndex(3).show = false;
                // this.tabs.getByIndex(2).show = true
                console.log("i'm Admin from tab.ts 88");
                // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','inline-block');
                // $('.tabs-md .tab-button:nth-child(4) .tab-button-icon').css('display','none');
            }
            else if (_this.FunctionAccess.user_adminLevel == 4) {
                _this.isAdmin = false;
                // this.tabs.getByIndex(2).show = false;
                // this.tabs.getByIndex(3).show = true;
                // this.isPlayer = true;
                // $('.tabs-md .tab-button:nth-child(2) .tab-button-icon').css('display','inline-block');
                // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','none');
                console.log("i'm Player from tab.ts 91");
            }
            else {
                _this.isAdmin = false;
                // this.tabs.getByIndex(2).show = false;
                // this.tabs.getByIndex(3).show = true;
                // this.isPlayer = true;
                // $('.tabs-md .tab-button:nth-child(4) .tab-button-icon').css('display','inline-block');
                // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','none');
                console.log("i'm NOthing from tab.ts 91");
            }
        }, 100);
        console.log("Refresh data 123", this.refresh);
    }
    TabsPage.prototype.ionViewWillEnter = function () {
        var _a, _b, _c;
        if (((_a = this.FunctionAccess) === null || _a === void 0 ? void 0 : _a.user_adminLevel) == 1 || ((_b = this.FunctionAccess) === null || _b === void 0 ? void 0 : _b.user_adminLevel) == 2) {
            this.isAdmin = true;
            this.isPlayer = false;
            console.log("i'm Admin from tab.ts 88");
        }
        else if (((_c = this.FunctionAccess) === null || _c === void 0 ? void 0 : _c.user_adminLevel) == 4) {
            this.isAdmin = false;
            this.isPlayer = true;
            console.log("i'm Player from tab.ts 91");
        }
        else {
            this.isAdmin = false;
            this.isPlayer = true;
            console.log("i'm NOthing from tab.ts 91");
        }
    };
    TabsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('Refresh').then(function (val) {
            var refresh = val;
            _this.refresh = refresh;
            if (!_this.refresh) {
                _this.refresh = true;
                console.log("here 165");
                _this.storage.set('Refresh', _this.refresh);
                _this.function();
            }
            else if (!val) {
                console.log("Nothing");
            }
        });
    };
    TabsPage.prototype.function = function () {
        var _this = this;
        setTimeout(function () {
            console.log("Loading");
            // window.location.reload();
            _this.navCtrl.setRoot(_this.navCtrl.getActiveChildNav().component);
            // window.location.reload();
        }, 300);
    };
    // ngAfterViewInit() {
    //   setTimeout(() => {
    //   console.log("this.paymentTabs 84",this.paymentTabs);
    //   // console.log("Selected Tab 85",this.paymentTabs.selectedIndex);
    //   // this.paymentTabs.select(0);
    //   }, 500);
    //   if(this.paymentTabs.selectedIndex == 2){
    //     console.log("selected tab is 0");
    //   }
    //   // this.player = false;
    //   this.admin = true;
    // }
    TabsPage.prototype.keyboardCheck = function () {
        console.log('The keyboard is open:', this.keyboard.isOpen());
    };
    TabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        console.log('ionViewDidLoad TabsPage');
        // if(this.FunctionAccess.user_adminLevel == 1 || this.FunctionAccess.user_adminLevel == 2 ){
        //   this.isAdmin = true;
        //   // this.paymentTabs.select(3)
        //   console.log("i'm Admin from tab.ts 88");
        // }else if(this.FunctionAccess.user_adminLevel == 4){
        //   this.isAdmin = false;
        //   console.log("i'm Player from tab.ts 91");
        // }else{
        //   this.isAdmin = false;
        //   console.log("i'm Nothing from tab.ts 91");
        // }
        this.storage.get('Refresh').then(function (val) {
            var refresh = val;
            _this.refresh = refresh;
            // if(val){
            //  this.refresh = false;
            //  console.log("here 165");
            //  this.storage.set('Refresh',this.refresh);
            //   this.function()
            // }else if(!val){
            //   console.log("Nothing")
            // }
        });
    };
    TabsPage.prototype.getTabId = function ($ev) {
        console.log("tab id =-=--=-=-=>121", $ev.id);
        if ($ev.id == 't0-4') {
            $('.tabbar').addClass('hideTaskbar');
        }
        else {
            $('.tabbar').removeClass('hideTaskbar');
        }
        $ev.setRoot($ev.root);
        console.log("root 136", $ev.root);
        // if($('.tabs-md .tab-button[aria-selected=true]:nth-child(3) .tab-button-icon')){
        //   console.log("jehljkfhaljhajklsdjkasjkdaks=-=-=-=-=-91")
        // }
    };
    TabsPage.prototype.events = function () {
        console.log('Events');
    };
    TabsPage.prototype.ionViewDidEnter = function () {
        // let tab=this.navCtrl.getActive()//Returns the currently selected tab
        // this.storage.get('Refresh').then(val=>{
        //   var refresh = val;
        //   this.refresh = refresh
        //   if(val){
        //    this.refresh = false;
        //    console.log("here 165");
        //    this.storage.set('Refresh',this.refresh);
        //     this.function()
        //   }else if(!val){
        //     console.log("Nothing")
        //   }
        // });
        // console.log("hi",this.refresh)
        if (this.PlayerMenu) {
            this.function();
        }
        else if (!this.PlayerMenu) {
            console.log("Nothing");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Tabs */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Tabs */])
    ], TabsPage.prototype, "tabs", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tabs',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/tabs/tabs.html"*/'<ion-tabs selectedIndex={{activatedTab}} (ionChange)=\'getTabId($event)\' class="tabs-md">\n  <ion-tab class=\'home_menu\' [root]=\'tab1Root\' tabTitle=" " tabIcon="custom-home"></ion-tab>\n  <ion-tab class=\'event_menu\' [root]=\'tab2Root\' tabTitle=" " tabIcon="custom-events"></ion-tab>\n  <ion-tab class=\'students_menu\' [root]=\'tab3Root\' tabTitle=" " tabIcon="custom-students"   ></ion-tab>\n  <!-- <ion-tab class=\'team_mates_menu\' [root]=\'tab8Root\' tabTitle=" " tabIcon="custom-students" [show]="FunctionAccess?.user_adminLevel == 4"></ion-tab> -->\n  <ion-tab class=\'chat_menu\' [root]=\'tab4Root\' tabTitle=" " tabIcon="custom-chat" tabBadge="..."></ion-tab>\n  <ion-tab class=\'more_menu\' [root]=\'tab5Root\' tabTitle=" " tabIcon="custom-more" ></ion-tab>\n  <ion-tab class=\'more_menu\' [root]=\'tab6Root\' tabTitle=" " tabIcon="custom-more" ></ion-tab>\n  <ion-tab class=\'more_menu\' [root]=\'tab7Root\' tabTitle=" " tabIcon="custom-more" ></ion-tab>\n</ion-tabs>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventLoggerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase_analytics__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventLoggerProvider = /** @class */ (function () {
    function EventLoggerProvider(http) {
        this.http = http;
    }
    EventLoggerProvider.prototype.DashboardPlayerReason = function (name, value) {
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */].logEvent(name, { pram: value });
    };
    EventLoggerProvider.prototype.EventPlayerReason = function (name, value) {
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */].logEvent(name, { pram: value });
    };
    EventLoggerProvider.prototype.CoachArrowAttd_Mark = function (name, value) {
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */].logEvent(name, { pram: value });
    };
    EventLoggerProvider.prototype.CoachRadioButtonAttd_Mark = function (name, value) {
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */].logEvent(name, { pram: value });
    };
    EventLoggerProvider.prototype.NextPreviousIcons = function (name, value) {
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */].logEvent(name, { pram: value });
    };
    EventLoggerProvider.prototype.EventBottomIcons = function (name, value) {
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */].logEvent(name, { pram: value });
    };
    EventLoggerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], EventLoggerProvider);
    return EventLoggerProvider;
}());

//# sourceMappingURL=event-logger.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetStartedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser_ngx__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_buffer__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { Firebase } from '@ionic-native/firebase/ngx';




var GetStartedPage = /** @class */ (function () {
    function GetStartedPage(navCtrl, navParams, http, storage, global, gFn, iab, loadingCtrl, appVersion, plt, 
    // private firebase: Firebase,
    formBuilder, global_api) {
        var _this_1 = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.gFn = gFn;
        this.iab = iab;
        this.loadingCtrl = loadingCtrl;
        this.appVersion = appVersion;
        this.plt = plt;
        this.formBuilder = formBuilder;
        this.global_api = global_api;
        this.DeviceToken = '';
        this.SSODetails = {};
        this.storage.get("mobileAssets").then(function (res) {
            if (res) {
                _this_1.logoURL = res.App_icon;
            }
            else {
                _this_1.logoURL = "assets/images/jtclogo-5.svg";
            }
        });
        this.appVersion.getAppName().then(function (Appname) {
            _this_1.AppName = Appname;
        });
        this.loginForm = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_8__angular_forms__["Validators"].required),
            password: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_8__angular_forms__["Validators"].required),
            app_name: this.global.App_id
        });
        // this.firebase.getToken()
        // .then(token => {
        //   console.log(token);
        //   this.DeviceToken=token
        // })
        this.storage.get('registerDeviceToken').then(function (val) {
            if (val && val.token && val.platform) {
                console.log(val.token);
                _this_1.DeviceToken = val.token;
            }
        });
        if (plt.is('ios')) {
            this.DeviceType = 'apple';
        }
        else if (plt.is('android')) {
            this.DeviceType = 'android';
        }
        this.storage.get('SSODetails').then(function (val) {
            _this_1.SSODetails = val;
            console.log(_this_1.SSODetails);
        });
    }
    GetStartedPage.prototype.goToLogin = function () {
        this.navCtrl.push('LoginPage');
    };
    GetStartedPage.prototype.loadSSOBrowser = function (SSO_LOGIN_URL) {
        var _this_1 = this;
        var browserRef = this.iab.create(SSO_LOGIN_URL, '_blank', 'clearcache=yes,clearsesioncache=yes');
        console.log("SSO_LObrowserRefGIN_URL", browserRef);
        browserRef.on('loadstart').subscribe(function (event) {
            // URL structure example: https://sso.gojaro.com/ssologin.cfm?cred=Q2hhQmFiMjE6VXQ3bjk%3D
            if ((event.url).startsWith("https://sso.gojaro.com/ssologin.cfm?cred=")) {
                var parts = event.url.split('=');
                // read names and values
                var cred = new __WEBPACK_IMPORTED_MODULE_9_buffer__["Buffer"](decodeURIComponent(parts[1]), 'base64').toString('ascii');
                var strArr = cred.split(':');
                browserRef.close();
                _this_1.loginForm.setValue({ 'username': strArr[0], 'password': strArr[1], 'app_name': _this_1.global.App_id });
                _this_1.loginSubmit();
            }
        });
    };
    GetStartedPage.prototype.checkRequestsCanBeMade = function (performRequest) {
        var _this_1 = this;
        this.http.post('https://api.gojaro.com/rest/jaro/' + 'users/validateUser', new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]({}))
            .subscribe(function (_) {
            performRequest();
        }, function (_) {
            _this_1.gFn.presentAlert('Error', "Error getting while connecting to internet");
        });
    };
    GetStartedPage.prototype.gotoSSO = function () {
        var _this = this;
        function performRequest() {
            var uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            var SSO_LOGIN_URL = _this.SSODetails.SSOURL + uid;
            console.log("SSO_LOGIN_URL", SSO_LOGIN_URL);
            _this.loadSSOBrowser(SSO_LOGIN_URL);
        }
        this.checkRequestsCanBeMade(performRequest);
    };
    GetStartedPage.prototype.loginSubmit = function () {
        // let loading = this.loadingCtrl.create();
        // loading.present();
        var _this_1 = this;
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]({ fromObject: this.loginForm.value });
        this.http.post(this.global.APIURL + 'users/validateUser', loginData)
            .subscribe(function (response) {
            // loading.dismiss();
            if (response.SUCCESS && typeof response.VALIDATEUSER !== 'undefined' && response.VALIDATEUSER.length > 0) {
                var loggedInUserData_1 = response.VALIDATEUSER[0];
                loggedInUserData_1 = Object.keys(loggedInUserData_1).reduce(function (c, k) { return (c[k.toUpperCase()] = loggedInUserData_1[k], c); }, {});
                loggedInUserData_1['LOGGEDIN_USER_PERSON_ID'] = loggedInUserData_1['PERSON_ID'];
                loggedInUserData_1['LOGGEDIN_USER_FIRST_NAME'] = loggedInUserData_1['FIRST_NAME'];
                loggedInUserData_1['LOGGEDIN_USER_LAST_NAME'] = loggedInUserData_1['LAST_NAME'];
                loggedInUserData_1['AUTH_TOKEN'] = response['TOKEN'];
                _this_1.global_api.loginUserToken = loggedInUserData_1['AUTH_TOKEN'];
                if (typeof response.SIBLINGS !== 'undefined' && response.SIBLINGS.length > 0) {
                    loggedInUserData_1['siblings'] = response.SIBLINGS;
                }
                _this_1.setDeviceData(loggedInUserData_1['PERSON_ID']);
                _this_1.storage.set('loggedInUserData', loggedInUserData_1);
                _this_1.storage.get('isSetUp').then(function (val) {
                    if (val) {
                        _this_1.navCtrl.push('EventHomePage');
                    }
                    else {
                        _this_1.navCtrl.push('WelcomePage');
                    }
                });
            }
            else {
                _this_1.gFn.presentAlert('Error', 'Sorry no matching result found');
            }
        }, function (error) {
            // loading.dismiss();
            _this_1.gFn.presentAlert('Error', "Error getting while connecting to internet");
        });
    };
    GetStartedPage.prototype.setDeviceData = function (person_id) {
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', person_id)
            .set('deviceType', this.DeviceType)
            .set('token', this.DeviceToken)
            .set('logged', '1')
            .set('appVer_major', '1')
            .set('appVer_minor', '0')
            .set('appVer_maintenance', '0')
            .set('app_name', this.AppName);
        this.http.post(this.global.APIURL + "push/registerDeviceWithPersonId", Data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
        }, function (error) {
        });
    };
    GetStartedPage.prototype.gotoForgetPassword = function () {
        this.navCtrl.push('ForgetPage');
    };
    GetStartedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-get-started',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/get-started/get-started.html"*/'<ion-content>\n  <section class="main bg-grey-gradient">\n    <div class="Logo-Header">\n      <img class="logo" [src]="logoURL" alt="Logo" style="width:190px"/>\n      <!-- <p style="margin-top:35px" (click)="gotoSSO()">Sign in</p> -->\n      <p style="margin-top:35px" (click)="goToLogin()">Sign in</p>\n      <button type="button" class="btn-login lg-btn" (click)="gotoSSO()">With my school credentials</button>\n      <!-- <p class="mt-20"  (click)="goToLogin();">With JARO credentials</p> -->\n\n   <!--- </div>(click)="gotoSSO()"\n    <div class="brand-logo v-center" >\n      <div class="login-circle" ></div>-->\n    </div>\n\n    <div class="footer-item v-bottom" >\n     <!--- <a class="title" href="javascript:void(0);" (click)="goToLogin();">Login using JARO credentials</a>-->\n      <p class="mt-20"  (click)="goToLogin();">With JARO credentials</p>\n      <!----<div class="links">\n        <a href="javascript:void(0)"><img class="play-vid" src="assets/images/play-video.svg" alt=""/> Watch a quick video introduction</a>\n      </div>-->\n    </div>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/get-started/get-started.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_version_ngx__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], GetStartedPage);
    return GetStartedPage;
}());

//# sourceMappingURL=get-started.js.map

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SafeStylePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return bloodGroupPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return swimmingAbilityPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the PipesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var PipesPipe = /** @class */ (function () {
    function PipesPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    PipesPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return value.toLowerCase();
    };
    PipesPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'pipes',
        })
    ], PipesPipe);
    return PipesPipe;
}());

var SafeStylePipe = /** @class */ (function () {
    function SafeStylePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeStylePipe.prototype.transform = function (value) {
        return this.sanitizer.bypassSecurityTrustStyle(value);
    };
    SafeStylePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'safeStyle' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SafeStylePipe);
    return SafeStylePipe;
}());

var bloodGroupPipe = /** @class */ (function () {
    function bloodGroupPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    bloodGroupPipe.prototype.transform = function (value) {
        var bg = '';
        switch (value.toString()) {
            case '1': {
                bg = 'A+';
                break;
            }
            case '2': {
                bg = 'A-';
                break;
            }
            case '3': {
                bg = 'B+';
                break;
            }
            case '4': {
                bg = 'B-';
                break;
            }
            case '5': {
                bg = 'AB+';
                break;
            }
            case '6': {
                bg = 'AB-';
                break;
            }
            case '7': {
                bg = 'O+';
                break;
            }
            case '8': {
                bg = 'O-';
                break;
            }
            case '9': {
                bg = 'Unknown';
                break;
            }
            default: {
                bg = '';
                break;
            }
        }
        return bg;
    };
    bloodGroupPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'bloodGroup' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], bloodGroupPipe);
    return bloodGroupPipe;
}());

var swimmingAbilityPipe = /** @class */ (function () {
    function swimmingAbilityPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    swimmingAbilityPipe.prototype.transform = function (value) {
        var sa = '';
        switch (value.toString()) {
            case '1': {
                sa = 'Cannot Swim';
                break;
            }
            case '2': {
                sa = 'Weak Swimmer';
                break;
            }
            case '3': {
                sa = 'Fair Swimmer';
                break;
            }
            case '4': {
                sa = 'Competent Swimmer';
                break;
            }
            case '5': {
                sa = 'Strong Swimmer';
                break;
            }
            default: {
                sa = '';
                break;
            }
        }
        return sa;
    };
    swimmingAbilityPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'swimmingFilter' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], swimmingAbilityPipe);
    return swimmingAbilityPipe;
}());

//# sourceMappingURL=pipes.js.map

/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar_ngx__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen_ngx__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_push_ngx__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_event_attendance_event_attendance__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_players_dashboard_players_dashboard__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_display_events_new_display_events_new__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_message_log_dashboard_message_log_dashboard__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_deeplinks_ngx__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_welcome_welcome__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








// import { Firebase } from '@ionic-native/firebase/ngx';


// import { Deeplinks } from '@ionic-native/deeplinks/ngx';
// import { Badge }from '@ionic-native/badge/ngx';








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, events, storage, splashScreen, push, http, global, alert, appVersion, global_api, modalCtrl, deeplinks, app, gFn) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.events = events;
        this.storage = storage;
        this.splashScreen = splashScreen;
        this.push = push;
        this.http = http;
        this.global = global;
        this.alert = alert;
        this.appVersion = appVersion;
        this.global_api = global_api;
        this.modalCtrl = modalCtrl;
        this.deeplinks = deeplinks;
        this.app = app;
        this.gFn = gFn;
        this.rootPage = 'LoginPage';
        this.AppName = '';
        this.packageName = '';
        this.seconds = 0;
        platform.ready().then(function () { return __awaiter(_this, void 0, void 0, function () {
            var success, error;
            var _this = this;
            return __generator(this, function (_a) {
                //this.getMobileAssets();
                // statusBar.backgroundColorByHexString('#ffffff');
                // splashScreen.hide();
                this.appVersion.getPackageName().then(function (packageName) {
                    _this.packageName = packageName;
                    // this.global.App_id = this.packageName;
                });
                success = function (status) {
                    console.log('Message: ' + status);
                };
                error = function (status) {
                    console.log('Error: ' + status);
                };
                if (typeof window.CacheClear !== "undefined") {
                    window.CacheClear(success, error);
                }
                this.appVersion.getAppName().then(function (Appname) {
                    _this.AppName = Appname;
                });
                this.initializeApp();
                this.pushNotification();
                setTimeout(function () {
                    _this.checkUpdateInformation();
                    platform.resume.subscribe(function (e) {
                        if (typeof window.CacheClear !== "undefined") {
                            window.CacheClear(success, error);
                        }
                        _this.checkUpdateInformation();
                    });
                }, 500);
                return [2 /*return*/];
            });
        }); });
        events.subscribe('json:query', function (jsonObj) {
            return _this.jsonToQuery(jsonObj);
        });
        if (this.platform.exitApp) {
            console.log("app closed", this.platform.exitApp);
            this.storage.remove('filterTeam');
            this.storage.remove('bucket');
            this.storage.remove('divisionBuckets');
        }
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.statusBar.overlaysWebView(false);
            _this.getMobileAssets();
            _this.setupPage(0);
            if (_this.platform.is('cordova')) {
                _this.deepLink();
            }
        });
    };
    MyApp.prototype.setupPage = function (tab) {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            if (val) {
                _this.storage.get('isSetUp').then(function (val1) {
                    _this.seconds = -1;
                    clearInterval(null);
                    if (val1) {
                        _this.getSSOaccess().then(function (response) {
                            console.log("Called ===>", response);
                            if (response) {
                                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */]);
                                _this.splashScreen.hide();
                            }
                            else {
                                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */], { activatedTab: tab });
                                _this.splashScreen.hide();
                            }
                        });
                    }
                    else {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_17__pages_welcome_welcome__["a" /* WelcomePage */], { activatedTab: tab });
                        _this.splashScreen.hide();
                    }
                });
            }
            else {
                _this.getSSOaccess().then(function (response) {
                    if (response && _this.SSOEnabled == 1) {
                        _this.nav.setRoot('GetStartedPage');
                        _this.splashScreen.hide();
                    }
                    else {
                        _this.nav.setRoot('LoginPage');
                        _this.splashScreen.hide();
                    }
                });
            }
        });
    };
    MyApp.prototype.getSSOaccess = function () {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            if (val == null) {
                _this.loggedInUserData = '';
            }
            else {
                _this.loggedInUserData = val;
            }
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': this.global.App_id
        });
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]()
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "teams/getClubDetails", Data, { headers: headers })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    var SSODetails = _this.events.publish('json:query', data.GETCLUBDETAILS)[0][0];
                    _this.SSOEnabled = SSODetails && SSODetails.ISSSOENABLED ? SSODetails.ISSSOENABLED : 0;
                    _this.SSOUrl = SSODetails && SSODetails.SSOURL ? SSODetails.SSOURL : '';
                    // var SSODetails={
                    //   SSOEnabled:this.SSOEnabled,
                    //   SSOUrl:this.SSOUrl
                    // }
                    console.log("SSO details : ", SSODetails);
                    _this.storage.set('SSODetails', SSODetails);
                    resolve(true);
                }
                else {
                    resolve(false);
                    _this.gFn.presentToast('Contact Sports department for more Details');
                }
            }, function (error) {
                resolve(false);
                console.log("Error", error);
                _this.gFn.presentToast('Connection problem');
            });
        });
    };
    MyApp.prototype.deepLink = function () {
        var _this = this;
        this.deeplinks.route({
            '/home': __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
            '/event-attendance': __WEBPACK_IMPORTED_MODULE_11__pages_event_attendance_event_attendance__["a" /* EventAttendancePage */],
            '/players-dashboard': __WEBPACK_IMPORTED_MODULE_12__pages_players_dashboard_players_dashboard__["a" /* PlayersDashboardPage */],
            '/display-events': __WEBPACK_IMPORTED_MODULE_13__pages_display_events_new_display_events_new__["a" /* DisplayEventsNewPage */],
            '/message-log-dashboard': __WEBPACK_IMPORTED_MODULE_14__pages_message_log_dashboard_message_log_dashboard__["a" /* MessageLogDashboardPage */]
        }).subscribe(function (match) {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            var tabIndex = 0;
            var pageName = '';
            if (match.$link.path.indexOf('players') > -1) {
                tabIndex = 2;
                pageName = 'PlayersDashboardPage';
            }
            else if (match.$link.path.indexOf('event') > -1) {
                tabIndex = 1;
                pageName = 'DisplayEventsNewPage';
                if (match.$link.path.indexOf('event-attendance') > -1) {
                    pageName = 'EventAttendancePage';
                }
            }
            else if (match.$link.path.indexOf('message-log-dashboard') > -1) {
                tabIndex = 5;
                pageName = 'MessageLogDashboardPage';
            }
            if (tabIndex == 0) {
                // this.navCtrl.setRoot(match.$route, match.$args);
                _this.app.getActiveNav().setRoot(match.$route, match.$args);
            }
            else {
                setTimeout(function () {
                    _this.app.getRootNav().getActiveChildNav().select(tabIndex)
                        .then(function (data) {
                        _this.app.getActiveNav().setRoot(pageName, match.$args);
                    });
                }, 500);
            }
        }, function (nomatch) {
            // nomatch.$link - the full link data
            console.error('Got a deeplink that didn\'t match', nomatch);
        });
    };
    MyApp.prototype.getMobileAssets = function () {
        var _this = this;
        new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]()
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "teams/getMobileAssets", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data && data.ASSETS) {
                    _this.storage.set("mobileAssets", data.ASSETS[0]);
                    _this.SplashScreen = data.ASSETS[0].Splash_screen;
                    _this.homeScreen = data.ASSETS[0].Theme.Home_screen_Img.replace(/ /g, "%20").toString();
                    _this.global_api.splash = data.ASSETS[0].Splash_screen;
                    resolve(true);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    MyApp.prototype.checkUpdateInformation = function () {
        var _this = this;
        console.trace("checkUpdateInformation");
        new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]()
                .set('app_name', _this.global.App_id);
            _this.http.post(_this.global.APIURL + "teams/getVersionDetails", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    var versionDetails_1 = _this.events.publish('json:query', data.GETVERSIONDETAILS)[0][0];
                    _this.appVersion.getVersionNumber().then(function (Appversion) {
                        if (_this.platform.is("android")) {
                            _this.storage.get('isSkippedVersion').then(function (val) {
                                if (val && val.length > 0) {
                                    if (val != versionDetails_1.APPVERSIONLATESTANDROID) {
                                        _this.checkAndroid(Appversion, versionDetails_1);
                                    }
                                    else {
                                        console.log("Skipped update for android: " + versionDetails_1.APPVERSIONLATESTIOS);
                                    }
                                }
                                else {
                                    _this.checkAndroid(Appversion, versionDetails_1);
                                }
                            }, function (reason) {
                                _this.checkAndroid(Appversion, versionDetails_1);
                            });
                        }
                        else if (_this.platform.is("ios")) {
                            _this.storage.get('isSkippedVersion').then(function (val) {
                                if (val && val.length > 0) {
                                    if (val != versionDetails_1.APPVERSIONLATESTIOS) {
                                        _this.checkIOS(Appversion, versionDetails_1);
                                    }
                                    else {
                                        console.log("Skipped update for iOS: " + versionDetails_1.APPVERSIONLATESTIOS);
                                    }
                                }
                                else {
                                    _this.checkIOS(Appversion, versionDetails_1);
                                }
                            }, function (reason) {
                                _this.checkIOS(Appversion, versionDetails_1);
                            });
                        }
                    }, function (err) { });
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    MyApp.prototype.checkIOS = function (Appversion, versionDetails) {
        var needUpdate = this.checkIosVersion(Appversion, versionDetails);
        if (needUpdate && versionDetails.APP_ID_IOS > 0) {
            window.open("https://itunes.apple.com/us/app/urbanspoon/id" + versionDetails.APP_ID_IOS, '_system', 'location=yes');
            this.platform.exitApp();
        }
    };
    MyApp.prototype.checkAndroid = function (Appversion, versionDetails) {
        var needUpdate = this.checkAndroidVersion(Appversion, versionDetails);
        if (needUpdate) {
            window.open("market://details?id=" + this.global.App_id, '_system', 'location=yes');
            this.platform.exitApp();
        }
    };
    MyApp.prototype.checkAndroidVersion = function (appVersion, versionDetails) {
        var _this = this;
        var compared = this.CheckVersion(appVersion, versionDetails.APPVERSIONMINANDROID, versionDetails.APPVERSIONLATESTANDROID);
        var msg = "";
        if (compared == 2) {
            msg = this.AppName + " has been updated and the old version is no longer available. To continue using " + this.AppName + ", please update now.";
            this.forceUpdateAlert("Update Required", msg, "forceUpdate").then(function (needUpdate) {
                if (needUpdate) {
                    window.open("market://details?id=" + _this.global.App_id, '_system', 'location=yes');
                    _this.platform.exitApp();
                }
            });
        }
        else if (compared == 1) {
            msg = this.AppName + " has been updated and the old version is no longer available. To continue using " + this.AppName + ", please update now.";
            this.confirmUpdateAlert("Update Required", msg, "forceUpdate").then(function (willUpdate) {
                if (willUpdate == true) {
                    window.open("market://details?id=" + _this.global.App_id, '_system', 'location=yes');
                    _this.platform.exitApp();
                }
                else {
                    _this.storage.set('isSkippedVersion', versionDetails.APPVERSIONLATESTANDROID);
                    return false;
                }
            });
        }
        else
            return false;
    };
    MyApp.prototype.checkIosVersion = function (appVersion, versionDetails) {
        var _this = this;
        var compared = this.CheckVersion(appVersion, versionDetails.APPVERSIONMINIOS, versionDetails.APPVERSIONLATESTIOS);
        var msg = "";
        if (compared == 2) {
            msg = this.AppName + " has been updated and the old version is no longer available. To continue using " + this.AppName + ", please update now.";
            this.forceUpdateAlert("Update Required", msg, "forceUpdate").then(function (needUpdate) {
                if (needUpdate && versionDetails.APP_ID_IOS > 0) {
                    window.open("https://itunes.apple.com/us/app/urbanspoon/id" + versionDetails.APP_ID_IOS, '_system', 'location=yes');
                    _this.platform.exitApp();
                }
            });
        }
        else if (compared == 1) {
            msg = this.AppName + " has been updated and the old version is no longer available. To continue using " + this.AppName + ", please update now.";
            this.confirmUpdateAlert("Update Required", msg, "forceUpdate").then(function (willUpdate) {
                if (willUpdate == true) {
                    window.open("https://itunes.apple.com/us/app/urbanspoon/id" + versionDetails.APP_ID_IOS, '_system', 'location=yes');
                    _this.platform.exitApp();
                }
                else {
                    _this.storage.set('isSkippedVersion', versionDetails.APPVERSIONLATESTIOS);
                    return false;
                }
            });
        }
        else
            return false;
    };
    MyApp.prototype.CheckVersion = function (appVersion, minVersion, currentVersion) {
        if (minVersion == null)
            minVersion = "";
        if (currentVersion == null)
            currentVersion = "";
        if (minVersion.length == 0 && currentVersion.length == 0) {
            return 0;
        }
        else {
            var appVersionArr = ["0", "0", "0"];
            var minVersionArr = ["0", "0", "0"];
            var curVersionArr = ["0", "0", "0"];
            appVersionArr = appVersion.split(".");
            if (minVersion.length > 0)
                minVersionArr = minVersion.split(".");
            if (currentVersion.length > 0)
                curVersionArr = currentVersion.split(".");
            if (this.VersionIsHigher(minVersionArr, appVersionArr))
                return 2;
            else if (this.VersionIsHigher(curVersionArr, appVersionArr))
                return 1;
            return 0;
        }
    };
    MyApp.prototype.VersionIsHigher = function (v1, v2) {
        if (v1.length == v2.length) {
            for (var i = 0; i < v1.length; i++) {
                if (Number(v1[i]) > Number(v2[i]))
                    return true;
                if (Number(v1[i]) < Number(v2[i]))
                    return false;
            }
        }
        return false;
    };
    MyApp.prototype.forceUpdateAlert = function (Title, SubTitle, cssClass) {
        var _this = this;
        if (cssClass === void 0) { cssClass = ''; }
        return new Promise(function (resolve) {
            var alert = _this.alert.create({
                title: Title,
                subTitle: SubTitle,
                cssClass: cssClass,
                enableBackdropDismiss: false,
                buttons: [{
                        text: 'Update',
                        handler: function () {
                            resolve(true);
                        }
                    }]
            });
            alert.present(alert);
        });
    };
    MyApp.prototype.confirmUpdateAlert = function (Title, SubTitle, cssClass) {
        var _this = this;
        if (cssClass === void 0) { cssClass = ''; }
        return new Promise(function (resolve) {
            var alert = _this.alert.create({
                title: Title,
                subTitle: SubTitle,
                cssClass: cssClass,
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Skip',
                        role: 'cancel',
                        cssClass: 'cancel',
                        handler: function () {
                            resolve(false);
                        }
                    },
                    {
                        text: 'Update',
                        handler: function () {
                            resolve(true);
                        }
                    }
                ]
            });
            alert.present(alert);
        });
    };
    MyApp.prototype.jsonToQuery = function (jsonObj) {
        var data = jsonObj.DATA;
        var columns = jsonObj.COLUMNS;
        var queryObj = {};
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                queryObj[key] = {};
                for (var count in data[key]) {
                    if (data[key].hasOwnProperty(count)) {
                        queryObj[key][columns[count]] = data[key][count];
                    }
                }
            }
        }
        return queryObj;
    };
    MyApp.prototype.pushNotification = function () {
        var _this = this;
        var isPlatform;
        if (this.platform.is("ios")) {
            isPlatform = 'ios';
        }
        else if (this.platform.is("android")) {
            isPlatform = 'android';
        }
        else {
            isPlatform = 'cordova';
        }
        var options = {
            android: {
                senderID: '352512629670',
                iconColor: '#ecb51c',
                sound: true,
                vibrate: true,
                clearBadge: true,
                clearNotifications: true,
                forceShow: true
            },
            ios: {
                alert: true,
                badge: true,
                sound: true,
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            console.log("notification :", notification);
        });
        pushObject.on('registration').subscribe(function (registration) {
            console.log("registration : ", registration.registrationId);
            var registerDevice = {
                token: registration.registrationId,
                platform: isPlatform
            };
            if (registration) {
                _this.storage.set('registerDeviceToken', registerDevice);
            }
        });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */]),
        __metadata("design:type", Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/app/app.html"*/'<img style="display: none !important;" [src]="SplashScreen">\n<img style="display: none !important;" [src]="homeScreen">\n<img style="display: none !important;" [src]="this.global_api.splash">\n<ion-nav #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar_ngx__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen_ngx__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_push_ngx__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_version_ngx__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_deeplinks_ngx__["a" /* Deeplinks */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_16__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[350]);
//# sourceMappingURL=main.js.map