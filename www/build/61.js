webpackJsonp([61],{

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryAlbumPageModule", function() { return GalleryAlbumPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gallery_album__ = __webpack_require__(895);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GalleryAlbumPageModule = /** @class */ (function () {
    function GalleryAlbumPageModule() {
    }
    GalleryAlbumPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__gallery_album__["a" /* GalleryAlbumPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__gallery_album__["a" /* GalleryAlbumPage */]),
            ],
        })
    ], GalleryAlbumPageModule);
    return GalleryAlbumPageModule;
}());

//# sourceMappingURL=gallery-album.module.js.map

/***/ }),

/***/ 895:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryAlbumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
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







var GalleryAlbumPage = /** @class */ (function () {
    function GalleryAlbumPage(navCtrl, navParams, http, storage, global, gFn, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.gFn = gFn;
        this.global_api = global_api;
    }
    GalleryAlbumPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('loggedInUserData').then(function (val) {
            _this.PersonData = val;
            console.log(_this.PersonData);
            _this.getAlbumList().then(function (x) {
            });
        });
        console.log('ionViewDidLoad GalleryAlbumPage');
    };
    GalleryAlbumPage.prototype.getAlbumList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var dataList = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', '27443'); //27443this.PersonData.PERSON_ID
            _this.http.post(_this.global.APIURL + "galleries/getAlbumGroupList", dataList, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                _this.AlbumList = data.GETALBUMGROUPLIST;
                console.log('data', _this.AlbumList);
                resolve(true);
            }, function (error) {
                //console.log(error);
            });
        });
    };
    GalleryAlbumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-gallery-album',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gallery-album/gallery-album.html"*/'<ion-header>\n  <nav class="navbar navbar-fixed-top player-home-nav">\n      <div class="top-bar clearfix">\n          <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n              <a href="javascript:void(0);" class="next"></a>\n              <a href="javascript:void(0);" class="prev"></a>\n          </div>\n      </div>\n      <div class="bg-header">\n          <div class="title fontBold">GALLERY</div>\n      </div>\n      <ul class="nav navbar-nav top-menu player-menu">\n          <li class=""><a href="javascript:void(0);">Timeline</a></li>\n          <li class=""><a href="javascript:void(0);">Events</a></li>\n          <li class="active"><a href="javascript:void(0);">Albums</a></li>\n      </ul>\n  </nav>\n</ion-header>\n<ion-content>\n<div bg-gray event>\n  <section class="main">\n      <form action="" class="user-form player-item">\n          <section class="profileFirst heightAuto xs-padding">\n              <div class="event-card welfare bg-gray galry-event">\n                  <div class="homeScreen mb-30">\n                    <!-- <div class="thumbnail col-xs-6 gallery-associate-thumbnail">\n                        <img src="assets/images/img-1.png" alt="">\n                        <p class="galry-title">Team vs Other Team</p>\n                        <p class="galry-no">16</p>\n                    </div> -->\n                      <div class="row">\n                          <div class="thumbnail col-xs-6 gallery-associate-thumbnail" *ngFor="let key of AlbumList">\n                              <img src="assets/images/img-1.png" alt="">\n                              <p class="galry-title">{{key.album_name}}</p>\n                              <p class="galry-no">{{key.count}}</p>\n                          </div>\n                          \n                          <!-- <div class="thumbnail col-xs-6 gallery-associate-thumbnail">\n                              <img src="assets/images/img-2.png" alt="">\n                              <p class="galry-title-right">Fundraiser</p>\n                              <p class="galry-no-right">28</p>\n                          </div> -->\n                      </div>\n\n\n\n                      <!-- <div class="row">\n                          <div class="thumbnail col-xs-6 gallery-associate-thumbnail">\n                              <img src="assets/images/img-1.png" alt="">\n                              <p class="galry-title">Team vs Other Team</p>\n                              <p class="galry-no">16</p>\n                          </div>\n                          <div class="thumbnail col-xs-6 gallery-associate-thumbnail">\n                              <img src="assets/images/img-2.png" alt="">\n                              <p class="galry-title-right">Fundraiser</p>\n                              <p class="galry-no-right">28</p>\n                          </div>\n                      </div> -->\n                  </div>\n\n              </div>\n          </section>\n      </form>\n  </section>\n</div>\n</ion-content>\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n      <div class="container-fluid">\n          <ul class="nav navbar-nav">\n              <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n              <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n              <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n              <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n              <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n          </ul>\n      </div>\n  </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gallery-album/gallery-album.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], GalleryAlbumPage);
    return GalleryAlbumPage;
}());

//# sourceMappingURL=gallery-album.js.map

/***/ })

});
//# sourceMappingURL=61.js.map