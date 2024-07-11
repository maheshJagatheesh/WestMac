webpackJsonp([7],{

/***/ 849:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportListPageModule", function() { return TransportListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transport_list__ = __webpack_require__(949);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransportListPageModule = /** @class */ (function () {
    function TransportListPageModule() {
    }
    TransportListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__transport_list__["a" /* TransportListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transport_list__["a" /* TransportListPage */]),
            ],
        })
    ], TransportListPageModule);
    return TransportListPageModule;
}());

//# sourceMappingURL=transport-list.module.js.map

/***/ }),

/***/ 949:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransportListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation_ngx__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TransportListPage = /** @class */ (function () {
    function TransportListPage(navCtrl, http, storage, navParams, global, events, modalCtrl, plt, gFn, launchNavigator, geolocation, loadingCtrl, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.navParams = navParams;
        this.global = global;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.plt = plt;
        this.gFn = gFn;
        this.launchNavigator = launchNavigator;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.global_api = global_api;
        this.currentMapTrack = null;
        this.isTracking = false;
        this.trackedRoute = [];
        this.previousTracks = [];
        this.PersonData = [];
        this.rollcallList = [];
        this.StaffList = [];
        this.StatusList = [];
        this.getRollcallListSuccess = '0';
        this.StaffListSuccess = '0';
        this.Arrowflag = false;
        this.ShowMap = false;
        this.CurrentPosition = { latitude: '', longitude: '' };
        // this.gFn.hideMenuIcon();
        plt.registerBackButtonAction(function () {
            _this.navCtrl.pop();
            _this.navCtrl.push('EventDashboardPage');
        });
    }
    TransportListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('EventDetails').then(function (val) {
            _this.EventDetails = val[0];
            _this.storage.get('loggedInUserData').then(function (val1) {
                _this.PersonData = val1;
                if (_this.PersonData.ISPARENT && parseInt(_this.PersonData.PERSON_ID) != parseInt(_this.PersonData.PARENT_ID)) {
                    _this.isParent = true;
                    _this.getChildDetails().then(function (x) {
                        if (x) {
                            _this.ChildList = x.CHILDSDATA;
                            if (x.ISTRACKENABLE == 1) {
                                _this.trackingEnable = true;
                            }
                        }
                        console.log(x, 'x');
                    });
                }
                else {
                    _this.isParent = false;
                }
                _this.getRollcallList().then(function (y) {
                    if (!y) {
                        // this.navCtrl.pop();
                        _this.gFn.presentToast('Data Issue or Connection Issue found');
                    }
                    _this.getStaffList().then(function (x) {
                        if (!x) {
                            // this.navCtrl.pop();
                            _this.gFn.presentToast('Data Issue or Connection Issue found');
                        }
                    });
                });
            });
        });
    };
    TransportListPage.prototype.ionViewDidEnter = function () {
        this.highlightMenuIcon();
    };
    TransportListPage.prototype.highlightMenuIcon = function () {
        // $('.tabs .tab-button[aria-selected=true]:nth-child(1)').attr('aria-selected','false')
        $('.tabs .tab-button[aria-selected=false]:nth-child(2)').attr('aria-selected', 'true');
        $('.tabs .tab-button[aria-selected=true]:nth-child(1) .tab-button-icon').css({
            'mask-image': 'url(../assets/images/menu/home.svg)',
            'height': '22px',
            'color': '#dedede'
        });
        // $('.tabs .tab-button[aria-selected=false]:nth-child(2) .tab-button-icon').css({'mask-image': 'url(../assets/images/menu/events-blue.svg)',
        // 'height': '36px',
        // 'color': '#43B7CC'})
    };
    TransportListPage.prototype.getChildDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.EventDetails.transportId)
                .set('parentId', _this.PersonData.PARENT_ID);
            _this.http.post(_this.global.APIURL + "transports/trackingCheckForParent", loginData, { headers: _this.global_api.getHeader() }).subscribe(function (data) {
                if (data.SUCCESS) {
                    resolve(data);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                _this.gFn.presentToast('Connection issue');
            });
        });
    };
    TransportListPage.prototype.getRollcallList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.EventDetails.transportId)
                .set('personId', _this.PersonData.PERSON_ID)
                .set('clientId', _this.PersonData.CLIENT_ID);
            //.set('club_id', this.PersonData.CLUB_ID );// this.PersonData.CLUB_ID, 225
            _this.http.post(_this.global.APIURL + "transports/getRollcall", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    for (var key in data.GETROLLCALL) {
                        _this.rollcallList.push(data.GETROLLCALL[key]);
                    }
                    for (var key1 in data.GETSTATUSLIST) {
                        _this.StatusList.push(data.GETSTATUSLIST[key1]);
                    }
                    // console.log(this.rollcallList)
                    _this.getRollcallListSuccess = '1';
                }
                else {
                    _this.getRollcallListSuccess = '2';
                }
                resolve(true);
            }, function (error) {
                _this.getRollcallListSuccess = '2';
                resolve(false);
            });
        });
    };
    TransportListPage.prototype.ActivateMap = function (key) {
        if (this.ShowMap) {
            $('#map').hide();
            this.ShowMap = false;
            // this.stopTracking()
            // clearInterval(this.CurrentLocationInterval)
            clearInterval(this.LocationInterval);
        }
        else {
            this.loader = this.loadingCtrl.create({});
            this.loader.present();
            $('#map').show();
            // this.getCurrentLocation()
            this.GetLocation(key);
        }
    };
    // getCurrentLocation(){
    //     this.plt.ready().then(() => {
    //       let mapOptions = {
    //         zoom: 13,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP,
    //         mapTypeControl: false,
    //         streetViewControl: false,
    //         fullscreenControl: false
    //       }
    //       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //       this.CurrentLocationInterval=setInterval(()=>{
    //       this.geolocation.getCurrentPosition().then(pos => {
    //         if(pos.coords){
    //           this.CurrentPosition.latitude=pos.coords.latitude
    //           this.CurrentPosition.longitude=pos.coords.longitude
    //         }
    //         let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    //         this.map.setCenter(latLng);
    //         this.map.setZoom(16);
    //         this.ShowMap=true;
    //       }).catch((error) => {
    //       });
    //     },15000)
    //     });
    // }
    // startTracking(destinationLat,destinationLong) {
    //   this.isTracking = true;
    //   this.trackedRoute = [];
    //       setTimeout(() => {
    //         this.trackedRoute.push({ lat: destinationLat, lng: destinationLong });
    //         this.trackedRoute.push({lat:this.CurrentPosition.latitude,lng:this.CurrentPosition.longitude})
    //         if((destinationLat || destinationLong) && (this.CurrentPosition.latitude || this.CurrentPosition.longitude)){
    //           this.loader.dismiss()
    //         }
    //         this.redrawPath(this.trackedRoute);
    //       }, 0);
    // }
    // redrawPath(path) {
    //   if (this.currentMapTrack) {
    //     this.currentMapTrack.setMap(null);
    //   }
    //   if (path.length > 1) {
    //     this.currentMapTrack = new google.maps.Polyline({
    //       path: path,
    //       geodesic: true,
    //       strokeColor: '#ff00ff',
    //       strokeOpacity: 1.0,
    //       strokeWeight: 3
    //     });
    //     this.currentMapTrack.setMap(this.map);
    //   }
    // }
    TransportListPage.prototype.addMarker = function (map, lat1, lng1) {
        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: {
                lat: lat1,
                lng: lng1
            }
        });
        // let content = "<h4>Information!</h4>";
        // this.addInfoWindow(marker, content);
        this.addInfoWindow(marker, lat1, lng1);
    };
    TransportListPage.prototype.addInfoWindow = function (marker, lat1, lng1) {
        // let infoWindow = new google.maps.InfoWindow({
        //   content: content
        // });
        var _this = this;
        google.maps.event.addListener(marker, 'click', function () {
            // infoWindow.open(this.map, marker);
            _this.launchNavigator.navigate(lat1 + ', ' + lng1);
            // clearInterval(this.CurrentLocationInterval)
            clearInterval(_this.LocationInterval);
        });
    };
    TransportListPage.prototype.GetLocation = function (StaffDetail) {
        var _this = this;
        console.log('2');
        clearInterval(this.LocationInterval);
        this.fetchLocation(StaffDetail).then(function (x) {
            if (!x) {
                _this.gFn.presentToast('Connecting...');
                // clearInterval(this.LocationInterval)
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
                    $('#map').hide();
                    _this.ShowMap = false;
                    clearInterval(_this.LocationInterval);
                }
                else {
                    _this.loader.dismiss();
                }
            });
        }, 60000);
    };
    TransportListPage.prototype.fetchLocation = function (StaffDetail) {
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
                .set('staffId', StaffDetail.staff_id);
            _this.http.post(_this.global.APIURL + "transports/getGPSLocation", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS && data.GETGPSLOCATION[0] &&
                    (data.GETGPSLOCATION[0].latitude || data.GETGPSLOCATION[0].longitude)) {
                    console.log('getLocation', data);
                    console.log('3');
                    _this.addMarker(_this.map, data.GETGPSLOCATION[0].latitude, data.GETGPSLOCATION[0].longitude);
                    // this.startTracking(data.GETGPSLOCATION[0].latitude,data.GETGPSLOCATION[0].longitude)
                    var latLng = new google.maps.LatLng(data.GETGPSLOCATION[0].latitude, data.GETGPSLOCATION[0].longitude);
                    _this.map.setCenter(latLng);
                    _this.map.setZoom(16);
                    console.log('4');
                    _this.ShowMap = true;
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
    // stopTracking() {
    //   let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    //   this.previousTracks.push(newRoute);
    //   this.isTracking = false;
    //   this.currentMapTrack.setMap(null);
    // }
    TransportListPage.prototype.ionViewDidLeave = function () {
        // clearInterval(this.CurrentLocationInterval)
        clearInterval(this.LocationInterval);
    };
    TransportListPage.prototype.getStaffList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.EventDetails.transportId) //this.UpcomingSingleEvent.event_id, 2288
                .set('locationEnabled', '1');
            _this.http.post(_this.global.APIURL + "transports/getStaff", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    for (var key in data.GETSTAFF) {
                        if (data.GETSTAFF[key].locationEnabled == 1) {
                            _this.trackingEnable = true;
                        }
                        _this.StaffList.push(data.GETSTAFF[key]);
                    }
                    //console.log(this.StaffList)
                    _this.StaffListSuccess = '1';
                }
                else {
                    _this.StaffListSuccess = '2';
                }
                resolve(true);
            }, function (error) {
                _this.StaffListSuccess = '2';
                resolve(false);
            });
        });
    };
    TransportListPage.prototype.backArrow = function () {
        this.navCtrl.pop();
        this.navCtrl.push('EventDashboardPage');
    };
    TransportListPage.prototype.ArrowFunctionality = function (event) {
        if (this.Arrowflag == false) {
            var target = event.target;
            $(target).closest('.row').find('ul').show();
            $(target).closest('.row').find('ul').addClass('Div-Arrow');
            $(target).closest('.row').find('.collapsed-arrow').removeClass('ArrowLight');
            $(target).closest('.row').find('.collapsed-arrow').addClass('ArrowDark');
            this.Arrowflag = true;
        }
        else if (this.Arrowflag == true) {
            var target = event.target;
            $(target).closest('.row').find('ul').hide();
            $(target).closest('.row').find('.collapsed-arrow').removeClass('ArrowDark');
            $(target).closest('.row').find('.collapsed-arrow').addClass('ArrowLight');
            this.Arrowflag = false;
        }
    };
    TransportListPage.prototype.updateStatus = function (rollcall_id, rollcall_status_id) {
        var _this = this;
        return new Promise(function (resolve) {
            //console.log(rollcall_id,rollcall_status_id)
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('rollcallId', rollcall_id)
                .set('rollcallStatusId', rollcall_status_id)
                .set('createdBy', _this.PersonData.PERSON_ID);
            _this.http.post(_this.global.APIURL + "transports/selfUpdateRollcall", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.gFn.presentToast('Updation Successfull');
                }
                else {
                    _this.gFn.presentToast('Updation unsuccessfull');
                }
                $('.row').find('ul').hide();
                $('.row').find('.collapsed-arrow').removeClass('ArrowDark');
                $('.row').find('.collapsed-arrow').addClass('ArrowLight');
                _this.Arrowflag = false;
                resolve(true);
            }, function (error) {
                _this.gFn.presentToast('Data or Connection Issue found');
            });
        });
    };
    TransportListPage.prototype.showBarcode = function () {
        var playerScannerAttendanceModal = this.modalCtrl.create('PlayerScannerAttendancePage', {}, {
            enableBackdropDismiss: true,
            showBackdrop: true
        });
        playerScannerAttendanceModal.present();
    };
    TransportListPage.prototype.gotomember = function () {
        var trackMember = this.modalCtrl.create('TrackMemberPage', { member: this.isParent, transportId: this.EventDetails.transportId, memberList: (this.isParent ? this.ChildList : this.StaffList) });
        trackMember.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TransportListPage.prototype, "mapElement", void 0);
    TransportListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-transport-list',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-list/transport-list.html"*/'<ion-header class="header-md">\n\n  <ion-navbar class="main">\n\n    <div class="top-bar clearfix">\n\n      <div class="pull-left">\n\n        <div>\n\n            <!-- <button class="BackButton bg-white"(click)="backArrow()"><img src="assets/images/arrow-black.svg"></button> -->\n\n            EVENTS\n\n          </div>\n\n      </div>\n\n  </div>\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n\n\n<ion-content class="borrowPlayer">\n\n  <div class="top-section bgTeal d-flex column" *ngIf="EventDetails">\n\n          <h2 class="header">TRANSPORT</h2>\n\n          <h4 class="info-item text-center inverseText">{{EventDetails.name}}</h4>\n\n          <p class="text-center inverseText">\n\n            <span  *ngIf="EventDetails.ground_name">{{EventDetails.ground_name}}</span>\n\n            <br>\n\n            <span *ngIf="EventDetails.ground_address || EventDetails.ground_state">\n\n              <span>{{EventDetails.ground_address}} {{(EventDetails.ground_address && EventDetails.ground_state)?\',\':\'\'}} {{EventDetails.ground_state}}</span>\n\n            </span>\n\n            <span *ngIf="!EventDetails.ground_address || !EventDetails.ground_state">Undefined Location</span>\n\n          </p>\n\n          <div class="title-md text-center">{{EventDetails.week}} {{EventDetails.days}} {{EventDetails.months}} AT {{EventDetails.time_started}}</div>\n\n          <div class="bus-img text-center mt-30">\n\n              <img src="assets/images/transport/bus-front.svg" alt="">\n\n          </div>\n\n          <div class="full-width mt-20">\n\n            <button  expand="block" class="btn btn-rounded btn-teal"  [class.disabled]="!trackingEnable">\n\n              <span *ngIf="trackingEnable" (click)="gotomember()">CONNECT TO TRACKING</span>\n\n              <span *ngIf="!trackingEnable" (click)="gotomember()">TRACKING DISABLED</span>\n\n            </button>\n\n          </div>\n\n  </div>\n\n  <section class="main">\n\n      <!--<div class="top-bar">\n\n          <div class="col-xs-3 pull-left">\n\n              <div class="backArrow inverse" (click)="backArrow()"></div>\n\n          </div>\n\n          <div class="barcode col-xs-2 pull-right" (click)="showBarcode()">\n\n            <img src="assets/images/transport/barcode-qr.svg" alt="">\n\n          </div>\n\n      </div>-->\n\n      <form action="" class="user-form">\n\n          <h5 class="sub-title text-left col-xs-12">TRANSPORT</h5>\n\n          <section class="profileFirst heightAuto">\n\n              <div class="event-card transportPlayer">\n\n                  <div class="well select-card" [class.locked]="key.isLocked==1" *ngFor="let key of rollcallList;let i=index">\n\n                      <div class="row">\n\n                          <div class="sl-no col-xs-2 p-0">\n\n                              <span class="v-center">{{i+1}}</span>\n\n                          </div>\n\n                          <div class="card-title col-xs-8 p-0">\n\n                              <h5 class="sub-title">{{key.rollcallName}}</h5>\n\n                              <p *ngIf="key.isLocked==1">Locked</p>\n\n                          </div>\n\n                          <div class="event-next checkArrow-group col-xs-2 p-0">\n\n                              <div class="v-center">\n\n                                <div class="arrowUp ArrowLight" (click)="ArrowFunctionality($event)">\n\n                                  <ion-icon name="ios-arrow-down" class=" collapsed-arrow"></ion-icon>\n\n                                </div>\n\n                              </div>\n\n                          </div>\n\n                          <ul class="dropdown-menu card-dropdown" style="display:none; ">\n\n                              <li *ngFor="let key1 of StatusList" (click)="updateStatus(key.rollcall_id,key1.rollcall_status_id)">\n\n                                <a href="javascript:void(0)">{{key1.status_name}}</a>\n\n                              </li>\n\n          \n\n                          </ul>\n\n                      </div>\n\n                  </div>\n\n                  <div class="well select-card" *ngIf="rollcallList.length<1 && (getRollcallListSuccess==\'1\' || getRollcallListSuccess==\'2\')">\n\n                    <div class="row">\n\n                      <div class="card-img col-xs-2 p-0">\n\n                        \n\n                      </div>\n\n                      <div class="card-title col-xs-8">\n\n                        <p style="text-align: center">No Data Found</p>\n\n                      </div>\n\n                      <div class="event-next col-xs-2 p-0">\n\n                        \n\n                      </div>\n\n                    </div>\n\n                </div>\n\n              </div>\n\n              <!-- <h5 class="sub-title text-left col-xs-12">LOCATION</h5>\n\n              <div #map id="map" style="display: none"></div>\n\n              <div class="event-card location">\n\n                  <div class="well select-card" *ngFor="let key of StaffList">\n\n                      <div class="row" (click)="ActivateMap(key)">\n\n                        <div class="card-img col-xs-2 p-0">\n\n                          <span class="">\n\n                            <img *ngIf="key.photoPath" alt="" class="img-circle" src={{global.PROFILEIMAGEURL}}{{key.photoPath}}>\n\n                            <div *ngIf="!key.photoPath" class="img-circle"><span class="img-text">{{key.firstName[0]}} {{key.lastName[0]}} </span></div>\n\n                          </span>\n\n                        </div>\n\n                        <div class="card-title col-xs-8">\n\n                            {{key.firstName}} {{key.lastName}}\n\n                            <p><span *ngIf="key.vehicleName">{{key.vehicleName}}</span></p>\n\n                        </div>\n\n                        <div class="event-next col-xs-2 p-0">\n\n                          <a class="next-arrow v-center" href="javascript:void(0);"><i aria-hidden="true" class="fa fa-chevron-right"></i></a>\n\n                        </div>\n\n                      </div>\n\n                  </div>\n\n                  <div class="well select-card" *ngIf="StaffList.length<1 && (StaffListSuccess==\'2\' || StaffListSuccess==\'1\')">\n\n                    <div class="row">\n\n                      <div class="card-img col-xs-2 p-0">\n\n                        \n\n                      </div>\n\n                      <div class="card-title col-xs-8">\n\n                        <p style="text-align: center">No Data Found</p>\n\n                      </div>\n\n                      <div class="event-next col-xs-2 p-0">\n\n                        \n\n                      </div>\n\n                    </div>\n\n                </div>\n\n                 \n\n              </div> -->\n\n          </section>\n\n      </form>\n\n  </section>\n\n      \n\n</ion-content>\n\n\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-list/transport-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation_ngx__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], TransportListPage);
    return TransportListPage;
}());

//# sourceMappingURL=transport-list.js.map

/***/ })

});
//# sourceMappingURL=7.js.map