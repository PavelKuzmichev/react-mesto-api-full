const onError = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};
export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    addAllCards() {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {headers: {
            ...this._headers,
                authorization:`Bearer ${token}`
            }}).then(onError);
    }
    addCard({name, link}) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                ...this._headers,
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(onError);
    }
    removeCard(data) {
           const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${data}`, {
            method: "DELETE",
            headers: {
                ...this._headers,
                authorization:`Bearer ${token}`
            }
        }).then(onError);
    }
    changeLikeCardStatus(data, isLiked) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${data}/likes`, {
          method: `${isLiked ? 'DELETE' : 'PUT'}`,
          headers: {
            ...this._headers,
            authorization:`Bearer ${token}`
        }
        }).then(onError);
    }
    likeCard(data) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${data}/likes`, {
         method: 'PUT' ,
         headers: {
            ...this._headers,
            authorization:`Bearer ${token}`
        }
        }).then(onError);
    }
    disLikeCard(data) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: "DELETE",
            headers: {
                ...this._headers,
                authorization:`Bearer ${token}`
            }
        }).then(onError);
    }
    addProfileInfo() {
        
            const token = localStorage.getItem('token');
            
        
            return fetch(`${this._url}/users/me`, {headers: {
                ...this._headers,
                authorization:`Bearer ${token}`
            }}).then(onError);
    }

    editProfileInfo(data) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                ...this._headers,
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
        }).then(onError);
    }
    editAvatarIcon(data) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                ...this._headers,
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.avatar
            }),
        }).then(onError);
    }
}
export const api = new Api({
    url: "api.kuzpavel1985.nomoredomains.monster",
    headers: {
          "Content-Type": "application/json",
    },
});


