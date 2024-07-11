webpackJsonp([19],{

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeverityDetailsModalPageModule", function() { return SeverityDetailsModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__severity_details_modal__ = __webpack_require__(938);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(337);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SeverityDetailsModalPageModule = /** @class */ (function () {
    function SeverityDetailsModalPageModule() {
    }
    SeverityDetailsModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__severity_details_modal__["a" /* SeverityDetailsModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__severity_details_modal__["a" /* SeverityDetailsModalPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], SeverityDetailsModalPageModule);
    return SeverityDetailsModalPageModule;
}());

//# sourceMappingURL=severity-details-modal.module.js.map

/***/ }),

/***/ 938:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeverityDetailsModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser_ngx__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SeverityDetailsModalPage = /** @class */ (function () {
    function SeverityDetailsModalPage(navCtrl, navParams, storage, global, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.iab = iab;
        this.severityDetails = [];
        this.DisplayDetails = [];
        this.AttendyDetails = {};
        this.MedicineInformation = [];
        var AttendyDetailsDup = navParams.get('playerAilments');
        this.AttendyDetails = Object.keys(AttendyDetailsDup).reduce(function (c, k) { return (c[k.toLowerCase()] = AttendyDetailsDup[k], c); }, {});
        console.log('AttendyDetails', this.AttendyDetails);
        this.severityDetails = this.AttendyDetails.playerailments.split('|');
        console.log('severityDetails', this.severityDetails);
        for (var key in this.severityDetails) {
            var splitedDetails = this.severityDetails[key].split(':');
            var medicalProblem = splitedDetails[0];
            var details = splitedDetails[1];
            var severity = splitedDetails[2];
            if (medicalProblem || details || severity) {
                var JsonDetails = {
                    medicalProblem: medicalProblem,
                    details: details,
                    severity: severity
                };
                this.DisplayDetails.push(JsonDetails);
            }
        }
        console.log('this.DisplayDetails', this.DisplayDetails);
        storage.get('medicineInfo').then(function (val) {
            _this.MedicineNames = JSON.parse(val);
            _this.MedicineNames = Object.keys(_this.MedicineNames).reduce(function (c, k) { return (c[k.toLowerCase()] = _this.MedicineNames[k], c); }, {});
            for (var key1 in _this.MedicineNames) {
                // console.log(key1,this.AttendyDetails[key1])
                var data1 = {
                    MedicineName: _this.MedicineNames[key1],
                    MedicineFlag: _this.AttendyDetails[key1]
                };
                _this.MedicineInformation.push(data1);
            }
        });
    }
    SeverityDetailsModalPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad SeverityDetailsModalPage');
    };
    SeverityDetailsModalPage.prototype.openAttachement = function (url) {
        var browserRef = this.iab.create(url, '_blank', 'clearcache=yes,clearsesioncache=yes');
    };
    SeverityDetailsModalPage.prototype.backArrow = function () {
        this.navCtrl.pop();
    };
    SeverityDetailsModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-severity-details-modal',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/severity-details-modal/severity-details-modal.html"*/'<!--\n  Generated template for the SeverityDetailsModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <!-- <ion-title> -->\n        <!-- <button class="BackButton"(click)="backArrow()"><img src="assets/images/arrow-black.svg"></button>\n      Medical Condition -->\n    <div class="top-bar clearfix">\n      <div class="pull-left">\n\n        <div>\n            <button class="BackButton"(click)="backArrow()"><img src="assets/images/arrow-black.svg"></button>\n            MEDICAL CONDITION\n          </div>\n      </div>\n    </div>\n  <!-- </ion-title> -->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="bg-black" >\n  <div class="player-section">\n      <div class="thumbImage image-sm">\n        <img *ngIf="AttendyDetails.photopath; else noImage" src={{global.PROFILEIMAGEURL}}{{AttendyDetails.photopath}} alt="" class="img-circle" onerror="this.onerror=null;this.src=\'assets/images/test-user.svg\';">\n        <ng-template #noImage>\n            <div class="img-circle">\n              <span class="img-text">\n                {{AttendyDetails.first_name[0]}} {{AttendyDetails.last_name[0]}} \n              </span>\n            </div>\n        </ng-template>\n      </div>\n      <div class="player-info mt-20">\n        <h4 class="info-item">\n          {{AttendyDetails.first_name}} {{AttendyDetails.last_name}}\n        </h4>\n        <p *ngIf="AttendyDetails.uniform_id != null && AttendyDetails.uniform_id.toString().length > 0">\n          #{{AttendyDetails.uniform_id}}\n        </p>\n      </div>\n    </div>\n    <div class="group-item" *ngIf="DisplayDetails.length>0 && !AttendyDetails.operooenabled">\n      <div class="bg-info clearfix">\n          <div class="sm-title pull-left">MEDICAL CONDITION</div>\n      </div>\n      <div padding *ngFor="let key of DisplayDetails">\n        <ion-label class="problemCard">{{key.medicalProblem}}</ion-label>\n        \n        <ion-label class="detailCard" *ngIf="key.details">\n          <br>{{key.details}}\n        </ion-label>\n        \n        <ion-label class="severityCard" *ngIf="key.severity">\n          <br>{{key.severity}}\n        </ion-label>\n        <br>\n      </div>\n    </div>\n      \n    <div class="group-item" *ngIf="MedicineInformation.length>0 && !AttendyDetails.operooenabled" style="margin-bottom: 60px;">\n      <div class="bg-info clearfix">\n          <div class="sm-title pull-left">MEDICINE INFORMATION</div>\n      </div>\n      <div *ngFor="let key of MedicineInformation">\n        <ion-label class="MedicineCard" >\n          <div class="col-xs-12 MedicineCard">\n              <div class="col-xs-7 medicineNameCard">\n                <span style="float: left">\n                    {{key.MedicineName}}\n                </span>\n                  \n              </div>\n                <div class="col-xs-2 pr-0 checkArrow-group" >\n                  <div class="col-xs-2 p-0 checkbox-col" >\n                    <div class="defaultCheckbox1" [class.PresentCheckbox1]="key.MedicineFlag==1" [class.AbsentCheckbox1]="key.MedicineFlag==0">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n          </div>\n          \n        </ion-label>\n        <br>\n      </div>\n    </div>\n    <div class="group-item" *ngIf="!AttendyDetails.operooenabled">\n      <div class="bg-info clearfix">\n          <div class="sm-title pull-left">MEDICAL ACTION PLAN</div>\n      </div>\n      <div class="event-card borrow">\n        <div class="well select-card plan-card player-medical2">\n            <div class="row">\n              <div class="col-xs-12">\n                <textarea *ngIf="AttendyDetails.medical_action_plan; else noMedicalActionPlan" class="sub-title player-med-title" [class.contentEditable]="editable">{{AttendyDetails.medical_action_plan}}</textarea>\n                <ng-template #noMedicalActionPlan><textarea class="sub-title player-med-title" [class.contentEditable]="editable" > No medical action plan recorded</textarea></ng-template>\n              </div>\n            </div>\n          </div>\n        </div>\n    </div>\n\n    <div class="group-item" *ngIf="AttendyDetails.operooenabled" style="margin-bottom: 60px;">\n      <div class="bg-info clearfix">\n          <div class="sm-title pull-left">MEDICAL PROFILE</div>\n      </div>\n      <div class="med-prof=item">\n        <ion-label class="MedicineCard" >\n          <div class="col-xs-12 MedicineCard">\n              <div class="col-xs-7 medicineNameCard">\n                <span style="float: left">\n                    Blood Group\n                </span>\n                  \n              </div>\n                <div class="col-xs-2 pr-0" >\n                  <span style="float: left">\n                    {{AttendyDetails.operoodata.bloodGroup | bloodGroup}}\n                </span>\n                </div>\n          </div>\n          \n        </ion-label>\n        <br>\n      </div>\n      <div class="med-prof=item">\n        <ion-label class="MedicineCard" >\n          <div class="col-xs-12 MedicineCard">\n              <div class="col-xs-7 medicineNameCard">\n                <span style="float: left">\n                    Wear Glasses\n                </span>\n                  \n              </div>\n                <div class="col-xs-2 pr-0 checkArrow-group" >\n                  <div class="col-xs-2 p-0 checkbox-col" >\n                    <div class="defaultCheckbox1" [class.PresentCheckbox1]="AttendyDetails.operoodata.wearsGlasses==1" [class.AbsentCheckbox1]="AttendyDetails.operoodata.wearsGlasses!=1">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n          </div>\n          \n        </ion-label>\n        <br>\n      </div>\n      <div class="med-prof=item">\n        <ion-label class="MedicineCard" >\n          <div class="col-xs-12 MedicineCard">\n              <div class="col-xs-7 medicineNameCard">\n                <span style="float: left">\n                    Wear Contacts\n                </span>\n                  \n              </div>\n                <div class="col-xs-2 pr-0 checkArrow-group" >\n                  <div class="col-xs-2 p-0 checkbox-col" >\n                    <div class="defaultCheckbox1" [class.PresentCheckbox1]="AttendyDetails.operoodata.WearsContacts==1" [class.AbsentCheckbox1]="AttendyDetails.operoodata.WearsContacts!=1">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n          </div>\n          \n        </ion-label>\n        <br>\n      </div>\n\n      <div class="med-prof=item">\n        <ion-label class="MedicineCard" >\n          <div class="col-xs-12 MedicineCard">\n              <div class="col-xs-7 medicineNameCard">\n                <span style="float: left">\n                    Swimming Ability\n                </span>\n                  \n              </div>\n                <div class="col-xs-2 pr-0" >\n                  <span style="float: left">\n                    {{AttendyDetails.operoodata.swimmingAbility | swimmingFilter}}\n                </span>\n                </div>\n          </div>\n          \n        </ion-label>\n        <br>\n      </div>\n\n      <div class="med-prof=item">\n        <ion-label class="MedicineCard" >\n          <div class="col-xs-12 MedicineCard">\n              <div class="col-xs-7 medicineNameCard">\n                <span style="float: left">\n                    Paracetamol Allowed\n                </span>\n                  \n              </div>\n                <div class="col-xs-2 pr-0 checkArrow-group" >\n                  <div class="col-xs-2 p-0 checkbox-col" >\n                    <div class="defaultCheckbox1" [class.PresentCheckbox1]="AttendyDetails.operoodata.paracetamolAllowed==1" [class.AbsentCheckbox1]="AttendyDetails.operoodata.paracetamolAllowed!=1">\n                    </div>\n                    <div class="checkbox"></div>\n                  </div>\n                </div>\n          </div>\n          \n        </ion-label>\n        <br>\n      </div>\n    </div>\n\n    <div class="group-item" *ngIf="AttendyDetails.operooenabled" style="margin-bottom: 60px;">\n      <div class="bg-info clearfix">\n          <div class="sm-title pull-left">SAFETY ALERTS</div>\n      </div>   \n\n      <div class="contactCard" *ngFor="let key of AttendyDetails.operoodata.safetyAlerts">\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Condition Name\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.condition}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Risk Level\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.riskLevel}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n        \n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Description\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.description}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Medication Required\n                </span>\n                  \n              </div>             \n              <div class="col-xs-2 pr-0 checkArrow-group" >\n                <div class="col-xs-2 p-0 checkbox-col" >\n                  <div class="defaultCheckbox1" [class.PresentCheckbox1]="key.medicationRequired==1" [class.AbsentCheckbox1]="key.medicationRequired!=1">\n                  </div>\n                  <div class="checkbox"></div>\n                </div>\n              </div>\n          </div>\n          \n        </div>\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Medication Details\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.medication}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Attachement\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span  style="color: #18674c"(click)="openAttachement(key.attachmentUrl)" *ngIf="key.attachmentUrl.length">View attchement</span>\n              </div>\n          </div>\n          \n        </div>\n      </div>\n      \n     \n    </div>\n\n    <div class="group-item" *ngIf="AttendyDetails.operooenabled" style="margin-bottom: 60px;">\n      <div class="bg-info clearfix">\n          <div class="sm-title pull-left">EMERGENCY CONTACT</div>\n      </div>\n      <div class="contactCard" *ngFor="let key of AttendyDetails.operoodata.emergencyContacts">\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Name\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.name}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Mobile Phone\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.mobilePhone}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n        \n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Home Phone\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.homePhone}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Work Phone\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.workPhone}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n        <div class="MedicineCard " >\n          <div class="col-xs-12 MedicineCard blue-font">\n              <div class="col-xs-5">\n                <span style="float: left">\n                    Email\n                </span>\n                  \n              </div>\n              <div class="col-xs-7 pr-0" >\n                <span >\n                  {{key.email}}\n              </span>\n              </div>\n          </div>\n          \n        </div>\n      </div>\n    </div>\n      \n  \n  \n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/severity-details-modal/severity-details-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */]])
    ], SeverityDetailsModalPage);
    return SeverityDetailsModalPage;
}());

//# sourceMappingURL=severity-details-modal.js.map

/***/ })

});
//# sourceMappingURL=19.js.map