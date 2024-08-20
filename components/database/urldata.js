import mongoose from "mongoose";
const urlschema=mongoose.Schema({

    bigurl:{
        type:String,
        required:true
    },
    smallurl:{
        type:String,
        required:true
    },
    click:{
        type:Number,
        default:0,
        
    
    },


})

let urlmodel=mongoose.model('urluser', urlschema)



export default urlmodel