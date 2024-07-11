webpackJsonp([92],{

/***/ 760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CallModalPageModule", function() { return CallModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__call_modal__ = __webpack_require__(867);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CallModalPageModule = /** @class */ (function () {
    function CallModalPageModule() {
    }
    CallModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__call_modal__["a" /* CallModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__call_modal__["a" /* CallModalPage */]),
            ],
        })
    ], CallModalPageModule);
    return CallModalPageModule;
}());

//# sourceMappingURL=call-modal.module.js.map

/***/ }),

/***/ 867:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallModalPage; });
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
 * Generated class for the CallModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CallModalPage = /** @class */ (function () {
    function CallModalPage(navCtrl, navParams, viewCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.relations = [];
        this.phone = navParams.get('phone');
        this.emergency = navParams.get('emergency');
        this.emergencyContacts = navParams.get('emergencyContacts');
        this.relations[1] = 'Parent';
        this.relations[2] = 'Guardian';
    }
    CallModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    CallModalPage.prototype.call = function (phone) {
        if (phone === void 0) { phone = ''; }
        if (phone.length) {
            this.phone = phone;
        }
        this.closeModal();
        window.open('tel:' + this.phone, '_system');
    };
    CallModalPage.prototype.presentActionSheet = function () {
        var _this = this;
        if (this.emergency) {
            if (this.emergencyContacts.length == 1) {
                this.call(this.emergencyContacts[0].phone_mobile);
                return;
            }
            var options = [];
            var _loop_1 = function (key) {
                options.push({
                    text: this_1.emergencyContacts[key].phone_mobile,
                    handler: function () {
                        _this.call(_this.emergencyContacts[key].phone_mobile);
                    }
                });
            };
            var this_1 = this;
            for (var key in this.emergencyContacts) {
                _loop_1(key);
            }
            options.push({
                text: 'Cancel',
                role: 'cancel'
            });
            var actionSheet = this.actionSheetCtrl.create({
                title: 'Select Phone Number',
                buttons: options
            });
            actionSheet.present();
        }
        else {
            this.call();
        }
    };
    CallModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-call-modal',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/call-modal/call-modal.html"*/'<!--\n  Generated template for the CallModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n  <div class="modal fade group-msg in" role="dialog" style="display: block;">\n    <div class="modal-dialog player-phone-two">\n      <!-- Modal content-->\n      <div class="modal-content group-msg radius-20">\n        <div class="">\n          <h4 class="modal-title text-center"></h4>\n          <p class="header-title text-center"></p>\n        </div>\n        <div class="modal-body">\n          <h4 class="modal-title text-center text-position" *ngIf="emergency; else callPlayer">\n            Emergency Contact<br/>\n            <div *ngFor="let emergencyContact of emergencyContacts">\n              {{emergencyContact.parentName | titlecase}} ({{relations[emergencyContact.relationship]}}) <br/>\n              {{emergencyContact.phone_mobile}}\n            </div>\n          </h4>\n          <ng-template #callPlayer>\n            <h4 class="modal-title text-center text-position">{{phone}}</h4>\n          </ng-template>\n        </div>\n        <div class="modal-footer">\n          <div class="row">\n            <div class="submit-link col-xs-6 text-center border-rt">\n              <button type="submit" class="btn" (click)="closeModal()">Cancel</button>\n            </div>\n            <div class="submit-link col-xs-6 text-center">\n              <button type="submit" class="btn" (click)="presentActionSheet()">Call</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/call-modal/call-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], CallModalPage);
    return CallModalPage;
}());

//# sourceMappingURL=call-modal.js.map

/***/ })

});
//# sourceMappingURL=92.js.map