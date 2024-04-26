import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    private signupForm: FormGroup;
    constructor(public navCtrl: NavController, public navParams: NavParams,
         private http: HttpClient, private formBuilder: FormBuilder, public events: Events, 
          public global: GlobalProvider, private loadingCtrl: LoadingController) 
    {
        this.signupForm = this.formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
          });
    }
    SignUp(){
        let loading = this.loadingCtrl.create();
        loading.present();

        let SignUpData = new HttpParams({ fromObject: this.signupForm.value });
        this.http.post<any>(this.global.APIURL + 'users/userRegister', SignUpData)
        .subscribe(response => {
            this.navCtrl.pop();
            loading.dismiss();
            alert("SignUp Successfull")
        }, error => {
            loading.dismiss();
            alert("Error While SignUp");
        });


    }
}