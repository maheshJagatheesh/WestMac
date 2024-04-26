webpackJsonp([9],{

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportAddStaffPageModule", function() { return TransportAddStaffPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transport_add_staff__ = __webpack_require__(956);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransportAddStaffPageModule = /** @class */ (function () {
    function TransportAddStaffPageModule() {
    }
    TransportAddStaffPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__transport_add_staff__["a" /* TransportAddStaffPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transport_add_staff__["a" /* TransportAddStaffPage */]),
            ],
        })
    ], TransportAddStaffPageModule);
    return TransportAddStaffPageModule;
}());

//# sourceMappingURL=transport-add-staff.module.js.map

/***/ }),

/***/ 956:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransportAddStaffPage; });
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
 * Generated class for the TransportAddStaffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TransportAddStaffPage = /** @class */ (function () {
    function TransportAddStaffPage(navCtrl, http, navParams, viewCtrl, global, gFn, loadingCtrl, toastCtrl, global_api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.global = global;
        this.gFn = gFn;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.global_api = global_api;
        this.staffList = [];
        this.isRemove = false;
        this.client_id = navParams.get('client_id');
        this.selectedTeam = navParams.get('selectedTeam');
        this.event_id = navParams.get('event_id');
        this.createdBy = navParams.get('createdBy');
        this.transportId = navParams.get('transportId');
        this.removeStaffId = navParams.get('staffId');
        this.removeStaffName = navParams.get('staffName');
        if (this.removeStaffId != '' && this.removeStaffName != '') {
            this.isRemove = true;
        }
    }
    TransportAddStaffPage.prototype.ionViewDidLoad = function () {
        var loader = this.loadingCtrl.create({});
        loader.present();
        this.getStaffPlayersList().then(function (y) {
            loader.dismiss();
        });
    };
    TransportAddStaffPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    TransportAddStaffPage.prototype.getStaffPlayersList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', _this.transportId);
            _this.http.post(_this.global.APIURL + "transports/getStaffPlayerList", loginData, { headers: _this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS) {
                    _this.staffList = data.GETSTAFFPLAYERLIST;
                }
                resolve(true);
            }, function (error) {
            });
        });
    };
    TransportAddStaffPage.prototype.addStaff = function () {
        var _this = this;
        var person_ids = [];
        $(".person_ids:checked").each(function () {
            person_ids.push($(this).val());
        });
        if (person_ids.length > 0) {
            var loader_1 = this.loadingCtrl.create({});
            loader_1.present();
            var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('transportId', this.transportId)
                .set('person_ids', JSON.stringify(person_ids))
                .set('createdBy', this.createdBy);
            this.http.post(this.global.APIURL + "transports/addStaff", loginData, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                loader_1.dismiss();
                _this.close();
            }, function (error) {
            });
        }
        else {
            this.gFn.presentToast('Please select staff');
        }
    };
    TransportAddStaffPage.prototype.removeStaff = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var loginData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('staffId', this.removeStaffId);
        this.http.post(this.global.APIURL + "transports/removeStaff", loginData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.gFn.presentToast(data.MESSAGE);
            }
            loader.dismiss();
            _this.close();
        }, function (error) {
        });
    };
    TransportAddStaffPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-transport-add-staff',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-add-staff/transport-add-staff.html"*/'<ion-content class="bg-black" >\n  <div class="fixed-top_ modal-close">\n    <div class="rotate-text pwrotate-text-white" (click)="close()">\n        <span class="close_" data-dismiss="modal">CLOSE\n            <ion-icon name="close" class="close_-button"></ion-icon>\n        </span>\n    </div>\n  </div>\n  <div class="modal-content modalView" *ngIf="!isRemove">\n    <div class="modal-header shadow">\n        <h5 class="modal-title fontBold text-center">ADD STAFF</h5>\n    </div>\n    <div class="modal-body">\n      <div class="event-card mt-20 p-0">\n            <div class="well select-card selectCard d-flex align-center" *ngIf="staffList.length == 0">\n                <div class="row">\n                    <div class="col-xs-12">\n                        <h5 class="sub-title">NO STAFF AVAILABLE</h5>\n                    </div>\n                </div>\n            </div>\n            <div class="well select-card modal-card" *ngFor="let staff of staffList">\n              <div class="row">\n                  <div class="card-img col-xs-2 p-0">\n                    <span class="" *ngIf="staff.photoPath==\'\'">\n                        <div class="img-circle"><span class="img-text">{{staff.firstName[0]}} {{staff.lastName[0]}} </span></div>                                  \n                    </span>\n                    <span class="" *ngIf="staff.photoPath">\n                        <img src="{{global.PROFILEIMAGEURL}}{{staff.photoPath}}" alt="" class="img-circle">\n                    </span>\n                  </div>\n                  <div class="card-title col-xs-7">\n                    {{staff.firstName | uppercase}} {{staff.lastName | uppercase}}\n                  </div>\n                  <div class="event-next col-xs-3 p-0 d-flex flex-end align-center">\n                      <div class="toggle">\n                          <label class="switch">\n                              <input type="checkbox" class="person_ids" [attr.value]="staff.personId">\n                              <span class="slider round"></span>\n                          </label>\n                      </div>\n                  </div>\n              </div>\n          </div>\n        </div>\n    \n        <div class="btn-section mt-30" *ngIf="staffList.length > 0">\n            <button type="submit" class="btn btn-save xs-btn" (click)="addStaff()">ADD</button>\n        </div>\n        <div class="modal-footer"></div>\n\n      </div>\n  </div>\n\n  <div class="modal-content modalView" *ngIf="isRemove">\n    <div class="modal-header shadow">\n        <h5 class="modal-title fontBold text-center">STAFF</h5>\n    </div>\n    <div class="modal-body modal-report">\n      <div class="row">\n        <div class="d-flex align-center col-xs-3 p-0">\n          <span class="textGray">Name</span>\n        </div>\n        <div class="col-xs-9 p-0">\n            <input type="text" class="form-control" [(ngModel)]="removeStaffName" [readonly]="isRemove">\n        </div>\n      </div>\n      <div class="modal-footer mt-20">\n        <div class="row">\n          <div class="col-xs-12">\n            <button type="submit" class="btn btn-remove xs-btn" (click)="removeStaff()">REMOVE</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-add-staff/transport-add-staff.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], TransportAddStaffPage);
    return TransportAddStaffPage;
}());

//# sourceMappingURL=transport-add-staff.js.map

/***/ })

});
//# sourceMappingURL=9.js.map