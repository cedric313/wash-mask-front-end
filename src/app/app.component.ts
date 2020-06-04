import {Component, OnInit} from '@angular/core';

import {AlertController, Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {AuthGuardService} from './services/auth-guard.service';
import {TokenStorageService} from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  navigate : any;
  userPseudo: any;

    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username: string;

  sideMenu() {
    this.navigate =
        [
          {
            title : "Family",
            url   : "family",
            icon  : "people-outline"
          },
          {
            title : "My Account",
            url   : "my-account",
            icon  : "person-circle-outline"
          },
          {
            title: "Disconnect",
            icon : "log-out-outline"
          }
        ]
  }
  constructor(
      private tokenStorageService: TokenStorageService,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private router: Router,
      private userService: UserService,
      private alertCtrl: AlertController,
      private toastController: ToastController,
      private authGuardService: AuthGuardService
  ) {
    this.userPseudo = this.userService.user.email;
    this.sideMenu();
    this.initializeApp();
  }

  ngOnInit() {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if (this.isLoggedIn) {
          const user = this.tokenStorageService.getUser();
          this.roles = user.roles;

          this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
          this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

          this.username = user.username;
      }
  }

    initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('login');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onDisconnect(){
      this.showAlertDeletedMask();
  }

    logout() {
        this.tokenStorageService.signOut();
    }

    async showAlertDeletedMask() {
        const confirm = await this.alertCtrl.create({
            header: 'Disconnect',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Confirm Cancel');

                    }
                },
                {
                    text: 'Okay',
                    handler: () => {
                        let user = {
                            id:"-1",
                            email: "",
                            password:"",
                            pseudo:"",
                            authError:"true",
                            isActive:"",
                            username:"",
                            role:"",
                            familyMembers: [
                                {
                                    firstName:"",
                                    masks: [
                                        {
                                            name:"",
                                            numberWash: "",
                                            maxWashingMask:"",
                                            isOver:""
                                        }
                                    ]
                                }
                            ],
                        };
                        console.log(this.userService.user);
                        this.userService.user = user;
                        console.log(this.userService.user);
                        this.authGuardService.isAuthenticated = false;
                        this.router.navigateByUrl('login')
                        this.logout();
                        this.presentToast('Disconnected');
                    }
                }
            ]
        });
        await confirm.present();
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
}


