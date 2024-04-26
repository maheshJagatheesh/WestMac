webpackJsonp([53],{

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjuryCausePageModule", function() { return InjuryCausePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__injury_cause__ = __webpack_require__(904);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InjuryCausePageModule = /** @class */ (function () {
    function InjuryCausePageModule() {
    }
    InjuryCausePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__injury_cause__["a" /* InjuryCausePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__injury_cause__["a" /* InjuryCausePage */]),
            ],
        })
    ], InjuryCausePageModule);
    return InjuryCausePageModule;
}());

//# sourceMappingURL=injury-cause.module.js.map

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InjuryCausePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar_ngx__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__ = __webpack_require__(24);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InjuryCausePage = /** @class */ (function () {
    function InjuryCausePage(navCtrl, navParams, http, global, events, modalCtrl, loadingCtrl, viewCtrl, statusBar, gFn, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.global = global;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.statusBar = statusBar;
        this.gFn = gFn;
        this.global_api = global_api;
        this.Selectors = [];
        this.incident_area_ids = [];
        this.incident_area_datas = [];
        this.groupId = 0;
        this.dropdownValues = [];
        this.selectedValues = [];
        this.CountValues = 0;
        this.SELECTEDTEAM = 0;
        this.incident_id = 0;
        this.injuryValues = [];
        this.injurySelectedVlaues = [];
        this.injurySelectedAreaid = [];
        this.injurySelectedAreadata = [];
        this.checkboxValue = true;
        this.specifiedValues = [];
        this.gFn.hideMenuIcon();
        this.callback = this.navParams.get("callback");
    }
    InjuryCausePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.statusBar.hide();
        this.groupId = parseInt(this.navParams.get("group_id"));
        this.header = this.navParams.get("Data");
        this.SELECTEDTEAM = this.navParams.get("SELECTEDTEAM");
        this.incident_id = this.navParams.get("incident_id");
        this.incident_area_ids = JSON.parse(this.navParams.get("incident_area_ids"));
        this.incident_area_datas = JSON.parse(this.navParams.get("incident_area_datas"));
        this.injuryValues = JSON.parse(this.navParams.get("dropdownValues"));
        this.dropdownValues = JSON.parse(this.navParams.get("dropdownValues"));
        this.selectedValues = JSON.parse(this.navParams.get("selectedValues"));
        var values = JSON.parse(this.navParams.get("selectedValues"));
        this.injurySelectedVlaues = this.gettingInjuryValues(values, this.header, this.dropdownValues);
        // debugger;
        //this.injuryValues = this.updateStatusBasedOnSelected(this.injuryValues,this.selectedValues)
        this.index = this.navParams.get("index");
        this.msgstatus = JSON.parse(this.navParams.get("msgstatus"));
        setTimeout(function () {
            console.log("msgsttusss", _this.msgstatus);
        }, 2000);
        var loader = this.loadingCtrl.create({});
        loader.present();
        if (this.groupId != 6) {
            this.getIncidentAreas(this.groupId, this.SELECTEDTEAM, this.incident_id).then(function (x) {
                loader.dismiss();
                if (!x) {
                    alert("Data not found or Connection issue.");
                }
            });
        }
        else if (this.groupId == 6) {
            this.getIncidentAreasGrouped(this.SELECTEDTEAM, this.incident_id).then(function (x) {
                loader.dismiss();
                if (!x) {
                    alert("Data not found or Connection issue.");
                }
            });
        }
    };
    InjuryCausePage.prototype.gettingInjuryValues = function (values, header, dropdownValues) {
        if (values.length > 0) {
            var index = values.findIndex(function (item) { return item.key === header; });
            if (index !== -1) {
                return values[index].value;
            }
            else {
                return [];
            }
        }
        else {
            return this.getValuesWithTrueStatus(this.dropdownValues);
        }
    };
    InjuryCausePage.prototype.ionViewDidLeave = function () {
        this.statusBar.show();
        var other_area_id = this.injuryValues
            .filter(function (data) { return data.specify && data.status; })
            .map(function (data) { return (data.id); });
        var other_area_text = this.injuryValues.filter(function (data) { return data.specify && data.status; })
            .map(function (data) { return (data.specify); });
        var selectedValue = {
            key: this.header,
            value: this.injurySelectedVlaues,
            // area_id: this.injurySelectedAreaid,
            area_id: this.getSelectedIds(this.injurySelectedVlaues, this.injuryValues),
            area_data: this.getSelectedAreaData(this.injurySelectedAreadata, this.injuryValues),
            other_area_id: other_area_id,
            other_area_text: other_area_text,
        };
        for (var key in this.dropdownValues) {
            if (this.groupId == this.dropdownValues[key].groupId) {
                this.dropdownValues[key].count =
                    this.dropdownValues[key].count + this.CountValues;
            }
        }
        var data = {
            injured_person_id: this.navParams.get("injured_person_id"),
            incident_area_ids: JSON.stringify(this.incident_area_ids),
            incident_area_datas: JSON.stringify(this.incident_area_datas),
            group_id: this.groupId,
            dropdownValues: JSON.stringify(this.dropdownValues),
            injuryselectedValues: JSON.stringify(selectedValue),
            index: this.index,
            updatedStatus: this.injuryValues
        };
        this.callback(data);
    };
    InjuryCausePage.prototype.getIncidentAreas = function (incident_group_id, SELECTEDTEAM, incident_id) {
        var _this = this;
        return new Promise(function (resolve) {
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("incident_group_id", incident_group_id)
                .set("selectedTeam", SELECTEDTEAM)
                //  .set('incident_id',incident_id)
                .set("incident_id", "2007");
            _this.http
                .post(_this.global.APIURL + "incidents/getIncidentAreas", data, {
                headers: _this.global_api.getHeader(),
            })
                .subscribe(function (response) {
                var Data = _this.events.publish("json:query", response.GETINCIDENTAREAS)[0];
                for (var key in Data) {
                    _this.Selectors.push(Data[key]);
                }
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    InjuryCausePage.prototype.getIncidentAreasGrouped = function (SELECTEDTEAM, incident_id) {
        var _this = this;
        return new Promise(function (resolve) {
            var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
                .set("selectedTeam", SELECTEDTEAM)
                .set("incident_id", incident_id);
            _this.http
                .post(_this.global.APIURL + "incidents/getAllIncidentAreasGrouped", data, { headers: _this.global_api.getHeader() })
                .subscribe(function (response) {
                var Data = _this.events.publish("json:query", response.GETALLINCIDENTAREASGROUPED[0])[0];
                var Data1 = _this.events.publish("json:query", response.GETALLINCIDENTAREASGROUPED[1])[0];
                if (_this.header != "BODY PARTS") {
                    for (var key in Data) {
                        _this.Selectors.push(Data[key]);
                    }
                }
                else if (_this.header == "BODY PARTS") {
                    var temp = [];
                    var temp1 = [];
                    for (var key in Data) {
                        temp.push(Data[key]);
                    }
                    for (var key in Data1) {
                        temp1.push(Data1[key]);
                    }
                    _this.Selectors.push(temp);
                    _this.Selectors.push(temp1);
                }
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    // getIncidentDetails(AreaId,AreaData,event){
    //   if(this.incident_area_ids.includes(AreaId)==false){
    //     if(AreaData==0 || AreaData==null){
    //       AreaData=1
    //       this.CountValues=this.CountValues+1;
    //     }
    //     else{
    //       AreaData=0
    //       this.CountValues=this.CountValues-1;
    //     }
    //     this.incident_area_ids.push(AreaId)
    //     this.incident_area_datas.push(AreaData)
    //   }
    //   else if(this.incident_area_ids.includes(AreaId)==true){
    //     var getDataindex=this.incident_area_ids.indexOf(AreaId)
    //     this.incident_area_ids.splice(getDataindex,1)
    //     var area_data=this.incident_area_datas.splice(getDataindex,1)
    //     if(area_data==0){
    //       this.CountValues=this.CountValues+1;
    //     }
    //     else{
    //       this.CountValues=this.CountValues-1;
    //     }
    //   }
    // }
    InjuryCausePage.prototype.getIncidentDetails = function (key, i, list) {
        //  this.injurySelectedVlaues.push(key)
        //  this.injurySelectedAreadata.push(this.incident_area_datas[i])
        //  this.injurySelectedAreaid.push(this.incident_area_ids[i])
        var index = this.injurySelectedVlaues.indexOf(key.value);
        var object = __assign({}, key);
        if (index !== -1) {
            // If the checkbox is unchecked, remove data from arrays
            this.injurySelectedVlaues.splice(index, 1);
            object.status = false;
            // this.injurySelectedAreadata.splice(index, 1);
            // this.injurySelectedAreaid.splice(index, 1);
        }
        else {
            // If the checkbox is checked, add data to arrays
            this.injurySelectedVlaues.push(key.value);
            object.status = true;
            // this.injurySelectedAreadata.push(this.incident_area_datas[i]);
            // this.injurySelectedAreaid.push(this.incident_area_ids[i]);
        }
        this.injuryValues[i] = __assign({}, object);
    };
    InjuryCausePage.prototype.close = function () {
        this.navCtrl.pop();
    };
    InjuryCausePage.prototype.removeInjuryValues = function (selected, injuryValues) {
        // Filter out values that exist in the injuryValues array
        var filteredSelected = selected.filter(function (value) { return !injuryValues.some(function (injury) { return injury.value === value; }); });
        return filteredSelected;
    };
    InjuryCausePage.prototype.readAddedIncidentId = function (AreaData, AreaId) {
        if (this.incident_area_ids.includes(AreaId) == true) {
            var getDataindex = this.incident_area_ids.indexOf(AreaId);
            if (this.incident_area_datas[getDataindex] == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (AreaData == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    InjuryCausePage.prototype.checkedStatus = function (value) {
        // return this.selectedValues.some((item) => item.value.includes(value));
        if (value) {
            return true;
        }
        else {
            return false;
        }
    };
    InjuryCausePage.prototype.checkboxClick = function (event) {
        var statement = true;
        if (statement) {
            // Modify the checkbox state using ngModel
            this.checkboxValue = true;
        }
        console.log("testtt", event);
    };
    InjuryCausePage.prototype.getValuesWithTrueStatus = function (full) {
        // Use the filter function to get values where status is true
        var trueStatusValues = full
            .filter(function (item) { return item.status; })
            .map(function (item) { return item.value; });
        return trueStatusValues;
    };
    InjuryCausePage.prototype.updateStatusBasedOnSelected = function (fullarray, selected) {
        if (selected.length > 0) {
            fullarray.forEach(function (item) {
                // Check if the value exists in the selected array
                var valueExistsInSelected = selected.some(function (selectedItem) { return selectedItem.value.includes(item.value); });
                // Update the status based on the check
                item.status = valueExistsInSelected;
            });
        }
        // Iterate over each item in fullarray
        return fullarray;
    };
    InjuryCausePage.prototype.getSelectedIds = function (injurySelectedValues, fullarray) {
        // Filter out items from fullarray where value exists in injurySelectedValues
        var selectedItems = fullarray
            .filter(function (item) { return injurySelectedValues.includes(item.value); })
            .map(function (item) { return item.id.toString(); });
        return selectedItems;
    };
    InjuryCausePage.prototype.getSelectedAreaData = function (injurySelectedValues, fullarray) {
        // Filter out items from fullarray where value exists in injurySelectedValues
        var selectedItems = fullarray
            .filter(function (item) { return injurySelectedValues.includes(item.value); })
            .map(function (item) { return item.status; });
        return selectedItems;
    };
    InjuryCausePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-injury-cause",template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/injury-cause/injury-cause.html"*/'<ion-content class="bg-black">\n  <div class="top-bar" (click)="close()">\n    <div class="col-xs-3">\n      <div class="backArrow inverse"></div>\n    </div>\n  </div>\n  <!-- Modal content-->\n  <div class="modal-content modalView">\n    <div class="modal-header shadow">\n      <h5 class="modal-title fontBold text-center">{{header}}</h5>\n    </div>\n    <!-- <div class="modal-body modal-report select-option" *ngIf="header!=\'BODY PARTS\'">\n                <div class="form-group" *ngFor="let key of Selectors">\n                    <div class="row" >\n                        <div class="col-xs-12 p-0">\n                            <div class="checkbox checkbox-info checkbox-circle" >\n                                <input id="checkbox5" class="styled" type="checkbox" (click)="getIncidentDetails(key.INCIDENT_AREA_ID,key.AREA_DATA,$event)"\n                                        [checked]=\'(readAddedIncidentId(key.AREA_DATA,key.INCIDENT_AREA_ID))\'>\n                                <label for="checkbox5" ></label>\n                                <span>{{key.INCIDENT_AREA}}</span>\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div> -->\n\n    <div class="modal-body modal-report select-option">\n      <div class="form-group" *ngFor="let key of injuryValues; index as i">\n        <div class="row">\n          <div class="col-xs-12 p-0">\n            <div class="checkbox checkbox-info checkbox-circle">\n              <input\n                id="checkbox5"\n                class="styled"\n                type="checkbox"\n                (click)="getIncidentDetails(key, i,injuryValues)"\n                [checked]="checkedStatus(key.status)"\n              />\n              <label for="checkbox5"></label>\n\n              <span\n              \n                [style.background-color]="msgstatus ? \'red\' : \'initial\'"\n                [style.color]="msgstatus ? \'white\' : \'initial\'"\n              >\n                {{ key.value }}\n              </span>\n\n            \n            </div>\n            <div *ngIf="key.specify && key.status">\n              <input\n                type="text"\n                id="fspecify{{i}}"\n                name="specify"\n                style="margin-top: 5px; margin-left: 10px"\n                [(ngModel)]="key.specifyValue"\n              /><br />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div\n      class="modal-body modal-report select-option"\n      *ngIf="header==\'BODY PARTS\'"\n    >\n      <div *ngFor="let key of Selectors;let i=index">\n        <p *ngIf="i==0">Injured Body Part</p>\n        <p *ngIf="i==1">Side of body</p>\n        <div class="form-group" *ngFor="let key1 of key">\n          <div class="row">\n            <!-- <div class="col-xs-12 p-0"> \n                                <div class="col-xs-2 p-0"  >\n                                    <div class="checkbox1" [class.ActiveCheckbox]=\'(readAddedIncidentId(key1.AREA_DATA,key1.INCIDENT_AREA_ID))\'\n                                    (click)="getIncidentDetails(key1.INCIDENT_AREA_ID,key1.AREA_DATA,$event)" >\n                                    </div>\n                                    <div class="Outercheckbox"></div>\n                                </div>\n                                <div class="col-xs-9 p-5"><span>{{key1.INCIDENT_AREA}}</span></div>\n                            </div> -->\n\n            <div class="col-xs-12 p-0">\n              <div class="checkbox checkbox-info checkbox-circle">\n                <input\n                  id="checkbox5"\n                  class="styled"\n                  type="checkbox"\n                  (click)="getIncidentDetails(key1.INCIDENT_AREA_ID,key1.AREA_DATA,$event)"\n                  [checked]="(readAddedIncidentId(key1.AREA_DATA,key1.INCIDENT_AREA_ID))"\n                />\n                <label for="checkbox5"></label>\n                <span>{{key1.INCIDENT_AREA}}</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/injury-cause/injury-cause.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar_ngx__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], InjuryCausePage);
    return InjuryCausePage;
}());

//# sourceMappingURL=injury-cause.js.map

/***/ })

});
//# sourceMappingURL=53.js.map