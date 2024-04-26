import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule  } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { MyApp } from './app.component';
import { GlobalProvider } from '../providers/global/global';
import { SMS } from '@ionic-native/sms/ngx';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
// import { FileTransfer } from '@ionic-native/file-transfer';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ScrollingHeaderModule } from 'ionic-scrolling-header'
// import * as firebase from "firebase/app";
import { EventLoggerProvider } from '../providers/event-logger/event-logger';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
// import { Firebase } from '@ionic-native/firebase/ngx';
import { TabsPage } from '../pages/tabs/tabs';
import { Calendar } from '@ionic-native/calendar/ngx';
import { DisplayEventsPage } from '../pages/display-events/display-events';
import { DisplayEventsNewPage } from '../pages/display-events-new/display-events-new';
import { EventHomePage } from '../pages/event-home/event-home';
//import { EventHomeNewPage } from '../pages/event-home-new/event-home-new';
import { EventHomeMenuPage } from '../pages/event-home-menu/event-home-menu';
import { ChatDashboardPage } from '../pages/chat-dashboard/chat-dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { PlayersDashboardPage } from '../pages/players-dashboard/players-dashboard';
import { GlobalFunctionsProvider } from '../providers/global-functions/global-functions';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { GlobalApiProvider } from '../providers/global-api/global-api';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ChooseTeamProfilePage } from '../pages/choose-team-profile/choose-team-profile';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MessageLogDashboardPage } from '../pages/message-log-dashboard/message-log-dashboard';
import { AlertDashboardPage } from '../pages/alert-dashboard/alert-dashboard';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AlertDashboardPageModule } from '../pages/alert-dashboard/alert-dashboard.module';
import { ChatDashboardPageModule } from '../pages/chat-dashboard/chat-dashboard.module';
import { Push } from '@ionic-native/push/ngx';
import { PipesModule } from '../pipes/pipes.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { GetStartedPageModule } from '../pages/get-started/get-started.module';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SecureStorage } from '@ionic-native/secure-storage/ngx';

//  import { Push } from '@ionic-native/push';
// import { Badge }from '@ionic-native/badge/ngx';
// import { Deeplinks } from '@ionic-native/deehomeplinks';
// import { FCM } from '@ionic-native/fcm/ngx';
// var config = {
//   apiKey: "AIzaSyC3EgL_fWuSZN3lNeu6E9QacbqHWXGrvV4",
//   authDomain: "pulteney-ac45f.firebaseapp.com",
//   databaseURL: "https://pulteney-ac45f.firebaseio.com",c
//   projectId: "pulteney-ac45f",
//   storageBucket: "pulteney-ac45f.appspot.com",
//   messagingSenderId: "226231413267"
// };
// firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    EventHomePage,
    DisplayEventsPage,
    SettingsPage,
    PlayersDashboardPage,
    //ChatDashboardPage,
    //EventHomeNewPage,
    EventHomeMenuPage,
    DisplayEventsNewPage,
    MessageLogDashboardPage,
    //AlertDashboardPage,
    //EventDashboardPage,
  ],
  imports: [ 
    MbscModule, 
    TabsPageModule,
    FormsModule, 
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      animate: false, // disable animation
      swipeBackEnabled: false,
     }),
    LazyLoadImageModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['sqlite', 'websql','indexeddb']
    }),
    HttpClientModule,
    NgCircleProgressModule,
    ScrollingHeaderModule,
    AlertDashboardPageModule,
    ChatDashboardPageModule,
    PipesModule,
    GetStartedPageModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    EventHomePage,
    DisplayEventsPage,
    SettingsPage,
    PlayersDashboardPage,
    ChatDashboardPage,
    //EventHomeNewPage,
    EventHomeMenuPage,
    DisplayEventsNewPage,
    MessageLogDashboardPage,
    AlertDashboardPage,
    //EventDashboardPage
  ],
  providers: [
     Push,
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    Base64,
    HttpClientModule,
    SMS,
    GlobalProvider,
    // SplashScreen,
    File,
    Camera,
    FilePath,
    // FileTransfer,
    AndroidPermissions,
    Network,
    EventLoggerProvider,
    EmailComposer,
    AppVersion,
    // Firebase,
    GlobalFunctionsProvider,
    Calendar,
    LaunchNavigator,
    InAppBrowser,
    GlobalApiProvider,
    Deeplinks,
    Geolocation,
    BarcodeScanner,
    Vibration,
    Deeplinks,
    Keyboard,
    SecureStorage,
    // Badge,
    //  Push
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {

}
