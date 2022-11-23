const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const {Schema}=mongoose

const userSchema= new Schema(
    {
        name:{
            type:String,
            required:true
        },
         email:{
            type:String,
            required:true,
            unique:true
        },
        token:{
            type:String,
            required:true

        },
        password:{
            type:String,
            required:true

        },
        image:{
            type:String,
            required:false
        },
        phones:[{
            type:mongoose.Types.ObjectId,
            required:false,
            ref:'phone'
        }]
       
        
    }
)
userSchema.plugin(uniqueValidator)
module.exports=mongoose.model('User',userSchema)