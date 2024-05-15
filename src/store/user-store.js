// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4001';
export const useUserStore = defineStore('user', {
//   state: () => {
//     return { count: 0 }
//   },
  // could also be defined as
  state: () => ({ 
    count: 0 ,
    sub: '',
    email: '',
    picture: '',
    firstName:'',
    lastName:''
  }),
  actions: {
    async getUserDatailsFromGoogle(data){
      try {
        let res = await axios.post('/api/google-login', {
          token: data.credential
        })
        this.sub = res.data.sub
        this.email = res.data.email
        this.picture = res.data.picture
        this.firstName = res.data.given_name
        this.lastName = res.data.family_name
      } catch (error) {
        console.log(error);
      }
    },
    logout(){
      this.sub = null;
      this.email = ''
      this.picture = null
      this.firstName = ''
      this.lastName = ''
    }
  },
  persist: true,
})