webpackJsonp([95],{

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddRollcallsPageModule", function() { return AddRollcallsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_rollcalls__ = __webpack_require__(860);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddRollcallsPageModule = /** @class */ (function () {
    function AddRollcallsPageModule() {
    }
    AddRollcallsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_rollcalls__["a" /* AddRollcallsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_rollcalls__["a" /* AddRollcallsPage */]),
            ],
        })
    ], AddRollcallsPageModule);
    return AddRollcallsPageModule;
}());

//# sourceMappingURL=add-rollcalls.module.js.map

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddRollcallsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_api_global_api__ = __webpack_require__(24);
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
 * Generated class for the AddRollcallsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddRollcallsPage = /** @class */ (function () {
    function AddRollcallsPage(navCtrl, http, navParams, viewCtrl, global, loadingCtrl, toastCtrl, global_api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.global_api = global_api;
        this.rollcallName = '';
        this.isDynamic = '0';
        this.event_id = navParams.get('event_id');
        this.selectedTeam = navParams.get('selectedTeam');
        this.createdBy = navParams.get('createdBy');
        this.client_id = navParams.get('client_id');
        this.transportId = navParams.get('transportId');
    }
    AddRollcallsPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    AddRollcallsPage.prototype.setDynamic = function () {
        this.isDynamic = (this.isDynamic == '0') ? '1' : '0';
    };
    AddRollcallsPage.prototype.addRollcall = function () {
        var _this = this;
        if (this.rollcallName.trim().length > 0) {
            var loader_1 = this.loadingCtrl.create({});
            loader_1.present();
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('rollcallName', this.rollcallName)
                .set('transportId', this.transportId)
                .set('isDynamic', this.isDynamic)
                .set('createdBy', this.createdBy);
            this.http.post(this.global.APIURL + "transports/createRollcall", loginData, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                loader_1.dismiss();
                _this.close();
            }, function (error) {
            });
        }
        else {
            this.presentToast('Please enter rollcall name');
        }
    };
    AddRollcallsPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    AddRollcallsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-rollcalls',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/add-rollcalls/add-rollcalls.html"*/'\n<ion-content class="bg-black" >\n    <div class="fixed-top_ modal-close">\n            <!-- <img src="assets/images/close-white.png" alt="" data-dismiss="modal"> -->\n            <div class="rotate-text pwrotate-text-white" (click)="close()">\n                  <span class="close_" data-dismiss="modal">CLOSE\n                      <ion-icon name="close" class="close_-button"></ion-icon>\n                  </span>\n            </div>\n    </div>\n  <div class="modal-content modalView">\n      <div class="modal-header shadow">\n          <h5 class="modal-title fontBold text-center">ROLLCALLS</h5>\n      </div>\n      <div class="modal-body modal-report">\n        <div class="row">\n          <div class="d-flex align-center col-xs-3 p-0">\n            <span class="textGray">Name</span>\n          </div>\n          <div class="col-xs-9 p-0">\n              <input type="text" class="form-control" [(ngModel)]="rollcallName">\n          </div>\n        </div>\n        <div class="row">\n          <div class="toggleGroup p-0 mt-20 clearfix">\n              <div class="text-info pull-left textGray">Make Rollcall dynamic<p>Control only previous check-in</p></div>\n              <div class="toggle pull-right">\n                  <label class="switch">\n                      <input type="checkbox" (checked)="isDynamic==\'1\'">\n                      <span class="slider round" (click)="setDynamic()"></span>\n                    </label>\n              </div>\n          </div>\n        </div>\n        <div class="btn-section mt-30">\n            <button type="submit" class="btn btn-save xs-btn" (click)="addRollcall()">ADD</button>\n        </div>\n        <div class="modal-footer"></div>\n\n        </div>\n    </div>\n    \n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/add-rollcalls/add-rollcalls.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], AddRollcallsPage);
    return AddRollcallsPage;
}());

//# sourceMappingURL=add-rollcalls.js.map

/***/ })

});
//# sourceMappingURL=95.js.map