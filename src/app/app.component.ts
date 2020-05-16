import {Component} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent{
  navigate : any;
  userPseudo: any;

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
            title : "Masks",
            url   : "mask",
            icon  : "happy-sharp"
          },
        ]
  }
  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private router: Router,
      private userService: UserService
  ) {
    this.userPseudo = this.userService.user.email;
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('login');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


}
