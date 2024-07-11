webpackJsonp([0],{

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventGroupMessagePageModule", function() { return EventGroupMessagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_group_message__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng4_click_outside__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng4_click_outside___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng4_click_outside__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EventGroupMessagePageModule = /** @class */ (function () {
    function EventGroupMessagePageModule() {
    }
    EventGroupMessagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_group_message__["a" /* EventGroupMessagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_group_message__["a" /* EventGroupMessagePage */]),
                __WEBPACK_IMPORTED_MODULE_3_ng4_click_outside__["ClickOutsideModule"]
            ],
        })
    ], EventGroupMessagePageModule);
    return EventGroupMessagePageModule;
}());

//# sourceMappingURL=event-group-message.module.js.map

/***/ }),

/***/ 858:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(45);
var ClickOutsideDirective = /** @class */ (function () {
    function ClickOutsideDirective(_el, platformId) {
        this._el = _el;
        this.platformId = platformId;
        this.attachOutsideOnClick = false;
        this.delayClickOutsideInit = false;
        this.exclude = '';
        this.excludeBeforeClick = false;
        this.clickOutsideEvents = '';
        this.clickOutside = new core_1.EventEmitter();
        this._nodesExcluded = [];
        this._events = ['click'];
        this._initOnClickBody = this._initOnClickBody.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
    }
    ClickOutsideDirective.prototype.ngOnInit = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            this._init();
        }
    };
    ClickOutsideDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (this.attachOutsideOnClick) {
                this._events.forEach(function (e) { return _this._el.nativeElement.removeEventListener(e, _this._initOnClickBody); });
            }
            this._events.forEach(function (e) { return document.body.removeEventListener(e, _this._onClickBody); });
        }
    };
    ClickOutsideDirective.prototype.ngOnChanges = function (changes) {
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (changes['attachOutsideOnClick'] || changes['exclude']) {
                this._init();
            }
        }
    };
    ClickOutsideDirective.prototype._init = function () {
        var _this = this;
        if (this.clickOutsideEvents !== '') {
            this._events = this.clickOutsideEvents.split(' ');
        }
        this._excludeCheck();
        if (this.attachOutsideOnClick) {
            this._events.forEach(function (e) { return _this._el.nativeElement.addEventListener(e, _this._initOnClickBody); });
        }
        else {
            this._initOnClickBody();
        }
    };
    ClickOutsideDirective.prototype._initOnClickBody = function () {
        if (this.delayClickOutsideInit) {
            setTimeout(this._initClickListeners.bind(this));
        }
        else {
            this._initClickListeners();
        }
    };
    ClickOutsideDirective.prototype._initClickListeners = function () {
        var _this = this;
        this._events.forEach(function (e) { return document.body.addEventListener(e, _this._onClickBody); });
    };
    ClickOutsideDirective.prototype._excludeCheck = function () {
        if (this.exclude) {
            try {
                var nodes = Array.from(document.querySelectorAll(this.exclude));
                if (nodes) {
                    this._nodesExcluded = nodes;
                }
            }
            catch (err) {
                console.error('[ng-click-outside] Check your exclude selector syntax.', err);
            }
        }
    };
    ClickOutsideDirective.prototype._onClickBody = function (ev) {
        var _this = this;
        if (this.excludeBeforeClick) {
            this._excludeCheck();
        }
        if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
            this.clickOutside.emit(ev);
            if (this.attachOutsideOnClick) {
                this._events.forEach(function (e) { return document.body.removeEventListener(e, _this._onClickBody); });
            }
        }
    };
    ClickOutsideDirective.prototype._shouldExclude = function (target) {
        for (var _i = 0, _a = this._nodesExcluded; _i < _a.length; _i++) {
            var excludedNode = _a[_i];
            if (excludedNode.contains(target)) {
                return true;
            }
        }
        return false;
    };
    ClickOutsideDirective.decorators = [
        { type: core_1.Injectable },
        { type: core_1.Directive, args: [{ selector: '[clickOutside]' },] },
    ];
    /** @nocollapse */
    ClickOutsideDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: Object, decorators: [{ type: core_1.Inject, args: [core_1.PLATFORM_ID,] },] },
    ]; };
    ClickOutsideDirective.propDecorators = {
        'attachOutsideOnClick': [{ type: core_1.Input },],
        'delayClickOutsideInit': [{ type: core_1.Input },],
        'exclude': [{ type: core_1.Input },],
        'excludeBeforeClick': [{ type: core_1.Input },],
        'clickOutsideEvents': [{ type: core_1.Input },],
        'clickOutside': [{ type: core_1.Output },],
    };
    return ClickOutsideDirective;
}());
exports.ClickOutsideDirective = ClickOutsideDirective;


/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventGroupMessagePage; });
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
 * Generated class for the EventGroupMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventGroupMessagePage = /** @class */ (function () {
    // onClickedOutside(e: Events) {
    // }
    function EventGroupMessagePage(navCtrl, navParams, modalCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.DupeventAttendLen = this.navParams.get('Array');
        // console.log(this.DupeventAttendLen)
    }
    // close(){
    //   // this.navCtrl.pop();
    //   this.viewCtrl.dismiss()
    // }
    EventGroupMessagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventGroupMessagePage');
    };
    EventGroupMessagePage.prototype.yes = function () {
        this.navCtrl.pop();
        var GroupMessageModal2 = this.modalCtrl.create('EventGroupMessageTextPage', { state: this.State });
        GroupMessageModal2.present();
    };
    EventGroupMessagePage.prototype.selectState = function (SelectedState, event) {
        console.log(event.target);
        $(event.target).closest('.list-group').find('.circle-group').removeClass('active');
        // $(event.target).find('.circle-group').addClass('active')
        // $(event.target).closest('.modal-body').find('.NoResponse').removeClass('active')
        // $(event.target).closest('.modal-body').find('.NotGoing').removeClass('active')
        // $(event.target).closest('.modal-body').find('.MayBe').removeClass('active')
        this.State = SelectedState;
        console.log(this.State);
        $(event.target).closest('.list-group-item').find('.circle-group').addClass('active');
    };
    EventGroupMessagePage.prototype.backArrow = function () {
        this.navCtrl.pop();
    };
    EventGroupMessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-group-message',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-group-message/event-group-message.html"*/'<div >\n    <div class="background group-msg" >\n            <!-- (clickOutside)="close()" -->\n        <div class="modal-content radius-20 backgroundColor">\n            <div class="modal-header">\n                <h4 class="modal-title text-center">Group Message</h4>\n                <p class="header-title text-center">Do you want to send a group message to:</p>\n            </div>\n            <div class="modal-body ">\n                <ul class="list-group msg-item">\n                    <li class="list-group-item">\n                        <a href="javascript:void(0)"><span class="circle-group Going" (click)="selectState(1,$event)"><i class="material-icons">add</i></span> {{DupeventAttendLen[0]}} Going</a>\n                    </li>\n                    <li class="list-group-item">\n                        <a href="javascript:void(0)"><span class="circle-group NoResponse" (click)="selectState(3,$event)"><i class="material-icons">add</i></span> {{DupeventAttendLen[2]}} No response</a>\n                    </li>\n                    <li class="list-group-item">\n                        <a href="javascript:void(0)"><span class="circle-group NotGoing" (click)="selectState(2,$event)"><i class="material-icons">add</i></span> {{DupeventAttendLen[1]}} Not going</a>\n                    </li>\n                    <li class="list-group-item">\n                        <a href="javascript:void(0)"><span class="circle-group MayBe" (click)="selectState(4,$event)"><i class="material-icons">add</i></span> {{DupeventAttendLen[3]}} Maybe</a>\n                    </li>\n                </ul>\n            </div>\n            <div class="modal-footer">\n                <div class="row">\n                    <div class="submit-link col-xs-6 text-center border-rt" (click)="backArrow()">\n                        <button type="submit" class="btn">No</button>\n                    </div>\n                    <div class="submit-link col-xs-6 text-center" (click)="yes()">\n                        <button type="submit" class="btn">Yes</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-group-message/event-group-message.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
    ], EventGroupMessagePage);
    return EventGroupMessagePage;
}());

//# sourceMappingURL=event-group-message.js.map

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var click_outside_directive_1 = __webpack_require__(858);
exports.ClickOutsideDirective = click_outside_directive_1.ClickOutsideDirective;
var click_outside_module_1 = __webpack_require__(884);
exports.ClickOutsideModule = click_outside_module_1.ClickOutsideModule;


/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var click_outside_directive_1 = __webpack_require__(858);
var ClickOutsideModule = /** @class */ (function () {
    function ClickOutsideModule() {
    }
    ClickOutsideModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [click_outside_directive_1.ClickOutsideDirective],
                    exports: [click_outside_directive_1.ClickOutsideDirective]
                },] },
    ];
    /** @nocollapse */
    ClickOutsideModule.ctorParameters = function () { return []; };
    return ClickOutsideModule;
}());
exports.ClickOutsideModule = ClickOutsideModule;


/***/ })

});
//# sourceMappingURL=0.js.map