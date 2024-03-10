import config from "../config/config.js";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage - new Storage(this.client)
    }
    
    async createPost ({title, slug, content, featuredImage, status , userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaceId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage,
                    status,
                    userId
                }

            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
        }
    }

    async updatePost(slug ,{title, content, featuredImage, status }){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaceId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error)
        }
    }
    
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                 config.appwriteDatabaceId,
                 config.appwriteCollectionId,
                 slug
               )
               return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error)
            return false
        }
    }
    async gitPost(slug){
        try {
            return await this.databases.deleteDocument(
                 config.appwriteDatabaceId,
                 config.appwriteCollectionId,
                 slug
               )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error)
            return false
        }
    }

    async gitAllPost(queries = [Query.equal("status","active")]){
        try {
            await this.databases.listDocuments(
                config.appwriteDatabaceId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: gitAllPost :: error", error)
            
        }
    }

    async uploadFile (file){
        try {
            return await this.databases.listDocuments(
                config.appwriteBucketId,
                ID.unique()
            )
        } catch (error) {
          console.log("Appwite Service :: uploadFile :: error", error);
          return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwite Service :: uploadFile :: error", error);
        }
    }
  gitFilePreview(){
        return this.bucket.gitFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
   
    
}

const service = new Service();

export default service