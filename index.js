const express=require("express")
const app=express()
require("dotenv").config()

const PORT = process.env.PORT || 3000;


app.use(express.json())

const userRouter=require("./Routes/userRoute")
app.use("/v1",userRouter)

const trainrouter=require("./Routes/trainroute")
app.use("/v1",trainrouter)


app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Everything is ok"

    })
})
app.get("*",(req,res)=>{
    res.status(500).json({
        success:false,
        message:"OOPS || 404 NOT FOUND !! PLEASE TRY LATER"

    })
})

app.listen(PORT,()=>{
    console.log("Server is ready");
    
})