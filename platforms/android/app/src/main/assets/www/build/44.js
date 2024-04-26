webpackJsonp([44],{

/***/ 811:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewDiscussionSavePageModule", function() { return NewDiscussionSavePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_discussion_save__ = __webpack_require__(913);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewDiscussionSavePageModule = /** @class */ (function () {
    function NewDiscussionSavePageModule() {
    }
    NewDiscussionSavePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__new_discussion_save__["a" /* NewDiscussionSavePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__new_discussion_save__["a" /* NewDiscussionSavePage */]),
            ],
        })
    ], NewDiscussionSavePageModule);
    return NewDiscussionSavePageModule;
}());

//# sourceMappingURL=new-discussion-save.module.js.map

/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewDiscussionSavePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(18);
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
 * Generated class for the NewDiscussionSavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewDiscussionSavePage = /** @class */ (function () {
    function NewDiscussionSavePage(navCtrl, navParams, storage, http, loadingCtrl, global, gFn, keyboard, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.gFn = gFn;
        this.keyboard = keyboard;
        this.global_api = global_api;
        this.newDiscussionDetails = [];
        this.gruopsIds = [];
        this.personIds = [];
        this.chatsLogos = [];
        this.logo_clientId = [];
        this.logo_clubId = [];
        this.groupName = '';
        this.logoPhoto = '';
        this.logoPhoto1 = '';
        this.discussionIcon = '';
        this.mBottom = "";
        this.newDiscussionDetails = this.navParams.get('newDiscussionDetails');
        this.gruopsIds = this.navParams.get('gruopsIds');
        this.personIds = this.navParams.get('personIds');
        this.storage.get('loggedInUserData').then(function (val) {
            console.log(val);
            _this.personId = val.PERSON_ID;
            _this.selectedTeam = val.SELECTEDTEAM;
            _this.team_id = val.SELECTEDTEAM;
            _this.firstName = val.FIRST_NAME;
            _this.lastName = val.LAST_NAME;
            _this.clientId = val.CLIENT_ID;
            var chatLogo = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('personId', _this.personId);
            var loading = loadingCtrl.create();
            loading.present();
            _this.http.post(_this.global.APIURL + 'messages/getClientLogos', chatLogo, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                loading.dismiss();
                if (response.SUCCESS) {
                    var getChatsLogo = response.CLIENTLOGOS;
                    for (var key in getChatsLogo) {
                        _this.chatsLogos.push(getChatsLogo[key]);
                    }
                }
            });
        });
    }
    NewDiscussionSavePage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    NewDiscussionSavePage.prototype.deletedPersonName = function (personId, ev) {
        this.newDiscussionDetails = this.newDiscussionDetails.filter(function (i) { return i.id !== personId; });
        $('.select-card[id=' + personId + ']').removeClass("divDisable");
        $('.select-card[id=' + personId + ']').find(".card-img span").removeClass("active");
        this.gruopsIds = this.gruopsIds.filter(function (i) { return i !== personId; });
        this.personIds = this.personIds.filter(function (i) { return i !== personId; });
    };
    NewDiscussionSavePage.prototype.createChatGroup = function (DiscussionDetails, groupName, gruopsIds, personIds, photo) {
        var _this = this;
        console.log(photo);
        if (groupName != '' && photo != '' && (gruopsIds.length > 0 || personIds.length > 0)) {
            var chatLogo = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('groupIds', JSON.stringify(gruopsIds))
                .set('personIds', JSON.stringify(personIds))
                .set('groupName', groupName)
                .set('groupType', '3')
                .set('discussionIcon', photo)
                .set('createdBy', this.personId);
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.http.post(this.global.APIURL + 'messages/saveChatGroupDetails', chatLogo, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                loading_1.dismiss();
                if (response.SUCCESS) {
                    var chatInfo = {
                        from: 1,
                        to: 10,
                        person_id: _this.personId,
                        selectedTeam: _this.selectedTeam,
                        groupid: response.GROUPID,
                        teamid: _this.team_id,
                        grouptype: 3,
                        flag: 1,
                        userPhoto: photo,
                        groupName: groupName,
                        accFirstName: _this.firstName,
                        accLastName: _this.lastName,
                        clientId: _this.clientId
                    };
                    _this.navCtrl.push('GroupChatViewPage', { data: chatInfo });
                }
            });
        }
        else {
            if (groupName == '') {
                this.gFn.presentToast('Please enter discussion name.');
            }
            else if (photo == '') {
                this.gFn.presentToast('Please select any discussion icon.');
            }
            else if (gruopsIds.length == 0 || personIds.length == 0) {
                this.gFn.presentToast('Please select any group or person.');
            }
        }
    };
    NewDiscussionSavePage.prototype.saveLogoDetails = function (ev) {
        this.discussionIcon = $(ev.target).attr('id');
        //$(ev.target).addClass("active");
        if ($(ev.target).hasClass('background_color_hover') == true) {
            $(".background_color_hover").removeClass("active");
            $(ev.target).addClass("active");
        }
        else {
            $(".background_color_hover").removeClass("active");
            $(ev.target).parents(".background_color_hover").addClass("active");
        }
        /* this.logo_clientId = datalogo.CLIENTID;
         this.logo_clubId = datalogo.CLUBID;
         this.logoPhoto = datalogo.SPORTBANNER;
         this.logoPhoto1 = datalogo.BANNERIMAGE; */
    };
    NewDiscussionSavePage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad NewDiscussionSavePage');
    };
    NewDiscussionSavePage.prototype.keyboardCheck = function () {
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
    NewDiscussionSavePage.prototype.inputFocus = function () {
        this.keyboardCheck();
    };
    NewDiscussionSavePage.prototype.inputBlur = function () {
        this.keyboardCheck();
    };
    NewDiscussionSavePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-new-discussion-save',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/new-discussion-save/new-discussion-save.html"*/'<!--\n  Generated template for the NewDiscussionSavePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <nav class="navbar"> \n        <div class="top-bar clearfix">\n            <div class="pull-left">\n                <div class="backArrow info-item" (click)="goBack()">NEW DISCUSSION</div>\n            </div>\n        </div>\n    </nav>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="profileFirst heightAuto setting-first">\n    <h3 class="heading_title">DISCUSSION NAME</h3>\n    <input type="text" class="form-control" id="groupName" [(ngModel)]="groupName" name="groupName"  placeholder="Type name here" (focus)="inputFocus()" (blur)="inputBlur()">\n    <h3 class="heading_title">DISCUSSION ICON</h3>\n    <div class="logo-wrap"  (click)="saveLogoDetails($event)"> \n      <!-- <div *ngFor="let logos of chatsLogos" (click)="saveLogoDetails(this.logos)">\n        <div class="col-xs-3 svg_img p-0" *ngIf="logos.SPORTBANNER != \'\'">\n          <div class="background_color_hover">\n            <img src="{{global.CHATGROUPLOGOURL + logos.SPORTBANNER}}">\n          </div> \n        </div>\n        <div class="col-xs-3 svg_img p-0" *ngIf="logos.SPORTBANNER == \'\' && logos.BANNERIMAGE != \'\'">\n          <div class="background_color_hover">\n            <img src="{{global.CHATGROUPLOGOURL + logos.BANNERIMAGE}}">\n          </div>\n        </div>\n      </div> -->\n      <div class="svg_img p-0">\n        <div class="background_color_hover disc-1" id="disc-1"></div> \n      </div>\n      <div class="svg_img p-0">\n        <div class="background_color_hover disc-2" id="disc-2"></div> \n      </div>\n      <div class="svg_img p-0">\n        <div class="background_color_hover disc-3" id="disc-3"></div> \n      </div>\n      <div class="svg_img p-0">\n        <div class="background_color_hover disc-4" id="disc-4"></div> \n      </div>\n    </div>\n    <div class="logo-wrap"  (click)="saveLogoDetails($event)"> \n      <div class="svg_img p-0">\n        <div class="background_color_hover disc-5" id="disc-5"></div> \n      </div>\n      <div class="svg_img p-0">\n        <div class="background_color_hover disc-6" id="disc-6"></div> \n      </div>\n      <div class="svg_img p-0">\n        <div class="background_color_hover disc-7" id="disc-7"></div> \n      </div>\n      <div class="svg_img p-0">\n        <div class="background_color_hover disc-8" id="disc-8"></div> \n      </div>\n    </div>\n  </div>\n  <div class="bottom_sec">\n    <div class="card-info">\n      <h3 class="heading_title">PARTICIPANTS</h3> \n      <div class="parent_group">\n        <div class="group_div" *ngFor="let discussionDetails of newDiscussionDetails;" (click)="deletedPersonName(discussionDetails.id,$event)">\n          <div class="rounded_img">\n              <img *ngIf="discussionDetails.image == \'\' && discussionDetails.imageFrom == \'group\'" src="assets/images/group-name.svg" alt="ab" class="img-circle">\n              <img *ngIf="discussionDetails.image != \'\'" src="{{global.PROFILEIMAGEURL + discussionDetails.image}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n              <img *ngIf="discussionDetails.image == \'\' && discussionDetails.imageFrom != \'group\'" src="assets/images/test-user.svg" alt="ab" class="img-circle">\n              <p>{{discussionDetails.discussionName}}</p>\n            <div class="x_button">\n              <span class="closebtn"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div> \n  </div>\n</ion-content>\n<div class="arrow" (click)="createChatGroup(newDiscussionDetails,groupName,gruopsIds,personIds,discussionIcon)"><ion-icon name="arrow-round-forward"></ion-icon></div>\n\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/new-discussion-save/new-discussion-save.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], NewDiscussionSavePage);
    return NewDiscussionSavePage;
}());

//# sourceMappingURL=new-discussion-save.js.map

/***/ })

});
//# sourceMappingURL=44.js.map