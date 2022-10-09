export class UserInfo {
   constructor({ nameSelector, aboutSelector, profileAvatarSelector }) {
      this._name = document.querySelector(nameSelector);
      this._about = document.querySelector(aboutSelector);
      this._avatar = document.querySelector(profileAvatarSelector);
   }

   getUserInfo() {
      const userInfo = {
         name: this._name.textContent,
         about: this._about.textContent,
      }
      return userInfo;
   }

   setUserInfo(data) {
      if (data) {
         this._name.textContent = data.name;
         this._about.textContent = data.about;
         this._avatar.src = data.avatar;
      }
   }
}