export class UserInfo {
   constructor({ name, about }) {
      this._name = document.querySelector(name);
      this._about = document.querySelector(about);
   }

   getUserInfo() {
      this._userInfo = {}
      this._userInfo.name = this._name.textContent,
         this._userInfo.about = this._about.textContent
      return this._userInfo;
   }

   setUserInfo({ name, about }) {
      this._name.textContent = name;
      this._about.textContent = about;
   }
}