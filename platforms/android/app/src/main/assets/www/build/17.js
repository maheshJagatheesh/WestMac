webpackJsonp([17],{

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmsModalPageModule", function() { return SmsModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sms_modal__ = __webpack_require__(939);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SmsModalPageModule = /** @class */ (function () {
    function SmsModalPageModule() {
    }
    SmsModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__sms_modal__["a" /* SmsModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sms_modal__["a" /* SmsModalPage */]),
            ],
        })
    ], SmsModalPageModule);
    return SmsModalPageModule;
}());

//# sourceMappingURL=sms-modal.module.js.map

/***/ }),

/***/ 939:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmsModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sms_ngx__ = __webpack_require__(347);
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
 * Generated class for the SmsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SmsModalPage = /** @class */ (function () {
    function SmsModalPage(navCtrl, navParams, sms, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sms = sms;
        this.viewCtrl = viewCtrl;
        this.message = '';
        this.phone = navParams.get('phone');
    }
    SmsModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    SmsModalPage.prototype.sendSMS = function () {
        this.closeModal();
        var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT' // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
                //intent: 'INTENT' // send SMS inside a default SMS app
            }
        };
        this.sms.send(this.phone, this.message, options);
    };
    SmsModalPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    SmsModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sms-modal',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/sms-modal/sms-modal.html"*/'<!--\n  Generated template for the SmsModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n  <div class="modal fade group-msg in" role="dialog" style="display: block;">\n    <div class="modal-dialog plyr-modal-center">\n      <!-- Modal content-->\n      <div class="modal-content msg-send radius-10">\n        <div class="modal-header">\n          <h4 class="modal-title text-center">SMS</h4>\n        </div>\n        <div class="modal-body">\n          <textarea class="form-control msg-box plr-msg-box" [(ngModel)]="message" cols="30" rows="6"></textarea>\n        </div>\n        <div class="modal-footer">\n          <div class="row">\n            <div class="submit-link col-xs-6 text-left">\n                <button type="submit" class="btn" (click)="close()">Close</button>\n            </div>\n            <div class="submit-link col-xs-6 text-right">\n              <button type="submit" class="btn" (click)="sendSMS()">Send</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/sms-modal/sms-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sms_ngx__["a" /* SMS */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
    ], SmsModalPage);
    return SmsModalPage;
}());

//# sourceMappingURL=sms-modal.js.map

/***/ })

});
//# sourceMappingURL=17.js.map