import express from "express"
const app = express()


app.get("/home" ,expressGet ) ; app.listen(8000)



function expressGet(req , res){
    res.send("hello from us ")
}