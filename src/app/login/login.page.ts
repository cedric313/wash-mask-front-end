import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../User';
import {UserService} from '../services/user.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthGuardService} from '../services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: User = new User("", "",true);
    isAccountExist: boolean = true;
    isNeedNewPassword: boolean = false;
    signInValidator: any;
    createAccountValidator: any;
    forgetPasswordValidator: any;
    private isLoading: boolean = false;


    constructor(private router: Router,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private toastController: ToastController,
                private authGuardService: AuthGuardService,
                public loadingController: LoadingController) {

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
        userToSignIn.authError = this.user.authError;
        this.present();
        console.log(userToSignIn);
        const subscription = this.userService.signIn(userToSignIn).subscribe(
            value => {
                this.userService.user = value
            },
            error => {
                this.presentToast(error.error.message,2000),
                this.dismiss()
            },
            () => {
                this.checkIfIsConnected(this.userService.user.authError),
                    this.dismiss();
                subscription.unsubscribe()
            });
    }

    createAccount() {
        let userToLog: User = new User();
        userToLog.email = this.user.email;
        userToLog.password = this.user.password;
        userToLog.pseudo = this.user.pseudo;
        this.present();
        const subscription = this.userService.createAccount(userToLog).subscribe(
            value => {this.userService.user = value,
            console.log(value)},
            error => {
                this.presentToast(error.error.message,2000),
                this.dismiss();
            },
            () => {
                console.log(this.user.authError),
                    this.checkIfIsConnected(this.userService.user.authError),
                    this.presentToast('Account created, please check your Mail box', 2000),
                    this.dismiss(),
                    subscription.unsubscribe()
            });
    }

    checkIfIsConnected(userError) {
        if (userError === true) {
            console.log(userError);
            this.presentToast("connexion impossible probléme de mot de passe",2000)
            return console.log("connection failed", "je passe dans le true");

        } else {
            console.log(this.user , "je passe dans le false");
            this.authGuardService.isAuthenticated = true;
            this.router.navigateByUrl('/home');
            this.presentToast("connected", 2000)
            return console.log("connected");
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
        this.present();
        const subscription = this.userService.getForgetPassword(userToGetPassword).subscribe(
            value => {
                messageToast = value
            },
            error => {
                this.presentToast(error.error.message,2000),
                this.dismiss();
            },
            () => {
                this.presentToast(messageToast, 2000),
                    this.isNeedNewPassword = false,
                    this.dismiss();
                    subscription.unsubscribe()
            }
        )
    }

    async presentToast(message: string, duration?: number) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration
        });
        toast.present();
    }

    async present() {
        this.isLoading = true;
        return await this.loadingController.create({
            // duration: 5000,
        }).then(a => {
            a.present().then(() => {
                console.log('presented');
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }

    async dismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
}





