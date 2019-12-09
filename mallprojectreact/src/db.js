class Entity {
  constructor(entity) {
    this.entity = entity;
  }

  // wrapper to include authorization in fetch
  authFetch = (url, options) => {
    const token = localStorage.getItem("token");
    if (token) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token}`;
    }
    console.log(url, options);
    return fetch(url, options);
  };

  findAll = async () => {
    console.log("finding: "+this.entity);
    const response = await this.authFetch(`/api/${this.entity}`);
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      return json;
    }
  };

  findOne = async id => {
    // console.log(id);
    const response = await this.authFetch(`/api/${this.entity}/${id}`);
    const json = await response.json();
    if (response.ok) {
      return json;
    }
  };

  findMany = async (id,query) => {
    // console.log(id);
    const response = await this.authFetch(`/api/${this.entity}/?query=${query}&id=${id}`);
    const json = await response.json();
    if (response.ok) {
      return json;
    }
  };
  

  findByName = async username => {
    // console.log(id);
    const response = await this.authFetch(
      `/api/${this.entity}/${username}/`
    );
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      return json;
    }
  };

  findByQuery = async query => {
    console.log("finding: "+this.entity);
    const response = await this.authFetch(`/api/${this.entity}?query=${query}`);
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      return json;
    }
  };

  generateCode = async email => {
    // console.log(id);
    const response = await this.authFetch(`/api/Users/generateCode?email=${email}`);
    const json = await response.json();
    console.log(json);
    return response;
  };

  verifyCode = async (code,email) => {
    // console.log(id);
    const response = await this.authFetch(`/api/Users/verifyCode?code=${code}&email=${email}`);
    const json = await response.json();
    console.log(json);
    return response;
  };

  editProfile = async item => {
    const response = await this.authFetch(`/api/${this.entity}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    return response.ok;
  };

  create = async item => {
    const response = await this.authFetch(`/api/${this.entity}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });

    console.log("response", response);
    return response.ok;
  };
  bookEvent = async (item,rId,aId) => {
    const response = await this.authFetch(`/api/${this.entity}?ar=${rId}&e=${aId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });

    console.log("response", response);
    return response.ok;
  };
  createEvent = async (item,rId,aId) => {
    const response = await this.authFetch(`/api/${this.entity}?rentingId=${rId}&assetId=${aId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });

    console.log("response", response);
    return response.ok;
  };

  // this function connected wtih Email Controller to send an email using POSST
  SendEmail = async item => {
    const response = await this.authFetch(`/api/${this.entity}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });

    console.log("response", response);
    return response.ok;
  };

  UploadImage = async item => {
    const response = await this.authFetch(`/api/${this.entity}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(item)
    });

    console.log("response", response);
    return response.ok;
  };

  edit = async (id, item) => {
    const response = await this.authFetch(`/api/${this.entity}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    return response.ok;
  };

  approveRenter = async (id, item) => {
    const response = await this.authFetch(`/api/${this.entity}?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    return response.ok;
  };

  remove = async Id => {
    const response = await this.authFetch(`/api/${this.entity}/${Id}`, {
      method: "DELETE"
    });
    // const json = await response.json()
    // console.log('json',json)
    return response.ok;
  };
  
  editSupportTicket = async (id, email) => {
    const response = await this.authFetch(`/api/${this.entity}/${id}?email=${email}`,{
      method: "PUT"
    });
    return response.ok;
  };
  
  editPark = async item => {
    const response = await this.authFetch(`/api/${this.entity}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    return response.ok;
  };
}

const DB = {
  Advertisements: new Entity("Advertisements"),
  Assets: new Entity("Assets"),
  AssetRentings: new Entity("AssetRentings"),
  AssetRentingEvents: new Entity("AssetRentingEvents"),
  BookingSeats: new Entity("BookingSeats"),
  Cleanings: new Entity("Cleanings"),
  Events: new Entity("Events"),
  Favorites: new Entity("Favorites"),
  FeedBacks: new Entity("FeedBacks"),
  Likes: new Entity("Likes"),
  Logs: new Entity("Logs"),
  News: new Entity("News"),
  Parkings: new Entity("Parkings"),
  Payments: new Entity("Payments"),
  Renters: new Entity("Renters"),
  Rentings: new Entity("Rentings"),
  Roles: new Entity("Roles"),
  Seats: new Entity("Seats"),
  Securities: new Entity("Securities"),
  Services: new Entity("Services"),
  STicketChats: new Entity("STicketChats"),
  STicketTypes: new Entity("STicketTypes"),
  Stores: new Entity("Stores"),
  StorePMs: new Entity("StorePMs"),
  Subscriptions: new Entity("Subscriptions"),
  SubscriptionLevels: new Entity("SubscriptionLevels"),
  SupportTickets: new Entity("SupportTickets"),
  Theaters: new Entity("Theaters"),
  TheaterPMes: new Entity("TheaterPMs"),
  TheaterServices: new Entity("TheaterServices"),
  Users: new Entity("Users"),
  Emails: new Entity("Emails"),
  UploadImages: new Entity("UploadImages"),
  Parkings: new Entity("Parkings")
};

export default DB;
