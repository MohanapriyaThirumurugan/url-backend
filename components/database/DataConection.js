import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

process.env.databaseconnection
async function dataconnection (){

    try {
   await mongoose.connect(process.env.databaseconnection)
        console.log("data base conntected sucessfully");
        
    }
    
    
     catch (error) {
        console.error("Error connecting to database:", error);

    }
    }
export default dataconnection