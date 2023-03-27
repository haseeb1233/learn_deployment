const express = require("express")
const {NoteModel}=require("../model/note.model")
const noteRouter=express.Router()

noteRouter.get("/",async (req,res)=>{
    try {
        console.log(req.body.userID)
        const id =req.body.userID
        const notes =await NoteModel.find({userID:`${id}`})
        console.log(notes);
        res.status(200).send(notes)
    } catch (error) {
        res.send(error)
    }
   
})

noteRouter.post("/add",async(req,res) =>{
    try {
        const note =new NoteModel(req.body)
        await note.save()
        res.status(200).send("data added sucessfully")

        
    } catch (error) {
        res.send(error)
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const id =req.params.id
    
    console.log(id)
    try{
        const new_data=req.body
        console.log(new_data)
        const movie =await NoteModel.findByIdAndUpdate({_id:id},new_data)
        res.status(200).send("updated sucessfully")

    }catch(err){
        console.log(err)
        res.status(400).send("bad request")
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id
    
    console.log(id)
    try{
        const movie =await NoteModel.findByIdAndDelete({_id:id})
        res.status(200).send("updated sucessfully")

    }catch(err){
        console.log(err)
        res.status(400).send("bad request")
    }
})

module.exports={
    noteRouter
}