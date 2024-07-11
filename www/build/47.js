webpackJsonp([47],{

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(910);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
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



/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.bgThemeColor = '';
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            //this.themeColor = this.loggedInUserData.THEME_BG;
            _this.backgroundThemeColor();
        });
    }
    MenuPage.prototype.backgroundThemeColor = function () {
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
    MenuPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad MenuPage');
    };
    MenuPage.prototype.goBackEventHomePage = function () {
        this.navCtrl.push('EventHomePage');
    };
    MenuPage.prototype.goToSettingsPage = function () {
        this.hoverActive = 'active';
        this.navCtrl.push('SettingsPage');
    };
    MenuPage.prototype.goToGalleryEvents = function () {
        this.navCtrl.push('GalleryEventsPage');
    };
    MenuPage.prototype.goToProfileStatisticsPage = function () {
        this.profileHoverActive = 'active';
        this.navCtrl.push('SettingsProfileStatisticsPage');
    };
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-menu',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/menu/menu.html"*/'<!--\n  Generated template for the MenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--<ion-header>\n\n  <ion-navbar>\n    <ion-title>menu</ion-title>\n  </ion-navbar>\n\n</ion-header>-->\n\n\n<ion-content>\n  <section class="main bg-gradient {{bgThemeColor}}">\n    <form action="" class="user-form">\n      <div class="inner v-center">\n        <ul class="navbar-more">\n          <li class=""><a href="javascript:void(0);">MENU ITEM4</a></li>\n          <li class="" (click)="goToGalleryEvents()"><a href="javascript:void(0);">PHOTO GALLERY</a></li>\n          <li (click)="goToProfileStatisticsPage()"><a href="javascript:void(0);" class="{{profileHoverActive}}">PROFILE AND STATISTICS</a></li>\n          <li (click)="goToSettingsPage()"><a href="javascript:void(0);" class="{{hoverActive}}">SETTINGS</a></li>\n        </ul>\n      </div>\n    </form>\n  </section>\n  <div class="close-bottom fixed-bottom">\n    <img src="assets/images/close.svg" alt=""  (click)="goBackEventHomePage()">\n    <!----<div class="rotate-text"  (click)="goBackEventHomePage()">\n      <span>CLOSE</span>\n    </div>-->\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/menu/menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=47.js.map