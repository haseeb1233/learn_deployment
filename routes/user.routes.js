const express =require("express")
const {UserModel}=require("../model/user.model")
const jwt =require("jsonwebtoken")
const bcrypt =require("bcrypt")
const userRouter=express.Router()


userRouter.post("/register",async (req,res) =>{
    try {
        bcrypt.hash(req.body.password,5,async(err, hash) => {
            req.body.password=hash
            const data= new UserModel(req.body)
            await data.save()
        res.status(200).send({"msg":"sucesffully registered"})
        })
        
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouter.post("/login",async(req,res) =>{
    const {email,password}=req.body
    try {

        const user=await UserModel.find({email})
        console.log(user)
        if(user.length){
            bcrypt.compare(password,user[0].password, (err, result) => {
                 if(result){
                    console.log(user[0]._id)
                    res.send({"msg":"logined sucessfully","token":jwt.sign({ userID:user[0]._id}, 'abdul',{expiresIn: 60*60})})
                 }else{
                    res.send({"msg":"password is wrong"})
                 }
            });
        }else{
            res.send({"msg":"email is not present pls register "})
        }
    } 
    catch (error) {
        res.send(error)
    }
})



module.exports={
    userRouter
}