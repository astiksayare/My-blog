import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)

        // Making Account
        this.account = new Account(this.client);
    }

    // Method to create an Account
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount){
                // Login into the account
                return this.login({email, password});
            }else {
                return userAccount;
            }

        } catch (error) {
            console.log("Appwrite Service :: Create Account Error :: "+ error);
        }
    }

    // Method to Log into the users account
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite Service :: Login Account Error :: " + error);
        }
    }

    // Method to log out form the users account
    async logout(){
        try {

            await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Appwrite Service :: Logout Account Error :: "+ error);
        }
    }

    // Method to check weather user is login or logout.
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: Current Account Error :: "+ error);
        }
    }

}

const authService = new AuthService();

export default authService;