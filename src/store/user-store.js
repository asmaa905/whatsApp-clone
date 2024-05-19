// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import { db } from '@/firebase-init'
import { 
  setDoc, 
  getDoc, 
  doc, 
  getDocs, 
  collection, 
  updateDoc, 
  arrayUnion, 
  onSnapshot,
  query
} from 'firebase/firestore';



axios.defaults.baseURL = 'http://localhost:4001';
export const useUserStore = defineStore('user', {
  state: () => ({ 
    count: 0 ,
    sub: '',
    email: '',
    picture: '',
    firstName:'',
    lastName:'',
    allUsers:[],
    userDataForChat: [],
    showFindFriends:false
  }),
  actions: {
    async checkIfUserExists(id) {
      const docRef = doc(db, "users", id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists()
    },
    async saveUserDetails (res) {
      try {
        await setDoc(doc(db, "users", res.data.sub), {
          sub: res.data.sub,
          email: res.data.email,
          picture: res.data.picture,
          firstName: res.data.given_name,
          lastName: res.data.family_name,
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getAllUsers() {
      try {
      const querySnapshot = await getDocs(collection(db, "users"))
      let results = []
      querySnapshot.forEach(doc => { results.push(doc.data()) })

      if (results.length) {
        this.allUsers = []
        results.forEach(res => { this.allUsers.push(res) })
      }
    } catch (error) {
      console.log(error);
    }
    },

    async getUserDatailsFromGoogle(data) {
      try {
        let res = await axios.post('/api/google-login', {
          token: data.credential
        });
        console.log("res",res)
        let userExist = await this.checkIfUserExists(res.data.sub);
        console.log("userExist",userExist)

        if (!userExist) await this.saveUserDetails(res);
        //  console.log("res",res)
        await this.getAllUsers()
        this.sub = res.data.sub;
        this.email = res.data.email;
        this.picture = res.data.picture;
        this.firstName = res.data.given_name;
        this.lastName = res.data.family_name;
      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      this.sub = null;
      this.email = '';
      this.picture = null;
      this.firstName = '';
      this.lastName = '';
    }
  },

  persist: true,
});