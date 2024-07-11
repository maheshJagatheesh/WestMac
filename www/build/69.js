webpackJsonp([69],{

/***/ 784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventSessionPlanPageModule", function() { return EventSessionPlanPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_session_plan__ = __webpack_require__(887);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventSessionPlanPageModule = /** @class */ (function () {
    function EventSessionPlanPageModule() {
    }
    EventSessionPlanPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_session_plan__["a" /* EventSessionPlanPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_session_plan__["a" /* EventSessionPlanPage */]),
            ],
        })
    ], EventSessionPlanPageModule);
    return EventSessionPlanPageModule;
}());

//# sourceMappingURL=event-session-plan.module.js.map

/***/ }),

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventSessionPlanPage; });
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






var EventSessionPlanPage = /** @class */ (function () {
    function EventSessionPlanPage(navCtrl, navParams, storage, global, http, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.global_api = global_api;
    }
    EventSessionPlanPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            // this.UpcomingSingleEvent.event_id
            // console.log(JSON.parse(val))
        });
        this.getSessionPlan();
        console.log('ionViewDidLoad EventSessionPlanPage');
    };
    EventSessionPlanPage.prototype.getSessionPlan = function () {
        var _this = this;
        var PlanData = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.UpcomingSingleEvent.event_id);
        this.http.post(this.global.APIURL + "sessions/getSessionSegmentList", PlanData, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            console.log(data);
            _this.PlanDetail = data.GETSESSIONSEGMENTLIST;
        }, function (error) {
            console.log(error);
        });
    };
    EventSessionPlanPage.prototype.backArrow = function () {
        this.navCtrl.push('EventDashboardPage');
    };
    EventSessionPlanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-session-plan',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-session-plan/event-session-plan.html"*/'<!--\n  Generated template for the EventSessionPlanPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content class="bg-black borrowPlayer">\n    <section class="main mt-20">\n        <div class="top-bar" (click)="backArrow()">\n            <div class="col-xs-3">\n                <div class="backArrow inverse"></div>\n            </div>\n        </div>\n        <form action="" class="user-form">\n            <h5 class="sm-title text-left col-xs-12 mt-20">SESSION PLAN</h5>\n            <section class="profileFirst heightAuto">\n                <div class="event-card borrow">\n                    <div class="well cardBackground" *ngFor="let key of PlanDetail">\n                        <div class="row">\n                            <div class="col-xs-12">\n                                <h5 class="sub-title" *ngIf="PlanDetail">{{key.description}}</h5>\n                                <h5 class="sub-title" *ngIf="!PlanDetail">TO COME</h5>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </form>\n        <nav class="navbar navbar-default navbar-fixed-bottom">\n            <div class="container-fluid">\n                <ul class="nav navbar-nav">\n                    <li class="home"><a href="#">Home</a></li>\n                    <li class="events active"><a href="#">Events</a></li>\n                    <li class="players"><a href="#">Players</a></li>\n                    <li class="comment"><a href="#">Comments</a></li>\n                    <li class="more"><a href="#">More</a></li>\n                </ul>\n            </div>\n        </nav>\n    </section>\n    \n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-session-plan/event-session-plan.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventSessionPlanPage);
    return EventSessionPlanPage;
}());

//# sourceMappingURL=event-session-plan.js.map

/***/ })

});
//# sourceMappingURL=69.js.map