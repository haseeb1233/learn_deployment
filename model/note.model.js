const mongoose =require("mongoose")


const noteSchema=mongoose.Schema({
    title:String,
    sub:String,
    body:String,
    userID:String
},{
    versionKey:false
})


const NoteModel =mongoose.model("note",noteSchema)


module.exports={NoteModel}