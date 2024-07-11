webpackJsonp([82],{

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailModalPageModule", function() { return EmailModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__email_modal__ = __webpack_require__(872);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EmailModalPageModule = /** @class */ (function () {
    function EmailModalPageModule() {
    }
    EmailModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__email_modal__["a" /* EmailModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__email_modal__["a" /* EmailModalPage */]),
            ],
        })
    ], EmailModalPageModule);
    return EmailModalPageModule;
}());

//# sourceMappingURL=email-modal.module.js.map

/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
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
 * Generated class for the EmailModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EmailModalPage = /** @class */ (function () {
    function EmailModalPage(navCtrl, navParams, http, viewCtrl, storage, global, loadingCtrl, toastCtrl, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.global_api = global_api;
        this.message = '';
        this.email = navParams.get('email');
        storage.get('loggedInUserData').then(function (val) {
            _this.personID = val.PERSON_ID;
        });
    }
    EmailModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    EmailModalPage.prototype.sendEmail = function () {
        var _this = this;
        if (this.message.trim().length > 0) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            var emailData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('email_to', this.email)
                .set('person_id', this.personID)
                .set('message', encodeURIComponent(this.message));
            this.http.post(this.global.APIURL + "players/sendEmail", emailData, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                loading_1.dismiss();
                if (response.SUCCESS == true) {
                    _this.presentToast("Email sent successfully.");
                }
                else {
                    _this.presentToast("Error in Email sending");
                }
                _this.closeModal();
            }, function (error) {
                loading_1.dismiss();
                _this.presentToast("Error in Email sending");
                _this.closeModal();
            });
        }
        else {
            this.presentToast("Can't send blank Email");
        }
    };
    EmailModalPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    EmailModalPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    EmailModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-email-modal',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/email-modal/email-modal.html"*/'<!--\n  Generated template for the EmailModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n  <div class="modal fade group-msg in" role="dialog" style="display: block;">\n    <div class="modal-dialog plyr-modal-center">\n      <!-- Modal content-->\n      <div class="modal-content msg-send radius-10">\n        <div class="modal-header">\n          <h4 class="modal-title text-center">{{email}}</h4>\n        </div>\n        <div class="modal-body">\n          <textarea class="form-control msg-box plr-msg-box" [(ngModel)]="message" cols="30" rows="10"></textarea>\n        </div>\n        <div class="modal-footer">\n          <div class="row">\n              <div class="submit-link col-xs-6 text-left">\n                  <button type="submit" class="btn backgroundColor" (click)="close()">Close</button>\n              </div>\n            <div class="submit-link col-xs-6 text-right">\n              <button type="submit" class="btn" (click)="sendEmail()">Send</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/email-modal/email-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EmailModalPage);
    return EmailModalPage;
}());

//# sourceMappingURL=email-modal.js.map

/***/ })

});
//# sourceMappingURL=82.js.map