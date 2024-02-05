import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Method to create the appwrite document.
    async createPost({title, content, featuredImage, status, userID, slug}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, slug, {
                title,
                content,
                status,
                featuredImage,
                userID,
            })
        } catch (error) {
            console.log("Appwrite Service :: Create Post Error :: "+ error);
        }
    }

    // Method to update the appwrite document.
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, slug, {
                title,
                featuredImage,
                content,
                status,
            })
        } catch (error) {
            console.log("Appwrite Service :: Update Post Error :: "+ error);
        }
    }

    // Method to get the document from the appwrite database.
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, slug);
        } catch (error) {
            console.log("Appwrite Service :: Get Post Error :: "+ error);
            return false;
        }
    }

    // Method to get the list of the document from the appwrite database.
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
        return this.databases.listDocuments(conf.appwriteDatabaseID, conf.appwriteCollectionID, queries);  
        } catch (error) {
            console.log("AppWrite Service :: Get Posts Error :: " + error);
            return false;
        }
    }

    // Method to Delete Document from the Database.
    async deletePost(slug){
        try {

            await this.databases.deleteDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, slug);
            return true;
            
        } catch (error) {
            console.log("Appwrite Service :: Delete Post Error :: "+ error);
            return false;
        }
    }

    // Storage Methods

    // Method to upload users file into the Storage. 
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketID, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite Service :: Create File Error :: "+ error);
            return false;
        }
    }


    // Method to delete file from the storage.
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: Delete File Error :: "+ error);
            return false;
        }
    }
    
    // Method to preview file from the storage of the appwrite.
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketID, fileId);
    }

}

const service = new Service();

export default service;