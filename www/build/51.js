webpackJsonp([51],{

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LastRollcallPageModule", function() { return LastRollcallPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__last_rollcall__ = __webpack_require__(904);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LastRollcallPageModule = /** @class */ (function () {
    function LastRollcallPageModule() {
    }
    LastRollcallPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__last_rollcall__["a" /* LastRollcallPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__last_rollcall__["a" /* LastRollcallPage */]),
            ],
        })
    ], LastRollcallPageModule);
    return LastRollcallPageModule;
}());

//# sourceMappingURL=last-rollcall.module.js.map

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LastRollcallPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_speech_recognition_ngx__ = __webpack_require__(192);
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








var LastRollcallPage = /** @class */ (function () {
    function LastRollcallPage(navCtrl, navParams, http, storage, global, gFn, loadingCtrl, speechRecognition, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.global = global;
        this.gFn = gFn;
        this.loadingCtrl = loadingCtrl;
        this.speechRecognition = speechRecognition;
        this.global_api = global_api;
        this.passengersList = [];
        this.total = 0;
        this.StaffListFilter = [];
        this.VehicleListFilter = [];
        this.StatusListFilter = [];
        this.SportListFilter = [];
        this.TeamListFilter = [];
        this.getFilterSuccess = '0';
        this.vehiclesId = '';
        this.staffId = '';
        this.passengersListSuccess = '0';
        this.getPassengerFilters = {};
        this.ShowFilter = false;
        this.isFilterEnabled = 0;
        this.getNameFilter = '';
        this.vehicleDetails = navParams.get('detail');
        console.log(this.vehicleDetails);
    }
    LastRollcallPage.prototype.ionViewDidLoad = function () {
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
        console.log('ionViewDidLoad LastRollcallPage');
        this.storage.get('EventDetails').then(function (val) {
            _this.EventDetails = val[0];
            _this.storage.get('UpcomingSingleEvent').then(function (val) {
                _this.UpcomingSingleEvent = JSON.parse(val);
                _this.storage.get('loggedInUserData').then(function (val1) {
                    _this.PersonData = val1;
                    _this.getFiltersList();
                    _this.loader = _this.loadingCtrl.create({});
                    _this.loader.present();
                    _this.getPassengersList().then(function (y) {
                        _this.loader.dismiss();
                        // this.isUpdating = false;
                    });
                });
            });
        });
    };
    LastRollcallPage.prototype.getPassengersList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportVehicleId', _this.vehicleDetails.vehiclesId)
                .set('nameFilter', _this.getPassengerFilters.nameFilter)
                .set('sportIds', JSON.stringify(_this.getPassengerFilters.sportId))
                .set('vehiclesIds', JSON.stringify(_this.getPassengerFilters.vehiclesId))
                .set('teamIds', JSON.stringify(_this.getPassengerFilters.teamId));
            _this.http.post(_this.global.APIURL + "transports/getPassengerByBus", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.passengersList = data.PASSENGERLIST;
                    _this.total = data.TOTALPASSENGER;
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
    LastRollcallPage.prototype.getFiltersList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.EventDetails.transportId)
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
    LastRollcallPage.prototype.listen = function () {
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
    LastRollcallPage.prototype.showFilter = function (ShowFilter) {
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
    LastRollcallPage.prototype.assignFilters = function (key, value, event) {
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
    LastRollcallPage.prototype.SearchFilter = function (key, value) {
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
    LastRollcallPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-last-rollcall',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/last-rollcall/last-rollcall.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n                <div class=" col-xs-10 p-0">Transport</div>\n            <div class="bardcode col-xs-2 p-0 text-right">\n                <img (click)="openScanner()" src="assets/images/transport/barcode-black.svg" alt="">\n            </div>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content id="BodyContent" class="" >\n    <section class="main mt-20">\n        <form action="" class="user-form" id="searchForm" >\n            <div class="navbar-search">\n                <div class="row">\n                   \n                    <div  class="search-bar col-xs-11">\n                        <div id="SearchBar" class="input-wrap">\n                            <input type="text" class="form-control search-input" placeholder="Search" [(ngModel)]="getNameFilter" name="srch-term" id="srch-term" (input)="SearchFilter(\'nameFilter\',getNameFilter)">\n                            <div class="microphone_icon" (click)="listen();"><img src="assets/images/transport/microphone.svg"></div>\n                        </div>\n                      \n                        \n                      \n                    </div>\n                    <div id=\'SearchBar\' class="col-xs-1 p-0" >\n                        <div class="counter" (click)="showFilter(ShowFilter)">\n                            <!-- <span><span [class.textGreen]="Count > 0">{{Count}}</span>/{{TotalCount}}</span> -->\n                            <img class="filterImage" src="assets/images/transport/filter_list.svg" alt="" >\n                        </div>\n                \n                    </div>\n                </div>\n            </div>\n            <div class="FilterCard" *ngIf="ShowFilter" >\n                <!-- <div class="navbar navbar-default event-menu mt-20">\n                    <ul class="nav navbar-nav">\n                        <li class="unactive" [class.active]="activeFilter==\'all\'" (click)="SubFilter(\'all\')"><a class="" href="javascript:void(0)">ALL</a></li>\n                        <li class="unactive" [class.active]="activeFilter==\'unchecked\'"><a class="" (click)="SubFilter(\'unchecked\')" href="javascript:void(0)">UNCHECKED</a></li>\n                        <li class="unactive" [class.active]="activeFilter==\'scratched\'"><a class="" (click)="SubFilter(\'scratched\')" href="javascript:void(0)">SCRATCHED</a></li>\n                    </ul>\n                </div> -->\n            \n                <!-- <h5 class="sm-title text-left col-xs-12" *ngIf="StatusListFilter.length>0">Pre-rollcall status:</h5>\n                <div class="option-group col-xs-12" *ngIf="StatusListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of StatusListFilter"> {{key.status_name}}\n                            <div class="col-xs-2 checkArrow-group">\n                                <div class="col-xs-2 p-0 checkbox-col" >\n                \n                                    <div class="checkbox1" (click)="assignFilters(\'rollcallStatusId\',key.rollcall_status_id,$event)">\n                                    </div>\n                                    <div class="checkbox"></div>\n                                </div>\n                            </div>\n                        </li> \n                    \n                    </ul>\n                </div> -->\n                <h5 class="sm-title text-left col-xs-12" *ngIf="TeamListFilter.length>0">Team</h5>\n                <div class="option-group col-xs-12" *ngIf="TeamListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of TeamListFilter"> {{key.TEAMNAME}}\n                            <div class="col-xs-2 checkArrow-group">\n                                <div class="col-xs-2 p-0 checkbox-col" >\n                \n                                    <div class="checkbox1" (click)="assignFilters(\'teamId\',key.CLUBDIVISIONID,$event)">\n                                    </div>\n                                    <div class="checkbox"></div>\n                                </div>\n                            </div>\n                        </li> \n                    \n                    </ul>\n                </div>\n                <h5 class="sm-title text-left col-xs-12" *ngIf="SportListFilter.length>0">Sport</h5>\n                <div class="option-group col-xs-12" *ngIf="SportListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of SportListFilter"> {{key.SPORTNAME}}\n                            <div class="col-xs-2 checkArrow-group">\n                                <div class="col-xs-2 p-0 checkbox-col" >\n                \n                                    <div class="checkbox1" (click)="assignFilters(\'sportId\',key.SPORTID,$event)">\n                                    </div>\n                                    <div class="checkbox"></div>\n                                </div>\n                            </div>\n                        </li> \n                    \n                    </ul>\n                </div>\n                <h5 class="sm-title text-left col-xs-12" *ngIf="VehicleListFilter.length>0">Previous Vehicle</h5>\n                <div class="option-group col-xs-12 mb15" *ngIf="VehicleListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of VehicleListFilter;let i=index"> {{key.vehicleName}}\n                                <div class="col-xs-2 checkArrow-group">\n                                    <div class="col-xs-2 p-0 checkbox-col" >\n                    \n                                        <div class="checkbox1" (click)="assignFilters(\'vehiclesId\',key.vehiclesId,$event)">\n                                        </div>\n                                        <div class="checkbox"></div>\n                                    </div>\n                                </div>\n                          \n                        </li>\n                    \n                    </ul>\n                </div>\n                <!-- <h5 class="sm-title text-left col-xs-12" *ngIf="StaffListFilter.length>0">Last tagged by:</h5>\n                <div class="option-group col-xs-12" *ngIf="StaffListFilter.length>0">\n                    <ul class="list-group">\n                        <li class="list-group-item text-left clearfix" *ngFor="let key of StaffListFilter"> {{key.firstName}} {{key.lastName}}\n                         \n                            <div class="col-xs-2 checkArrow-group">\n                                <div class="col-xs-2 p-0 checkbox-col" >\n                \n                                    <div class="checkbox1" (click)="assignFilters(\'staffId\',key.staff_id,$event)">\n                                    </div>\n                                    <div class="checkbox"></div>\n                                </div>\n                            </div>\n                        </li>\n                    \n                        \n                    </ul>\n                </div> -->\n            </div>\n            <div class="transport-header clearfix" >\n                <div class="rollcall-header">\n                    <div class="top-bar col-xs-8" >\n                        \n                        <span>{{total}} CHECKED IN</span>\n                            \n                    </div>\n                    <!-- <div class="col-xs-4 text-right">\n                            <label class="select">\n                                <select name="" id="" class="form-control custom-select" (change)="changeVehicle($event.target.value)">\n                                    <option value="{{key.vehiclesId}}" [selected]="vehiclesId == key.vehiclesId" *ngFor="let key of VehicleListFilter">{{key.vehicleName}}</option>\n                                </select>\n                            </label>\n                    </div> -->\n                </div>\n              \n              </div>\n\n            <div class="event-card" >\n                <div class="well select-card" *ngIf="passengersList.length<1 && (passengersListSuccess==\'1\' || passengersListSuccess==\'2\')">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                           \n                        </div>\n                        <div class="card-title col-xs-8">\n                            <p style="text-align: center">No Data Found</p>\n                        </div>\n                        <div class="event-next col-xs-2 p-0">\n                            \n                        </div>\n                    </div>\n                </div>\n\n                <ion-list no-lines *ngFor="let passenger of passengersList">\n                    <ion-item-sliding class="well select-card" [class.attendenceClose]="passenger.isRemove==1">\n                        <ion-item>\n                            <div class="row" (click)="goToPlayerRollcallLog(passenger, $event)">\n                                <div class="card-img col-xs-2 p-0">\n                                    <span class="" *ngIf="passenger.PHOTOPATH==\'\'">\n                                        <div class="img-circle"><span class="img-text">{{passenger.FIRSTNAME[0]}} {{passenger.LASTNAME[0]}} </span></div>                                  \n                                    </span>\n                                    <span class="" *ngIf="passenger.PHOTOPATH">\n                                        <img src="{{global.PROFILEIMAGEURL}}{{passenger.PHOTOPATH}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n                                    </span>\n                                </div>\n                                <div class="card-title col-xs-8">\n                                    {{passenger.FIRSTNAME | uppercase}} {{passenger.LASTNAME | uppercase}}\n                                    <p>{{passenger.PASSENGERSTATUS}}</p>\n                                </div>\n                                <!-- <div class="event-next col-xs-2 p-0">\n                                    <span class="custom-radio v-center">\n                                        <div class="radio clearfix">\n                                            <input *ngIf="passenger.isRemove==0" type="radio" class="status" [checked]="passenger.isPresent==1" [disabled]="isUpdating" (click)="(passenger.isPresent==1)?unscratchPassenger(passenger.rollcallPersonsId):updatePassengerStatus(passenger.rollcallPersonsId)">\n                                            <input *ngIf="passenger.isRemove==1" type="radio" class="status" [checked]="passenger.isRemove==1" [disabled]="isUpdating">\n                                            <label></label>\n                                        </div>\n                                    </span>\n                                </div> -->\n                            </div>\n                        </ion-item>\n                        <!-- <ion-item-options side="right" *ngIf="passenger.isPresent==1">\n                            <button class="btn-danger" ion-button danger (click)="presentRemoveActionSheet(passenger.rollcallPersonsId)">REMOVE</button>\n                        </ion-item-options>\n                        <ion-item-options side="right" *ngIf="passenger.isRemove==1">\n                            <button ion-button danger (click)="unscratchPassenger(passenger.rollcallPersonsId)">ADD</button>\n                        </ion-item-options> -->\n                    </ion-item-sliding>\n                </ion-list>\n\n                <!-- <div class="mt-20">\n                    <div class="row">\n                        <div class="col-xs-12">\n                        <button type="button" class="btn btn-remove xs-btn" (click)="removeRollcall()">REMOVE ROLLCALL</button>\n                        </div>\n                    </div>\n                </div> -->\n            </div>\n        </form>\n        </section>\n        \n  </ion-content>\n  \n  \n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/last-rollcall/last-rollcall.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_speech_recognition_ngx__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], LastRollcallPage);
    return LastRollcallPage;
}());

//# sourceMappingURL=last-rollcall.js.map

/***/ })

});
//# sourceMappingURL=51.js.map