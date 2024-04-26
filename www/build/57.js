webpackJsonp([57],{

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameboardPageModule", function() { return GameboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameboard__ = __webpack_require__(900);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GameboardPageModule = /** @class */ (function () {
    function GameboardPageModule() {
    }
    GameboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__gameboard__["a" /* GameboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__gameboard__["a" /* GameboardPage */]),
            ],
        })
    ], GameboardPageModule);
    return GameboardPageModule;
}());

//# sourceMappingURL=gameboard.module.js.map

/***/ }),

/***/ 900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameboardPage; });
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



var GameboardPage = /** @class */ (function () {
    function GameboardPage(navCtrl, navParams, gFn) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gFn = gFn;
    }
    GameboardPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad GameboardPage');
    };
    GameboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-gameboard',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gameboard/gameboard.html"*/'<!--\n  Generated template for the GameboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n<ion-navbar class="main">\n\n      <div class="top-bar clearfix">\n          <div class="pull-left">\n              <div >Events</div>\n          </div>\n          <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n              <a href="javascript:void(0);" class="next"></a>\n          </div>\n      </div>\n    </ion-navbar>\n      <ul class="nav navbar-nav top-menu">\n          <li class=""><a href="#">Attendance</a></li>\n          <li class=""><a href="#">Welfare</a></li>\n          <li class="active"><a href="#">Stats</a></li>\n          <li class=""><a href="#">Results</a></li>\n      </ul>\n\n</ion-header>\n\n\n<ion-content class="bg-black">\n        <section class="main">\n                <!-- <nav class="navbar navbar-fixed-top">\n                    <div class="top-bar clearfix">\n                        <div class="pull-left">\n                            <div class="backArrow info-item">Envents</div>\n                        </div>\n                        <div class="prev-next pull-right">\n                            <a href="#" class="next"><img src="images/next.png" alt=""></a>\n                            <a href="#" class="prev"><img src="images/prev.png" alt=""></a>\n                        </div>\n                    </div>\n                    <ul class="nav navbar-nav top-menu">\n                        <li class=""><a href="#">Attendance</a></li>\n                        <li class=""><a href="#">Welfare</a></li>\n                        <li class="active"><a href="#">Stats</a></li>\n                        <li class=""><a href="#">Results</a></li>\n                    </ul>\n                </nav> -->\n                <form action="" class="user-form profile">\n                    <section class="profileFirst heightAuto">\n                        <div class="form-group">\n                            <h5 class="info-item">WEDNESDAY 28 NOVEMBER, 2018</h5>\n                        </div>\n\n                        <div class="form-group mt-xl">\n                                <div class="title">Hi Tom,<br> welcome to Barkers<br> Juniors, Division 1,<br> Basketball Junior League</div>\n                        </div>\n\n                        <div class="option-item mt-30">\n                                <div class="row">\n                                    <div class="well col-xs-6">\n                                        <label>NEXT EVENT</label>\n                                    </div>\n                                    <div class="well col-xs-6">\n                                        <label>PLAYER CONTACT</label>\n                                    </div>\n                                </div>\n                                <div class="row">\n                                    <div class="well col-xs-6">\n                                        <label>NEXT EVENT</label>\n                                    </div>\n                                    <div class="well col-xs-6">\n                                        <label>PLAYER CONTACT</label>\n                                    </div>\n                                </div>\n                                <div class="row">\n                                    <div class="well in col-xs-6">\n                                        <label>GALLERY</label>\n                                    </div>\n                                    <div class="well col-xs-6">\n                                        <label>LEADERBOARD</label>\n                                    </div>\n                                </div>\n                        </div>\n                    </section>\n                </form>\n\n            </section>\n\n            <!-- Modal -->\n            <div id="myModal" class="modal fade play-item" role="dialog">\n                <div class="modal-dialog">\n\n                    <!-- Modal content-->\n                    <div class="modal-content">\n                        <div class="modal-header shadow">\n                            <h4 class="modal-title fontBold text-center">ARCHER WORTHINGTON</h4>\n                            <h4 class="modal-title fontBold text-center">#12</h4>\n                        </div>\n                        <div class="modal-body">\n                            <ul class="list-group play-list">\n                                <li class="list-group-item clearfix">\n                                    <label>-</label> Set Piece\n                                    <span class="pull-right plus"></span>\n                                    <span class="pull-right minus"></span>\n                                </li>\n                                <li class="list-group-item clearfix">\n                                    <label>1</label> Assist\n                                    <span class="pull-right plus"></span>\n                                    <span class="pull-right minus"></span>\n                                </li>\n                                <li class="list-group-item clearfix">\n                                    <label>2</label> Goal\n                                    <span class="pull-right plus"></span>\n                                    <span class="pull-right minus"></span>\n                                </li>\n                                <li class="list-group-item clearfix">\n                                    <label>-</label> Save\n                                    <span class="pull-right plus"></span>\n                                    <span class="pull-right minus"></span>\n                                </li>\n\n                                <li class="list-group-item alert clearfix">\n                                    <label>2</label> Foul\n                                    <span class="pull-right plus red"></span>\n                                    <span class="pull-right minus"></span>\n                                </li>\n                                <li class="list-group-item alert clearfix">\n                                    <label>1</label> Yellow\n                                    <span class="pull-right plus red"></span>\n                                    <span class="pull-right minus"></span>\n                                </li>\n                                <li class="list-group-item alert clearfix">\n                                    <label>-</label> Red\n                                    <span class="pull-right plus red"></span>\n                                    <span class="pull-right minus"></span>\n                                </li>\n                            </ul>\n                            <div class="player-option shadow">\n                                <div class="row">\n                                    <div class="col-xs-10">\n                                        <h4 class="text-blue">Play time <span class="time">45:00</span></h4>\n                                    </div>\n                                    <div class="arrow-down col-xs-2">\n                                        <i class="fa fa-chevron-down" aria-hidden="true"></i>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="modal-footer"></div>\n                    </div>\n\n                </div>\n            </div>\n\n            <script src="js/jquery.min.js"></script>\n            <script src="js/bootstrap.min.js"></script>\n            <script src="js/owl.carousel.min.js"></script>\n\n            <script type="text/javascript">\n                $(\'.owl-carousel\').owlCarousel({\n                    loop:true,\n                    margin:5,\n                    nav:false,\n                    items:1,\n                });\n                $(window).on(\'load\',function(){\n                    $(\'#myModal\').modal(\'show\');\n                });\n            </script>\n\n</ion-content>\n<ion-footer>\n        <nav class="navbar navbar-default navbar-fixed-bottom">\n                <div class="container-fluid">\n                    <ul class="nav navbar-nav">\n                        <li class="home active" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n                        <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n                        <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n                        <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n                        <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n                    </ul>\n                </div>\n            </nav>\n\n</ion-footer>\n\n\n\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gameboard/gameboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */]])
    ], GameboardPage);
    return GameboardPage;
}());

//# sourceMappingURL=gameboard.js.map

/***/ })

});
//# sourceMappingURL=57.js.map