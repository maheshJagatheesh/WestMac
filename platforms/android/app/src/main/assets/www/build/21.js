webpackJsonp([21],{

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsProfileEditPageModule", function() { return SettingsProfileEditPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_profile_edit__ = __webpack_require__(936);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsProfileEditPageModule = /** @class */ (function () {
    function SettingsProfileEditPageModule() {
    }
    SettingsProfileEditPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings_profile_edit__["a" /* SettingsProfileEditPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings_profile_edit__["a" /* SettingsProfileEditPage */]),
            ],
        })
    ], SettingsProfileEditPageModule);
    return SettingsProfileEditPageModule;
}());

//# sourceMappingURL=settings-profile-edit.module.js.map

/***/ }),

/***/ 936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsProfileEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker_ngx__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64_ngx__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__ = __webpack_require__(24);
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
 * Generated class for the SettingsProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsProfileEditPage = /** @class */ (function () {
    function SettingsProfileEditPage(navCtrl, navParams, formBuilder, http, storage, loadingCtrl, global, imagePicker, base64, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.imagePicker = imagePicker;
        this.base64 = base64;
        this.global_api = global_api;
        this.showEmergencyContact = false;
        this.bgThemeColor = '';
        this.setRelationship = '';
        this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.phoneRegex = /^[\d]{10}$/;
        this.errorMsg = '';
        this.randomNumber = '';
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.backgroundThemeColor();
            var loading = loadingCtrl.create();
            loading.present();
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('person_id', _this.loggedInUserData.PERSON_ID);
            _this.http.post(_this.global.APIURL + 'players/getPersonDetails', data, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                loading.dismiss();
                if (response.SUCCESS) {
                    _this.profileDetails = response.GETPERSONDETAILS;
                    _this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
                    if (_this.profileDetails[0].emergency_contact != "") {
                        if (_this.profileDetails[0].emergency_contact.relationship == 1) {
                            _this.setRelationship = '(Parent)';
                        }
                        else if (_this.profileDetails[0].emergency_contact.relationship == 2) {
                            _this.setRelationship = '(Guardian)';
                        }
                        else {
                            _this.setRelationship = 'add emergency contact…';
                        }
                    }
                    else {
                        _this.setRelationship = 'add emergency contact…';
                    }
                    _this.profileEditForm = _this.formBuilder.group({
                        //default: new FormControl(),
                        first_name: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].first_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                        last_name: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].last_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                        email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].email_address, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(_this.emailRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                        phone_mobile: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].phone_mobile, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(_this.phoneRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                        addFirstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].emergency_contact.first_name),
                        addLastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].emergency_contact.last_name),
                        addEmail: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].emergency_contact.email_address),
                        addPhone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].emergency_contact.phone_mobile),
                        addRelationship: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].emergency_contact.relationship),
                        addEmergencies: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].emergency_contact.notifications),
                        addNotify: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.profileDetails[0].emergency_contact.notifications),
                        person_id: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.loggedInUserData.PERSON_ID),
                        client_id: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.loggedInUserData.CLIENT_ID),
                        selectedTeam: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.loggedInUserData.SELECTEDTEAM),
                        photoPath: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("")
                    });
                }
                else {
                    alert('Sorry no matching result found');
                }
            }, function (error) {
                loading.dismiss();
                //alert(JSON.stringify(error));
            });
        });
        this.profileEditForm = this.formBuilder.group({
            default: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](),
            photoPath: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]("")
        });
    }
    SettingsProfileEditPage.prototype.toggleEmergencyContact = function () {
        this.showEmergencyContact = !this.showEmergencyContact;
        if (this.showEmergencyContact) {
            this.profileEditForm = this.formBuilder.group({
                //default: new FormControl(),
                first_name: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.first_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                last_name: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.last_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.email, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                phone_mobile: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.phone_mobile, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.phoneRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                addFirstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addFirstName),
                addLastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addLastName),
                addEmail: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addEmail, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                addPhone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addPhone, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.phoneRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                addRelationship: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addRelationship),
                addEmergencies: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addEmergencies),
                addNotify: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addNotify),
                person_id: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.person_id),
                client_id: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.client_id),
                selectedTeam: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.selectedTeam),
                photoPath: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.photoPath)
            });
        }
        else {
            this.profileEditForm = this.formBuilder.group({
                //default: new FormControl(),
                first_name: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.first_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                last_name: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.last_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required),
                email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.email, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                phone_mobile: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.phone_mobile, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.phoneRegex), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required])),
                addFirstName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addFirstName),
                addLastName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addLastName),
                addEmail: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addEmail),
                addPhone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addPhone),
                addRelationship: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addRelationship),
                addEmergencies: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addEmergencies),
                addNotify: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.addNotify),
                person_id: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.person_id),
                client_id: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.client_id),
                selectedTeam: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.selectedTeam),
                photoPath: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](this.profileEditForm.value.photoPath)
            });
        }
    };
    SettingsProfileEditPage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "green":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "blue":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "orange":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "pink":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            default:
                this.bgThemeColor = "blue";
                break;
        }
    };
    SettingsProfileEditPage.prototype.getPhoto = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.base64.encodeFile(results[i]).then(function (base64File) {
                    _this.profileEditForm.controls["photoPath"].setValue(encodeURIComponent(base64File));
                }, function (err) {
                    alert(err);
                });
            }
        }, function (err) { });
    };
    SettingsProfileEditPage.prototype.updateProfileDetails = function () {
        var _this = this;
        if (this.profileEditForm.valid) {
            this.errorMsg = '';
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]({ fromObject: this.profileEditForm.value });
            this.http.post(this.global.APIURL + 'users/saveSessUserProfile', data, { headers: this.global_api.getHeader() })
                .subscribe(function (response) {
                loading_1.dismiss();
                if (response.SUCCESS) {
                    _this.errorMsg = 'Profile update successfully.';
                    setTimeout(function () { _this.navCtrl.push('SettingsProfileStatisticsPage'); }, 500);
                }
                else {
                    _this.errorMsg = 'Sorry, error in profile update.';
                }
            }, function (error) {
                loading_1.dismiss();
                //alert(JSON.stringify(error));
            });
        }
        else {
            this.errorMsg = '';
            if (!this.profileEditForm.controls.first_name.valid) {
                this.errorMsg = 'Provide a firstname';
            }
            else if (!this.profileEditForm.controls.last_name.valid) {
                this.errorMsg = 'Provide a lastname';
            }
            else if (!this.profileEditForm.controls.email.valid) {
                this.errorMsg = 'Provide a valid email';
            }
            else if (!this.profileEditForm.controls.phone_mobile.valid) {
                this.errorMsg = 'Provide a valid phone';
            }
            else if (this.showEmergencyContact) {
                if (!this.profileEditForm.controls.addFirstName.valid) {
                    this.errorMsg = 'Provide an emergency firstname';
                }
                else if (!this.profileEditForm.controls.addLastName.valid) {
                    this.errorMsg = 'Provide an emergency lastname';
                }
                else if (!this.profileEditForm.controls.addEmail.valid) {
                    this.errorMsg = 'Provide a valid emergency email';
                }
                else if (!this.profileEditForm.controls.addPhone.valid) {
                    this.errorMsg = 'Provide a valid emergency phone';
                }
            }
        }
    };
    SettingsProfileEditPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    SettingsProfileEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings-profile-edit',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/settings-profile-edit/settings-profile-edit.html"*/'<!--\n  Generated template for the SettingsProfileEditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content class="bg-gradient {{bgThemeColor}}">\n  <section class="main mt-20">\n    <div class="top-bar">\n      <div class="col-xs-3">\n        <div class="backArrow" (click)="goBack()"></div>\n      </div>\n    </div>\n\n    <form action="" class="user-form profile" [formGroup]="profileEditForm">\n      <input type="hidden" name="photoPath" value="" formControlName="photoPath" />\n      <section class="profileFirst profile-first">\n        <div class="row">\n          <div class="well edit-profile col-xs-12 radius-20">\n            <div class="row" *ngFor="let profileDetail of profileDetails">\n              <div class="card-img col-xs-3 p-0" *ngIf="profileDetail.photoPath.length > 0; else noImage">\n                <img src="{{global.PROFILEIMAGEURL}}{{profileDetail.photoPath}}?r={{randomNumber}}" alt="" class="img-circle" (click)="getPhoto()">\n              </div>\n              <ng-template #noImage>\n                <div class="card-img col-xs-3 p-0">\n                  <img src="assets/images/test-user.svg" alt="" class="img-circle" class="img-circle" (click)="getPhoto()">\n                </div>\n              </ng-template>\n\n\n              <div class="col-xs-9 p-0">\n                <span class="errorMsg">{{errorMsg}}</span>\n                <div class="title clearfix">\n                  <span class="first-name inputMargin"><input type="text" name="first_name" formControlName="first_name"value="{{profileDetail.first_name}}" /></span> <span class="last-name inputPadding"><input type="text" name="last_name" formControlName="last_name" value="{{profileDetail.last_name}}" /></span>\n                </div>\n                <ul class="list-group profile-list">\n                  <li class="list-group-item"><img src="assets/images/mail.png" alt=""><span><input type="text" name="email" formControlName="email" value="{{profileDetail.email_address}}" /></span></li>\n                  <li class="list-group-item"><img src="assets/images/phone.png" alt=""> <span><input type="text" name="phone_mobile" formControlName="phone_mobile" value="{{profileDetail.phone_mobile}}" /></span>  </li>\n                  <li class="list-group-item" (click)="toggleEmergencyContact()"><img src="assets/images/sister.png" alt=""> <span>{{profileDetail.emergency_contact.first_name}} {{setRelationship}} {{profileDetail.emergency_contact.phone_mobile}}</span></li>\n                  <li *ngIf="showEmergencyContact">\n                    <div class="title clearfix">\n                      <span class="first-name inputMargin"><input type="text" name="addFirstName" formControlName="addFirstName" value="{{profileDetail.emergency_contact.first_name}}" /> </span>\n                      <span class="last-name inputPadding"><input type="text" name="addLastName" formControlName="addLastName" value="{{profileDetail.emergency_contact.last_name}}" /></span>\n                    </div>\n                    <ul class="list-group profile-list">\n                      <li class="list-group-item"><img src="assets/images/mail.png" alt="">\n                        <span><input type="text" name="addEmail" formControlName="addEmail" value="{{profileDetail.emergency_contact.email_address}}" /></span>\n                      </li>\n                      <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                        <span><input type="text" name="addPhone" formControlName="addPhone" value="{{profileDetail.emergency_contact.phone_mobile}}" /></span>\n                      </li>\n                      <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                        <span>\n                            <select name="addRelationship" formControlName="addRelationship">\n                              <option value="">Select Relationship</option>\n                              <option value="1">Parent</option>\n                              <option value="2">Guardian</option>\n                            </select>\n                          </span>\n                      </li>\n                      <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                        <span>\n                            <select name="addEmergencies" formControlName="addEmergencies">\n                              <option value="">Select Emergencies</option>\n                              <option value="1">Yes</option>\n                              <option value="0">No</option>\n                            </select>\n                          </span>\n                      </li>\n                      <li class="list-group-item"><img src="assets/images/phone.png" alt="">\n                        <span>\n                            <select name="addNotify" formControlName="addNotify">\n                              <option value="">Select Notify</option>\n                              <option value="1">Yes</option>\n                              <option value="0">No</option>\n                            </select>\n                          </span>\n                      </li>\n\n                    </ul>\n                  </li>\n                  <li class="list-group-item"><img src="assets/images/medical.png" alt=""> <span>Medical: N/A</span></li>\n                </ul>\n              </div>\n            </div>\n            <div class="row">\n              <div class="btn-section">\n                <button type="submit" class="btn btn-save xs-btn" (click)="updateProfileDetails()">UPDATE DETAILS</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n    </form>\n  </section>\n\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/settings-profile-edit/settings-profile-edit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker_ngx__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64_ngx__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_8__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], SettingsProfileEditPage);
    return SettingsProfileEditPage;
}());

//# sourceMappingURL=settings-profile-edit.js.map

/***/ })

});
//# sourceMappingURL=21.js.map