import { AUTH_LINK } from "./constants";
class Auth{

    _getResFromServer() {
        return ((data) => {
          if (data.ok) {
            return data.json();
          }
          return Promise.reject(`Ошибка:${data.status}`)
        })
    }
    login({email,password}){
        console.log(JSON.stringify({password,email}))
        return fetch(AUTH_LINK,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({password:`${password}`,email:`${email}`})

        }).then(this._getResFromServer())
    }
        
  
}
const auth = new Auth();

function verifiedToken(jwt){
    return fetch(`https://auth.nomoreparties.co/users/me`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${jwt}`,
            "Content-Type": "application/json; charset=UTF-8",
            
        }

    }).then(res => {
        if(res.ok){
            return res.json()
        }
    }).catch(res => {
        console.error(res)
    })

}
export {verifiedToken}
export {auth}

