import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  myForm: FormGroup;
  usuario : any= {name:'', email:'', username:'', password:'', status: '', species:'', gender:'', origin:'',location:'',favorites:[]}
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativeStorage: NativeStorage,
    public formBuilder: FormBuilder,
    private storage:Storage
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
    this.storage.get("loggedIn").then((loggedIn)=>{
      if(loggedIn){
        this.navCtrl.setRoot(ProfilePage);
      }
    })
    
   
  }


  signup(){
    console.log("Name:" + this.myForm.value.name);
    console.log("Email:" + this.myForm.value.email);
    console.log("Username:" + this.myForm.value.username);
    console.log("Password:" + this.myForm.value.password);


      Object.keys(this.usuario).map((key)=>{
        console.log("key to store: "+key);
        if(key!=="favorites"){
        this.usuario[key]=this.myForm.value[key];
        }else{
          this.usuario[key]=[];
        }
      })
    this.nativeStorage.setItem(this.usuario.username,this.usuario).then(
      ()=> {
        console.log("stored user"+this.usuario);
        
        this.navCtrl.setRoot(LoginPage);
      },
      error => console.error("Error registering user",error)
    );
  }

}
