webpackJsonp([18],{

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(939);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]),
            ],
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 939:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
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
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, http, formBuilder, events, global, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.formBuilder = formBuilder;
        this.events = events;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.signupForm = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required)
        });
    }
    SignupPage.prototype.SignUp = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var SignUpData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]({ fromObject: this.signupForm.value });
        this.http.post(this.global.APIURL + 'users/userRegister', SignUpData)
            .subscribe(function (response) {
            _this.navCtrl.pop();
            loading.dismiss();
            alert("SignUp Successfull");
        }, function (error) {
            loading.dismiss();
            alert("Error While SignUp");
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/signup/signup.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content class="main bg-gradient">\n  <section class="main bg-gradient">\n    <form action="" class="user-form login-wrap login" [formGroup]="signupForm">\n      <div class="form-group">\n        <label for="username">USERNAME</label>\n        <input type="text" class="form-control" id="username" placeholder="" formControlName="username" required>\n      </div>\n      <div class="divider"></div>\n      <div class="form-group">\n        <label for="password">PASSWORD</label>\n        <input type="password" class="form-control" id="password" placeholder="" formControlName="password" required>\n      </div>\n      <div class="login-icon text-center" (click)="SignUp()">\n        <button class="login-circle xs" type="submit"></button>\n      </div>\n      <!-- <div class="forget mt-30 text-up">\n          <a href="javascript:void(0);" class="forget-pass">Forgotten your password?</a>\n        </div> -->\n\n    </form>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=18.js.map