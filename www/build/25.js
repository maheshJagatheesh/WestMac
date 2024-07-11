webpackJsonp([25],{

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScanningPageModule", function() { return ScanningPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scanning__ = __webpack_require__(930);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ScanningPageModule = /** @class */ (function () {
    function ScanningPageModule() {
    }
    ScanningPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__scanning__["a" /* ScanningPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__scanning__["a" /* ScanningPage */]),
            ],
        })
    ], ScanningPageModule);
    return ScanningPageModule;
}());

//# sourceMappingURL=scanning.module.js.map

/***/ }),

/***/ 930:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanningPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner_ngx__ = __webpack_require__(346);
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








/**
 * Generated class for the ScanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScanningPage = /** @class */ (function () {
    function ScanningPage(navCtrl, http, storage, navParams, global, gFn, events, loadingCtrl, actionSheetCtrl, barcodeScanner, global_api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.navParams = navParams;
        this.global = global;
        this.gFn = gFn;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.barcodeScanner = barcodeScanner;
        this.global_api = global_api;
        this.passengersList = [];
        this.VehicleListFilter = [];
        this.presentCount = 0;
        this.TotalCount = 0;
        this.vehiclesId = '';
        this.staffId = '';
        this.removeOptions = [];
        this.scannedID = '';
        this.presentStatusId = '';
        this.getPassengerFilters = {};
        this.rollcallID = '';
        this.clientId = '';
        this.passengersList = navParams.get('passengersList');
        this.VehicleListFilter = navParams.get('VehicleListFilter');
        this.presentCount = navParams.get('presentCount');
        this.TotalCount = navParams.get('TotalCount');
        this.staffId = navParams.get('staffId');
        this.vehiclesId = navParams.get('vehiclesId');
        this.removeOptions = navParams.get('removeOptions');
        this.presentStatusId = navParams.get('presentStatusId');
        this.rollcallID = navParams.get('rollcallID');
        this.clientId = navParams.get('clientId');
        this.gFn.hideMenuIcon();
        gFn.hideFormAccessoryBar();
    }
    ScanningPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getPassengerFilters = {
            isDynamic: '',
            nameFilter: '',
            rollcallStatusId: [],
            staffId: [],
            vehiclesId: [],
        };
        this.getPassengersList().then(function (y) {
            if (y) {
                _this.scannedID = '';
                _this.barcodeScanner.scan().then(function (barcodeData) {
                    //alert('Barcode data'+ JSON.stringify(barcodeData));
                    _this.scannedID = barcodeData.text;
                    var passengerFound = false;
                    var checkedIn = false;
                    var isPresent = false;
                    var rollcallPersonsId = '';
                    var passengerName = '';
                    for (var key in _this.passengersList) {
                        if (_this.scannedID != '' && (_this.passengersList[key].ABF == _this.scannedID || _this.passengersList[key].person_id == _this.scannedID)) {
                            passengerFound = true;
                            rollcallPersonsId = _this.passengersList[key].rollcallPersonsId;
                            passengerName = _this.passengersList[key].firstName + ' ' + _this.passengersList[key].lastName;
                            if (_this.passengersList[key].isRemove == 1 || _this.passengersList[key].isPresent == 1) {
                                checkedIn = true;
                            }
                            if (_this.passengersList[key].isPresent == 1) {
                                isPresent = true;
                            }
                            break;
                        }
                    }
                    if (!passengerFound && !barcodeData.cancelled) {
                        _this.gFn.presentToast('Passenger not found');
                        _this.ionViewDidLoad();
                    }
                    if (passengerFound && !checkedIn) {
                        _this.scannedID = '';
                        _this.updatePassengerStatus(rollcallPersonsId);
                    }
                    if (passengerFound && isPresent) {
                        _this.gFn.presentToast(passengerName + ' already checked in');
                    }
                    if (barcodeData.cancelled) {
                        _this.backArrow();
                    }
                }).catch(function (err) {
                    _this.gFn.presentToast('Scanning problem', 'danger');
                    _this.ionViewDidLoad();
                });
            }
            else {
                _this.gFn.presentToast('Data load error');
                _this.backArrow();
            }
        });
    };
    ScanningPage.prototype.ionViewDidEnter = function () {
        this.gFn.hideFormAccessoryBar();
    };
    ScanningPage.prototype.ionViewWillLeave = function () {
        this.gFn.hideFormAccessoryBar(true);
    };
    ScanningPage.prototype.backArrow = function () {
        this.navCtrl.pop();
        this.navParams.get("parentPage").ionViewDidLoad();
    };
    ScanningPage.prototype.goToRollcallsPage = function () {
        this.navCtrl.pop();
        this.navCtrl.push('RollcallsPage');
    };
    ScanningPage.prototype.getPassengersList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('rollcallId', _this.rollcallID) //this.rollcallID,22
                .set('isDynamic', _this.getPassengerFilters.isDynamic)
                .set('nameFilter', _this.getPassengerFilters.nameFilter)
                .set('rollcallStatusIds', JSON.stringify(_this.getPassengerFilters.rollcallStatusId))
                .set('staffIds', JSON.stringify(_this.getPassengerFilters.staffId))
                .set('vehiclesIds', JSON.stringify(_this.getPassengerFilters.vehiclesId))
                .set('clientId', _this.clientId);
            _this.http.post(_this.global.APIURL + "transports/getPassengers", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.passengersList = data.GETPASSENGERS;
                    _this.presentCount = data.PRESENTCOUNT;
                    _this.TotalCount = data.PRESENTCOUNT + data.UNCHECKCOUNT;
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
    ScanningPage.prototype.updatePassengerStatus = function (rollcallPersonId, rollcallStatusId) {
        var _this = this;
        if (rollcallStatusId === void 0) { rollcallStatusId = ''; }
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
            if (data.UPDATEREMOVEPASSENGERBYSTAFF) {
                _this.gFn.presentToast(data.MESSAGE);
            }
            else {
                _this.gFn.presentToast(data.MESSAGE);
            }
            _this.ionViewDidLoad();
        }, function (error) {
        });
    };
    ScanningPage.prototype.presentRemoveActionSheet = function (rollcallPersonId) {
        var _this = this;
        var options = [];
        var _loop_1 = function (i) {
            options.push({
                text: this_1.removeOptions[i].statusName,
                handler: function () {
                    _this.updatePassengerStatus(rollcallPersonId, _this.removeOptions[i].rollcallStatusId);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.removeOptions.length; i++) {
            _loop_1(i);
        }
        options.push({
            text: 'Cancel',
            role: 'cancel'
        });
        var actionSheet = this.actionSheetCtrl.create({
            buttons: options
        });
        actionSheet.present();
    };
    ScanningPage.prototype.unscratchPassenger = function (rollcallPersonId) {
        var _this = this;
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
    ScanningPage.prototype.changeVehicle = function (vehicleId) {
        this.vehiclesId = vehicleId;
    };
    ScanningPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-scanning',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/scanning/scanning.html"*/'<ion-header class="inverse p-20">\n    <div class="transport-header clearfix">\n        <div class="top-bar col-xs-5" (click)="backArrow()">\n                <div class="backArrow inverse inverseText backbtnText">SCANNING</div>\n        </div>\n        <div class="counterText col-xs-3 text-center p-0">\n            <div class="inverseText">\n                <span class="textWhite" [class.textGreen]="presentCount > 0">{{presentCount}}</span>/{{TotalCount}}\n            </div>\n        </div>\n        <div class="col-xs-4 text-right">\n              <label class="select">\n                  <select name="" id="" class="form-control custom-select" (change)="changeVehicle($event.target.value)">\n                    <option value="{{key.vehiclesId}}" [selected]="vehiclesId == key.vehiclesId" *ngFor="let key of VehicleListFilter">{{key.vehicleName}}</option>\n                  </select>\n              </label>\n        </div>\n      </div>\n</ion-header>\n<ion-content class="bg-black">\n    <section class="main">\n        <div class="bg-black">\n            <div class="event-card fixed-card-bottom">\n                <ion-list no-lines *ngFor="let passenger of passengersList">\n                    <ion-item-sliding class="well select-card" [class.attendenceClose]="passenger.isRemove==1" *ngIf="(scannedID.length && (scannedID == passenger.ABF || scannedID == passenger.person_id))">\n                        <ion-item>\n                            <div class="row">\n                                <div class="card-img col-xs-2 p-0">\n                                    <span class="" *ngIf="passenger.photoPath==\'\'">\n                                        <div class="img-circle"><span class="img-text">{{passenger.firstName[0]}} {{passenger.lastName[0]}} </span></div>                                  \n                                    </span>\n                                    <span class="" *ngIf="passenger.photoPath">\n                                        <img src="{{global.PROFILEIMAGEURL}}{{passenger.photoPath}}" alt="" class="img-circle">\n                                    </span>\n                                </div>\n                                <div class="card-title col-xs-8">\n                                    {{passenger.firstName | uppercase}} {{passenger.lastName | uppercase}}\n                                    <p>{{passenger.statusName}}</p>\n                                </div>\n                                <div class="event-next col-xs-2 p-0">\n                                    <span class="custom-radio v-center">\n                                        <div class="radio clearfix">\n                                                <input *ngIf="passenger.isRemove==0" type="radio" class="status" [checked]="passenger.isPresent==1" (click)="(passenger.isPresent==1)?unscratchPassenger(passenger.rollcallPersonsId):updatePassengerStatus(passenger.rollcallPersonsId)">\n                                                <input *ngIf="passenger.isRemove==1" type="radio" class="status" [checked]="passenger.isRemove==1">\n                                            <label></label>\n                                        </div>\n                                    </span>\n                                </div>\n                            </div>\n                        </ion-item>\n                        <ion-item-options side="right" *ngIf="passenger.isPresent==1">\n                            <button class="btn-danger" ion-button danger (click)="presentRemoveActionSheet(passenger.rollcallPersonsId)">REMOVE</button>\n                        </ion-item-options>\n                        <ion-item-options side="right" *ngIf="passenger.isRemove==1">\n                            <button ion-button danger (click)="unscratchPassenger(passenger.rollcallPersonsId)">UNSCRATCH</button>\n                        </ion-item-options>\n                    </ion-item-sliding>\n                </ion-list>\n            </div>\n        </div>\n    </section>\n</ion-content>\n  \n  \n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/scanning/scanning.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner_ngx__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ScanningPage);
    return ScanningPage;
}());

//# sourceMappingURL=scanning.js.map

/***/ })

});
//# sourceMappingURL=25.js.map