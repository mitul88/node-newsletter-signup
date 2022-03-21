const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

require('dotenv').config();


const app = express();

const API_KEY = process.env.API_KEY;
const LIST_ID = process.env.LIST_ID;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", (req, res)=> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
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
    };

    const jsonData = JSON.stringify(data);

    const url = `https://us14.api.mailchimp.com/3.0/lists/${LIST_ID}`;

    const option = {
        method: "POST",
        auth: `shahed:${API_KEY}`
    }

    https.request(url, options, ()=> {

    })  

})

app.listen(3000, ()=> {
    console.log("Server is up and running in port 3000!")
})