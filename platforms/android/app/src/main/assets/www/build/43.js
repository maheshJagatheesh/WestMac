webpackJsonp([43],{

/***/ 812:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotifyParentsPageModule", function() { return NotifyParentsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notify_parents__ = __webpack_require__(914);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotifyParentsPageModule = /** @class */ (function () {
    function NotifyParentsPageModule() {
    }
    NotifyParentsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notify_parents__["a" /* NotifyParentsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notify_parents__["a" /* NotifyParentsPage */]),
            ],
        })
    ], NotifyParentsPageModule);
    return NotifyParentsPageModule;
}());

//# sourceMappingURL=notify-parents.module.js.map

/***/ }),

/***/ 914:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotifyParentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_version_ngx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(21);
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








var NotifyParentsPage = /** @class */ (function () {
    function NotifyParentsPage(navCtrl, navParams, http, storage, global, appVersion, viewCtrl, gFn, loadingCtrl, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.appVersion = appVersion;
        this.viewCtrl = viewCtrl;
        this.gFn = gFn;
        this.loadingCtrl = loadingCtrl;
        this.global_api = global_api;
        this.characters = 86;
        this.text = '';
        this.vehicleDetails = navParams.get('details');
        // console.log(this.vehicleDetails)
        this.appVersion.getAppName().then(function (Appname) {
            _this.AppName = Appname;
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            for (var key in _this.vehicleDetails.staffList) {
                if (_this.vehicleDetails.staffList[key].PERSONID == _this.PersonData.PERSON_ID) {
                    _this.staffDetails = _this.vehicleDetails.staffList[key];
                    // console.log(this.staffDetails)
                }
            }
            if (!_this.staffDetails) {
                _this.gFn.presentToast('Unauthorized access');
                _this.viewCtrl.dismiss();
            }
        });
    }
    NotifyParentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotifyParentsPage');
    };
    NotifyParentsPage.prototype.close = function (event) {
        if (event.toElement.className == "scroll-content") {
            this.navCtrl.pop();
        }
    };
    NotifyParentsPage.prototype.sendNotification = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        if (this.text && this.text.length <= 86) {
            var PlayersData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportStaffId', this.staffDetails.TRANSPORTSTAFFID)
                .set('transportVehicleId', this.vehicleDetails.vehiclesId) //this.PersonData.CLIENT_ID
                .set('message', this.text) //this.PersonData.SELECTEDTEAM
                .set('app_name', this.global.App_id);
            this.http.post(this.global.APIURL + "transports/notifyParentsByStaff", PlayersData, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                // console.log(data)
                _this.viewCtrl.dismiss();
                if (data.SUCCESS && data.NOTIFYPARENTS) {
                    _this.gFn.presentToast('Notify successfull');
                    loader.dismiss();
                }
                else {
                    _this.gFn.presentToast('Notify unsuccessfull');
                    loader.dismiss();
                }
            }, function (error) {
                _this.gFn.presentToast('Notify unsuccessfull');
                loader.dismiss();
                _this.viewCtrl.dismiss();
            });
        }
        else if (this.text && this.text.length > 86) {
            this.gFn.presentToast('Message cannot be more than ' + this.characters + ' characters');
            loader.dismiss();
        }
        else {
            this.gFn.presentToast('Message cannot be blank');
            loader.dismiss();
        }
    };
    NotifyParentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-notify-parents',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/notify-parents/notify-parents.html"*/'<!--\n  Generated template for the TrackMemberPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content class="bg-black" (click)="close($event)">\n  \n  <div class="modal-content modalView">\n    <div class="modal-header">\n        <h5 class="modal-title fontBold text-center text_fix">Notify parents</h5>\n    </div>\n    <div class="modal-body">\n      <div class="membar-card d-flex align-center justify-center">\n        <ion-item>\n          <ion-textarea [(ngModel)]="text" placeholder="Text.."></ion-textarea>\n        </ion-item>\n      </div>\n    </div>\n    <div class="modal-footer clearfix">\n      <div class="text-counter pull-left" *ngIf="text.length<=characters">{{characters-text.length}} characters left</div>\n      <div class="text-counter pull-left" *ngIf="text.length>characters">{{text.length-characters}} characters extra</div>\n      <a href="javascript:void(0)" class="send text-blue pull-right" (click)="sendNotification()">Send</a>\n    </div>\n  \n  </div>\n  \n  \n</ion-content>\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/notify-parents/notify-parents.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_version_ngx__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], NotifyParentsPage);
    return NotifyParentsPage;
}());

//# sourceMappingURL=notify-parents.js.map

/***/ })

});
//# sourceMappingURL=43.js.map