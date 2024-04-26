webpackJsonp([32],{

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PregameRollcallPageModule", function() { return PregameRollcallPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pregame_rollcall__ = __webpack_require__(925);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PregameRollcallPageModule = /** @class */ (function () {
    function PregameRollcallPageModule() {
    }
    PregameRollcallPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__pregame_rollcall__["a" /* PregameRollcallPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pregame_rollcall__["a" /* PregameRollcallPage */]),
            ],
        })
    ], PregameRollcallPageModule);
    return PregameRollcallPageModule;
}());

//# sourceMappingURL=pregame-rollcall.module.js.map

/***/ }),

/***/ 925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PregameRollcallPage; });
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
 * Generated class for the PregameRollcallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PregameRollcallPage = /** @class */ (function () {
    function PregameRollcallPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PregameRollcallPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PregameRollcallPage');
    };
    PregameRollcallPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pregame-rollcall',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/pregame-rollcall/pregame-rollcall.html"*/'<ion-content class="bg-black">\n    <section class="main mt-20">\n        <div class="transport-header clearfix">\n          <div class="top-bar col-xs-8" (click)="backArrow()">\n                  <div class="backArrow inverse inverseText backbtnText">PREGAME ROLLCALL</div>\n          </div>\n          <div class="col-xs-4 text-right">\n                <label class="select">\n                    <select name="" id="" class="form-control custom-select">\n                        <option value="bus1">Bus 1</option>\n                        <option value="bus1">Bus 1</option>\n                    </select>\n                </label>\n          </div>\n        </div>\n        <form action="" class="user-form" id="searchForm" >\n            <div class="navbar-search">\n                <div class="row">\n                    <div class="bardcode col-xs-2 p-0">\n                    <img src="assets/images/transport/barcode-qr.svg" alt="">\n                    </div>\n                    <div class="search-bar col-xs-7 p-0">\n                        <div class="input-wrap">\n                            <input type="text" class="form-control search-input" placeholder="Search" name="srch-term" id="srch-term">\n                        </div>\n                    </div>\n                    <div class="col-xs-3 p-0">\n                        <div class="counter">\n                            <span>0/32</span>\n                            <img class="filteList" src="assets/images/transport/filter_list.svg" alt="">\n                        </div>\n                \n                    </div>\n                </div>\n            </div>\n            <div class="navbar navbar-default event-menu mt-20">\n                <ul class="nav navbar-nav">\n                    <li class="active"><a class="" href="javascript:void(0)">ALL</a></li>\n                    <li class=""><a class="" href="javascript:void(0)">UNCHECKED</a></li>\n                    <li class=""><a class="" href="javascript:void(0)">SCRATCHED</a></li>\n                </ul>\n            </div>\n            \n            <h5 class="sm-title text-left col-xs-12">Pre-rollcall status:</h5>\n            <div class="option-group col-xs-12">\n                <ul class="list-group">\n                    <li class="list-group-item text-left clearfix"> On Time\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="OnTime" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li>\n                    <li class="list-group-item text-left clearfix"> 5 min late\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="late" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li> \n                    <li class="list-group-item text-left clearfix"> Absent\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="Absent" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li> \n                    <li class="list-group-item text-left clearfix"> Lorem Ipsum\n                            <span class="custom-radio">\n                                <div class="radio clearfix">\n                                    <input type="radio" value="" name="">\n                                    <label></label>\n                                </div>\n                            </span>\n                        </li> \n                </ul>\n            </div>\n            <h5 class="sm-title text-left col-xs-12">Last tagged in:</h5>\n            <div class="option-group col-xs-12">\n                <ul class="list-group">\n                    <li class="list-group-item text-left clearfix"> Bus 1\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="OnTime" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li>\n                    <li class="list-group-item text-left clearfix"> Bus 2\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="late" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li> \n                    <li class="list-group-item text-left clearfix"> Bus 2\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="Absent" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li> \n                    <li class="list-group-item text-left clearfix"> Bus 2\n                            <span class="custom-radio">\n                                <div class="radio clearfix">\n                                    <input type="radio" value="" name="">\n                                    <label></label>\n                                </div>\n                            </span>\n                        </li> \n                </ul>\n            </div>\n            <h5 class="sm-title text-left col-xs-12">Last tagged by:</h5>\n            <div class="option-group col-xs-12">\n                <ul class="list-group">\n                    <li class="list-group-item text-left clearfix"> Antoine Declef\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="OnTime" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li>\n                    <li class="list-group-item text-left clearfix"> Anthony Labib\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="late" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li> \n                    <li class="list-group-item text-left clearfix"> JR\n                        <span class="custom-radio">\n                            <div class="radio">\n                                <input type="radio" value="Absent" name="">\n                                <label></label>\n                            </div>\n                        </span>\n                    </li> \n                    <li class="list-group-item text-left clearfix"> Todd Wheatland\n                            <span class="custom-radio">\n                                <div class="radio clearfix">\n                                    <input type="radio" value="" name="">\n                                    <label></label>\n                                </div>\n                            </span>\n                        </li> \n                </ul>\n            </div>\n           \n        </form>\n        </section>\n        \n  </ion-content>\n  \n  '/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/pregame-rollcall/pregame-rollcall.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], PregameRollcallPage);
    return PregameRollcallPage;
}());

//# sourceMappingURL=pregame-rollcall.js.map

/***/ })

});
//# sourceMappingURL=32.js.map