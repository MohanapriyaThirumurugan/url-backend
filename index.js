import { config } from "dotenv";
import router from "./components/Router/Database.js";
import express from 'express'
import dataconnection from "./components/database/DataConection.js";
import cors from 'cors'


const port=process.env.port||8000

const app=express()
app.use(cors())

dataconnection()
app.use(express.json());

app.use('/',router)
app.listen(port,()=>{
console.log(`${port}  is sucessfully runing`);

})
