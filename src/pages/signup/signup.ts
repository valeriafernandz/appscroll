import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  myForm: FormGroup;
  usuario = {name:'', email:'', username:'', password:'', status: '', species:'', gender:'', origin:'',location:''}
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativeStorage: NativeStorage,
    public formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      username:['',Validators.required],
      password: ['',Validators.required],
      status: ['',Validators.required],
      species: ['',Validators.required],
      gender: ['',Validators.required],
      origin: ['',Validators.required],
      location: ['',Validators.required],

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.nativeStorage.keys().then(keys => console.log(keys));
  }

  Available(): Promise<boolean>{
    return this.nativeStorage.keys().then(keys=>
    keys.some(key=> (this.usuario.username ===key)));
  }

  signup(){
    console.log("Name:" + this.myForm.value.name);
    console.log("Email:" + this.myForm.value.email);
    console.log("Username:" + this.myForm.value.username);
    console.log("Password:" + this.myForm.value.password);

    this.nativeStorage.setItem(this.usuario.username,this.usuario).then(
      ()=> {
        console.log("stored user");
        
        this.navCtrl.push(HomePage);
      },
      error => console.error("Error registering user",error)
    );
  }

}
