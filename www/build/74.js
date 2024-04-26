webpackJsonp([74],{

/***/ 777:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventGroupMessageTextPageModule", function() { return EventGroupMessageTextPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_group_message_text__ = __webpack_require__(880);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventGroupMessageTextPageModule = /** @class */ (function () {
    function EventGroupMessageTextPageModule() {
    }
    EventGroupMessageTextPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_group_message_text__["a" /* EventGroupMessageTextPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_group_message_text__["a" /* EventGroupMessageTextPage */]),
            ],
        })
    ], EventGroupMessageTextPageModule);
    return EventGroupMessageTextPageModule;
}());

//# sourceMappingURL=event-group-message-text.module.js.map

/***/ }),

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventGroupMessageTextPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventGroupMessageTextPage = /** @class */ (function () {
    function EventGroupMessageTextPage(navCtrl, navParams, global, http, storage, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.http = http;
        this.storage = storage;
        this.global_api = global_api;
        this.message = '';
    }
    EventGroupMessageTextPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.State = this.navParams.get('state');
        // console.log(this.State)
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            // console.log(this.PersonData)
        });
        //console.log('ionViewDidLoad EventGroupMessageTextPage');
    };
    EventGroupMessageTextPage.prototype.send = function () {
        var _this = this;
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('message', this.message)
            .set('player_ids', JSON.stringify([]))
            .set('msg_type', '0')
            .set('group_id', '0')
            .set('team_id', this.PersonData.TEAM_ID)
            .set('group_type', '0')
            .set('client_id', this.PersonData.CLIENT_ID)
            .set('person_id', this.PersonData.PERSON_ID)
            .set('selectedTeam', this.PersonData.SELECTEDTEAM)
            .set('urlified_message', '')
            .set('image_value', '')
            .set('first_name', this.PersonData.FIRST_NAME)
            .set('last_name', this.PersonData.LAST_NAME)
            .set('event_id', this.PersonData.EVENT_ID)
            .set('state', this.State);
        this.http.post(this.global.APIURL + "messages/sendChat", Data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS == true) {
                _this.navCtrl.pop();
            }
            else {
                alert("Message not sent");
            }
        }, function (error) {
        });
        this.navCtrl.pop();
    };
    EventGroupMessageTextPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-group-message-text',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-group-message-text/event-group-message-text.html"*/'\n<div class="background group-msg">\n        <div class="modal-content msg-send radius-10 backgroundColor">\n            <div class="modal-header">\n                <h4 class="modal-title text-center">Group Message</h4>\n            </div>\n            <div class="modal-body backgroundColor">\n                <textarea class="form-control msg-box" name="" id="" cols="30" rows="6" [(ngModel)]="message"></textarea>\n            </div>\n            <div class="modal-footer">\n                <div class="row">\n                    <div class="submit-link col-xs-12 text-right">\n                        <button type="submit" class="btn backgroundColor" (click)="send()">Send</button>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n      </div>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-group-message-text/event-group-message-text.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventGroupMessageTextPage);
    return EventGroupMessageTextPage;
}());

//# sourceMappingURL=event-group-message-text.js.map

/***/ })

});
//# sourceMappingURL=74.js.map