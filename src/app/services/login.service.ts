import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iexample } from '../models/iexample';
import { UserProfile } from '../models/user-profile';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { Md5 } from 'ts-md5';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userProfile: UserProfile;
  // Variable de session observable
  logged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: Iexample = {
    name: 'Edd',
    id: 'dasasdsadsad',
    token: '--sasas-sasas---'
  };
  constructor(private http: HttpClient, private userService: UserService) {}
  setAuth(newState: boolean) {
    this.logged.next(newState);
  }
  isAuth() {
    return this.logged.value;
  }
  setProfile(googleProfile: any) {
    const setProfilePromise = new Promise((resolve, reject) => {
      try {
        this.userProfile = new UserProfile();
        this.userProfile.name = googleProfile.getGivenName();
        this.userProfile.lastname = googleProfile.getFamilyName();
        this.userProfile.email = googleProfile.getEmail();
        this.userProfile.img = googleProfile.getImageUrl();
        this.userProfile.tokenGoogle = googleProfile.token;
        this.setUserInfoOnStorage(this.userProfile);
        this.userService.setUserProfile(this.userProfile);
        resolve({ ok: true, mssg: 'ok' });
      } catch (err) {
        reject({ ok: false, err });
      }
    });
    return setProfilePromise;
  }
  async logOut() {
    await localStorage.removeItem('userInfo');
    this.userProfile = undefined;
    this.setAuth(false);
  }
  loginUserAndPassword(loginData: LoginRequest) {
    const promiseLoginUP = new Promise((resolve, reject) => {
      // Hashing password base64 y md5 -> en el server se usa BCrypt para realizar hashSync o CampareSync
      //
      loginData.password = btoa(Md5.hashStr(loginData.password) as string);
      this.http
        .post(
          'https://backend3carabelas.herokuapp.com/api/users/login',
          loginData
        )
        .toPromise()
        .then((response: any) => {
          console.log('Respuesta api en heroku: ', response);

          this.userProfile = new UserProfile();
          this.userProfile.name = response.userData.name;
          this.userProfile.lastname = response.userData.lastname;
          this.userProfile.tokenGoogle = '--';
          this.userProfile.tokenApi = response.sessionInfo.token;
          this.userProfile.img = response.userData.image;
          this.userProfile.email = response.userData.email;
          this.setUserInfoOnStorage(this.userProfile);
          this.userService.setUserProfile(this.userProfile);
          return resolve(true);
        })
        .catch(err => {
          reject(false);
        });
    });
    return promiseLoginUP;
  }

  async setUserInfoOnStorage(userInfo: UserProfile) {
    await localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  async getUserInfoFromStorage() {
    const promiseGetStorage = new Promise(async (resolve, reject) => {
      const userInfoSt = await JSON.parse(localStorage.getItem('userInfo'));
      if (userInfoSt) {
        this.userProfile = new UserProfile();
        this.userProfile = userInfoSt;
        this.setAuth(true);
        this.userService.setUserProfile(this.userProfile);
        resolve(true);
      } else {
        this.setAuth(false);
        resolve(false);
      }
    });

    return promiseGetStorage;
  }
}
