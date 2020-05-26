import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../User';
import {UserService} from '../services/user.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: User = new User("","");
    isAccountExist: boolean = true;
    isNeedNewPassword: boolean = false;
    signInValidator: any;
    createAccountValidator: any;
    forgetPasswordValidator: any;

  constructor(private router: Router,
              private userService: UserService,
              private loadingController: LoadingController,
              private formBuilder: FormBuilder,
              private toastController: ToastController) {

      this.signInValidator = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
      }),
          this.createAccountValidator = this.formBuilder.group({
              email: ['', Validators.required],
              password: ['', Validators.required],
              pseudo: ['', Validators.required],
          }),
          this.forgetPasswordValidator = this.formBuilder.group({
              email: ['', Validators.required],
          })
  }

  ngOnInit() {

  }
    signIn() {
        let userToSignIn: User = new User();
        userToSignIn.email = this.user.email;
        userToSignIn.password = this.user.password;
        console.log(userToSignIn);
        this.userService.signIn(userToSignIn).subscribe(
            value => {this.userService.user = value},
            error => {console.log(error)},
            () => {this.checkIfIsConnected(this.userService.user.id),
                console.log(this.userService.user),
                this.router.navigateByUrl('home'),
            this.presentToast('Connected',1000)});
    }

  createAccount() {
    let userToLog: User = new User();
    userToLog.email = this.user.email;
    userToLog.password = this.user.password;
    userToLog.pseudo = this.user.pseudo;
      this.userService.createAccount(userToLog).subscribe(
          value => this.userService.user = value,
          error => {},
          () => {this.checkIfIsConnected(this.userService.user.id) , console.log(this.userService.user), this.router.navigateByUrl('home'),
              this.presentToast('Account created, please check your Mail box',2000)});
  }

  checkIfIsConnected(userId){
      if(userId !== -1){
          return console.log("connected");
      } else {
          return console.log("connection failed");
      }
  }

    onForgetPassword() {
        this.isNeedNewPassword = !this.isNeedNewPassword;
    }

    sendPasswordForget() {
      let messageToast: string = "";
        console.log('send password');
        let userToGetPassword = new User();
        userToGetPassword.email = this.user.email;
        this.userService.getForgetPassword(userToGetPassword).subscribe(
            value => {console.log(value),messageToast = value},
            error => {console.log(error)},
            () => {this.presentToast(messageToast,2000),
                this.isNeedNewPassword = false}
        )

    }

    async presentToast(message: string, duration?: number) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration
        });
        toast.present();
    }
}
