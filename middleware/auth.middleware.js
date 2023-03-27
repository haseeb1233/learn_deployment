const jwt =require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token =req.headers.authorization
    
    console.log(token,"hi")
    if(token){
        jwt.verify(token, 'abdul', (err, decoded)=> {
            console.log(decoded)
            if(decoded){
                req.body.userID=decoded.userID
                next()
            }else{
                res.status(400).send({"msg":"pls login first","err":err})
            }
          });
    }else{
        res.status(400).send({"msg":"pls login first","hi":"hello"})
    }
}

module.exports={
    auth
}