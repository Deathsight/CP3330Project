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

  findByName = async username => {
    // console.log(id);
    const response = await this.authFetch(
      `/api/${this.entity}?username=${username}`
    );
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      return json;
    }
  };

  findByQuery = async query => {
    // console.log(id);
    const response = await this.authFetch(`/api/${this.entity}?query=${query}`);
    console.log("response:" + response);
    const json = await response.json();
    console.log("json:" + json);
    if (response.ok) {
      return json;
    }
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

  remove = async Id => {
    const response = await this.authFetch(`/api/${this.entity}/${Id}`, {
      method: "DELETE"
    });
    // const json = await response.json()
    // console.log('json',json)
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
  Emails: new Entity("Emails")
};

export default DB;
