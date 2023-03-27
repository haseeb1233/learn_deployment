const express =require("express")
const {connection}=require("./db.js")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const {auth}=require("./middleware/auth.middleware")
const cors =require("cors")
const app=express()

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.port,async() =>{
    try{
        await connection
        console.log("mongod db is connected")
    }catch(err){
        console.log(err)
    }
   console.log(`server is connected to port ${process.env.port}`)
})