webpackJsonp([35],{

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerMedicalRecordsPageModule", function() { return PlayerMedicalRecordsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_medical_records__ = __webpack_require__(920);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(337);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PlayerMedicalRecordsPageModule = /** @class */ (function () {
    function PlayerMedicalRecordsPageModule() {
    }
    PlayerMedicalRecordsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__player_medical_records__["a" /* PlayerMedicalRecordsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__player_medical_records__["a" /* PlayerMedicalRecordsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], PlayerMedicalRecordsPageModule);
    return PlayerMedicalRecordsPageModule;
}());

//# sourceMappingURL=player-medical-records.module.js.map

/***/ }),

/***/ 920:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerMedicalRecordsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser_ngx__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PlayerMedicalRecordsPage = /** @class */ (function () {
    function PlayerMedicalRecordsPage(navCtrl, navParams, storage, plt, http, loadingCtrl, global, gFn, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.plt = plt;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.gFn = gFn;
        this.iab = iab;
        this.playerDetails = [];
        this.medicalCondition = 'No medical conditions recorded';
        this.MedicineInformation = [];
        this.playerDetails = navParams.get('playerDetails');
        console.log('param', this.playerDetails);
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.goBack();
            });
        });
        if (this.playerDetails[0]['medical_history']) {
            this.MedicineDetails = Object.keys(this.playerDetails[0]['medical_history']).reduce(function (c, k) { return (c[k.toLowerCase()] = (_this.playerDetails[0]['medical_history'])[k], c); }, {});
            storage.get('medicineInfo').then(function (val) {
                _this.MedicineNames = JSON.parse(val);
                _this.MedicineNames = Object.keys(_this.MedicineNames).reduce(function (c, k) { return (c[k.toLowerCase()] = _this.MedicineNames[k], c); }, {});
                for (var key1 in _this.MedicineNames) {
                    console.log(key1, _this.MedicineDetails[key1]);
                    var data1 = {
                        MedicineName: _this.MedicineNames[key1],
                        MedicineFlag: _this.MedicineDetails[key1]
                    };
                    _this.MedicineInformation.push(data1);
                }
            });
        }
        // console.log('param2',this.MedicineDetails['permission_antihistamines'])
    }
    PlayerMedicalRecordsPage.prototype.ionViewDidLoad = function () {
        this.gFn.hideMenuIcon();
        var reportArray = [];
        var medical_history = this.playerDetails[0]['medical_history'];
        for (var historyKey in medical_history) {
            if (!medical_history.hasOwnProperty(historyKey))
                continue;
            if (medical_history[historyKey] === true && medical_history.hasOwnProperty(historyKey + '_DETAIL')) {
                var report = this.toCamelCase(historyKey) + ": ";
                if (medical_history[historyKey + '_DETAIL'] && medical_history[historyKey + '_DETAIL'].length > 0) {
                    report += medical_history[historyKey + '_DETAIL'];
                }
                else {
                    report += "Details not available";
                }
                reportArray.push(report);
            }
        }
        if (reportArray.length > 0) {
            this.medicalCondition = reportArray.join(', ');
        }
    };
    PlayerMedicalRecordsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    PlayerMedicalRecordsPage.prototype.openAttachement = function (url) {
        var browserRef = this.iab.create(url, '_blank', 'clearcache=yes,clearsesioncache=yes');
    };
    PlayerMedicalRecordsPage.prototype.toCamelCase = function (str) {
        return str.split('_').map(function (word, index) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };
    PlayerMedicalRecordsPage.prototype.ionViewDidLeave = function () {
        this.gFn.showMenuIcon();
    };
    PlayerMedicalRecordsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-player-medical-records',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-medical-records/player-medical-records.html"*/'<!--\n  Generated template for the PlayerMedicalRecordsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="bg-black mt-20">\n  <div class="top-bar">\n    <div class="col-xs-3">\n      <div class="backArrow inverse" (click)="goBack()"></div>\n    </div>\n  </div>\n</ion-header>\n\n<ion-content class="bg-black borrowPlayer">\n  <section class="main mt-20 mb-50">\n    <section class="profileFirst heightAuto" *ngFor="let player of playerDetails">\n      <div class="row profile-row">\n        <div class="card-img col-xs-12 p-0 profile-image">\n          <span class="">\n            <img *ngIf="player.photoPath != null && player.photoPath.length > 0; else noImage" src="{{global.PROFILEIMAGEURL}}{{player.photoPath}}" alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n            <ng-template #noImage>\n              <div class="img-circle" *ngIf="!player.photoPath"><span class="img-text">{{player.first_name[0]}} {{player.last_name[0]}} </span>\n              </div>\n            </ng-template>\n          </span>\n        </div>\n      </div>\n      <div class="player-info">\n        <h4>{{player.first_name}} {{player.last_name}}</h4>\n        <p *ngIf="player.uniform_id != null && player.uniform_id.toString().length > 0">#{{player.uniform_id}}</p>\n      </div>\n\n      <div class="group-item" *ngIf="!player.operooEnabled">\n        <div class="bg-info clearfix">\n            <div class="sm-title pull-left">MEDICAL RECORD</div>\n        </div>\n        <div class="event-card borrow">\n          <div class="well select-card plan-card player-medical2">\n            <div class="row">\n              <div class="col-xs-12">\n                <textarea *ngIf="player.medical_condition.length > 0; else noMedicalReport" class="sub-title player-med-title" [class.contentEditable]="editable" [(ngModel)]="medicalCondition">\n                  {{player.medical_condition}}</textarea>\n                <ng-template #noMedicalReport><textarea class="sub-title player-med-title" [class.contentEditable]="editable" [(ngModel)]="medicalCondition">No medical conditions recorded</textarea></ng-template>\n              </div>\n            </div>\n            <div class="row" *ngIf="editable">\n              <div class="btn-section col-xs-12">\n                <button type="submit" class="btn btn-save xs-btn player-med-save" (click)="saveRecord()">SAVE</button>\n              </div>\n            </div>\n          </div>\n          <!--<a href="javascript:void(0);" class="circle-plus" (click)="addRecord()">\n            <i class="material-icons" *ngIf="!editable">add</i>\n            <i class="material-icons" *ngIf="editable">remove</i>\n          </a>-->\n        </div>\n      </div>\n      <div class="group-item" *ngIf="!player.operooEnabled">\n        <div class="bg-info clearfix">\n            <div class="sm-title pull-left">MEDICAL ACTION PLAN</div>\n        </div>\n        <div class="event-card borrow">\n            <div class="well select-card plan-card player-medical2">\n              <div class="row">\n                <div class="col-xs-12">\n                  <textarea *ngIf="MedicineDetails && MedicineDetails.medical_action_plan; else noMedicalActionPlan" class="sub-title player-med-title" [class.contentEditable]="editable">{{MedicineDetails.medical_action_plan}}</textarea>\n                  <ng-template #noMedicalActionPlan><textarea class="sub-title player-med-title" [class.contentEditable]="editable" > No medical action plan recorded</textarea></ng-template>\n                </div>\n              </div>\n              <div class="row" *ngIf="editable">\n                <div class="btn-section col-xs-12">\n                  <button type="submit" class="btn btn-save xs-btn player-med-save" (click)="saveRecord()">SAVE</button>\n                </div>\n              </div>\n            </div>\n            <!--<a href="javascript:void(0);" class="circle-plus" (click)="addRecord()">\n              <i class="material-icons" *ngIf="!editable">add</i>\n              <i class="material-icons" *ngIf="editable">remove</i>\n            </a>-->\n          </div>\n      </div>\n      <div class="group-item" *ngIf="!player.operooEnabled && MedicineInformation.length>0">\n        <div class="bg-info clearfix">\n            <div class="sm-title pull-left">MEDICINE INFORMATION</div>\n        </div>\n       \n        <div *ngFor="let key of MedicineInformation">\n          \n            <ion-label class="MedicineCard">\n              <div class="col-xs-12">\n                  <div class="col-xs-7">\n                    <span style="float: left;padding-top: 7px;">\n                        {{key.MedicineName}}\n                    </span>\n                     \n                  </div>\n                    <div class="col-xs-2 pr-0 checkArrow-group" >\n                      <div class="col-xs-2 p-0 checkbox-col" >\n                        <div class="defaultCheckbox1" [class.PresentCheckbox1]="key.MedicineFlag==1" [class.AbsentCheckbox1]="key.MedicineFlag==0">\n                        </div>\n                        <div class="checkbox"></div>\n                      </div>\n                    </div>\n      \n              </div>\n              \n            </ion-label>\n          </div>\n      </div>\n      <div class="group-item" *ngIf="player.operooEnabled" style="margin-bottom: 60px;">\n        <div class="bg-info clearfix">\n            <div class="sm-title pull-left">MEDICAL PROFILE</div>\n        </div>\n        <div class="med-prof-item">\n          <ion-label class="MedicineCard" >\n            <div class="col-xs-12 MedicineCard">\n                <div class="col-xs-7 medicineNameCard">\n                  <span style="float: left">\n                      Blood Group\n                  </span>\n                    \n                </div>\n                  <div class="col-xs-2 pr-0" >\n                    <span style="float: left">\n                      {{player.operooData.bloodGroup | bloodGroup}}\n                  </span>\n                  </div>\n            </div>\n            \n          </ion-label>\n          <br>\n        </div>\n        <div class="med-prof-item">\n          <ion-label class="MedicineCard" >\n            <div class="col-xs-12 MedicineCard">\n                <div class="col-xs-7 medicineNameCard">\n                  <span style="float: left">\n                      Wear Glasses\n                  </span>\n                    \n                </div>\n                  <div class="col-xs-2 pr-0 checkArrow-group" >\n                    <div class="col-xs-2 p-0 checkbox-col" >\n                      <div class="defaultCheckbox1" [class.PresentCheckbox1]="player.operooData.wearsGlasses==1" [class.AbsentCheckbox1]="player.operooData.wearsGlasses!=1">\n                      </div>\n                      <div class="checkbox"></div>\n                    </div>\n                  </div>\n            </div>\n            \n          </ion-label>\n          <br>\n        </div>\n        <div class="med-prof-item">\n          <ion-label class="MedicineCard" >\n            <div class="col-xs-12 MedicineCard">\n                <div class="col-xs-7 medicineNameCard">\n                  <span style="float: left">\n                      Wear Contacts\n                  </span>\n                    \n                </div>\n                  <div class="col-xs-2 pr-0 checkArrow-group" >\n                    <div class="col-xs-2 p-0 checkbox-col" >\n                      <div class="defaultCheckbox1" [class.PresentCheckbox1]="player.operooData.WearsContacts==1" [class.AbsentCheckbox1]="player.operooData.WearsContacts!=1">\n                      </div>\n                      <div class="checkbox"></div>\n                    </div>\n                  </div>\n            </div>\n            \n          </ion-label>\n          <br>\n        </div>\n  \n        <div class="med-prof-item">\n          <ion-label class="MedicineCard" >\n            <div class="col-xs-12 MedicineCard">\n                <div class="col-xs-7 medicineNameCard">\n                  <span style="float: left">\n                      Swimming Ability\n                  </span>\n                    \n                </div>\n                  <div class="col-xs-2 pr-0" >\n                    <span style="float: left">\n                      {{player.operooData.swimmingAbility | swimmingFilter}}\n                  </span>\n                  </div>\n            </div>\n            \n          </ion-label>\n          <br>\n        </div>\n  \n        <div class="med-prof-item">\n          <ion-label class="MedicineCard" >\n            <div class="col-xs-12 MedicineCard">\n                <div class="col-xs-7 medicineNameCard">\n                  <span style="float: left">\n                      Paracetamol Allowed\n                  </span>\n                    \n                </div>\n                  <div class="col-xs-2 pr-0 checkArrow-group" >\n                    <div class="col-xs-2 p-0 checkbox-col" >\n                      <div class="defaultCheckbox1" [class.PresentCheckbox1]="player.operooData.paracetamolAllowed==1" [class.AbsentCheckbox1]="player.operooData.paracetamolAllowed!=1">\n                      </div>\n                      <div class="checkbox"></div>\n                    </div>\n                  </div>\n            </div>\n            \n          </ion-label>\n          <br>\n        </div>\n      </div>     \n  \n      <div class="group-item" *ngIf="player.operooEnabled" style="margin-bottom: 60px;">\n        <div class="bg-info clearfix">\n            <div class="sm-title pull-left">SAFETY ALERTS</div>\n        </div>   \n  \n        <div class="contactCard" *ngFor="let key of player.operooData.safetyAlerts">\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Condition Name\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.condition}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Risk Level\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.riskLevel}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n          \n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Description\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.description}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Medication Required\n                  </span>\n                    \n                </div>             \n                <div class="col-xs-2 pr-0 checkArrow-group" >\n                  <div class="col-xs-2 p-0 checkbox-col" >\n                    <div class="defaultCheckbox1" [class.PresentCheckbox1]="key.medicationRequired==1" [class.AbsentCheckbox1]="key.medicationRequired!=1">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n            </div>\n            \n          </div>\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Medication Details\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.medication}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Attachement\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span  style="color: #18674c"(click)="openAttachement(key.attachmentUrl)" *ngIf="key.attachmentUrl.length">View attchement</span>\n                </div>\n            </div>\n            \n          </div>\n        </div>\n        \n       \n      </div>\n  \n      <div class="group-item" *ngIf="player.operooEnabled" style="margin-bottom: 60px;">\n        <div class="bg-info clearfix">\n            <div class="sm-title pull-left">EMERGENCY CONTACT</div>\n        </div>\n        <div class="contactCard" *ngFor="let key of player.operooData.emergencyContacts">\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Name\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.name}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Mobile Phone\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.mobilePhone}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n          \n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Home Phone\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.homePhone}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Work Phone\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.workPhone}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n          <div class="MedicineCard " >\n            <div class="col-xs-12 MedicineCard blue-font">\n                <div class="col-xs-5">\n                  <span style="float: left">\n                      Email\n                  </span>\n                    \n                </div>\n                <div class="col-xs-7 pr-0" >\n                  <span >\n                    {{key.email}}\n                </span>\n                </div>\n            </div>\n            \n          </div>\n        </div>\n      </div>\n    </section>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/player-medical-records/player-medical-records.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */]])
    ], PlayerMedicalRecordsPage);
    return PlayerMedicalRecordsPage;
}());

//# sourceMappingURL=player-medical-records.js.map

/***/ })

});
//# sourceMappingURL=35.js.map