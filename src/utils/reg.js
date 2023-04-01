import { REG_LINK } from "./constants";
class Registration{
    _getResFromServer() {
        return ((data) => {
          if (data.ok) {
            return data.json();
          }
          return Promise.reject(`Ошибка:${data.status}`)
        })
      }

    reg({email,password}){
        return fetch(REG_LINK,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email,password})
        }).then(this._getResFromServer())
    }


}
export const register = new Registration();