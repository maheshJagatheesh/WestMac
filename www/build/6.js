webpackJsonp([6],{

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransportRemoveModalPageModule", function() { return TransportRemoveModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transport_remove_modal__ = __webpack_require__(951);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransportRemoveModalPageModule = /** @class */ (function () {
    function TransportRemoveModalPageModule() {
    }
    TransportRemoveModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__transport_remove_modal__["a" /* TransportRemoveModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transport_remove_modal__["a" /* TransportRemoveModalPage */]),
            ],
        })
    ], TransportRemoveModalPageModule);
    return TransportRemoveModalPageModule;
}());

//# sourceMappingURL=transport-remove-modal.module.js.map

/***/ }),

/***/ 951:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransportRemoveModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
 * Generated class for the TransportRemoveModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TransportRemoveModalPage = /** @class */ (function () {
    function TransportRemoveModalPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.removeoption = navParams.get('removeOptions');
        console.log(this.removeoption);
    }
    TransportRemoveModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransportRemoveModalPage');
    };
    TransportRemoveModalPage.prototype.sendRollcallId = function (data) {
        console.log(data);
        this.viewCtrl.dismiss(data);
    };
    TransportRemoveModalPage.prototype.close = function (event) {
        if (event.toElement.className == "scroll-content") {
            this.viewCtrl.dismiss();
        }
    };
    TransportRemoveModalPage.prototype.back = function () {
        this.viewCtrl.dismiss();
    };
    TransportRemoveModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-transport-remove-modal',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-remove-modal/transport-remove-modal.html"*/'<ion-content class="bg-black" (click)="close($event)">\n    \n  <div class="modal-content fixed_bottom modal-body">\n      <div class="modal-body logsCard">\n          <ion-item *ngFor="let key of removeoption" (click)="sendRollcallId(key.rollcallStatusId)">\n            <ion-label>{{key.statusName}}</ion-label>\n          </ion-item>\n          <!-- <ion-item>\n            <ion-label>Bus 1</ion-label>\n          </ion-item>\n          <ion-item>\n              <ion-label>Bus 2</ion-label>\n          </ion-item> -->\n        </div>\n    </div>\n    <div class="modal-content fixed_bottom_cancel modal-footer">\n        <div class="modal-body logsCard">\n            <ion-item (click)="back()">\n              <ion-label>Cancel</ion-label>\n            </ion-item>\n            \n          </div>\n      </div>\n    \n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/transport-remove-modal/transport-remove-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
    ], TransportRemoveModalPage);
    return TransportRemoveModalPage;
}());

//# sourceMappingURL=transport-remove-modal.js.map

/***/ })

});
//# sourceMappingURL=6.js.map