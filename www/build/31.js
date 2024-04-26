webpackJsonp([31],{

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatedPerceivedPageModule", function() { return RatedPerceivedPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rated_perceived__ = __webpack_require__(926);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RatedPerceivedPageModule = /** @class */ (function () {
    function RatedPerceivedPageModule() {
    }
    RatedPerceivedPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rated_perceived__["a" /* RatedPerceivedPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rated_perceived__["a" /* RatedPerceivedPage */]),
            ],
        })
    ], RatedPerceivedPageModule);
    return RatedPerceivedPageModule;
}());

//# sourceMappingURL=rated-perceived.module.js.map

/***/ }),

/***/ 926:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatedPerceivedPage; });
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
 * Generated class for the RatedPerceivedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RatedPerceivedPage = /** @class */ (function () {
    function RatedPerceivedPage(navCtrl, navParams, gFn) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gFn = gFn;
        this.id = navParams.get('id');
    }
    RatedPerceivedPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad RatedPerceivedPage');
    };
    RatedPerceivedPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    RatedPerceivedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-rated-perceived',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/rated-perceived/rated-perceived.html"*/'\n<ion-content class="bg-black">\n        <div class="fixed-top_ modal-close">\n                <!-- <img src="assets/images/close-white.png" alt="" data-dismiss="modal"> -->\n                <div class="rotate-text pwrotate-text-white" (click)="close()">\n                    <span class="close_" data-dismiss="modal">CLOSE\n                        <ion-icon name="close" class="close_-button"></ion-icon>\n                    </span>\n                </div>\n         </div>\n    <div >\n        <div class="modal-content modalView" *ngIf="id==\'RPE\'">\n            <div class="modal-header shadow">\n                <h5 class="modal-title fontBold text-center">RATED PERCEIVED EXERTION (RPE)</h5>\n            </div>\n            <div class="modal-body">\n                <p>\n                    Monitoring training load is a very useful tool for coaches, physiotherapy staff and players alike. Many methods are already employed to monitor external load, such as distance, resistance, time and intensity. Internal load is a measure of the physiological response to these external stimuli and can be interpreted through measures including heart rate, lactate response or perceptual measures. Perceptual measures, such as RPE, are the simplest and easiest of tools available to coaches and physio staff to gauge a players stress levels and thus understand the impact of their training methods. Rate of perceived exertion (RPE) is a validated and proven method of monitoring the internal load inflicted upon a subject in response to stimuli, in this case, how hard did the player think the training session or game was? We will use RPE BORG 10 scale, with 10 being the hardest perceived level of effort, and 1 being minimal or the absence of stress. Implementation At the end of the session or game, players will be required to rate their session or game on a standard Borg CR10 RPE scale as per the diagram. Players must do this privately and Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean placerat. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Etiam commodo dui eget wisi. Fusce nibh. Integer pellentesque quam vel velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Cras elementum. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Vivamus luctus egestas leo. Suspendisse nisl. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Quisque porta. Nullam eget nisl. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Pellentesque arcu. Duis risus. In enim a arcu imperdiet malesuada. Phasellus rhoncus. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Integer in sapien. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Fusce tellus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. In rutrum. Morbi scelerisque luctus velit. Pellentesque arcu. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Aliquam in lorem sit amet leo accumsan lacinia. Donec quis nibh at felis congue commodo. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Nam quis nulla. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Duis risus. Nunc tincidunt ante vitae massa. Nulla pulvinar eleifend sem. Ut tempus purus at lorem. Mauris metus. Praesent dapibus. Integer imperdiet lectus quis justo. Suspendisse nisl. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Fusce aliquam vestibulum ipsum. Quisque tincidunt scelerisque libero. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Maecenas lorem. Et harum quidem rerum facilis est et expedita distinctio. Integer in sapien. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Vivamus ac leo pretium faucibus. Maecenas sollicitudin. Maecenas lorem. Nam sed tellus id magna elementum tincidunt. Aenean placerat. Nullam dapibus fermentum ipsum. Donec vitae arcu. Praesent id justo in neque elementum ultrices. Ut tempus purus at lorem. Aliquam id dolor. Et harum quidem rerum facilis est et expedita distinctio. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Mauris tincidunt sem sed arcu. Fusce wisi. Integer lacinia. Fusce consectetuer risus a nunc. Aliquam erat volutpat. Aliquam erat volutpat. Donec quis nibh at felis congue commodo. Pellentesque arcu. Nullam rhoncus aliquam metus. Nulla pulvinar eleifend sem. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Phasellus faucibus molestie nisl. Integer in sapien. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Phasellus rhoncus. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Sed ac dolor sit amet purus malesuada congue. Aliquam erat volutpat. Curabitur bibendum justo non orci. Integer vulputate sem a nibh rutrum consequat. Nulla non arcu lacinia neque faucibus fringilla.\n                </p>\n            </div>\n            <div class="modal-footer"></div>\n        </div>\n\n        <div class="modal-content modalView" *ngIf="id==\'Muscle\'">\n                <div class="modal-header shadow">\n                    <h5 class="modal-title fontBold text-center">MUSCLE SORENESS</h5>\n                </div>\n                <div class="modal-body">\n                    <p>\n                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean placerat. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Etiam commodo dui eget wisi. Fusce nibh. Integer pellentesque quam vel velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Cras elementum. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Vivamus luctus egestas leo. Suspendisse nisl. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Quisque porta. Nullam eget nisl. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Pellentesque arcu. Duis risus. In enim a arcu imperdiet malesuada. Phasellus rhoncus. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Integer in sapien. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Fusce tellus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. In rutrum. Morbi scelerisque luctus velit. Pellentesque arcu. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Aliquam in lorem sit amet leo accumsan lacinia. Donec quis nibh at felis congue commodo. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Nam quis nulla. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Duis risus. Nunc tincidunt ante vitae massa. Nulla pulvinar eleifend sem. Ut tempus purus at lorem. Mauris metus. Praesent dapibus. Integer imperdiet lectus quis justo. Suspendisse nisl. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Fusce aliquam vestibulum ipsum. Quisque tincidunt scelerisque libero. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Maecenas lorem. Et harum quidem rerum facilis est et expedita distinctio. Integer in sapien. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Vivamus ac leo pretium faucibus. Maecenas sollicitudin. Maecenas lorem. Nam sed tellus id magna elementum tincidunt. Aenean placerat. Nullam dapibus fermentum ipsum. Donec vitae arcu. Praesent id justo in neque elementum ultrices. Ut tempus purus at lorem. Aliquam id dolor. Et harum quidem rerum facilis est et expedita distinctio. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Mauris tincidunt sem sed arcu. Fusce wisi. Integer lacinia. Fusce consectetuer risus a nunc. Aliquam erat volutpat. Aliquam erat volutpat. Donec quis nibh at felis congue commodo. Pellentesque arcu. Nullam rhoncus aliquam metus. Nulla pulvinar eleifend sem. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Phasellus faucibus molestie nisl. Integer in sapien. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Phasellus rhoncus. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Sed ac dolor sit amet purus malesuada congue. Aliquam erat volutpat. Curabitur bibendum justo non orci. Integer vulputate sem a nibh rutrum consequat. Nulla non arcu lacinia neque faucibus fringilla.\n                    </p>\n                </div>\n                <div class="modal-footer"></div>\n            </div>\n    </div>\n\n\n</ion-content>\n<ion-footer>\n        <nav class="navbar navbar-default navbar-fixed-bottom">\n                <div class="container-fluid">\n                  <ul class="nav navbar-nav">\n                    <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n                    <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n                    <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n                    <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n                    <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n                  </ul>\n                </div>\n              </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/rated-perceived/rated-perceived.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */]])
    ], RatedPerceivedPage);
    return RatedPerceivedPage;
}());

//# sourceMappingURL=rated-perceived.js.map

/***/ })

});
//# sourceMappingURL=31.js.map