webpackJsonp([45],{

/***/ 810:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewDiscussionListPageModule", function() { return NewDiscussionListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_discussion_list__ = __webpack_require__(912);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewDiscussionListPageModule = /** @class */ (function () {
    function NewDiscussionListPageModule() {
    }
    NewDiscussionListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__new_discussion_list__["a" /* NewDiscussionListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__new_discussion_list__["a" /* NewDiscussionListPage */]),
            ],
        })
    ], NewDiscussionListPageModule);
    return NewDiscussionListPageModule;
}());

//# sourceMappingURL=new-discussion-list.module.js.map

/***/ }),

/***/ 912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewDiscussionListPage; });
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
 * Generated class for the NewDiscussionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewDiscussionListPage = /** @class */ (function () {
    function NewDiscussionListPage(navCtrl, navParams, storage, global, http, loadingCtrl, speechRecognition, toastCtrl, gFn, plt, keyboard, global_api) {
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
        this.plt = plt;
        this.keyboard = keyboard;
        this.global_api = global_api;
        this.chats = [];
        this.chatGroups = [];
        this.searchData = [];
        this.searchShow = 'none';
        this.showHideOverview = '';
        this.chatIcon = 'assets/images/chat.png';
        this.afterSearch = false;
        this.filtering = false;
        this.divisionIds = [];
        this.sportIds = [];
        this.selectedTeams = [];
        this.client_ids = [];
        this.childIds = [];
        this.roles = [];
        this.isFirstFilter = true;
        this.mBottom = "";
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.navCtrl.pop();
            });
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            //this.selectedTeams.push(val.SELECTEDTEAM);
            _this.getDefaultData(_this.afterSearch);
            _this.getFilterDetails().then(function (x) {
                _this.checkFilterIsActive();
            });
        });
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
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
            }
        });
        this.storage.get('filterRole').then(function (val) {
            if (val != null) {
                _this.roles = val;
            }
        });
    }
    NewDiscussionListPage.prototype.checkFilterIsActive = function () {
        setTimeout(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__('page-new-discussion-list .filter_overlay .active').length) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.doubleArrow').addClass('active');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.doubleArrow').removeClass('active');
            }
        }, 100);
    };
    NewDiscussionListPage.prototype.getDefaultData = function (afterSearch) {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            _this.firstName = val.FIRST_NAME;
            _this.lastName = val.LAST_NAME;
            _this.personId = val.PERSON_ID;
            _this.selectedTeam = val.SELECTEDTEAM;
            _this.team_id = val.TEAM_ID;
            _this.clientId = val.CLIENT_ID;
            var searchVal = __WEBPACK_IMPORTED_MODULE_5_jquery__("page-new-discussion-list #search").val();
            var chatData = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('personId', _this.personId)
                .set('teamIds', JSON.stringify(_this.selectedTeams))
                .set('roles', JSON.stringify(_this.roles))
                .set('app_name', _this.global.App_id)
                .set('searchVal', searchVal);
            var loading = _this.loadingCtrl.create();
            if (afterSearch == false) {
                loading.present();
            }
            _this.http.post(_this.global.APIURL + 'messages/getChatPlayerList', chatData, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                if (afterSearch == false) {
                    loading.dismiss();
                }
                if (response.SUCCESS) {
                    var chats = response.CHATPLAYERLIST;
                    _this.chats = [];
                    for (var key in chats) {
                        _this.chats.push(chats[key]);
                    }
                }
            }, function (error) {
                if (afterSearch == false) {
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
    };
    NewDiscussionListPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    NewDiscussionListPage.prototype.viewChat = function (group_id, chat_person_name, photoPath, char_Person_id, lastName, ev) {
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
            clientId: this.clientId
        };
        this.navCtrl.push('ChatViewPage', { data: chatInfo });
    };
    NewDiscussionListPage.prototype.viewGroupChat = function (group_id, team_id, group_type, photo, name) {
        var chatInfo = {
            from: 1,
            to: 10,
            person_id: this.personId,
            selectedTeam: this.selectedTeam,
            groupid: group_id,
            teamid: team_id,
            grouptype: group_type,
            flag: 1,
            userPhoto: '',
            groupName: name,
            accFirstName: this.firstName,
            accLastName: this.lastName,
            clientId: this.clientId
        };
        this.navCtrl.push('GroupChatViewPage', { data: chatInfo });
    };
    NewDiscussionListPage.prototype.search = function (event) {
        var _this = this;
        if (event.key === "Enter") {
            return false;
        }
        this.searchData.length = 0;
        var searchVal = __WEBPACK_IMPORTED_MODULE_5_jquery__("page-new-discussion-list #search").val();
        if (searchVal.length > 0 && event.key != "Enter") {
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
            var chatData = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('personId', this.personId)
                .set('teamIds', JSON.stringify(this.selectedTeams))
                .set('roles', JSON.stringify(this.roles))
                .set('app_name', this.global.App_id)
                .set('searchVal', searchVal);
            /* let loading2 = this.loadingCtrl.create();
            loading2.present(); */
            this.http.post(this.global.APIURL + 'messages/getChatPlayerList', chatData, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                //loading2.dismiss();
                if (response.SUCCESS) {
                    var chats = response.CHATPLAYERLIST;
                    _this.chats = [];
                    for (var key in chats) {
                        _this.chats.push(chats[key]);
                    }
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
            this.getDefaultData(this.afterSearch);
        }
    };
    NewDiscussionListPage.prototype.clearsearch = function () {
        if (__WEBPACK_IMPORTED_MODULE_5_jquery__("page-new-discussion-list #search").val() == "Search") {
            __WEBPACK_IMPORTED_MODULE_5_jquery__("page-new-discussion-list #search").val('');
        }
    };
    NewDiscussionListPage.prototype.toggleOverview = function () {
        if (this.showHideOverview == '') {
            this.showHideOverview = 'none';
            this.chatIcon = 'assets/images/chat-black.png';
        }
        else if (this.showHideOverview != '') {
            this.showHideOverview = '';
            this.chatIcon = 'assets/images/chat.png';
        }
    };
    NewDiscussionListPage.prototype.listen = function () {
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
                            __WEBPACK_IMPORTED_MODULE_5_jquery__("page-new-discussion-list #search").blur();
                            __WEBPACK_IMPORTED_MODULE_5_jquery__("page-new-discussion-list #search").val(matches[0]).focus();
                        }, function (onerror) { return console.log('error:', onerror); });
                    }
                    else {
                        // Request permissions
                        _this.speechRecognition.requestPermission()
                            .then(function () {
                            _this.gFn.presentToast('Request Granted');
                            _this.speechRecognition.startListening()
                                .subscribe(function (matches) {
                                __WEBPACK_IMPORTED_MODULE_5_jquery__("page-new-discussion-list #search").blur();
                                __WEBPACK_IMPORTED_MODULE_5_jquery__("page-new-discussion-list #search").val(matches[0]).focus();
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
    NewDiscussionListPage.prototype.goToNewDiscussionPage = function () {
        this.navCtrl.push('NewDiscussionCreatePage');
    };
    NewDiscussionListPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad NewDiscussionListPage');
    };
    NewDiscussionListPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_5_jquery__(document).off('click');
        __WEBPACK_IMPORTED_MODULE_5_jquery__(document).click(function (e) {
            if (!__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.filter_overlay').length && (!__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).hasClass('filtter_button') && !__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).find('.filtter_button').length)) {
                _this.closeFilter();
            }
        });
    };
    NewDiscussionListPage.prototype.onSwipe = function (event) {
        if (event.offsetDirection == 4) {
            this.closeFilter();
        }
    };
    NewDiscussionListPage.prototype.keyboardCheck = function () {
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
    NewDiscussionListPage.prototype.inputFocus = function () {
        this.keyboardCheck();
    };
    NewDiscussionListPage.prototype.inputBlur = function () {
        this.keyboardCheck();
    };
    NewDiscussionListPage.prototype.filterData = function () {
        this.filtering = true;
        this.sportIds = [];
        var sportIds = [];
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-new-discussion-list .sports.active').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                sportIds.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
            }
        });
        this.sportIds = sportIds;
        this.divisionIds = [];
        var divisionIds = [];
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-new-discussion-list .division.active').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                divisionIds.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
            }
        });
        this.divisionIds = divisionIds;
        this.selectedTeams = [];
        var selectedTeams = [];
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-new-discussion-list .team.active').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                selectedTeams.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
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
        if (!this.client_ids.length) {
            this.client_ids.push(this.loggedInUserData.CLIENT_ID);
        }
        if (this.divisionIds.length == 1 && this.divisionIds[0] == '0') {
            this.divisionIds = [];
        }
        this.roles = [];
        var roles = [];
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-new-discussion-list .role.active').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                roles.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
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
    };
    NewDiscussionListPage.prototype.getFilterDetails = function () {
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
    NewDiscussionListPage.prototype.showFilter = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('ion-content').addClass('overlay');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-tabs').addClass('send-back');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.filter_overlay').show();
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.options_wrap .options').on('click', function () {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.options').hide();
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.filterBack').show();
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.fliter .sub-title').html(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).find('p').html());
            if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).hasClass('sportLink')) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.sportFilter').show();
            }
            else if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).hasClass('divisionLink')) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.divisionFilter').show();
            }
            else if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).hasClass('teamLink')) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.teamFilter').show();
            }
            else if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).hasClass('roleLink')) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.roleFilter').show();
            }
        });
        this.filterHandler();
    };
    NewDiscussionListPage.prototype.closeFilter = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('ion-content').removeClass('overlay');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('page-tabs').removeClass('send-back');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.filter_overlay, .sportFilter, .divisionFilter, .teamFilter, .roleFilter, .filterBack').hide();
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.fliter .sub-title').html('Filter');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.options').show();
    };
    NewDiscussionListPage.prototype.filterBack = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.filterBack, .sportFilter, .divisionFilter, .teamFilter, .roleFilter').hide();
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.fliter .sub-title').html('Filter');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.options').show();
    };
    NewDiscussionListPage.prototype.filterHandler = function () {
        var _this = this;
        if (this.isFirstFilter) {
            this.isFirstFilter = false;
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.division').click(function (e) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.teamFilter .team').removeClass('active');
                if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).hasClass('division')) {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).toggleClass('active');
                    if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).hasClass('active')) {
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemListInfo').find('.team').addClass('active');
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemListInfo').find('.team').removeClass('active');
                    }
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parent('.division').toggleClass('active');
                    if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parent('.division').hasClass('active')) {
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemListInfo').find('.team').addClass('active');
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemListInfo').find('.team').removeClass('active');
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
                _this.filterData();
            });
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.sports').click(function (e) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.teamFilter .team').removeClass('active');
                if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).hasClass('sports')) {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).toggleClass('active');
                    if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).hasClass('active')) {
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemList').find('.division').addClass('active');
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemList').find('.team').addClass('active');
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemList').find('.division').removeClass('active');
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemList').find('.team').removeClass('active');
                    }
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parent('.sports').toggleClass('active');
                    if (__WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parent('.sports').hasClass('active')) {
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemList').find('.division').addClass('active');
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemList').find('.team').addClass('active');
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemList').find('.division').removeClass('active');
                        __WEBPACK_IMPORTED_MODULE_5_jquery__(e.target).parents('.itemList').find('.team').removeClass('active');
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
                _this.filterData();
            });
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
                _this.selectedTeams = [];
                var selectedTeams = [];
                __WEBPACK_IMPORTED_MODULE_5_jquery__('page-new-discussion-list .team.active').each(function () {
                    if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                        selectedTeams.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
                    }
                });
                _this.selectedTeams = selectedTeams;
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
                __WEBPACK_IMPORTED_MODULE_5_jquery__('page-new-discussion-list .role.active').each(function () {
                    if (__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id') != 0) {
                        roles.push(__WEBPACK_IMPORTED_MODULE_5_jquery__(this).prop('id'));
                    }
                });
                _this.roles = roles;
                _this.filterData();
            });
        }
    };
    NewDiscussionListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-new-discussion-list',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/new-discussion-list/new-discussion-list.html"*/'<!--\n  Generated template for the NewDiscussionListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <nav class="navbar">\n        <div class="top-bar clearfix">\n            <div class="pull-left">\n                <div class="backArrow info-item" (click)="goBack()">CHAT</div>\n            </div>\n            <!-- <div class="prev-next pull-right chat-search-prev-next" (click)="goToChooseTeamsPage()">\n                <a href="javascript:void(0);" class="next"></a>\n            </div> -->\n            <div class="prev-next pull-right doubleArrow" (click)="showFilter()">\n                <a href="javascript:void(0);"><img src="assets/images/event-filter-icon.svg" class="filtter_button"></a>\n                <a href="javascript:void(0);"><img src="assets/images/event-filter-icon-active.svg" class="filtter_button active"></a>\n            </div>\n        </div>\n    </nav>\n</ion-header>\n\n\n<ion-content>\n  <div class="bg-gray event">\n      <section class="main">\n          <form action="" class="user-form profile setting-first">\n              <section class="profileFirst heightAuto player-search-swipe-down">\n                  <div class="event-card welfare bg-gray">\n                      <div class="row player-search-image">\n                          <div class="col-xs-12 search-player search-inner">\n                              <div class="search-icon"><i class="seh material-icons">search</i></div>\n                              <input type="text" name="search" id="search" class="form-control text-input" placeholder="Search" (keyup)="search($event)" (click)="clearsearch()" (focus)="inputFocus()" (blur)="inputBlur()">\n                              <!--<div class="microph-image" (click)="listen()"><img src="assets/images/microphone-voice.png" class="microphone"/></div>-->\n                          </div>\n                      </div>\n\n                      <div class="well select-card m-15" (click)="goToNewDiscussionPage()">\n                          <div class="row" >\n                              <div class="card-img col-xs-2 p-0">\n                                  <span class="">\n                                      <img src="assets/images/group-icon-blue.svg" alt="" class="img-circle">\n                                </span>\n                              </div>\n                              <div class="card-title col-xs-10 p-0 chat-home">\n                                  <div class="row">\n                                      <div class="col-xs-12 p-0">\n                                            <span>NEW DISCUSSION GROUP</span>\n                                      </div>\n                                  </div>\n                              </div>\n                          </div>\n                      </div>\n\n                        <div class="well select-card" *ngFor="let search of searchData" [ngStyle]="{\'display\': searchHide}">\n                            <div class="row">\n                                <div class="card-img col-xs-2 p-0">\n                                    <span class="">\n                                        <img src="assets/images/group-name.svg" alt="" class="img-circle">\n                                    </span>\n                                </div>\n                                <div class="card-title col-xs-10 p-0 chat-home">\n                                    <div class="row">\n                                        <div class="col-xs-12 p-0">\n                                                <span>{{search.GROUP_NAME}}</span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    \n                      <!--search end-->\n                      \n                      <ion-list no-lines class="well select-card" *ngFor="let chat of chats">\n                          <ion-item-sliding>\n                                <ion-item>\n                                  <div class="row" ion-item-sliding (click)="viewChat(chat.group_id, chat.chat_person_name, chat.photoPath, chat.char_Person_id,chat.lastName,$event)">\n                                      <div class="card-img col-xs-2 p-0">\n                                          <span class="">\n                                            <img *ngIf="chat.photoPath != \'\'; else noImage" src="{{global.PROFILEIMAGEURL + chat.photoPath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                              <ng-template #noImage>\n                                                <div class="img-circle" *ngIf="chat.chat_person_name != \'\'"><span class="img-text">{{chat.chat_person_name[0] | uppercase}} {{chat.lastName[0] | uppercase}} </span></div>\n                                                <div class="img-circle" *ngIf="chat.chat_person_name == \'\'"><span class="img-text"> N N </span></div>\n                                            </ng-template>\n                                          </span>\n                                      </div>\n                                      <div class="card-title col-xs-10 p-0 chat-home">\n                                          <div class="row">\n                                              <div class="col-xs-12 p-0">\n                                                    <span *ngIf="chat.chat_person_name != \'\'">{{chat.chat_person_name}} <span *ngIf="chat.role">{{chat.role}}</span><p *ngIf="chat.childNames">{{chat.childNames}}</p></span>\n                                                    <span *ngIf="chat.chat_person_name == \'\'">No Name</span>\n                                              </div>\n                                          </div>\n                                      </div>\n\n                                  </div>\n                                </ion-item>\n                          </ion-item-sliding >\n                      </ion-list>\n                      <div class="well select-card" *ngIf="chats.length == 0 && searchData.length == 0">\n                            <div class="row">\n                                <div class="col-xs-12 p-0 chat-home">\n                                    <div class=" text-center noList">\n                                        <span>No List Found</span>\n                                    </div>\n                                </div>\n                            </div>\n                      </div>\n                  </div>\n              </section>\n          </form>\n      </section>\n  </div>\n</ion-content>\n\n<div class="filter_overlay" style="display: none;" (swipe)="onSwipe($event)">\n    <div class="fliter">\n        <div class="itemList clearfix">\n            <div class="pull-left">\n                <img class="filterBack" src="assets/images/arrow-white.svg" (click)="filterBack()" />\n                <p class="sub-title">FILTER</p>\n            </div>\n            <div class="pull-right close-icon" (click)="closeFilter()">\n                <img src="assets/images/close-icon.svg" alt="">\n            </div>\n        </div>\n        <!-- <div class="fliter_options" *ngIf="(FunctionAccess && FunctionAccess.user_adminLevel != 1) || (PersonData && PersonData.ISPARENT)">\n            <div class="itemList clearfix" *ngFor="let key of sportsList">\n                <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID.toString()) > -1" id="{{key.SPORTID}}"><p>{{key.SPORTNAME}}</p></div>\n                <div class="itemListInfo clearfix subFilter has-child" *ngFor="let division of key.DIVISIONLIST">\n                    <div class="font_light" class="division" [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)" id="{{division.DIVISIONID}}"><p>{{division.DIVISIONNAME}}</p></div>\n                    <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                        <div class="font_light" class="team" [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID.toString()) > -1)" id="{{team.CLUBDIVISIONID}}"><p>{{team.TEAMNAME}}</p></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="fliter_options" *ngIf="PersonData && PersonData.ISPARENT">\n            <div class="itemList clearfix" *ngFor="let key of PersonData.siblings">\n                <div class="font_light" class="childId" id="{{key.person_id}}" [class.active]="childIds.indexOf(key.person_id.toString()) > -1"><p>{{key.first_name}} {{key.last_name}}</p></div>\n            </div>\n        </div> -->\n\n        <div class="options_wrap">          \n            <!-- <div class="options teamLink">\n                <p>My Teams</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->               \n            <div class="options sportLink">\n                <p>My teams</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div>  \n            <div class="options roleLink" *ngIf="FunctionAccess && FunctionAccess.user_adminLevel != 4">\n                <p>Roles</p>\n                <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div>                  \n            <!-- <div class="options divisionLink">\n              <p>Division</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->                 \n            <!-- <div class="options teamLink">\n              <p>Teams</p>\n              <img src="assets/images/right arrow.svg" class="pull_right_arrow">\n            </div> -->\n\n            <div class="fliter_options sportFilter" style="display: none;">\n                <!-- <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my sports</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="sports" name="sports" value="0" [checked]="sportIds.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div> -->\n                <div class="itemList clearfix" *ngFor="let key of sportsList">\n                    <div class="font_light" class="sports" [class.active]="sportIds.indexOf(key.SPORTID?.toString()) > -1" id="{{key.SPORTID}}"><p>{{key.SPORTNAME}}</p></div>\n                    <!-- <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="sports" name="sports" value="{{key.SPORTID}}" [checked]="sportIds.indexOf(key.SPORTID.toString()) > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div> -->\n                    <div class="itemListInfo clearfix subFilter has-child" *ngFor="let division of key.DIVISIONLIST">\n                        <div class="font_light" class="division" [class.active]="(divisionIds.indexOf(division.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)" id="{{division.DIVISIONID}}"><p>{{division.DIVISIONNAME}}</p></div>\n                        <div class="itemListInfo clearfix subChildFilter" *ngFor="let team of division.TEAMLIST">\n                            <div class="font_light" class="team" [class.active]="(selectedTeams.indexOf(team.CLUBDIVISIONID?.toString()) > -1)" id="{{team.CLUBDIVISIONID}}"><p>{{team.TEAMNAME}}</p></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- <div class="fliter_options divisionFilter" style="display: none;">\n                <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my division</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="division" name="division" value="0" [checked]="divisionIds.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class="itemList clearfix" *ngFor="let key of divisionList">\n                    <div class="pull-left font_light"><p>{{key.DIVISIONNAME}}</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="division" name="division" value="{{key.DIVISIONID}}" [checked]="(divisionIds.indexOf(key.DIVISIONID.toString()) > -1 || divisionIds.indexOf(\'0\') > -1)">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </div> -->\n\n            <div class="fliter_options teamFilter" style="display: none;">\n                <!-- <div class="itemList clearfix">\n                    <div class="pull-left"><p>Show all my teams</p></div>\n                    <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="team" name="team" value="0" [checked]="selectedTeams.indexOf(\'0\') > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div> -->\n                <div class="itemList clearfix" *ngFor="let key of teamList">\n                    <div class="font_light" class="team" [class.active]="selectedTeams.indexOf(key.CLUBDIVISIONID?.toString()) > -1" id="{{key.CLUBDIVISIONID}}"><p>{{key.TEAMNAME}}</p></div>\n                    <!-- <div class="pull-right">\n                        <div class="toggle">\n                            <label class="switch">\n                            <input type="checkbox" class="team" name="team" value="{{key.CLUBDIVISIONID}}" [checked]="selectedTeams.indexOf(key.CLUBDIVISIONID.toString()) > -1">\n                            <span class="slider round"></span>\n                            </label>\n                        </div>\n                    </div> -->\n                </div>\n            </div>\n\n            <div class="fliter_options roleFilter" style="display: none;">\n                <div class="itemList clearfix">\n                    <div class="font_light" class="role" [class.active]="roles.indexOf(\'1\') > -1" id="1"><p>Admins</p></div>\n                </div>\n                <div class="itemList clearfix" *ngIf="loggedInUserData && !loggedInUserData.ISPARENT">\n                    <div class="font_light" class="role" [class.active]="roles.indexOf(\'2\') > -1" id="2"><p>Players</p></div>\n                </div>\n                <div class="itemList clearfix">\n                    <div class="font_light" class="role" [class.active]="roles.indexOf(\'3\') > -1" id="3"><p>Parents</p></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/new-discussion-list/new-discussion-list.html"*/,
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
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], NewDiscussionListPage);
    return NewDiscussionListPage;
}());

//# sourceMappingURL=new-discussion-list.js.map

/***/ })

});
//# sourceMappingURL=45.js.map