webpackJsonp([52],{

/***/ 803:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjuryIncidentReportPageModule", function() { return InjuryIncidentReportPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__injury_incident_report__ = __webpack_require__(906);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InjuryIncidentReportPageModule = /** @class */ (function () {
    function InjuryIncidentReportPageModule() {
    }
    InjuryIncidentReportPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__injury_incident_report__["a" /* InjuryIncidentReportPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__injury_incident_report__["a" /* InjuryIncidentReportPage */]),
            ],
        })
    ], InjuryIncidentReportPageModule);
    return InjuryIncidentReportPageModule;
}());

//# sourceMappingURL=injury-incident-report.module.js.map

/***/ }),

/***/ 906:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InjuryIncidentReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__ = __webpack_require__(65);
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};








var InjuryIncidentReportPage = /** @class */ (function () {
    function InjuryIncidentReportPage(navCtrl, navParams, global, modalCtrl, http, storage, platform, loadingCtrl, events, keyboard, statusBar, gFn, global_api, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.storage = storage;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.keyboard = keyboard;
        this.statusBar = statusBar;
        this.gFn = gFn;
        this.global_api = global_api;
        this.toastCtrl = toastCtrl;
        this.GETINCIDENT = [];
        this.InjuryArray = [];
        this.OccuredatClub = [];
        this.CausedbyCollision = [];
        this.RecurrentInjury = [];
        this.CollisionReason = "";
        this.RecurrentOption = "";
        this.incident_area_ids = [];
        this.incident_area_datas = [];
        this.incident = 0;
        this.incidentactivity = "";
        this.incident_time = "";
        this.incidentwitnesses = "";
        this.followuptreatment = "";
        this.relativeInformed = 0;
        this.dropdownValues = [];
        this.InjurySelectedValues = [];
        this.InjuryCauseArray = [];
        this.incident_otherarea_ids = [];
        this.incident_otherarea_text = [];
        this.myCallbackFunction = function (_params) {
            return new Promise(function (resolve, reject) {
                var data = _params;
                // this.incident_area_ids = [];
                // this.incident_area_datas = [];
                _this.InjuryArray[data.index].status = __spreadArrays(data.updatedStatus);
                console.log('updated Injury Array', _this.InjuryArray);
                var selectedobj = JSON.parse(data.injuryselectedValues);
                _this.showAndhideIncident(selectedobj);
                var area_ids = selectedobj.area_id;
                var area_datas = selectedobj.area_data;
                // var other_area_ids = selectedobj.other_area_id;
                // var other_area_text = selectedobj.other_area_text;
                _this.incident_area_ids = [];
                var areaId = _this.InjuryArray.map(function (element) {
                    return element.status.filter(function (data) { return !data.specify && data.status; });
                });
                areaId.forEach(function (data) {
                    data.forEach(function (element) {
                        _this.incident_area_ids.push(element.id);
                        //this.incident_otherarea_text.push(element.specifyValue);
                    });
                });
                _this.incident_area_datas = [];
                var incident_area_dataObj = _this.InjuryArray.map(function (element) {
                    return element.status.filter(function (data) { return !data.specify && data.status; });
                });
                incident_area_dataObj.forEach(function (data) {
                    data.forEach(function (element) {
                        _this.incident_area_datas.push(true);
                    });
                });
                _this.incident_otherarea_ids = [];
                _this.incident_otherarea_text = [];
                var otherarea = _this.InjuryArray.map(function (element) {
                    return element.status.filter(function (data) { return data.specify && data.status; });
                });
                otherarea.forEach(function (data) {
                    data.forEach(function (element) {
                        _this.incident_otherarea_ids.push(element.id);
                        _this.incident_otherarea_text.push(element.specifyValue);
                    });
                });
                console.log('otherareaaa', otherarea);
                console.log('otherareaaaid', _this.incident_otherarea_ids);
                _this.dropdownValues = JSON.parse(data.dropdownValues);
                // if (selectedobj.value.length > 0) {
                var updatedData = _this.replaceIfExists(_this.InjuryCauseArray, selectedobj);
                _this.InjuryCauseArray = updatedData;
                _this.compareSelectedValues(_this.InjuryCauseArray, _this.InjuryArray);
                //}
                _this.refreshSelectedItems();
                resolve(true);
            });
        };
        this.gFn.hideMenuIcon();
        gFn.hideFormAccessoryBar();
        platform.registerBackButtonAction(function () {
            _this.close();
        });
    }
    InjuryIncidentReportPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.statusBar.hide();
        this.storage.get("FunctionAccess").then(function (val) {
            _this.FunctionAccess = val;
        });
        if (this.navParams.get("injured_person_id") &&
            this.navParams.get("event_id")) {
            this.injured_person_id = this.navParams.get("injured_person_id");
            this.eventId = this.navParams.get("event_id");
            this.incident_id = this.navParams.get("incident_id");
            this.seasonId = this.navParams.get("season_id");
            this.injurySaveButton = false;
            this.storage.get("loggedInUserData").then(function (val) {
                _this.PersonData = val;
                var loader = _this.loadingCtrl.create({});
                loader.present();
                _this.getIncidentReport().then(function (z) {
                    if (z) {
                        _this.occuredAtClub().then(function (x) {
                            // if (x) {
                            //   this.causedByCollision().then((y) => {
                            //     if (y) {
                            //       this.recurrentInjury();
                            //       loader.dismiss();
                            //     }
                            //   });
                            // }
                            loader.dismiss();
                        });
                    }
                });
            });
        }
        else {
            this.injured_person_id = this.navParams.get("injured_person_id");
            this.incident_id = this.navParams.get("incident_id");
            this.seasonId = this.navParams.get("season_id");
            this.injurySaveButton = true;
            this.storage.get("UpcomingSingleEvent").then(function (val) {
                _this.UpcomingSingleEvent = JSON.parse(val);
                _this.eventId = _this.UpcomingSingleEvent.event_id;
                _this.storage.get("loggedInUserData").then(function (val) {
                    _this.PersonData = val;
                    var loader = _this.loadingCtrl.create({});
                    loader.present();
                    _this.getIncidentReport().then(function (z) {
                        if (z) {
                            _this.occuredAtClub().then(function (x) {
                                // if (x) {
                                //   this.causedByCollision().then((y) => {
                                //     if (y) {
                                //       this.recurrentInjury();
                                //       loader.dismiss();
                                //     }
                                //   });
                                // }
                                loader.dismiss();
                            });
                        }
                    });
                });
            });
        }
        console.log("incidentiddd", this.incident_id);
    };
    InjuryIncidentReportPage.prototype.ionViewDidLeave = function () {
        if (this.FunctionAccess.event_Injury == "self") {
            this.gFn.showMenuIcon();
        }
    };
    InjuryIncidentReportPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    InjuryIncidentReportPage.prototype.parentsCalled = function (relativeInformed) {
        if (this.FunctionAccess.user_adminLevel != 4) {
            if (relativeInformed == 0) {
                this.relativeInformed = 1;
            }
            else if (relativeInformed == 1) {
                this.relativeInformed = 0;
            }
        }
    };
    InjuryIncidentReportPage.prototype.gotoSelectDropView = function (Data, resultarray, group_id, index) {
        this.navCtrl.push("InjuryCausePage", {
            Data: Data,
            group_id: group_id,
            SELECTEDTEAM: this.PersonData.SELECTEDTEAM,
            incident_id: this.incident_id,
            injured_person_id: this.injured_person_id,
            incident_area_ids: JSON.stringify(resultarray.area_id),
            incident_area_datas: JSON.stringify(resultarray.area_data),
            dropdownValues: JSON.stringify(resultarray.status),
            resultarray: JSON.stringify(resultarray),
            msgstatus: JSON.stringify(resultarray.msg_status),
            selectedValues: JSON.stringify(this.InjuryCauseArray),
            index: index,
            callback: this.myCallbackFunction,
        });
        setTimeout(function () {
            console.log("resultarray", resultarray);
            console.log("msggg", resultarray.msg_status);
        }, 2000);
    };
    InjuryIncidentReportPage.prototype.refreshSelectedItems = function () {
        this.InjuryArray = this.updateSelectedStatus(this.InjuryArray);
    };
    InjuryIncidentReportPage.prototype.getIncidentReport = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("clientTimeZone", _this.PersonData.CLIENTTIMEZONE)
                .set("selectedTeam", _this.PersonData.SELECTEDTEAM)
                .set('person_id', _this.injured_person_id)
                //.set("person_id", "175584")
                .set("event_id", _this.UpcomingSingleEvent.event_id)
                .set("client_id", _this.PersonData.CLIENT_ID)
                .set("club_id", _this.PersonData.CLUB_ID)
                .set("incident_id", _this.incident_id)
                .set("incident_group_ids", "25,26,27,28,29,30,31,32,33");
            _this.http
                .post(_this.global.APIURL + "incidents/getIncidentReport", data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (response) {
                var groupId6 = { groupId: 6, count: response[6] + response[7] };
                var groupId8 = { groupId: 8, count: response[8] };
                var groupId11 = { groupId: 11, count: response[11] };
                var groupId14 = { groupId: 14, count: response[14] };
                var groupId15 = { groupId: 15, count: response[15] };
                var groupId16 = { groupId: 16, count: response[16] };
                _this.dropdownValues.push(groupId6);
                _this.dropdownValues.push(groupId8);
                _this.dropdownValues.push(groupId11);
                _this.dropdownValues.push(groupId14);
                _this.dropdownValues.push(groupId15);
                _this.dropdownValues.push(groupId16);
                _this.GETPERSONDETAILS = response.GETPERSONDETAILS;
                _this.GETINCIDENT.push(response.GETINCIDENT);
                _this.followuptreatment = _this.GETINCIDENT[0].followuptreatment;
                _this.incidentactivity = _this.GETINCIDENT[0].incidentactivity;
                _this.incidentwitnesses = _this.GETINCIDENT[0].incidentwitnesses;
                _this.incident = _this.GETINCIDENT[0].injury_status;
                _this.relativeInformed = _this.GETINCIDENT[0].relativeInformed;
                _this.incident_time = _this.GETINCIDENT[0].incident_time;
                resolve(true);
            }, function (error) {
                resolve(false);
                alert("Data not found or Connection issue.");
            });
        });
    };
    InjuryIncidentReportPage.prototype.RecordInjury = function () {
        // if (this.CollisionReason != "") {
        //   for (var key in this.CausedbyCollision) {
        //     if (
        //       this.CausedbyCollision[key]["INCIDENT_AREA_ID"] !=
        //       this.CausedbyCollision[this.CollisionReason]["INCIDENT_AREA_ID"]
        //     ) {
        //       var collision_Areaid =
        //         this.CausedbyCollision[key]["INCIDENT_AREA_ID"];
        //       var collision_AreaData: any = 1;
        //       this.AddIncidentId(collision_Areaid, collision_AreaData);
        //     }
        //   }
        //   var collision_Areaid =
        //     this.CausedbyCollision[this.CollisionReason]["INCIDENT_AREA_ID"];
        //   var collision_AreaData =
        //     this.CausedbyCollision[this.CollisionReason]["AREA_DATA"];
        //   this.AddIncidentId(collision_Areaid, collision_AreaData);
        // }
        // if (this.RecurrentOption != "") {
        //   for (var key in this.RecurrentInjury) {
        //     if (
        //       this.RecurrentInjury[key]["INCIDENT_AREA_ID"] !=
        //       this.RecurrentInjury[this.RecurrentOption]["INCIDENT_AREA_ID"]
        //     ) {
        //       var Recurrent_Areaid = this.RecurrentInjury[key]["INCIDENT_AREA_ID"];
        //       var Recurrent_AreaData: any = 1;
        //       this.AddIncidentId(Recurrent_Areaid, Recurrent_AreaData);
        //     }
        //   }
        //   var Recurrent_Areaid =
        //     this.RecurrentInjury[this.RecurrentOption]["INCIDENT_AREA_ID"];
        //   var Recurrent_AreaData =
        //     this.RecurrentInjury[this.RecurrentOption]["AREA_DATA"];
        //   this.AddIncidentId(Recurrent_Areaid, Recurrent_AreaData);
        // }
        var _this = this;
        var selectedTeam = this.PersonData.SELECTEDTEAM;
        if (this.UpcomingSingleEvent.event_type_id == 2 &&
            this.UpcomingSingleEvent.teamid) {
            selectedTeam = this.UpcomingSingleEvent.teamid;
        }
        else if (this.UpcomingSingleEvent.event_type_id == 1) {
            if (this.UpcomingSingleEvent.homeclubid == this.PersonData.CLUB_ID) {
                selectedTeam = this.UpcomingSingleEvent.hometeam;
            }
            else {
                selectedTeam = this.UpcomingSingleEvent.awayteam;
            }
        }
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set("person_id", this.injured_person_id)
            .set("event_id", this.eventId)
            .set("incident_id", this.incident_id)
            .set("incidentactivity", this.incidentactivity)
            .set("incident_time", this.incident_time)
            .set("incidentlocation", this.GETINCIDENT[0].incidentlocation)
            .set("relativeInformed", this.relativeInformed)
            .set("incidentwitnesses", this.incidentwitnesses)
            .set("incidentdescription", this.GETINCIDENT[0].incidentdescription)
            .set("followuptreatment", this.followuptreatment)
            .set("incident_area_ids", JSON.stringify(this.incident_area_ids))
            .set("incident_area_datas", JSON.stringify(this.incident_area_datas))
            .set("incident_other_area_ids", JSON.stringify(this.incident_otherarea_ids))
            // .set("incident_other_texts", JSON.stringify(this.incident_otherarea_text))
            .set("incident_other_texts", JSON.stringify(this.incident_otherarea_text))
            .set("client_id", this.UpcomingSingleEvent.client_id)
            .set("selectedTeam", selectedTeam)
            .set("season_id", this.seasonId)
            .set("injury_status", this.incident);
        console.log('api param', data);
        this.http
            .post(this.global.APIURL + "incidents/saveIncidentData", data, {
            headers: this.global_api.getHeader(),
        })
            .subscribe(function (response) {
            if (response.SUCCESS == true) {
                //this.navCtrl.push('EventDashboardPage')
                var toast = _this.toastCtrl.create({
                    message: "Saved Successfully",
                    duration: 3000,
                    position: "top",
                    cssClass: "toast-success",
                });
                toast.present();
                _this.gFn.gotoHome();
            }
            else {
                alert("Record cannot be update");
            }
        }, function (error) { });
    };
    InjuryIncidentReportPage.prototype.occuredAtClub = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                // .set("incident_group_id", "13")
                // .set("incident_id", this.incident_id)
                // .set("selectedTeam", this.PersonData.SELECTEDTEAM);
                .set("incident_group_id", "0")
                .set("incident_id", _this.incident_id)
                .set("selectedTeam", _this.PersonData.SELECTEDTEAM)
                .set("club_id", _this.PersonData.CLUB_ID);
            _this.http
                .post(_this.global.APIURL + "incidents/getIncidentAreas", data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (response) {
                var Data = _this.events.publish("json:query", response.GETINCIDENTAREAS)[0][0];
                _this.filterDatas(response.GETINCIDENTAREAS.DATA);
                _this.OccuredatClub.push(Data);
                resolve(true);
            }, function (error) { });
        });
    };
    InjuryIncidentReportPage.prototype.filterDatas = function (DATA) {
        var _this = this;
        var dataArray = DATA;
        dataArray.forEach(function (item) {
            var key = item[1];
            var value = item[2];
            var area_id = item[3];
            var area_data = item[4];
            var area_specify = item[7];
            var area_msg = item[11];
            var status = _this.mergeValues(item[2], item[4], area_id, area_specify, item[11]);
            var indextrue = _this.InjuryArray.findIndex(function (obj) {
                return obj.key ===
                    "Concussion - Have you followed the GPS Sport Specific Concussion Protocol?";
            });
            if (indextrue !== -1) {
                _this.InjuryArray[indextrue].show = false;
            }
            var index = _this.InjuryArray.findIndex(function (obj) { return obj.key === key; });
            if (index === -1) {
                _this.InjuryArray.push({
                    key: key,
                    value: [value],
                    selected: false,
                    area_id: [area_id],
                    area_data: [area_data],
                    show: true,
                    status: [status],
                    area_specify: [area_specify],
                    msg_status: area_msg
                });
            }
            else {
                _this.InjuryArray[index].value.push(value);
                _this.InjuryArray[index].area_id.push(area_id);
                _this.InjuryArray[index].area_data.push(area_data);
                _this.InjuryArray[index].status.push(status);
                _this.InjuryArray[index].area_specify.push(area_specify);
            }
        });
        this.InjuryArray = this.updateSelectedStatus(this.InjuryArray);
    };
    InjuryIncidentReportPage.prototype.causedByCollision = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                // .set("incident_group_id", "12")
                // .set("incident_id", this.incident_id)
                // .set("selectedTeam", this.PersonData.SELECTEDTEAM);
                .set("incident_group_id", "0")
                .set("incident_id", _this.incident_id)
                .set("selectedTeam", _this.PersonData.SELECTEDTEAM)
                .set("club_id", _this.PersonData.CLUB_ID);
            _this.http
                .post(_this.global.APIURL + "incidents/getIncidentAreas", data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (response) {
                var Data = _this.events.publish("json:query", response.GETINCIDENTAREAS)[0];
                for (var key in Data) {
                    if (Data[key]["AREA_DATA"] == 1) {
                        _this.CollisionReason = key;
                    }
                    _this.CausedbyCollision.push(Data[key]);
                }
                resolve(true);
            }, function (error) { });
        });
    };
    InjuryIncidentReportPage.prototype.recurrentInjury = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                // .set("incident_group_id", "9")
                // .set("incident_id", this.incident_id)
                // .set("selectedTeam", this.PersonData.SELECTEDTEAM);
                .set("incident_group_id", "0")
                .set("incident_id", _this.incident_id)
                .set("selectedTeam", _this.PersonData.SELECTEDTEAM)
                .set("club_id", _this.PersonData.CLUB_ID);
            _this.http
                .post(_this.global.APIURL + "incidents/getIncidentAreas", data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (response) {
                var Data = _this.events.publish("json:query", response.GETINCIDENTAREAS)[0];
                for (var key in Data) {
                    if (Data[key]["AREA_DATA"] == 1) {
                        _this.RecurrentOption = key;
                    }
                    _this.RecurrentInjury.push(Data[key]);
                }
                resolve(true);
            }, function (error) { });
        });
    };
    InjuryIncidentReportPage.prototype.AddIncidentId = function (AreaId, AreaData) {
        if (this.incident_area_ids.includes(AreaId) == false) {
            if (AreaData == 0 || AreaData == null) {
                AreaData = 1;
            }
            else {
                AreaData = 0;
            }
            this.incident_area_ids.push(AreaId);
            this.incident_area_datas.push(AreaData);
        }
        else if (this.incident_area_ids.includes(AreaId) == true) {
            var getDataindex = this.incident_area_ids.indexOf(AreaId);
            this.incident_area_ids.splice(getDataindex, 1);
            this.incident_area_datas.splice(getDataindex, 1);
        }
    };
    InjuryIncidentReportPage.prototype.readAddedIncidentId = function (AreaId) {
        if (this.incident_area_ids.includes(AreaId)) {
            return true;
        }
        else {
            return false;
        }
    };
    InjuryIncidentReportPage.prototype.compareSelectedValues = function (InjuryCauseArray, InjuryArray) {
        InjuryArray.forEach(function (injuryObj) {
            var matchingCause = InjuryCauseArray.find(function (causeObj) { return causeObj.key === injuryObj.key; });
            if (matchingCause && matchingCause.value.length > 0) {
                injuryObj.selected = true;
            }
            else {
                injuryObj.selected = false;
            }
        });
    };
    InjuryIncidentReportPage.prototype.replaceIfExists = function (dataArray, newObj) {
        var index = dataArray.findIndex(function (obj) { return obj["key"] === newObj["key"]; });
        if (index !== -1) {
            dataArray[index] = newObj;
        }
        else {
            var keyExists = dataArray.some(function (obj) { return obj["key"] === newObj["key"]; });
            if (!keyExists) {
                dataArray.push(newObj);
                // dataArray = dataArray.filter(item => !newObj.includes(item));
            }
        }
        return dataArray;
    };
    InjuryIncidentReportPage.prototype.showAndhideIncident = function (selectedobj) {
        if (selectedobj.key == "Suspected Nature of Injury") {
            var isConcussionPresent = selectedobj.value.includes("Concussion / Loss of Consciousness");
            var indextrue = this.InjuryArray.findIndex(function (obj) {
                return obj.key ===
                    "Concussion - Have you followed the GPS Sport Specific Concussion Protocol?";
            });
            if (isConcussionPresent) {
                if (indextrue !== -1) {
                    this.InjuryArray[indextrue].show = true;
                }
            }
            else {
                if (indextrue !== -1) {
                    this.InjuryArray[indextrue].show = false;
                }
            }
        }
    };
    // mergeArrays(valueArray: string[], areaDataArray: boolean[]): any[] {
    //   const mergedArray: any[] = [];
    //   for (let i = 0; i < Math.min(valueArray.length, areaDataArray.length); i++) {
    //     mergedArray.push({
    //       value: valueArray[i],
    //       status: areaDataArray[i]
    //     });
    //   }
    //   return mergedArray;
    // }
    InjuryIncidentReportPage.prototype.mergeValues = function (value, areaData, id, specify, specifyValue) {
        var mergevalue = {
            value: value,
            status: areaData === '0' ? false : areaData,
            id: id,
            specify: specify,
            specifyValue: specifyValue,
        };
        return mergevalue;
    };
    InjuryIncidentReportPage.prototype.updateSelectedStatus = function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var statuses = item.status;
            // Check if any status has 'true' value
            var hasTrueStatus = statuses.some(function (status) { return status.status === true; });
            // Update the 'selected' property accordingly
            item.selected = hasTrueStatus;
        }
        console.log("injuryarryyyy", data);
        return data;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], InjuryIncidentReportPage.prototype, "content", void 0);
    InjuryIncidentReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-injury-incident-report",template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/injury-incident-report/injury-incident-report.html"*/'\n<ion-content class="bg-black" >\n        <div class="fixed-top_ modal-close">\n                <!-- <img src="assets/images/close-white.png" alt="" data-dismiss="modal"> -->\n                <div class="rotate-text pwrotate-text-white" (click)="close()">\n                      <span class="close_" data-dismiss="modal">CLOSE\n                          <ion-icon name="close" class="close_-button"></ion-icon>\n                      </span>\n                  </div>\n        </div>\n\n\n\n      <div class="modal-content modalView">\n          <div class="modal-header shadow">\n\n              <h5 class="modal-title fontBold text-center">INCIDENT REPORT</h5>\n          </div>\n          <div class="modal-body modal-report" *ngFor="let key1 of GETINCIDENT;">\n              <div *ngFor="let key of GETPERSONDETAILS;">\n                    <div class="card-img">\n                        <img src="assets/images/test-user.svg" alt="" class="img-circle">\n                    </div>\n                    <h5 class="info-item text-gray">{{key.first_name}} {{key.last_name}}</h5>\n                    <p class="text-fade">{{key1.date_started}}</p>\n                    <h5 class="info-item mt-30">EMERGENCY INFORMATION</h5>\n                    \n                    <p class="text-fade">\n                            <span>Medical Conditions:</span><br>\n                        <span *ngIf="!key.medical_condition || key.medical_condition==\'\'">No medical conditions recorded  </span>\n                        <span *ngIf="key.medical_condition">{{key.medical_condition}}</span>\n                        <br> Emergency contact: <br>\n                        \n                        <span *ngFor="let emergencyContact of key.emergency_contacts" class="emgcont">\n                            {{emergencyContact.parentName | titlecase}} : {{emergencyContact.phone_mobile}}\n                        </span>\n                        </p>\n\n                    <!--section start-->\n                    <h5 class="info-item mt-30">INCIDENT DETAILS</h5>\n                    <h4 class="text-fade">Activity involved in:</h4>\n                    <div class="form-group" >\n                        <textarea name="" id="" cols="30" rows="6" [(ngModel)]="incidentactivity" placeholder={{key1.incidentactivity}}></textarea>\n                        \n                    </div>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Time of incident:</label>\n                            </div>\n                            <div class="col-xs-6 p-0">\n                                <!-- <input type="text" class="form-control" [(ngModel)]="incident_time"  placeholder={{key1.incident_time}}> -->\n                                <ion-datetime class="form-control" [(ngModel)]="incident_time" display-timezone="HH:mm" displayFormat="HH:mm"></ion-datetime>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Cause of injury:</label>\n                            </div>\n                            <div class="col-xs-6 p-0" (click)="gotoSelectDropView(\'CAUSE OF INJURY\',\'16\')">\n                                <label class=" form-control select" >{{dropdownValues[5].count}} selected</label>\n                            </div>\n                        </div>\n                    </div> -->\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Parents called:</label>\n                            </div>\n                            <div class="col-xs-6 p-0">\n                                <div class="checkbox checkbox-info checkbox-circle"  (click)="parentsCalled(relativeInformed)">\n                                    <input id="checkbox1" class="styled" type="checkbox" [checked]="relativeInformed==1">\n                                    <label for="checkbox1">&nbsp;</label>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Occurred at the club:</label>\n                            </div>\n                            <div class="col-xs-6 p-0">\n                                <div class="checkbox checkbox-info checkbox-circle" *ngFor="let key2 of OccuredatClub" (click)="AddIncidentId(OccuredatClub[0].INCIDENT_AREA_ID,OccuredatClub[0].AREA_DATA)">\n                                    <input id="checkbox2" class="styled" type="checkbox"  \n                                            [checked]="(OccuredatClub[0].AREA_DATA!=null) && (OccuredatClub[0].AREA_DATA==1 || readAddedIncidentId(OccuredatClub[0].INCIDENT_AREA_ID))">\n                                    <label for="checkbox1">&nbsp;</label>\n                                </div>\n                            </div>\n                        </div>\n                    </div> -->\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Witness</label>\n                            </div>\n                            <div class="col-xs-6 p-0">\n                                <input type="text" class="form-control"  [(ngModel)]="incidentwitnesses" placeholder={{key1.incidentwitnesses}}>\n                            </div>\n                        </div>\n                    </div>\n                    <!--section end-->\n\n                    <h5 class="info-item mt-30">INCIDENT DETAILS</h5>\n                    \n                    <div class="form-group" *ngFor="let values of InjuryArray; let i = index;">\n                        <div class="row" *ngIf="values.show">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">{{values.key}}:</label>\n                            </div>\n                            <div class="col-xs-6 p-0" (click)="gotoSelectDropView(values.key,values,\'6\',i)">\n                                <!-- <label class=" form-control select" >{{dropdownValues[0].count}} selected</label> -->\n                                <label class=" form-control select"  *ngIf="values.selected">selected</label>\n                                <label class=" form-control select"  *ngIf="!values.selected">Not Selected</label>\n                            </div>\n                        </div>\n                    </div>\n\n\n\n\n\n\n                    <!--section start-->\n                    <!-- <h5 class="info-item mt-30">INCIDENT DETAILS</h5>\n                    <div class="form-group" *ngFor="let key1 of GETINCIDENT;">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Body part:</label>\n                            </div>\n                            <div class="col-xs-6 p-0" (click)="gotoSelectDropView(\'BODY PARTS\',\'6\')">\n                                <label class=" form-control select" >{{dropdownValues[0].count}} selected</label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Nature:</label>\n                            </div>\n                            <div class="col-xs-6 p-0" (click)="gotoSelectDropView(\'NATURE OF INJURY\',\'8\')">\n                                <label class=" form-control select" >{{dropdownValues[1].count}} selected</label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">When did the injury occur?</label>\n                            </div>\n                            <div class="col-xs-6 p-0" (click)="gotoSelectDropView(\'When did the injury occur?\',\'11\')">\n                                <label class=" form-control select" >{{dropdownValues[2].count}} selected</label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Recurrent injury:</label>\n                            </div>\n                            <div class="col-xs-6 p-0">\n                                <label class="select" >\n                                    <select class="form-control" [(ngModel)]="RecurrentOption">\n                                        <option value=\'\'>Select</option>\n                                        <option value=0>No</option>\n                                        <option value=1>Yes</option>\n                                    </select>\n                                </label>\n                                \n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Caused by collision:</label>\n                            </div>\n                            <div class="col-xs-6 p-0">\n                                <label class="select" >\n                                    <select class="form-control" [(ngModel)]="CollisionReason">\n                                        <option value=\'\'>Select</option>\n                                        <option value=0>No</option>\n                                        <option value=1>Yes, with another team mates</option>\n                                        <option value=2>Yes, with the ball</option>\n                                    </select>\n                                </label>\n                                \n                            </div>\n                        </div>\n                    </div> -->\n                    <!--section end-->\n                    <!--section tarts-->\n                    <!-- <h5 class="info-item mt-30">TREATMENT</h5>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Nature:</label>\n                            </div>\n                            <div class="col-xs-6 p-0" (click)="gotoSelectDropView(\'TREATMENT / ACTION TAKEN\',\'14\')">\n                                <label class=" form-control select" >{{dropdownValues[3].count}} selected</label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Referral for further treatment</label>\n                            </div>\n                            <div class="col-xs-6 p-0" (click)="gotoSelectDropView(\'Referral for further treatment\',\'15\')">\n                                <label class=" form-control select" >{{dropdownValues[4].count}} selected</label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Follow up:</label>\n                            </div>\n                            <div class="col-xs-6 p-0">\n                                <input type="text" class="form-control" [(ngModel)]="followuptreatment" placeholder={{key1.followuptreatment}}>\n                            </div>\n                        </div>\n                    </div> -->\n\n                    <!--end here-->\n                    <!-- <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-5 p-0 ">\n                                <label class="form-label">Caused by collision:</label>\n                            </div>\n                            <div class="col-xs-7 p-0">\n                                    <label class="select" >\n                                            <select class="form-control" [(ngModel)]="CollisionReason">\n                                                <option value=0>No</option>\n                                                <option value=1>Yes, with another player</option>\n                                                <option value=2>Yes, with the ball</option>\n                                            </select>\n                                        </label>\n                                \n                            </div>\n                        </div>\n                    </div> -->\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Follow up:</label>\n                            </div>\n                            <div class="col-xs-6 p-0">\n                                <input type="text" class="form-control" [(ngModel)]="followuptreatment" >\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="row">\n                            <div class="col-xs-6 p-0">\n                                <label class="form-label">Incident:</label>\n                            </div>\n                            <div class="col-xs-6 p-0" >\n                                <label class="select">\n                                    <select class="form-control" [(ngModel)]="incident">\n                                        <option value=0>Not Injured</option>\n                                        <option value=1>Injured</option>\n                                        <option value=2>Cleared from Injury</option>\n                                    </select>\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="btn-section mt-30" *ngIf="injurySaveButton">\n                    <button type="submit" class="btn btn-save xs-btn" (click)="RecordInjury()">RECORD INJURY</button>\n                </div>\n                <div class="modal-footer"></div>\n\n            </div>\n        </div>\n        \n</ion-content>\n<!-- <ion-footer [hidden]="keyboard.isOpen()">\n    <div class="navbar navbar-default navbar-fixed-bottom">\n        <div class="container-fluid">\n            <ul class="nav navbar-nav">\n                <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n                <li class="events active" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n                <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n                <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n                <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n            </ul>\n        </div>\n      </div>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/injury-incident-report/injury-incident-report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar_ngx__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global_api_global_api__["a" /* GlobalApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */]])
    ], InjuryIncidentReportPage);
    return InjuryIncidentReportPage;
}());

//# sourceMappingURL=injury-incident-report.js.map

/***/ })

});
//# sourceMappingURL=52.js.map