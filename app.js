const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", (req, res)=> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
})

app.listen(3000, ()=> {
    console.log("Server is up and running in port 3000!")
})