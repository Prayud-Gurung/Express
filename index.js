import bodyParser from "body-parser"
import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"

const app = express()
const port = 3000

const __dirname = dirname(fileURLToPath(import.meta.url))

var authorized = false

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}))

app.use(authorization)

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})

app.get("/", (req, res)=>{
    console.log(res.statusCode)
    res.sendFile(`${__dirname}/public/index.html`)
})

app.get("/login", (req, res)=>{
    res.sendFile(`${__dirname}/public/login.html`)
})

app.get("/about", (req, res)=>{
    res.sendFile(`${__dirname}/public/about.html`)
})

app.post("/welcome", (req, res)=>{
    if(authorized){
        res.send(`Welcome to Hogwarts ${req.body.username}`)
    }
    else{
        res.send("User not authorized")
    }
})

function authorization(req, res, next){
    let username = req.body.username
    let password = req.body.password

    if(username == "Harry" && password == "Potter"){
        authorized = true
    }
    else{
        authorized = false
    }
    next()
}