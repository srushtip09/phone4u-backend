const mongoose=require('mongoose')
const {Schema}=mongoose

const phoneSchema= new Schema(
    {
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        portfolio:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        }
    }
)
module.exports=mongoose.model('Phone',phoneSchema)