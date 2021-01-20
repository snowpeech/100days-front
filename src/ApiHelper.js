import axios from 'axios';

class ApiHelper {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
      const token = window.localStorage.getItem('_token');
        
      paramsOrData._token = token;
      // console.debug("API Call:", endpoint, paramsOrData, verb);
  
      try {
        return (await axios({
          method: verb,
          url: `http://localhost:3001/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData})).data;
          // axios sends query string data via the "params" key,
          // and request body data via the "data" key,
          // so the key we need depends on the HTTP verb
      }
  
      catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }

    // static async getCompany(handle) {
    //   let res = await this.request(`companies/${handle}`);
    //   return res.company;
    // }
    
    static async getUser(user_id) {
      let res = await this.request(`users/${user_id}`);
      return res.user;
    }
    static async getUserGoals(){
      //user information is decoded from token
      let res = await this.request(`goals`);
      console.log("GET USER GOALS RES", res)
      return res
    }

    static async login(email,password){
      let res = await this.request('users/login',{email, password},"post");
      return res._token;
    }

    static async signup(email, password, first_name,last_name){
      let res = await this.request('users',{email, password, first_name, last_name},"post");
      
      return res._token;
    }

    static async editProfile(username, password, first_name, last_name, email=undefined, photo_url=undefined){
      let res = await this.request(`users/${username}`,{ password, first_name, last_name, email, photo_url},"patch");
      
      return res.user;
    }

    // static async applyToJob(id, username){
    //   let res = await this.request(`jobs/${id}/apply`,username,"post");
    //   return res.message;
    // }
  }

export default ApiHelper;