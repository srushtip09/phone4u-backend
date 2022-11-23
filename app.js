const express=require('express')
const phoneRoutes=require('./routes/phone-routes')
const userRoutes=require('./routes/user-routes')
const bodyParser=require('body-parser')
const app=express();
const mongoose=require('mongoose')
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(bodyParser.json())
app.use('/api/phones',phoneRoutes)
app.use('/api/admin',userRoutes)
app.use((error,req,res,next)=>{

    if(res.headerSent)
    {
      console.log(error)
         return next(error)
    }
    res.status(error.code || 500)
    res.json({message:error.message || "Invalid request"})

})
mongoose.connect('mongodb+srv://srushtipatil:srushp@cluster0.v3dguqh.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    app.listen(5000) 
}).catch((error)=>{
    console.log(error)

})
