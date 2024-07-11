webpackJsonp([79],{

/***/ 771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventAttendanceNotePageModule", function() { return EventAttendanceNotePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_attendance_note__ = __webpack_require__(875);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventAttendanceNotePageModule = /** @class */ (function () {
    function EventAttendanceNotePageModule() {
    }
    EventAttendanceNotePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_attendance_note__["a" /* EventAttendanceNotePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_attendance_note__["a" /* EventAttendanceNotePage */]),
            ],
        })
    ], EventAttendanceNotePageModule);
    return EventAttendanceNotePageModule;
}());

//# sourceMappingURL=event-attendance-note.module.js.map

/***/ }),

/***/ 875:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventAttendanceNotePage; });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






/**
 * Generated class for the EventAttendanceNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventAttendanceNotePage = /** @class */ (function () {
    function EventAttendanceNotePage(navCtrl, navParams, ViewCtrl, global, http, storage, plt, toastController, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ViewCtrl = ViewCtrl;
        this.global = global;
        this.http = http;
        this.storage = storage;
        this.plt = plt;
        this.toastController = toastController;
        this.global_api = global_api;
        plt.ready().then(function () {
            plt.registerBackButtonAction(function () {
                _this.close();
            });
        });
    }
    EventAttendanceNotePage.prototype.ionViewDidLoad = function () {
        this.eventId = this.navParams.get('eventId');
        this.personId = this.navParams.get('personId');
        this.note = this.navParams.get('note');
        this.event_notes = this.navParams.get('note');
    };
    EventAttendanceNotePage.prototype.send = function (remove) {
        var _this = this;
        if (remove === void 0) { remove = false; }
        if (!this.note.replace(/\s/g, '').length) {
            this.presentToastWithOptions('Empty Text Not Allowed');
        }
        else {
            if (remove) {
                this.note = '';
            }
            var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set('note', this.note)
                .set('eventId', this.eventId)
                .set('personId', this.personId);
            this.http.post(this.global.APIURL + "players/saveAttendanceNote", Data, { headers: this.global_api.getHeader() })
                .subscribe(function (data) {
                if (data.SUCCESS == true) {
                    var msg = remove ? 'Note Removed' : 'Note Updated';
                    _this.presentToastWithOptions(msg);
                    _this.ViewCtrl.dismiss(_this.note);
                }
                else {
                    _this.navCtrl.pop();
                    alert("Note cannot be submitted");
                }
            }, function (error) {
            });
        }
    };
    EventAttendanceNotePage.prototype.close = function () {
        this.ViewCtrl.dismiss();
    };
    EventAttendanceNotePage.prototype.presentToastWithOptions = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000,
                            position: 'top',
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventAttendanceNotePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-attendance-note',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-attendance-note/event-attendance-note.html"*/'<div class="background group-msg">\n    <div class="modal-content msg-send radius-10 backgroundColor">\n        <div class="modal-header">\n            <h4 class="modal-title text-center">Add Note</h4>\n        </div>\n        <div class="modal-body backgroundColor">\n            <textarea class="form-control msg-box" name="" id="" cols="30" rows="6" maxlength="250" [(ngModel)]="note"></textarea>\n        </div>\n        <div class="modal-footer">\n            <div class="row">\n                <div class="submit-link text-left" [class.col-xs-4]="event_notes != \'\'" [class.col-xs-6]="event_notes == \'\'">\n                    <button type="submit" class="btn backgroundColor" (click)="close()">Close</button>\n                </div>\n                <div class="submit-link col-xs-4 text-right" *ngIf="event_notes != \'\'">\n                    <button type="submit" class="btn backgroundColor" (click)="send(true)">Remove</button>\n                </div>\n                <div class="submit-link text-right" [class.col-xs-4]="event_notes != \'\'" [class.col-xs-6]="event_notes == \'\'">\n                    <button type="submit" class="btn backgroundColor" (click)="send()">Send</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-attendance-note/event-attendance-note.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventAttendanceNotePage);
    return EventAttendanceNotePage;
}());

//# sourceMappingURL=event-attendance-note.js.map

/***/ })

});
//# sourceMappingURL=79.js.map