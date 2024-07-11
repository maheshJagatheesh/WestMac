webpackJsonp([24],{

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetHomeImagePageModule", function() { return SetHomeImagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__set_home_image__ = __webpack_require__(936);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SetHomeImagePageModule = /** @class */ (function () {
    function SetHomeImagePageModule() {
    }
    SetHomeImagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__set_home_image__["a" /* SetHomeImagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__set_home_image__["a" /* SetHomeImagePage */]),
            ],
        })
    ], SetHomeImagePageModule);
    return SetHomeImagePageModule;
}());

//# sourceMappingURL=set-home-image.module.js.map

/***/ }),

/***/ 936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetHomeImagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
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


//import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';




/**
 * Generated class for the SetHomeImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SetHomeImagePage = /** @class */ (function () {
    function SetHomeImagePage(navCtrl, navParams, storage, global, http, loadingCtrl, events, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.global_api = global_api;
        this.setImageName = '';
        this.setHomeScreenImage = '';
        this.bgThemeColor = '';
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.setImageName = navParams.get('data');
            if (typeof _this.setImageName !== 'undefined') {
                _this.setHomeScreenImage = 'assets/images/' + _this.setImageName;
            }
            else if (typeof _this.loggedInUserData['HOMESCREEN_BG'] !== 'undefined' && _this.loggedInUserData['HOMESCREEN_BG'] != '') {
                _this.setImageName = _this.loggedInUserData['HOMESCREEN_BG'];
                _this.setHomeScreenImage = 'assets/images/' + _this.loggedInUserData['HOMESCREEN_BG'];
            }
            _this.backgroundThemeColor();
        });
    }
    SetHomeImagePage.prototype.backgroundThemeColor = function () {
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
    SetHomeImagePage.prototype.goToSetToGo = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('homescreen_bg', this.setImageName);
        this.http.post(this.global.APIURL + 'users/setThemeHomeScreen', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.loggedInUserData['HOMESCREEN_BG'] = _this.setImageName;
                _this.storage.set('loggedInUserData', _this.loggedInUserData);
                //console.log(this.loggedInUserData);
                _this.navCtrl.push('SetToGoPage', {}, { animation: 'ios-transition' });
            }
            else {
                alert('Error');
            }
        }, function (error) {
            loading.dismiss();
            //alert(JSON.stringify(error));
        });
        //this.navCtrl.push('SetToGoPage');
    };
    SetHomeImagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-set-home-image',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/set-home-image/set-home-image.html"*/'<!--\n  Generated template for the SetHomeImagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content class="bg-gradient {{bgThemeColor}}">\n    <div class="bg-homeScreen {{bgThemeColor}}" [style.background-image]="\'url(\' + setHomeScreenImage + \')\'">\n      <section class="main">\n        <form action="" class="user-form">\n          <div class="log-in v-bottom">\n            <button type="button" class="circle xs" (click)="goToSetToGo()">OK</button>\n          </div>\n        </form>\n      </section>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/set-home-image/set-home-image.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], SetHomeImagePage);
    return SetHomeImagePage;
}());

//# sourceMappingURL=set-home-image.js.map

/***/ })

});
//# sourceMappingURL=24.js.map