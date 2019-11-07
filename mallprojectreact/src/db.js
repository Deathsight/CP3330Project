class Entity{

    constructor(entity){
        this.entity = entity
    }

    // wrapper to include authorization in fetch
    authFetch = (url, options) => {
        const token = localStorage.getItem('token')
        if(token){
            options = options || {}
            options.headers = options.headers || {}
            options.headers.Authorization = `Bearer ${token}`
        }
        console.log(url, options)
        return fetch(url, options)
    }

    findAll = async () => {
        const  response = await this.authFetch(`/api/${this.entity}`)
        const json = await response.json()
        console.log(json)
        if(response.ok){
            return json
        }
    }

    findOne = async (id) => {
        // console.log(id);
        const response = await this.authFetch(`/api/${this.entity}/${id}`);
        const json = await response.json();
        if (response.ok) {
          return json;
        }
      };

    findByName = async (username) => {
        // console.log(id);
        const response = await this.authFetch(`/api/${this.entity}?username=${username}`);
        const json = await response.json();
        console.log(json)
        if (response.ok) {
          return json;
        }
      };

    findByQuery = async (query) => {
        // console.log(id);
        const response = await this.authFetch(`/api/${this.entity}?query=${query}`);
        const json = await response.json();
        console.log(json)
        if (response.ok) {
          return json;
        }
      };

    editProfile = async (item) => {
        const response = await this.authFetch(`/api/${this.entity}`,{
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        return response.ok
    }


    create = async (item) => {
        const response = await this.authFetch(`/api/${this.entity}`,{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })

        console.log('response', response)
        return response.ok
    }

    edit = async (id,item) => {
        const response = await this.authFetch(`/api/${this.entity}/${id}`,{
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        return response.ok
    }

    remove = async (Id) => {
        const  response = await this.authFetch(`/api/${this.entity}/${Id}`,{
            method : 'DELETE',
        })
        // const json = await response.json()
        // console.log('json',json)
        return response.ok
    }
}

const DB = {
    Assets: new Entity('Assets'),
    PricingModels: new Entity('PricingModels'),
    Customers: new Entity('Customers'),
    Bookings: new Entity('Bookings'),
    AssetBookings: new Entity('AssetBookings')
}

export default DB