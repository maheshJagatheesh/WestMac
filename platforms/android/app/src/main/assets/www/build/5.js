webpackJsonp([5],{

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportStaffPassengerPageModule", function() { return TransportStaffPassengerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transport_staff_passenger__ = __webpack_require__(953);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransportStaffPassengerPageModule = /** @class */ (function () {
    function TransportStaffPassengerPageModule() {
    }
    TransportStaffPassengerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__transport_staff_passenger__["a" /* TransportStaffPassengerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transport_staff_passenger__["a" /* TransportStaffPassengerPage */]),
            ],
        })
    ], TransportStaffPassengerPageModule);
    return TransportStaffPassengerPageModule;
}());

//# sourceMappingURL=transport-staff-passenger.module.js.map

/***/ }),

/***/ 953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransportStaffPassengerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__ = __webpack_require__(34);
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






/**
 * Generated class for the TransportStaffPassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TransportStaffPassengerPage = /** @class */ (function () {
    function TransportStaffPassengerPage(navCtrl, http, navParams, viewCtrl, global, gFn, loadingCtrl, toastCtrl, global_api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.global = global;
        this.gFn = gFn;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.global_api = global_api;
        this.staffList = [];
        this.client_id = navParams.get('client_id');
        this.selectedTeam = navParams.get('selectedTeam');
        this.event_id = navParams.get('event_id');
        this.createdBy = navParams.get('createdBy');
        this.transportId = navParams.get('transportId');
        this.staffId = navParams.get('staffId');
    }
    TransportStaffPassengerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransportStaffPassengerPage');
    };
    TransportStaffPassengerPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    TransportStaffPassengerPage.prototype.updateStaffIsPassenger = function (isPassenger) {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('transportId', this.transportId)
            .set('staffId', this.staffId)
            .set('isPassenger', isPassenger);
        this.http.post(this.global.APIURL + "transports/updateStaffIsPassenger", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            loader.dismiss();
            _this.close();
        }, function (error) {
            loader.dismiss();
        });
    };
    TransportStaffPassengerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-transport-staff-passenger',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-staff-passenger/transport-staff-passenger.html"*/'<ion-content class="bg-black" >\n  <div class="fixed-top_ modal-close">\n    <div class="rotate-text pwrotate-text-white" (click)="close()">\n        <span class="close_" data-dismiss="modal">CLOSE\n            <ion-icon name="close" class="close_-button"></ion-icon>\n        </span>\n    </div>\n  </div>\n\n  <div class="modal-content modalView">\n    <div class="modal-header shadow">\n        <h5 class="modal-title fontBold text-center">Are you a passenger?</h5>\n    </div>\n    <div class="modal-body modal-report">\n      <div class="row">\n        <div class="d-flex text-center col-xs-offset-2 col-xs-8 p-0">\n          Let us know if you are going to be present in the vehicles. You can still update it later.\n        </div>\n      </div>\n      <div class="modal-footer mt-20">\n        <div class="row">\n          <div class="col-xs-offset-2 col-xs-2">\n            <button type="submit" class="no-btn" (click)="updateStaffIsPassenger(0)">NO</button>\n          </div>\n          <div class="col-xs-offset-4 col-xs-2">\n            <button type="submit" class="yes-btn" (click)="updateStaffIsPassenger(1)">YES</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-staff-passenger/transport-staff-passenger.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], TransportStaffPassengerPage);
    return TransportStaffPassengerPage;
}());

//# sourceMappingURL=transport-staff-passenger.js.map

/***/ })

});
//# sourceMappingURL=5.js.map