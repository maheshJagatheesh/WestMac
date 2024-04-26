webpackJsonp([94],{

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdditionalPassengerPageModule", function() { return AdditionalPassengerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__additional_passenger__ = __webpack_require__(859);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AdditionalPassengerPageModule = /** @class */ (function () {
    function AdditionalPassengerPageModule() {
    }
    AdditionalPassengerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__additional_passenger__["a" /* AdditionalPassengerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__additional_passenger__["a" /* AdditionalPassengerPage */]),
            ],
        })
    ], AdditionalPassengerPageModule);
    return AdditionalPassengerPageModule;
}());

//# sourceMappingURL=additional-passenger.module.js.map

/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdditionalPassengerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(21);
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







/**
 * Generated class for the AdditionalPassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdditionalPassengerPage = /** @class */ (function () {
    function AdditionalPassengerPage(navCtrl, navParams, global, loadingCtrl, gFn, storage, http, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.gFn = gFn;
        this.storage = storage;
        this.http = http;
        this.global_api = global_api;
        this.passengerLists = [];
        this.searchData = [];
        this.searchShow = 'none';
        this.transportId = navParams.get('transportId');
        this.storage.get('loggedInUserData').then(function (val) {
            _this.Person_id = val.PERSON_ID;
        });
        this.getAdditionalPassengerList();
    }
    AdditionalPassengerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdditionalPassengerPage');
    };
    AdditionalPassengerPage.prototype.getAdditionalPassengerList = function () {
        var _this = this;
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('transportId', this.transportId)
            .set('searchVal', '');
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.global.APIURL + "transports/getAdditionalPassengerList", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                var passengerList = response.ADDITIONALPASSENGER;
                for (var key in passengerList) {
                    _this.passengerLists.push(passengerList[key]);
                }
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    AdditionalPassengerPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    AdditionalPassengerPage.prototype.clearsearch = function () {
        if ($("#search").val() == "Search") {
            $("#search").val('');
        }
    };
    /*For search start*/
    AdditionalPassengerPage.prototype.search = function (event) {
        var _this = this;
        this.searchData.length = 0;
        var searchVal = $("#search").val();
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('transportId', this.transportId)
            .set('searchVal', searchVal);
        this.http.post(this.global.APIURL + "transports/getAdditionalPassengerList", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.SUCCESS) {
                var passengerList = response.ADDITIONALPASSENGER;
                for (var key in passengerList) {
                    _this.searchData.push(passengerList[key]);
                }
                _this.searchHide = 'none';
                _this.searchShow = '';
            }
        }, function (error) {
        });
    };
    /*search End*/
    AdditionalPassengerPage.prototype.saveAdditionalPassenger = function () {
        var _this = this;
        var additionalPassengerId = [];
        $('.well.select-card.savedAddPassenger.active').each(function () {
            if ($(this).attr('data-id')) {
                additionalPassengerId.push($(this).attr('data-id'));
            }
        });
        console.log(additionalPassengerId);
        if (additionalPassengerId.length > 0) {
            var loader_1 = this.loadingCtrl.create({});
            loader_1.present();
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', this.transportId)
                .set('personIds', JSON.stringify(additionalPassengerId))
                .set('updatedBy', this.Person_id);
            this.http.post(this.global.APIURL + "transports/saveAdditionalPassenger", loginData, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                loader_1.dismiss();
                if (response.SUCCESS) {
                    _this.navCtrl.push('RollcallsPage');
                }
            }, function (error) {
                loader_1.dismiss();
            });
        }
        else {
            this.gFn.presentToast('Please select a passenger');
        }
    };
    AdditionalPassengerPage.prototype.selectadditionalPassenger = function (addPassenger) {
        addPassenger.active = !addPassenger.active;
    };
    AdditionalPassengerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-additional-passenger',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/additional-passenger/additional-passenger.html"*/'<!--<ion-header>\n\n  <ion-navbar>\n    <ion-title>ADDITIONAL PASSENGER</ion-title>\n  </ion-navbar>\n\n</ion-header>-->\n\n\n<ion-header>\n  <nav class="navbar navbar-fixed-top">\n      <div class="top-bar clearfix">\n          <div class="pull-left">\n              <div class="backArrow info-item" (click)="goBack()">ADDITIONAL PASSENGER</div>\n          </div>\n      </div>\n  </nav>\n</ion-header>\n\n\n<ion-content class="bg-gray">\n    <div class="bg-gray event">\n        <section class="main">\n            <form class="user-form profile setting-first">\n                <section class="profileFirst heightAuto player-search-swipe-down">\n                    <div class="event-card welfare bg-gray padding-5 mb-0">\n                        <div class="row player-search-image Padding-b-20">\n                            <div class="col-xs-12 search-player search-inner">\n                                <div class="search-icon"><i class="seh material-icons">search</i></div>\n                                <input type="text" name="search" id="search" class="form-control text-input" placeholder="Search" (keyup)="search($event)" (click)="clearsearch()">\n                            </div>\n                        </div>\n\n                        <!--For search start-->\n                        <div class="well select-card savedAddPassenger" *ngFor="let passengerList of searchData"  [ngStyle]="{\'display\': searchShow}" [attr.data-id]="passengerList.PERSONID"\n                        [ngClass]="{\'active\': passengerList.active}" (click)="selectadditionalPassenger(passengerList)">\n                            <div class="row" >\n                              <div class="card-img col-xs-2 p-0">\n                                  <span class="" *ngIf="passengerList.PHOTOPATH==\'\'">\n                                      <div class="img-circle"><span class="img-text">{{passengerList.FIRSTNAME[0] | uppercase}} {{passengerList.LASTNAME[0] | uppercase}}</span></div>                                  \n                                  </span>\n                                  <span class="" *ngIf="passengerList.PHOTOPATH !=\'\'">\n                                      <img src="{{global.PROFILEIMAGEURL}}{{passengerList.PHOTOPATH}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                  </span>\n                              </div>\n                              <div class="card-title col-xs-10">\n                                  {{passengerList.FIRSTNAME}} {{passengerList.LASTNAME}}\n                                  <span class="sub-text-color">On time</span>\n                              </div>\n                            </div>\n                        </div>\n                        <div class="mt-20" *ngIf="searchData.length > 0" [ngStyle]="{\'display\': searchShow}">\n                            <div class="row">\n                              <div class="btn-section col-xs-12">\n                                <button type="submit" class="btn btn-save xs-btn" (click)="saveAdditionalPassenger()">ADD</button>\n                              </div>\n                            </div>\n                        </div>\n                        <div class="well select-card" *ngIf="searchData.length == 0" [ngStyle]="{\'display\': searchShow}">\n                          <div class="row">\n                              <div class="col-xs-12">\n                                  <h5 class="sub-title">NO LIST FOUND</h5>\n                              </div>\n                          </div>\n                        </div>\n                        <!--search End-->\n\n                        <div class="well select-card savedAddPassenger" *ngFor="let passengerList of passengerLists"  [ngStyle]="{\'display\': searchHide}" [attr.data-id]="passengerList.PERSONID"\n                        [ngClass]="{\'active\': passengerList.active}" (click)="selectadditionalPassenger(passengerList)">\n                            <div class="row">\n                              <div class="card-img col-xs-2 p-0">\n                                  <span class="" *ngIf="passengerList.PHOTOPATH==\'\'">\n                                      <div class="img-circle"><span class="img-text">{{passengerList.FIRSTNAME[0] | uppercase}} {{passengerList.LASTNAME[0] | uppercase}}</span></div>                                  \n                                  </span>\n                                  <span class="" *ngIf="passengerList.PHOTOPATH !=\'\'">\n                                      <img src="{{global.PROFILEIMAGEURL}}{{passengerList.PHOTOPATH}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                  </span>\n                              </div>\n                              <div class="card-title col-xs-10">\n                                  {{passengerList.FIRSTNAME | uppercase}} {{passengerList.LASTNAME | uppercase}}\n                                  <span class="sub-text-color">On time</span>\n                              </div>\n                            </div>\n                        </div>\n                        <div class="well select-card" *ngIf="passengerLists.length == 0" [ngStyle]="{\'display\': searchHide}">\n                            <div class="row">\n                                <div class="col-xs-12">\n                                    <h5 class="sub-title">NO LIST FOUND</h5>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="mt-20" *ngIf="passengerLists.length > 0" [ngStyle]="{\'display\': searchHide}">\n                            <div class="row">\n                              <div class="btn-section col-xs-12">\n                                <button type="submit" class="btn btn-save xs-btn" (click)="saveAdditionalPassenger()">ADD</button>\n                              </div>\n                            </div>\n                        </div>\n                    </div>\n                </section>\n            </form>\n        </section>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/additional-passenger/additional-passenger.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], AdditionalPassengerPage);
    return AdditionalPassengerPage;
}());

//# sourceMappingURL=additional-passenger.js.map

/***/ })

});
//# sourceMappingURL=94.js.map