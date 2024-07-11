webpackJsonp([81],{

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventAttendanceConfirmPageModule", function() { return EventAttendanceConfirmPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_attendance_confirm__ = __webpack_require__(874);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventAttendanceConfirmPageModule = /** @class */ (function () {
    function EventAttendanceConfirmPageModule() {
    }
    EventAttendanceConfirmPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_attendance_confirm__["a" /* EventAttendanceConfirmPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_attendance_confirm__["a" /* EventAttendanceConfirmPage */]),
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], EventAttendanceConfirmPageModule);
    return EventAttendanceConfirmPageModule;
}());

//# sourceMappingURL=event-attendance-confirm.module.js.map

/***/ }),

/***/ 874:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventAttendanceConfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_base64_ngx__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera_ngx__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_ngx__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path_ngx__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_functions_global_functions__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_vibration_ngx__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var EventAttendanceConfirmPage = /** @class */ (function () {
    function EventAttendanceConfirmPage(navCtrl, navParams, http, storage, base64, loadingCtrl, global, actionSheetCtrl, camera, platform, file, gFn, filePath, toastCtrl, alert, viewCtrl, vibration, global_api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.base64 = base64;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.platform = platform;
        this.file = file;
        this.gFn = gFn;
        this.filePath = filePath;
        this.toastCtrl = toastCtrl;
        this.alert = alert;
        this.viewCtrl = viewCtrl;
        this.vibration = vibration;
        this.global_api = global_api;
        this.certificateImage = '';
        this.randomNumber = '';
        this.SelectReason = '';
        this.comment = '';
        this.reasonList = [];
        this.Data = {};
        this.MedicalCertificate = '';
        this.MedicalCertificatePrev = '';
        this.gFn.hideMenuIcon();
        this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
    }
    EventAttendanceConfirmPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.PersonDetails = JSON.parse(this.navParams.get('personDetails'));
        console.log(this.PersonDetails);
        this.storage.get('UpcomingSingleEvent').then(function (val) {
            _this.UpcomingSingleEvent = JSON.parse(val);
            // console.log(val)
            _this.storage.get('loggedInUserData').then(function (val1) {
                // this.PersonData = val1;
                _this.getAttendanceApproveOption();
            });
        });
        console.log('ionViewDidLoad EventConfirmAbsencePage');
    };
    EventAttendanceConfirmPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'From Gallery',
                    icon: 'cloud-upload',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'From Camera',
                    icon: 'camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close-circle',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    EventAttendanceConfirmPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.DATA_URL
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            var base64 = "data:image/jpeg;base64," + imagePath;
            _this.MedicalCertificate = base64;
            _this.certificateImage = encodeURIComponent(base64);
            // Special handling for Android library
            /* if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                  
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                  
                  this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                 
                });
            } else {
              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              
            } */
        }, function (err) {
            _this.presentToast(err);
        });
    };
    // Create a new name for the image
    EventAttendanceConfirmPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    EventAttendanceConfirmPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.readAsDataURL(namePath, currentName).then(function (res) {
            console.log(res);
            _this.MedicalCertificate = res;
        });
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.certificateImage = newFileName;
            _this.uploadImage();
        }, function (error) {
            _this.presentToast(error);
        });
    };
    EventAttendanceConfirmPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    EventAttendanceConfirmPage.prototype.uploadImage = function () {
        var _this = this;
        var targetPath = this.pathForImage(this.certificateImage);
        this.base64.encodeFile(targetPath).then(function (base64File) {
            _this.uploadPhoto(encodeURIComponent(base64File));
        }, function (err) {
            _this.presentAlert('Error', 'Sorry, image upload error.');
        });
    };
    EventAttendanceConfirmPage.prototype.uploadPhoto = function (certificateImage) {
        this.certificateImage = '';
        this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
        this.certificateImage = (certificateImage);
    };
    EventAttendanceConfirmPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    EventAttendanceConfirmPage.prototype.presentAlert = function (Title, SubTitle) {
        var alert = this.alert.create({
            title: Title,
            subTitle: SubTitle,
            buttons: ['Dismiss']
        });
        alert.present(alert);
    };
    EventAttendanceConfirmPage.prototype.close = function () {
        this.navCtrl.pop();
        this.gFn.showMenuIcon();
    };
    EventAttendanceConfirmPage.prototype.getAttendanceApproveOption = function () {
        var _this = this;
        var attendanceReason = this.PersonDetails.attendInfo.attendanceReason;
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('event_id', this.PersonDetails.event_id)
            .set('person_id', this.PersonDetails.attendInfo.person_id)
            .set('attendanceReason', attendanceReason);
        this.http.post(this.global.APIURL + "players/getAttendanceApproveOption", Data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS && data.GETATTENDANCEAPPROVEOPTION.length) {
                _this.AttendanceApproveOption = data.GETATTENDANCEAPPROVEOPTION[0];
                _this.comment = data.GETATTENDANCEAPPROVEOPTION[0].parentComment;
                _this.MedicalCertificatePrev = data.GETATTENDANCEAPPROVEOPTION[0].medicalCertificate;
                for (var key in data.GETATTENDANCEAPPROVEOPTION[0].reasons) {
                    if (data.GETATTENDANCEAPPROVEOPTION[0].reasons[key].reason_display == _this.AttendanceApproveOption.selected) {
                        _this.reasonList.unshift(data.GETATTENDANCEAPPROVEOPTION[0].reasons[key]);
                        _this.Data = data.GETATTENDANCEAPPROVEOPTION[0].reasons[key];
                        _this.SelectReason = data.GETATTENDANCEAPPROVEOPTION[0].reasons[key].reason;
                    }
                    else {
                        _this.reasonList.push(data.GETATTENDANCEAPPROVEOPTION[0].reasons[key]);
                    }
                }
            }
        });
    };
    EventAttendanceConfirmPage.prototype.saveAttendanceWorkflow = function () {
        var _this = this;
        var selectedReason = $('.attendence:checked').val().toString();
        var Data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.PersonDetails.attendInfo.parent_id)
            .set('attendanceID', this.AttendanceApproveOption.attendanceID)
            .set('attendanceWorkflowID', this.AttendanceApproveOption.attendanceWorkflowID)
            .set('parent_comment', this.comment)
            .set('medical_certificate', this.certificateImage)
            .set('reason', selectedReason.trim())
            .set('alert_status', this.AttendanceApproveOption.alert_status);
        this.http.post(this.global.APIURL + "players/saveAttendanceWorkflow", Data, { headers: this.global_api.getHeader() })
            .subscribe(function (data) {
            if (data.SUCCESS) {
                _this.vibration.vibrate(500);
                _this.navCtrl.push('EventHomeNewPage');
                _this.presentToast('Status Updated');
                //this.navCtrl.pop()
                _this.viewCtrl.dismiss(_this.PersonDetails.attendInfo.attendanceReason);
                _this.gFn.showMenuIcon();
            }
            else {
                _this.presentToast('Data could not be saved');
                _this.navCtrl.pop();
                //this.viewCtrl.dismiss()
                _this.gFn.showMenuIcon();
            }
        });
    };
    EventAttendanceConfirmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-attendance-confirm',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-attendance-confirm/event-attendance-confirm.html"*/'<ion-content class="bg-black" padding>\n  <div class="fixed-top_ modal-close">\n    <!-- <img src="assets/images/close-white.png" alt="" data-dismiss="modal"> -->\n    <div class="rotate-text pwrotate-text-white" (click)="close()">\n          <span class="close_" data-dismiss="modal">CLOSE\n              <ion-icon name="close" class="close_-button"></ion-icon>\n          </span>\n      </div>\n</div>\n    <!-- Modal content-->\n    <div class="modal-content modalView" >\n        <div class="modal-header shadow">\n            <h5 class="modal-title fontBold text-center" *ngIf="PersonDetails">{{PersonDetails.attendInfo.first_name}} {{PersonDetails.attendInfo.last_name}}</h5>\n        </div>\n        <div class="modal-body modal-report select-option" >\n            <ion-item class=\'AbsenceCard\'>\n              <!-- <div class="top-section text-left">\n                <div class="card-img">\n                    <img alt="" class="img-circle" src="assets/images/test-user.svg">\n                </div>\n                <h5 class="sub-title" *ngIf="PersonDetails">{{PersonDetails.attendInfo.first_name}} {{PersonDetails.attendInfo.last_name}}</h5>\n                <h5 class="sub-title" *ngIf="PersonDetails">{{PersonDetails.event_name}}</h5>\n                <p class="text-fade" *ngIf="PersonDetails">{{PersonDetails.date}}</p>\n              </div> -->\n              <div class="reasonAbsence form-group clearfix">\n                <label class="titleText pull-left">Reason</label>\n                <select class="label-text form-control pull-right disabled" [(ngModel)]="SelectReason">\n                  <option class="label-text" *ngFor="let key of reasonList" value={{key.reason}}>{{key.reason_display}}</option>\n                </select>\n              </div>\n              </ion-item>\n              <div>\n                <p class="label-text titleText">Comments:</p>\n                <ion-input [(ngModel)]="comment" class="input-box textarea-box form-control"></ion-input>\n              </div>\n              <div >\n                <div class="text-center mb-10">\n                    <img class="medicalCertificateImg" *ngIf="MedicalCertificate == \'\' && MedicalCertificatePrev != \'\'" src="{{global.MEDICALCERTIFICATEIMAGEURL}}{{MedicalCertificatePrev}}?r={{randomNumber}}" />\n                    <div class="circle success" id="profileImgWrap" *ngIf="MedicalCertificate; else noImage">\n                      <img src="{{MedicalCertificate}}" alt="" (click)="presentActionSheet()" onerror="this.src=\'assets/images/camera.svg\';var element = document.getElementById(\'profileImgWrap\');element.classList.remove(\'success\');" />\n                    </div>\n                </div>\n                <div class="linkOption text-center">\n                    <span class="titleText fixed-left">\n                      <span *ngIf="SelectReason == \'Sick\'">Medical Certificate</span>\n                      <span *ngIf="SelectReason != \'Sick\'">Optional Document</span>\n                    </span>\n                      <ion-icon name="cloud-upload" class="download-icon" (click)="presentActionSheet()"></ion-icon>\n                </div>\n                <!-- <div class="circle success" id="profileImgWrap" *ngIf="MedicalCertificate; else noImage">\n                    <img src="{{MedicalCertificate}}" alt="" (click)="presentActionSheet()" onerror="this.src=\'assets/images/camera.svg\';var element = document.getElementById(\'profileImgWrap\');element.classList.remove(\'success\');" />\n                </div> -->\n                \n                <!-- <ng-template #noImage>\n                    <ion-icon name="cloud-upload"></ion-icon>\n                </ng-template> -->\n              </div>\n              <div class="confirm-card">\n                <ion-button class="confirm-Button btn btn-save xs-btn" (click)="saveAttendanceWorkflow()">Confirm</ion-button>\n              </div>\n            \n        </div>\n        \n    </div>\n</ion-content>'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/event-attendance-confirm/event-attendance-confirm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_base64_ngx__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera_ngx__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_ngx__["a" /* File */], __WEBPACK_IMPORTED_MODULE_9__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path_ngx__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_vibration_ngx__["a" /* Vibration */], __WEBPACK_IMPORTED_MODULE_11__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], EventAttendanceConfirmPage);
    return EventAttendanceConfirmPage;
}());

//# sourceMappingURL=event-attendance-confirm.js.map

/***/ })

});
//# sourceMappingURL=81.js.map