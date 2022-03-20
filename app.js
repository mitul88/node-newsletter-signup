const express = require('express');


const app = express();

app.use(express.static("public"))

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/signup.html");
})


app.listen(3000, ()=> {
    console.log("Server is up and running in port 3000!")
})