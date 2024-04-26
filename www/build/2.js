webpackJsonp([2],{

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehiclePageModule", function() { return VehiclePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vehicle__ = __webpack_require__(954);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VehiclePageModule = /** @class */ (function () {
    function VehiclePageModule() {
    }
    VehiclePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vehicle__["a" /* VehiclePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vehicle__["a" /* VehiclePage */]),
            ],
        })
    ], VehiclePageModule);
    return VehiclePageModule;
}());

//# sourceMappingURL=vehicle.module.js.map

/***/ }),

/***/ 954:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehiclePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__ = __webpack_require__(24);
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
 * Generated class for the VehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VehiclePage = /** @class */ (function () {
    function VehiclePage(navCtrl, http, navParams, viewCtrl, global, gFn, loadingCtrl, toastCtrl, global_api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.global = global;
        this.gFn = gFn;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.global_api = global_api;
        this.vehicleName = '';
        this.vehicleCapacity = '';
        this.savedVehicleList = [];
        this.isRemove = false;
        this.client_id = navParams.get('client_id');
        this.selectedTeam = navParams.get('selectedTeam');
        this.event_id = navParams.get('event_id');
        this.createdBy = navParams.get('createdBy');
        this.transportId = navParams.get('transportId');
        this.removeVehicleId = navParams.get('vehicleId');
        this.removeVehicleName = navParams.get('vehicleName');
        if (this.removeVehicleId != '' && this.removeVehicleName != '') {
            this.isRemove = true;
            this.vehicleName = this.removeVehicleName;
        }
    }
    VehiclePage.prototype.ionViewDidLoad = function () {
        this.getSavedVehicleList();
    };
    VehiclePage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    VehiclePage.prototype.getSavedVehicleList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.transportId);
            _this.http.post(_this.global.APIURL + "transports/getSavedVehicles", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.savedVehicleList = data.GETVEHICLES;
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    VehiclePage.prototype.selectVehicle = function (vehicle) {
        vehicle.active = !vehicle.active;
    };
    VehiclePage.prototype.addSavedVehicle = function () {
        var _this = this;
        var vehicleIDs = [];
        $('.well.select-card.savedVehicle.active').each(function () {
            if ($(this).attr('data-id')) {
                vehicleIDs.push($(this).attr('data-id'));
            }
        });
        if (vehicleIDs.length > 0) {
            var loader_1 = this.loadingCtrl.create({});
            loader_1.present();
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', this.transportId)
                .set('vehicleIds', JSON.stringify(vehicleIDs))
                .set('createdBy', this.createdBy);
            this.http.post(this.global.APIURL + "transports/addSavedVehicle", loginData, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                loader_1.dismiss();
                _this.close();
            }, function (error) {
            });
        }
        else {
            this.gFn.presentToast('Please select a vehicle');
        }
    };
    VehiclePage.prototype.addVehicle = function () {
        var _this = this;
        console.log(this.vehicleCapacity);
        if (this.vehicleName.trim().length > 0 && this.vehicleCapacity > 0) {
            var loader_2 = this.loadingCtrl.create({});
            loader_2.present();
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', this.transportId)
                .set('vehicleName', this.vehicleName)
                .set('createdBy', this.createdBy)
                .set('vehicleCapacity', this.vehicleCapacity);
            this.http.post(this.global.APIURL + "transports/addVehicle", loginData, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                loader_2.dismiss();
                _this.close();
            }, function (error) {
            });
        }
        else if (this.vehicleName.trim().length <= 0) {
            this.gFn.presentToast('Please enter vehicle name');
        }
        else if (this.vehicleCapacity <= 0) {
            this.gFn.presentToast('Please enter vehicle capacity');
        }
    };
    VehiclePage.prototype.removeVehicle = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('vehicleId', this.removeVehicleId);
        this.http.post(this.global.APIURL + "transports/removeVehicle", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.gFn.presentToast(data.MESSAGE, 'success');
            }
            loader.dismiss();
            _this.close();
        }, function (error) {
        });
    };
    VehiclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-vehicle',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/vehicle/vehicle.html"*/'\n<ion-content class="bg-black" >\n  <div class="fixed-top_ modal-close">\n    <div class="rotate-text pwrotate-text-white" (click)="close()">\n      <span class="close_" data-dismiss="modal">CLOSE\n          <ion-icon name="close" class="close_-button"></ion-icon>\n      </span>\n    </div>\n  </div>\n  <div class="modal-content modalView">\n    <div class="modal-header shadow">\n        <h5 class="modal-title fontBold text-center">VEHICLE</h5>\n    </div>\n    <div class="modal-body modal-report">\n      <div class="row">\n        <div class="d-flex align-center col-xs-3 p-0">\n          <span class="textGray">Name</span>\n        </div>\n        <div class="col-xs-9 p-0">\n            <input type="text" class="form-control" [(ngModel)]="vehicleName" [readonly]="isRemove">\n        </div>\n      </div>\n      <br/>\n      <div class="row">\n        <div class="d-flex align-center col-xs-3 p-0">\n          <span class="textGray">Capacity</span>\n        </div>\n        <div class="col-xs-9 p-0">\n            <input type="number" class="form-control" [(ngModel)]="vehicleCapacity" [readonly]="isRemove">\n        </div>\n      </div>\n      <div class="modal-footer mt-20">\n        <div class="row">\n          <div class="col-xs-12" *ngIf="isRemove">\n            <button type="submit" class="btn btn-remove xs-btn" (click)="removeVehicle()">REMOVE</button>\n          </div>\n          <div class="col-xs-12 pr-0" *ngIf="!isRemove">\n            <button type="submit" class="btn btn-save xs-btn" (click)="addVehicle()">ADD</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="modal-body modal-report" *ngIf="!isRemove">\n    <h5 class="sm-title text-left col-xs-12">SAVED VEHICLES</h5>\n    <section class="heightAuto">\n      <div class="event-card borrow" [class.emptyCard]="savedVehicleList.length == 0">\n        <div class="well select-card selectCard d-flex align-center" *ngIf="savedVehicleList.length == 0">\n          <div class="row">\n              <div class="col-xs-12">\n                  <h5 class="sub-title">NO SAVED VEHICLES</h5>\n              </div>\n          </div>\n        </div>\n        <div class="well select-card savedVehicle" *ngFor="let vehicle of savedVehicleList" [attr.data-id]="vehicle.vehicleId"\n        [ngClass]="{\'active\': vehicle.active}" (click)="selectVehicle(vehicle)">\n            <div class="row">\n              <div class="card-title col-xs-9 col-xs-offset-2">\n                  {{vehicle.vehicleName | uppercase}}\n              </div>\n              <div class="event-next col-xs-1 p-0">\n                <a class="next-arrow v-center" href="javascript:void(0);"><i aria-hidden="true" class="fa fa-chevron-right"></i></a>\n              </div>\n            </div>\n        </div>\n      </div>\n      <div class="mt-20">\n        <div class="row">\n          <div class="btn-section col-xs-12">\n            <button type="submit" class="btn btn-save btn-sm-black xs-btn" (click)="addSavedVehicle()">ADD</button>\n          </div>\n        </div>\n      </div>\n    </section>\n  </div>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/vehicle/vehicle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], VehiclePage);
    return VehiclePage;
}());

//# sourceMappingURL=vehicle.js.map

/***/ })

});
//# sourceMappingURL=2.js.map