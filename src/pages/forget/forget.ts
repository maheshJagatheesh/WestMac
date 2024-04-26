import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
    private forgetForm: FormGroup;
    
    constructor(public navCtrl: NavController, public navParams: NavParams,
         private http: HttpClient, private formBuilder: FormBuilder,
           public events: Events, public global: GlobalProvider,
           private loadingCtrl: LoadingController,
           public global_api:GlobalApiProvider) 
    {
        this.forgetForm = this.formBuilder.group({
            username: new FormControl('', Validators.required),
          });
    }
    forgotPassword(){
        let loading = this.loadingCtrl.create();
        loading.present();

        let PasswordData = new HttpParams({ fromObject: this.forgetForm.value });
        this.http.post<any>(this.global.APIURL + 'users/ResetPassword', PasswordData,{headers:this.global_api.getHeader()})
        .subscribe(response => {
            if(response.RESETPASSWORD){
                this.navCtrl.pop();
                loading.dismiss();
                alert("Password sent to your mail")
            }
            else{
                loading.dismiss();
                alert("Error While Sending password");
            }
        }, error => {
            loading.dismiss();
            alert("Error While Sending password");
        });
    }
    goBack(){
        this.navCtrl.pop()
    }
}