import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, Platform, ToastController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64/ngx';
import { GlobalProvider } from '../../providers/global/global';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the GalleryTimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let cordova: any;
@IonicPage()
@Component({
  selector: 'page-gallery-timeline',
  templateUrl: 'gallery-timeline.html',
})
export class GalleryTimelinePage{
  private loggedInUserData: any;
  private photosByMonths: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public storage: Storage,
    private base64: Base64,
    private loadingCtrl: LoadingController,
    public global: GlobalProvider,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public platform: Platform,
    private file: File,
    private filePath: FilePath,
    public toastCtrl: ToastController,
    public gFn:GlobalFunctionsProvider,
    public global_api:GlobalApiProvider
  ) {
    
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
      this.loadTimelinePhotos();
    });
  }

  goToGalleryEvents() {
    this.navCtrl.push('GalleryEventsPage');
  }

  goToGalleryAlbums() {
    //this.navCtrl.push('GalleryAlbumsPage');
  }

  goToGalleryTimelineDetails() {
    this.navCtrl.push('GalleryTimelineDetailsPage');
  }

  private loadTimelinePhotos(){
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID);
    this.http.post<any>(this.global.APIURL + 'galleries/getTimeLinePhoto', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          for(let key in response.GETTIMELINEPHOTO){
            this.photosByMonths.push(response.GETTIMELINEPHOTO[key]);
          }
        }
      }, error => {
        loading.dismiss();
      });
  }

  public addGalleryImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'From Gallery',
          icon: 'cloud-upload',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'From Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
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
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
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
      }
    }, (err) => {
      this.presentToast(err);
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.uploadImage(newFileName);
    }, error => {
      this.presentToast(error);
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  uploadImage(fileName) {
    let targetPath = this.pathForImage(fileName);
    this.base64.encodeFile(targetPath).then((base64File: string) => {
      this.uploadPhoto(encodeURIComponent(base64File));
    }, (err) => {
      this.presentToast(err);
    });
  }

  uploadPhoto(galleryImage) {
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('uploadImage', galleryImage);
    this.http.post<any>(this.global.APIURL + 'galleries/uploadGalleryPhoto', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        if (response.SUCCESS) {
          this.presentToast('Image uploaded successfully.');
        } else {
          this.presentToast('Sorry, image upload error.');
        }
      }, error => {
        loading.dismiss();
        this.presentToast('Sorry, image upload error.');
      });
  }

}
