webpackJsonp([86],{

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseTeamPageModule", function() { return ChooseTeamPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choose_team__ = __webpack_require__(868);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChooseTeamPageModule = /** @class */ (function () {
    function ChooseTeamPageModule() {
    }
    ChooseTeamPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__choose_team__["a" /* ChooseTeamPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__choose_team__["a" /* ChooseTeamPage */]),
            ],
        })
    ], ChooseTeamPageModule);
    return ChooseTeamPageModule;
}());

//# sourceMappingURL=choose-team.module.js.map

/***/ }),

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseTeamPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__ = __webpack_require__(24);
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
 * Generated class for the ChooseTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChooseTeamPage = /** @class */ (function () {
    function ChooseTeamPage(navCtrl, navParams, formBuilder, http, storage, events, loadingCtrl, global, gFn, global_api) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.gFn = gFn;
        this.global_api = global_api;
        this.teams = [];
        this.bgThemeColor = '';
        this.clients = [];
        this.seasons = [];
        this.divisions = [];
        this.seasonNamesSchool = ['NA', 'Term 4', 'Term 1', 'Term 2', 'Term 3'];
        this.seasonNamesNonSchool = ['NA', 'Summer', 'Autumn', 'Winter', 'Spring'];
        this.divisionID = 0;
        this.siblings = [];
        this.lblSeason = "";
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.selectTeam = val.SELECTEDTEAM;
            _this.teamName = val.TEAM_NAME;
            _this.client_id = val.CLIENT_ID;
            _this.season_id = val.SEASON_ID;
            _this.IsParent = val.ISPARENT == 1;
            _this.IsPlayer = val.HAS_RECORD_IN_PLAYERHISTORY;
            _this.siblings = val.siblings;
            _this.loggedInUserPersonId = val.LOGGEDIN_USER_PERSON_ID;
            _this.backgroundThemeColor();
            gFn.hideFormAccessoryBar();
        });
        this.storage.get('SSODetails').then(function (val) {
            _this.ClubDetails = val;
            console.log(_this.ClubDetails);
        });
        this.chooseTeamForm = this.formBuilder.group({
            default: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]()
        });
        setTimeout(function () {
            if (_this.IsParent) {
                _this.changePerson($("#person").val());
            }
            else {
                _this.getClients(_this.loggedInUserData.PERSON_ID, '0');
            }
        }, 500);
    }
    ChooseTeamPage.prototype.backgroundThemeColor = function () {
        switch (this.loggedInUserData.THEME_BG) {
            case "green":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "blue":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "orange":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            case "pink":
                this.bgThemeColor = this.loggedInUserData.THEME_BG;
                break;
            default:
                this.bgThemeColor = "blue";
                break;
        }
    };
    ChooseTeamPage.prototype.goToChooseTeam = function (teamIdName) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var teamValue = teamIdName; // this.chooseTeamForm.value.team
        teamValue = teamValue.toString().split('::');
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('team_person_id', this.loggedInUserData.PERSON_ID)
            .set('club_division_id', teamValue[0])
            .set('team_name', teamValue[1])
            .set('client_id', this.client_id.toString());
        this.http.post(this.global.APIURL + 'teams/setActivatedTeamForHome', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS && response.SETACTIVATEDTEAMFORHOME) {
                var setActivatedTeam = _this.events.publish('json:query', response.SETACTIVATEDTEAMFORHOME)[0][0];
                console.log(setActivatedTeam);
                _this.storage.set('setActivatedTeam', JSON.stringify(setActivatedTeam));
                _this.selectTeam = teamValue[0];
                _this.loggedInUserData['SELECTEDTEAM'] = teamValue[0];
                _this.loggedInUserData['SEASON_ID'] = _this.season_id;
                _this.loggedInUserData['CLIENT_ID'] = _this.client_id;
                _this.loggedInUserData['DIVISION_ID'] = _this.divisionID;
                _this.loggedInUserData['TIMESHEETREVIEWER'] = (setActivatedTeam && _this.ClubDetails.SHOWTIMESHEETMENU == 1) ? setActivatedTeam.TIMESHEETREVIEWER : false;
                _this.loggedInUserData['ISCONTRACTOR'] = (setActivatedTeam && _this.ClubDetails.SHOWTIMESHEETMENU == 1) ? setActivatedTeam.ISCONTRACTOR : false;
                console.log(_this.loggedInUserData);
                _this.storage.set('loggedInUserData', _this.loggedInUserData);
            }
            else {
                alert('Error');
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    ChooseTeamPage.prototype.goToChooseHomeImage = function () {
        if (this.loggedInUserData.HOMESCREEN_BG != "") {
            this.navCtrl.push('SetToGoPage', {}, { animation: 'ios-transition' });
        }
        else {
            this.navCtrl.push('ChooseHomeImagePage', {}, { animation: 'ios-transition' });
        }
    };
    ChooseTeamPage.prototype.goToChooseHomeImageWithNoTeam = function () {
        this.loggedInUserData['SELECTEDTEAM'] = 0;
        this.loggedInUserData['SEASON_ID'] = 0;
        this.loggedInUserData['TEAM_ID'] = 0;
        this.loggedInUserData['DIVISION_ID'] = 0;
        this.loggedInUserData['TEAM_NAME'] = "";
        this.storage.set('loggedInUserData', this.loggedInUserData);
        var setActivatedTeam = { CLIENT_NAME: $('#client option:selected').text() };
        this.storage.set('setActivatedTeam', JSON.stringify(setActivatedTeam));
        this.goToChooseHomeImage();
    };
    ChooseTeamPage.prototype.getTeams = function (client_id, season_id, selectedTeam, divisionID) {
        var _this = this;
        this.teams = [];
        this.divisions = [];
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('client_id', client_id)
            .set('season_id', season_id)
            .set('selectedTeam', selectedTeam)
            .set('divisionID', divisionID);
        this.http.post(this.global.APIURL + 'teams/getTeamsByClientSeason', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                var teams = response.GETTEAMSBYCLIENTSEASON;
                var divisions = response.GETTEAMSBYDIVISION;
                for (var key in divisions) {
                    _this.divisions.push(divisions[key]);
                }
                _this.defaultSelected = false;
                for (var key in teams) {
                    _this.teams.push(teams[key]);
                    if (!_this.defaultSelected && _this.selectTeam == teams[key].club_division_id) {
                        _this.defaultSelected = true;
                    }
                }
                if (_this.defaultSelected) {
                    _this.goToChooseTeam(_this.loggedInUserData.SELECTEDTEAM + '::' + _this.loggedInUserData.TEAM_NAME);
                    _this.chooseTeamForm = _this.formBuilder.group({
                        team: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](_this.loggedInUserData.SELECTEDTEAM + '::' + _this.loggedInUserData.TEAM_NAME, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required)
                    });
                }
                else if (teams.length) {
                    _this.goToChooseTeam(teams[0].club_division_id + '::' + teams[0].team_name);
                    _this.chooseTeamForm = _this.formBuilder.group({
                        team: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](teams[0].club_division_id + '::' + teams[0].team_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required)
                    });
                }
            }
            else {
                alert('Sorry no matching result found');
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    ChooseTeamPage.prototype.changePerson = function (person_id) {
        this.loggedInUserData.PERSON_ID = person_id;
        if (person_id == this.loggedInUserPersonId) {
            this.loggedInUserData.FIRST_NAME = this.loggedInUserData.LOGGEDIN_USER_FIRST_NAME;
            this.loggedInUserData.LAST_NAME = this.loggedInUserData.LOGGEDIN_USER_LAST_NAME;
            this.loggedInUserData.PHOTOPATH = this.loggedInUserData.LOGGEDIN_USER_PHOTOPATH;
            this.loggedInUserData.BARCODEIMAGE = this.loggedInUserData.LOGGEDIN_USER_BARCODEIMAGE;
        }
        else {
            for (var i = 0; i < this.siblings.length; i++) {
                if (person_id == this.siblings[i].person_id) {
                    this.loggedInUserData.FIRST_NAME = this.siblings[i].first_name;
                    this.loggedInUserData.LAST_NAME = this.siblings[i].last_name;
                    this.loggedInUserData.PHOTOPATH = this.siblings[i].photopath;
                    this.loggedInUserData.BARCODEIMAGE = this.siblings[i].barcodeImage;
                    break;
                }
            }
        }
        this.storage.set('loggedInUserData', this.loggedInUserData);
        this.getClients(person_id, '0');
    };
    ChooseTeamPage.prototype.getClients = function (person_id, client_id) {
        var _this = this;
        this.clients = [];
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', person_id)
            .set('client_id', client_id);
        this.http.post(this.global.APIURL + 'teams/getClientsByPerson', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.SUCCESS) {
                var clients = response.GETCLIENTSBYPERSON;
                for (var key in clients) {
                    _this.clients.push(clients[key]);
                }
                if (_this.IsParent && client_id == 0 && clients.length > 0) {
                    _this.client_id = clients[0].client_id;
                }
                _this.getSeasons((client_id == 0) ? _this.client_id : client_id, null, (client_id == 0) ? true : false);
            }
        }, function (error) {
        });
    };
    ChooseTeamPage.prototype.getSeasons = function (client_id, season_id, isFirst) {
        var _this = this;
        season_id = season_id || this.loggedInUserData.SEASON_ID;
        this.fixSeasonsNames(client_id);
        this.seasons = [];
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('season_id', season_id)
            .set('client_id', client_id)
            .set('clientsport', this.loggedInUserData.CLIENTSPORT)
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('selectedTeam', this.selectTeam);
        this.http.post(this.global.APIURL + 'teams/getSeasonsByClient', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            if (response.SUCCESS) {
                var seasons = response.GETSEASONSBYCLIENT;
                var currentseason = seasons.filter(function (value, index) { return value.currentseason == 1; });
                var season_id_1 = (currentseason.length) ? currentseason[0].season_id : seasons[seasons.length - 1].season_id;
                _this.season_id = (isFirst && !_this.IsParent) ? _this.loggedInUserData.SEASON_ID : season_id_1;
                _this.getTeams(client_id, _this.season_id, _this.selectTeam, 0);
                for (var key in seasons) {
                    if (seasons[key].season_id != 0) {
                        _this.seasons.push(seasons[key]);
                    }
                }
            }
        }, function (error) {
        });
    };
    ChooseTeamPage.prototype.changeClient = function (client_id) {
        this.client_id = client_id;
        this.getSeasons(this.client_id, this.season_id, false);
    };
    ChooseTeamPage.prototype.fixSeasonsNames = function (client_id) {
        this.seasonNames = this.seasonNamesNonSchool;
        for (var i = 0; i < this.clients.length; i++) {
            if (this.clients[i].client_id == client_id) {
                this.seasonNames = (this.clients[i].is_school == 1) ? this.seasonNamesSchool : this.seasonNamesNonSchool;
                this.lblSeason = (this.clients[i].is_school == 1) ? "Term" : "Season";
                break;
            }
        }
    };
    ChooseTeamPage.prototype.changeSeason = function (season_id) {
        this.season_id = season_id;
        this.getTeams(this.client_id, this.season_id, this.selectTeam, 0);
    };
    ChooseTeamPage.prototype.changeDivision = function (divisionID) {
        this.divisionID = divisionID;
        this.getTeams(this.client_id, this.season_id, this.selectTeam, divisionID);
    };
    ChooseTeamPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-choose-team',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-team/choose-team.html"*/'<ion-content class="bg-gradient {{bgThemeColor}}">\n  <div class="bg-gradient {{bgThemeColor}}">\n    <section class="main">\n      <form action="" class="user-form profile" [formGroup]="chooseTeamForm">\n        <section class="profileFirst">\n          <div class="form-group">\n            <label class="mb-10">WHICH TEAM DO YOU <br> WANT TO SEE TODAY?</label>\n          </div>\n          <div class="form-group mb-30">\n            <div class="row" *ngIf="IsParent">\n              <div class="col-xs-612 pl-0">\n                <label for="client">Team for:</label>\n                <select class="form-control" id="person" (change)="changePerson($event.target.value)">\n                  <option [value]="" *ngIf="">Self</ption>\n                  <option *ngFor="let siblingIsPlayerlooggedInUserPersonId of siblings" [value]="sibling.person_id" [selected]="person_id==sibling.person_id">{{sibling.first_name}}\n                    {{sibling.last_name}}</option>\n                </select>\n              </div>\n            </div>\n            <div class="row">\n              <div class="col-xs-6 pl-0">\n                <label for="client">League</label>\n                <select class="form-control" id="client" (change)="changeClient($event.target.value)" [disabled]="clients.length==0">\n                  <option *ngFor="let client of clients" [value]="client.client_id" [selected]="client_id==client.client_id">{{client.client_name}}</option>\n                </select>\n              </div>\n              <div class="col-xs-6 pl-0">\n                <label for="season">{{lblSeason}}</label>\n                <select class="form-control" id="season" (change)="changeSeason($event.target.value)" [disabled]="seasons.length==0">\n                  <ng-container *ngFor="let season of seasons">\n                    <option *ngIf="season.season_id" [value]="season.season_id" [selected]="season_id==season.season_id">\n                      {{seasonNames[season.period]}} {{season.year}}\n                    </option>\n                  </ng-container>\n                </select>\n              </div>\n              <div class="col-xs-6 pl-0">\n                <label for="client">Division</label>\n                <select class="form-control" id="" (change)="changeDivision($event.target.value)">\n                  <option [value]="0" [selected]="">All</option>\n                  <ng-container *ngFor="let division of divisions">\n                    <option *ngIf="division.division_id" [value]="division.division_id" [selected]="divisionID==division.division_id">\n                      {{division.division_name}}\n                    </option>\n                  </ng-container>\n                </select>\n              </div>\n            </div>\n          </div>\n          <div class="divider"></div>\n          <div class="form-group mt-sm" *ngFor="let team of teams; let i = index;">\n            <div class="radio clearfix">\n              <div class="leftWrap">\n                  <input type="radio" value="{{team.club_division_id}}::{{team.team_name}}" name="team" formControlName="team"\n                  [checked]="((defaultSelected && team.club_division_id==selectTeam) || (!defaultSelected && i == 0))" (click)="goToChooseTeam(team.club_division_id + \'::\' + team.team_name)">\n\n                  <label class="sub-title textBlack fontBold">\n                    {{team.client_name}}\n                  </label>\n                  <div class="infoWrap">\n                    <h6 class="inverseText fontBold">{{team.division_name}}</h6>\n                    <h6 class="inverseText fontBold">{{team.team_name}}</h6>\n                  </div>\n                </div>\n                <div class="rightWrap" [class.active]="((defaultSelected && team.club_division_id==selectTeam) || (!defaultSelected && i == 0))" *ngIf="teams.length">\n                  <button type="button" class="login-circle xs" (click)="goToChooseHomeImage()"></button>\n                </div>\n              </div>\n          </div>\n          <div class="form-group mt-sm info-item" *ngIf="teams.length == 0">\n            If you do not see the team you believe you should have access to, please contact the Sports department so we can update your access.\n          </div>\n          <div class="form-group mt-30">\n            <div class="info-item">You can come back here and change the team you are viewing at any time by using the\n              menu button at the top of your screen</div>\n          </div>\n          <div class="sign-up-left mt-30" *ngIf="teams.length==0">\n            <button type="button" class="login-circle xs" (click)="goToChooseHomeImageWithNoTeam()"></button>\n          </div>\n        </section>\n      </form>\n    </section>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/choose-team/choose-team.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], ChooseTeamPage);
    return ChooseTeamPage;
}());

//# sourceMappingURL=choose-team.js.map

/***/ })

});
//# sourceMappingURL=86.js.map