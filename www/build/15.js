webpackJsonp([15],{

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyPageModule", function() { return SurveyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__survey__ = __webpack_require__(941);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SurveyPageModule = /** @class */ (function () {
    function SurveyPageModule() {
    }
    SurveyPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__survey__["a" /* SurveyPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__survey__["a" /* SurveyPage */]),
            ],
        })
    ], SurveyPageModule);
    return SurveyPageModule;
}());

//# sourceMappingURL=survey.module.js.map

/***/ }),

/***/ 941:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SurveyPage = /** @class */ (function () {
    function SurveyPage(navCtrl, loadingCtrl, navParams, global, events, http, storage, modalCtrl, gFn, global_api) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.global = global;
        this.events = events;
        this.http = http;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.gFn = gFn;
        this.global_api = global_api;
        this.personId = 27443; //default value
        this.clientId = 46; //default value
        this.clubDivisionId = 1456; //default value
        this.surveyId = 1; //default value
        this.eventId = 20; //default value
        this.surveyQuestionList = [];
        this.surveyAnswerList = [];
        this.alreadySaved = true;
        this.eventDetails = [];
        this.surveyData = [];
        this.saveSurveyQuestionDetails = [[], [], []];
        this.questionType = "";
        this.surveyForm = {};
        this.tempArray = [];
        this.surveyAns = [];
        this.surveyTextForm = {};
        this.surveyArray = [];
        this.surveyArray1 = [];
        this.rangeArray = [];
        this.gFn.hideMenuIcon();
        this.PhotoApiUrl = this.global.PROFILEIMAGEURL;
        var surveyId = navParams.get("surveyId");
        if (surveyId) {
            this.surveyId = parseInt(surveyId);
        }
        var eventId = navParams.get("eventId");
        if (eventId) {
            this.eventId = parseInt(eventId);
        }
        var clientId = navParams.get("clientId");
        if (clientId) {
            this.clientId = parseInt(clientId);
        }
        var clubDivisionId = navParams.get("clubDivisionId");
        if (clubDivisionId) {
            this.clubDivisionId = parseInt(clubDivisionId);
        }
        var personId = navParams.get("personId");
        if (personId) {
            this.personId = parseInt(personId);
        }
    }
    SurveyPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('FunctionAccess').then(function (val) {
            _this.FunctionAccess = val;
        });
        this.storage.get('loggedInUserData').then(function (val) {
            _this.personDetail = val;
            var loader = _this.loadingCtrl.create({});
            loader.present();
            loader.dismiss();
        });
        this.getsurveyquestion();
        this.gFn.hideFormAccessoryBar(false);
    };
    SurveyPage.prototype.ionViewWillLeave = function () {
        this.gFn.showMenuIcon();
    };
    SurveyPage.prototype.getsurveyquestion = function () {
        var _this = this;
        var loginData4 = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('surveyId', this.surveyId.toString())
            .set('eventId', this.eventId.toString())
            .set('personId', this.personId.toString())
            .set('clientId', this.clientId.toString())
            .set('clubDivisionId', this.clubDivisionId.toString());
        this.http.post(this.global.APIURL + "players/getSurveyQuestion", loginData4, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            _this.eventDetails = data.EVENTINFO;
            _this.surveyData = data.SURVEYQUESTION;
            var alreadySaved = false;
            for (var key in _this.surveyData) {
                _this.questionType = _this.surveyData[key].QUESTIONTYPE;
                _this.surveyQuestionList.push(_this.surveyData[key]);
                _this.saveSurveyQuestionDetails[0].push(_this.surveyData[key].SURVEYQUESTIONID);
                _this.saveSurveyQuestionDetails[1].push(_this.surveyData[key].SCALEFROM);
                _this.saveSurveyQuestionDetails[2].push(_this.surveyData[key].ANSWERVALUE);
                if (_this.surveyData[key].ANSWERVALUE != "") {
                    alreadySaved = true;
                }
            }
            _this.alreadySaved = alreadySaved;
            if (alreadySaved) {
                jQuery(".already-filled-text").show();
            }
        }, function (error) {
        });
    };
    SurveyPage.prototype.rangeChange = function (index, surveyAns) {
        this.surveyAnswerList[index] = surveyAns;
    };
    SurveyPage.prototype.selectBox = function (index, surveyAns) {
        this.surveyAnswerList[index] = surveyAns;
    };
    SurveyPage.prototype.textChange = function (index, surveyAns) {
        this.surveyAnswerList[index] = surveyAns;
    };
    SurveyPage.prototype.yesNoType = function (index, surveyAns) {
        if (surveyAns) {
            this.surveyAnswerList[index] = 1;
        }
        else {
            this.surveyAnswerList[index] = 0;
        }
        console.log(this.surveyAnswerList[index]);
    };
    SurveyPage.prototype.save = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        loader.present();
        var answerValues = [];
        var surveyQuesIds = [];
        for (var key in this.surveyData) {
            surveyQuesIds.push(this.surveyData[key].SURVEYQUESTIONID);
            if (typeof this.surveyAnswerList[key] !== "undefined") {
                answerValues.push(this.surveyAnswerList[key]);
                console.log(this.surveyAnswerList[key]);
            }
            else {
                switch (this.surveyData[key].QUESTIONTYPE) {
                    case 0:
                        answerValues.push(this.surveyData[key].SCALEFROM);
                        break;
                    case 1:
                        answerValues.push(this.surveyData[key].OPTIONLIST[0].SURVEYOPTIONID);
                        break;
                    case 2:
                        answerValues.push("");
                        break;
                    case 3:
                        answerValues.push("1");
                        break;
                }
            }
        }
        var data = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
            .set('surveyId', this.surveyId.toString())
            .set('eventId', this.eventId.toString())
            .set('personId', this.personId.toString())
            .set('clientId', this.clientId.toString())
            .set('clubDivisionId', this.clubDivisionId.toString())
            .set('questionIds', JSON.stringify(surveyQuesIds))
            .set('answerValues', JSON.stringify(answerValues));
        this.http.post(this.global.APIURL + "players/saveSurvey", data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            _this.alreadySaved = true;
            loader.dismiss();
        }, function (error) {
            loader.dismiss();
        });
    };
    SurveyPage.prototype.backArrow = function () {
        this.gFn.showMenuIcon();
        this.navCtrl.pop();
    };
    SurveyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-survey',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/survey/survey.html"*/'<ion-header mode="md">\n    <ion-navbar>\n        <div class="top-bar" (click)="backArrow()">\n            <div class="inverse"> SURVEY</div>\n        </div>\n    </ion-navbar>\n</ion-header>\n<ion-content class="bg-black">\n    <section class="main mt-20">\n        \n        <form action="" class="user-form event-player">\n            <section class="profileFirst heightAuto">\n                <div class="date_Option text-blue text-center">\n                    <span>TODAY AT 12:00 PM</span>\n                </div>\n                <h4 class="info-item text-center inverseText">GAME VS TRINITY GRAMMAR</h4>\n                <div class="divider inverse"></div>\n                <div class="info-item already-filled-text">You have already filled the survey</div> \n                <div class="group-item" *ngFor="let key of surveyQuestionList;let i=index" >\n                    <div class="info-content surveySlider" *ngIf="key.QUESTIONTYPE == \'0\' " >\n                        <div  >\n                            <h4 class="sm-title">{{key.QUESTION}}</h4>\n                            <div class="range-slider">\n                                <div  class="fixed-right"> <span class="text-blue" *ngIf="saveSurveyQuestionDetails[2][i] == \'\'; then minValue else actualValue"></span> / {{key.OPTIONLIST.length}}</div>\n                                <ng-template #minValue>{{saveSurveyQuestionDetails[1][i]}}</ng-template>\n                                <ng-template #actualValue>{{saveSurveyQuestionDetails[2][i]}}</ng-template>\n                                <ion-range [disabled]="alreadySaved" min="1" max="{{key.OPTIONLIST.length}}" (ngModelChange)="rangeChange(i,$event)" step="1" debounce="5000" [(ngModel)]="saveSurveyQuestionDetails[2][i]" [ngModelOptions]="{standalone: true}" color="primary"> </ion-range>\n                                <div class="slider-value">\n                                    <div *ngIf="saveSurveyQuestionDetails[2][i] == \'\'; then minValue else actualValue"></div>\n                                </div>\n                                <div id="range" style="width:100%;"></div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="info-content heightAuto"  *ngIf="key.QUESTIONTYPE == 2">\n                        <h4 class="sm-title">{{key.QUESTION}}</h4>\n                        <div class="form-group">\n                            <input type="text" name="txtType" [disabled]="alreadySaved" value="{{surveyData[i].ANSWERVALUE}}" [(ngModel)]="saveSurveyQuestionDetails[2][i]" class="form-control" (ngModelChange)="textChange(i,$event)">\n                        </div>\n                    </div>\n\n                    <div class="info-content heightAuto" *ngIf="key.QUESTIONTYPE == 1">\n                        <h4 class="sm-title">{{key.QUESTION}}</h4>\n                        <div class="form-group">\n                            <select name="selectType" [disabled]="alreadySaved" [(ngModel)]="saveSurveyQuestionDetails[2][i]" (ngModelChange)="selectBox(i,saveSurveyQuestionDetails[2][i])"  class="form-control select-box">\n                                <option value="{{data.OPTIONVALUE}}" *ngFor="let data of key.OPTIONLIST;let k=index;">{{data.OPTIONVALUE}}</option> \n                            </select>\n                        </div>\n                    </div>\n\n                    <div class="info-content heightAuto" *ngIf="key.QUESTIONTYPE == 3">\n                        <ion-item class="surveyRadio" mode="ios">\n                            <ion-label><h4 class="sm-title">{{key.QUESTION}}</h4></ion-label>\n                            <ion-toggle [(ngModel)]="saveSurveyQuestionDetails[2][i]" [ngModelOptions]="{standalone: true}" (ionChange)="yesNoType(i,$event.checked)" checked="false" [disabled]="alreadySaved"></ion-toggle>\n                        </ion-item>\n                    </div>\n                </div>\n                <!-- <div class="group-item" >\n                        \n                </div>\n                <div class="group-item">\n                   \n                </div>  -->                \n                <div class="btn-section" *ngIf="!alreadySaved">\n                    <button type="submit" class="btn btn-rounded" (click)="save()">SAVE</button>\n                </div>\n            </section>\n        </form>\n    </section>\n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/survey/survey.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], SurveyPage);
    return SurveyPage;
}());

//# sourceMappingURL=survey.js.map

/***/ })

});
//# sourceMappingURL=15.js.map