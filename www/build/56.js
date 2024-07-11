webpackJsonp([56],{

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupChatViewPageModule", function() { return GroupChatViewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_chat_view__ = __webpack_require__(900);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GroupChatViewPageModule = /** @class */ (function () {
    function GroupChatViewPageModule() {
    }
    GroupChatViewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__group_chat_view__["a" /* GroupChatViewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__group_chat_view__["a" /* GroupChatViewPage */]),
            ],
        })
    ], GroupChatViewPageModule);
    return GroupChatViewPageModule;
}());

//# sourceMappingURL=group-chat-view.module.js.map

/***/ }),

/***/ 900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupChatViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker_ngx__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_base64_ngx__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_interval__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_global_api_global_api__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera_ngx__ = __webpack_require__(105);
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
 * Generated class for the GroupChatViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GroupChatViewPage = /** @class */ (function () {
    function GroupChatViewPage(navCtrl, navParams, global, http, loadingCtrl, imagePicker, base64, toastCtrl, gFn, app, platform, appVersion, alertCtrl, storage, plt, modalCtrl, global_api, actionSheetCtrl, camera) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.imagePicker = imagePicker;
        this.base64 = base64;
        this.toastCtrl = toastCtrl;
        this.gFn = gFn;
        this.app = app;
        this.platform = platform;
        this.appVersion = appVersion;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.plt = plt;
        this.modalCtrl = modalCtrl;
        this.global_api = global_api;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.chatMessages = [];
        this.messageSend = false;
        this.chatMessagesLength = 0;
        this.isScroll = false;
        this.AppName = '';
        this.groupContactId = '';
        this.viewMuteUnmute = '';
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.goBack();
            });
        });
        this.gFn.hideMenuIcon();
        this.gFn.hideFormAccessoryBar(true);
        this.checkInterval = false;
        this.viewDefaultData(this.checkInterval);
        this.storage.get('loggedInUserData').then(function (val) {
            global_api.getUnreadMessageCount(val);
        });
    }
    GroupChatViewPage.prototype.viewDefaultData = function (checkIntervalLoding) {
        var _this = this;
        this.messageSend = false;
        this.data = this.navParams.get('data');
        this.imageFallback = this.global.MESSAGEFALLBACKIMAGE;
        this.name = this.data.userNmae;
        this.accFirstName = this.data.accFirstName;
        this.accLastName = this.data.accLastName;
        this.checkPageRedirect = true;
        this.isScroll = false;
        this.groupContactId = this.data.groupContactId;
        var chatData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.data.person_id)
            .set('selectedTeam', this.data.selectedTeam)
            .set('group_id', this.data.groupid)
            .set('team_id', this.data.teamid)
            .set('group_type', this.data.grouptype)
            .set('from', this.data.from)
            .set('to', this.data.to)
            .set('flag', this.data.flag);
        var loading = this.loadingCtrl.create();
        if (checkIntervalLoding == false) {
            loading.present();
        }
        this.http.post(this.global.APIURL + 'messages/getTeamChatMsgs', chatData, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            //loading.dismiss();
            if (response.SUCCESS) {
                if (_this.chatMessagesLength != response.GETTEAMCHATMSGS.length) {
                    _this.isScroll = true;
                    _this.chatMessagesLength = response.GETTEAMCHATMSGS.length;
                    _this.chatMessages = [];
                    var chatMessages = response.GETTEAMCHATMSGS;
                    for (var key in chatMessages) {
                        _this.chatMessages.push(chatMessages[key]);
                    }
                    _this.viewMuteUnmute = response.ISMUTE;
                }
                //console.log(this.chatMessages);
                if (checkIntervalLoding == false) {
                    setTimeout(function () {
                        loading.dismiss();
                    }, 1000);
                }
            }
        }, function (error) {
            if (checkIntervalLoding == false) {
                loading.dismiss();
                //console.log(error);
            }
        });
    };
    GroupChatViewPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.gFn.hideMenuIcon();
        this.gFn.hideFormAccessoryBar(true);
        this.appVersion.getAppName().then(function (Appname) {
            _this.AppName = Appname;
        });
        if (typeof this.sub != 'undefined') {
            this.sub.unsubscribe();
        }
        this.sub = __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"].interval(3000).subscribe(function (val) {
            _this.checkInterval = true;
            _this.viewDefaultData(_this.checkInterval);
        });
    };
    GroupChatViewPage.prototype.ionViewWillLeave = function () {
        if (typeof this.sub != 'undefined') {
            this.sub.unsubscribe();
        }
        this.gFn.showMenuIcon();
    };
    GroupChatViewPage.prototype.goBack = function () {
        this.app.getRootNav().getActiveChildNav().select(3);
    };
    GroupChatViewPage.prototype.goToChooseTeamsPage = function () {
        this.navCtrl.push('ChooseTeamProfilePage').then(function () {
            __WEBPACK_IMPORTED_MODULE_4_jquery__('.tabs .tab-button[aria-selected=true]:nth-child(4)').attr('aria-selected', 'false');
        });
    };
    GroupChatViewPage.prototype.sendMessage = function (event) {
        var _this = this;
        if (event.key != "Enter") {
            var message = __WEBPACK_IMPORTED_MODULE_4_jquery__("#messageContent").val();
            __WEBPACK_IMPORTED_MODULE_4_jquery__("#messageContent").val('').focus();
            if (message.trim().length > 0) {
                /* let loading = this.loadingCtrl.create();
                loading.present(); */
                var msgData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                    .set('msg_type', '0')
                    .set('person_id', this.data.person_id)
                    .set('group_id', this.data.groupid)
                    .set('team_id', this.data.teamid)
                    .set('selectedTeam', this.data.selectedTeam)
                    .set('group_type', this.data.grouptype)
                    .set('first_name', this.accFirstName)
                    .set('last_name', this.accLastName)
                    .set('message', message)
                    .set('client_id', this.data.clientId)
                    .set('urlified_message', '')
                    .set('player_ids', JSON.stringify([]))
                    .set('image_value', '')
                    .set('appName', this.AppName);
                this.http.post(this.global.APIURL + 'messages/sendChat', msgData, { headers: this.global_api.getHeader() })
                    .subscribe(function (response) {
                    if (response.SUCCESS) {
                        __WEBPACK_IMPORTED_MODULE_4_jquery__("#messageContent").val('');
                        var chatData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                            .set('person_id', _this.data.person_id)
                            .set('selectedTeam', _this.data.selectedTeam)
                            .set('group_id', _this.data.groupid)
                            .set('team_id', _this.data.teamid)
                            .set('group_type', _this.data.grouptype)
                            .set('from', _this.data.from)
                            .set('to', _this.data.to)
                            .set('flag', _this.data.flag);
                        _this.http.post(_this.global.APIURL + 'messages/getTeamChatMsgs', chatData, { headers: _this.global_api.getHeader() })
                            .subscribe(function (response) {
                            if (response.SUCCESS) {
                                _this.messageSend = true;
                                if (_this.chatMessagesLength != response.GETTEAMCHATMSGS.length) {
                                    _this.isScroll = true;
                                    _this.chatMessagesLength = response.GETTEAMCHATMSGS.length;
                                    var chatMessages = response.GETTEAMCHATMSGS;
                                    for (var key in chatMessages) {
                                        _this.chatMessages.push(chatMessages[chatMessages.length - 1]);
                                        break;
                                    }
                                }
                                _this.viewMuteUnmute = response.ISMUTE;
                                //loading.dismiss();
                            }
                        }, function (error) {
                            //loading.dismiss();
                            //console.log(error);
                        });
                    }
                }, function (error) {
                    //console.log(error);
                });
                /* }else{
                   this.presentToast("Can't send blank message");
                 }*/
            }
        }
        else if (event.key === "Enter") {
            //$("#messageContent").val() + "<br>*";
        }
    };
    GroupChatViewPage.prototype.settingGroupIcon = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'From Gallery',
                    icon: 'cloud-upload',
                    handler: function () {
                        _this.sendPhoto();
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
    GroupChatViewPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        console.log("options sourceType :- ", sourceType);
        var options = {
            quality: 20,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imagePath) {
            // console.log("direct base64 imagePath :--",imagePath);
            var image = 'data:image/jpeg;base64,' + imagePath;
            // console.log("image in base64",image);
            _this.uploadPhoto(encodeURIComponent(imagePath));
        }, function (err) {
            _this.presentToast(err);
        });
    };
    GroupChatViewPage.prototype.sendPhoto = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
            outputType: 1
        };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.uploadPhoto(encodeURIComponent(results[i]));
            }
        }, function (err) { });
    };
    GroupChatViewPage.prototype.uploadPhoto = function (image) {
        var _this = this;
        this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
        var loading = this.loadingCtrl.create();
        loading.present();
        var msgData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('msg_type', '1')
            .set('person_id', this.data.person_id)
            .set('group_id', this.data.groupid)
            .set('team_id', this.data.teamid)
            .set('selectedTeam', this.data.selectedTeam)
            .set('group_type', this.data.grouptype)
            .set('first_name', this.accFirstName)
            .set('last_name', this.accLastName)
            .set('message', '')
            .set('client_id', this.data.clientId)
            .set('urlified_message', '')
            .set('image_value', image)
            .set('player_ids', JSON.stringify([]))
            .set('appName', this.AppName);
        this.http.post(this.global.APIURL + 'messages/sendChat', msgData, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            console.log(response);
            if (response.SUCCESS) {
                __WEBPACK_IMPORTED_MODULE_4_jquery__("#messageContent").val('');
                var chatData = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                    .set('person_id', _this.data.person_id)
                    .set('selectedTeam', _this.data.selectedTeam)
                    .set('group_id', _this.data.groupid)
                    .set('team_id', _this.data.teamid)
                    .set('group_type', _this.data.grouptype)
                    .set('from', _this.data.from)
                    .set('to', _this.data.to)
                    .set('flag', _this.data.flag);
                var loading_1 = _this.loadingCtrl.create();
                loading_1.present();
                _this.http.post(_this.global.APIURL + 'messages/getTeamChatMsgs', chatData, { headers: _this.global_api.getHeader() })
                    .subscribe(function (response) {
                    //loading.dismiss();
                    if (response.SUCCESS) {
                        _this.messageSend = true;
                        if (_this.chatMessagesLength != response.GETTEAMCHATMSGS.length) {
                            _this.isScroll = true;
                            _this.chatMessagesLength = response.GETTEAMCHATMSGS.length;
                            var chatMessages = response.GETTEAMCHATMSGS;
                            for (var key in chatMessages) {
                                _this.chatMessages.push(chatMessages[chatMessages.length - 1]);
                                break;
                            }
                        }
                        _this.viewMuteUnmute = response.ISMUTE;
                        setTimeout(function () {
                            loading_1.dismiss();
                        }, 1000);
                        //console.log(this.chatMessages);
                    }
                }, function (error) {
                    loading_1.dismiss();
                    //console.log(error);
                });
                console.log('success');
            }
            else {
                alert('Sorry, image upload error.');
            }
        }, function (error) {
        });
    };
    GroupChatViewPage.prototype.onImageError = function () {
        console.log("hahahahahaha");
    };
    GroupChatViewPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    GroupChatViewPage.prototype.gototillBottom = function () {
        this.content.scrollToBottom(0);
        if (this.messageSend) {
            __WEBPACK_IMPORTED_MODULE_4_jquery__('#messageContent').focus();
        }
    };
    GroupChatViewPage.prototype.leaveDiscussion = function (dis_group_Id, groupContactId) {
        var _this = this;
        var leaveDiscussion = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('groupContactId', groupContactId)
            .set('client_id', this.data.clientId)
            .set('selectedTeam', this.data.selectedTeam)
            .set('group_id', dis_group_Id)
            .set('team_id', this.data.selectedTeam)
            .set('player_ids', JSON.stringify([]));
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + 'messages/removePlayerFromGroup', leaveDiscussion, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.gFn.presentToast('Group leave successful.');
                _this.navCtrl.pop();
            }
            else {
                _this.gFn.presentToast('Problem in group Leave.');
            }
        });
    };
    GroupChatViewPage.prototype.muteNotification = function (dis_group_Id) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Specify the reason',
            inputs: [
                {
                    type: 'radio',
                    label: 'Mute for 8 hours',
                    value: '8'
                },
                {
                    type: 'radio',
                    label: 'Mute for 1 day',
                    value: '24'
                },
                {
                    type: 'radio',
                    label: 'Mute for 1 week',
                    value: '168'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: function (muteTime) {
                        console.log('OK clicked: ');
                        console.log(_this.data.person_id);
                        var muteUnmuteChat = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                            .set('groupId', dis_group_Id)
                            .set('muteHours', muteTime)
                            .set('personeId', _this.data.person_id);
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        _this.http.post(_this.global.APIURL + 'messages/muteUnmuteChat', muteUnmuteChat, { headers: _this.global_api.getHeader() })
                            .subscribe(function (response) {
                            loading.dismiss();
                            if (response.SUCCESS) {
                                if (muteTime == '8') {
                                    _this.gFn.presentToast('Mute successful for ' + muteTime + ' hours.');
                                }
                                else if (muteTime == '24') {
                                    _this.gFn.presentToast('Mute successful for one days.');
                                }
                                else if (muteTime == '168') {
                                    _this.gFn.presentToast('Mute successful for one week.');
                                }
                                _this.goBack();
                            }
                            else {
                                _this.gFn.presentToast('Problem in mute notification.');
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    GroupChatViewPage.prototype.unmuteNotification = function (dis_group_Id) {
        var _this = this;
        var muteUnmuteChat = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('groupId', dis_group_Id)
            .set('muteHours', '0')
            .set('personeId', this.data.person_id);
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + 'messages/muteUnmuteChat', muteUnmuteChat, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.gFn.presentToast('Notification unmute successfully.');
                _this.goBack();
            }
            else {
                _this.gFn.presentToast('Problem in mute notification.');
            }
        });
    };
    GroupChatViewPage.prototype.groupInfo = function (group_Id) {
        console.log(group_Id);
        this.navCtrl.push('ChatGroupInfoPage', { group_Id: group_Id, isMuteStatus: this.viewMuteUnmute });
    };
    GroupChatViewPage.prototype.viewImage = function (image) {
        var _this = this;
        var imageModal = this.modalCtrl.create('ChatViewImagePage', { image: image });
        imageModal.present();
        imageModal.onDidDismiss(function (data) {
            _this.plt.ready().then(function () {
                _this.plt.registerBackButtonAction(function () {
                    _this.goBack();
                });
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], GroupChatViewPage.prototype, "content", void 0);
    GroupChatViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-group-chat-view',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/group-chat-view/group-chat-view.html"*/'<!--\n  Generated template for the GroupChatViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <nav class="navbar navbar-fixed-top">\n        <div class="top-bar clearfix">\n            <div class="pull-left">\n                <div class="backArrow info-item chat-text-size" (click)="goBack()">CHAT</div>\n            </div>\n            <div class="prev-next pull-right">\n                <div class="dropdown">\n                    <a  class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);"><img src="assets/images/chat-more.svg" style="width: 33px;" ></a>\n                    <ul class="dropdown-menu">\n                        <li *ngIf="this.viewMuteUnmute == 0" (click)="muteNotification()">Mute notifications</li>\n                       <li *ngIf="this.viewMuteUnmute == 1" (click)="unmuteNotification()">Unmute notifications</li>\n                        <li *ngIf="isBlocked == 0" (click)="blockUnblockSingleChat(1)">Block</li>\n                    </ul>\n                </div>\n            </div>\n            <!--<div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n                <a href="javascript:void(0);" class="next"></a>\n                <a href="javascript:void(0);" class="prev"></a>\n            </div>-->\n        </div>\n    </nav>\n</ion-header>\n\n\n<ion-content>\n  <div class="bg-grey" cz-shortcut-listen="true">\n      <section class="main">\n          <form action="" class="user-form p-0">\n              <section class="profileFirst heightAuto chat" style="position: fixed !important;display:block !important;bottom: 0% !important;width: 100% !important;height: 100% !important;">\n                <div class="main-chat">  \n                <div class="chat-logo text-center discussion_img" style="margin-top: 30%;">\n                    <!-- <img *ngIf="data.userPhoto != \'\'" src="{{global.CHATGROUPLOGOURL + data.userPhoto}}" alt="" class="img-circle profileIMG">\n                    <img *ngIf="data.userPhoto == \'\' && data.userPhoto1 != \'\'" src="{{global.CHATGROUPLOGOURL + data.userPhoto1}}" alt="" class="img-circle profileIMG">-->\n                    <img *ngIf="data.userPhoto == \'\'" [src]="data.gourpIcon ?  global.MESSAGEIMAGE+data.gourpIcon:\'assets/images/group-icon.svg\'" alt="" class="img-circle" style="width: 46px !important;height: 46px !important;">\n                    <div *ngIf="data.userPhoto != \'\'" class="{{data.userPhoto}} background_color_hover"></div>\n                    <h5 class="xs-title">{{data.groupName}}</h5>\n                  </div>\n                  <div class="group-chat" *ngFor="let chatMessage of chatMessages;let last=last">\n                      <!--chat content start-->\n                      <!--my message start-->\n                      <div class="msg-card right" *ngIf="chatMessage.name == \'Me\'">\n                          <span class="img-wrap" *ngIf="chatMessage.msg_type == 1" (click)="viewImage(chatMessage.image)"><img src="{{global.MESSAGEIMAGE+chatMessage.image}}" alt="" onerror="src = \'assets/images/group-icon.svg\'"></span><!--static-->\n                          <span class="msg chat-blue forNewLine" *ngIf="chatMessage.message != 0">{{chatMessage.message}}</span>\n                          <span class="chat-date chat-date-right">{{chatMessage.datetime}}</span>\n                      </div>\n                      <!--my message end-->\n                      <!--others message start-->\n                      <div class="msg-card left" [class.center]="chatMessage.msg_type == 2" *ngIf="chatMessage.name != \'Me\'">\n                          <div class="chat-user" *ngIf="chatMessage.msg_type != 2">\n                              <!-- <img src="assets/images/test-user.svg" alt="" class="xs-thumb"> -->\n                              <img *ngIf="chatMessage.photopath;else noImage" [src]="global.PROFILEIMAGEURL+chatMessage.photopath" alt="" class="xs-thumb">\n                              <ng-template #noImage>\n                                <div class="round" *ngIf="chatMessage.name != \'\'"><span class="xs-thumb">{{chatMessage.name[0] | uppercase}} {{chatMessage.lastName[0] | uppercase}}</span></div>\n                                <div class="round" *ngIf="chatMessage.name == \'\'"><span class="xs-thumb"> N N </span></div>\n                            </ng-template>\n                              <p [innerHTML]="chatMessage.name"></p>\n                          </div>\n                          <div class="msg-group">\n                              <span class="msg forNewLine" *ngIf="chatMessage.msg_type == 0 || chatMessage.msg_type == 2">{{chatMessage.message}}</span>\n                              <span class="img-wrap" *ngIf="chatMessage.msg_type == 1" (click)="viewImage(chatMessage.image)"><img src="{{global.MESSAGEIMAGE+chatMessage.image}}" alt=""></span>\n                              <span class="chat-date" *ngIf="chatMessage.msg_type != 2">{{chatMessage.datetime}}</span>\n                          </div>\n                      </div>\n                      <!--others message end-->\n                      <!--chat content end-->\n\n                      <!-- Come at bottom of the page -->\n                      {{(last && isScroll) ? gototillBottom() : \'\'}}\n                  </div>\n                </div>\n              </section>\n          </form>\n      </section>\n  </div>\n</ion-content>\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom chatbar-fixed navbar-chat-microph">\n      <div class="row">\n          <div class="col-xs-2">\n              <img src="assets/images/icons8-camera.svg" alt="" class="chat-camera" (click)="settingGroupIcon()">\n          </div>\n          <div class="input-wrap col-xs-8">\n              <!--<input type="text" id="messageContent" class="form-control" placeholder="" name="srch-term" (keyup.enter)="sendMessage($event)">-->\n              <textarea id="messageContent" class="form-control" placeholder="" name="srch-term" (keyup.enter)="sendMessage($event)"></textarea>\n          </div>\n          <div class="col-xs-2">\n              <ion-icon ios="md-send" md="md-send" class="chat-send"  (click)="sendMessage($event)"></ion-icon>\n          </div>\n      </div>\n  </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/group-chat-view/group-chat-view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker_ngx__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_base64_ngx__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_app_version_ngx__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_11__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera_ngx__["a" /* Camera */]])
    ], GroupChatViewPage);
    return GroupChatViewPage;
}());

//# sourceMappingURL=group-chat-view.js.map

/***/ })

});
//# sourceMappingURL=56.js.map