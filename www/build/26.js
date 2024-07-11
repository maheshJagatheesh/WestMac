webpackJsonp([26],{

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RollcallsPageModule", function() { return RollcallsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rollcalls__ = __webpack_require__(929);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RollcallsPageModule = /** @class */ (function () {
    function RollcallsPageModule() {
    }
    RollcallsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rollcalls__["a" /* RollcallsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rollcalls__["a" /* RollcallsPage */]),
            ],
        })
    ], RollcallsPageModule);
    return RollcallsPageModule;
}());

//# sourceMappingURL=rollcalls.module.js.map

/***/ }),

/***/ 929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RollcallsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation_ngx__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator_ngx__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_interval__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var RollcallsPage = /** @class */ (function () {
    function RollcallsPage(navCtrl, http, storage, navParams, global, gFn, events, modalCtrl, loadingCtrl, launchNavigator, geolocation, platform, global_api) {
        // this.gFn.showMenuIcon()
        /* platform.registerBackButtonAction(() => {
          this.navCtrl.pop();
          this.navCtrl.push('EventDashboardPage');
        });  */
        // this.gFn.showMenuIcon();
        // this.GetLocation()
        // this.gFn.hideMenuIcon();
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.navParams = navParams;
        this.global = global;
        this.gFn = gFn;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.launchNavigator = launchNavigator;
        this.geolocation = geolocation;
        this.platform = platform;
        this.global_api = global_api;
        this.PersonData = [];
        this.StaffData = [];
        this.rollcallList = [];
        this.staffList = [];
        this.vehicleList = [];
        this.locationTracking = '0';
        this.activeRollcallID = '';
        this.staffId = '';
        this.PreviousVehicleId = '';
        this.isStaffPassengerOpened = false;
        this.passengerLists = [];
        // this.getAdditionalPassengerList();
    }
    RollcallsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // console.log([].indexOf(5))
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            _this.storage.get('EventDetails').then(function (val) {
                _this.EventDetails = val[0];
                _this.transportId = _this.EventDetails.transportId;
                // this.EventDetails.transportId=1;
                _this.storage.get('loggedInUserData').then(function (val) {
                    _this.PersonData = val;
                    var loader = _this.loadingCtrl.create({});
                    loader.present();
                    _this.getRollcallList().then(function (x) {
                        _this.getStaffList().then(function (y) {
                            _this.getVehicleList().then(function (z) {
                                _this.getAdditionalPassengerList().then(function (m) {
                                    loader.dismiss();
                                });
                            });
                        });
                    });
                });
            });
        });
        this.setIntervalForRollcallVehicle();
    };
    RollcallsPage.prototype.ionViewDidEnter = function () {
        this.highlightMenuIcon();
    };
    RollcallsPage.prototype.setIntervalForRollcallVehicle = function () {
        var _this = this;
        if (typeof this.listObservable != 'undefined') {
            this.listObservable.unsubscribe();
        }
        this.listObservable = __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"].interval(3000).subscribe(function (val) {
            _this.getRollcallList();
            _this.getVehicleList();
        });
    };
    RollcallsPage.prototype.stopIntervalForRollcallVehicle = function () {
        if (typeof this.listObservable != 'undefined') {
            this.listObservable.unsubscribe();
        }
    };
    RollcallsPage.prototype.ionViewWillLeave = function () {
        this.stopIntervalForRollcallVehicle();
    };
    RollcallsPage.prototype.getRollcallList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.EventDetails.transportId)
                .set('clientId', _this.PersonData.CLIENT_ID);
            _this.http.post(_this.global.APIURL + "transports/getRollcall", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.rollcallList = data.GETROLLCALL;
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    RollcallsPage.prototype.getStaffList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.EventDetails.transportId);
            _this.http.post(_this.global.APIURL + "transports/getStaff", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.staffList = data.GETSTAFF;
                    for (var key in _this.staffList) {
                        if (_this.staffList[key].person_id == _this.PersonData.PERSON_ID) {
                            _this.StaffData = _this.staffList[key];
                            _this.staffId = _this.staffList[key].staff_id;
                            if (_this.staffList[key].isPassenger == 1) {
                                _this.staffIsPassenger = true;
                                $(".staffIsPassenger").prop('checked', true);
                            }
                            if (_this.staffList[key].locationEnabled == 1) {
                                _this.locationTracking = '1';
                                _this.checkLocationTrack(_this.staffList[key].vehiclesId);
                                setTimeout(function () {
                                    $(".locationTracking").prop('checked', true);
                                }, 100);
                                _this.SendLocation(_this.staffId);
                            }
                            if (!_this.isStaffPassengerOpened && !_this.staffIsPassenger) {
                                _this.isStaffPassengerOpened = true;
                                _this.openStaffPassengerModal();
                            }
                        }
                    }
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    RollcallsPage.prototype.getVehicleList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.EventDetails.transportId);
            _this.http.post(_this.global.APIURL + "transports/getVehicles", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.vehicleList = data.GETVEHICLES;
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    RollcallsPage.prototype.checkLocationTrack = function (id) {
        var _this = this;
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('transportId', this.EventDetails.transportId)
            .set('person_id', this.PersonData.PERSON_ID)
            .set('locationEnabled', this.locationTracking)
            .set('transportVehicleId', id);
        this.http.post(this.global.APIURL + "transports/locationEnabledDisable", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (_this.locationTracking == '1' && data.SUCCESS && data.LOCATIONENABLEDDISABLE) {
                _this.SendLocationToast = true;
                _this.StartedTracking = true;
                _this.trackingDetails = { AVAILABLEBUSLIST: data.AVAILABLEBUSLIST, SELECTEDBUS: data.SELECTEDBUS };
                console.log(_this.trackingDetails);
                // this.SendLocation(this.StaffData.staff_id)
            }
            // else{
            //   this.StartedTracking=false
            //   clearInterval(this.LocationInterval)
            // }
            // this.getStaffList()
        }, function (error) {
        });
    };
    RollcallsPage.prototype.setLocationTracking = function () {
        var _this = this;
        if (this.StaffData.staff_id) {
            this.locationTracking = (this.locationTracking == '0') ? '1' : '0';
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', this.EventDetails.transportId)
                .set('person_id', this.PersonData.PERSON_ID)
                .set('locationEnabled', this.locationTracking)
                .set('transportVehicleId', this.PreviousVehicleId);
            this.http.post(this.global.APIURL + "transports/locationEnabledDisable", loginData, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                if (_this.locationTracking == '1' && data.SUCCESS && data.LOCATIONENABLEDDISABLE) {
                    _this.SendLocationToast = true;
                    _this.StartedTracking = true;
                    _this.trackingDetails = { AVAILABLEBUSLIST: data.AVAILABLEBUSLIST, SELECTEDBUS: data.SELECTEDBUS };
                    console.log(_this.trackingDetails);
                    _this.SendLocation(_this.StaffData.staff_id);
                }
                else {
                    _this.StartedTracking = false;
                    clearInterval(_this.LocationInterval);
                }
                _this.getStaffList();
            }, function (error) {
            });
        }
        else {
            this.gFn.presentToast('Not have access to activate this feature');
        }
    };
    RollcallsPage.prototype.updateVehicle = function () {
        var _this = this;
        this.stopIntervalForRollcallVehicle();
        var Modal = this.modalCtrl.create('VehicleListPage', { details: this.trackingDetails.AVAILABLEBUSLIST });
        Modal.present();
        Modal.onDidDismiss(function (data) {
            console.log(data);
            _this.PreviousVehicleId = data;
            _this.locationTracking = '0';
            _this.setLocationTracking();
            _this.setIntervalForRollcallVehicle();
        });
    };
    RollcallsPage.prototype.SendLocation = function (staffId) {
        var _this = this;
        this.LocationInterval = setInterval(function () {
            _this.geolocation.getCurrentPosition().then(function (resp) {
                // console.log(resp)
                return new Promise(function (resolve) {
                    var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                        .set('staffId', staffId)
                        .set('latitude', (resp.coords.latitude.toFixed(10)))
                        .set('longitude', (resp.coords.longitude.toFixed(10)));
                    _this.http.post(_this.global.APIURL + "transports/updateGPSLocation", loginData, { headers: _this.global_api.getHeader() })
                        .subscribe(function (data) {
                        if (data.SUCCESS && data.UPDATEGPSLOCATION && _this.SendLocationToast) {
                            _this.gFn.presentToast('Location Tracking Started');
                        }
                        else if (!data.SUCCESS && _this.SendLocationToast) {
                            _this.gFn.presentToast('Location Tracking not starting');
                        }
                        _this.SendLocationToast = false;
                        resolve(true);
                    }, function (error) {
                        if (_this.SendLocationToast) {
                            _this.gFn.presentToast('Location Tracking not starting');
                            _this.SendLocationToast = false;
                        }
                        resolve(false);
                    });
                });
            });
        }, 5000);
    };
    RollcallsPage.prototype.openRollcallModal = function () {
        var _this = this;
        this.stopIntervalForRollcallVehicle();
        this.gFn.hideMenuIcon();
        var data = {
            event_id: this.UpcomingSingleEvent.event_id,
            transportId: this.EventDetails.transportId,
            selectedTeam: this.PersonData.SELECTEDTEAM,
            client_id: this.PersonData.CLIENT_ID,
            createdBy: this.PersonData.PERSON_ID
        };
        var rollcallModal = this.modalCtrl.create('AddRollcallsPage', data, {
            enableBackdropDismiss: true,
            showBackdrop: true
        });
        rollcallModal.onDidDismiss(function () {
            _this.ionViewDidLoad();
            _this.gFn.showMenuIcon();
            _this.setIntervalForRollcallVehicle();
        });
        rollcallModal.present();
    };
    RollcallsPage.prototype.openStaffModal = function (staffId, staffName) {
        var _this = this;
        if (staffId === void 0) { staffId = ''; }
        if (staffName === void 0) { staffName = ''; }
        this.stopIntervalForRollcallVehicle();
        var data = {
            event_id: this.UpcomingSingleEvent.event_id,
            transportId: this.EventDetails.transportId,
            staffId: staffId,
            staffName: staffName,
            selectedTeam: this.PersonData.SELECTEDTEAM,
            client_id: this.PersonData.CLIENT_ID,
            createdBy: this.PersonData.PERSON_ID
        };
        var staffModal = this.modalCtrl.create('TransportAddStaffPage', data, {
            enableBackdropDismiss: true,
            showBackdrop: true
        });
        staffModal.onDidDismiss(function () {
            _this.ionViewDidLoad();
        });
        staffModal.present();
    };
    RollcallsPage.prototype.openStaffPassengerModal = function () {
        var _this = this;
        this.stopIntervalForRollcallVehicle();
        var data = {
            event_id: this.UpcomingSingleEvent.event_id,
            transportId: this.EventDetails.transportId,
            staffId: this.staffId,
            selectedTeam: this.PersonData.SELECTEDTEAM,
            client_id: this.PersonData.CLIENT_ID,
            createdBy: this.PersonData.PERSON_ID
        };
        var staffModal = this.modalCtrl.create('TransportStaffPassengerPage', data, {
            enableBackdropDismiss: true,
            showBackdrop: true
        });
        staffModal.onDidDismiss(function () {
            _this.ionViewDidLoad();
        });
        staffModal.present();
    };
    RollcallsPage.prototype.openVehicleModal = function (vehicleId, vehicleName) {
        var _this = this;
        if (vehicleId === void 0) { vehicleId = ''; }
        if (vehicleName === void 0) { vehicleName = ''; }
        this.stopIntervalForRollcallVehicle();
        var data = {
            event_id: this.UpcomingSingleEvent.event_id,
            transportId: this.EventDetails.transportId,
            vehicleId: vehicleId,
            vehicleName: vehicleName,
            selectedTeam: this.PersonData.SELECTEDTEAM,
            client_id: this.PersonData.CLIENT_ID,
            createdBy: this.PersonData.PERSON_ID
        };
        var vehicleModal = this.modalCtrl.create('VehiclePage', data, {
            enableBackdropDismiss: true,
            showBackdrop: true
        });
        vehicleModal.onDidDismiss(function () {
            _this.ionViewDidLoad();
        });
        vehicleModal.present();
    };
    RollcallsPage.prototype.goToRollcallDetails = function (rollcallID, rollcallName, rollcalIisLocked) {
        var _this = this;
        if (this.staffId == '') {
            this.gFn.presentAlert('Access Denied', 'You are not a staff');
            return;
        }
        this.stopIntervalForRollcallVehicle();
        this.activeRollcallID = rollcallID;
        var data = {
            rollcallID: rollcallID,
            transportId: this.EventDetails.transportId,
            rollcalIisLocked: rollcalIisLocked,
            rollcallName: rollcallName
        };
        setTimeout(function () {
            var Modal = _this.modalCtrl.create('RollcallsPlayersPage', data);
            Modal.onDidDismiss(function () {
                _this.getRollcallList();
                _this.getVehicleList();
                _this.setIntervalForRollcallVehicle();
            });
            Modal.present();
            // this.navCtrl.push('RollcallsPlayersPage', data);
            _this.gFn.hideMenuIcon();
            _this.activeRollcallID = '';
        }, 300);
    };
    RollcallsPage.prototype.backArrow = function () {
        this.navCtrl.pop();
        this.navCtrl.push('EventDashboardPage');
        // this.gFn.showMenuIcon()
    };
    RollcallsPage.prototype.openVehicle = function () {
        this.navCtrl.push('VehicleListPage');
    };
    RollcallsPage.prototype.gotoVehicleDetails = function (val) {
        var _this = this;
        this.stopIntervalForRollcallVehicle();
        this.gFn.hideMenuIcon();
        var Modal = this.modalCtrl.create('VehicleDetailsPage', { details: val });
        Modal.onDidDismiss(function () {
            _this.getRollcallList();
            _this.getVehicleList();
            _this.setIntervalForRollcallVehicle();
        });
        Modal.present();
    };
    RollcallsPage.prototype.highlightMenuIcon = function () {
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
    RollcallsPage.prototype.updateStaffIsPassenger = function () {
        this.staffIsPassenger = (this.staffIsPassenger == '1') ? '0' : '1';
        /* let loader = this.loadingCtrl.create({});
        loader.present(); */
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('transportId', this.EventDetails.transportId)
            .set('staffId', this.staffId)
            .set('isPassenger', this.staffIsPassenger);
        this.http.post(this.global.APIURL + "transports/updateStaffIsPassenger", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            //loader.dismiss();
        }, function (error) {
            //loader.dismiss();
        });
    };
    RollcallsPage.prototype.goToAdditionalPassPage = function (transport_Id) {
        this.navCtrl.push('AdditionalPassengerPage', { transportId: transport_Id });
    };
    RollcallsPage.prototype.getAdditionalPassengerList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.EventDetails.transportId);
            /*let loading = this.loadingCtrl.create();
            loading.present();*/
            _this.http.post(_this.global.APIURL + "transports/getAdditionalPassenger", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                //loading.dismiss();
                if (response.SUCCESS) {
                    _this.passengerLists = [];
                    var passengerList = response.ADDITIONALPASSENGER;
                    for (var key in passengerList) {
                        _this.passengerLists.push(passengerList[key]);
                    }
                }
                resolve(true);
            }, function (error) {
                //loading.dismiss();
            });
        });
    };
    RollcallsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-rollcalls',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/rollcalls/rollcalls.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            Transport\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class=" borrowPlayer">\n\n    <div class="top-section bgTeal d-flex column" *ngIf="EventDetails">\n\n            <h2 class="header">TRANSPORT</h2>\n\n            <h4 class="info-item text-center ff_impliment inverseText">{{EventDetails.name}}</h4>\n\n            <p class="text-center inverseText">\n\n                <span  *ngIf="EventDetails.ground_name">{{EventDetails.ground_name}}</span>\n\n                <br>\n\n                <span *ngIf="EventDetails.ground_address || EventDetails.ground_state">\n\n                <span>{{EventDetails.ground_address}} {{(EventDetails.ground_address && EventDetails.ground_state)?\',\':\'\'}} {{EventDetails.ground_state}}</span>\n\n                </span>\n\n                <span *ngIf="!EventDetails.ground_address || !EventDetails.ground_state">Undefined Location</span>\n\n            </p>\n\n            <div class="title-md text-center">{{EventDetails.week}} {{EventDetails.days}} {{EventDetails.months}} AT {{EventDetails.time_started}}</div>\n\n            <div class="bus-img text-center mt-10">\n\n                <img src="assets/images/transport/bus-front.svg" alt="">\n\n            </div>\n\n            <div class="toggleGroup clearfix">\n\n                <div class="toggle pull-left">\n\n                    <label class="switch">\n\n                        <input type="checkbox" class="staffIsPassenger">\n\n                        <span class="slider round" (click)="updateStaffIsPassenger()"></span>\n\n                    </label>\n\n                </div>\n\n                <div class="text-info pull-left inverseText">I am a passenger\n\n                    <div class="no-vehicle text-left" *ngIf="!StartedTracking || !trackingDetails.SELECTEDBUS.length">No vehicle selected</div>\n\n                    <div class="no-vehicle text-left" *ngIf="StartedTracking && trackingDetails.SELECTEDBUS.length">{{trackingDetails.SELECTEDBUS[0].VEHICLENAME}}  Wrong one? <span (click)="updateVehicle()" class="ul-text">update vehicle</span></div>\n\n                </div>\n\n            </div>\n\n            <div class="toggleGroup clearfix" *ngIf="staffIsPassenger == \'1\'">\n\n                <div class="toggle pull-left">\n\n                    <label class="switch">\n\n                        <input type="checkbox" class="locationTracking">\n\n                        <span class="slider round" (click)="setLocationTracking()"></span>\n\n                    </label>\n\n                </div>\n\n                <div class="text-info pull-left inverseText">Enable localisation tracking\n\n                    <div class="no-vehicle text-left" *ngIf="!StartedTracking || !trackingDetails.SELECTEDBUS.length">No vehicle selected</div>\n\n                    <div class="no-vehicle text-left" *ngIf="StartedTracking && trackingDetails.SELECTEDBUS.length">{{trackingDetails.SELECTEDBUS[0].VEHICLENAME}}  Wrong one? <span (click)="updateVehicle()" class="ul-text">update vehicle</span></div>\n\n                </div>\n\n            </div>\n\n            <div class="full-width mt-20">\n\n                <button  expand="block" class="btn btn-rounded btn-teal" (click)="openRollcallModal()">\n\n                    <span>CREATE ROLLCALL</span>\n\n                </button>\n\n            </div>\n\n    </div>\n\n    <section class="main mt-20">\n\n        <form action="" class="user-form">\n\n          <!-- <div class="toggleGroup clearfix">\n\n              <div class="text-info pull-left inverseText">Enable localisation tracking:</div>\n\n              <div class="toggle pull-right">\n\n                  <label class="switch">\n\n                    <input type="checkbox" class="locationTracking">\n\n                    <span class="slider round" (click)="setLocationTracking()"></span>\n\n                  </label>\n\n              </div>\n\n          </div> -->\n\n            <h5 class="sm-title text-left col-xs-12">ROLLCALLS</h5>\n\n            <section class="profileFirst heightAuto">\n\n                <div class="event-card borrow" [class.emptyCard]="rollcallList.length == 0">\n\n                    <div class="well select-card selectCard d-flex align-center noRollcall" *ngIf="rollcallList.length == 0">\n\n                        <div class="row">\n\n                            <div class="col-xs-12">\n\n                                <h5 class="sub-title">NO ROLLCALLS</h5>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="well select-card" [class.active]="rollcall.rollcall_id==activeRollcallID" [class.locked]="rollcall.isLocked==1" *ngFor="let rollcall of rollcallList;let i=index" (click)="goToRollcallDetails(rollcall.rollcall_id, rollcall.rollcallName, rollcall.isLocked)">\n\n                      <div class="row">\n\n                          <div class="sl-no col-xs-2 p-0">\n\n                              <span class="v-center">{{i+1}}</span>\n\n                          </div>\n\n                          <div class="card-title col-xs-7 p-0">\n\n                              {{rollcall.rollcallName.toString() | titlecase}}\n\n                              <p *ngIf="rollcall.isLocked==1">Locked</p>\n\n                          </div>\n\n                          <div class="col-xs-2 p-0 d-flex justify-center align-center">\n\n                                <span class="count">{{rollcall.presentCount}}/{{rollcall.passengers}}</span>\n\n                            </div>\n\n                          <div class="event-next checkArrow-group col-xs-1 p-0">\n\n                              <div class="v-center">\n\n                                <div class="arrowUp ArrowLight">\n\n                                  <a class="next-arrow v-center" href="javascript:void(0);"><i aria-hidden="true" class="fa fa-chevron-right"></i></a>\n\n                                </div>\n\n                              </div>\n\n                          </div>\n\n                          <ul class="dropdown-menu card-dropdown" style="display:none; ">\n\n                              <li>\n\n                                <a href="javascript:void(0)"></a>\n\n                              </li>\n\n          \n\n                          </ul>\n\n                      </div>\n\n                    </div>\n\n                    <!-- <div class="circle-plus addIconCircle mt-20">\n\n                        <ion-icon ios="ios-add" md="md-add" class="addIcon"></ion-icon>\n\n                    </div> -->\n\n                </div>\n\n               \n\n                <h5 class="sm-title text-left col-xs-12">VEHICLES</h5>\n\n                <div class="event-card location" [class.emptyCard]="vehicleList.length == 0">\n\n                    <div class="well select-card selectCard d-flex align-center" *ngIf="vehicleList.length == 0">\n\n                        <div class="row">\n\n                            <div class="col-xs-12">\n\n                                <h5 class="sub-title">NO VEHICLE</h5>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="well select-card" *ngFor="let vehicle of vehicleList" (click)="gotoVehicleDetails(vehicle)">\n\n                        <div class="row">\n\n                            <div class="card-title col-xs-9">\n\n                                <div class="avatar-group d-flex column">\n\n                                    {{vehicle.vehicleName.toString() | uppercase}}\n\n                                    <div class="d-flex justify-center p-0">\n\n                                        <div class="img-xs" *ngFor="let key1 of vehicle.staffList;let i=index" [class.overlapImg]="i>0">\n\n                                            <span class="" *ngIf="key1.PHOTOPATH">\n\n                                                <img alt="" class="staffImage img-circle" src={{global.PROFILEIMAGEURL}}{{key1.PHOTOPATH}}>\n\n                                            </span>\n\n                                            <span class="" *ngIf="key1.PHOTOPATH==\'\'">\n\n                                                <div class="img-xs"><span class="img-text">{{key1.FIRSTNAME[0]}} {{key1.LASTNAME[0]}} </span></div>                                  \n\n                                            </span>\n\n                                        </div>\n\n                                        <!-- <div class="img-xs overlapImg">\n\n                                            <span class="">\n\n                                                <img alt="" class="img-circle" src=\'http://api-dev.gojaro.com/profileimage/27443.jpg\'>\n\n                                            </span>\n\n                                        </div> -->\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                            <div class="col-xs-2 p-0 d-flex justify-center align-center">\n\n                                    <span class="count">{{vehicle.totalPassenger?vehicle.totalPassenger:\'0\'}}/{{vehicle.vehicleCapacity?vehicle.vehicleCapacity:\'0\'}}</span>\n\n                                </div>\n\n                            <div class="event-next col-xs-1 p-0">\n\n                                <a class="next-arrow v-center" href="javascript:void(0);"><i aria-hidden="true" class="fa fa-chevron-right"></i></a>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="circle-plus addIconCircle mt-20">\n\n                        <ion-icon ios="ios-add" md="md-add" class="addIcon" (click)="openVehicleModal()"></ion-icon>\n\n                    </div>\n\n                </div>\n\n                <h5 class="sm-title text-left col-xs-12">TRANSPORT STAFF</h5>\n\n                <div class="event-card location" [class.emptyCard]="staffList.length == 0">\n\n                    <div class="well select-card selectCard d-flex align-center" *ngIf="staffList.length == 0">\n\n                        <div class="row">\n\n                            <div class="col-xs-12">\n\n                                <h5 class="sub-title">NO STAFF</h5>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="well select-card" *ngFor="let staff of staffList" (click)="openStaffModal(staff.staff_id, staff.firstName +\' \'+ staff.lastName)">\n\n                        <div class="row">\n\n                          <div class="card-img col-xs-2 p-0">\n\n                              <span class="" *ngIf="staff.photoPath==\'\'">\n\n                                  <div class="img-circle"><span class="img-text">{{staff.firstName[0]}} {{staff.lastName[0]}} </span></div>                                  \n\n                              </span>\n\n                              <span class="" *ngIf="staff.photoPath">\n\n                                  <img src="{{global.PROFILEIMAGEURL}}{{staff.photoPath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n\n                              </span>\n\n                          </div>\n\n                          <div class="card-title col-xs-9">\n\n                              {{staff.firstName | uppercase}} {{staff.lastName | uppercase}}\n\n                              <span class="busName">{{staff.vehicleName}}</span>\n\n                          </div>\n\n                          <div class="event-next col-xs-1 p-0">\n\n                            <!-- <a class="next-arrow v-center" href="javascript:void(0);" *ngIf="staff.locationEnabled==1"><i aria-hidden="true" class="fa fa-chevron-right"></i></a> -->\n\n                            <a class="next-arrow v-center" href="javascript:void(0);" *ngIf="staff.locationEnabled==1">\n\n                                <img alt="" class="img-circle" src=\'/assets/images/transport/location-green.svg\'>\n\n                            </a>\n\n                          </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="addIconCircle mt-20">\n\n                        <ion-icon ios="ios-add" md="md-add" class="addIcon edit-icon staffIcon" (click)="openStaffModal()"></ion-icon>\n\n                    </div>\n\n                </div>\n\n\n\n                <h5 class="sm-title text-left col-xs-12">ADDITIONAL PASSENGER</h5>\n\n                <div class="event-card location">\n\n                    <div class="well select-card selectCard d-flex align-center" *ngIf="passengerLists.length == 0">\n\n                        <div class="row">\n\n                            <div class="col-xs-12">\n\n                                <h5 class="sub-title">NO ADDITIONAL PASSENGER</h5>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="well select-card" *ngFor="let passengerList of passengerLists">\n\n                        <div class="row">\n\n                            <div class="card-img col-xs-2 p-0">\n\n                                <span class="" *ngIf="passengerList.PHOTOPATH==\'\'">\n\n                                    <div class="img-circle"><span class="img-text">{{passengerList.FIRSTNAME[0]}} {{passengerList.LASTNAME[0]}}</span></div>                                  \n\n                                </span>\n\n                                <span class="" *ngIf="passengerList.PHOTOPATH !=\'\'">\n\n                                    <img src="{{global.PROFILEIMAGEURL}}{{passengerList.PHOTOPATH}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n\n                                </span>\n\n                            </div>\n\n                            <div class="card-title col-xs-9">\n\n                                {{passengerList.FIRSTNAME | uppercase}} {{passengerList.LASTNAME | uppercase}}\n\n                                <span class="busName">{{passengerList.VEHICLENAME}}</span>\n\n                            </div>\n\n                            <!--<div class="event-next col-xs-1 p-0">\n\n                            <a class="next-arrow v-center" href="javascript:void(0);" *ngIf="staff.locationEnabled==1">\n\n                                <img alt="" class="img-circle" src=\'/assets/images/transport/location-green.svg\'>\n\n                            </a>\n\n                            </div>-->\n\n                        </div>\n\n                    </div>\n\n                    <div class="circle-plus addIconCircle mt-20">\n\n                        <ion-icon ios="ios-add" md="md-add" class="addIcon" (click)="goToAdditionalPassPage(transportId)"></ion-icon>\n\n                    </div>\n\n                </div>\n\n            </section>\n\n        </form>\n\n        </section>\n\n        \n\n  </ion-content>\n\n  \n\n  '/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/rollcalls/rollcalls.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator_ngx__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation_ngx__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], RollcallsPage);
    return RollcallsPage;
}());

//# sourceMappingURL=rollcalls.js.map

/***/ })

});
//# sourceMappingURL=26.js.map