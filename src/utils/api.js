class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  _getResFromServer() {
    return ((data) => {
      if (data.ok) {
        return data.json();
      }
      return Promise.reject(`Ошибка:${data.status}`)
    })
  }
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: this._headers.token,
        "Content-Type": "application/json",
      },
    })
      .then(this._getResFromServer())
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me/`, {
      method: "GET",
      headers: {
        authorization: this._headers.token,
        "Content-Type": "application/json",
      },
    })
      .then(this._getResFromServer())
  }
  updateUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    })
      .then(this._getResFromServer())
  }
  setCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._headers.token,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    })
      .then(this._getResFromServer())
  }

  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.token,
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(this._getResFromServer())
  }

  likeCard({_idCard,userData}) {
    return fetch(`${this._url}/cards/${_idCard}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._headers.token,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body:JSON.stringify(userData)

    })
      .then(this._getResFromServer())

  }

  removeLike({ _idCard,userData }) {
    return fetch(`${this._url}/cards/${_idCard}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.token,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body:JSON.stringify(userData)
    })
      .then(this._getResFromServer())
  }

  updateAvatar({link}) {
    return fetch(`${this._url}/users/me/avatar`,{
      method:"PATCH",
      headers: {
        authorization: this._headers.token,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body:JSON.stringify({avatar:link})
    })
    .then(this._getResFromServer())
  }
}
const headers = {
  token:'c5441015-f46a-42d4-9fdb-e128e5e29cd3',
}



const api = new Api({ url:'https://mesto.nomoreparties.co/v1/cohort-50',headers:headers})

export { api };
