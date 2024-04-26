webpackJsonp([16],{

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartgameDashboardPageModule", function() { return StartgameDashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__startgame_dashboard__ = __webpack_require__(940);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StartgameDashboardPageModule = /** @class */ (function () {
    function StartgameDashboardPageModule() {
    }
    StartgameDashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__startgame_dashboard__["a" /* StartgameDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__startgame_dashboard__["a" /* StartgameDashboardPage */]),
            ],
        })
    ], StartgameDashboardPageModule);
    return StartgameDashboardPageModule;
}());

//# sourceMappingURL=startgame-dashboard.module.js.map

/***/ }),

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartgameDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__ = __webpack_require__(34);
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
 * Generated class for the StartgameDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StartgameDashboardPage = /** @class */ (function () {
    function StartgameDashboardPage(navCtrl, navParams, gFn) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gFn = gFn;
    }
    StartgameDashboardPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad StartgameDashboardPage');
    };
    StartgameDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-startgame-dashboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/startgame-dashboard/startgame-dashboard.html"*/'<!--\n  Generated template for the StartgameDashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar class="main">\n\n    <div class="top-bar clearfix">\n        <div class="pull-left">\n            <div >Events</div>\n        </div>\n        <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n            <a href="javascript:void(0);" class="next"></a>\n            <a href="javascript:void(0);" class="prev"></a>\n        </div>\n    </div>\n  </ion-navbar>\n  <ul class="nav navbar-nav top-menu">\n      <li class=""><a href="#">Attendance</a></li>\n      <li class=""><a href="#">Welfare</a></li>\n      <li class="active"><a href="#">Stats</a></li>\n      <li class=""><a href="#">Results</a></li>\n  </ul>\n\n</ion-header>\n\n\n<ion-content class="bg-black event">\n    <section class="main">\n\n        <form action="" class="user-form player-item pt-0">\n            <section class="profileFirst heightAuto xs-padding">\n                <div class="play_time text-blue text-center">\n                    <h3 class="timeOption">00:00</h3>\n                    <div class="network"><img src="images/network-signal.png" alt=""></div>\n                    <div class="play-icon">\n                        <i class="fa fa-play" aria-hidden="true"></i>\n                    </div>\n                </div>\n                <h4 class="info-item text-center inverseText">GAME vs TRINITY GRAMMAR</h4>\n                <div class="bookmark-line"></div>\n                <h6 class="text-info inverseText mt-30">ACTIVE</h6>\n                <h1 class="xl-info inverseText">12</h1>\n            </section>\n\n            <div class="event-card bg-gray">\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="assets/images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="well select-card">\n                    <div class="row">\n                        <div class="card-img col-xs-2 p-0">\n                            <span class="progressCircle"><img src="images/test-user.svg" alt="" class="img-circle"></span>\n                        </div>\n                        <div class="card-title col-xs-6 p-0">ANDREW WILLIS <p>#01</p></div>\n                        <div class="play-start col-xs-2 p-0">00:00</div>\n                        <div class="col-xs-2 p-0">\n                            <div class="play">\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n\n    </section>\n\n\n    <script src="js/jquery.min.js"></script>\n    <script src="js/bootstrap.min.js"></script>\n    <script src="js/owl.carousel.min.js"></script>\n\n    <script type="text/javascript">\n        function changeState(el) {\n            if (el.readOnly) el.checked=el.readOnly=false;\n            else if (!el.checked) el.readOnly=el.indeterminate=true;\n        }\n        $(document).ready(function(){\n            $(".collapsed-arrow").click(function(){\n                $(".dropdown-menu").toggle();\n                $(".collapsed-arrow").toggleClass("Down");\n            });\n        });\n    </script>\n\n</ion-content>\n<ion-footer>\n    <nav class="navbar navbar-default navbar-fixed-bottom">\n        <div class="container-fluid">\n            <ul class="nav navbar-nav">\n                <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n                <li class="events active" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n                <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n                <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n                <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n            </ul>\n        </div>\n    </nav>\n\n</ion-footer>\n\n\n\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/startgame-dashboard/startgame-dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */]])
    ], StartgameDashboardPage);
    return StartgameDashboardPage;
}());

//# sourceMappingURL=startgame-dashboard.js.map

/***/ })

});
//# sourceMappingURL=16.js.map