import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userProfile: UserProfile;
  constructor() {
    this.userProfile = new UserProfile();
  }

  setUserProfile(userInfo: UserProfile) {
    this.userProfile = new UserProfile();
    this.userProfile = userInfo;
  }
  getUserProfile() {
    return this.userProfile;
  }
}
