import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

/**
 * Generated class for the ChatViewImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let cordova:any;

@IonicPage()
@Component({
  selector: 'page-chat-view-image',
  templateUrl: 'chat-view-image.html',
})
export class ChatViewImagePage {
  image: any;
  // fileTransfer: FileTransferObject = this.transfer.create();

  constructor(private navCtrl: NavController, 
    private navParams: NavParams, 
    private global: GlobalProvider, 
    private gFn:GlobalFunctionsProvider,
    private plt: Platform,
    private androidPermissions: AndroidPermissions,
    // private transfer: FileTransfer
    ) {
    plt.ready().then(()=>{
      plt.registerBackButtonAction(()=>{
        this.close();
      });
    });
  }

  ionViewDidLoad() {
    this.image = this.navParams.get('image');
  }

  close(){
    this.navCtrl.pop();
  }

  // private async download(){
  //   const imageURL = this.global.MESSAGEIMAGE + this.image;
  //   let targetPath = await this.getDownloadPath();
  //   this.fileTransfer.download(imageURL, targetPath + this.image).then((entry) => {
  //     this.gFn.presentToast('File download complete');
  //   }, (error) => {
  //     this.gFn.presentToast('Error in file download');
  //   });
  // }

  private async getDownloadPath() {
    if (this.plt.is("ios")) {
      return cordova.file.documentsDirectory;
    }

    // To be able to save files on Android, we first need to ask the user for permission. 
    // We do not let the download proceed until they grant access
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(result => {
      if (!result.hasPermission) {
        return this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
      }
    });

    return cordova.file.externalRootDirectory + "/Download/";
  }

}
