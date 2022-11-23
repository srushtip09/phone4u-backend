const HttpError=require('../errors/http-error')
const {v4: uuidv4}=require('uuid')
const {validationResult}=require('express-validator')
const Phone=require('../../modals/phone')
const User=require('../../modals/user')
const { default: mongoose } = require('mongoose')
const getphoneById=async(req,res,next)=>{

    const phoneID=req.params.pid
    let phone;
    try{
         phone=await Phone.findById(phoneID)
    }
    catch{
        return next (new HttpError('Could not connect to database',422))
    }

    if(!phone)
    {
        return next ( new HttpError('Could not find phone with given id',404))
    }

    res.status(200)
    res.json({phone:phone.toObject({getters:true})})



}
const getAllphone=async(req,res,next)=>{
    let phone;
    try{    
    phone=await Phone.find({})
    }
    catch{
        return next(new HttpError('Could not connect to databse'),422)
    }
   
    res.status(200)
    res.json({phones:phone.map((d)=>d.toObject({getters:true}))})
}


const createphone=async(req,res,next)=>{
    const {name,image,price,portfolio,brand}=req.body
    const error=validationResult(req)
    if(!error.isEmpty())
    {
        return next (new HttpError("Invalid details provided",501))
    }

    const phone= new Phone(
        {
            name,
            image,
            price,
            portfolio,
            brand
        }

    )
//let user;
        console.log(phone)
   try{
    //user=await User.findById(creator)
    await phone.save();
   }
   catch{
    return next (new HttpError("Could not connect to database",501))
   }
//    if(!user){
//     return next (new HttpError("Invalid user",404))
//    }
   console.log(phone)
   
    res.status(201)
    res.json({phone:phone.toObject({getters:true})})
}
const updatephoneById=async(req,res,next)=>{
  
    const {name,image,price,portfolio,brand}=req.body
    const phoneID=req.params.pid
    const error=validationResult(req)
    if(!error.isEmpty())
    {
        throw new HttpError("Invalid details provided",501)
    }
    
    let phone;
    try{
         phone=await Phone.findById(phoneID)
    }
    catch{
        return next (new HttpError('Could not connect to database',422))
    }
    if(!phone)
    {
       throw new HttpError('Could not find phone for given id',404)
    }

   

    try{
        phone.name=name
        phone.image=image
        phone.price=price
        phone.portfolio=portfolio
        phone.brand=brand
        await phone.save();
    }
    catch{
        return next(new HttpError('Could not save to database'),422 )
    }
   
    res.status(200)
    res.json({phone:phone.toObject({getters:true})})

}
const deletephoneById=async(req,res,next)=>{
    const phoneID=req.params.pid
    let phone;
    console.log(phoneID)
    try{
    phone = await Phone.deleteOne({
        id:phoneID
    })
    console.log(phone)
    
    }
    catch{
        return next(new HttpError('Could not connect  to database'),422 )
    }
    if(!phone)
    {
        return next( new HttpError('Could not find a phone for given id'),404)
    }
    
    res.status(200)
    res.json({"message":"deleted phone"})
}

exports.getphoneById=getphoneById
exports.createphone=createphone
exports.updatephoneById=updatephoneById
exports.deletephoneById=deletephoneById
exports.getAllphone=getAllphone