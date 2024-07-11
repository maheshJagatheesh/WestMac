webpackJsonp([41],{

/***/ 814:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerAddForGradingPageModule", function() { return PlayerAddForGradingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_add_for_grading__ = __webpack_require__(916);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PlayerAddForGradingPageModule = /** @class */ (function () {
    function PlayerAddForGradingPageModule() {
    }
    PlayerAddForGradingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__player_add_for_grading__["a" /* PlayerAddForGradingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__player_add_for_grading__["a" /* PlayerAddForGradingPage */]),
            ],
        })
    ], PlayerAddForGradingPageModule);
    return PlayerAddForGradingPageModule;
}());

//# sourceMappingURL=player-add-for-grading.module.js.map

/***/ }),

/***/ 916:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerAddForGradingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker_ngx__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_base64_ngx__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_functions_global_functions__ = __webpack_require__(34);
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










/**
 * Generated class for the PlayerAddForGradingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PlayerAddForGradingPage = /** @class */ (function () {
    function PlayerAddForGradingPage(navCtrl, navParams, http, formBuilder, storage, imagePicker, base64, events, loadingCtrl, global, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.imagePicker = imagePicker;
        this.base64 = base64;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.gFn = gFn;
        this.global_api = global_api;
        this.showEmergencyContact = false;
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.phoneRegex = /^[\d]{10}$/;
        this.errorMsg = '';
        this.storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
        });
        this.playerAddForm = this.formBuilder.group({
            firstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
            lastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
            email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
            phone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.phoneRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
            addFirstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
            addLastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
            addEmail: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
            addPhone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
            addRelationship: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
            addEmergencies: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
            addNotify: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
            profileImage: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("")
        });
    }
    PlayerAddForGradingPage.prototype.toggleEmergencyContact = function () {
        this.showEmergencyContact = !this.showEmergencyContact;
        if (this.showEmergencyContact) {
            this.playerAddForm = this.formBuilder.group({
                firstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.firstName, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                lastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.lastName, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.email, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                phone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.phone, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.phoneRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                addFirstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                addLastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                addEmail: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                addPhone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.phoneRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                addRelationship: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                addEmergencies: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                addNotify: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                profileImage: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.profileImage)
            });
        }
        else {
            this.playerAddForm = this.formBuilder.group({
                firstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.firstName, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                lastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.lastName, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.email, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                phone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.phone, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.phoneRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                addFirstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                addLastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                addEmail: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                addPhone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                addRelationship: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                addEmergencies: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                addNotify: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](""),
                profileImage: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.playerAddForm.value.profileImage)
            });
        }
    };
    PlayerAddForGradingPage.prototype.getPhoto = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.base64.encodeFile(results[i]).then(function (base64File) {
                    _this.playerAddForm.controls["profileImage"].setValue(encodeURIComponent(base64File));
                }, function (err) {
                    alert(err);
                });
            }
        }, function (err) { });
    };
    PlayerAddForGradingPage.prototype.playerAddForGrading = function () {
        var _this = this;
        if (this.playerAddForm.valid) {
            this.errorMsg = '';
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            var formData = {
                'selectedTeam': this.loggedInUserData.SELECTEDTEAM,
                'client_id': this.loggedInUserData.CLIENT_ID
            };
            formData = Object.assign(formData, this.playerAddForm.value);
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]({ fromObject: formData });
            this.http.post(this.global.APIURL + 'players/addPlayerForGrading', data, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                loading_1.dismiss();
                if (response.SUCCESS) {
                    _this.errorMsg = response.MESSAGE;
                    setTimeout(function () { _this.navCtrl.setRoot('PlayersDashboardPage'); }, 500);
                }
                else {
                    _this.errorMsg = response.MESSAGE;
                }
            }, function (error) {
                loading_1.dismiss();
            });
        }
        else {
            this.errorMsg = '';
            if (!this.playerAddForm.controls.firstName.valid) {
                this.errorMsg = 'Provide a firstname';
            }
            else if (!this.playerAddForm.controls.lastName.valid) {
                this.errorMsg = 'Provide a lastname';
            }
            else if (!this.playerAddForm.controls.email.valid) {
                this.errorMsg = 'Provide a valid email';
            }
            else if (!this.playerAddForm.controls.phone.valid) {
                this.errorMsg = 'Provide a valid phone';
            }
            else if (this.showEmergencyContact) {
                if (!this.playerAddForm.controls.addFirstName.valid) {
                    this.errorMsg = 'Provide an emergency firstname';
                }
                else if (!this.playerAddForm.controls.addLastName.valid) {
                    this.errorMsg = 'Provide an emergency lastname';
                }
                else if (!this.playerAddForm.controls.addEmail.valid) {
                    this.errorMsg = 'Provide a valid emergency email';
                }
                else if (!this.playerAddForm.controls.addPhone.valid) {
                    this.errorMsg = 'Provide a valid emergency phone';
                }
            }
        }
    };
    PlayerAddForGradingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-player-add-for-grading',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-add-for-grading/player-add-for-grading.html"*/'<!--\n  Generated template for the PlayerAddForGradingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <nav class="navbar navbar-fixed-top">\n    <div class="top-bar clearfix">\n      <div class="pull-left" (click)="goToPlayersDashboard()">\n        <div class="backArrow info-item">TEAM MATES</div>\n      </div>\n      <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n        <a href="javascript:void(0);" class="prev"></a>\n      </div>\n    </div>\n    <ul class="nav navbar-nav top-menu player-menu">\n      <li class=""><a href="javascript:void(0);" (click)="goToPlayerGroupMessage()">Group message</a></li>\n      <li class=""><a href="javascript:void(0);" (click)="goToPlayerGrading()">Grading</a></li>\n      <li class="active"><a href="javascript:void(0);">Add player</a></li>\n    </ul>\n  </nav>\n</ion-header>\n\n<ion-content>\n  <div class="bg-gray event">\n    <section class="main">\n      <form action="" class="user-form player-item" [formGroup]="playerAddForm">\n        <input type="hidden" name="profileImage" value="" formControlName="profileImage" />\n        <section class="profileFirst heightAuto xs-padding">\n          <div class="row">\n            <div class="well edit-profile col-xs-12 radius-20">\n              <div class="row">\n                <div class="card-img col-xs-3 p-0">\n                  <img src="assets/images/camera-white.png" alt="" class="img-circle" (click)="getPhoto()">\n                </div>\n                <div class="col-xs-9 p-0">\n                  <span class="errorMsg">{{errorMsg}}</span>\n                  <div class="title clearfix">\n                    <span class="first-name"><input type="text" name="firstName" formControlName="firstName" placeholder="Firstname" /> </span>\n                    <span class="last-name"><input type="text" name="lastName" formControlName="lastName" placeholder="Lastname" /></span>\n                  </div>\n                  <ul class="list-group profile-list">\n                    <li class="list-group-item"><img src="assets/images/mail.png" alt="">\n                      <span><input type="text" name="email" placeholder="add email…" formControlName="email" autocapitalize="none" /></span>\n                    </li>\n                    <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                      <span><input type="text" name="phone" placeholder="add phone…" formControlName="phone" /></span>\n                    </li>\n                    <li class="list-group-item" (click)="toggleEmergencyContact()"><img src="assets/images/sister.png" alt="">\n                      <span>add emergency contact…</span>\n                    </li>\n                    <li *ngIf="showEmergencyContact">\n                      <div class="title clearfix">\n                        <span class="first-name"><input type="text" name="addFirstName" formControlName="addFirstName" placeholder="Firstname" /> </span>\n                        <span class="last-name"><input type="text" name="addLastName" formControlName="addLastName" placeholder="Lastname" /></span>\n                      </div>\n                      <ul class="list-group profile-list">\n                        <li class="list-group-item"><img src="assets/images/mail.png" alt="">\n                          <span><input type="text" name="addEmail" formControlName="addEmail" placeholder="add email…" autocapitalize="none" /></span>\n                        </li>\n                        <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                          <span><input type="text" name="addPhone" formControlName="addPhone" placeholder="add phone…" /></span>\n                        </li>\n                        <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                          <span>\n                            <select name="addRelationship" formControlName="addRelationship">\n                              <option value="">Select Relationship</option>\n                              <option value="1">Parent</option>\n                              <option value="2">Guardian</option>\n                            </select>\n                          </span>\n                        </li>\n                        <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                          <span>\n                            <select name="addEmergencies" formControlName="addEmergencies">\n                              <option value="">Select Emergencies</option>\n                              <option value="1">Yes</option>\n                              <option value="0">No</option>\n                            </select>\n                          </span>\n                        </li>\n                        <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                          <span>\n                            <select name="addNotify" formControlName="addNotify">\n                              <option value="">Select Notify</option>\n                              <option value="1">Yes</option>\n                              <option value="0">No</option>\n                            </select>\n                          </span>\n                        </li>\n                      </ul>\n                    </li>\n                    <li class="list-group-item"><img src="assets/images/medical.png" alt="">\n                      <span>add medical information…</span>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n              <div class="row">\n                <div class="btn-section">\n                  <button type="submit" class="btn btn-save xs-btn" (click)="playerAddForGrading()">SAVE</button>\n                </div>\n              </div>\n            </div>\n          </div>\n          <a href="javascript:void(0);" class="circle-plus mt-20">\n            <i class="material-icons">add</i>\n          </a>\n        </section>\n      </form>\n    </section>\n  </div>\n</ion-content>\n\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav">\n        <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n        <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n        <li class="players active" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n        <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n        <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n      </ul>\n    </div>\n  </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-add-for-grading/player-add-for-grading.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker_ngx__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_base64_ngx__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], PlayerAddForGradingPage);
    return PlayerAddForGradingPage;
}());

//# sourceMappingURL=player-add-for-grading.js.map

/***/ })

});
//# sourceMappingURL=41.js.map