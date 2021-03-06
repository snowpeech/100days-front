import axios from 'axios';

class ApiHelper {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
      const token = window.localStorage.getItem('_token');
      //sets the token: 
      paramsOrData._token = token;
      console.debug("API Helper:", endpoint, paramsOrData, verb);
  
      try {
        return (await axios({
          method: verb,
          url: `http://localhost:3001/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData})).data;// tried removing this because we're not using a query string..
          // ["data"]:paramsOrData})).data;// just trying to send data.
          // axios sends query string data via the "params" key,
          // and request body data via the "data" key,
          // so the key we need depends on the HTTP verb
      }
  
      catch(err) {
        console.error("API Error:", err.response); 
        // console.log("WHTWOEIRJL:WEIWJH", err.response.data.error.message)
        let message = err.response.data.error.message;
        if(err.response.status === 400){
          alert(err.response.data.error.message)  
        }
        
        throw Array.isArray(message) ? message : [message];
      }
    }


    static async deleteRequest(endpoint, paramsOrData = {}) {
      const token = window.localStorage.getItem('_token');
      //sets the token: 
      paramsOrData._token = token;
      console.debug("API Helper:", endpoint, paramsOrData);
  
      try {
        return (await axios({
          method: "delete",
          url: `http://localhost:3001/${endpoint}`,
          "params": paramsOrData})).data;
      } catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }

    /*User actions */
    static async getUserGoals(){
      //user information is decoded from token
      let res = await this.request(`goals`);
      console.log("GET USER GOALS RES", res)
      return res
    }
    
    static async getUser(user_id) {
      let res = await this.request(`users/${user_id}`);
      return res.user;
    }
    
    static async login(email,password){
      let res = await this.request('users/login',{email, password},"post");
      console.log("APIHELPER LOGIN TOKEN", res)
      return res._token;
    }
    
    static async signup(email, password, first_name,last_name){
      let res = await this.request('users',{email, password, first_name, last_name},"post");
      
      return res._token;
    }
    
    static async editProfile(user_id,first_name,last_name, location){
      // console.log("EDIT PROFILE. checking rest operator here", userFields)
      let res = await this.request(`users/${user_id}`,{first_name,last_name, location},"patch");
      
      return res.user;
    }

    static async deleteUser(user_id){
      let res = await this.deleteRequest(`users/${user_id}`)
      return res;
    }
        
    /*Day-post actions */
    static async getDayPosts(goalId,day){
      //gets posts related to goalid, day, good for Today
      let res = await this.request(`posts/${goalId}/${day}`)
      console.log("API HELPER RES", res)
      return res;
    }

    static async getTenDay(goalid,day){
      let res = await this.request(`posts/${goalid}/${day}/tendays`)
      console.log("TENDAY APIHELPER RES", res)
      return res;
    }

    static async getMetrics(goalId,day){
      //gets PM metrics for past 10 days from the date passed in (inclusive)
      let res = await this.request(`posts/${goalId}/${day}/metrics`)
      console.log("API HELPER getMetrics RES", res)
      return res;
    }

    static async getRecentPosts(goalId){
      //gets recent posts related to a goalid
      let res = await this.request(`posts/${goalId}/latest`)
      console.log("API HELPER RES getRECENT", res)
      return res;
    }
    
    static async createPost(goalId, day,postType, postObj){    
      let res = await this.request(`posts/${goalId}/${day}/${postType}`,postObj, "post")
      console.log(res)
      return res;
    }
    
    static async editPost(goalId,day,postType, postObj){
      let res = await this.request(`posts/${goalId}/${day}/${postType}`,postObj, "patch")
      console.log(res)
      return res;
    }
    
    static async deletePost(goalId,day,postType){
      let res = await this.deleteRequest(`posts/${goalId}/${day}/${postType}`)
      console.log("DELTE POST RES", res)
      return res;
    }

    /*Goal actions */
    static async createGoal(goal, start_day, user_def1, user_def2, user_def3){
      let res = await this.request(`goals`,{goal, start_day, user_def1, user_def2, user_def3},"post");
      //should return updated token
      console.log("CREATE GOAL RES",res)
      return res
    }

    static async updateGoal(goalId, goalObj){
      console.log("API HELPER UPDATE GOAL", goalId, goalObj)
      let res = await this.request(`goals/${goalId}`, goalObj,"patch")
      console.log(res)
      return res;
    }

    static async deleteGoal(goalId){
      console.log("API HELPER DELETE GOAL", goalId)
      let res = await this.deleteRequest(`goals/${goalId}`)
      console.log(res)
      return res;
    }
    
  }
    
    export default ApiHelper;