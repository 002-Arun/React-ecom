import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
 Client = new Client();
 account;
 
 constructor() {
     this.Client
         .setEndpoint(config.appwriteUrl)
         .setProject(config.appwriteProjectId)   
         this.account = new Account() ;

 }
 async createAccount({email , password , name}){
    try {
        const userAccount = await this.account.create(ID.unique() , email , password , name)
        if (userAccount) {
            this.loginAccount({email , password})
        } else {
            return userAccount
        }
    } catch (error) {
        throw error;
    }
 }

 async loginAccount({email , password}){
    try {
       return await this.account.createEmailSession(email , password)
    }
    catch{
        throw error;
    }
 }
 async getCurrentUser(){
    try {
       return await this.account.get()
    } catch (error) {
        throw error;
    }

    return null
 }

 async logout(){
    try {
       return await this.account.deleteSessions()
    } catch (error) {
        throw error;
    }
 }
}

const authService = new AuthService();

export default authService

