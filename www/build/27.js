webpackJsonp([27],{

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RollcallsPlayersPageModule", function() { return RollcallsPlayersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rollcalls_players__ = __webpack_require__(928);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RollcallsPlayersPageModule = /** @class */ (function () {
    function RollcallsPlayersPageModule() {
    }
    RollcallsPlayersPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rollcalls_players__["a" /* RollcallsPlayersPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rollcalls_players__["a" /* RollcallsPlayersPage */]),
            ],
        })
    ], RollcallsPlayersPageModule);
    return RollcallsPlayersPageModule;
}());

//# sourceMappingURL=rollcalls-players.module.js.map

/***/ }),

/***/ 928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RollcallsPlayersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_speech_recognition_ngx__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_interval__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var RollcallsPlayersPage = /** @class */ (function () {
    function RollcallsPlayersPage(navCtrl, http, storage, navParams, global, gFn, events, modalCtrl, loadingCtrl, actionSheetCtrl, keyboard, speechRecognition, viewCtrl, global_api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.navParams = navParams;
        this.global = global;
        this.gFn = gFn;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.keyboard = keyboard;
        this.speechRecognition = speechRecognition;
        this.viewCtrl = viewCtrl;
        this.global_api = global_api;
        this.passengersList = [];
        this.passengersListRoot = [];
        this.passengersListSuccess = '0';
        this.rollcallID = '';
        this.getPassengerFilters = {};
        this.ShowFilter = false;
        this.getFilterSuccess = '0';
        this.StaffListFilter = [];
        this.VehicleListFilter = [];
        this.StatusListFilter = [];
        this.TeamListFilter = [];
        this.SportListFilter = [];
        this.getNameFilter = '';
        this.vehiclesId = '';
        this.staffId = 0;
        this.Count = 0;
        this.TotalCount = 0;
        this.removeOptions = [];
        this.activePassengerId = '';
        this.isUpdating = false;
        this.presentStatusId = '';
        this.isFilterEnabled = 0;
        this.rollcalIisLocked = 0;
        this.firstLoad = true;
        this.rollcallID = navParams.get('rollcallID');
        this.rollcallName = navParams.get('rollcallName');
        this.activeFilter = 'all';
        this.transportId = navParams.get('transportId');
        this.rollcalIisLocked = navParams.get('rollcalIisLocked');
        // this.gFn.hideMenuIcon();
        gFn.hideFormAccessoryBar();
    }
    RollcallsPlayersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getPassengerFilters = {
            isDynamic: '',
            nameFilter: '',
            sportId: [],
            teamId: [],
            rollcallStatusId: [],
            staffId: [],
            vehiclesId: [],
        };
        this.activePassengerId = '';
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            _this.storage.get('loggedInUserData').then(function (val1) {
                _this.PersonData = val1;
                // console.log(this.PersonData)
                _this.getFiltersList().then(function (x) {
                    _this.getPassengersList().then(function (y) {
                        if (_this.isUpdating && (_this.Count == _this.TotalCount)) {
                            _this.gFn.presentToast('Rollcall completed', 'success');
                        }
                        _this.isUpdating = false;
                    });
                });
                // this.loader = this.loadingCtrl.create({});
                // this.loader.present();
            });
        });
    };
    RollcallsPlayersPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.gFn.hideFormAccessoryBar();
        if (typeof this.listObservable != 'undefined') {
            this.listObservable.unsubscribe();
        }
        this.listObservable = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"].interval(5000).subscribe(function (val) {
            _this.firstLoad = false;
            _this.getPassengersList().then(function (y) {
                if (_this.isUpdating && (_this.Count == _this.TotalCount)) {
                    _this.gFn.presentToast('Rollcall completed', 'success');
                }
                _this.isUpdating = false;
            });
        });
    };
    RollcallsPlayersPage.prototype.ionViewWillLeave = function () {
        this.gFn.hideFormAccessoryBar(true);
        if (typeof this.listObservable != 'undefined') {
            this.listObservable.unsubscribe();
        }
    };
    RollcallsPlayersPage.prototype.getPassengersList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('rollcallId', _this.rollcallID) //this.rollcallID,22
                .set('isDynamic', _this.getPassengerFilters.isDynamic)
                .set('nameFilter', _this.getPassengerFilters.nameFilter)
                .set('rollcallStatusIds', JSON.stringify(_this.getPassengerFilters.rollcallStatusId))
                .set('staffIds', JSON.stringify(_this.getPassengerFilters.staffId))
                .set('vehiclesIds', JSON.stringify(_this.getPassengerFilters.vehiclesId))
                .set('clientId', _this.PersonData.CLIENT_ID)
                .set('sportIds', JSON.stringify(_this.getPassengerFilters.sportId))
                .set('teamIds', JSON.stringify(_this.getPassengerFilters.teamId))
                .set('mainStaffId', _this.staffId);
            _this.http.post(_this.global.APIURL + "transports/getPassengers", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.passengersListRoot = data;
                    _this.SubFilter(_this.activeFilter);
                    // console.log(this.passengersListRoot)
                    // this.passengersList = data.GETPASSENGERS;
                    // this.presentCount = data.PRESENTCOUNT;
                    // this.TotalCount=this.passengersList.length
                    // this.removeOptions = data.PASSENGERREMOVEOPTION;
                    _this.passengersListSuccess = '1';
                    resolve(true);
                }
                else {
                    _this.passengersListSuccess = '2';
                    resolve(false);
                }
            }, function (error) {
                _this.passengersListSuccess = '2';
                resolve(false);
            });
        });
    };
    RollcallsPlayersPage.prototype.SubFilter = function (key) {
        $('.FilterCard').find('.unactive').removeClass('.active');
        this.activeFilter = key;
        if (this.passengersListRoot.LASTVEHICLEID != '' && this.firstLoad) {
            this.vehiclesId = this.passengersListRoot.LASTVEHICLEID;
        }
        this.rollcalIisLocked = this.passengersListRoot.ISLOCKED;
        if (key == 'all') {
            this.passengersList = this.passengersListRoot.GETPASSENGERS;
            if (this.isFilterEnabled <= 0) {
                this.Count = this.passengersListRoot.PRESENTCOUNT;
            }
            else {
                this.Count = this.passengersListRoot.COUNT;
            }
            this.TotalCount = this.passengersListRoot.PRESENTCOUNT + this.passengersListRoot.UNCHECKCOUNT;
            this.removeOptions = this.passengersListRoot.PASSENGERREMOVEOPTION;
            this.presentStatusId = this.passengersListRoot.PRESENTSTATUSID;
        }
        else if (key == 'unchecked') {
            this.passengersList = [];
            this.Count = 0;
            this.TotalCount = this.passengersListRoot.PRESENTCOUNT + this.passengersListRoot.UNCHECKCOUNT;
            var DuppassengersListRoot = this.passengersListRoot;
            for (var key1 in DuppassengersListRoot.GETPASSENGERS) {
                if (!DuppassengersListRoot.GETPASSENGERS[key1].isPresent && !DuppassengersListRoot.GETPASSENGERS[key1].isRemove) {
                    this.passengersList.push(DuppassengersListRoot.GETPASSENGERS[key1]);
                    this.Count++;
                }
            }
        }
        else if (key == 'scratched') {
            this.passengersList = [];
            this.Count = 0;
            var DuppassengersListRoot = this.passengersListRoot;
            for (var key1 in DuppassengersListRoot.GETPASSENGERS) {
                if (DuppassengersListRoot.GETPASSENGERS[key1].isRemove == 1) {
                    this.passengersList.push(DuppassengersListRoot.GETPASSENGERS[key1]);
                    this.Count++;
                }
            }
            this.TotalCount = this.passengersListRoot.PRESENTCOUNT + this.passengersListRoot.UNCHECKCOUNT + this.Count;
        }
    };
    RollcallsPlayersPage.prototype.getFiltersList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.transportId)
                .set('clientId', _this.PersonData.CLIENT_ID);
            _this.http.post(_this.global.APIURL + "transports/getFilterList", Data, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.StaffListFilter = data.STAFFLIST;
                    _this.VehicleListFilter = data.VEHICLELIST;
                    _this.StatusListFilter = data.STATUSLIST;
                    _this.SportListFilter = data.SPORTLIST;
                    _this.TeamListFilter = data.TEAMLIST;
                    if (_this.StaffListFilter.length > 0 || _this.VehicleListFilter.length > 0 || _this.StatusListFilter.length > 0) {
                        _this.getFilterSuccess = '1'; //Success true and any filter found
                        // console.log('data.STATUSLIST.length',this.StatusListFilter.length)
                    }
                    else {
                        _this.getFilterSuccess = '2'; //Success false or no filter found
                    }
                    if (_this.VehicleListFilter.length && _this.vehiclesId == '') {
                        _this.vehiclesId = _this.VehicleListFilter[0].vehiclesId;
                        _this.currentVehicleKey = _this.currentVehicleKey ? _this.currentVehicleKey : 0;
                        _this.currentVehicleDetails = _this.VehicleListFilter[0];
                        console.log(_this.currentVehicleDetails);
                    }
                    if (_this.StaffListFilter.length) {
                        for (var i = 0; i < _this.StaffListFilter.length; i++) {
                            if (_this.PersonData.PERSON_ID == _this.StaffListFilter[i].person_id) {
                                _this.staffId = _this.StaffListFilter[i].staff_id;
                            }
                        }
                    }
                }
                else {
                    _this.getFilterSuccess = '2'; //Success false or no filter found
                }
                resolve(true);
            }, function (error) {
                _this.getFilterSuccess = '3'; // connection or data issue
            });
        });
    };
    // ionViewDidLeave(){
    //   this.gFn.showMenuIcon()
    //   this.viewCtrl.dismiss()
    // }
    RollcallsPlayersPage.prototype.assignFilters = function (key, value, event) {
        if ($(event.target).hasClass('checked')) {
            $(event.target).removeClass('checked');
        }
        else {
            $(event.target).addClass('checked');
        }
        if (this.getPassengerFilters[key].indexOf(value) == -1) {
            this.getPassengerFilters[key].push(value);
            this.isFilterEnabled++;
        }
        else {
            var index = this.getPassengerFilters[key].indexOf(value);
            this.getPassengerFilters[key].splice(index, 1);
            this.isFilterEnabled--;
        }
        this.getPassengersList();
    };
    RollcallsPlayersPage.prototype.SearchFilter = function (key, value) {
        console.log(key);
        console.log(value);
        if (this.getPassengerFilters[key] == value) {
            this.getPassengerFilters[key] = '';
            this.isFilterEnabled--;
            console.log(this.isFilterEnabled);
        }
        else {
            this.isFilterEnabled++;
            console.log(this.isFilterEnabled);
            this.getPassengerFilters[key] = value;
        }
        if (value == '') {
            this.isFilterEnabled = 0;
        }
        this.getPassengersList();
    };
    RollcallsPlayersPage.prototype.listen = function () {
        var _this = this;
        this.speechRecognition.isRecognitionAvailable()
            .then(function (available) {
            if (available) {
                // Check permission
                _this.speechRecognition.hasPermission()
                    .then(function (hasPermission) {
                    if (hasPermission) {
                        _this.gFn.presentToast('Listening...');
                        _this.speechRecognition.startListening()
                            .subscribe(function (matches) {
                            console.log(matches);
                            // $("page-rollcalls-players #srch-term").blur();
                            // $("page-rollcalls-players #srch-term").val(matches[0]).focus();
                            _this.getNameFilter = matches[0];
                            _this.SearchFilter('nameFilter', matches[0]);
                        }, function (onerror) { return console.log('error:', onerror); });
                        setTimeout(function () {
                            // Stop the recognition process (iOS only)
                            _this.speechRecognition.stopListening();
                        }, 5000);
                    }
                    else {
                        // Request permissions
                        _this.speechRecognition.requestPermission()
                            .then(function () {
                            _this.gFn.presentToast('Request Granted');
                            _this.gFn.presentToast('Listening...');
                            _this.speechRecognition.startListening()
                                .subscribe(function (matches) {
                                console.log(matches);
                                // $("page-rollcalls-players #srch-term").blur();
                                // $("page-rollcalls-players #srch-term").val(matches[0]).focus();
                                _this.getNameFilter = matches[0];
                                _this.SearchFilter('nameFilter', matches[0]);
                            }, function (onerror) { return console.log('error:', onerror); });
                            setTimeout(function () {
                                // Stop the recognition process (iOS only)
                                _this.speechRecognition.stopListening();
                            }, 5000);
                        }, function () { return _this.gFn.presentToast('Request Denied'); });
                    }
                });
            }
            else {
                _this.gFn.presentToast('Speech recognition not available');
            }
        });
    };
    RollcallsPlayersPage.prototype.backArrow = function () {
        this.gFn.showMenuIcon();
        // this.backArrow()
        this.viewCtrl.dismiss();
        // this.navCtrl.push('RollcallsPage');
    };
    RollcallsPlayersPage.prototype.showFilter = function (ShowFilter) {
        if (this.getFilterSuccess == '1') {
            if (ShowFilter) {
                $('.filterImage').css('transform', 'rotate(0deg)');
                this.ShowFilter = false;
            }
            else {
                $('.filterImage').css('transform', 'rotate(180deg)');
                this.ShowFilter = true;
            }
        }
        else if (this.getFilterSuccess == '2') {
            this.gFn.presentToast('Filters not found');
        }
        else {
            this.gFn.presentToast('Data Issue or Connection Issue found');
        }
    };
    RollcallsPlayersPage.prototype.goToPlayerRollcallLog = function (passengers, e) {
        if (e.target.className != 'status' && !$(e.target).hasClass('event-next')) {
            var playerRollcallLogModal = this.modalCtrl.create('RollcallLogsPage', { passengers: passengers }, {
                enableBackdropDismiss: true,
                showBackdrop: true
            });
            playerRollcallLogModal.present();
        }
    };
    RollcallsPlayersPage.prototype.updatePassengerStatus = function (rollcallPersonId, rollcallStatusId) {
        var _this = this;
        if (rollcallStatusId === void 0) { rollcallStatusId = ''; }
        if (this.isUpdating) {
            return;
        }
        this.isUpdating = true;
        this.activePassengerId = rollcallPersonId;
        // let loader = this.loadingCtrl.create({});
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('rollcallPersonId', rollcallPersonId)
            .set('staffId', this.staffId)
            .set('vehiclesId', this.vehiclesId);
        if (rollcallStatusId != '') {
            loginData = loginData.set('rollcallStatusId', rollcallStatusId);
        }
        else {
            loginData = loginData.set('rollcallStatusId', this.presentStatusId);
        }
        this.http.post(this.global.APIURL + "transports/updateRemovePassengerByStaff", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            // loader.dismiss();
            if (data.UPDATEREMOVEPASSENGERBYSTAFF) {
                _this.gFn.presentToast(data.MESSAGE);
            }
            else {
                _this.gFn.presentToast(data.MESSAGE);
            }
            _this.ionViewDidLoad();
        }, function (error) {
            // loader.dismiss();
            _this.isUpdating = false;
        });
    };
    RollcallsPlayersPage.prototype.presentRemoveActionSheet = function (rollcallPersonId) {
        var _this = this;
        var Modal = this.modalCtrl.create('TransportRemoveModalPage', { removeOptions: this.removeOptions });
        Modal.present();
        Modal.onDidDismiss(function (rollcallStatusId) {
            console.log(rollcallStatusId);
            _this.updatePassengerStatus(rollcallPersonId, rollcallStatusId);
        });
        // let options = [];
        // for(let i=0; i < this.removeOptions.length; i++){
        //   options.push({
        //     text: this.removeOptions[i].statusName,
        //     handler: () => {
        //       this.updatePassengerStatus(rollcallPersonId, this.removeOptions[i].rollcallStatusId);
        //     }
        //   });
        // }
        // options.push(
        //   {
        //     text: 'Cancel',
        //     role: 'cancel'
        //   }
        // );
        // let actionSheet = this.actionSheetCtrl.create({
        //   buttons: options
        // });
        // actionSheet.present();
    };
    RollcallsPlayersPage.prototype.unscratchPassenger = function (rollcallPersonId) {
        var _this = this;
        if (this.isUpdating) {
            return;
        }
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('rollcallPersonId', rollcallPersonId)
            .set('staffId', this.staffId)
            .set('vehiclesId', this.vehiclesId);
        this.http.post(this.global.APIURL + "transports/unscratchByStaff", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.UNSCRATCHBYSTAFF) {
                _this.gFn.presentToast(data.MESSAGE);
            }
            else {
                _this.gFn.presentToast(data.MESSAGE);
            }
            _this.ionViewDidLoad();
        }, function (error) {
        });
    };
    RollcallsPlayersPage.prototype.openScanner = function () {
        if (this.rollcalIisLocked == 1) {
            this.gFn.presentToast('Current rollcall is locked');
            return false;
        }
        var data = {
            passengersList: this.passengersList,
            VehicleListFilter: this.VehicleListFilter,
            presentCount: this.Count,
            TotalCount: this.TotalCount,
            removeOptions: this.removeOptions,
            staffId: this.staffId,
            vehiclesId: this.vehiclesId,
            presentStatusId: this.presentStatusId,
            rollcallID: this.rollcallID,
            clientId: this.PersonData.CLIENT_ID,
            parentPage: this
        };
        this.navCtrl.push('ScanningPage', data);
    };
    RollcallsPlayersPage.prototype.removeRollcall = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('rollcallId', this.rollcallID);
        this.http.post(this.global.APIURL + "transports/removeRollcall", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.gFn.presentToast(data.MESSAGE);
                if (data.REMOVEROLLCALL) {
                    _this.backArrow();
                }
            }
            loader.dismiss();
        }, function (error) {
            loader.dismiss();
        });
    };
    RollcallsPlayersPage.prototype.lockUnlockRollcall = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('rollcallId', this.rollcallID)
            .set('lock', (this.rollcalIisLocked == 0) ? '1' : '0');
        this.http.post(this.global.APIURL + "transports/lockUnlockRollcall", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.gFn.presentToast(data.MESSAGE);
                if (data.ISLOCKED) {
                    _this.rollcalIisLocked = (_this.rollcalIisLocked == 0) ? 1 : 0;
                }
            }
            loader.dismiss();
        }, function (error) {
            loader.dismiss();
        });
    };
    RollcallsPlayersPage.prototype.changeVehicle = function (vehicleDetails) {
        // console.log(vehicleDetails)
        this.currentVehicleKey = vehicleDetails;
        // this.currentVehicleDetails=vehicleDetails
        // console.log(this.VehicleListFilter)
        this.currentVehicleDetails = this.VehicleListFilter[parseInt(vehicleDetails)];
        this.vehiclesId = this.currentVehicleDetails.vehiclesId;
        // console.log(this.vehiclesId)
    };
    RollcallsPlayersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-rollcalls-players',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/rollcalls-players/rollcalls-players.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n                \n                <div class=" col-xs-10 p-0">\n                        <button class="BackButton bg-white"(click)="backArrow()"><img src="assets/images/arrow-black.svg"></button>\n                    Transport</div>\n            <div class="bardcode col-xs-2 position_fix">\n                \n                <img (click)="openScanner()" src="assets/images/transport/barcode-black.svg" alt="" class="coustom_position">\n            </div>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content id="BodyContent" class="" >\n    <section class="main mt-20">\n        <form action="" class="user-form" id="searchForm" >\n            <div class="navbar-search p-0-16">\n                <div class="row">\n                   \n                    <div  class="search-bar col-xs-11 padding_search_fix">\n                        <div id="SearchBar" class="input-wrap">\n                            \n                            <input type="text" class="form-control search-input" placeholder="Search" [(ngModel)]="getNameFilter" name="srch-term" id="srch-term" (input)="SearchFilter(\'nameFilter\',getNameFilter)">\n                            <div class="microphone_icon" (click)="listen();"><img src="assets/images/transport/microphone.svg"></div>\n                            <!-- <img class="filterImage" src="assets/images/transport/microphone.svg" alt="" > -->\n                        </div>\n                      \n                        \n                      \n                    </div>\n                    <div id=\'SearchBar\' class="col-xs-1 p-0" >\n                        <div class="counter" (click)="showFilter(ShowFilter)">\n                            <!-- <span><span [class.textGreen]="Count > 0">{{Count}}</span>/{{TotalCount}}</span> -->\n                            <img class="filterImage" src="assets/images/transport/filter_list.svg" alt="" class="filter_fix" >\n                        </div>\n                \n                    </div>\n                </div>\n            </div>\n            <div class="FilterCard" *ngIf="ShowFilter" >\n                <!-- <div class="navbar navbar-default event-menu mt-20">\n                    <ul class="nav navbar-nav">\n                        <li class="unactive" [class.active]="activeFilter==\'all\'" (click)="SubFilter(\'all\')"><a class="" href="javascript:void(0)">ALL</a></li>\n                        <li class="unactive" [class.active]="activeFilter==\'unchecked\'"><a class="" (click)="SubFilter(\'unchecked\')" href="javascript:void(0)">UNCHECKED</a></li>\n                        <li class="unactive" [class.active]="activeFilter==\'scratched\'"><a class="" (click)="SubFilter(\'scratched\')" href="javascript:void(0)">SCRATCHED</a></li>\n                    </ul>\n                </div> -->\n            \n                <!-- <h5 class="sm-title text-left col-xs-12" *ngIf="StatusListFilter.length>0">Pre-rollcall status:</h5>\n                <div class="option-group col-xs-12" *ngIf="StatusListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of StatusListFilter"> {{key.status_name}}\n                            <div class="col-xs-2 checkArrow-group">\n                                <div class="col-xs-2 p-0 checkbox-col" >\n                \n                                    <div class="checkbox1" (click)="assignFilters(\'rollcallStatusId\',key.rollcall_status_id,$event)">\n                                    </div>\n                                    <div class="checkbox"></div>\n                                </div>\n                            </div>\n                        </li> \n                    \n                    </ul>\n                </div> -->\n                <h5 class="sm-title text-left col-xs-12" *ngIf="TeamListFilter.length>0">Team</h5>\n                <div class="option-group col-xs-12" *ngIf="TeamListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of TeamListFilter"> {{key.TEAMNAME}}\n                            <div class="col-xs-2 checkArrow-group">\n                                <div class="col-xs-2 p-0 checkbox-col" >\n                \n                                    <div class="checkbox1" (click)="assignFilters(\'teamId\',key.CLUBDIVISIONID,$event)">\n                                    </div>\n                                    <div class="checkbox"></div>\n                                </div>\n                            </div>\n                        </li> \n                    \n                    </ul>\n                </div>\n                <h5 class="sm-title text-left col-xs-12" *ngIf="SportListFilter.length>0">Sport</h5>\n                <div class="option-group col-xs-12" *ngIf="SportListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of SportListFilter"> {{key.SPORTNAME}}\n                            <div class="col-xs-2 checkArrow-group">\n                                <div class="col-xs-2 p-0 checkbox-col" >\n                \n                                    <div class="checkbox1" (click)="assignFilters(\'sportId\',key.SPORTID,$event)">\n                                    </div>\n                                    <div class="checkbox"></div>\n                                </div>\n                            </div>\n                        </li> \n                    \n                    </ul>\n                </div>\n                <h5 class="sm-title text-left col-xs-12" *ngIf="VehicleListFilter.length>0">Previous Vehicle</h5>\n                <div class="option-group col-xs-12 mb15" *ngIf="VehicleListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of VehicleListFilter;let i=index"> {{key.vehicleName}}\n                                <div class="col-xs-2 checkArrow-group">\n                                    <div class="col-xs-2 p-0 checkbox-col" >\n                    \n                                        <div class="checkbox1" (click)="assignFilters(\'vehiclesId\',key.vehiclesId,$event)">\n                                        </div>\n                                        <div class="checkbox"></div>\n                                    </div>\n                                </div>\n                          \n                        </li>\n                    \n                    </ul>\n                </div>\n                <!-- <h5 class="sm-title text-left col-xs-12" *ngIf="StaffListFilter.length>0">Last tagged by:</h5>\n                <div class="option-group col-xs-12" *ngIf="StaffListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of StaffListFilter"> {{key.firstName}} {{key.lastName}}\n                         \n                            <div class="col-xs-2 checkArrow-group">\n                                <div class="col-xs-2 p-0 checkbox-col" >\n                \n                                    <div class="checkbox1" (click)="assignFilters(\'staffId\',key.staff_id,$event)">\n                                    </div>\n                                    <div class="checkbox"></div>\n                                </div>\n                            </div>\n                        </li>\n                    \n                        \n                    </ul>\n                </div> -->\n            </div>\n            <div class="transport-header clearfix" >\n                <div class="rollcall-header">\n                    <div class="top-bar col-xs-8" >\n                        {{rollcallName.toString() | uppercase}}\n                        <br>\n                        <span><span [class.textGreen]="Count > 0">{{Count}}</span>/{{TotalCount}}</span>\n                        <span class="textLock" *ngIf="rollcalIisLocked==1">- Locked</span>\n                    </div>\n                    <div class="col-xs-4 text-right">\n                            <label class="select">\n                                <select name="" id="" class="form-control custom-select" (change)="changeVehicle($event.target.value)">\n                                    <option value="{{i}}" [selected]="vehiclesId == key.vehiclesId" *ngFor="let key of VehicleListFilter;let i=index">{{key.vehicleName}}</option>\n                                </select>\n                            </label>\n                    </div>\n                </div>\n              \n              </div>\n\n            <div class="event-card" >\n                <div class="well select-card locked" *ngIf="passengersList.length<1 && (passengersListSuccess==\'1\' || passengersListSuccess==\'2\')">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                           \n                        </div>\n                        <div class="card-title col-xs-8">\n                            <p style="text-align: center">No Data Found</p>\n                        </div>\n                        <div class="event-next col-xs-2 p-0">\n                            \n                        </div>\n                    </div>\n                </div>\n\n                <ion-list no-lines *ngFor="let passenger of passengersList">\n                    <ion-item-sliding class="well select-card" [class.attendenceClose]="passenger.isRemove==1" [class.locked]="rollcalIisLocked==1">\n                        <ion-item>\n                            <div class="row" (click)="goToPlayerRollcallLog(passenger, $event)">\n                                <div class="card-img col-xs-2 p-0">\n                                    <span class="" *ngIf="passenger.photoPath==\'\'">\n                                        <div class="img-circle"><span class="img-text">{{passenger.firstName[0]}} {{passenger.lastName[0]}} </span></div>                                  \n                                    </span>\n                                    <span class="" *ngIf="passenger.photoPath">\n                                        <img src="{{global.PROFILEIMAGEURL}}{{passenger.photoPath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                    </span>\n                                </div>\n                                <div class="card-title col-xs-8">\n                                    {{passenger.firstName | uppercase}} {{passenger.lastName | uppercase}}\n                                    <p>{{passenger.statusName}}</p>\n                                </div>\n                                <div class="event-next col-xs-2 p-0" (click)="(passenger.isPresent==1)?unscratchPassenger(passenger.rollcallPersonsId):updatePassengerStatus(passenger.rollcallPersonsId)">\n                                    <span class="custom-radio v-center">\n                                        <div class="radio clearfix">\n                                            <input *ngIf="passenger.isRemove==0" type="radio" class="status" [checked]="passenger.isPresent==1" [disabled]="isUpdating">\n                                            <input *ngIf="passenger.isRemove==1" type="radio" class="status" [checked]="passenger.isRemove==1" [disabled]="isUpdating">\n                                            <label></label>\n                                        </div>\n                                    </span>\n                                </div>\n                            </div>\n                        </ion-item>\n                        <ion-item-options side="right" *ngIf="passenger.isPresent==1 && rollcalIisLocked == 0">\n                            <button class="btn-danger" ion-button danger (click)="presentRemoveActionSheet(passenger.rollcallPersonsId)">REMOVE</button>\n                        </ion-item-options>\n                        <ion-item-options side="right" *ngIf="passenger.isRemove==1 && rollcalIisLocked == 0">\n                            <button ion-button danger (click)="unscratchPassenger(passenger.rollcallPersonsId)">ADD</button>\n                        </ion-item-options>\n                    </ion-item-sliding>\n                </ion-list>\n\n                <div class="mt-20">\n                    <div class="row">\n                        <div class="col-xs-12">\n                            <button type="button" class="btn btn-remove xs-btn" (click)="removeRollcall()" *ngIf="Count==0">REMOVE ROLLCALL</button>\n                            <button type="button" class="btn btn-orange btn-rounded lock" (click)="lockUnlockRollcall()" *ngIf="Count>0">{{(rollcalIisLocked == 0)?\'LOCK\':\'UNLOCK\'}}</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n        </section>\n        \n  </ion-content>\n  \n  \n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/rollcalls-players/rollcalls-players.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_speech_recognition_ngx__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], RollcallsPlayersPage);
    return RollcallsPlayersPage;
}());

//# sourceMappingURL=rollcalls-players.js.map

/***/ })

});
//# sourceMappingURL=27.js.map