webpackJsonp([58],{

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryTimelinePageModule", function() { return GalleryTimelinePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gallery_timeline__ = __webpack_require__(898);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GalleryTimelinePageModule = /** @class */ (function () {
    function GalleryTimelinePageModule() {
    }
    GalleryTimelinePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__gallery_timeline__["a" /* GalleryTimelinePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__gallery_timeline__["a" /* GalleryTimelinePage */]),
            ],
        })
    ], GalleryTimelinePageModule);
    return GalleryTimelinePageModule;
}());

//# sourceMappingURL=gallery-timeline.module.js.map

/***/ }),

/***/ 898:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryTimelinePage; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var GalleryTimelinePage = /** @class */ (function () {
    function GalleryTimelinePage(navCtrl, navParams, http, storage, base64, loadingCtrl, global, actionSheetCtrl, camera, platform, file, filePath, toastCtrl, gFn, global_api) {
        var _this = this;
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
        this.filePath = filePath;
        this.toastCtrl = toastCtrl;
        this.gFn = gFn;
        this.global_api = global_api;
        this.photosByMonths = [];
        storage.get('loggedInUserData').then(function (val) {
            _this.loggedInUserData = val;
            _this.loadTimelinePhotos();
        });
    }
    GalleryTimelinePage.prototype.goToGalleryEvents = function () {
        this.navCtrl.push('GalleryEventsPage');
    };
    GalleryTimelinePage.prototype.goToGalleryAlbums = function () {
        //this.navCtrl.push('GalleryAlbumsPage');
    };
    GalleryTimelinePage.prototype.goToGalleryTimelineDetails = function () {
        this.navCtrl.push('GalleryTimelineDetailsPage');
    };
    GalleryTimelinePage.prototype.loadTimelinePhotos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID);
        this.http.post(this.global.APIURL + 'galleries/getTimeLinePhoto', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                for (var key in response.GETTIMELINEPHOTO) {
                    _this.photosByMonths.push(response.GETTIMELINEPHOTO[key]);
                }
            }
        }, function (error) {
            loading.dismiss();
        });
    };
    GalleryTimelinePage.prototype.addGalleryImage = function () {
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
    GalleryTimelinePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast(err);
        });
    };
    // Create a new name for the image
    GalleryTimelinePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    GalleryTimelinePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.uploadImage(newFileName);
        }, function (error) {
            _this.presentToast(error);
        });
    };
    GalleryTimelinePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    GalleryTimelinePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    GalleryTimelinePage.prototype.uploadImage = function (fileName) {
        var _this = this;
        var targetPath = this.pathForImage(fileName);
        this.base64.encodeFile(targetPath).then(function (base64File) {
            _this.uploadPhoto(encodeURIComponent(base64File));
        }, function (err) {
            _this.presentToast(err);
        });
    };
    GalleryTimelinePage.prototype.uploadPhoto = function (galleryImage) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var data = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpParams */]()
            .set('person_id', this.loggedInUserData.PERSON_ID)
            .set('uploadImage', galleryImage);
        this.http.post(this.global.APIURL + 'galleries/uploadGalleryPhoto', data, { headers: this.global_api.getHeader() })
            .subscribe(function (response) {
            loading.dismiss();
            if (response.SUCCESS) {
                _this.presentToast('Image uploaded successfully.');
            }
            else {
                _this.presentToast('Sorry, image upload error.');
            }
        }, function (error) {
            loading.dismiss();
            _this.presentToast('Sorry, image upload error.');
        });
    };
    GalleryTimelinePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-gallery-timeline',template:/*ion-inline-start:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gallery-timeline/gallery-timeline.html"*/'<!--\n  Generated template for the GalleryTimelinePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <nav class="navbar navbar-fixed-top">\n    <div class="top-bar clearfix">\n      <div class="prev-next pull-right" (click)="goToChooseTeamsPage()">\n        <a href="javascript:void(0);" class="next"></a>\n        <a href="javascript:void(0);" class="prev"></a>\n      </div>\n    </div>\n    <div class="bg-header">\n      <div class="title fontBold">GALLERY</div>\n    </div>\n    <ul class="nav navbar-nav top-menu galry-event-mnu timeline-select">\n      <li class="active"><a href="javascript:void(0);">Timeline</a></li>\n      <li><a href="javascript:void(0);" (click)="goToGalleryEvents()">Events</a></li>\n      <li><a href="javascript:void(0);" (click)="goToGalleryAlbums()">Albums</a></li>\n    </ul>\n  </nav>\n</ion-header>\n\n<ion-content class="bg-gray event">\n  <section class="main">\n    <form action="" class="user-form player-item">\n      <section class="profileFirst heightAuto xs-padding">\n        <div class="event-card welfare bg-gray">\n          <a href="javascript:void(0);" class="circle-plus" (click)="addGalleryImage()">\n            <i class="material-icons">add</i>\n          </a>\n          <div *ngFor="let photosByMonth of photosByMonths">\n            <div class="row">\n              <div class="card-img col-xs-6 p-0 gallery-home">\n                {{ photosByMonth.month }}\n              </div>\n            </div>\n            <div class="homeScreen mb-30">\n              <div class="row">\n                <div *ngFor="let image of photosByMonth.images" class="thumbnail col-xs-3" (click)="goToGalleryTimelineDetails()">\n                  <img src="{{global.GALLERYIMAGEURL}}{{image.media_link}}" alt="">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n    </form>\n  </section>\n</ion-content>\n\n<ion-footer>\n  <nav class="navbar navbar-default navbar-fixed-bottom">\n    <div class="container-fluid">\n      <ul class="nav navbar-nav">\n        <li class="home" (click)="gotoHome()"><a href="javascript:void(0);">Home</a></li>\n        <li class="events" (click)="gotoDisplayEvents()"><a href="javascript:void(0);">Events</a></li>\n        <li class="players" (click)="goToPlayersDashboard()"><a href="javascript:void(0);">Players</a></li>\n        <li class="comment" (click)="goToChatDashboard()"><a href="javascript:void(0);">Comments</a></li>\n        <li class="more" (click)="goToMenuPage()"><a href="javascript:void(0);">More</a></li>\n      </ul>\n    </div>\n  </nav>\n</ion-footer>\n'/*ion-inline-end:"/Users/amithsnair/Documents/association_new/Association-Schoolapps/WestMacNewApp/src/pages/gallery-timeline/gallery-timeline.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_base64_ngx__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera_ngx__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_ngx__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path_ngx__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_9__providers_global_functions_global_functions__["a" /* GlobalFunctionsProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_global_api_global_api__["a" /* GlobalApiProvider */]])
    ], GalleryTimelinePage);
    return GalleryTimelinePage;
}());

//# sourceMappingURL=gallery-timeline.js.map

/***/ })

});
//# sourceMappingURL=58.js.map