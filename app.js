const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');

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

    const options = {
        method: "POST",
        auth: `shahed:${API_KEY}`
    }

    const request = https.request(url, options, (response)=> {

        if (response.statusCode === 200) {
            res.send("Succesefully subscribed !");
        } else {
            res.send("There was an error with siging up, please try again");
        }

        response.on("data", (data)=> {
            console.log(JSON.parse(data));
            console.log(response.statusCode)
        })
    })
    
    request.write(jsonData);
    request.end();
})

app.listen(3000, ()=> {
    console.log("Server is up and running in port 3000!")
})