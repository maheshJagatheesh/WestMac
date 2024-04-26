webpackJsonp([4],{

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehicleDetailsPageModule", function() { return VehicleDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vehicle_details__ = __webpack_require__(951);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VehicleDetailsPageModule = /** @class */ (function () {
    function VehicleDetailsPageModule() {
    }
    VehicleDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vehicle_details__["a" /* VehicleDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vehicle_details__["a" /* VehicleDetailsPage */]),
            ],
        })
    ], VehicleDetailsPageModule);
    return VehicleDetailsPageModule;
}());

//# sourceMappingURL=vehicle-details.module.js.map

/***/ }),

/***/ 951:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehicleDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
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








var VehicleDetailsPage = /** @class */ (function () {
    function VehicleDetailsPage(navCtrl, navParams, modalCtrl, http, storage, loadingCtrl, gFn, global, launchNavigator, viewCtrl, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.gFn = gFn;
        this.global = global;
        this.launchNavigator = launchNavigator;
        this.viewCtrl = viewCtrl;
        this.global_api = global_api;
        this.currentMapTrack = null;
        this.isTracking = false;
        this.trackedRoute = [];
        this.previousTracks = [];
        this.totalPassenger = 0;
        this.vehicleDetails = navParams.get('details');
        console.log(this.vehicleDetails);
        this.getBusDetails(this.vehicleDetails.vehiclesId);
        this.storage.get('EventDetails').then(function (val) {
            _this.EventDetails = val[0];
            console.log(_this.EventDetails);
        });
    }
    VehicleDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VehicleDetailsPage');
    };
    VehicleDetailsPage.prototype.gotoNotifyParents = function () {
        var Modal = this.modalCtrl.create('NotifyParentsPage', { details: this.vehicleDetails });
        Modal.present();
        // this.navCtrl.push('NotifyParentsPage')
    };
    VehicleDetailsPage.prototype.gotoLastRollcall = function () {
        this.navCtrl.push('LastRollcallPage', { detail: this.vehicleDetails });
    };
    VehicleDetailsPage.prototype.getBusDetails = function (transportId) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.BusDetailApi = _this.global.APIURL + "transports/getBusDetails";
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]().set('transportVehicleId', transportId);
            _this.http.post(_this.BusDetailApi, data, { headers: _this.global_api.getHeader() }).toPromise().then(function (res) {
                if (res['SUCCESS'] == true) {
                    _this.BusDetailData = res['BUSDETAILS'];
                    console.log(_this.BusDetailData);
                    _this.ActivateMap(_this.BusDetailData[0].TRACKINGSTAFFID);
                    _this.totalPassenger = _this.BusDetailData[0].TOTALPASSENGER;
                }
                resolve();
            });
        });
    };
    VehicleDetailsPage.prototype.ActivateMap = function (key) {
        this.loader = this.loadingCtrl.create({});
        this.loader.present();
        // $('#map').show()
        // this.getCurrentLocation()
        this.GetLocation(key);
    };
    VehicleDetailsPage.prototype.GetLocation = function (StaffDetail) {
        var _this = this;
        console.log('2');
        clearInterval(this.LocationInterval);
        this.fetchLocation(StaffDetail).then(function (x) {
            if (!x) {
                _this.gFn.presentToast('Connecting...');
            }
            else {
                _this.loader.dismiss();
            }
        });
        this.LocationInterval = setInterval(function () {
            _this.fetchLocation(StaffDetail).then(function (x) {
                if (!x) {
                    _this.gFn.presentToast('Connection issue or Location Not Found');
                    _this.loader.dismiss();
                    clearInterval(_this.LocationInterval);
                }
                else {
                    _this.loader.dismiss();
                }
            });
        }, 60000);
    };
    VehicleDetailsPage.prototype.fetchLocation = function (staff_id) {
        var _this = this;
        var mapOptions = {
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        };
        console.log('1');
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('staffId', staff_id);
            _this.http.post(_this.global.APIURL + "transports/getGPSLocation", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS && data.GETGPSLOCATION[0] &&
                    (data.GETGPSLOCATION[0].latitude || data.GETGPSLOCATION[0].longitude)) {
                    console.log('getLocation', data);
                    console.log('3');
                    _this.addMarker(_this.map, data.GETGPSLOCATION[0].latitude, data.GETGPSLOCATION[0].longitude);
                    var latLng = new google.maps.LatLng(data.GETGPSLOCATION[0].latitude, data.GETGPSLOCATION[0].longitude);
                    _this.map.setCenter(latLng);
                    _this.map.setZoom(16);
                    console.log('4');
                    resolve(true);
                }
                else {
                    _this.loader.dismiss();
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    VehicleDetailsPage.prototype.addMarker = function (map, lat1, lng1) {
        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: {
                lat: lat1,
                lng: lng1
            }
        });
        this.addInfoWindow(marker, lat1, lng1);
    };
    VehicleDetailsPage.prototype.addInfoWindow = function (marker, lat1, lng1) {
        var _this = this;
        console.log(lat1 + ', ' + lng1);
        google.maps.event.addListener(marker, 'click', function () {
            console.log(lat1 + ', ' + lng1);
            _this.launchNavigator.navigate(lat1 + ', ' + lng1);
            clearInterval(_this.LocationInterval);
        });
    };
    VehicleDetailsPage.prototype.ionViewDidLeave = function () {
        this.gFn.showMenuIcon();
    };
    VehicleDetailsPage.prototype.removeVehicle = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('vehicleId', this.vehicleDetails.vehiclesId);
        this.http.post(this.global.APIURL + "transports/removeVehicle", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.gFn.presentToast(data.MESSAGE);
            }
            loader.dismiss();
            _this.backArrow();
        }, function (error) {
            loader.dismiss();
        });
    };
    VehicleDetailsPage.prototype.backArrow = function () {
        this.gFn.showMenuIcon();
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], VehicleDetailsPage.prototype, "mapElement", void 0);
    VehicleDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-vehicle-details',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/vehicle-details/vehicle-details.html"*/'<!--\n  Generated template for the VehicleDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header-md">\n  <ion-navbar class="main">\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n        <div>\n            <button class="BackButton bg-white" (click)="backArrow()"><img src="assets/images/arrow-black.svg"></button>\n            EVENTS\n          </div>\n      </div>\n  </div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="bg-gray">\n    <div class="top-section mt-10">\n        <h4 class="info-item text-center text-blue" *ngIf="EventDetails">{{EventDetails.name}}</h4>\n        <div class="title-md text-center" *ngFor="let data1 of BusDetailData">\n          <p>{{data1.VEHICLENAME | titlecase}} - {{data1.TOTALPASSENGER}}/{{data1.VEHICLECAPACITY}} capacity</p>\n        </div>\n        <p class="text-center"*ngFor="let data1 of BusDetailData">{{data1.TRACKINGSTATUS}}</p>\n        <div class="avatar-group d-flex justify-center" *ngFor="let data2 of BusDetailData">\n          <div *ngFor="let staffItem of data2.STAFFLIST;let i=index">\n            <div class="img-xs" [class.overlapImg]="i>0">\n              <span class="" *ngIf="staffItem.PHOTOPATH">\n                    <img alt="" class="staffImage img-circle" src={{global.PROFILEIMAGEURL}}{{staffItem.PHOTOPATH}}>\n              </span>\n              <span class="" *ngIf="!staffItem.PHOTOPATH">\n                  <div class="img-xs"><span class="img-text">{{staffItem.FIRSTNAME[0]}} {{staffItem.LASTNAME[0]}} </span></div>                                  \n              </span>\n            </div>\n            <!-- <div class="img-xs overlapImg">\n                <span class="">\n                      <img alt="" class="img-circle" src=\'{{staffItem.PHOTOPATH}}\'>\n                </span>\n              </div> -->\n        </div>\n      </div>\n    </div>\n    <section class="main mt-30">\n      <div class="info-list-item">\n          <div class="row border-bottom" (click)="gotoNotifyParents()">\n            <div class="notify xs-icon col-xs-1 p-0"></div>\n            <div class="card-title col-xs-10 p-0 font_fix">Notify parents</div>\n            <div class="next col-xs-1 p-0">\n                <a class="next-arrow" href="javascript:void(0);">\n                  <i aria-hidden="true" class="fa fa-chevron-right"></i>\n                </a>\n            </div>\n          </div>\n          <div class="row border-bottom" (click)="gotoLastRollcall()">\n              <div class="rollcall xs-icon col-xs-1 p-0"></div>\n              <div class="card-title col-xs-10 p-0 font_fix">Passengers</div>\n              <div class="next col-xs-1 p-0">\n                  <a class="next-arrow" href="javascript:void(0);">\n                    <i aria-hidden="true" class="fa fa-chevron-right"></i>\n                  </a>\n              </div>\n          </div>\n      </div>\n\n      <div class="full-width mt-30 mb-20">\n        <button  expand="block" class="btn btn-rounded btn-teal" (click)="gotoLastRollcall()">\n            <span>GO TO ROLLCALL</span>\n        </button>\n      </div>\n    </section>\n    <div #map id="map"></div>\n\n    <div class="btn-wrap" *ngIf="totalPassenger == 0" (click)="removeVehicle()">\n      <button  expand="block" class="btn btn-remove">\n          <span>REMOVE VEHICLE</span>\n      </button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/vehicle-details/vehicle-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], VehicleDetailsPage);
    return VehicleDetailsPage;
}());

//# sourceMappingURL=vehicle-details.js.map

/***/ })

});
//# sourceMappingURL=4.js.map