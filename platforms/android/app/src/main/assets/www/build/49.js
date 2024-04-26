webpackJsonp([49],{

/***/ 805:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapTrackerPageModule", function() { return MapTrackerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map_tracker__ = __webpack_require__(908);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MapTrackerPageModule = /** @class */ (function () {
    function MapTrackerPageModule() {
    }
    MapTrackerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__map_tracker__["a" /* MapTrackerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__map_tracker__["a" /* MapTrackerPage */]),
            ],
        })
    ], MapTrackerPageModule);
    return MapTrackerPageModule;
}());

//# sourceMappingURL=map-tracker.module.js.map

/***/ }),

/***/ 908:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapTrackerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
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







var MapTrackerPage = /** @class */ (function () {
    function MapTrackerPage(navCtrl, navParams, http, gFn, global, loadingCtrl, launchNavigator, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.gFn = gFn;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.launchNavigator = launchNavigator;
        this.global_api = global_api;
        this.currentMapTrack = null;
        this.isTracking = false;
        this.trackedRoute = [];
        this.previousTracks = [];
        this.memberDetails = [];
        this.staff_id = navParams.get('staff_id');
        console.log(this.staff_id);
        var Details = navParams.get('memberDetails');
        // this.memberDetails=navParams.get('memberDetails')
        for (var key in Details) {
            var temp = Details[key];
            temp = Object.keys(temp).reduce(function (c, k) { return (c[k.toLowerCase()] = temp[k], c); }, {});
            console.log(temp);
            this.memberDetails.push(temp);
        }
        console.log(this.memberDetails);
        // this.MedicineFlag=Object.keys(this.MedicineFlag).reduce((c, k) => (c[k.toLowerCase()] = this.MedicineFlag[k], c), {})
    }
    MapTrackerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapTrackerPage');
        this.ActivateMap(this.staff_id);
    };
    MapTrackerPage.prototype.ActivateMap = function (key) {
        this.staff_id = key;
        this.loader = this.loadingCtrl.create({});
        this.loader.present();
        // $('#map').show()
        // this.getCurrentLocation()
        this.GetLocation(key);
    };
    MapTrackerPage.prototype.GetLocation = function (StaffDetail) {
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
    MapTrackerPage.prototype.fetchLocation = function (staff_id) {
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
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    MapTrackerPage.prototype.addMarker = function (map, lat1, lng1) {
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
    MapTrackerPage.prototype.addInfoWindow = function (marker, lat1, lng1) {
        var _this = this;
        console.log(lat1 + ', ' + lng1);
        google.maps.event.addListener(marker, 'click', function () {
            console.log(lat1 + ', ' + lng1);
            _this.launchNavigator.navigate(lat1 + ', ' + lng1);
            clearInterval(_this.LocationInterval);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MapTrackerPage.prototype, "mapElement", void 0);
    MapTrackerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map-tracker',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/map-tracker/map-tracker.html"*/'<ion-header class="header-md">\n  <ion-navbar class="main">\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n        <div>\n            <button class="BackButton bg-white"></button>\n            EVENTS\n          </div>\n      </div>\n    </div>\n  </ion-navbar>\n  \n</ion-header>\n\n\n<ion-content>\n    <ion-fab end top edge>\n        <button ion-fab class="btn-img" *ngFor="let key of memberDetails" (click)="ActivateMap(key.staff_id?key.staff_id:key.transportstaffid)">\n            <img alt="" class="img-circle" *ngIf="key.photopath" src={{global.PROFILEIMAGEURL}}{{key.photopath}}> \n            <div class="img-circle" *ngIf="!key.photopath"><span class="img-text">{{key.firstname[0] | uppercase}} {{key.lastname[0] | uppercase}} </span></div> \n        </button>\n        \n    </ion-fab>\n    <div #map id="map"></div>\n    \n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/map-tracker/map-tracker.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], MapTrackerPage);
    return MapTrackerPage;
}());

//# sourceMappingURL=map-tracker.js.map

/***/ })

});
//# sourceMappingURL=49.js.map