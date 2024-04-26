webpackJsonp([3],{

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehicleListPageModule", function() { return VehicleListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vehicle_list__ = __webpack_require__(953);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VehicleListPageModule = /** @class */ (function () {
    function VehicleListPageModule() {
    }
    VehicleListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vehicle_list__["a" /* VehicleListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vehicle_list__["a" /* VehicleListPage */]),
            ],
        })
    ], VehicleListPageModule);
    return VehicleListPageModule;
}());

//# sourceMappingURL=vehicle-list.module.js.map

/***/ }),

/***/ 953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehicleListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
 * Generated class for the VehicleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VehicleListPage = /** @class */ (function () {
    function VehicleListPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.VehicleList = navParams.get('details');
        console.log(this.VehicleList);
    }
    VehicleListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VehicleListPage');
    };
    VehicleListPage.prototype.close = function (event) {
        if (event.toElement.className == "scroll-content") {
            this.viewCtrl.dismiss();
        }
    };
    VehicleListPage.prototype.selectVehicle = function (data) {
        this.viewCtrl.dismiss(data);
    };
    VehicleListPage.prototype.back = function () {
        this.viewCtrl.dismiss();
    };
    VehicleListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-vehicle-list',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/vehicle-list/vehicle-list.html"*/'<ion-content class="bg-black" (click)="close($event)">\n    \n    <div class="modal-content fixed_bottom modal-body">\n        <div class="modal-body logsCard">\n            <ion-item *ngFor="let key of VehicleList" (click)="selectVehicle(key.TRANSPORTVEHICLEID)">\n              <ion-label>{{key.VEHICLENAME}}</ion-label>\n            </ion-item>\n            \n            <!-- <ion-item>\n                <ion-label>Picked up by parents</ion-label>\n            </ion-item>\n            <ion-item>\n                <ion-label>Dropped to friends</ion-label>\n            </ion-item>\n            <ion-item>\n                <ion-label>Lorem ipsum</ion-label>\n            </ion-item> -->\n            \n          </div>\n      </div>\n      <div class="modal-content fixed_bottom_cancel modal-footer">\n          <div class="modal-body logsCard">\n              <ion-item (click)="back()">\n                <ion-label>Cancel</ion-label>\n              </ion-item>\n              \n            </div>\n        </div>\n      \n  </ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/vehicle-list/vehicle-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
    ], VehicleListPage);
    return VehicleListPage;
}());

//# sourceMappingURL=vehicle-list.js.map

/***/ })

});
//# sourceMappingURL=3.js.map