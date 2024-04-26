webpackJsonp([48],{

/***/ 806:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicineInfoPageModule", function() { return MedicineInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__medicine_info__ = __webpack_require__(909);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MedicineInfoPageModule = /** @class */ (function () {
    function MedicineInfoPageModule() {
    }
    MedicineInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__medicine_info__["a" /* MedicineInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__medicine_info__["a" /* MedicineInfoPage */]),
            ],
        })
    ], MedicineInfoPageModule);
    return MedicineInfoPageModule;
}());

//# sourceMappingURL=medicine-info.module.js.map

/***/ }),

/***/ 909:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MedicineInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MedicineInfoPage = /** @class */ (function () {
    function MedicineInfoPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.MedicineInformation = [];
        this.MedicineFlag = this.navParams.get('values');
        this.MedicineFlag = Object.keys(this.MedicineFlag).reduce(function (c, k) { return (c[k.toLowerCase()] = _this.MedicineFlag[k], c); }, {});
        console.log('1', this.MedicineFlag);
        storage.get('medicineInfo').then(function (val) {
            _this.MedicineNames = JSON.parse(val);
            _this.MedicineNames = Object.keys(_this.MedicineNames).reduce(function (c, k) { return (c[k.toLowerCase()] = _this.MedicineNames[k], c); }, {});
            // console.log('2',this.MedicineNames)
            for (var key in _this.MedicineFlag) {
                // console.log('this.MedicineFlag',this.MedicineFlag[key])
                for (var key1 in _this.MedicineNames) {
                    // console.log('this.MedicineNames',this.MedicineNames[key1])
                    if (key == key1) {
                        var data1 = {
                            MedicineName: _this.MedicineNames[key1],
                            MedicineFlag: _this.MedicineFlag[key]
                        };
                        _this.MedicineInformation.push(data1);
                        break;
                    }
                }
            }
            console.log(_this.MedicineInformation);
        });
    }
    MedicineInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MedicineInfoPage');
    };
    MedicineInfoPage.prototype.backArrow = function () {
        this.navCtrl.pop();
    };
    MedicineInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-medicine-info',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/medicine-info/medicine-info.html"*/'<!--\n  Generated template for the MedicineInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>\n            <button class="BackButton"(click)="backArrow()"><img src="assets/images/arrow-black.svg"></button>\n          Medicine Information\n        </ion-title>\n      </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="bg-black" padding>\n    <div *ngFor="let key of MedicineInformation">\n      <ion-label class="MedicineCard">\n        <div class="col-xs-12">\n            <div class="col-xs-8">\n              <span style="float: left">\n                  {{key.MedicineName}}\n              </span>\n               \n            </div>\n              <div class="col-xs-2 pr-0 checkArrow-group" >\n                <div class="col-xs-2 p-0 checkbox-col" >\n                  <div class="defaultCheckbox1" [class.ActiveCheckbox1]="key.MedicineFlag==1">\n                  </div>\n                  <div class="checkbox"></div>\n                </div>\n              </div>\n\n              <div class="col-xs-2 pr-0 checkArrow-group">\n                <div class="col-xs-2 p-0 checkbox-col">\n                  <div class="defaultCheckbox1" [class.ActiveCheckbox1]="key.MedicineFlag==0">\n                  </div>\n                  <div class="checkbox"></div>\n                </div>\n              </div>\n\n        </div>\n        \n      </ion-label>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/medicine-info/medicine-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], MedicineInfoPage);
    return MedicineInfoPage;
}());

//# sourceMappingURL=medicine-info.js.map

/***/ })

});
//# sourceMappingURL=48.js.map